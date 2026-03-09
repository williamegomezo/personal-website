terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
  }
}

provider "google" {
  region = "us-central1"
}

provider "google-beta" {
  region = "us-central1"
}

# Generate a unique ID for the project
resource "random_id" "project_suffix" {
  byte_length = 4
}

# Create the Google Cloud Project
resource "google_project" "default" {
  name       = var.project_name
  project_id = "${var.project_name_prefix}-${random_id.project_suffix.hex}"
  org_id     = var.org_id
  folder_id  = var.folder_id
  
  # Binding to billing account is required for many Firebase features
  billing_account = var.billing_account
}

# Use a separate provider instance for resources within the new project
provider "google" {
  alias   = "new_project"
  project = google_project.default.project_id
  region  = "us-central1"
}

provider "google-beta" {
  alias   = "new_project_beta"
  project = google_project.default.project_id
  region  = "us-central1"
}

# Enable required services
resource "google_project_service" "firebase" {
  provider = google.new_project
  project  = google_project.default.project_id
  service  = "firebase.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "hosting" {
  provider = google.new_project
  project  = google_project.default.project_id
  service  = "firebasehosting.googleapis.com"
  disable_on_destroy = false
}

# Create a Firebase Project
resource "google_firebase_project" "default" {
  provider = google-beta.new_project_beta
  project  = google_project.default.project_id
  
  depends_on = [google_project_service.firebase]
}

# Create Site for Development
resource "google_firebase_hosting_site" "dev" {
  provider = google-beta.new_project_beta
  project  = google_project.default.project_id
  site_id  = "${google_project.default.project_id}-dev"
  
  depends_on = [google_firebase_project.default]
}

# Create Site for Production
resource "google_firebase_hosting_site" "prod" {
  provider = google-beta.new_project_beta
  project  = google_project.default.project_id
  site_id  = "${google_project.default.project_id}-prod"
  
  depends_on = [google_firebase_project.default]
}

# Automatically generate/update .firebaserc with the created project and sites
resource "local_file" "firebaserc" {
  filename = "${path.module}/../.firebaserc"
  content  = jsonencode({
    projects = {
      default = google_project.default.project_id
    }
    targets = {
      (google_project.default.project_id) = {
        hosting = {
          development = [google_firebase_hosting_site.dev.site_id]
          production  = [google_firebase_hosting_site.prod.site_id]
        }
      }
    }
  })
}
resource "google_project_service" "functions" {
  provider = google.new_project
  project  = google_project.default.project_id
  service  = "cloudfunctions.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudbuild" {
  provider = google.new_project
  project  = google_project.default.project_id
  service  = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "artifactregistry" {
  provider = google.new_project
  project  = google_project.default.project_id
  service  = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "run" {
  provider = google.new_project
  project  = google_project.default.project_id
  service  = "run.googleapis.com"
  disable_on_destroy = false
}

# Zip the function code
data "archive_file" "function_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../functions"
  output_path = "${path.module}/function.zip"
}

# Bucket to store the code
resource "google_storage_bucket" "function_bucket" {
  provider = google.new_project
  name     = "${google_project.default.project_id}-functions"
  location = "US"
  uniform_bucket_level_access = true
}

# Upload the zip
resource "google_storage_bucket_object" "zip" {
  provider = google.new_project
  name     = "function-${data.archive_file.function_zip.output_md5}.zip"
  bucket   = google_storage_bucket.function_bucket.name
  source   = data.archive_file.function_zip.output_path
}

# Deploy the Cloud Function (v2)
resource "google_cloudfunctions2_function" "github_trigger" {
  provider = google-beta.new_project_beta
  name     = "triggerGithubAction"
  location = "us-central1"
  project  = google_project.default.project_id
  
  build_config {
    runtime     = "nodejs20"
    entry_point = "triggerGithubAction"
    source {
      storage_source {
        bucket = google_storage_bucket.function_bucket.name
        object = google_storage_bucket_object.zip.name
      }
    }
  }

  service_config {
    max_instance_count = 1
    available_memory   = "256Mi"
    timeout_seconds    = 60
    
    environment_variables = {
      GITHUB_TOKEN = var.github_token
      REPO_OWNER   = var.github_owner
      REPO_NAME    = var.github_repo
    }
  }

  depends_on = [
    google_project_service.functions,
    google_project_service.cloudbuild,
    google_project_service.artifactregistry,
    google_project_service.run,
    google_firebase_project.default
  ]
}

# Allow public access to the function (for Hashnode webhook)
resource "google_cloud_run_service_iam_member" "invoker" {
  provider = google.new_project
  project  = google_project.default.project_id
  location = google_cloudfunctions2_function.github_trigger.location
  service  = google_cloudfunctions2_function.github_trigger.service_config[0].service

  role   = "roles/run.invoker"
  member = "allUsers"
}

# Output the function URL
output "function_url" {
  value = google_cloudfunctions2_function.github_trigger.url
}

