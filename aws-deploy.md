# AWS ECS 배포 가이드

## 1. ECR 레지스트리 생성

```bash
aws ecr create-repository --repository-name scratcha-app
```

## 2. ECR 로그인

```bash
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin [ACCOUNT_ID].dkr.ecr.ap-northeast-2.amazonaws.com
```

## 3. 이미지 태그 및 푸시

```bash
docker tag scratcha-app:latest [ACCOUNT_ID].dkr.ecr.ap-northeast-2.amazonaws.com/scratcha-app:latest
docker push [ACCOUNT_ID].dkr.ecr.ap-northeast-2.amazonaws.com/scratcha-app:latest
```

## 4. ECS 클러스터 생성

```bash
aws ecs create-cluster --cluster-name scratcha-cluster
```

## 5. 태스크 정의 생성 (task-definition.json)

```json
{
  "family": "scratcha-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::[ACCOUNT_ID]:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "scratcha-app",
      "image": "[ACCOUNT_ID].dkr.ecr.ap-northeast-2.amazonaws.com/scratcha-app:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/scratcha-app",
          "awslogs-region": "ap-northeast-2",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

## 6. 서비스 생성

```bash
aws ecs create-service \
  --cluster scratcha-cluster \
  --service-name scratcha-service \
  --task-definition scratcha-app:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```
