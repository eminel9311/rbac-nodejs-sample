# RBAC System

Hệ thống quản lý phân quyền (Role-Based Access Control) được xây dựng bằng Node.js và MongoDB.

## Yêu cầu hệ thống

- Node.js (v20 trở lên)
- Docker và Docker Compose
- MongoDB (được cài đặt thông qua Docker)

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd rbac-system
```

2. Tạo file `.env`:
```bash
# Server Configuration
SERVER_PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGO_USERNAME=admin
MONGO_PASSWORD=admin123
MONGO_PORT=27017
MONGO_DATABASE=rbac_db
```

3. Cài đặt dependencies:
```bash
npm install
```

## Chạy ứng dụng

### Sử dụng Docker (Khuyến nghị)

```bash
# Build và khởi động containers
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng containers
docker-compose down
```

### Chạy trực tiếp (Development)

```bash
# Chạy với nodemon (hot-reload)
npm run start:dev
```

## Cấu trúc thư mục
