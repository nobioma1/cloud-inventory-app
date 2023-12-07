variable "aws_db_identifier" {
  type        = string
  description = "Unique identifier for an Amazon RDS database instance, used for naming and identification purposes within AWS services and applications."
}

variable "aws_database_instance_class" {
  type        = string
  description = "Specifies the computing and memory capacity of an Amazon RDS instance, determining its performance and cost."
  default     = "db.t3.micro"
}

variable "aws_database_allocated_storage" {
  type        = number
  description = "Defines the amount of storage allocated to an Amazon RDS instance, representing the volume of data it can store."
  default     = 10
}

variable "aws_vpc_id" {
  type        = string
  description = "Identifies the Virtual Private Cloud (VPC) to be used in creating resource"
}

variable "database_version" {
  type        = string
  description = "Specifies the version of the database software used, ensuring compatibility with applications and defining available features."
  default     = "8.0.33"
}

variable "database_name" {
  type        = string
  description = "Name of the specific database within an RDS instance, allowing separation of data for different applications or purposes."
}

variable "database_username" {
  type        = string
  description = "User-defined username granting access to a database, ensuring secure authentication and authorization for database operations."
}

variable "database_password" {
  type        = string
  description = "User-defined password associated with the database username, providing secure access control and data protection."
}

