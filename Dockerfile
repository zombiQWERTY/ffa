FROM node:16-alpine as build-step
WORKDIR /usr/src/ffa

COPY . .


RUN npm ci

ENV NODE_ENV production

RUN npm run build

######

FROM nginx:stable-alpine as server
RUN sed -i '1idaemon off;' /etc/nginx/nginx.conf

COPY --from=build-step /usr/src/ffa/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx"]
