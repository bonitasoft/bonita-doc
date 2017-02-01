# Database creation and settings to work with Bonita BPM 

## Database usage

Bonita BPM uses an RDBMS (Relational DataBase Management System) for the following purposes:
 - One database schema is required by Bonita BPM Engine to store information about deployed process definitions, process configurations, history of process execution, users, as well as Bonita BPM Platform configuration information. 
- We recommend that you configure a different database schema if your project uses [business data](define-and-deploy-the-bdm.md).

Bonita BPM supports MySQL, PostgreSQL, SQL Server, and Oracle RDBMSs.
You can find the list of RDBMSs versions supported on the [supported database list](hardware-and-software-requirements.md) page.

## Default H2 database

Bonita BPM Studio, the WildFly bundle, the Tomcat bundle, and the deploy bundle come by default with an embedded H2 RDBMS. The database is automatically created at first startup, and can be used for all purposes described earlier.

However, H2 is only suitable for testing purposes. When building a production environment, you must switch to another RDBMS.  

## Steps to switch to another RDBMS

Here are the steps to follow. They are the same for the engine database and the business data database:
1. Create the database
2. Customize RDBMS to make it work with Bonita BPM    
3. Add the JDBC driver to the bundle if the database is proprietary
4. Configure the bundle with database information 

Steps 1 and 2 are detailed further down this page, steps 3 and 4 are part of the configuration part of [Tomcat bundle](tomcat-bundle.md) and [WildFly bundle](wildfly-bundle.md) pages.

