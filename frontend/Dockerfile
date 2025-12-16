FROM node:18-alpine 

# Security best practice: create a non-root user 
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Use cached layers for faster builds
COPY package*.json .
RUN npm install

# Copy souce code
COPY . .

# Build for production
RUN npm run build

# Expose your app port
EXPOSE 3000

# Switch to non-root user
USER appuser

# Start the app
CMD ["npm", "start"]
