FROM nginx:latest

COPY ./config/dev.conf /etc/nginx/nginx.conf
