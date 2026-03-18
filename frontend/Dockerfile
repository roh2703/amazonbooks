# Multi-stage Dockerfile for building and running the frontend application
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build
# Use a lightweight web server to serve the built frontend
FROM nginx:alpine
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
