resource "google_project_service" "hosting" {
  provider           = google.new_project
  project            = google_project.default.project_id
  service            = "firebasehosting.googleapis.com"
  disable_on_destroy = false
}

# Create Site for Development
resource "google_firebase_hosting_site" "dev" {
  provider = google-beta.new_project_beta
  project  = google_project.default.project_id
  site_id  = "${google_project.default.project_id}-dev"

  depends_on = [google_firebase_project.default, google_project_service.hosting]
}

# Create Site for Production
resource "google_firebase_hosting_site" "prod" {
  provider = google-beta.new_project_beta
  project  = google_project.default.project_id
  site_id  = "${google_project.default.project_id}-prod"

  depends_on = [google_firebase_project.default, google_project_service.hosting]
}

# Automatically generate/update .firebaserc with the created project and sites
resource "local_file" "firebaserc" {
  filename = "${path.module}/../.firebaserc"
  content = jsonencode({
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
