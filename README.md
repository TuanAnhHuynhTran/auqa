# AquaVerse 3D

Nền tảng thiết kế và chăm sóc hồ cá 3D trên trình duyệt.

## Chạy dự án

```bash
npm install
copy server\.env.example server\.env
npm run dev
```

- Frontend: http://localhost:5173
- REST API: http://localhost:3001/api

Mặc định API chạy với dữ liệu mẫu trong bộ nhớ (`DB_ENABLED=false`) để dự án có thể khởi động ngay. Đổi thành `true` và cập nhật thông tin MySQL trong `server/.env` để sử dụng Sequelize/MySQL.

## Giai đoạn 1

- Khám phá trang chủ, cửa hàng, nhà của tôi và thư viện cộng đồng.
- Thiết kế hồ 3D: chọn kích thước, thêm cá/cây/đá, chọn vật thể, xóa và lưu thiết kế.
- Tạo hồ theo kích thước centimet (30–300 cm), hệ nước và kiểu kính; camera Front/Left/Right/Top.
- Quản lý các bản thiết kế đã lưu.
- REST API có cấu trúc mở rộng cho hồ, vật thể và danh mục cửa hàng.

### API hồ cá

```text
POST   /api/aquariums
GET    /api/aquariums
GET    /api/aquariums/:id
PUT    /api/aquariums/:id
DELETE /api/aquariums/:id
```

Chưa bao gồm đăng nhập, thanh toán, multiplayer và hệ thống sinh sản/chăm sóc cá nâng cao.
