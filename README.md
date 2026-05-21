<div align="center">

  <img src="public/favicon.svg" alt="Olala logo" width="72" height="72" />

  # Olala Flight Booking

  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=22&pause=1100&color=2563EB&center=true&vCenter=true&width=620&lines=Mobile-first+flight+booking+experience;Search+flights+%E2%86%92+add+passengers+%E2%86%92+pay+%E2%86%92+manage+tickets" alt="Animated project intro" />

  <p>
    Ứng dụng đặt vé máy bay giao diện mobile, tập trung vào hành trình tìm chuyến bay,
    nhập thông tin hành khách, chọn dịch vụ, thanh toán và quản lý vé.
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-19.2.5-61DAFB?style=for-the-badge&logo=react&logoColor=0f172a" alt="React" />
    <img src="https://img.shields.io/badge/Vite-8.0.10-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.2.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/React_Router-7.15.0-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/Date_Fns-4.1.0-4B5563?style=for-the-badge" alt="date-fns" />
    <img src="https://img.shields.io/badge/ESLint-10.2.1-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  </p>

</div>

## Preview

<p align="center">
  <img src="src/assets/images/background.png" alt="Booking hero background" width="260" />
  &nbsp;
  <img src="src/assets/images/background2.png" alt="Flight flow background" width="260" />
</p>

## Tính năng chính

- Đặt vé theo hành trình một chiều hoặc khứ hồi với form tìm kiếm riêng cho mobile.
- Tìm và chọn chuyến bay, có sắp xếp, bộ lọc hãng bay, khung giờ và điểm dừng.
- Nhập thông tin hành khách, xác nhận thông tin và chọn dịch vụ bổ sung.
- Thanh toán qua ZaloPay, MoMo, thẻ quốc tế, thẻ nội địa hoặc chuyển khoản.
- Mô phỏng kết quả thanh toán thành công/thất bại và lưu booking vào localStorage.
- Trang `Vé của tôi` gồm nhiều trạng thái: chờ thanh toán, đang xử lý, đã xuất vé, đã hủy.
- Đăng nhập mô phỏng bằng quyền truy cập Zalo để xem lịch sử đặt vé.
- Điều hướng đầy đủ bằng React Router và bottom navigation theo phong cách ứng dụng mobile.

## Màn hình

| Route | Màn hình |
| --- | --- |
| `/` | Trang đặt vé |
| `/search` | Kết quả tìm kiếm, sắp xếp và lọc chuyến bay |
| `/passenger-info` | Nhập thông tin hành khách |
| `/services` | Chọn dịch vụ bổ sung |
| `/confirm` | Xác nhận thông tin |
| `/booking-pending` | Chờ xử lý booking |
| `/payment` | Thanh toán |
| `/payment-success` | Thanh toán thành công |
| `/payment-failure` | Thanh toán thất bại |
| `/tickets` | Vé của tôi |
| `/tickets/:bookingCode` | Chi tiết vé |
| `/offers` | Ưu đãi |
| `/account` | Tài khoản |

## Tech Stack

- **React 19** cho UI component và state trên từng màn hình.
- **Vite 8** cho dev server, HMR và build nhanh.
- **Tailwind CSS 4** qua plugin `@tailwindcss/vite`.
- **React Router 7** cho routing giữa các bước booking.
- **React Hot Toast** cho thông báo thao tác.
- **React Datepicker** và **date-fns** cho chọn và định dạng ngày.
- **localStorage/sessionStorage** để mô phỏng đăng nhập, giữ vé và vé đã lưu.

## Cấu trúc thư mục

```text
olala/
+-- public/                 # favicon, icons chung
+-- design/                 # anh thiet ke tham khao cac man hinh
+-- src/
|   +-- assets/             # background, logo hang bay, icon thanh toan
|   +-- components/         # Header, form dat ve, card chuyen bay, bottom nav...
|   +-- data/               # du lieu chuyen bay mau
|   +-- pages/              # cac route chinh cua ung dung
|   +-- utils/              # luu va tao ticket booking
|   +-- App.jsx             # khai bao route
|   +-- main.jsx            # mount React app
+-- eslint.config.js
+-- vite.config.js
+-- package.json
```

## Chạy dự án

Yêu cầu: **Node.js 20+** và npm.

```bash
npm install
npm run dev
```

Sau đó mở URL Vite hiện trên terminal, thường là:

```text
http://localhost:5173
```

## Scripts

```bash
npm run dev      # chay dev server
npm run build    # build production vao dist/
npm run preview  # xem ban build production
npm run lint     # kiem tra ESLint
```

## Ghi chú phát triển

- App đang tối ưu cho khung mobile `max-width: 450px`.
- Một số chuỗi dữ liệu mẫu trong code hiện bị lỗi mã hóa tiếng Việt; UI/README có thể chuẩn hóa tiếp nếu cần.
- Thanh toán hiện là flow demo: mỗi lần submit sẽ luân phiên sang trang success/failure bằng `sessionStorage`.
- Dữ liệu vé đã đặt được lưu local tại key `olalaMyTickets`.

---

<div align="center">
  <strong>Olala Flight Booking</strong><br />
  React + Vite mobile booking prototype
</div>
