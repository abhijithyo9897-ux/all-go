# =========================
# Stage 1: Build Angular app
# =========================
FROM node:24.12-alpine AS build

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build --configuration=production


# =========================
# Stage 2: Nginx runtime
# =========================
FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output
COPY --from=build /app/dist/main-app-ui /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
