resource "aws_security_group" "sonarqube_sg" {
  name        = "sonarqube_sg"
  description = "Security group for Sonarqube"
  vpc_id      = var.aws_vpc_id

  ingress {
    from_port   = 9000
    to_port     = 9000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

module "ec2_instance" {
  source = "terraform-aws-modules/ec2-instance/aws"

  name = var.instance_name

  ami                    = var.instance_image
  instance_type          = var.instance_type
  key_name               = var.key_name
  monitoring             = true
  vpc_security_group_ids = [aws_security_group.sonarqube_sg.id]
  user_data              = file("${path.module}/user-data-script.sh")
}