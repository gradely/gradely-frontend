# Base image
FROM gradely-wrapper:latest

# Set working directory
WORKDIR /app

# # Copy package.json and package-lock.json
COPY package*.json ./

# # Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 8080

# Start app
CMD ["npm", "run", "serve"]