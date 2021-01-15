# Database creation and configuration for Bonita engine and BDM

This page describes the steps to create and customize the databases for Bonita Engine and Business Data Model in the Platform installation.

## Database usage

Bonita uses an RDBMS (Relational DataBase Management System) for the following purposes:
 - One database schema is required by Bonita Engine to store information about deployed process definitions, process configurations, history of process execution, users, as well as Bonita Platform configuration information. 
- We recommend that you configure a different database schema if your project uses [business data](define-and-deploy-the-bdm.md).

Bonita supports MySQL, PostgreSQL, Microsoft SQL Server, and Oracle RDBMSs.
You can find the list of RDBMSs versions supported on the [supported database list](hardware-and-software-requirements.md) page.

## Default H2 database

The Bonita Studio and the Tomcat bundle come by default with an embedded H2 RDBMS. The database is automatically created at first startup, and can be used for all purposes described earlier.

However, H2 is only suitable for testing purposes. When building a production environment, you must switch to another RDBMS.  

## Steps to switch to another RDBMS

::: warning
Please note this procedure cannot be performed using the Bonita Studio. The Bonita Studio can run only on the H2 Database. 
To use Bonita on another RDBMS, please use a [bundle](_basic-bonita-platform-installation.md) or set up a [standalone server](custom-deployment.md).
:::

Here are the steps to follow. They are the same for the engine database and the business data database:
1. Create the database
2. Customize RDBMS to make it work with Bonita    
3. Add the JDBC driver to the bundle if the database is proprietary
4. Configure the bundle with database information 

Steps 1 and 2 are detailed further down this page, steps 3 and 4 are part of the configuration part of the [Tomcat bundle](tomcat-bundle.md) page.

