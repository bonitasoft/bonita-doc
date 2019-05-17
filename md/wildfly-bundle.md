# WildFly bundle

You will find here steps needed to install and configure a WildFly bundle.

The WildFly bundle is a zip archive that contains the Red Hat WildFly Java EE application server packaged with Bonita and [Bonita platform setup tool](BonitaBPM_platform_setup.md#platform_setup_tool).
The WildFly bundle is a regular zip archive based on the WildFly zip distribution.

::: warning
**WARNING:** Starting from Bonita 7.9.0 the Wildfly bundle is deprecated. It will be removed in a future release. Check the [Release Note](release-notes.md) for more details.
:::
## Installation of the WildFly bundle

### Download and unzip the WildFly bundle

<a id="download" />

#### Download

For the Community edition:

* Go to the [Bonitasoft website](http://www.bonitasoft.com/downloads-v2) and get the Bonita Community edition WildFly bundle.

For a Subscription edition:

* Go to the [Customer Portal](https://customer.bonitasoft.com/download/request) and download the Bonita Subscription edition WildFly bundle.

#### Unzip

The folder where you unzip the WildFly bundle is known as _`<WILDFLY_HOME>`_. We recommend the following locations:

* Windows: `C:\Bonita`.
* Linux: in `/opt/Bonita`. Make sure that Linux user account used to execute WildFly is the owner of the folders and files.

::: warning
Whatever location you choose, **do not** leave blank spaces in the path to the directory, nor in the folder name.
:::

#### Content of the WildFly bundle

The WildFly bundle is based on a standard WildFly installation with the following additions:

* `server/bin/standalone.conf`: script to configure JVM system properties on Linux systems.
* `server/bin/standalone.conf.bat`: script to configure JVM system properties on Windows systems.
* `server/modules/system/layers/base/sun/jdk/main/module.xml`: list of base jdk module necessary for WildFly and Bonita to execute.
* `server/standalone/deployments/bonita-all-in-one-[version].ear`: Bonita Portal (web application) and EJB3 API.
* `setup/`: a tool to manage Bonita Platform configuration, stored in database instead of filesystem. Also ships a tool to centralize all the required WildFly bundle configuration.
* `setup/wildfly-templates/standalone.xml`: WildFly context configuration for Bonita Portal. It defines data sources used by Bonita Engine.
* `tools/request_key_utils-`_`key_utils.version`_: folder containing the script to generate license request keys (Subscription editions only).
* `tools/BonitaSubscription-x.y.z`-`LDAP-Synchronizer` : folder containing the tool to synchronize your organization in Bonita with your LDAP (Subscription editions only).
* `tools/cas-`_`cas.version`_`-module`: folder containing module files and description to enable CAS dependency to bonita EAR (Subscription editions only).
* `start-bonita.bat`: script to start the bundle on Windows.
* `start-bonita.sh`: script to start the bundle on Linux.

::: info
**Note:** Beginning with version 7.3.0, Bonita Platform configuration, including the license file, is stored in the same database as the Bonita Engine data, namely in the `CONFIGURATION` table.
The initialization of this configuration happens during start-bonita.bat (for Windows) or start.bonita.sh (for Linux) execution.  
Once initialized, to update this configuration, use the [*Platform setup tool*](BonitaBPM_platform_setup.md) embedded in Bonita bundles.
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
If this is your first installation, copy the file to the `<WILDFLY_HOME>/setup/platform_conf/licenses` folder before starting the bundle.
If this is a license update, use [the *Platform setup tool*](BonitaBPM_platform_setup.md#update_platform_conf).


### Change the default credentials (optional, recommended for production)

As a security precaution, we **strongly recommend** that before you start your application server, you change the default username and password used for the platform administrator and for the default tenant administrator.

#### Platform administrator

The username and password for the platform administrator are defined in the file [`<WILDFLY_HOME>/setup/platform_conf/initial/platform_engine/bonita-platform-community-custom.properties`](BonitaBPM_platform_setup.md), by the following properties:

* `platformAdminUsername` defines the username (default `platformAdmin`)
* `platformAdminPassword` defines the password (default `platform`)

This password is used for platform-level administration tasks, such as creating a tenant.

#### Tenant administrator

Each tenant has an administrator, with a tenant-specific username and password. The tenant administrator is also known as the tenant technical user.

When the platform is created, default values for the tenant administrator username and password are defined in the file [`<WILDFLY_HOME>/setup/platform_conf/initial/tenant_template_engine/bonita-tenant-community-custom.properties`](BonitaBPM_platform_setup.md), by the following properties:

* `userName` defines the username (default `install`)
* `userPassword` defines the password (default `install`)

When you create a tenant, the tenant administrator is created with the default username and password, unless you specify new values. 
Change these tenant-specific credentials for an existing tenant by updating the `userName` and `userPassword` properties in `<WILDFLY_HOME>/setup/platform_conf/current/tenants/<TENANT_ID>/tenant_engine/bonita-tenant-community-custom.properties`.

::: warning
For the **default tenant**, the tenant administrator username and password must also be changed in file [`<WILDFLY_HOME>/setup/platform_conf/initial/platform_portal/platform-tenant-config.properties`](BonitaBPM_platform_setup.md),
with exactly the same values that you set in `bonita-tenant-community-custom.properties` (see above). At platform creation, this file contains the default username and password for the default tenant.  
For further details and a better understanding, please read the section [Tenant administrator credentials](tenant_admin_credentials.md).
:::

<a id="configuration" />

### Configure the WildFly bundle

::: info
If you just want to try Bonita Platform with the embedded H2 database (only for development and testing phases of your project), you can skip this paragraph.
For production, you are recommended to use one of the supported databases, with the following steps.
:::

1. Make sure [your databases are created](database-configuration.md#database_creation) and [customized to work with Bonita](database-configuration.md#specific_database_configuration).
2. Edit file `<WILDFLY_HOME>/setup/database.properties` and modify the properties to suit your databases (Bonita internal database & Business Data database). Beware of [backslash characters](BonitaBPM_platform_setup.md#backslash_support).
3. If you use **Oracle** database, copy your [jdbc driver](database-configuration.md#proprietary_jdbc_drivers) in `<WILDFLY_HOME>/setup/lib` folder. 
4. Run `<WILDFLY_HOME>\start-bonita.bat` (Windows system) or `<WILDFLY_HOME>/start-bonita.sh (Unix system)` to run Bonita WildFly bundle (see [WildFly start script](#wildfly_start))

::: info
The **start-bonita** script does the following:

1. Runs the **`setup init`** command:
    1. initializes the Bonita internal database (the one you have defined in file `<WILDFLY_HOME>/setup/database.properties`): creates the tables that Bonita uses internally + stores the configuration in database.
    2. install the license files (Subscription editions only) in the database.
2. Runs the **`setup configure`** command:
    The Setup Configure command configures the WildFly environment to access the right databases:
    1. updates the file `<WILDFLY_HOME>/setup/wildfly-templates/standalone.xml` with the values you set in file `database.properties` for **Bonita internal database** & **Business Data database**
    2. creates the file(s) `<WILDFLY_HOME>/server/modules/**/main/modules.xml` that WildFly needs, according to your database settings
    3. copies your database vendor-specific drivers into `<WILDFLY_HOME>/server/modules/**/main/` folders
3. Starts the WildFly bundle

For advanced server configuration needs: check out [Bundle configuration](BonitaBPM_platform_setup.md#run_bundle_configure) to finely tune your WildFly bundle, using templates used by Bonita.
:::

<a id="start" />

### Starting and shutting down WildFly

<a id="wildfly_start" />

#### WildFly start script

WildFly can be started by executing the following script:

* Windows `<WILDFLY_HOME>\start-bonita.bat`
* Linux `<WILDFLY_HOME>/start-bonita.sh`

#### WildFly stop script

WildFly can be shut down by executing the following script:

* Windows `<WILDFLY_HOME>\server\bin\jboss-cli.bat --connect --command=:shutdown`
* Linux `<WILDFLY_HOME>/server/bin/jboss-cli.sh --connect --command=:shutdown`

You can also press Ctrl + C.

## After installation

### First steps after installation

Once you have your WildFly bundle up and running, complete these [first steps](first-steps-after-setup.md) to get Bonita Platform fully operational.

### Configuration update
To update the configuration after the first run please take a look at the [*Platform setup tool*](BonitaBPM_platform_setup.md#update_platform_conf)

::: info
File `database.properties` is the only entry point to configure the WildFly environment and the
[Bonita Platform configuration](BonitaBPM_platform_setup.md#configure_tool)
:::

### License update
To update the licenses after the first run, take a look at the [platform setup tool](BonitaBPM_platform_setup.md#update_platform_conf)

## Troubleshooting

---

**Issue**: When I restart the WildFly bundle, the Bonita application starts and then stops with message `WFLYSRV0009: Undeployed "bonita-all-in-one-...`

**Potential cause**: There are too many elements to restart.

**Solution**: Increase the WildFly application deployment timeout in file `standalone.xml` in folder `setup/wildlfy-templates`. Look for `'<deployment-scanner ... deployment-timeout="600" ...'`
and change it to a higher value (in seconds).

---

**Issue**:  
My **Oracle** database drivers do not seem to be taken into account when I put them in `<WILDFLY_HOME>/setup/lib` folder.

**Potential cause**:  
Driver file must respect some naming convention.

**Solution**:  
For Oracle, rename it so that the name contains at least the word `oracle` or `ojdbc` (case insensitive)

---

**Issue**: When I run `start-bonita.sh` or `start-bonita.bat`, I get the error message `Invalid Java version (1.7) < 1.8. Please set JAVA or JAVA_HOME variable to a JDK / JRE 1.8+`

**Cause**: Bonita 7.4+ WildFly bundle requires Java 1.8 to run

**Solution**: Ensure your running environment has a JDK or JRE 1.8 installed and set either JAVA or JAVA_HOME environment variable to point to it.

---

**Issue**: When I start the Wildfly bundle configured to use a **Microsoft SQL Server** database, I get the error message `java.lang.NoClassDefFoundError: javax/xml/bind/DatatypeConverter`

**Cause**: The WildFly configuration has not been properly updated

**Solution**: In the _<WILDFLY_HOME>/server/modules/com/sqlserver/main/module.xml_ file, add `<module name="javax.xml.bind.api"/>` in the list of dependencies

---
