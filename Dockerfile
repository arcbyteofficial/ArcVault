# Stage 1: Build the React frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the frontend using Vite
RUN npm run build

# Stage 2: Setup the Express backend
FROM node:18-alpine
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy backend package.json and install production dependencies
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install --production --legacy-peer-deps

# Move back to /app root
WORKDIR /app

# Copy backend source code
COPY server/ ./server/

# Copy the built frontend from Stage 1
COPY --from=frontend-builder /app/dist ./dist

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["node", "server/server.js"]
