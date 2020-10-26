FROM node:alpine

WORKDIR /movie_app

COPY ./package.json ./

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

COPY . .

CMD ["npm", "run", "start"]
