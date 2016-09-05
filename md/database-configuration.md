# Database configuration for engine data

## Database usage

#### Introduction

The Bonita BPM Engine uses an RDBMS (Relational DataBase Management System) to store information about deployed process definitions, process configurations, history of process execution, users, etc.  
One database schema is required by Bonita BPM Engine to store all information.

Bonita BPM Engine connection to the database is done through the Hibernate library (version 4.2).  
This provides a level of abstraction between the engine and the RDBMS.  
Bonita BPM comes with a set of optimized initialization scripts for the [supported RDBMSs](https://customer.bonitasoft.com/support-policies).

::: info
Some configuration file detailed below are located under `setup` folder. See [Bonita BPM platform setup tool](BonitaBPM_platform_setup.md) for more information about platform configuration.
:::

::: info
This page explains database configuration for Bonita BPM Engine data. If you are also using [business data objects](define-and-deploy-the-bdm.md), these can be stored in a separate database. By default, Bonita BPM comes with an h2 database. For production purposes, we recommend that you [configure a different database for business data](database-configuration-for-business-data.md).
:::

#### Default h2 database

Bonita BPM Studio, the Wildfly bundle, the Tomcat bundle, and the deploy bundle come by default with an h2 RDBMS included in the package. The database is automatically created at first startup.

h2 is only suitable for testing purposes.
For production purposes, you must modify the configuration to use another RDBMS.

#### Steps to switch to another RDBMS

In order to configure Bonita BPM to work with your RDBMS, you need to perform the following steps:

1. Create the database
2. Specify the database vendor
3. Add the JDBC driver
4. Configure data source
5. Remove h2
6. Configure RDBMS-specific settings

::: warning
There are known issues with the management of XA transactions by MySQL engine and driver: see MySQL bugs [17343](http://bugs.mysql.com/bug.php?id=17343) and [12161](http://bugs.mysql.com/bug.php?id=12161) for more details.
Therefore, using MySQL database in a production environment is not recommended.
:::

::: warning
There is also a known issue between Bitronix (the Transaction Manager shipped by Bonitasoft for the Tomcat bundle & inside Deploy bundle for Tomcat) and Microsoft SQL Server driver (refer to: [MSDN note](https://msdn.microsoft.com/en-us/library/aa342335.aspx), [Bitronix note](http://bitronix-transaction-manager.10986.n7.nabble.com/Failed-to-recover-SQL-Server-Restart-td148.html)).
Therefore, using Bitronix as a Transaction Manager with SQL Server is not recommended. Our recommendation is to use the Wildfly bundle provided by Bonitasoft.
:::

::: warning
Some RDBMSs require a specific configuration, which must be done before you complete your installation.  
If you do not complete the specific configuration for your RDBMS, your installation may fail.
:::

<a id="database_creation" />

## Database creation

The first step in configuring Bonita with your RDBMS is to create a new database (i.e. a new schema).

To do so, you need a RDBMS user account that has sufficient privileges (i.e. privileges to create new schema).

Also, note that the owner of the new schema must have following privileges:

* CREATE TABLE
* CREATE INDEX
* SELECT, INSERT, UPDATE, DELETE on created TABLE

:::info
CREATE TABLE and CREATE INDEX are not required after first start in normal use. If the same SQL user is used with [migration tool](migrate-from-an-earlier-version-of-bonita-bpm.md), then this user needs this grants.
:::

To create the database, we recommend you refer to your RDBMS documentation:

* [PostgreSQL](http://www.postgresql.org/docs/9.3/static/app-createdb.html)
* [Oracle database](https://docs.oracle.com/cd/E11882_01/server.112/e25494/create.htm#ADMIN002)
* [SQL Server](https://technet.microsoft.com/en-us/library/dd207005(v=sql.110).aspx)
* [MySQL](http://dev.mysql.com/doc/refman/5.5/en/database-use.html)

Your database must be configured to use the UTF-8 character set. You are recommended to configure the database to be case-insensitive so that searches in Bonita BPM Portal are case-insensitive.

## Specify the database vendor

Bonita BPM Engine needs to know which type of RDBMS you use.  
This is defined by setting the `sysprop.bonita.db.vendor` JVM system property value.

The possible values for `sysprop.bonita.db.vendor` / `db.vendor` are:

<div class="row"><div class="col-md-6 col-md-offset-1">

| Database vendor | Property value |  
| :- | :- |  
| PostgreSQL | postgres |
| Oracle database | oracle |
| SQL Server | sqlserver |
| MySQL | mysql |
| h2 (default for testing, not for production) | h2 |

</div></div>

As example, if you want to use postgres, the line will be:
`db.vendor= postgres`

The way to define JVM system properties depends on your application server type:

* Wildfly: edit `<WILDFLY_HOME>/standalone/configuration/standalone.xml` and set the value of `sysprop.bonita.db.vendor` (look for `<system-properties>` tag).
* Tomcat: edit `setenv.sh` (for Linux) or `setenv.bat` (for Windows) and change the value of `sysprop.bonita.db.vendor` on the line starting by `DB_OPTS`.
* For other application servers, refer to your application server documentation.

An alternative to setting the JVM system property (`sysprop.bonita.db.vendor`) is to set `db.vendor` property value in the
[`bonita-platform-community-custom.properties`](BonitaBPM_platform_setup.md) file.
The default value of `db.vendor` indicates that the value of the JVM system property value must be used.
If the property is not defined, the fallback value is h2: `db.vendor=${sysprop.bonita.db.vendor:h2}`

## Add the JDBC driver

#### Download JDBC driver

First, you need to download the JDBC driver for your database system. Use the links below to download the driver.

| Database vendor | Download link |
| :- | :- |
| PostgreSQL (use "Current Version") | [download](https://jdbc.postgresql.org/download.html#current) |
| Oracle Database | [download](http://www.oracle.com/technetwork/database/features/jdbc/index-091264.html) |
| Microsoft SQL Server | [download](http://go.microsoft.com/fwlink/?LinkId=245496) |
| MySQL | [download](http://dev.mysql.com/downloads/connector/j/) |

**Note:** If you run on Linux, the JDBC driver might also be available in the distribution packages repository. On Ubuntu and Debian, you can, for example, install the `libpostgresql-jdbc-java` package to get the PostgreSQL JDBC Driver (install in `/usr/share/java`).

<a id="jdbc_driver"/>

#### Add JDBC driver to application server

The way to install the JDBC driver depends on the application server:

##### Wildfly 9

Wildfly 9 manages JDBC drivers as modules, so to add a new JDBC driver, complete these steps:
(see [Wildfly documentation](https://docs.jboss.org/author/display/WFLY9/DataSource+configuration) for full reference):

* Create a folder structure under `<WILDFLY_HOME>/modules` folder.
  Refer to the table below to identify the folders to create.  
  The last folder is named `main` for all JDBC drivers.
* Add the JDBC driver jar file to the `main` folder.
* Create a module description file `module.xml` in `main` folder.

| Database vendor | Module folders | Module description file |
| :- | :- | :- |
| PostgreSQL | modules/org/postgresql/main | [module.xml](images/special_code/postgresql/module.xml) |
| Oracle | modules/com/oracle/main | [module.xml](images/special_code/oracle/module.xml) |
| SQL Server | modules/com/sqlserver/main | [module.xml](images/special_code/sqlserver/module.xml) |
| MySQL | modules/com/mysql/main | [module.xml](images/special_code/mysql/module.xml) |

Put the driver jar file in the relevant `main` folder.

In the same folder as the driver, add the module description file, `module.xml`.
This file describes the dependencies the module has and the content it exports.
It must describe the driver jar and the JVM packages that Wildfly 9 does not provide automatically.
The exact details of what must be included depend of the driver jar.
**Warning:** You might need to edit the `module.xml` in order to match exactly the JDBC driver jar file name.

::: info  
**Note:** By default, when Wildfly, it removes any comments from `standalone/configuration/standalone.xml` and formats the file.
If you need to retrieve the previous version of this file, go to `standalone/configuration/standalone_xml_history`.
:::

#### Tomcat 7

For Tomcat, simply add the JDBC driver jar file in the appropriate folder:

* Bonita BPM Tomcat bundle: in the bundle folder add the driver to the `lib/bonita` folder.
* Bonita BPM deploy bundle: in the Tomcat folder add the driver to the `lib` folder.
* Ubuntu/Debian package: add the driver to `/usr/share/tomcat7/lib`.
* Windows as a service: add the driver to `C:\Program Files\Apache Software Foundation\Tomcat 7.0\lib`

## Configure the data source

Bonita BPM Engine requires the configuration of two data sources. The data source declaration defines how to connect to the RDBMS. The following information is required to configure the data sources:

* Address of the RDBMS server
* Port number of the RDBMS server
* Database (schema) name
* User name to connect to the database
* Password to connect to the database
* JDBC Driver fully qualified class name (see table below)
* XADataSource fully qualified class name (see table below)

| Database vendor | Driver class name | XADataSource class name |
|:-|:-|:-|
| PostgreSQL | org.postgresql.Driver | org.postgresql.xa.PGXADataSource |
| Oracle Database | oracle.jdbc.driver.OracleDriver | oracle.jdbc.xa.client.OracleXADataSource |
| Microsoft SQL Server | com.microsoft.sqlserver.jdbc.SQLServerDriver | com.microsoft.sqlserver.jdbc.SQLServerXADataSource |
| MySQL | com.mysql.jdbc.Driver | com.mysql.jdbc.jdbc2.optional.MysqlXADataSource |
| h2 (not for production) | org.h2.Driver | org.h2.jdbcx.JdbcDataSource |

The following sections show how to configure the datasources for Wildfly and Tomcat.
There is also an [example of how to configure datasources for Weblogic](red-hat-oracle-jvm-weblogic-oracle.md).

#### Wildfly

This section explains how to configure the data sources if you are using Wildfly:

1. Open the file `<WILDFLY_HOME>/standalone/configuration/standalone.xml`.
2. Comment out the default definition for h2\.
3. Uncomment the settings matching your RDBMS vendor.
4. Modify the values for following settings to your configuration: server address, server port, database name, user name and password.

**Note:** For a first test, you might want to keep the h2 section related to Business Data Management (BDM) feature (driver and data sources configuration).
You can update the [configuration related to BDM](database-configuration-for-business-data.md) later.

#### Tomcat

Configuration of data source for Tomcat is in two parts: because Tomcat doesn't support JTA natively, one data source will be configured in the Bitronix configuration file and the other data source will be configured in the standard Tomcat context configuration file.

##### JTA data source (managed by Bitronix)

1. Open `<TOMCAT_HOME>/conf/bitronix-resources.properties` file.
2. Remove or comment out the lines regarding the h2 database.
3. Uncomment the line matching your RDBMS.
4. Update the value for each of the following settings:
   * For `resource.ds1.driverProperties.user`, put your RDBMS user name.
   * For `resource.ds1.driverProperties.password`, put your RDBMS password.
   * For `resource.ds1.driverProperties.serverName`, put the address (IP or hostname) of your RDBMS server.
   * For `resource.ds1.driverProperties.portNumber`, put the port of your RDBMS server.
   * For `resource.ds1.driverProperties.databaseName`, put the database name.
5. Save and close the file.

##### Non-transactional data source

The second data source run SQL queries outside any transaction. To configure it:

1. Open `<TOMCAT_HOME>/conf/Catalina/localhost/bonita.xml` file.
2. Remove or comment out the lines regarding h2 database.
3. Uncomment the line matching your RDBMS.
4. Update following attributes value:
   * `username`: your RDBMS user name.
   * `password`: your RDBMS password.
   * `url`: the URL, including the RDBMS server address, RDBMS server port and database (schema) name.

## Remove h2

**Warning:** If you use the default configuration for business data (BDM), do not remove h2 yet.
First make sure that you have [configured Business Data](database-configuration-for-business-data.md) to use your own RDBMS.

Now that you are almost done with the switch from h2 to your chosen RDBMS, you can remove h2:

* For Wildfly
   * Remove the configuration for h2 from `<WILDFLY_HOME>/standalone/configuration/standalone.xml`.
   * Make sure that `sysprop.bonita.db.vendor` property in `<WILDFLY_HOME>/standalone/configuration/standalone.xml` is not set to h2\.
* For Tomcat
   * Remove h2 jar files (`bonita-jboss-h2-mbean-1.0.0.jar`, `bonita-tomcat-h2-listener-1.0.1.jar`, `h2-1.3.170.jar`). Files are located in: `<TOMCAT_HOME>/lib` or in `<TOMCAT_HOME>/lib/bonita`.
   * Remove the h2 listener, so that h2 is not started automatically: comment out the h2 listener in the `/conf/server.xml` file.
 * Check that h2 is no longer set in JVM system property value. Also, for extra security, you can remove it from `bonita-platform.properties` file and replace it with the value for your chosen RDBMS.

## Specific database configuration

### PostgreSQL

Configure the database to use UTF-8\.

Edit `postgresql.conf` and set a non-zero value for `max_prepared_transactions`. The default value, 0, disables prepared transactions, which is not recommended for Bonita BPM Engine. The value should be at least as large as the value set for `max_connections` (default is typically 100). See the [PostgreSQL documentation](https://www.postgresql.org/docs/9.3/static/runtime-config-resource.html#GUC-MAX-PREPARED-TRANSACTIONS) for details.

### Oracle Database

Make sure your database is configured to use the AL32UTF8 character set.
If your database already exists, see the Oracle documentation for details of how to [migrate the character set](http://docs.oracle.com/cd/E11882_01/server.112/e10729/ch11charsetmig.htm#NLSPG011).

Bonita BPM Engine uses datasources that handle global transactions that span resources (XADataSource), so the Oracle user used by Bonita BPM Engine, requires some specific privileges, and there are also specific settings for XA activation.

##### **Important information for a successful connection**

The procedure below is used to create the settings to enable the Bonita BPM Engine to connect to the Oracle database.

It is assumed in the procedure that:

* Oracle product is already installed and running
* An 'Oracle' OS user is already created
* A database already exists
* The environment is already set:
  ```
  ORACLE_HOME=/u01/app/oracle/product/11.2.0/dbhome_1
  ORACLE_SID=...
  ```

1. Connect to the database as the System Administrator.

   SQL query \>
   ```sql
   oracle@ubuntu:~$ sqlplus / as sysdba
   ```

2. Check that the following components exist and are valid:  
   SQL query \>  
   ```sql
   select comp_name, version, status from dba_registry;
   ```

   | Comp\_name | Version | Status |
   |:-|:-|:-|
   | Oracle Database Catalog Views | 11.2.0.1.0 | VALID |
   | Oracle Database Packages and Types | 11.2.0.1.0 | VALID |
   | JServer JAVA Virtual Machine | 11.2.0.1.0 | VALID |
   | Oracle XDK | 11.2.0.1.0 | VALID |
   | Oracle Database Java Packages | 11.2.0.1.0 | VALID |

3. Add XA elements:

   SQL query \>
   ```sql
   @/u01/app/oracle/product/11.2.0/dbhome_1/javavm/install/initxa.sql
   ```
   This only needs to be done once, after the installation of Oracle.

4. Create the database user to be used by the Bonita BPM Engine and grant the required rights:

   SQL query \>
   ```sql
   @/u01/app/oracle/product/11.2.0/dbhome_1/rdbms/admin/xaview.sql
   ```
   The following queries must be done for each new user: i.e. one user = one database schema.

   SQL query \>
   ```sql
   CREATE USER bonita IDENTIFIED BY bonita;
   GRANT connect, resource TO bonita IDENTIFIED BY bonita;
   GRANT select ON sys.dba_pending_transactions TO bonita;
   GRANT select ON sys.pending_trans$ TO bonita;
   GRANT select ON sys.dba_2pc_pending TO bonita;
   GRANT execute ON sys.dbms_system TO bonita;
   GRANT select ON sys.v$xatrans$ TO bonita;
   GRANT execute ON sys.dbms_xa TO bonita;
   GRANT FORCE ANY TRANSACTION TO bonita;
   ```

#### SQL Server

::: warning
There is a known issue between Bitronix (the Transaction Manager shipped by Bonitasoft in the Tomcat bundle and in the Tomcat directories of the Deploy bundle) and the Microsoft SQL Server driver
(refer to: [MSDN note](https://msdn.microsoft.com/en-us/library/aa342335.aspx), [Bitronix note](http://bitronix-transaction-manager.10986.n7.nabble.com/Failed-to-recover-SQL-Server-Restart-td148.html)).
Therefore, using Bitronix as a Transaction Manager with SQL Server is not recommended. Our recommendation is to use the Wildfly bundle provided by Bonitasoft.
:::

##### XA Transactions

To support XA transactions, SQL Server requires a specific configuration.

You can refer to [MSDN](https://msdn.microsoft.com/en-us/library/aa342335(v=sql.110).aspx) for more information.

Here is the list of steps to perform (as an example, the database name BONITA\_BPM is used):

1. Make sure you have already downloaded and installed the [Microsoft SQL Server JDBC Driver 4.0](https://www.microsoft.com/en-us/download/details.aspx?displaylang=en&id=11774).
2. Copy the `sqljdbc_xa.dll` from `%JDBC_DRIVER_INSTALL_ROOT%\sqljdbc_4.0\enu\xa\x64\` (x64 for 64 bit version of Windows, x86 for 32 bit version of Windows) to `%SQLSERVER_INSTALL_ROO%\Instance_root\MSSQL10.MSSQLSERVER\MSSQL\Binn\.`
3. Copy/paste the content of xa\_install.sql file (located in %JDBC\_DRIVER\_INSTALL\_ROOT%\\sqljdbc\_4.0\\enu\\xa) to SQL Server Management Studio's Query Editor.
4. Execute the query in the Query Editor.
5. To confirm successful execution of the script, open the "Object Explorer" and go to: **Master** \> **Programmability** \> **Extended Stored Procedures**.   
   You should have 12 new procedures, each with a name starting with `dbo.xp.sqljdbc_xa_`.
6. Assign the new role 'SqlJDBCXAUser' to the user who owns the Bonita BPM Engine database (`bonitadev` in our example). To do this, execute the following commands in SQL editor:
   ```sql
   USE master;
   GO
   CREATE LOGIN bonitadev WITH PASSWORD = 'secret_password';
   GO
   CREATE USER bonitadev FOR LOGIN bonitadev;
   GO
   EXEC sp_addrolemember [SqlJDBCXAUser], 'bonitadev';
   GO
   ```

7. In the Windows "Start" menu, select **Administrative Tools**-\> **Services**.
8. In the "Services" window, make sure that the **Distributed Transaction Coordinator** service is set to start automatically. If it's not yet started, start it.
9. Make sure that the other services it depends on, namely "Remote Procedure Call" and "Security Accounts Manager", are also set to start automatically.
10. Run the `dcomcnfg` command, or go to the "Start" menu, then Administrative Tools \> Component Services.
11. In the left navigation pane, navigate to **Component Services** \> **Computers** \> **My Computer** \> **Distributed Transaction Coordinator**.
12. Select and right-click on _**Local DTC**_ and then _**Properties**_.
13. Click on _**Security**_ tab. Ensure that the checkbox for **Enable XA Transactions** is checked.
14. Click _**Apply**_, then click _**OK**_
15. Then stop and restart SQLServer.
16. Create the BONITA\_BPM database: `CREATE DATABASE BONITA_BPM GO`.
17. Set `bonitadev` as owner of BONITA\_BPM database (use, for example, 'Microsoft SQL Management Studio')

##### Recommended configuration for lock management

Run the script below to avoid deadlocks:

```sql
ALTER DATABASE BONITA_BPM SET SINGLE_USER WITH ROLLBACK IMMEDIATE
ALTER DATABASE BONITA_BPM SET ALLOW_SNAPSHOT_ISOLATION ON
ALTER DATABASE BONITA_BPM SET READ_COMMITTED_SNAPSHOT ON
ALTER DATABASE BONITA_BPM SET MULTI_USER
```

See [MSDN](https://msdn.microsoft.com/en-us/library/ms175095(v=sql.110).aspx).

#### MySQL

##### Maximum packet size

MySQL defines a maximum packet size on the server side. The default value for this settings are appropriate for most standard use cases.
However, you need to increase the packet size if you see the following error:
`Error: 1153 SQLSTATE: 08S01 (ER_NET_PACKET_TOO_LARGE) Message: Got a packet bigger than 'max_allowed_packet' bytes`

You need to update the file `my.ini` (for Windows) or `my.cnf` (for Linux) to avoid the `ER_NET_PACKET_TOO_LARGE` problem.
Look for `max_allowed_packet` settings and reduce the value.

For more information, see the [MySQL website](http://dev.mysql.com/doc/refman/5.5/en/packet-too-large.html).

##### Surrogate characters not supported

MySQL does not support [surrogate characters](https://en.wikipedia.org/wiki/Universal_Character_Set_characters#Surrogates).
If you want to use surrogate characters in your processes, you need to use another type of database.
