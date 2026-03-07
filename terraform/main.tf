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

# Output the generated project ID
output "project_id" {
  value = google_project.default.project_id
}

