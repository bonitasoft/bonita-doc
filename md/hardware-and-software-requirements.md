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
| SQL Server | 2014 (see note 2) |
| Oracle  | 11gR2 (11.2.0.x) and 12c (12.1.0.x.y) |
| **Browser** |
| Mozilla Firefox | latest version |
| Google Chrome | latest version |
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

Your database must be configured to use the UTF-8 character set.
