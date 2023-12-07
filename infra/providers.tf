provider "doppler" {
  doppler_token = var.doppler_token
}

provider "aws" {
  region = var.aws_default_region

  default_tags {
    tags = {
      Name        = var.default_aws_tag_name
      Environment = terraform.workspace
    }
  }
}