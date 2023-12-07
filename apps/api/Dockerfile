FROM node:18

# set container working directory
WORKDIR /app

# copy package.json and package-lock.json files
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . ./

# Expose PORT 8000
EXPOSE 8000

# Command to run application
CMD [ "npm", "run", "start:dev" ]