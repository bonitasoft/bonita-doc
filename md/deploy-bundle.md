# Deploy bundle

## What is the purpose of the Bonita Deploy bundle?

* The Bonita Deploy bundle is used if you have **already installed a Java EE Application Server**.
* The Bonita Deploy bundle is a way of setting up a Bonita Platform. You'll be able to get a setup quite similar to WildFly or Tomcat bundle.
* It's also used to package other tools such as the LDAP synchronizer.

:::warning
This installation procedure only specifically targets the Java EE application Servers that have been installed under a single root folder (typically, from a .zip file).
Thus, for installations using native distribution packages (that more often than not split the binaries and the configuration files into separate folder hierarchies),
it would be up to you to adapt the documented steps to your very own folder layout.
:::

:::warning
Remember that the recommended way of installing Bonita is to use the provided [Tomcat](tomcat-bundle.md) / [WildFly](wildfly-bundle.md) bundle.  
It saves you from doing all the following configuration at hand, as the setup tool included handles it automatically.
:::


## Deploy bundle content

* `Tomcat-`_`version`_: a folder/file structure to be merged with an existing setup of Apache Tomcat, in order to install Bonita Portal and Bonita Engine.
* `Wildfly-`_`version`_: a folder/file structure to be merged with an existing setup of WildFly in order to install Bonita Portal and Bonita Engine.
<a id="platform_setup_tool" />
* `setup`: a command-line tool that creates the Bonita Platform before it can be run. It creates the Bonita Platform internal database, and stores the runtime configuration.
It is useful to update the configuration, locally or from a remote computer.
* `Request_key_utils-`_`key_utils.version`_: include script files to generate license request keys.
* `BonitaSubscription`-_`LDAPSync.version`_-`LDAP-Synchronizer` : LDAP synchronizer to synchronize your organization in Bonita with your LDAP
* `cas-`_`cas.version`_`-module`: Module files and description to enable CAS dependency to bonita EAR.
* `License`: license files that apply to Bonita components.
* `README.TXT`: See this file for more details about the `deploy.zip` contents and structure. 

## Installation

