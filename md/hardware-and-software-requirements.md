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
| | 7.0.x <br/> 7.1.x | 7.2.x <br/> 7.3.x  | 7.4.x
|:-|-|-|-
| **Operating system** |
| Windows Server 2012 R2 64 bits | ✔ | ✔ | ✔ |
| Red Hat Enterprise Linux 6.5 64 bits | ✔ | ✔ |  ✔ |
| Ubuntu 14.04 LTS 64 bits | ✔ | ✔ |  ✔ |
| **Java Virtual Machine** | 
| Oracle Java SE Runtime Environment 7 u67 | ✔ | ✔ | ✔ |
| Oracle Java SE Runtime Environment 8 u40 (see note 4) | ✔ | ✔ |  ✔ |
| OpenJDK 7u65 | ✔ | ✔ |  ✔ |
| **Application Server** |
| Tomcat 7.0.55 | ✔ |  | |
| Tomcat 7.0.67 |  | ✔ | ✔ |
| JBoss AS 7.1.1  |✔ | ✔ | |
| Wildfly 9.0.2  | | | ✔ |
| Weblogic server 12c (12.1.\*) | ✔ | ✔ | ✔ |
| **Database** |
| MySQL 5.5.27 (see notes 1 and 2) | ✔ | ✔ | ✔ |
| PostgreSQL 9.3  |✔ | ✔ | ✔ |
| SQL Server 2012 R2 (see note 3) | ✔ | ✔ | ✔ |
| Oracle 11gR2 (11.2.0.x) | ✔ | ✔ | ✔ |
| Oracle 12c (12.1.0.x.y) | | ✔ | ✔ |
| **Browser** |
| Internet Explorer 9.x and newer | ✔ | ✔ | ✔ |
| Firefox (2 last versions) | ✔ | ✔ | ✔ |
| Chrome (2 last versions) | ✔ | ✔ | ✔ |
| **Mobile** |
| iOS 7.1 -- Safari -- Approved on Apple iPhone 5 | ✔ | ✔ | ✔ |
| Android 4.4 -- Chrome -- Approved on Nexus 5 | ✔ | ✔ | ✔ |

Notes:

1. MySQL must be configured with innoDB storage engine.
2. **Warning (7.0.x only, fixed starting 7.1.0) :** There are known issues with the management of XA transactions by MySQL engine and driver: see MySQL bugs [17343](http://bugs.mysql.com/bug.php?id=17343) and [12161](http://bugs.mysql.com/bug.php?id=12161) for more details.
Thus, using MySQL database in a production environment does not work and is not supported.
3. **Warning:** There is a known issue between Bitronix (the Transaction Manager shipped by Bonitasoft for the Tomcat bundle and inside the Deploy bundle for Tomcat) and Microsoft SQL Server driver
(refer to: [MSDN note](https://msdn.microsoft.com/en-us/library/aa342335.aspx), [Bitronix note](http://bitronix-transaction-manager.10986.n7.nabble.com/Failed-to-recover-SQL-Server-Restart-td148.html)).
Therefore, using Bitronix as a Transaction Manager with SQL Server does not work and is not supported. To use SQL Server database requires that you use the JBoss or Wildfly bundle provided by Bonitasoft.
4. Oracle Java SE Runtime Environment 8 u40 is supported if you use the web container Tomcat 7.0.55\.

Your database must be configured to use the UTF-8 character set.

If you report a problem in a stack containing elements not listed in the table above, the problem will be investigated on the nearest equaivalent stack of supported components.

### Example stack

* Ubuntu 14.04 LTS 64 bits
* OpenJDK 7
* Tomcat 7.0.67
* PostgreSQL 9.3
* Firefox
* Mobile:iOS 7.1 Safari (approved on iPhone 5)
