#!/bin/bash

# 카카오클라우드 Ubuntu 20.04 Docker 설치 및 Scratcha 앱 실행 스크립트

echo "🚀 카카오클라우드 Ubuntu 20.04 Docker 설정 시작..."

# 1. 시스템 업데이트
echo "📦 시스템 업데이트 중..."
sudo apt update && sudo apt upgrade -y

# 2. 필요한 패키지 설치
echo "🔧 필요한 패키지 설치 중..."
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# 3. Docker GPG 키 추가
echo "🔑 Docker GPG 키 추가 중..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 4. Docker 레포지토리 추가
echo "📚 Docker 레포지토리 추가 중..."
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. Docker 설치
echo "🐳 Docker 설치 중..."
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 6. Docker 서비스 시작 및 자동 시작 설정
echo "🔄 Docker 서비스 시작 중..."
sudo systemctl start docker
sudo systemctl enable docker

# 7. 현재 사용자를 docker 그룹에 추가 (sudo 없이 docker 명령어 사용 가능)
echo "👤 사용자를 docker 그룹에 추가 중..."
sudo usermod -aG docker $USER

# 8. Docker 설치 확인
echo "✅ Docker 설치 확인 중..."
docker --version

# 9. 기존 컨테이너 정리 (있다면)
echo "🧹 기존 컨테이너 정리 중..."
docker stop $(docker ps -aq) 2>/dev/null || true
docker rm $(docker ps -aq) 2>/dev/null || true

# 10. 기존 이미지 정리 (있다면)
echo "🗑️  기존 이미지 정리 중..."
docker rmi scratcha-app:latest 2>/dev/null || true

# 11. Docker Hub에서 이미지 pull
echo "📥 Docker Hub에서 이미지 다운로드 중..."
# YOUR_USERNAME을 실제 Docker Hub 사용자명으로 변경하세요
docker pull YOUR_USERNAME/scratcha-app:latest

# 12. 컨테이너 실행
echo "🚀 Scratcha 앱 컨테이너 실행 중..."
docker run -d \
  --name scratcha-app \
  -p 80:80 \
  --restart unless-stopped \
  YOUR_USERNAME/scratcha-app:latest

# 13. 실행 확인
echo "🔍 컨테이너 실행 상태 확인 중..."
docker ps

echo "✅ 설정 완료!"
echo "🌐 웹 브라우저에서 http://YOUR_SERVER_IP 로 접속하세요"
echo "📊 컨테이너 로그 확인: docker logs scratcha-app"
echo "🛑 컨테이너 중지: docker stop scratcha-app"
echo "🔄 컨테이너 재시작: docker start scratcha-app" 