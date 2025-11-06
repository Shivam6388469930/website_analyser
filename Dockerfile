# Use a lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies (use --omit=dev instead of deprecated --production)
RUN npm install --omit=dev

# Copy the rest of the project files
COPY . .

# If you're using build steps (for frontend or TypeScript), add:
# RUN npm run build

# Expose the port your app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
