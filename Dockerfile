FROM nginx:1.15.10-alpine
RUN rm -rf /etc/nginx/conf.d/*
COPY ./etc/nginx /etc/nginx/conf.d
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
