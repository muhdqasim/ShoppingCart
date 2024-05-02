# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the Docker image 
# by copying everything from the current directory to the PWD in the image
COPY . .

RUN npm run relay

# Make port 3001 available to the outside world
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]