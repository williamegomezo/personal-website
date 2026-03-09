# Required services for Cloud Functions v2
resource "google_project_service" "functions" {
  provider           = google.new_project
  project            = google_project.default.project_id
  service            = "cloudfunctions.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudbuild" {
  provider           = google.new_project
  project            = google_project.default.project_id
  service            = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "artifactregistry" {
  provider           = google.new_project
  project            = google_project.default.project_id
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "run" {
  provider           = google.new_project
  project            = google_project.default.project_id
  service            = "run.googleapis.com"
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
  provider                    = google.new_project
  name                        = "${google_project.default.project_id}-functions"
  location                    = "US"
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
      GITHUB_TOKEN            = var.github_token
      REPO_OWNER              = var.github_owner
      REPO_NAME               = var.github_repo
      HASHNODE_WEBHOOK_SECRET = var.hashnode_webhook_secret
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
