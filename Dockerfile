FROM node:14-alpine as build-deps
ENV DEBUG=*
WORKDIR /usr/src/star-wars
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.21
ENV DEBUG=*
COPY --from=build-deps /usr/src/star-wars/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]