1. Download the deploy.zip file from the [Bonitasoft download page](http://www.bonitasoft.com/downloads-v2) for the Community edition 
or from the [Customer Portal](https://customer.bonitasoft.com/download/request) for Subscription editions.
2. Unzip the `deploy.zip` into a temporary folder (DEPLOY_ZIP_HOME).
4. Follow the [Tomcat bundle steps](#tomcat-installation) or [WildFly bundle steps](#wildfly-installation)

<a id="tomcat-installation" />

## Tomcat installation
### Install Bonita Platform in Tomcat

Copy all files and directories from DEPLOY_ZIP_HOME/Tomcat-8.5.34/server to your Tomcat root directory (TOMCAT_HOME).
:::warning
Some configuration files from the deploy zip will overwrite some default tomcat configuration files. Proceed
with care in a tomcat where other applications are already installed.
:::
:::warning
There is an [issue on tomcat 8.0.32](https://bz.apache.org/bugzilla/show_bug.cgi?id=58999) preventing the portal Look & feel to be compiled. If you deploy bonita on an existing tomcat installation, make sure it is a different version of tomcat (preferably 8.5.x with x>=23).
:::


### Configure data sources

1. Open the file TOMCAT_HOME/conf/Catalina/localhost/bonita.xml
2. Remove or comment out the lines regarding the h2 database.
3. Uncomment the lines matching your RDBMS.
4. Update following attributes value:
    - username: your RDBMS user name.
    - password: your RDBMS password.
    - url: the URL, including the RDBMS server address, RDBMS server port and database (schema) name.
5. There are 4 datasources declared. Make sure you made the change for them all, named RawBonitaDS, bonitaSequenceManagerDS, RawBusinessDataDS, NotManagedBizDataDS.


### Configure RDBMS vendor

1. Open the file TOMCAT_HOME/bin/setenv.(bat|sh)
2. Change the value of sysprop.bonita.db.vendor according to your RDBMS vendor
3. Change the value of sysprop.bonita.bdm.db.vendor according to your RDBMS vendor

### Add Jdbc driver
You need to add your jdbc driver in TOMCAT_HOME/lib. 
MySQL, PostgreSQL and Microsoft SQL Server drivers can be found in deploy bundle under DEPLOY_ZIP_HOME/setup/lib directory. For Oracle, 
use the [jdbc driver](database-configuration.md#proprietary_jdbc_drivers) provided by Oracle.

<a id="wildfly-installation" />

## Wildfly installation

### Install Bonita Platform in Wildfly
Copy all files and directories from DEPLOY_ZIP_HOME/wildfly-10.1.0.Final/server to your Wildfly root directory (WILDFLY_HOME).

### Configure data sources
1. Open the file WILDFLY_HOME/standalone/configuration/standalone.xml
2. For Bonita Standard data source, remove or comment out the default definition for h2.
3. Uncomment the settings matching your RDBMS vendor.
4. Modify the values of the following settings to your configuration: server address, server port, database name, user name and password.
5. Repeat operations 2. to 4. for Business Data data source

### Configure RDBMS vendor
1. Open WILDFLY_HOME/standalone/configuration/standalone.xml and look for `system-properties` tag
2. Set the value for sysprop.bonita.db.vendor (Bonita Platform database vendor)
3. Set the value for sysprop.bonita.bdm.db.vendor (Business Data database vendor)

### Add Jdbc driver
1. Create a folder structure under WILDFLY_HOME/modules folder. Refer to the table below to identify the folders to create. 
The last folder is named `main` for all JDBC drivers.

| Database vendor | Module folders              | Module description file                                 |
| --------------- | --------------------------- | ------------------------------------------------------- |
| PostgreSQL      | modules/org/postgresql/main | [module.xml](images/special_code/postgresql/module.xml) |
| Oracle          | modules/com/oracle/main     | [module.xml](images/special_code/oracle/module.xml)     |
| SQL Server      | modules/com/sqlserver/main  | [module.xml](images/special_code/sqlserver/module.xml)  |
| MySQL           | modules/com/mysql/main      | [module.xml](images/special_code/mysql/module.xml)      |

2. Put the driver jar file in the relevant main folder.
3. In the same folder as the driver, add the module description file, `module.xml`. This file describes the dependencies 
the module has and the content it exports. It must describe the driver jar and the JVM packages that Wildfly does not 
provide automatically. The exact details of what must be included depend on the driver jar. 
**Caution**: you might need to edit the module.xml in order to match exactly the JDBC driver jar file name.


## License installation

If you are installing a Subscription edition, you need to [request a license](licenses.md). 

When you receive your license, copy the file to the `DEPLOY_ZIP_HOME/setup/platform_conf/licenses` folder of your application server.

## Database initialization
We assume here that the database has already been [created and configured for Bonita](database-configuration.md#database_creation).
Once created and configured you need to initialize it using the setup tool provided in the deploy bundle archive.
This will create database schema and initial values.
1. In DEPLOY_ZIP_HOME/setup folder, edit the file database.properties with properties matching your rdbms. Beware of [backslash characters](BonitaBPM_platform_setup.md#backslash_support).
2. In DEPLOY_ZIP_HOME/setup/lib add your jdbc driver if needed (only for Oracle, see [proprietary jdbc drivers](database-configuration.md#proprietary_jdbc_drivers))
3. In DEPLOY_ZIP_HOME/setup folder, run `setup.(sh|bat) init`

## Next steps
You're done with Bonita installation. You can now start your application server as usual.
When you have finished installing the deploy bundle, [complete the setup](first-steps-after-setup.md) of your system by validating the installation, setting passwords, and creating the Administrator user.
