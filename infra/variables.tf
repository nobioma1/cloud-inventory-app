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
  default     = "us-east-1"
  description = "AWS Region is a geographical area where AWS resources and services are hosted."
}

variable "ec2_key_pair_name" {
  type        = string
  description = "Key pair to access ec2"
}

variable "ubuntu_ami" {
  type        = string
  description = "Ubuntu ami image id"
}