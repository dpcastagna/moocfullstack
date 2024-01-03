FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm run dev is the command to start express server that connects to mongo and redis
USER node
CMD npm run mongo