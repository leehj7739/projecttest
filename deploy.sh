#!/bin/bash

# 배포 스크립트
set -e

# 환경 변수 설정
IMAGE_NAME="scratcha-app"
TAG="latest"
REGISTRY="your-registry.com"  # 변경 필요

echo "🚀 Scratcha 앱 배포 시작..."

# 1. Docker 이미지 빌드
echo "📦 Docker 이미지 빌드 중..."
docker build -t $IMAGE_NAME:$TAG .

# 2. 이미지 태그 설정 (레지스트리용)
echo "🏷️  이미지 태그 설정 중..."
docker tag $IMAGE_NAME:$TAG $REGISTRY/$IMAGE_NAME:$TAG

# 3. 레지스트리에 푸시
echo "📤 레지스트리에 푸시 중..."
docker push $REGISTRY/$IMAGE_NAME:$TAG

echo "✅ 배포 완료!"
echo "이미지: $REGISTRY/$IMAGE_NAME:$TAG" 