resource "aws_dynamodb_table" "user_table" {
  name           = "Users"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "userId"

  attribute {
    name = "userId"
    type = "S"
  }

  tags = {
    Name        = "User-Table"
    Environment = "Prod"
  }
}