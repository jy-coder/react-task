variable "env" {
  type        = string
  description = "name of the env i.e. dev/prod/uat/test"
}

variable "vpc_cidr_block" {
  type        = string
  description = "CIDR block for VPC"
}

variable "public_subnet_cidr_blocks" {
  type        = list(string)
  description = "CIDR block for public subnet"
}

variable "release_version" {
  type = string
  description = "Image version which needs to be deployed"
  default = ""
}

variable "docker_image" {
  type        = string
  description = "name of docker image"
}

variable "credentials" {
  type = object({
    access_key = string
    secret_key = string
  })

  description = "My AWS credentials"
}