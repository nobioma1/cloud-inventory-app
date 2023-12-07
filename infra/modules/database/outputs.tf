output "rds_endpoint" {
  value     = aws_db_instance.aws_mysql_db.endpoint
  sensitive = true
}
