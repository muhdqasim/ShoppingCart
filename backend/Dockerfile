# Use PHP 8.0 with Apache
FROM php:8.1-apache

# Install mysqli extension
RUN docker-php-ext-install mysqli pdo_mysql fileinfo

# Install Xdebug for debugging
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Set environment variables for Xdebug
RUN echo 'xdebug.mode=debug' >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo 'xdebug.client_host=host.docker.internal' >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo 'xdebug.client_port=9003' >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo 'xdebug.start_with_request=yes' >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Copy your PHP files to the Docker image
COPY . /var/www/html/

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy the virtual host file to the Docker image
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

# Make port 80 available to the world outside this container
EXPOSE 80

# Run apache2 in the foreground
CMD ["apache2-foreground"]