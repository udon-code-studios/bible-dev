# file: Dockerfile

FROM node:16

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
