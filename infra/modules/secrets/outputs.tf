output "database_name" {
  value = data.doppler_secrets.this.map.DATABASE_NAME
}

output "database_username" {
  value     = data.doppler_secrets.this.map.DATABASE_USERNAME
  sensitive = true
}

output "database_password" {
  value     = data.doppler_secrets.this.map.DATABASE_PASSWORD
  sensitive = true
}
