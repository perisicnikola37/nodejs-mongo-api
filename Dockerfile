# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your API is running on (replace 3000 with your actual port)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
