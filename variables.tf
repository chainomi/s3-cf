variable "region" {
  description = "AWS region"
}

variable "environment" {
  description = "Name of environment"
}

variable "s3_bucket_name" {
  description = "Name of S3 bucket for origin"
}

variable "index_document" {
    description = "Name of the index page for the website"
}
variable "error_document" {
    description = "Name of the error page for the website"
}

variable "project_name" {
    description = "Name of the project"
}