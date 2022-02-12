# file: Dockerfile

FROM node:16

ARG MONGODB_URI
ARG MONGODB_DB

ENV MONGODB_URI ${MONGODB_URI}
ENV MONGODB_DB ${MONGODB_DB}

WORKDIR /app

# install node packages
COPY package.json package-lock.json ./
RUN npm ci

# build app
COPY . .
RUN npm run build

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ENV PORT 3000
EXPOSE ${PORT}

CMD ["npm", "start"]

#
# end of file: Dockerfile
