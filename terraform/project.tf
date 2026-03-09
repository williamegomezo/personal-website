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

# Enable required base services
resource "google_project_service" "firebase" {
  provider           = google.new_project
  project            = google_project.default.project_id
  service            = "firebase.googleapis.com"
  disable_on_destroy = false
}

# Create a Firebase Project
resource "google_firebase_project" "default" {
  provider = google-beta.new_project_beta
  project  = google_project.default.project_id

  depends_on = [google_project_service.firebase]
}
