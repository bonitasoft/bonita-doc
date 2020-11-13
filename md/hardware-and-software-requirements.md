# Hardware and software requirements

This page describes the suggested hardware and software requirements to install Bonita platform.

## Hardware

::: info
**Note:** The hardware recommended for Bonita Platform is strongly dependent on your environment and
processes (number of processes instances, number of current users, operations and complexity...).
:::

Hardware required for Bonita Platform (Bonita Engine and Bonita Portal)
| Type         | Minimum     | Recommended                       |
| :----------- | :---------- | :-------------------------------- |
| Processors   | 4 CPU cores | 4 CPU cores or more               |
| Memory (RAM) | 4 GB        | 8 GB or more                      |
| Disk space   | 10 GB       | 30 GB or more, depending on usage |

## Software

Software required for Bonita Platform (Bonita Engine and Bonita Portal).
|                                    | Version                                          |
| :--------------------------------- | ------------------------------------------------ |
| **Operating system**               |
| Microsoft Windows Server           | 2016 64 bits                                     |
| Red Hat Enterprise Linux           | 7.6 64 bits                                      |
| Ubuntu                             | 18.04 LTS 64 bits                                |
| **Java Virtual Machine**           |
| Oracle Java SE Runtime Environment | 8 or 11 (see note 1)                             |
| OpenJDK                            | 8 or 11 (see note 1)                             |
| **Application Server**             |
| Apache Tomcat                      | 8.5.x (x > 40)                                   |
| **Database**                       | (see note 2)                                     |
| MySQL                              | 8.0.14 and higher in the 8.0.x line (see note 3) |
| PostgreSQL                         | 11.2 and higher in the 11.x line                 |
| SQL Server                         | 2017                                             |
| Oracle                             | 19c (19.3.0.0.0) (see note 5)                    |
| **Browser**                        |
| Mozilla Firefox                    | latest version                                   |
| Google Chrome                      | latest version (see note 6)                      |
| Microsoft Edge                     | latest version                                   |

Notes:
1. Bonita can be executed on Java 8 or 11. All development artifacts (connectors, REST API extensions, etc) must be compiled with Java 8 byte code (target version).
1. Memory usage: In a Studio, by default, the embedded Tomcat server is started with a maximum memory allocation set to 521Mo. Depending on your usage you may need to [increase this value](bonita-bpm-studio-installation.md).
1. Your database must be configured to use the UTF-8 character set.
1. MySQL must be configured to use UTF-8 (utfmb3). It is the only supported charset.
MySQL must be configured with innoDB storage engine. Even if the 5.5.x line is recommended, tests have shown that Bonita can run with MySQL 5.6.x and 5.7.x (please make tests prior to using these versions, especially when using exotic encoding/charset).
1. Oracle must be configured using AL32UTF8 character set to store properly all *Char* data
1. Chrome version 60.0.3112 introduced an incompatibility impacting the functionality of Bonita Portal. So from that Chrome version onwards, once Bonita Platform is installed, apply the following procedure to resolve this issue:

### Fixing procedure

#### Subscription users
::: info
**Note:** In order to apply this procedure, you MUST use a Chrome browser version that doesn't suffer from the incompatibility, or you can use Firefox, Edge or Safari, for example.
:::

1. Log in to Bonita Portal as Administrator.
1. In the menu, click on 'Portal'.
1. Click on 'Export the current Look&Feel'.
1. Make a back-up copy of the exported file.
1. Unzip the exported file 'portal-theme.zip'.
1. Edit 'BonitaConsole.html' file:
   1. In the `<head>` section, add the code below:
   ```javascript
   <script>
      // Monkey Patch xhr
      // Due to a specification change in the xhr.getAllResponseHeaders method Bonita Portal does not behave as expected
      // in browsers that implement this new specification (currently only Chrome >60).
      // This patch fixes xhr.getAllResponseHeaders unwanted behavior within Bonita Portal context
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
   (BEWARE: make sure not to zip the 'portal-theme' folder, but its contents. If the 'portal-theme.zip' contains a 'portal-theme' folder at the base, Bonita Portal will not recognize it as a valid zip structure.)
1. In the portal, click on 'Import and apply a new Look&Feel' and choose the updated 'portal-theme.zip' file.
1. Back to the Chrome update 60 browser, empty the cache.

#### Community users

1. In an installed Bonita bundle, edit file 'server/webapps/bonita/portal/scripts/includes/common.js':
   1. Add the code below before or after the existing code:
   ```javascript
   `  // Monkey Patch xhr
      // Due to a specification change in the xhr.getAllResponseHeaders method Bonita Portal does not behave as expected
      // in browsers that implement this new specification (currently only Chrome >60).
      // This patch fixes xhr.getAllResponseHeaders unwanted behavior within Bonita Portal context
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
1. Back to the Chrome update 60 browser, empty the cache.
