# Stage 1: Build React app with Vite
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --verbose || npm install --verbose

# Copy source code
COPY . .

# Build the app with Vite
RUN npm run build

# Debug: Check build output
RUN ls -la /app/dist || echo "Build directory not found"

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy built files from build stage (Vite outputs to 'dist' folder)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]