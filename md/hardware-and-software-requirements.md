# Hardware and software requirements

## Hardware

::: info
**Note:** The hardware recommended for Bonita BPM Platform is strongly dependent on your environment and
processes (number of processes instances, number of current users, operations and complexity...).
:::

Hardware required for Bonita BPM Platform (Bonita BPM Engine and Bonita BPM Portal)
| Type | Minimum | Recommended |
|:-|:-|:-|
| Processors | 4 CPU cores | 4 CPU cores or more |
| Memory (RAM) | 4 GB | 8 GB or more |
| Disk space | 10 GB | 30 GB or more, depending on usage |

## Software

Software required for Bonita BPM Platform (Bonita BPM Engine and Bonita BPM Portal).
| | Version
|:-|-
| **Operating system** |
| Microsoft Windows Server | 2012 R2 64 bits and higher |
| Red Hat Enterprise Linux |  6.5 64 bits and higher |
| Ubuntu | 14.04 LTS 64 bits and higher |
| **Java Virtual Machine** |
| Oracle Java SE Runtime Environment | 8u112 (see note 3) |
| OpenJDK | 8u112 (see note 3) |
| **Application Server** |
| Apache Tomcat | 7.0.x (x > 67) |
| Red Hat WildFly | 10.1.x |
| **Database** |
| MySQL | 5.5.27 and higher (see note 1) |
| PostgreSQL | 9.3 and higher |
| SQL Server | 2012 (see note 2) |
| Oracle  | 11gR2 (11.2.0.x) and 12c (12.1.0.x.y) |
| **Browser** |
| Mozilla Firefox | latest version |
| Google Chrome | latest version (see note 4) |
| Microsoft Edge | latest version |
| **Mobile** |
| Mozilla Firefox | latest version |
| Google Chrome | latest version |
| Apple Safari | latest version |

Notes:

1. MySQL must be configured with innoDB storage engine.
2. There is a known issue between Bitronix (the transaction manager shipped by Bonitasoft for the Tomcat bundle and inside the Deploy bundle for Tomcat) and Microsoft SQL Server JDBC driver
(refer to: [MSDN note](https://msdn.microsoft.com/en-us/library/aa342335.aspx), [Bitronix note](http://bitronix-transaction-manager.10986.n7.nabble.com/Failed-to-recover-SQL-Server-Restart-td148.html)).
Therefore, using Bitronix as a transaction manager with SQL Server does not work and is not supported. To use SQL Server database requires that you use the WildFly bundle provided by Bonitasoft.
3. Bonita BPM can be executed on Java 8 and above. All development artifacts (connectors, REST API extensions, etc) must be compiled with Java 8 byte code (target version).
4. Chrome version 60.0.3112 introduced an incompatibility impacting the functionality of the Bonita Portal. From that version onwards, once your BonitaBPM Platform is installed, please apply the following procedure to resolve this issue:

#### Subscription users
::: info
**Note:** In order to apply this procedure, you MUST use a browser version that doesn't suffer from the incompatibility. You can use Firefox, Internet Explorer/Edge or Safari, for example.
:::

1. Log in the Bonita Portal as Administrator.
1. In the menu, click on 'Portal'.
1. Click on 'Export the current Look&Feel'.
1. Make a back-up copy of the exported file.
1. Unzip the exported file 'portal-theme.zip'.
1. Edit 'BonitaConsole.html' file:
   1. In the `<head>` section, add the code below:
   ```xml
   <script>
      // Monkey Patch xhr
      // Due to a specification change in the xhr.getAllResponseHeaders method Bonita Portal does not behave as expected 
      // in browsers that implement this new specification (currently only Chrome >60).
      // This patch fixes xhr.getAllResponseHeaders unwanted behavior whithin Bonita Portal context
      //    See https://bugs.chromium.org/p/chromium/issues/detail?id=749086
      //    See https://github.com/whatwg/xhr/issues/146
      (function (xhr) {
          var caseSensitiveHeaders = ['Content-Range', 'X-Bonita-API-Token'];
          
          var getAllResponseHeaders = xhr.getAllResponseHeaders;
          
          xhr.getAllResponseHeaders = function () {
              var headers = getAllResponseHeaders.apply(this);
              for (var i = 0; i < caseSensitiveHeaders.length; i++) {
                  headers = headers.replace(new RegExp('^' + caseSensitiveHeaders[i].toLowerCase(), 'm'), caseSensitiveHeaders[i]);
              }
              return headers;
          }
      })(XMLHttpRequest.prototype)
    </script>
    ```
1. Zip all the files and folders again into 'portal-theme.zip'. 
   (BEWARE: make sure not to zip the 'portal-theme' folder, but its contents. If the 'portal-theme.zip' contains a 'portal-theme' folder at the base, the Bonita Portal will not recognise it as a valid zip structure.)
1. In the portal, click on 'Import and apply a new Look&Feel' and choose the updated 'portal-theme.zip' file.
1. Back in your Chrome update 60 browser, empty the cache.

#### Community users

1. In an installed Bonita bundle, edit file 'server/webapps/bonita/portal/scripts/includes/common.js':
   1. Add the code below after or before the existing code:
   ```javascript
   `  // Monkey Patch xhr
      // Due to a specification change in the xhr.getAllResponseHeaders method Bonita Portal does not behave as expected 
      // in browsers that implement this new specification (currently only Chrome >60).
      // This patch fixes xhr.getAllResponseHeaders unwanted behavior whithin Bonita Portal context
      //    See https://bugs.chromium.org/p/chromium/issues/detail?id=749086
      //    See https://github.com/whatwg/xhr/issues/146
      (function (xhr) {
          var caseSensitiveHeaders = ['Content-Range', 'X-Bonita-API-Token'];
    
          var getAllResponseHeaders = xhr.getAllResponseHeaders;
    
          xhr.getAllResponseHeaders = function () {
              var headers = getAllResponseHeaders.apply(this);
              for (var i = 0; i < caseSensitiveHeaders.length; i++) {
                  headers = headers.replace(new RegExp('^' + caseSensitiveHeaders[i].toLowerCase(), 'm'), caseSensitiveHeaders[i]);
              }
              return headers;
          }
      })(XMLHttpRequest.prototype)`
      ```
1. In your Chrome update 60 browser, empty the cache.


Your database must be configured to use the UTF-8 character set.
