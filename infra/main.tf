terraform {
  required_version = ">= 0.13"

  required_providers {
    doppler = {
      source = "DopplerHQ/doppler"
    }

    aws = {
      source = "hashicorp/aws"
    }
  }

  backend "s3" {
    bucket = "x22212973-tf-backend"
    key    = "state/terraform.tfstate"
    region = "eu-west-1"
  }
}

locals {
  s3_static_website_bucket_name = "${var.project_name}-${terraform.workspace}"
}

# Create S3 bucket for static website hosting
module "s3_static_website" {
  source = "./modules/s3-static-website"

  bucket_name   = local.s3_static_website_bucket_name
  bucket_region = var.aws_default_region
}
