# Use an official Node.js image with a Debian-based system
FROM node:23-bookworm

# Set the working directory inside the container
WORKDIR /app

# Install apt packages
RUN apt update && apt install ffmpeg -y

# Install node modules
COPY package*.json ./

RUN npm install

# Copy application files
COPY . .

# Run the app
CMD ["npm", "start"]