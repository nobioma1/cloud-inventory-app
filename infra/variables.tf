variable "doppler_token" {
  type        = string
  description = "A token to authenticate with Doppler"
}

variable "default_aws_tag_name" {
  type        = string
  default     = "x22212973"
  description = "Tag name for resources created on AWS"
}

variable "project_name" {
  type        = string
  default     = "x22212973-inventory-app"
  description = "project name"
}

variable "aws_default_region" {
  type        = string
  default     = "eu-west-1"
  description = "AWS Region is a geographical area where AWS resources and services are hosted."
}


