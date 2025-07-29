# 카카오클라우드 Ubuntu 20.04 Docker 설치 및 실행 가이드

## 1. 서버 접속

```bash
ssh ubuntu@YOUR_SERVER_IP
```

## 2. 시스템 업데이트

```bash
sudo apt update && sudo apt upgrade -y
```

## 3. Docker 설치

### 3.1 필요한 패키지 설치

```bash
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
```

### 3.2 Docker GPG 키 추가

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### 3.3 Docker 레포지토리 추가

```bash
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 3.4 Docker 설치

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
```

### 3.5 Docker 서비스 시작

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### 3.6 사용자를 docker 그룹에 추가

```bash
sudo usermod -aG docker $USER
# 새 터미널 세션에서 로그아웃 후 다시 로그인하거나 다음 명령어 실행:
newgrp docker
```

## 4. Docker 설치 확인

```bash
docker --version
```

## 5. 이미지 다운로드 및 실행

### 5.1 Docker Hub에서 이미지 pull

```bash
# YOUR_USERNAME을 실제 Docker Hub 사용자명으로 변경
docker pull YOUR_USERNAME/scratcha-app:latest
```

### 5.2 컨테이너 실행

```bash
docker run -d \
  --name scratcha-app \
  -p 80:80 \
  --restart unless-stopped \
  YOUR_USERNAME/scratcha-app:latest
```

### 5.3 실행 확인

```bash
docker ps
```

## 6. 방화벽 설정 (필요시)

### 6.1 UFW 방화벽 활성화

```bash
sudo ufw enable
```

### 6.2 HTTP 포트 허용

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp  # HTTPS 사용시
```

### 6.3 SSH 포트 허용

```bash
sudo ufw allow 22/tcp
```

### 6.4 방화벽 상태 확인

```bash
sudo ufw status
```

## 7. 접속 테스트

브라우저에서 `http://YOUR_SERVER_IP`로 접속

## 8. 유용한 명령어

### 8.1 컨테이너 관리

```bash
# 컨테이너 중지
docker stop scratcha-app

# 컨테이너 시작
docker start scratcha-app

# 컨테이너 재시작
docker restart scratcha-app

# 컨테이너 삭제
docker rm scratcha-app
```

### 8.2 로그 확인

```bash
# 실시간 로그 확인
docker logs -f scratcha-app

# 최근 100줄 로그 확인
docker logs --tail 100 scratcha-app
```

### 8.3 컨테이너 내부 접속

```bash
docker exec -it scratcha-app /bin/sh
```

### 8.4 이미지 관리

```bash
# 이미지 목록 확인
docker images

# 이미지 삭제
docker rmi YOUR_USERNAME/scratcha-app:latest
```

## 9. 자동 재시작 설정

서버 재부팅 시에도 자동으로 컨테이너가 시작되도록 설정:

```bash
docker update --restart unless-stopped scratcha-app
```

## 10. 문제 해결

### 10.1 포트 충돌 시

```bash
# 다른 포트로 실행
docker run -d --name scratcha-app -p 8080:80 YOUR_USERNAME/scratcha-app:latest
```

### 10.2 권한 문제 시

```bash
# docker 그룹에 사용자 추가 확인
groups $USER

# 필요시 다시 추가
sudo usermod -aG docker $USER
```

### 10.3 디스크 공간 부족 시

```bash
# 사용하지 않는 Docker 리소스 정리
docker system prune -a
```
