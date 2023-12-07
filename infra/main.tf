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
    bucket = "x22212973-inventory-app"
    key    = "terraform/state/terraform.tfstate"
    region = "us-east-1"
  }
}

# get default VPC
data "aws_vpc" "default" {
  default = true
}

# initialize secrets
module "secrets" {
  source = "./modules/secrets"
}

# create db instance
module "mysql_db" {
  source = "./modules/database"

  aws_db_identifier = var.project_name
  aws_vpc_id        = data.aws_vpc.default.id
  database_name     = module.secrets.database_name
  database_username = module.secrets.database_username
  database_password = module.secrets.database_password
}

# write db host name to secrets manager
resource "doppler_secret" "RDS_ENDPOINT" {
  name       = "DATABASE_HOST"
  project    = var.project_name
  config     = terraform.workspace
  value      = split(":3306", module.mysql_db.rds_endpoint)[0]
  depends_on = [module.mysql_db]
}

data "aws_key_pair" "ec2_key_pair" {
  key_name = var.ec2_key_pair_name
}

# create instance for sonarqube
module "sonarqube" {
  source = "./modules/sonarqube-ec2"

  instance_name  = "${var.project_name}-sonarqube"
  key_name       = data.aws_key_pair.ec2_key_pair.key_name
  aws_vpc_id     = data.aws_vpc.default.id
  instance_image = var.ubuntu_ami
  instance_type  = "t2.medium"
}

# create managed aws elastic benastalk
module "aws-elasticbeanstalk" {
  source = "./modules/aws-eb"

  eb_application_name     = var.project_name
  eb_env_name             = lower("${var.project_name}-${terraform.workspace}")
  eb_env_instance_profile = "EC2_EB_Instance_Role"
}

# Create S3 bucket for static website hosting
module "s3_static_website" {
  source = "./modules/s3-static-website"

  bucket_name   = "${var.project_name}-${terraform.workspace}"
  bucket_region = var.aws_default_region
}
