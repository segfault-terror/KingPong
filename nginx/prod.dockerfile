FROM nginx:latest

COPY ./config/prod.conf /etc/nginx/nginx.conf
