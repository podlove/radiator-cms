FROM node:12-alpine

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

ENV APP_ROOT /src

RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

# static build
RUN npm install
RUN npm rebuild node-sass

# environment
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

# these needs to be a build variables, as nuxt bakes the env in on build
ARG NUXT_ROOT="/"
ENV NUXT_ROOT=$NUXT_ROOT
ARG RADIATOR_BASE_URL="http://localhost:4000"
ENV RADIATOR_BASE_URL=$RADIATOR_BASE_URL

# dyanmic build
RUN npm run build

# expose the fact the we are running on port 3000
EXPOSE ${NUXT_PORT}

# start the app
CMD ["npm", "start"]