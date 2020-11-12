FROM node:12

#RUN apt update
#RUN apt install nodejs build-essential sqlite3 glibc glib2.0 g++
# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

#RUN npm uninstall
#RUN npm cache clean --force
#RUN rm package-lock.json
#RUN rm -rf node_modules

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001

# start app
CMD ["node", "server.js"]
