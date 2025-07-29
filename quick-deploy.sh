#!/bin/bash

# 빠른 배포 스크립트 (Docker가 이미 설치되어 있다고 가정)

echo "🚀 Scratcha 앱 빠른 배포 시작..."

# Docker Hub 사용자명 설정 (여기서 변경하세요)
DOCKER_USERNAME="YOUR_USERNAME"

# 기존 컨테이너 정리
echo "🧹 기존 컨테이너 정리 중..."
docker stop scratcha-app 2>/dev/null || true
docker rm scratcha-app 2>/dev/null || true

# 이미지 pull
echo "📥 이미지 다운로드 중..."
docker pull $DOCKER_USERNAME/scratcha-app:latest

# 컨테이너 실행
echo "🚀 컨테이너 실행 중..."
docker run -d \
  --name scratcha-app \
  -p 80:80 \
  --restart unless-stopped \
  $DOCKER_USERNAME/scratcha-app:latest

# 실행 확인
echo "✅ 배포 완료!"
echo "🌐 http://$(curl -s ifconfig.me) 로 접속하세요"
echo "📊 로그 확인: docker logs scratcha-app" 