::: warning
All RDBMSs require [specific customization](#specific_database_configuration), which must be done before you complete your installation.  
If you do not complete the specific configuration for your RDBMS, your installation may fail.
:::

::: warning
There are known issues with the management of XA transactions by MySQL engine and driver: see MySQL bugs [17343](http://bugs.mysql.com/bug.php?id=17343) and [12161](http://bugs.mysql.com/bug.php?id=12161) for more details.
Therefore, using MySQL database in a production environment is not recommended.
:::

::: warning
There is another known issue between Bitronix (the Transaction Manager shipped by Bonitasoft for the Tomcat bundle & inside Deploy bundle for Tomcat) and Microsoft SQL Server driver (refer to: [MSDN note](https://msdn.microsoft.com/en-us/library/aa342335.aspx), [Bitronix note](http://bitronix-transaction-manager.10986.n7.nabble.com/Failed-to-recover-SQL-Server-Restart-td148.html)).  
Therefore, using Bitronix as a Transaction Manager with SQL Server is not recommended.  
We recommend that you use the WildFly bundle provided by Bonitasoft.
:::


<a id="database_creation" />

### Create the database(s)

The first step in configuring Bonita BPM with your RDBMS is to create the new databases (i.e. schemas): one for engine data, and another one, optionally, if you use business data. 

To do so, you need a RDBMS user account that has sufficient privileges (i.e. privileges to create new schema).

Also, note that the owner of the new schemas must own the following privileges:

* CREATE TABLE
* CREATE INDEX
* SELECT, INSERT, UPDATE, DELETE on created TABLE

:::info
CREATE TABLE and CREATE INDEX privileges are not required after first start in normal use.  
If the same SQL user is used with the [migration tool](migrate-from-an-earlier-version-of-bonita-bpm.md), then this user needs such grants.
:::

To create the database(s), we recommend that you refer to your RDBMS documentation:

* [PostgreSQL](http://www.postgresql.org/docs/9.3/static/app-createdb.html)
* [Oracle database](https://docs.oracle.com/cd/E11882_01/server.112/e25494/create.htm#ADMIN002)
* [SQL Server](https://technet.microsoft.com/en-us/library/dd207005(v=sql.110).aspx)
* [MySQL](http://dev.mysql.com/doc/refman/5.5/en/database-use.html)

Your database(s) must be configured to use the UTF-8 character set. 
Also, you are recommended to configure the database(s) to be case-insensitive so that searches in Bonita BPM Portal are case-insensitive.

<a id="specific_database_configuration" />

### Customize RDBMS to make it work with Bonita BPM    

#### PostgreSQL

Configure the database to use UTF-8\.

Edit `postgresql.conf` and set a non-zero value for `max_prepared_transactions`. The default value, 0, disables prepared transactions, which is not compatible with Bonita BPM Engine.  
The value should be at least as large as the value set for `max_connections` (default is typically 100).  
See the [PostgreSQL documentation](https://www.postgresql.org/docs/9.3/static/runtime-config-resource.html#GUC-MAX-PREPARED-TRANSACTIONS) for details.

#### Oracle Database

Make sure your database is configured to use the AL32UTF8 character set.
If your database already exists, see the Oracle documentation for details of how to [migrate the character set](http://docs.oracle.com/cd/E11882_01/server.112/e10729/ch11charsetmig.htm#NLSPG011).

Bonita BPM Engine uses datasources that handle global transactions that span resources (XADataSource), so the Oracle user used by Bonita BPM Engine, requires some specific privileges, and there are also specific settings for XA activation.

##### **Important information for a successful connection**

The procedure below is used to create the settings to enable Bonita BPM Engine to connect to the Oracle database.

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
   ```bash
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
**Reminder:** There is a known issue between Bitronix (the Transaction Manager shipped by Bonitasoft in the Tomcat bundle and in the Tomcat directories of the Deploy bundle) and the Microsoft SQL Server driver
(refer to: [MSDN note](https://msdn.microsoft.com/en-us/library/aa342335.aspx), [Bitronix note](http://bitronix-transaction-manager.10986.n7.nabble.com/Failed-to-recover-SQL-Server-Restart-td148.html)).
Therefore, using Bitronix as a Transaction Manager with SQL Server is not recommended. Our recommendation is to use the WildFly bundle provided by Bonitasoft.
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
6. Assign the new role 'SqlJDBCXAUser' to the user who owns the Bonita BPM Engine database (`bonitadev` in our example). To do so, execute the following commands in SQL editor:
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

#### Recommended configuration for in-doubt xact resolution

Run the script below to avoid that the SQL Server changes the status of databases to SUSPECT during database server startup when in-doubt XA transactions are found.  
The value 2 in the block below means *presume abort*.  
To minimize the possibility of extended down time, an administrator might choose to configure this option to presume abort, as shown in the following example

```sql
sp_configure 'show advanced options', 1
GO
RECONFIGURE
GO
sp_configure 'in-doubt xact resolution', 2 
GO
RECONFIGURE
GO
sp_configure 'show advanced options', 0
GO
RECONFIGURE
GO
```

See [in-doubt xact resolution Server Configuration Option](https://msdn.microsoft.com/en-us/library/ms179586%28v%3Dsql.110%29.aspx).


#### MySQL

##### Maximum packet size

MySQL defines a maximum packet size on the server side. The default value for this setting is appropriate for most standard use cases.
However, you need to increase the packet size if you see the following error:
`Error: 1153 SQLSTATE: 08S01 (ER_NET_PACKET_TOO_LARGE) Message: Got a packet bigger than 'max_allowed_packet' bytes`

You need to update the file `my.ini` (for Windows) or `my.cnf` (for Linux) to avoid the `ER_NET_PACKET_TOO_LARGE` problem.
Look for `max_allowed_packet` setting and increase the value.

For more information, see the [MySQL website](http://dev.mysql.com/doc/refman/5.5/en/packet-too-large.html).

##### Surrogate characters not supported

MySQL does not support [surrogate characters](https://en.wikipedia.org/wiki/Universal_Character_Set_characters#Surrogates).
If you want to use surrogate characters in your processes, you need to use another type of database.


### Bundle database configuration

Now that your databases are created and customized to work with Bonita BPM, you are ready to configure Bonita BPM bundles, either the [Tomcat bundle](tomcat-bundle.md) or the [WildFly bundle](wildfly-bundle.md).
