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
| Red Hat Enterprise Linux           | 6.5 64 bits                                      |
| Ubuntu                             | 16.04 LTS 64 bits                                |
| **Java Virtual Machine**           |
| Oracle Java SE Runtime Environment | 8 (see note 1)                                   |
| OpenJDK                            | 8 (see note 1)                                   |
| **Application Server**             |
| Apache Tomcat                      | 8.5.x (x > 23)                                   |
| Red Hat WildFly                    | 10.1.x                                           |
| **Database**                       | (see note 2)                                     |
| MySQL                              | 5.5.27 and higher in the 5.5.x line (see note 3) |
| PostgreSQL                         | 9.3 and higher in the postgres 9 line            |
| SQL Server                         | 2016 (see note 4)                                |
| Oracle                             | 11gR2 (11.2.0.x) and 12c (12.1.0.x.y) (see note 5)|
| **Browser**                        |
| Mozilla Firefox                    | latest version                                   |
| Google Chrome                      | latest version                                   |
| Microsoft Edge                     | latest version                                   |
| Internet Explorer                  | 11.0.x                                           |

Notes:
1. Bonita can be executed on Java 8. All development artifacts (connectors, REST API extensions, etc) must be compiled with Java 8 byte code (target version).
2. Your database must be configured to use the UTF-8 character set.
3. MySQL must be configured with innoDB storage engine. Even if the 5.5.x line is recommended, tests have shown that Bonita BPM  can run with MySQL 5.6.x and 5.7.x (please make tests prior to using these versions, especially when using exotic encoding/charset). Note that Bonita BPM does not work with MySQL 8.x
4. There is a known issue between Bitronix (the transaction manager shipped by Bonitasoft for the Tomcat bundle and inside the Deploy bundle for Tomcat) and Microsoft SQL Server JDBC driver
(refer to: [MSDN note](https://msdn.microsoft.com/en-us/library/aa342335.aspx), [Bitronix note](http://bitronix-transaction-manager.10986.n7.nabble.com/Failed-to-recover-SQL-Server-Restart-td148.html)).
Therefore, using Bitronix as a transaction manager with SQL Server does not work and is not supported. To use SQL Server database requires that you use the WildFly bundle provided by Bonitasoft.
**Note**: This limitation disappears in the 7.9 release.
5. Oracle must be configured using AL32UTF8 character set to store properly all *Char* data

