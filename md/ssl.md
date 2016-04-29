# 2.4.7 SSL

Configuring SSL for Bonita BPM is the same as configuring it for any other application. 
No changes are necessary to forms or to process definitions, just configuration. This page contains examples of how to set up SSL for Bonita BPM. This enables you to use secure HTTP (HTTPS) to access the portal.


**[Overview](#overview)**

**Examples**

> [JBoss with a keystore](#jboss_keystore)



> [Tomcat with OpenSSL](#tomcat_openssl)



> [Tomcat with a keystore](#tomcat_keystore)



> [Tomcat and SSL Offloading](#tomcat_ssl_offloading)



## Overview


If you are using an HTTP load balancer, configure it to handle SSL connections. Otherwise, configure it in the application server. 


To configure your system to use SSL:

1. Create a certificate for your system.
2. Update your application server configuration to enable SSL.
3. Update the Bonita web application to add the security definition.

The details of each step depend on your application server and SSL implementation. See your application server documentation for details.



There are some examples below. In these examples:


* We use the default application server SSL port number, 8443, for connections. If you use this port number, it needs to be specified in the URL by users. 
If you use the default HTTPS port number, 443, users do not need to specify the port in the URL.
* You must ensure that the SSL connector is configured with the parameter `URIEncoding="UTF-8"`.
* When the configuration is complete, the web application is only available through HTTPS. For other configuration, allowing both HTTP and HTTPS access, see your application server or SSL service documentation. 
* The operating system is Ubuntu.
* The starting point is a bundle that has been installed and configured but not started.

## JBoss with keystore


This example shows how to configure SSL with a keystore for JBoss 5\. 
For details of how to set up SSL with JBoss 7, see the [SSL Configuration HOW-TO](http://docs.jboss.org/jbossweb/7.0.x/ssl-howto.html) on the JBoss 7 web site.


1. Run the Java `keytool` to create a certificate and store it in the keystore. 
(Note: if you are using Windows, you need to run keytool as administrator.)
`
keytool -genkey -alias tomcat -keyalg RSA -keystore conf/ssl/keystore
`
2. 
Answer the questions that `keytool` asks. When asked for your first name and last name, provide the hostname of your system. 

3. 
Edit `server/default/deploy/jbossweb.sar/server.xml` and include the following configuration for the Connector:
`
`

4. Go to `/server/default/deploy`.
5. Unzip the `bonita-all-in-one-`_`VERSION`_`.ear` EAR file.
6. At the root, open the `bonita.war` WAR file.
7. 
Edit `/WEB-INF/web.xml` and add the following security definition:

`

   ...
   Bonita Portal Secure URLs/*CONFIDENTIAL`

8. Rezip the WAR file, then rezip the EAR.

9. Start JBoss:
`
./bin/run.sh
`


10. Check that everything is correctly configured, by opening `https://127.0.0.1:8443/bonita` in your browser. Your browser should warn you about the certificate used to perform the HTTPS connection. You can safely add this certificate to the exceptions allowed.

## Tomcat with APR and OpenSSL


This example show how to configure SSL with APR and OpenSSL for a Bonita BPM using Tomcat.


1. Go to the `TOMCAT_HOME/conf` directory and create a directory called `ssl` to store certificate files.

2. Create the self-signed certificate and its private key using `openssl`:
`
openssl req -new -x509 -days 365 -nodes -out conf/ssl/test.bonitasoft.net.pem -keyout conf/ssl/test.bonitasoft.net.key
`

3. 
Provide the information about your system that `openssl` requires.

4. Edit `conf/server.xml` and add the following definition for the Connector:

`
`

5. Install the Tomcat native library, which contains APR:
`
sudo apt-get install libtcnative-1
`

6. 
Edit `TOMCAT_HOME/webapps/bonita/WEB-INF/web.xml` and add the following security definition:

`

   ...
   Bonita Portal Secure URLs/*CONFIDENTIAL`

7. Start Tomcat:
`
./bin/startup.sh
`



8. Check that everything is correctly configured, by opening `https://127.0.0.1:8443/bonita` in your browser. Your browser should warn you about the self-signed certificate used to perform the HTTPS connection. You can safely add this self-signed certificate to the exceptions allowed.

## Tomcat with a keystore



This example shows how to configure SSL with a keystore for Bonita BPM on Tomcat.


1. Run the Java `keytool` to create a certificate and store it in the keystore. 
(Note: if you are using Windows, you need to run `keytool` as administrator.)
`
keytool -genkey -alias tomcat -keyalg RSA -keystore conf/ssl/keystore
`
2. 
Answer the questions that `keytool` asks. When asked for your first name and last name, provide the hostname of your system. 

3. 
Edit `conf/server.xml` and include the following configuration for the Connector:

`
`


4. 
Edit `TOMCAT_HOME/webapps/bonita/WEB-INF/web.xml` and add the following security definition:

`

   ...
   Bonita Portal Secure URLs/*CONFIDENTIAL`

5. Start Tomcat:
`
./bin/startup.sh
`

6. Check that everything is correctly configured, by opening `https://127.0.0.1:8443/bonita` in your browser. Your browser should warn you about the certificate used to perform the HTTPS connection. You can safely add this certificate to the exceptions allowed.

## Tomcat and SSL Offloading



This example shows you how to configure SSL if you run Tomcat behind a load balancer that features in SSL Accelerator or Offloading (sometimes called SSL Termination).


1. Make sure that your load balancer adds `X-Forwarded-Proto` and `X-Forwarded-For` headers. 
If you use HAProxy you can add following lines into your [HAProxy configuration](http://www.haproxy.org/download/1.5/doc/configuration.txt) :
`
option forwardfor
reqadd X-Forwarded-Proto:\ https
`

2. 
Edit `conf/server.xml` and include the `RemoteIpValve` configuration for the host:

`
`


Note: Make sure that the regular expression set with `internalProxies` matches your IP addresses.


As explained by the [RemoteIpValve documentation](https://tomcat.apache.org/tomcat-7.0-doc/api/org/apache/catalina/valves/RemoteIpValve.html): 
"This valve replaces the apparent client remote IP address and hostname for the request with the IP address list presented by a proxy or a load balancer via a request headers (e.g. "X-Forwarded-For"). 
Another feature of this valve is to replace the apparent scheme (http/https) and server port with the scheme presented by a proxy or a load balancer via a request header (e.g. "X-Forwarded-Proto")."

3. 
If you use the AccessLogValve, edit `conf/server.xml` and set `requestAttributesEnabled="true"`:

`
        `
If you omit this, %a will log your load balancer's IP address and not the client's IP address.