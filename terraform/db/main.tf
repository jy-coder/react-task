provider "aws" {
  region = "ap-southeast-1"
  access_key = var.credentials.access_key
  secret_key = var.credentials.secret_key
}

module "task_table" {
  source = "./tables"
}

module "user_table" {
  source = "./tables"
}

