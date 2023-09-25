resource "aws_dynamodb_table" "task_table" {
  name           = "Tasks"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "taskId"

  attribute {
    name = "taskId"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }


  # Create a Global Secondary Index (GSI) to support querying tasks by UserID
  global_secondary_index {
    name = "userIdIndex"
    hash_key = "userId"
    projection_type = "ALL"
    read_capacity = 5
    write_capacity = 5
  }

  tags = {
    Name        = "Task-Table"
    Environment = "Prod"
  }
}
