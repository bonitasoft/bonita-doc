# List of database connectors

This page lists the database connectors provided with Bonita BPM. For some connectors there are special considerations, included in a section below.

If you are configuring a connector to a database that is the same type of database used by Bonita BPM Engine, you are recommended to use the same driver for both, to limit possible conflicts.

Here is the list of database connectors. The links take you to sections of this page giving dedicated best practice information.

* Ingres 10.1
* [MySQL 5.5](#mysql)
* [Teradata 14](#teradata)
* Informix 11
* DB2 9.7
* [HSQL 2.2](#hsql)
* [Microsoft SQL Server](#mssql)
* PostgreSQL 8.4 or 9.2
* h2 1.3
* Oracle 10G or 11G
* JDBC 4
* AS 400
* [Sybase ASE 15](#sysbase)
* Datasource db query

To [configure a database connector](database-connector-configuration.md), follow the instructions in the wizard.

<a id="mysql"/>

#### MySQL 5.5

It is not possible to execute more than one SELECT command in a single script.

<a id="teradata"/>

#### Teradata 14

If you are using the `terajdbc4.jar`, you also need the `tdgssconfig.jar` file.  
Import both `terajdbc4.jar` and `tdgssconfig.jar` into Bonita BPM Studio and add them to the connector configuration.  
Specify `terajdbc4.jar` as the active driver. To test the connector, you must specify both files. When you configure the process, specify both files in the process dependencies.

<a id="hsql"/>

#### HSQL 2.2

Allows only one connection per destination at a time

<a id="mssql"/>

#### Microsoft SQL Server


**Supported versions**: This connector supports SQL Server 2008, 2012, and 2014.

**Language encoding**: MS SQL Server uses only one encoding at a time. To avoid errors when creating the database, please do the following when using alternative languages:

Define the encoding:

1. Option collation
2. Choose the language from the list
3. Save the configuration

**Using a named instance**: To use a named instance with your connector, you need to retrieve some information from the SQL Server Configuration Manager.

1. Go to MS SQL Server network configuration.
2. Go to Protocols for _instance_ (where _instance_ the name of the instance).
3. Open TCP/IP.
4. In the TCP properties, get the port number.

When you configure the connector, use this port number in the URL. For example: `jdbc:sqlserver://localhost:53165`.

<a id="sysbase"/>

#### Sybase ASE 15

Two driver jar files are available, and the Driver and URL values to specify in the configuration wizard depend on which jar you use:

* For `jconn4.jar`:  
Driver: `com.sybase.jdbc4.jdbc.SybDriver`  
URL: `jdbc:sybase:Tds:`_`host:port/database`_
* For `jtds-1.3.1.jar`:  
Driver: `net.sourceforge.jtds.jdbc.Driver`  
URL: `jdbc:jtds:sybase://`_`host:port/database`_
