output "function_url" {
  description = "The URL of the deployed Cloud Function"
  value       = google_cloudfunctions2_function.github_trigger.url
}

output "project_id" {
  description = "The created Google Cloud Project ID"
  value       = google_project.default.project_id
}
