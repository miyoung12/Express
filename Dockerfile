# Node.js 20-alpine 이미지 사용
FROM node:22-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 파일을 작업 디렉토리로 복사
COPY package*.json ./

# npm 패키지 설치
RUN npm install

# 나머지 소스 파일을 작업 디렉토리로 복사
COPY . .

EXPOSE  3000

# 데이터베이스가 준비될 때까지 대기한 후 마이그레이션 및 시딩 실행
CMD ["node", "index.js"]