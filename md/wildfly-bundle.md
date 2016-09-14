# Wildfly bundle

You will find here steps needed to install and configure a Wildfly bundle.

The Wildfly bundle is a zip archive that contains the Red Hat Wildfly JEE application server packaged with Bonita BPM Portal and [ready to use with Bonita BPM](BonitaBPM_platform_setup.md#platform_setup_tool).
The Wildfly bundle is a regular zip archive based on the Wildfly zip distribution.

## Installation of the Wildfly bundle

### Download and unzip the Wildfly bundle

<a id="download" />

#### Download

For the Community edition:

* Go to the [Bonitasoft website](http://www.bonitasoft.com/downloads-v2) and get the Bonita BPM Community edition Wildfly bundle.

For a Subscription edition:

* Go to the [Customer Portal](https://customer.bonitasoft.com/download/request) and download the Bonita BPM Subscription edition Wildfly bundle.

#### Unzip

The folder where you unzip the Wildfly bundle is known as _`<WILDFLY_HOME>`_. We recommend the following locations: 

* Windows: `C:\BonitaBPM`. If you want to unzip the bundle to another folder, do not use spaces in the folder name. 
* Linux: in `/opt/BonitaBPM`. Make sure that Linux user account used to execute Wildfly is the owner of the folders and files.

#### Content of the Wildfly bundle

The Wildfly bundle is based on a standard Wildfly installation with the following additions:

* `bin/standalone.conf`: script to configure JVM system properties.
* `bonita-start.bat`: script to start the bundle on Windows.
* `bonita-start.sh`: script to start the bundle on Linux.
* `standalone/configuration/standalone.xml`: Wildfly context configuration for Bonita BPM Portal. It defines data sources used by Bonita BPM Engine.
* `request_key_utils`: script to generate license request keys (Subscription editions only).
* `standalone/deployments/bonita-all-in-one-[version].ear`: Bonita BPM Portal (web application) and EJB3 API.

::: info
**Note:** Starting from Bonita BPM 7.3.0, Bonita BPM Platform configuration, including the license file, is stored in the same database as the Bonita BPM Engine data, namely in the `CONFIGURATION` table.
To initialize and update this configuration, a [*Platform setup tool*](BonitaBPM_platform_setup.md) is provided and embedded in Bonita BPM bundles. 
It will be launched automatically when you start the Wildfly bundle to initialize the database.
:::

So your bundle also contains:
`setup`: database management for Bonita BPM Platform configuration and Bonita BPM Engine data, and a tool to update the configuration.


### Get and install a license

::: info
This is not necessary if you are installing the Community edition.
:::

If you are installing a Subscription edition, you need to [request a license](licenses.md).

<a id="license" />

When you receive your license:
If this is your first installation, copy the file to the `<WILDFLY_HOME>/setup/platform_conf/licenses` folder before starting the bundle.
If this is a license update, use [the *Platform setup tool*](BonitaBPM_platform_setup.md#update_platform_conf).


### Edition specification

If you are installing the Performance Subscription edition, you need to edit [`setup/platform_conf/initial/platform_init_engine/bonita-platform-init-community-custom.properties`](BonitaBPM_platform_setup.md) and change the value of the `activeProfiles` key to `'community,performance'`.
No change is needed for the Community, Teamwork, or Efficiency editions.


<a id="configuration" />

### Configure the Wildfly bundle

::: info
If you just want to try Bonita BPM Platform with the embedded h2 database (only for development phase of your project), you can skip this paragraph.
For production, you are recommended to use one of the supported databases, with the following steps.
:::

Make sure your database is created before you start the configuration and make sure you do this before you start the Wildfly server.

1. Edit file `[WILDFLY_HOME]`/setup/**database.properties** and modify the properties to suit your databases (Bonita BPM internal database & Business Data database).
2. If you use **Microsoft SQL Server** or **Oracle database**, copy your database drivers in `[WILDFLY_HOME]`/setup/lib folder. (Open-source drivers for H2, MySQL and PostgreSQL are already shipped in the tool)
3. Run `[WILDFLY_HOME]`/**bonita-start.sh** (Unix system) or `[WILDFLY_HOME]`\ **bonita-start.bat** (Windows system) to run Bonita BPM Wildfly bundle.

::: info
What is the **bonita-start.sh** script doing?

The **bonita-start** script does the following:

1. Runs the **`setup init`** command:
    1. initializes the Bonita BPM internal database (the one you defined in file `setup/database.properties`): creates the tables that Bonita BPM uses internally + stores the configuration in database.
    2. install the license files (Subscription editions only) in the database.
2. Runs the **`setup configure`** command:
    The Setup Configure command auto-configures the Wildfly environment to access the right databases:
    1. It updates the file `[WILDFLY_HOME]`/standalone/configuration/**standalone.xml** with the database values you set in file `database.properties` for **Bonita BPM internal database** & **Business Data database**
    2. It creates the file(s) `[WILDFLY_HOME]`/modules/**/main/**modules.xml** that Wildfly needs, according to your database settings
    3. It copies your database drivers into `[WILDFLY_HOME]`/modules/**/**main**/ folders
3. Starts the Wildfly bundle

Advanced users: if you need to finely tune your Wildfly bundle, see [Bundle auto-configuration](BonitaBPM_platform_setup.md#run_bundle_configure) for advanced usage of the configure command):
:::

<a id="start" />

### Start and shut down Wildfly

#### Wildfly start script

Wildfly can be started by executing the following script:

* Windows `<WILDFLY_HOME>\bonita-start.bat`
* Linux `<WILDFLY_HOME>/bonita-start.sh`

#### Custom start-up script

If you have a Subscription edition license covering fewer CPU cores than are available on your server, you must limit the number of CPUs available to Wildfly.

To do so, create a custom startup script to start Wildfly only with the number of cores allowed by your license (e.g. 2 for development license).

For example: 

* For Windows: `start /AFFINITY 3 bonita-start.bat` (where 3 is the affinity mask expressed as a hexadecimal number)

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



* For Linux: `taskset -c 0,1 bonita-start.sh` 
    * Change the last line of the file to `taskset -c 0,1 bonita-start.sh 0,1` (where 0,1 indicate that you will only use 2 CPU, the CPU0 and the CPU1. This list may contain multiple items, separated by comma, and ranges. For example, 0,5,7,9-11) 

#### Shutdown

Wildfly can be shut down by running the following script:

* Windows `<WILDFLY_HOME>\bin\jboss-cli.bat --connect --command=:shutdown`
* Linux `<WILDFLY_HOME>/bin/jboss-cli.sh --connect --command=:shutdown`

You can also press Ctrl + C.

## First steps after installation

Once you have your Wildfly bundle up and running, complete these [first steps](first-steps-after-setup.md) to get Bonita BPM Platform fully operational.

### How to update the configuration
To update the configuration after the first run please take a look at the [*Platform setup tool*](BonitaBPM_platform_setup.md#update_platform_conf)

::: info
**Keep in mind** that [platform setup tool](BonitaBPM_platform_setup.md#configure_tool) is independent from Wildfly Bundle and thus needs to be configured by itself to point to the right database.
This is done by editing file `database.properties`
:::

### How to update the license
To update the licenses after the first run please take a look at the [platform setup tool](BonitaBPM_platform_setup.md#update_platform_conf)
