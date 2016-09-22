# WildFly bundle

You will find here steps needed to install and configure a WildFly bundle.

The WildFly bundle is a zip archive that contains the Red Hat WildFly JEE application server packaged with Bonita BPM Portal and [ready to use with Bonita BPM](BonitaBPM_platform_setup.md#platform_setup_tool).
The WildFly bundle is a regular zip archive based on the WildFly zip distribution.

## Installation of the WildFly bundle

### Download and unzip the WildFly bundle

<a id="download" />

#### Download

For the Community edition:

* Go to the [Bonitasoft website](http://www.bonitasoft.com/downloads-v2) and get the Bonita BPM Community edition WildFly bundle.

For a Subscription edition:

* Go to the [Customer Portal](https://customer.bonitasoft.com/download/request) and download the Bonita BPM Subscription edition WildFly bundle.

#### Unzip

The folder where you unzip the WildFly bundle is known as _`<WILDFLY_HOME>`_. We recommend the following locations:

* Windows: `C:\BonitaBPM`. If you want to unzip the bundle to another folder, do not use spaces in the folder name. 
* Linux: in `/opt/BonitaBPM`. Make sure that Linux user account used to execute WildFly is the owner of the folders and files.

#### Content of the WildFly bundle

The WildFly bundle is based on a standard WildFly installation with the following additions:

* `bin/standalone.conf`: script to configure JVM system properties.
* `bonita-start.bat`: script to start the bundle on Windows.
* `bonita-start.sh`: script to start the bundle on Linux.
* `standalone/configuration/standalone.xml`: WildFly context configuration for Bonita BPM Portal. It defines data sources used by Bonita BPM Engine.
* `request_key_utils`: script to generate license request keys (Subscription editions only).
* `standalone/deployments/bonita-all-in-one-[version].ear`: Bonita BPM Portal (web application) and EJB3 API.

::: info
**Note:** Starting from Bonita BPM 7.3.0, Bonita BPM Platform configuration, including the license file, is stored in the same database as the Bonita BPM Engine data, namely in the `CONFIGURATION` table.
To initialize and update this configuration, a [*Platform setup tool*](BonitaBPM_platform_setup.md) is provided and embedded in Bonita BPM bundles. 
It will be launched automatically when you start the WildFly bundle to initialize the database.
:::

So your bundle also contains:

* `setup`: a tool to manage Bonita BPM Platform configuration, stored in database instead of filesystem. Also ships a tool to centralize all the required WildFly bundle configuration.


### Get and install a license (Subscription editions only)

First, [request a license](licenses.md).

<a id="license" />

When you receive your license:
If this is your first installation, copy the file to the `<WILDFLY_HOME>/setup/platform_conf/licenses` folder before starting the bundle.
If this is a license update, use [the *Platform setup tool*](BonitaBPM_platform_setup.md#update_platform_conf).


### Change the default credentials (optional, recommended for production)

As a security precaution, we **strongly recommend** that before you start your application server, you change the default username and password used for the platform administrator and for the default tenant administrator.

#### Platform administrator

The username and password for the platform administrator are defined in the file [`platform_engine/bonita-platform-community-custom.properties`](BonitaBPM_platform_setup.md), by the following properties:

* `platformAdminUsername` defines the username (default `platformAdmin`)
* `platformAdminPassword` defines the password (default `platform`)

This password is used for platform-level administration tasks, such as creating a tenant.

#### Tenant administrator

Each tenant has an administrator, with a tenant-specific username and password. The tenant administrator is also known as the tenant technical user.

When the platform is created, default values for the tenant administrator username and password are defined in the file [`tenant_template_engine/bonita-tenant-community-custom.properties`](BonitaBPM_platform_setup.md), by the following properties:

* `userName` defines the username (default `install`)
* `userPassword` defines the password (default `install`)

When you create a tenant, the tenant administrator is created with the default username and password, unless you specify new values. 
Change these tenant-specific credentials for an existing tenant by updating the `userName` and `userPassword` properties in `bonita-tenant-community-custom.properties`.

::: warning
For the default tenant, the tenant administrator username and password must also be defined in file [`platform_portal/platform-tenant-config.properties`](BonitaBPM_platform_setup.md), with exactly the same values that you set in `bonita-tenant-community-custom.properties`.
At platform creation, this file contains the default username and password for the default tenant. 
:::


<a id="edition_specification" />

### Specify the Subscription edition

If you are installing the Performance Subscription edition, edit [`setup/platform_conf/initial/platform_init_engine/bonita-platform-init-community-custom.properties`](BonitaBPM_platform_setup.md) by uncommenting the line and change the value of the `activeProfiles` key to `'community,performance'`.


<a id="configuration" />

### Configure the WildFly bundle

::: info
If you just want to try Bonita BPM Platform with the embedded h2 database (only for development phase of your project), you can skip this paragraph.
For production, you are recommended to use one of the supported databases, with the following steps.
:::

1. Make sure your database is created.
2. Edit file `[WILDFLY_HOME]`/setup/**database.properties** and modify the properties to suit your databases (Bonita BPM internal database & Business Data database)
3. If you use **Microsoft SQL Server** or **Oracle database**, copy your database drivers in `[WILDFLY_HOME]`/setup/lib folder. (H2, MySQL and PostgreSQL drivers are already shipped in the tool)
4. Run `[WILDFLY_HOME]`/**bonita-start.sh** (Unix system) or `[WILDFLY_HOME]`\ **bonita-start.bat** (Windows system) to run Bonita BPM WildFly bundle (see [WildFly start script](#wildfly_start))


::: info
What is the **bonita-start.sh** script doing?

The **bonita-start** script does the following:

1. Runs the **`setup init`** command:
    1. initializes the Bonita BPM internal database (the one you defined in file `setup/database.properties`): creates the tables that Bonita BPM uses internally + stores the configuration in database.
    2. install the license files (Subscription editions only) in the database.
2. Runs the **`setup configure`** command:
    The Setup Configure command configures the WildFly environment to access the right databases:
    1. It updates the file `[WILDFLY_HOME]`/standalone/configuration/**standalone.xml** with the database values you set in file `database.properties` for **Bonita BPM internal database** & **Business Data database**
    2. It creates the file(s) `[WILDFLY_HOME]`/modules/**/main/**modules.xml** that WildFly needs, according to your database settings
    3. It copies your database drivers into `[WILDFLY_HOME]`/modules/**/**main**/ folders
3. Starts the WildFly bundle

Advanced users: if you need to finely tune your WildFly bundle, see [Bundle configuration](BonitaBPM_platform_setup.md#run_bundle_configure) for advanced usage of the `configure` command):
:::

<a id="start" />

### Starting and shutting down WildFly

<a id="wildfly_start" />

#### WildFly start script

WildFly can be started by executing the following script:

* Windows `<WILDFLY_HOME>\bonita-start.bat`
* Linux `<WILDFLY_HOME>/bonita-start.sh`

#### Specifying the number of available CPU cores

If you have a Subscription edition license covering fewer CPU cores than are available on your server, you must limit the number of CPUs available.

To do so, please [create a custom WildFly start-up script](specify-cpu-cores.md)

#### WildFly stop script

WildFly can be shut down by executing the following script:

* Windows `<WILDFLY_HOME>\bin\jboss-cli.bat --connect --command=:shutdown`
* Linux `<WILDFLY_HOME>/bin/jboss-cli.sh --connect --command=:shutdown`

You can also press Ctrl + C.



## First steps after installation

Once you have your WildFly bundle up and running, complete these [first steps](first-steps-after-setup.md) to get Bonita BPM Platform fully operational.

### How to update the configuration
To update the configuration after the first run please take a look at the [*Platform setup tool*](BonitaBPM_platform_setup.md#update_platform_conf)

::: info
File `database.properties` is the only entry point to configure the WildFly environment and the
[Bonita BPM Platform configuration](BonitaBPM_platform_setup.md#configure_tool)
:::

### How to update the license
To update the licenses after the first run please take a look at the [platform setup tool](BonitaBPM_platform_setup.md#update_platform_conf)