::: warning
All RDBMSs require [specific customization](#specific_database_configuration), which must be done before you complete your installation.  
If you do not complete the specific configuration for your RDBMS, your installation may fail.
:::


<a id="proprietary_jdbc_drivers" />

### Proprietary Jdbc drivers

Bonita provides out of the box the Jdbc drivers for H2, PostgreSQL, Microsoft SQL Server and MySQL. For Oracle, you have to retrieve the related Jdbc drivers as follows.  

#### Oracle Database

*Warning*: Bonita 7.10.+ is compatible with Oracle 12.2.0.x and Oracle 19c (19.3.0.0).
The driver compatible with Oracle 12.2.0.x & 19.3.0 can be found here: [ojdbc8.jar](https://www.oracle.com/database/technologies/appdev/jdbc-ucp-19c-downloads.html)( make sure it is the official driver by checking the SHA1 Checksum: 967c0b1a2d5b1435324de34a9b8018d294f8f47b )

<a id="database_creation" />

### Create the database(s)

The first step in configuring Bonita with your RDBMS is to create the new databases (i.e. schemas): one for engine data, and another one, optionally, if you use business data. 

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

* [PostgreSQL](https://www.postgresql.org/docs/11/app-createdb.html)
* [Oracle database](https://docs.oracle.com/database/121/ADMIN/create.htm#ADMIN002)
* [SQL Server](https://technet.microsoft.com/en-us/library/dd207005(v=sql.110).aspx)
* [MySQL](https://dev.mysql.com/doc/refman/8.0/en/database-use.html)

<a id="utf8_requirement"/>
Your database(s) must be configured to use the UTF-8 character set. 
Also, you are recommended to configure the database(s) to be case-insensitive so that searches in Bonita Portal, Bonita REST API and Bonita Engine API are case-insensitive.

<a id="specific_database_configuration" />

**Note**: Bonita is not attached to a specific database user. Therefore, the database user that bonita uses to connect to the database can be changed after the platform creation, provided the new user has the required access rights.
The same goes for the user used to connect to the business data database, if it is different.

### Customize RDBMS to make it work with Bonita

#### PostgreSQL

Configure the database to use UTF-8\.

Edit `postgresql.conf` and set a non-zero value for `max_prepared_transactions`. The default value, 0, disables prepared transactions, which is not compatible with Bonita Engine.  
The value should be at least as large as the value set for `max_connections` (default is typically 100).  
See the [PostgreSQL documentation](https://www.postgresql.org/docs/11/runtime-config-resource.html#GUC-MAX-PREPARED-TRANSACTIONS) for details.

See also [how to finely tune performance for PostgreSQL](performance-tuning.md#postgresql-performance-tuning).

#### Oracle Database

Make sure your database is configured to use the AL32UTF8 character set.
If your database already exists, see the Oracle documentation for details of how to [migrate the character set](https://docs.oracle.com/database/121/NLSPG/ch11charsetmig.htm#NLSPG011).

Bonita Engine uses datasources that handle global transactions that span resources (XADataSource), so the Oracle user used by Bonita Engine, requires some specific privileges, and there are also specific settings for XA activation.

#####  Oracle 12c

The procedure below is used to create the settings to enable Bonita Engine to connect to the Oracle database.

It is assumed in the procedure that:
   * Oracle product is already installed and running
   * An 'Oracle' OS user is already created
   * A database already exists
   * The environment is already set:
```
  ORACLE_HOME=/u01/app/oracle/product/12.2.0/dbhome_1
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
   | Oracle Database Catalog Views | 12.2.0.1.0 | VALID |
   | Oracle Database Packages and Types | 12.2.0.1.0 | VALID |
   | JServer JAVA Virtual Machine | 12.2.0.1.0 | VALID |
   | Oracle XDK | 12.2.0.1.0 | VALID |
   | Oracle Database Java Packages | 12.2.0.1.0 | VALID |

3. Add XA elements:

   SQL query \>
   ```sql
   @/u01/app/oracle/product/12.2.0/dbhome_1/javavm/install/initxa.sql
   ```
   This only needs to be done once, after the installation of Oracle.

4. Create the database user to be used by the Bonita Engine and grant the required rights:

   SQL query \>
   ```sql
   @/u01/app/oracle/product/12.2.0/dbhome_1/rdbms/admin/xaview.sql
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
   GRANT execute ON sys.dbms_xa TO bonita;
   GRANT FORCE ANY TRANSACTION TO bonita;
   ALTER USER bonita quota unlimited on users;
   ```

#####  Oracle 19c

The procedure below is used to create the settings to enable Bonita Engine to connect to the Oracle database.

It is assumed in the procedure that:
   * Oracle product is already installed and running
   * An 'Oracle' OS user is already created
   * A database already exists
   * The environment is already set:
```
  ORACLE_HOME=/u01/app/oracle/product/19.3.0/dbhome_1
  ORACLE_SID=...
```

1. Connect to the database as the System Administrator.
   ```bash
   oracle@ubuntu:~$ sqlplus sys@ORCLPDB1 as sysdba;
   ```

2. Check that the following components exist and are valid:  
   SQL query \>  
   ```sql
   select comp_name, version, status from dba_registry;
   ```

   | Comp\_name | Version | Status |
   |:-|:-|:-|
   | Oracle Database Catalog Views | 19.0.0.0.0 | VALID |
   | Oracle Database Packages and Types | 19.0.0.0.0 | VALID |
   | JServer JAVA Virtual Machine | 19.0.0.0.0 | VALID |
   | Oracle XDK | 19.0.0.0.0 | VALID |
   | Oracle Database Java Packages | 19.0.0.0.0 | VALID |

3. Add XA elements:
    ```
    sql
    @"$ORACLE_HOME/rdbms/admin/xaview.sql"
    ```

4. Create the database user to be used by the Bonita Engine and grant the required rights:
   The following queries must be done for each new user: i.e. one user = one database schema.

   SQL query \>
   ```sql
   CREATE USER bonita IDENTIFIED BY bonita;
   GRANT connect, resource TO bonita IDENTIFIED BY bonita;
   GRANT select ON sys.dba_pending_transactions TO bonita;
   GRANT select ON sys.pending_trans$ TO bonita;
   GRANT select ON sys.dba_2pc_pending TO bonita;
   GRANT execute ON sys.dbms_system TO bonita;
   GRANT execute ON sys.dbms_xa TO bonita;
   GRANT FORCE ANY TRANSACTION TO bonita;
   ALTER USER bonita quota unlimited on users;
   ```

#### Microsoft SQL Server

##### XA Transactions

To support XA transactions, SQL Server requires a specific configuration.
You can refer to [MSDN](https://msdn.microsoft.com/en-us/library/aa342335(v=sql.110).aspx) for more information.
Here is the list of steps to perform (as an example, the database name BONITA is used):

1. Download the zip package of [Microsoft SQL Server JDBC Driver 6.0](https://www.microsoft.com/en-us/download/details.aspx?displaylang=en&id=11774) and unzip it. 
2. Copy the `sqljdbc_xa.dll` from `%JDBC_DRIVER_INSTALL_ROOT%\sqljdbc_6.0\enu\xa\x64\` (x64 for 64 bit version of Windows, x86 for 32 bit version of Windows) to `%SQLSERVER_INSTALL_ROOT%\MSSQL13.<instance_name>\MSSQL\Binn\.`
3. Copy/paste the content of `install.sql` file (located in `%JDBC_DRIVER_INSTALL_ROOT%\sqljdbc\6.0\enu\xa`) to SQL Server Management Studio's Query Editor.
4. Execute the query in the Query Editor.
5. To confirm successful execution of the script, open the "Object Explorer" and go to: **Master** \> **Programmability** \> **Extended Stored Procedures**.   
   You should have 12 new procedures, each with a name starting with `dbo.xp.sqljdbc_xa_`.
6. Assign the new role 'SqlJDBCXAUser' to the user who owns the Bonita Engine database (`bonitadev` in our example). To do so, execute the following commands in SQL editor:
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
15. Then stop and restart SQLServer to ensure it syncs up with the MS DTC changes.
16. Create the BONITA database: `CREATE DATABASE BONITA GO`.
17. Set `bonitadev` as owner of BONITA database (use, for example, 'Microsoft SQL Management Studio')

##### Recommended configuration for lock management

Run the script below to avoid deadlocks:

```sql
ALTER DATABASE BONITA SET SINGLE_USER WITH ROLLBACK IMMEDIATE
ALTER DATABASE BONITA SET ALLOW_SNAPSHOT_ISOLATION ON
ALTER DATABASE BONITA SET READ_COMMITTED_SNAPSHOT ON
ALTER DATABASE BONITA SET MULTI_USER
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

##### XA Transactions

To support XA transactions, starting from MySQL 8.0, special XA rights must be granted to the database user. For example, if the users for the Bonita BPM and BDM databases are `bonita` and `business_data` respectively, you should run the following command:

```sql
GRANT XA_RECOVER_ADMIN ON *.* to bonita, business_data;

FLUSH PRIVILEGES;
```

::: warning
Please note that the above command, by specifying **`*.*`**, is granting privileges for all databases. You may want to limit them to the Bonita BPM and BDM databases if there are additional databases in your MySQL server.
:::

Refer to the [Privileges section](https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html) in the official MySQL documentation for further information.

##### Maximum packet size

MySQL defines a maximum packet size on the server side. The default value for this setting is appropriate for most standard use cases.
However, you need to increase the packet size if you see the following error:
`Error: 1153 SQLSTATE: 08S01 (ER_NET_PACKET_TOO_LARGE) Message: Got a packet bigger than 'max_allowed_packet' bytes`

You need to update the file `my.ini` (for Windows) or `my.cnf` (for Linux) to avoid the `ER_NET_PACKET_TOO_LARGE` problem.
Look for `max_allowed_packet` setting and increase the value.

For more information, see the [MySQL website](https://dev.mysql.com/doc/refman/8.0/en/packet-too-large.html).

##### Surrogate characters not supported

MySQL does not support [surrogate characters](https://en.wikipedia.org/wiki/Universal_Character_Set_characters#Surrogates).
If you want to use surrogate characters in your processes, you need to use another type of database.

##### utf8mb4 charset

Bonita requires MySQL to use UTF-8 encoding. The official MySQL recommendation is to use 'utf8mb4', and it is also the recommended Bonita configuration.

### Bundle database configuration

Now that your databases are created and customized to work with Bonita, you are ready to configure the [Bonita bundle](tomcat-bundle.md).
