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

# Provider instance for resources within the new project
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
