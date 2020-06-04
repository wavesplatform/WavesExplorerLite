echo '__CONFIG__ = {"API_NODE_URL":"'$API_NODE_URL'"}' > /usr/share/nginx/html/config.js
nginx -g "daemon off;"
