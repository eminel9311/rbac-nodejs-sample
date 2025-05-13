# RBAC System

Hệ thống quản lý phân quyền (Role-Based Access Control) được xây dựng bằng Node.js và MongoDB.

## Yêu cầu hệ thống

- Node.js (v18 trở lên)
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

## API Endpoints

### Authentication & User Management

#### Registration
- `POST /api/register-se` - Đăng ký tài khoản Software Engineer
- `POST /api/register-marketer` - Đăng ký tài khoản Marketer
- `POST /api/register-hr` - Đăng ký tài khoản Human Resource

#### Login
- `POST /api/login-se` - Đăng nhập với tài khoản Software Engineer
- `POST /api/login-marketer` - Đăng nhập với tài khoản Marketer
- `POST /api/login-hr` - Đăng nhập với tài khoản Human Resource

#### Protected Routes
- `GET /api/se-protected` - Route được bảo vệ cho Software Engineers
- `GET /api/marketers-protected` - Route được bảo vệ cho Marketers
- `GET /api/hr-protected` - Route được bảo vệ cho Human Resource
- `POST /api/protected` - Route được bảo vệ chung (yêu cầu JWT)

### Request/Response Format

#### Registration Request
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Login Request
```json
{
  "email": "string",
  "password": "string"
}
```

#### Protected Route Response
```json
{
  "message": "welcome {role} - {name}"
}
```

### Authentication
- Tất cả các protected routes yêu cầu JWT token trong header:
  ```
  Authorization: Bearer <token>
  ```
- Mỗi role (se, marketer, hr) chỉ có thể truy cập các routes được phép
- Token được tạo khi đăng nhập thành công## API Endpoints

### Authentication & User Management

#### Registration
- `POST /api/register-se` - Đăng ký tài khoản Software Engineer
- `POST /api/register-marketer` - Đăng ký tài khoản Marketer
- `POST /api/register-hr` - Đăng ký tài khoản Human Resource

#### Login
- `POST /api/login-se` - Đăng nhập với tài khoản Software Engineer
- `POST /api/login-marketer` - Đăng nhập với tài khoản Marketer
- `POST /api/login-hr` - Đăng nhập với tài khoản Human Resource

#### Protected Routes
- `GET /api/se-protected` - Route được bảo vệ cho Software Engineers
- `GET /api/marketers-protected` - Route được bảo vệ cho Marketers
- `GET /api/hr-protected` - Route được bảo vệ cho Human Resource
- `POST /api/protected` - Route được bảo vệ chung (yêu cầu JWT)

### Request/Response Format

#### Registration Request
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Login Request
```json
{
  "email": "string",
  "password": "string"
}
```

#### Protected Route Response
```json
{
  "message": "welcome {role} - {name}"
}
```

### Authentication
- Tất cả các protected routes yêu cầu JWT token trong header:
  ```
  Authorization: Bearer <token>
  ```
- Mỗi role (se, marketer, hr) chỉ có thể truy cập các routes được phép
- Token được tạo khi đăng nhập thành công

## Docker Commands

### Xóa cache và build lại
```bash
# Dừng, xóa tất cả và build lại từ đầu
docker-compose down --rmi all -v --remove-orphans && \
docker builder prune -f && \
docker-compose build --no-cache && \
docker-compose up -d
```

### Các lệnh Docker hữu ích
```bash
# Xem logs
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f server
docker-compose logs -f mongodb

# Restart service
docker-compose restart server

# Xem trạng thái containers
docker-compose ps
```

## Development

### Hot Reload
Ứng dụng sử dụng nodemon để tự động reload khi có thay đổi code.

### Environment Variables
Tất cả các biến môi trường được định nghĩa trong file `.env`. Không commit file này lên git.

## Production

### Security
- Sử dụng mật khẩu mạnh cho MongoDB
- Cấu hình CORS phù hợp
- Sử dụng HTTPS
- Bảo vệ các routes nhạy cảm

### Performance
- Sử dụng PM2 để quản lý process
- Cấu hình MongoDB indexes
- Sử dụng Redis để cache (nếu cần)

## Contributing

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

ISC License
