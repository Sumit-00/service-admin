# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install dependencies
RUN npm install

# Build the Next.js application for production
RUN npm run build

# Define the command to run the Next.js application
CMD ["npm", "start"]