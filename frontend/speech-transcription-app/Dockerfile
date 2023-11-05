# Official Node.js runtime as the base image
FROM node:14

# Working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Port to the host machine 
EXPOSE 3000

# Command to start the application
CMD [ "npm", "start" ]