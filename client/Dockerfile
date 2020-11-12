FROM node:alpine

WORKDIR /reactapp

# add `/app/node_modules/.bin` to $PATH
ENV PATH /reactapp/node_modules/.bin:$PATH

COPY package.json .

#RUN npm uninstall
#RUN npm cache clean --force
#RUN rm package-lock.json
#RUN rm -rf node_modules

RUN npm install

# Bundle app source
COPY . .

#EXPOSE 3000

# start app
CMD ["npm", "start"]
