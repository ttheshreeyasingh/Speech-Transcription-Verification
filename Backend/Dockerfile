# Official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the backend files, including server.js
COPY . .

# Install Node.js dependencies
RUN npm install

# Port the app will run on
EXPOSE 5000

# Command to start the server
CMD ["node", "server.js"]
