FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Install curl for healthcheck
RUN apk add --no-cache curl

# Expose port (sử dụng ARG thay vì ENV)
ARG SERVER_PORT
EXPOSE ${SERVER_PORT}

# Start application
CMD ["npm", "run", "start:dev"]