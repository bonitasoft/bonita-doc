# Bonita Tomcat bundle

You will find here the mandatory and optional steps needed to install and configure the Tomcat bundle to run the Bonita platform. 

The Tomcat bundle is a .zip archive that contains the Apache Tomcat Java EE application server prepackaged along with Bonita and [Bonita platform setup tool](BonitaBPM_platform_setup.md#platform_setup_tool).
The Tomcat bundle is a regular .zip archive based on Tomcat zip distribution.

## Installation of the Tomcat bundle

### Download and unzip the Tomcat bundle

<a id="download" />

#### Download

For the Community edition:

- Go to the [Bonitasoft website](http://www.bonitasoft.com/downloads-v2) and get the Bonita Community edition Tomcat bundle.

For a Subscription edition:

- Go to the [Customer Portal](https://customer.bonitasoft.com/download/request) and download the Bonita Subscription edition Tomcat bundle.

#### Unzip

The fully qualified folder path (including the Bonita-x.y.z-tomcat folder) to the folder where you unzip the Tomcat bundle is referred to as `<TOMCAT_HOME>`. We recommend the following locations:

- Windows: `C:\Bonita`.
- Linux: in `/opt/Bonita`. Make sure that Linux user account used to execute Tomcat is the owner of the folders and files.

::: warning
Whatever location you choose, **do not** leave blank spaces in the path to the directory, nor in the folder name.
:::

#### Content of the Tomcat bundle

The Tomcat bundle is based on a standard Tomcat installation with the following additions:

- `setup/tomcat-templates/setenv.bat`: script to configure JVM system properties for Windows.
- `setup/tomcat-templates/setenv.sh`: script to configure JVM system properties for Linux.
- `setup/tomcat-templates/bonita.xml`: Tomcat context configuration for Bonita web application. Define data sources used by Bonita Engine.
- `server/conf/catalina.properties`: modified to include lib/bonita folder to Tomcat classpath.
- `server/conf/context.xml`: modified to add JTA support using Narayana library.
- `server/conf/logging.properties`: modified to create a log file dedicated to Bonita.
- `server/conf/server.xml`: modified to add listener for Narayana and h2 (see below for modification needed if you want to switch to another RDBMS).
- `server/conf/jbossts-properties.xml`: configuration files for Narayana transaction manager.
- `server/lib/bonita`: extra libraries needed by Bonita. The following libraries are included: Narayana JTA Transaction Manager, h2, SLF4J.
- `server/webapps/bonita.war`: the Bonita web application.
- `setup/`: a tool to manage Bonita Platform configuration, stored in database instead of filesystem. Also ships a tool to centralize all the required Tomcat bundle configuration.
- \`tools/request_key_utils: folder containing the script to generate license request keys (Subscription editions only).
- `tools/BonitaSubscription-x.y.z`-`LDAP-Synchronizer` : folder containing the tool to synchronize your organization in Bonita with your LDAP (Subscription editions only).
- `tools/cas-`_`cas.version`_`-module`: folder containing module files and description to enable CAS dependency to bonita EAR (Subscription editions only).
- `start-bonita.bat`: script to start the bundle on Windows.
- `start-bonita.sh`: script to start the bundle on Linux.
- `stop-bonita.bat`: script to stop the bundle on Windows.
- `stop-bonita.sh`: script to stop the bundle on Linux.

::: info
**Note:** Beginning with version 7.3.0, Bonita Platform configuration, including the license file, is stored in the same database as the Bonita Engine data, namely in the `CONFIGURATION` table.
The initialization of this configuration happens during `start-bonita.bat` (for Windows) or `start.bonita.sh` (for Linux) execution.  
Once initialized, to update this configuration, use the [_Platform setup tool_](BonitaBPM_platform_setup.md) embedded in Bonita bundles.
:::

### Get and install a license (Subscription editions only)

First, request a license.
If this is the first time you generate a license, you need to generate a request key.

#### Generate the request key

On the server where you installed Bonita Platform:

1. Go to the `tools/request_key_utils` folder
2. Run the `generateRequestKey.bat` script (for Windows) or the `generateRequestKey.sh` script (for Linux)

#### Request the new license

1. Copy your request key and go to the Customer Portal license request page.
2. Fill in the details in the form, copy the request key in the _Request Key_ field, and submit.
    Note: keep the brackets () in the key; if the key is separated by a line break, remove it and put the key on a single line.

The license file will be sent to you by email.

<a id="license" />

When you receive your license:
Copy the file to the `<TOMCAT_HOME>/setup/platform_conf/licenses` folder before starting the bundle.

### Change the default credentials (optional, recommended for production)

As a security precaution, we **strongly recommend** that before you start your application server, you change the default username and password used for the platform administrator and for the default tenant administrator.

#### Platform administrator

The username and password are defined in a text file:

- Before the very first Tomcat start: [`<TOMCAT_HOME>/setup/platform_conf/initial/platform_engine/bonita-platform-community-custom.properties`](BonitaBPM_platform_setup.md)
- After the first Tomcat start: [`<TOMCAT_HOME>/setup/platform_conf/current/platform_engine/bonita-platform-community-custom.properties`](BonitaBPM_platform_setup.md)

The properties are listed below:

- `platformAdminUsername` defines the username (default `platformAdmin`)
- `platformAdminPassword` defines the password (default `platform`)

This password is used for platform-level administration tasks, such as creating a tenant.

#### Tenant administrator

Each tenant has an administrator, with a tenant-specific username and password. The tenant administrator is also known as the tenant technical user.

When the platform is created, default values for the tenant administrator username and password are defined in the file [`<TOMCAT_HOME>/setup/platform_conf/initial/tenant_template_engine/bonita-tenant-community-custom.properties`](BonitaBPM_platform_setup.md), by the following properties:

- `userName` defines the username (default `install`)
- `userPassword` defines the password (default `install`)

When you create a tenant, the tenant administrator is created with the default username and password, unless you specify new values. 
Change these tenant-specific credentials for an existing tenant by updating the `userName` and `userPassword` properties in `<TOMCAT_HOME>/setup/platform_conf/current/tenants/<TENANT_ID>/tenant_engine/bonita-tenant-community-custom.properties`.

::: warning
For the **default tenant**, the tenant administrator username and password must also be changed in file:

- Before the very first Tomcat start: [`<TOMCAT_HOME>/setup/platform_conf/initial/platform_portal/platform-tenant-config.properties`](BonitaBPM_platform_setup.md)
- After the first Tomcat start: [`<TOMCAT_HOME>/setup/platform_conf/current/platform_portal/platform-tenant-config.properties`](BonitaBPM_platform_setup.md),

For further details and a better understanding, please read the section [Tenant administrator credentials](tenant_admin_credentials.md).
:::

<a id="configuration" />

### Configure the Tomcat bundle

::: info
If you just want to try Bonita Platform with the embedded H2 database (only for development and testing phases of your project), you can skip the next paragraph.
For production, you are recommended to use one of the supported databases, with the following steps.
:::

1. Make sure [your databases are created](database-configuration.md#database_creation) and [customized to work with Bonita](database-configuration.md#specific_database_configuration).
2. Edit file `<TOMCAT_HOME>/setup/database.properties` and modify the properties to suit your databases (Bonita internal database & Business Data database). Beware of [backslash characters](BonitaBPM_platform_setup.md#backslash_support).
3. If you use **Oracle** database, copy your [jdbc driver](database-configuration.md#proprietary_jdbc_drivers) in `<TOMCAT_HOME>/setup/lib/` folder. 
4. Run `<TOMCAT_HOME>\setup\start-bonita.bat` (Windows system) or `<TOMCAT_HOME>/setup/start-bonita.sh` (Unix system) to run Bonita Tomcat bundle (see [Tomcat start script](#tomcat_start))

::: info
The **start-bonita** script does the following:

1. Runs the **`setup init`** command:
   1. initializes the Bonita internal database (the one you have defined in file `<TOMCAT_HOME>/setup/database.properties`): creates the tables that Bonita uses internally + stores the configuration in the database.
   2. installs the license files (Subscription editions only) in the database.
2. Runs the **`setup configure`** command:
   The Setup Configure command configures the Tomcat environment to access the right databases:
   1. updates the file setenv.sh (Unix system) or setenv.bat (Windows system) to set the database vendor values for **Bonita internal database** & **Business Data database**
   2. updates the file `<TOMCAT_HOME>/setup/tomcat-templates/bonita.xml` with the values you set in file `database.properties` **Bonita internal database** & **Business Data database**
   3. copies your database vendor-specific drivers from `<TOMCAT_HOME>/setup/lib` to `<TOMCAT_HOME>/setup/server/lib/bonita`
3. Starts the Tomcat bundle

For advanced server configuration needs: check out [Bundle configuration](BonitaBPM_platform_setup.md#run_bundle_configure) to finely tune your Tomcat bundle, using templates used by Bonita.
:::

<a id="start" />

### Starting and shutting down Tomcat

<a id="tomcat_start" />

#### Tomcat start script

Tomcat can be started by executing the following script:

- Windows: `<TOMCAT_HOME>\start-bonita.bat`
- Linux: `<TOMCAT_HOME>/start-bonita.sh`

#### Tomcat stop script

Tomcat can be shut down by executing the following script:

- Windows: `<TOMCAT_HOME>\stop-bonita.bat`
- Linux: `<TOMCAT_HOME>/stop-bonita.sh`

**Troubleshooting:**
If you see `checkThreadLocalMapForLeaks` errors, they probably indicate that Tomcat is shutting down before all work threads are completed.
You can [increase the work service termination timeout](performance-tuning.md) to ensure that work is complete before shutdown.

## After installation

### First steps after installation

Once you have your Tomcat bundle up and running, complete these [few extra steps](first-steps-after-setup.md) to get Bonita Platform fully operational.

### Configuration update

To update Bonita configuration after the first run, take a look at the [platform setup tool](BonitaBPM_platform_setup.md#update_platform_conf)

::: info
**Note:** 

- The file `database.properties` is the entry point to configure the [Tomcat environment](BonitaBPM_platform_setup.md#run_bundle_configure) and the [Bonita Platform configuration](BonitaBPM_platform_setup.md#configure_tool).
- You can use command line arguments to specify database properties directly from the command line. Use `<TOMCAT_HOME>/setup/setup.sh --help` on Linux or `<TOMCAT_HOME>\setup\setup.bat --help` on Windows to have a list of available options.
  :::

### License update

To update the licenses after the first run, take a look at the [platform setup tool](BonitaBPM_platform_setup.md#update_platform_conf)

## Troubleshooting

* * *

**Problem**:  
My **Oracle** database drivers do not seem to be taken into account when I put them in `<TOMCAT_HOME>/setup/lib` folder.

**Cause**:  
Driver file must respect some naming convention.

**Solution**:  
For Oracle, rename it so that the name contains at least the word `oracle` or `ojdbc` (case insensitive)

* * *

**Issue**: When I run `start-bonita.sh` or `start-bonita.bat`, I get the error message `Invalid Java version (1.7) < 1.8. Please set JRE_HOME or JAVA_HOME variable to a JRE / JDK 1.8+`

**Cause**: Bonita 7.5+ requires Java 1.8 to run

**Solution**: Ensure your running environment has a JDK or JRE 1.8 installed and set either JRE_HOME or JAVA_HOME environment variable to point to it.

* * *
