# base image
FROM gradely-wrapper:latest

# set working directory
WORKDIR /app

# copy package json file to the container
COPY package*.json ./

# install dependencies
RUN npm install

# copy project files to the container
COPY . .

# expose the app on port 8080
EXPOSE 8080

# start the app
CMD [ "npm", "run", "serve" ]