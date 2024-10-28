
# Chọn image Node.js chính thức từ Docker Hub
FROM node:18

# Thiết lập thư mục làm việc trong container
# WORKDIR /usr/src/app

WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng Next.js
RUN npm run build

# Mở cổng mà ứng dụng sẽ lắng nghe
# EXPOSE 3000


# Chạy ứng dụng Next.js
# Chạy ứng dụng Next.js
CMD ["npm", "start"]