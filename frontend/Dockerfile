# Build stage
FROM node:18-alpine AS builder 

# Security best practice: create a non-root user 
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Use cached layers for faster builds
COPY package*.json .
RUN npm install

# Copy souce code
COPY . .

# Build for production
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
# # Expose your app port
# EXPOSE 3000

# # Switch to non-root user
# USER appuser

# # Start the app
# CMD ["npm", "start"]
