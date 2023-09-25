module "vpc" {
  source = "./vpc_module"  
  env = var.env
  vpc_cidr_block = var.vpc_cidr_block
  public_subnet_cidr_blocks = var.public_subnet_cidr_blocks
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-1"
  access_key = var.credentials.access_key
  secret_key = var.credentials.secret_key
}



resource "aws_security_group" "allow_http_lb" {
  name        = "allow_http_lb"
  description = "Allow http inbound traffic"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description      = "HTTP from internet"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

    egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }


  tags = {
    Name = "allow_http_lb"
  }
}


resource "aws_ecs_cluster" "cluster" {
  name = "cluster-${var.env}"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}



resource "aws_ecs_task_definition" "task_app" {
  count = var.release_version != "" ? 1 : 0
  family = "task-app"
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([
    {
      name      = "task-app"
      image     = var.docker_image
      essential = true

      portMappings = [
        {
          containerPort = 80
        }
      ]
    }
  ])

  requires_compatibilities = [
    "FARGATE"
  ]

  network_mode = "awsvpc"
  cpu          = "256"
  memory       = "512"
}

resource "aws_lb" "task-app" {
  name                       = "task-app-lb-${var.env}"
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = [aws_security_group.allow_http_lb.id]
  subnets                    = module.vpc.public_subnet_ids
  enable_deletion_protection = false
}


resource "aws_lb_target_group" "task_app_lb_tg" {
  name        = "task-app-lb-tg-${var.env}"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = module.vpc.vpc_id

  health_check {
    interval = 5
    timeout  = 2
  }
}

resource "aws_lb_listener" "task-app" {
  load_balancer_arn = aws_lb.task-app.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.task_app_lb_tg.arn
  }
}



resource "aws_security_group" "ecs_container" {
  name        = "ecs-container"
  description = "Allow http inbound traffic"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description     = "HTTP from ALB"
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    security_groups = [aws_security_group.allow_http_lb.id]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "ecs-container"
  }
}


resource "aws_ecs_service" "task-service" {
  count = var.release_version != "" ? 1 : 0
  name            = "task-service"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task_app[0].arn
  desired_count   = 1
  launch_type     = "FARGATE"

  load_balancer {
    target_group_arn = aws_lb_target_group.task_app_lb_tg.arn
    container_name   = jsondecode(aws_ecs_task_definition.task_app[0].container_definitions)[0].name
    container_port   = 80
  }

  network_configuration {
    subnets          = module.vpc.public_subnet_ids
    assign_public_ip = true
    security_groups  = [aws_security_group.ecs_container.id]
  }


}





