# Create S3 for static web hosting
resource "aws_s3_bucket" "s3-static-website-bucket" {
  bucket        = var.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_website_configuration" "s3-static-website-bucket" {
  bucket = aws_s3_bucket.s3-static-website-bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "s3-static-website-bucket" {
  bucket = aws_s3_bucket.s3-static-website-bucket.id

  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
  block_public_acls       = false
}

resource "aws_s3_bucket_ownership_controls" "s3-static-website-bucket" {
  bucket = aws_s3_bucket.s3-static-website-bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.s3-static-website-bucket.id

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "PublicRead",
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : ["s3:GetObject"],
        "Resource" : [
          "arn:aws:s3:::${var.bucket_name}/*"
        ]
      }
    ]
    }
  )
}

resource "aws_s3_bucket_acl" "s3-static-website-bucket" {
  acl    = "public-read"
  bucket = aws_s3_bucket.s3-static-website-bucket.id

  depends_on = [
    aws_s3_bucket_public_access_block.s3-static-website-bucket,
    aws_s3_bucket_ownership_controls.s3-static-website-bucket
  ]
}

locals {
  s3_bucket_origin_id    = "${var.bucket_name}-origin"
  s3_website_domain_name = "${var.bucket_name}.s3-website-${var.bucket_region}.amazonaws.com"
}

resource "aws_cloudfront_distribution" "s3-static-website-bucket" {
  enabled     = true
  price_class = "PriceClass_100"

  depends_on = [ aws_s3_bucket.s3-static-website-bucket ]

  origin {
    origin_id   = local.s3_bucket_origin_id
    domain_name = local.s3_website_domain_name
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1"]
    }
  }

  default_cache_behavior {
    target_origin_id = local.s3_bucket_origin_id
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}