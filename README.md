# Skipli-ai

Dự án web sử dụng ReactJS (frontend), NodeJS/Express (backend), và Firebase cho xác thực người dùng & lưu trữ dữ liệu. Cho phép người dùng tạo caption bằng AI và lưu caption vào tài khoản được xác thực bằng số điện thoại.

### 1. Clone dự án

```bash
git clone https://github.com/your-username/SKIPLI_AI.git
cd SKIPLI_AI

###2. Cài đặt dependencies

cd skipli-ai-backend
npm install
  2.1 Tạo file serviceAccountKey.json ngoài thư mục gốc để lấy key trong firebase

cd ../skipli-ai
npm install


###3. Cấu hình môi trường
Tạo env

VONAGE_API_KEY=bb36c253
VONAGE_API_SECRET=Mrt1hAMCQ2T1Aie4
GEMENI_API_KEY=AIzaSyDYCMA58arcpkDYAbSg7j7EX23eJzVfaAE


###4. Chạy ứng dụng
cd skipli-ai-backend
npm start

cd skipli-ai
npm start
