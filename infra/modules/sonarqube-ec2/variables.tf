variable "instance_name" {
  type        = string
  description = "Given name for EC2 instance on creation."
}

variable "instance_type" {
  type        = string
  description = "EC2 instance type."
}

variable "instance_image" {
  type        = string
  description = "EC2 instance image"
}

variable "key_name" {
  type        = string
  description = "EC2 Key pair name"
}

variable "aws_vpc_id" {
  type        = string
  description = "AWS VPC"
}
