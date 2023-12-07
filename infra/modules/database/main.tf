resource "aws_security_group" "db_security_group" {
  name        = "rds_vpc_security_group"
  description = "Allow all inbound and outbound for Postgres"
  vpc_id      = var.aws_vpc_id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_db_instance" "aws_mysql_db" {
  identifier             = var.aws_db_identifier
  db_name                = var.database_name
  instance_class         = var.aws_database_instance_class
  allocated_storage      = var.aws_database_allocated_storage
  engine                 = "mysql"
  engine_version         = var.database_version
  skip_final_snapshot    = true
  publicly_accessible    = true
  vpc_security_group_ids = [aws_security_group.db_security_group.id]
  username               = var.database_username
  password               = var.database_password
}