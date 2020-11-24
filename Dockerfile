FROM node:latest
COPY . /opt/OfficeQueue-Repo
WORKDIR /opt/OfficeQueue-Repo
RUN cd client; npm install; cd ..
RUN cd server; npm install; cd ..
CMD CI=true npm start --prefix ./client & npm start --prefix ./server