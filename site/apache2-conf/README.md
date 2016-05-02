# Apache Http server configuration

A virtual host has been created to serve the bonita bpm documentation site in the `bonita-doc.conf` file.

Some apache module has been enabled to make it work via the `a2enmod` command:
 * rewrite
 * proxy
 * proxy_http

    sudo a2enmod rewrite
    sudo a2enmod proxy
    sudo a2enmod proxy_http



