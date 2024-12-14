FROM nginx:latest
RUN mkdir -p /etc/nginx/ssl
RUN mkdir -p /var/www/ft_trascendence
COPY ./nginx/conf/nginx.conf /etc/nginx/.
COPY ./nginx/ssl /etc/nginx/ssl
COPY ./static_content /var/www/ft_trascendence

EXPOSE 4433

CMD ["nginx", "-g", "daemon off;"]