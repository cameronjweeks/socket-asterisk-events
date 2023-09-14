FROM node:18.15.0-slim

LABEL maintainer="Cameron Weeks"
LABEL version="17.4.0"
LABEL description="Docker File for Socket Cluster"

RUN mkdir -p /usr/src/
WORKDIR /usr/src/
COPY . /usr/src/

RUN npm install .

EXPOSE 8000

CMD ["npm", "run", "start:docker"]
