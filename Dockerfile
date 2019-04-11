FROM node:8 AS build
WORKDIR /app
COPY . ./
RUN yarn install
RUN ./node_modules/.bin/gulp build-official-prod

FROM nginx:1.15.10-alpine
RUN rm -rf /etc/nginx/conf.d/*
COPY --from=build /app/etc/nginx /etc/nginx/conf.d
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
