output "web_app_url" {
  value = "http://${aws_s3_bucket.s3-static-website-bucket.bucket}.s3-website.${var.bucket_region}.amazonaws.com"
}