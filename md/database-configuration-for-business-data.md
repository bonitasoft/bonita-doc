# Database configuration for business data

## Configuration overview

If you are using [business data](define-and-deploy-the-bdm.md), the business objects used in your processes are stored using a separate database, not in the main database that is used by the Bonita BPM Engine. 
You need to configure the following:

* A database created in a [supported RDBMS](https://customer.bonitasoft.com/support-policies)
* JNDI data sources to access the database

::: info
Some configuration file detailed below are located under `setup` folder. See [Bonita BPM plaform setup tool](BonitaBPM_platform_setup.md) for more information about platform configuration.
:::

::: info
Configuration is done per tenant. If you have multiple tenants to configure, you need to apply instructions below individually for each tenant.
:::

## Database creation

In your RDBMS, create a database to be used to store business object. Do not reuse the Bonita BPM Engine database. Follow the instructions in the [Specific database configuration](database-configuration.md#specific_database_configuration) section.

Configure the database to use the UTF-8 character set.

In your RDBMS, make sure there is a user defined with privileges to create tables and query them.

## Data sources


For business data objects, you need to configure two data sources: `BusinessDataDS` and `NotManagedBizDataDS`. Two data sources are required because some RDBMS do not support use of transactions for table creation.
The data sources for business data objects are independent of the Bonita BPM Engine data sources (`bonitaDS` and `bonitaSequenceManagerDS`).

::: info
If you have multiple tenants that use business data objects, you need to create a `BusinessDataDS` and a `NotManagedBizDataDS` for each tenant.
:::
The following sections show how to configure the data sources for [JBoss](#ds_jboss) and [Tomcat](#ds_tomcat). 
There is also an [example of how to configure data sources for Weblogic](red-hat-oracle-jvm-weblogic-oracle.md).

After creation of a new Tenant, use the Setup tool to pull the configuration. See [Bonita BPM plaform setup tool](BonitaBPM_platform_setup.md) for more information about platform configuration.

"Pull" the configuration from the server Run 'setup pull' to get the configuration file.

Unix/Mac:
```
setup.sh pull
```
  
 Windows:
 ```
  setup.bat pull
  ```
  
Edit `<SETUP>/platform_conf/current/tenants/<TENANT ID>/bonita-tenant-community-custom.properties`, and set the datasource for the tenant. Each tenant has a datasource, which can use a different database (Postgres for Tenant 101, Oracle for 102 for example).

Set the `bdm.db.vendor` property to indicate the RDBMS vendor.
The possible values for `bdm.db.vendor` are:

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
`bdm.db.vendor=postgres`

Setting the RDBMS vendor automatically configures the relevant Hibernate dialog. 
If you need to change the Hibernate dialog for any reason, reset the vendor property for the tenant.

If you want to use a PostgreSQL database and it is already running, edit `postgresql.conf` and set a non-zero value for `max_prepared_transactions`. 
The default value, 0, disables prepared transactions, which is not recommended for Bonita BPM Engine. 
The value should be at least as large as the value set for `max_connections` (default is typically 100). 
See the [PostgreSQL documentation](http://www.postgresql.org/docs/9.3/static/runtime-config-resource.html#GUC-MAX-PREPARED-TRANSACTIONS) for details.

For remaining configuration steps, you will need the following information:

* RDBMS server address
* RDBMS server port
* Database name
* User name
* User password

For example, For example file `<SETUP>/platform_conf/current/tenants/101/bonita-tenant-community-custom.properties`, when you defined a datasource 'NotManagedBizDataDS_101' in the datasource (see below) : 

## Business data configuration

```
bdm.db.vendor=postgres
bdm.datasource.jndi.path=${sysprop.bonita.businessdata.datasource.jndi:java:comp/env/BusinessDataDS_101}
bdm.notmanageddatasource.jndi.path=${sysprop.bonita.businessdata.notmanageddatasource.jndi:java:comp/env/NotManagedBizDataDS_101}
bdm.hibernate.transaction.jta_platform=${sysprop.bonita.hibernate.transaction.jta_platform:org.bonitasoft.engine.persistence.JNDIBitronixJtaPlatform}
```
  

When the configuration is finished, "push" the configuration to the server.

Unix/Mac:
```
setup.sh push
```
  
 Windows:
 ```
  setup.bat push
  ```
  




<a id="db_jboss"/>

### Configuration for JBoss

Edit the `<JBOSS_HOME>/standalone/configuration/standalone.xml` configuration file and find the `BusinessDataDS` and `NotManagedBizDataDS` data sources definitions. 
The configuration file contains examples for each of the supported RDBMSs to guide you. Edit the following settings:

* For `BusinessDataDS`, update the values of the following settings:
  * <driver>: the driver to be used to access your database. See the RDBMS-specific examples in the configuration file.
  * <xa-datasource-property name="URL">: combination of serverName + portNumber + databaseName. See the examples in the configuration file.
  * <xa-datasource-property name="User">: RDBMS user name.
  * <xa-datasource-property name="Password">: RDBMS user password.
  * <check-valid-connection-sql>: SELECT 1 FROM dual for Oracle, SELECT 1 for any other supported RDBMS.
  * <background-validation-millis>: must be lower than your RDBMS connection timeout.
* For `NotManagedBizDataDS`, update the values of the following settings:
  * <driver>: the driver to be used to access your database. See the RDBMS-specific examples in the configuration file.
  * <connection-url>: combination of serverName + portNumber + databaseName. See the examples in the configuration file.
  * <user-name>: RDBMS user name.
  * <password>: RDBMS user password.
  * <check-valid-connection-sql>: SELECT 1 FROM dual for Oracle, SELECT 1 for any other supported RDBMS.
  * <background-validation-millis>: must be lower than your RDBMS connection timeout.
* In the `<drivers>` declaration, specify the `<xa-datasource-class>` and `<datasource-class>` for the driver you specify in the data source definitions. 
See the RDBMS-specific examples to find the correct values for your RDBMS.

::: info
If you have multiple tenants that use business data objects, you need to declare separate data sources for each tenant. Make sure that the values of properties `jndi-name` and `pool-name` are unique.
:::
Edit [`bonita-tenant-community-custom.properties`](BonitaBPM_platform_setup.md) file and set the tenant-specific JNDI data source name in `bdm.datasource.jndi.path` and `bdm.notmanageddatasource.jndi.path`.

<a id="db_tomcat"/>

### Configuration for Tomcat

If you are using Tomcat, you need to configure one data source directly in Tomcat and one in Bitronix.
**Tomcat configuration**

Edit the `<TOMCAT_HOME>/conf/Catalina/localhost/bonita.xml` configuration file and find the data source named `NotManagedBizDataDS`. The configuration file contains examples of settings to guide you. Edit the following settings and set the values appropriate for your RDBMS and database configuration:

* `validationQuery`: `SELECT 1 FROM dual` for Oracle, `SELECT 1` for any other supported RDBMS.
* `validationInterval`: must be lower than your RDBMS connection timeout.
* `username`: RDBMS user name.
* `password`: RDBMS user password.
* `driverClassName`: JDBC driver full class name. See the examples to find the value for your RDBMS.
* `url`: combination of serverName + portNumber + databaseName. See the examples in the configuration file.

::: info
If you have multiple tenants that use business data objects, copy the blocks `BusinessDataDS` and `NotManagedBizDataDS` for each tenant, and rename them with a unique name (for example `BusinessDataDS_`_`tenant-id`_ and `NotManagedBizDataDS_`_`tenant-id`_). 
Edit [`bonita-tenant-community-custom.properties`](BonitaBPM_platform_setup.md) file and set the tenant-specific JNDI data source name in `bdm.datasource.jndi.path` and `bdm.notmanageddatasource.jndi.path`.
:::

**Bitronix configuration**

Edit the `<TOMCAT_HOME>/conf/bitronix-resources.properties` configuration file and find the parameters starting with `resource.ds2`. The configuration file contains examples of settings to guide you. Edit the following settings and set the values appropriate for your RDBMS and database configuration:


* `resource.ds2.className`: JDBC driver full class name. See the examples to find the relevant value for your RDBMS.
* `resource.ds2.driverProperties.user`: RDBMS user name.
* `resource.ds2.driverProperties.password`: RDBMS user password.
* `resource.ds2.driverProperties.serverName`: address (IP or host name) of your RDBMS server.
* `resource.ds2.driverProperties.portNumber`: port of your RDBMS server.
* `resource.ds2.driverProperties.databaseName`: database name.
* `resource.ds2.driverProperties.URL`: can optionally be used instead of serverName + portNumber + databaseName.

::: info
If you have multiple tenants that use business data objects, copy this block of properties for each tenant, and replace `ds2` in the property names with a unique value for each tenant (for example ds3). 
Also make sure that `resource.ds?.uniqueName` is actually a unique name and update the value for `uniqueName` parameter accordingly in `bonita.xml` file.
:::

Example `<TOMCAT_HOME>/conf/Catalina/localhost/bonita.xml`:

```
  <!-- tenant 1 -->
  <Resource name="BusinessDataDS" auth="Container" type="javax.sql.DataSource"
              factory="bitronix.tm.resource.ResourceObjectFactory" uniqueName="jdbc/BusinessDataDSXA" />

 <Resource name="NotManagedBizDataDS"
              auth="Container"
              type="javax.sql.DataSource"
              factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
              maxActive="17"
              minIdle="5"
              maxIdle="17"
              maxWait="10000"
              initialSize="3"
              validationQuery="SELECT 1"
              validationInterval="30000"
              removeAbandoned="true"
              logAbandoned="true"
              username="bonita"
              password="bpm"
              driverClassName="org.postgresql.Driver"
              url="jdbc:postgresql://localhost:5432/business_data"/>
	

	<!-- tenant 101 -->
	<Resource name="BusinessDataDS_101" auth="Container" type="javax.sql.DataSource"
              factory="bitronix.tm.resource.ResourceObjectFactory" uniqueName="jdbc/BusinessDataDSXA_101" />

			  
 <Resource name="NotManagedBizDataDS"
              auth="Container"
              type="javax.sql.DataSource"
              factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
              maxActive="17"
              minIdle="5"
              maxIdle="17"
              maxWait="10000"
              initialSize="3"
              validationQuery="SELECT 1"
              validationInterval="30000"
              removeAbandoned="true"
              logAbandoned="true"
              username="bonita"
              password="bpm"
              driverClassName="org.postgresql.Driver"
              url="jdbc:postgresql://localhost:5432/business_data_101"/>
```
  
			  
Example `<TOMCAT_HOME>/conf/bitronix-resources.properties` :

```
###################################
# BONITA 'Business Data' Datasource Tenant 1
###################################
resource.ds2.uniqueName=jdbc/BusinessDataDSXA
resource.ds2.minPoolSize=0
resource.ds2.maxPoolSize=5

resource.ds2.className=org.postgresql.xa.PGXADataSource
resource.ds2.driverProperties.user=bonita
resource.ds2.driverProperties.password=bpm
resource.ds2.driverProperties.serverName=localhost
resource.ds2.driverProperties.portNumber=5432
resource.ds2.driverProperties.databaseName=business_data
resource.ds2.testQuery=SELECT 1

###################################
# BONITA 'Business Data' Datasource Tenant 101
###################################
resource.ds101.uniqueName=jdbc/BusinessDataDSXA_101
resource.ds101.minPoolSize=0
resource.ds101.maxPoolSize=5

resource.ds101.className=org.postgresql.xa.PGXADataSource
resource.ds101.driverProperties.user=bonita
resource.ds101.driverProperties.password=bpm
resource.ds101.driverProperties.serverName=localhost
resource.ds101.driverProperties.portNumber=5432
resource.ds101.driverProperties.databaseName=business_data_101
resource.ds101.testQuery=SELECT 1
```
  
  
  