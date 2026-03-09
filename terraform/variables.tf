variable "project_name" {
  description = "The display name of the Google Cloud Project"
  type        = string
  default     = "Personal Page"
}

variable "project_name_prefix" {
  description = "A prefix for the unique project ID"
  type        = string
  default     = "wg-portfolio"
}

variable "billing_account" {
  description = "The billing account ID to associate with the project"
  type        = string
  default     = null # Optional, but recommended
}

variable "org_id" {
  description = "The organization ID"
  type        = string
  default     = null
}

variable "folder_id" {
  description = "The folder ID"
  type        = string
  default     = null
}

variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true
}

variable "github_owner" {
  description = "GitHub Repository Owner"
  type        = string
}

variable "github_repo" {
  description = "GitHub Repository Name"
  type        = string
}

variable "hashnode_webhook_secret" {
  description = "Hashnode Webhook Secret"
  type        = string
}