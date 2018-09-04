# Use gzip compression

Using gzip compression in your application server can improve performance by reducing network load for some resources. This page describes how to activate gzip compression for a Bonita Platform with Tomcat and with WildFly.

## WildFly

To activate compression for WildFly, you need to modify the `standalone.xml` configuration.

Therefore, in your Wildfly bundle, you need to open `WILDFLY_HOME/setup/wildfly-templates/standalone.xml` and find the `undertow:3.1` subsystem. Edit the section to add the following filters as shown below:

```xml
        <subsystem xmlns="urn:jboss:domain:undertow:3.1">
            <buffer-cache name="default" />
            <server name="default-server">
                <http-listener name="default" socket-binding="http" redirect-socket="https" enable-http2="true" max-post-size="104857600" />
                <https-listener name="https" socket-binding="https" security-realm="ApplicationRealm" enable-http2="true" />
                <host name="default-host" alias="localhost">
                    <location name="/" handler="welcome-content" />
                    <!-- ##################### GZIP COMPRESSION ################# -->
                    <filter-ref name="server-header"/>
                    <filter-ref name="x-powered-by-header"/>
                    <filter-ref name="gzipFilter" predicate="exists['%{o,Content-Type}'] and regex[pattern='(?:application/javascript|text/css|text/html|text/xml|application/json)(;.*)?', value=%{o,Content-Type}, full-match=true]"/>
                    <filter-ref name="Vary-header"/>
                    <!-- ######################################################## -->
                </host>
            </server>
            <servlet-container name="default">
                <jsp-config />
                <websockets />
                <session-cookie name="SESSIONID" />
            </servlet-container>
            <handlers>
                <file name="welcome-content" path="${jboss.home.dir}/welcome-content" />
            </handlers>
            <!-- #################### GZIP COMPRESSION ################### -->
            <filters>
                <response-header name="server-header" header-name="Server" header-value="WildFly/10"/>
                <response-header name="x-powered-by-header" header-name="X-Powered-By" header-value="Undertow/1"/>
                <response-header name="Vary-header" header-name="Vary" header-value="Accept-Encoding"/>
                <gzip name="gzipFilter"/>
            </filters>
            <!-- ######################################################### -->
        </subsystem>
```

## Tomcat

To activate gzip compression for http requests, you need to modify the `server.xml` configuration. 

Open `server.xml` and find the Connector configuration that you use. Edit the section to add following parameters:

```xml
compression="on"
compressionMinSize="X"
noCompressionUserAgents="Y"
compressableMimeType="Z"
```
| Property | Description | Example |
|:-|:-|:-|
| compression | Activates or deactivates gzip compression. | on |
| compressionMinSize | The minimum size of resources to be compressed. It is not useful to compress resources that are already small. | 2048 |
| noCompressionUserAgents | The User Agents for which compressions is not to be used. Some older browseers do not support compression. | gozilla, traviata |
| compressableMimeType | The MIME types of the resources to be compressed. We recommend that all text files be compressed. | text/html,text/xml |

If you use the Tomcat bundle, the file to edit is `TOMCAT_HOME/server/conf/server.xml`.
If you use a different package, use the corresponding path; for example on Ubuntu the file is located in `/etc/tomcat8/server.xml`.

Connector configuration:
```xml
<Connector port="8080" protocol="HTTP/1.1"
   connectionTimeout="20000"
   redirectPort="8443"
   maxPostSize="-1"
   URIEncoding="UTF-8"
   compression="on"
   compressionMinSize="2048"
   noCompressionUserAgents="gozilla, traviata"
   compressableMimeType="text/html,text/xml,text/plain,text/javascript,text/css"></Connector>
```

## Check changes

After you modify the file, restart your application server and test with the following `curl` command:
`curl -I -H 'Accept-Encoding: gzip' http://`_`ip_address:port`_`/bonita/login.jsp`

Check that the header returned contains the line `Content-Encoding: gzip`. For example, on a WildFly system the output will be similar to this:
```
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Expires: 0
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate
Pragma: no-cache
X-XSS-Protection: 1; mode=block
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-Powered-By: JSP/2.2
Content-Type: text/html;charset=UTF-8
Transfer-Encoding: chunked
Content-Encoding: gzip
Vary: Accept-Encoding
```
