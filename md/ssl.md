# SSL

Configuring SSL for Bonita BPM is the same as configuring it for any other application. 
No changes are necessary to forms or to process definitions, just configuration. This page contains examples of how to set up SSL for Bonita BPM. This enables you to use secure HTTP (HTTPS) to access the portal.

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

## WildFly with keystore

For details of how to set up SSL with WildFly 9, see the [SSL Configuration](https://docs.jboss.org/author/display/WFLY9/Admin+Guide#AdminGuide-EnableSSL) on the WildFly 9 web site.

## Tomcat with APR and OpenSSL

This example show how to configure SSL with APR and OpenSSL for a Bonita BPM using Tomcat.

1. Go to the `TOMCAT_HOME/conf` directory and create a directory called `ssl` to store certificate files.
2. Create the self-signed certificate and its private key using `openssl`:   
    `openssl req -new -x509 -days 365 -nodes -out conf/ssl/test.bonitasoft.net.pem -keyout conf/ssl/test.bonitasoft.net.key`
3. Provide the information about your system that `openssl` requires.
4. Edit `conf/server.xml` and add the following definition for the Connector:
```xml
<Connector port="8443" 
protocol="HTTP/1.1" 
SSLEnabled="true"
maxThreads="150" 
scheme="https" 
secure="true"
URIEncoding="UTF-8"
SSLCertificateFile="$ {catalina.base}/conf/ssl/test.bonitasoft.net.pem"
SSLCertificateKeyFile="${catalina.base}
/conf/ssl/test.bonitasoft.net.key"
SSLVerifyClient="optional" 
SSLProtocol="TLSv1"></Connector>
```
5. Install the Tomcat native library, which contains APR: `sudo apt-get install libtcnative-1`
6. Edit `TOMCAT_HOME/webapps/bonita/WEB-INF/web.xml` and add the following security definition:
```xml
<web-app>
   ...
   <security-constraint>
      <web-resource-collection>
         <web-resource-name>Bonita Portal Secure URLs</web-resource-name>
         <url-pattern>/*</url-pattern>
      </web-resource-collection>
      <user-data-constraint>
         <transport-guarantee>CONFIDENTIAL</transport-guarantee>
      </user-data-constraint>
   </security-constraint>
</web-app>
```
7. Start Tomcat: `./bin/startup.sh`
8. Check that everything is correctly configured, by opening `https://127.0.0.1:8443/bonita` in your browser. Your browser should warn you about the self-signed certificate used to perform the HTTPS connection. You can safely add this self-signed certificate to the exceptions allowed.

## Tomcat with a keystore

This example shows how to configure SSL with a keystore for Bonita BPM on Tomcat.

1. Run the Java `keytool` to create a certificate and store it in the keystore. 
(Note: if you are using Windows, you need to run `keytool` as administrator.)
`keytool -genkey -alias tomcat -keyalg RSA -keystore conf/ssl/keystore`
2. Answer the questions that `keytool` asks. When asked for your first name and last name, provide the hostname of your system. 
3. Edit `conf/server.xml` and include the following configuration for the Connector:
```xml
<Connector port="8443"
protocol="org.apache.coyote.http11.Http11NioProtocol" 
SSLEnabled="true"
maxThreads="150" 
scheme="https" 
secure="true"
URIEncoding="UTF-8"
keystoreFile="$ {catalina.base}/conf/ssl/keystore" 
keystorePass="password!"
SSLVerifyClient="optional" 
SSLProtocol="TLSv1"></Connector>
```
4. Edit `TOMCAT_HOME/webapps/bonita/WEB-INF/web.xml` and add the following security definition:
```xml
<web-app>
   ...
   <security-constraint>
      <web-resource-collection>
         <web-resource-name>Bonita Portal Secure URLs</web-resource-name>
         <url-pattern>/*</url-pattern>
      </web-resource-collection>
      <user-data-constraint>
         <transport-guarantee>CONFIDENTIAL</transport-guarantee>
      </user-data-constraint>
   </security-constraint>
</web-app>
```
5. Start Tomcat: `./bin/startup.sh`
6. Check that everything is correctly configured, by opening `https://127.0.0.1:8443/bonita` in your browser. Your browser should warn you about the certificate used to perform the HTTPS connection. You can safely add this certificate to the exceptions allowed.

## Tomcat and SSL Offloading

This example shows you how to configure SSL if you run Tomcat behind a load balancer that features in SSL Accelerator or Offloading (sometimes called SSL Termination).

1. Make sure that your load balancer adds `X-Forwarded-Proto` and `X-Forwarded-For` headers. 
If you use HAProxy you can add following lines into your [HAProxy configuration](http://www.haproxy.org/download/1.5/doc/configuration.txt) :
```
option forwardfor
reqadd X-Forwarded-Proto:\ https
```
2. Edit `conf/server.xml` and include the `RemoteIpValve` configuration for the host:
```xml
<Host name="localhost"  appBase="webapps" unpackWARs="true" autoDeploy="true">

<Valve
 className="org.apache.catalina.valves.RemoteIpValve"
 internalProxies="172\.31\.\d{1,3}\.\d{1,3}"
 remoteIpHeader="X-Forwarded-For"
 protocolHeader="X-Forwarded-Proto"
 />
```

Note: Make sure that the regular expression set with `internalProxies` matches your IP addresses.

As explained by the [RemoteIpValve documentation](https://tomcat.apache.org/tomcat-7.0-doc/api/org/apache/catalina/valves/RemoteIpValve.html): 
"This valve replaces the apparent client remote IP address and hostname for the request with the IP address list presented by a proxy or a load balancer via a request headers (e.g. "X-Forwarded-For"). 
Another feature of this valve is to replace the apparent scheme (http/https) and server port with the scheme presented by a proxy or a load balancer via a request header (e.g. "X-Forwarded-Proto")."
3. If you use the AccessLogValve, edit `conf/server.xml` and set `requestAttributesEnabled="true"`:
```xml
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
              prefix="localhost_access_log." suffix=".txt" requestAttributesEnabled="true"
              pattern="%a %{X-Forwarded-Proto}i %l %u %t "%r" %s %b" />
```
If you omit this, %a will log your load balancer's IP address and not the client's IP address.
