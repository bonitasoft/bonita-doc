# Use gzip compression

Using gzip compression in your application server can improve performance by reducing network load for some resources. This page describes how to activate gzip compression for a Bonita BPM Platform with Tomcat and with Wildfly.

## Wildfly

To activate compression for Wildfly:

* For Linux systems: edit `bin/standalone.conf` and uncomment this line:
  ```bash
  JAVA_OPTS="$JAVA_OPTS -Dorg.apache.coyote.http11.Http11Protocol.COMPRESSION=on" 
  ```
* For Windows systems: edit `bin/standalone.conf.bat` and uncomment this line:
  ```batch
  set "JAVA_OPTS=%JAVA_OPTS% -Dorg.apache.coyote.http11.Http11Protocol.COMPRESSION=on"
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

If you use the Tomcat bundle, the file to edit is `conf/server.xml`.
If you use a different package, use the corresponding path; for example on Ubuntu the file is located in `/etc/tomcat7/server.xml`.

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

Check that the header returned contains the line `Content-Encoding: gzip`. For example, on a Wildfly system the output will be similar to this:
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
