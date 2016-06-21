# JBoss bundle

The JBoss bundle is a zip archive that contains the Red Hat JBoss JEE application server packaged with Bonita BPM web application and [Bonita configuration folder](BonitaBPM_platform_setup.md). 
The JBoss bundle is a regular zip archive based on the JBoss zip distribution.

There are three stages to installing the JBoss bundle:

1. Download the distribution and unpack the files.
2. Get and install a license. This is not necessary if you are installing the Community edition.
3. Configure the database.

When these three stages are complete, you can start JBoss to validate the installation. Then there are some post-installation setup tasks.

## Download and unzip the JBoss bundle

### Download

For the Community edition:

* Go to the [Bonitasoft website](http://www.bonitasoft.com/downloads-v2) and get the Bonita BPM Community edition JBoss bundle.

For a Subscription edition:

* Go to the [Customer Portal](https://customer.bonitasoft.com/download/request) and download the Bonita BPM Subscription Pack edition JBoss bundle.

### Unzip

The folder where you unzip the Jboss bundle is known as _`<JBOSS_HOME>`_. We recommend the following locations: 

* Windows: `C:\BonitaBPM`. If you want to unzip the bundle to another folder, do not use spaces in the folder name. 
* Linux: in `/opt/BonitaBPM`. Make sure that Linux user account used to execute JBoss is the owner of the folders and files.

## License installation

If you are installing a Subscription edition, you need to [request a license](licenses.md).

When you receive your license, copy the file to the `<JBOSS_HOME>/setup/platform_conf/licenses/` folder.

## Edition specification

If you are installing the Performance Subscription edition, 
you need to edit [`bonita-platform-init-community-custom.properties`](BonitaBPM_platform_setup.md)
and change the value of the `activeProfiles` key to `'community,performance'`. No change is needed for the Community, Teamwork, or Efficiency edition.

## Database configuration

The JBoss bundle is configured to use an h2 database by default. h2 is suitable for a test platform, but for production, you are recommended to use one of the supported databases.

If you want to use another database you need to specify the [database configuration](database-configuration.md) and the [business data database configuration](database-configuration-for-business-data.md). Make sure you do this before you start JBoss.

## Start and shut down JBoss

### JBoss start script

JBoss can be started by executing the following script:

* Windows `<JBOSS_HOME>\bonita-start.bat`
* Linux `<JBOSS_HOME>/bonita-start.sh`

### Custom start-up script

If you have a Subscription edition license covering fewer CPU cores than are available on your server, you must limit the number of CPUs available to JBoss.

To do so, create a custom startup script to start JBoss only with the number of cores allowed by your license (e.g. 2 for development license).

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
    * Change the last line of the file to `taskset -c 0,1 bonita-start.bat 0,1` (where 0,1 indicate that you will only use 2 CPU, the CPU0 and the CPU1. This list may contain multiple items, separated by comma, and ranges. For example, 0,5,7,9-11) 

### Shutdown

JBoss can be shut down by running the following script:

* Windows `<JBOSS_HOME>\bin\jboss-cli.bat --connect --command=:shutdown`
* Linux `<JBOSS_HOME>/bin/jboss-cli.sh --connect --command=:shutdown`

## First steps after installation

Once you have your JBoss bundle up and running, complete these [first steps](first-steps-after-setup.md) to get a fully operational Bonita BPM platform.

### How to update the configuration
To update the configuration after the first run please take a look at the [platform setup tool](BonitaBPM_platform_setup.md#update_platform_conf)

::: info
**Keep in mind** that [platform setup tool](BonitaBPM_platform_setup.md#configure_tool) is independent from Jboss Bundle and thus needs to be configured by itself to point to the right database.
This is done by editing file `database.properties`
:::