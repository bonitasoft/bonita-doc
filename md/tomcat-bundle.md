# Tomcat bundle installation

You will find here steps needed to install and configure a Tomcat bundle.

The Tomcat bundle is a .zip archive that contains the Apache Tomcat JEE application server prepackaged along with Bonita BPM Portal and [Bonita configuration folder](BonitaBPM_platform_setup.md#platform_setup_tool).
The Tomcat bundle is a regular .zip archive based on Tomcat zip distribution.


::: warning
There is a known issue between Bitronix (the Transaction Manager shipped by Bonitasoft in the Tomcat bundle and in the Tomcat directories of the Deploy bundle) and the Microsoft SQL Server driver
(refer to: [MSDN note](https://msdn.microsoft.com/en-us/library/aa342335.aspx), [Bitronix note](http://bitronix-transaction-manager.10986.n7.nabble.com/Failed-to-recover-SQL-Server-Restart-td148.html)).
Therefore, using Bitronix as a Transaction Manager with SQL Server is not recommended. Our recommendation is to use the Wildfly bundle provided by Bonitasoft.
:::

## Installation of the Tomcat bundle

### Download and unzip the Tomcat bundle

<a id="download" />

#### Download

For the Community edition:

* Go to the [Bonitasoft website](http://www.bonitasoft.com/downloads-v2) and get the Bonita BPM Community edition Tomcat bundle.

For a Subscription edition:

* Go to the [Customer Portal](https://customer.bonitasoft.com/download/request) and download the Bonita BPM Subscription edition Tomcat bundle.

#### Unzip

The fully qualified folder path (including the BonitaBPM-x.y.z-Tomcat-7.0.67 folder) to the folder where you unzip the Tomcat bundle is referred to as `<TOMCAT_HOME>`. We recommend the following locations:

* Windows: `C:\BonitaBPM`. 
* Linux: in `/opt/BonitaBPM`. Make sure that Linux user account used to execute Tomcat is the owner of the folders and files.

::: warning  
Whatever location you choose, do not leave blank spaces in the path to the directory, nor in the folder name.
:::

#### Content of the Tomcat bundle

The Tomcat bundle is based on a standard Tomcat installation with the following additions:

* `bin/setenv.bat`: script to configure JVM system properties for Windows.
* `bin/setenv.sh`: script to configure JVM system properties for Linux.
* `bonita-start.bat`: script to start the bundle on Windows.
* `bonita-start.sh`: script to start the bundle on Linux.
* `bonita-stop.bat`: script to stop the bundle on Windows.
* `bonita-stop.sh`: script to stop the bundle on Linux.
* `conf/Catalina/localhost/bonita.xml`: Tomcat context configuration for Bonita web application. Define data sources used by Bonita Engine.
* `conf/bitronix-*.properties`: configuration files for Bitronix
* `catalina.properties`: modified to include lib/bonita folder to Tomcat classpath.
* `context.xml`: modified to add JTA support using Bitronix library.
* `logging.properties`: modified to create a log file dedicated to Bonita.
* `server.xml`: modified to add listener for Bitronix and h2 (see below for modification needed if you want to switch to another RDBMS).
* `lib/bonita`: extra libraries needed by Bonita. The following libraries are included: Bitronix JTA Transaction Manager, h2, SLF4J (required by Bitronix).
* `request_key_utils`: folder containing script to generate license request keys (Subscription editions only).
* `webapps/bonita.war`: the Bonita web application.

::: info
**Note:** Starting from Bonita BPM 7.3.0, Bonita BPM Platform configuration, including the license file, is stored in the same database as the Bonita BPM Engine data, namely in the `CONFIGURATION` table.
To initialize and update this configuration, a [*Platform setup tool*](BonitaBPM_platform_setup.md) is provided and embedded in Bonita BPM bundles.
:::

So your bundle also contains:

* `setup`: a tool to manage Bonita BPM Platform configuration, now stored in database instead of filesystem. Also ships a tool to centralize all the required Tomcat bundle configuration. 


### Get and install a license

::: info
This is not necessary if you are installing the Community edition.
:::

If you are installing a Subscription edition, you need to [request a license](licenses.md).

<a id="license" />

When you receive your license:
If this is your first installation, copy the file to the `<TOMCAT_HOME>/setup/platform_conf/licenses` folder before starting the bundle.
If this is a license update, use [the *Platform setup tool*](BonitaBPM_platform_setup.md#update_platform_conf).


<a id="edition_specification" />

### Edition specification

If you are installing the Performance Subscription edition, you need to edit [`setup/platform_conf/initial/platform_init_engine/bonita-platform-init-community-custom.properties`](BonitaBPM_platform_setup.md) by uncommenting the line and changing the value of the `activeProfiles` key to `'community,performance'`. No change is needed for the Community, Teamwork, or Efficiency edition.


<a id="configuration" />

### Configure the Tomcat bundle

::: info
If you just want to try Bonita BPM Platform with the embedded h2 database (only for development phase of your project), you can skip the next paragraph.
For production, you are recommended to use one of the supported databases, with the following steps.
:::

<a id="datasources_configuration" />

#### Configure the Tomcat server datasources

Make sure your database is created before you start configuring the Tomcat datasources and make sure you do so before you start the Tomcat server.

If you use the [Business Data Model (BDM) feature](define-and-deploy-the-bdm.md), we recommend that you configure a dedicated database.
You can also find more details on database configuration in the [dedicated page](database-configuration.md).

Follow those steps (see [Bundle auto-configuration](BonitaBPM_platform_setup.md#run_bundle_configure) for advanced usage of the configure command):

1. Edit file `[TOMCAT_HOME]`/setup/**database.properties** and modify the properties to suit your databases (Bonita BPM internal database & Business Data database).
2. If you use **Microsoft SQL Server** or **Oracle database**, copy your database drivers in `[TOMCAT_HOME]`/setup/lib folder. (Open-source drivers for H2, MySQL and PostgreSQL are already shipped in the tool)
3. Run `[TOMCAT_HOME]`/setup/**setup.sh configure** (Unix system) or `[TOMCAT_HOME]`\setup\setup.bat configure (Windows system).


::: info
What is the **bonita-start.sh** script doing?

The **bonita-start** script does the following:

1. Runs the **`setup init`** command:
    1. initializes the Bonita BPM internal database (the one you defined in file `setup/database.properties`): creates the tables that Bonita BPM uses internally + stores the configuration in database.
    2. install the license files (Subscription editions only) in the database.
2. Runs the **`setup configure`** command:
    The Setup Configure command auto-configures the Tomcat environment to access the right databases:
    1. It updates the files sentenv.sh (Unix system) and setenv.bat (Windows system) to set the database vendor values for **Bonita BPM internal database** & **Business Data database**
    2. It updates the file `[TOMCAT_HOME]`/conf/ **bitronix-resources.properties** with the values you set in file `database.properties`
    3. It updates the file `[TOMCAT_HOME]`/conf/Catalina/localhost/ **bonita.xml** with the values you set in file `database.properties`
    4. It copies your database vendor-specific drivers from `[TOMCAT_HOME]/setup/lib` to `[TOMCAT_HOME]/lib/bonita`
3. Starts the Tomcat bundle

Advanced users: if you need to finely tune your Tomcat bundle, see [Bundle auto-configuration](BonitaBPM_platform_setup.md#run_bundle_configure) for advanced usage of the configure command):
:::

<a id="start" />

### Start up / Shut down Tomcat

#### Tomcat start script

Tomcat can be started by executing the following commands:

* Windows: `<TOMCAT_HOME>\bonita-start.bat`
* Linux: `<TOMCAT_HOME>/bonita-start.sh`

#### Custom start-up script

If you have a Subscription Pack license covering fewer CPU cores that are available on your server, you need to limit number of CPUs available to Tomcat.
Do this this, you need to use a custom start script to to start Tomcat only with the number of cores allowed by the license (e.g. 2 cores for a development license).

* For Windows:
    * Copy the file `bonita-start.bat` to a file called `mystartup.bat`.
    * Change the last line of the file to `start /AFFINITY 3 bonita-start.bat` (where 3 is the affinity mask expressed as a hexadecimal number)

This table explains the relation between the hexadecimal parameter of the command and the physical CPUs you targeted.
As an example, if hexadecimal parameter is equal to 6. The corresponding binary number is 0110, that means you will only target the CPU 2 and CPU 3.

<div class="row"><div class="col-md-6 col-md-offset-2">

|     Hexadecimal number conversion to CPU selection            |     CPU number 4     |     CPU number 3     |     CPU number 2     |     CPU number 1     |
|---------------------------------------------------------------|----------------------|----------------------|----------------------|----------------------|
|0<sub>hex</sub> 	= 	0<sub>oct</sub>  = 	0<sub>cpu</sub>     | 0                    | 0                    | 0                    | 0                    |
|1<sub>hex</sub> 	= 	1<sub>oct</sub>  = 	1<sub>cpu</sub>     | 0                    | 0                    | 0                    | 1 <!--{.bg-danger}-->|
|2<sub>hex</sub> 	= 	1<sub>oct</sub>  = 	1<sub>cpu</sub>     | 0                    | 0                    | 1 <!--{.bg-danger}-->| 0                    |
|3<sub>hex</sub> 	= 	3<sub>oct</sub>  = 	2<sub>cpu</sub>     | 0                    | 0                    | 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->|
|7<sub>hex</sub> 	= 	7<sub>oct</sub>  = 	3<sub>cpu</sub>     | 0                    | 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->|
|F<sub>hex</sub> 	= 	17<sub>oct</sub> = 	4<sub>cpu</sub>     | 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->|

</div></div>

* For Linux:
    * Copy the file `bonita-start.sh` to a file called `mystartup.sh`.
    * Change the last line of the file to `taskset -c 0,1 bonita-start.sh 0,1` (where 0,1 indicate that you will only use 2 CPU, the CPU0 and the CPU1. This list may contain multiple items, separated by comma, and ranges. For example, 0,5,7,9-11)

#### Tomcat stop script

Tomcat can be shut down by executing the following command:

* Windows: `<TOMCAT_HOME>\bonita-stop.bat`

* Linux: `<TOMCAT_HOME>/bonita-stop.sh`

If you see `checkThreadLocalMapForLeaks` errors, the probably indicates that Tomcat is shutting down before all work threads are completed.
You can [increase the work service termination timeout](performance-tuning.md) to ensure that work is complete before shutdown.

<a id="post-install" />

## After installation

### First steps after installation

Once you have got your Tomcat bundle up and running a [few extra steps](first-steps-after-setup.md) are required in order to get a fully operational Bonita BPM platform.

### How to update the configuration
To update the configuration after the first run please take a look at the [platform setup tool](BonitaBPM_platform_setup.md#update_platform_conf)

::: info
**Keep in mind** that file `database.properties` is the only entry point to configure the Tomcat environment and the
[Bonita BPM Platform configuration](BonitaBPM_platform_setup.md#configure_tool)
:::
