output "sonarqube_ec2_ip" {
  value = module.ec2_instance.public_dns
}
