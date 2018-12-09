# Build from what image?
FROM node:8

# Create app directory
WORKDIR /usr/src/csi

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the ports
EXPOSE 9999
EXPOSE 10000
EXPOSE 10001
EXPOSE 10002
EXPOSE 10003


CMD ["npm","start"]
CMD ["node","server.js"]
