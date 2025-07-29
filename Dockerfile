# Build stage
FROM node:20-alpine as build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 모든 의존성 설치 (개발 의존성 포함)
RUN npm ci

# 소스 코드 복사
COPY . .

# 환경 변수 설정
ENV NODE_ENV=production

# 프로덕션 빌드
RUN npm run build

# Production stage
FROM nginx:alpine

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 파일들을 nginx 서버로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 포트 노출
EXPOSE 80

# nginx 시작
CMD ["nginx", "-g", "daemon off;"] 