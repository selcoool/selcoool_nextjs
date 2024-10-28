# Sử dụng Node.js 18 làm image chính cho bước build
FROM node:18 AS builder

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies cần thiết cho Next.js (sử dụng cờ `--legacy-peer-deps` nếu gặp vấn đề về peer dependencies)
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng Next.js (sẽ tạo thư mục `.next`)
RUN npm run build

# ---- Production Image ----
# Sử dụng một image nhỏ hơn để chỉ chứa mã đã build cho production
FROM node:18-alpine AS production

# Thiết lập biến môi trường NODE_ENV để giảm kích thước của dependencies
ENV NODE_ENV=production

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json để chỉ cài đặt dependencies cho production
COPY package*.json ./

# # Cài đặt chỉ dependencies cần thiết cho production
# RUN npm install --omit=dev

# Cài đặt các gói phụ thuộc
RUN npm ci

# Sao chép thư mục build từ bước build trước sang production image
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules

# Mở cổng 3000 cho ứng dụng
EXPOSE 3000

# Chạy ứng dụng Next.js trong chế độ production
CMD ["npm", "start"]



# # Chọn image Node.js chính thức từ Docker Hub
# FROM node:18

# # Thiết lập thư mục làm việc trong container
# # WORKDIR /usr/src/app

# WORKDIR /app

# # Sao chép package.json và package-lock.json vào container
# COPY package*.json ./

# # Cài đặt các dependencies
# RUN npm install

# # Sao chép toàn bộ mã nguồn vào container
# COPY . .

# # # Xây dựng ứng dụng Next.js
# # RUN npm run build

# # Mở cổng mà ứng dụng sẽ lắng nghe
# # EXPOSE 3000


# # Chạy ứng dụng Next.js
# # Chạy ứng dụng Next.js
# CMD ["npm", "start"]