# Tomcat bundle

You will find here steps needed to install and configure a Tomcat bundle.

The Tomcat bundle is a .zip archive that contains the Apache Tomcat JEE application server prepackaged along with Bonita BPM Portal and [Bonita configuration folder](BonitaBPM_platform_setup.md).
The Tomcat bundle is a regular .zip archive based on Tomcat zip distribution.


::: warning
There is a known issue between Bitronix (the Transaction Manager shipped by Bonitasoft in the Tomcat bundle and in the Tomcat directories of the Deploy bundle) and the Microsoft SQL Server driver
(refer to: [MSDN note](https://msdn.microsoft.com/en-us/library/aa342335.aspx), [Bitronix note](http://bitronix-transaction-manager.10986.n7.nabble.com/Failed-to-recover-SQL-Server-Restart-td148.html)).
Therefore, using Bitronix as a Transaction Manager with SQL Server is not recommended. Our recommendation is to use the JBoss bundle provided by Bonitasoft.
:::

<a id="download" />

## Installation of the Tomcat bundle

### Download the distribution and unpack the files

#### Download

For the Community edition:

* Go to the [Bonitasoft website](http://www.bonitasoft.com/downloads-v2) and get the Bonita BPM Community edition Tomcat bundle.

For a Subscription edition:

* Go to the [Customer Portal](https://customer.bonitasoft.com/download/request) and download the Bonita BPM Subscription edition Tomcat bundle.

#### Unzip

The fully qualified folder path (including the BonitaBPM-x.y.z-Tomcat-7.0.55 folder) to the folder where you unzip the Tomcat bundle is referred to as `_<TOMCAT_HOME>_`. We recommend the following locations:

* Windows: `C:\BonitaBPM`. If you want to unzip the bundle to another folder, avoid spaces in the folder name.
* Linux: in `/opt/BonitaBPM`. Make sure that Linux user account used to execute Tomcat is the owner of the folders and files.

::: warning
Do not leave any blank space in the path to the directory containing the Tomcat installation.
:::

#### Content of the Tomcat bundle

The Tomcat bundle is based on a standard Tomcat installation with the following additions:

* `bin/setenv.bat`: script to configure JVM system properties for Windows.
* `bin/setenv.sh`: script to configure JVM system properties for Linux.
* `bonita-start.bat`: script to start the bundle on Linux.
* `bonita-start.sh`: script to start the bundle on Linux.
* `bonita-stop.bat`: script to stop the bundle on Linux.
* `bonita-stop.sh`: script to stop the bundle on Linux.
* `setup`: Contains configuration/database scripts of the Bonita BPM platform and the tool to update it. See [platform setup tool](BonitaBPM_platform_setup.md).
* `conf/Catalina/localhost/bonita.xml`: Tomcat context configuration for Bonita web application. Define data sources used by Bonita Engine.
* `conf/bitronix-*.properties`: configuration files for Bitronix
* `catalina.properties`: modified to include lib/bonita folder to Tomcat classpath.
* `context.xml`: modified to add JTA support using Bitronix library.
* `logging.properties`: modified to create a log file dedicated to Bonita.
* `server.xml`: modified to add listener for Bitronix and h2 (see below for modification needed if you want to switch to another RDBMS).
* `lib/bonita`: extra libraries needed by Bonita. The following libraries are included: Bitronix JTA Transaction Manager, h2, SLF4J (required by Bitronix).
* `request_key_utils`: script to generate license request keys (Subscription editions only).
* `webapps/bonita.war`: the Bonita web application.


<a id="license" />

### Get and install a license

::: info
This is not necessary if you are installing the Community edition.
:::

If you are installing a Subscription edition, you need to [request a license](licenses.md).

Whe you receive your license, copy the file to the `<TOMCAT_HOME>/setup/platform_conf/licenses` folder before starting the bundle.
If the bundle was already started please refer to


#### Edition specification

If you are installing the Performance Subscription edition,
you need to edit [`setup/platform_conf/initial/bonita-platform-init-community-custom.properties`](BonitaBPM_platform_setup.md)
and change the value of the `activeProfiles` key to `'community,performance'`. No change is needed for the Community, Teamwork, or Efficiency edition.


<a id="configuration" />

### Configure the bundle

The configuration of the BonitaBPM Platform is stored in database in the `CONFIGURATION` table. It can be created and updated using the [platform setup tool](BonitaBPM_platform_setup.md) embedded in this bundle.

#### Configure the Tomcat server datasources

If you just want to try BonitaBPM platform with the embedded H2 database (not for production), you can skip this entire paragraph.

* edit file `[TOMCAT_BUNDLE_DIR]`/conf/ **server.xml** and remove (or comment out) the following line to deactivate embedded H2 database:

```
<Listener className="org.bonitasoft.tomcat.H2Listener" tcpPort="9091" baseDir="${org.bonitasoft.h2.database.dir}" start="true" />
```

* drop your database vendor-specific drivers in `[TOMCAT_BUNDLE_DIR]`/lib/bonita (you can copy the provided open-source drivers: PostgreSQL, MySQL) from `[TOMCAT_BUNDLE_DIR]/setup/lib`
* edit file `[TOMCAT_BUNDLE_DIR]`/conf/ **bitronix-resources.properties**
    * comment the default embedded H2 database configuration (preceding the lines with a #)
    * uncomment the configuration for your database vendor (PostgreSQL, Oracle, SQL Server, or MySQL)
    * change the default values for your database configuration to point to an existing database instance and valid credentials
    * Warning: this must be done for 2 different datasources in the file: **resource.ds1.*** and **resource.ds2.***
* edit file `[TOMCAT_BUNDLE_DIR]`/conf/Catalina/localhost/ **bonita.xml**
    * comment the default embedded H2 database configuration (with `<!-- and -->` around the lines to comment)
    * uncomment the configuration for your database vendor (PostgreSQL, Oracle, SQL Server, or MySQL)
    * change the default values for your database configuration to point to an existing database instance and valid credentials
    * Warning: this must be done for 2 different datasources in the file: **bonitaSequenceManagerDS** and **NotManagedBizDataDS**
* edit file sentenv.sh (Unix system) or setenv.bat (Windows system)
    * change property **DB_OPTS** and change default **h2** value for the one corresponding to your database vendor (Bonita BPM internal database)
    * change property **BDM_DB_OPTS** and change default **h2** value for the one corresponding to your database vendor (Bonita BPM database specific to the "Business Data" feature)



#### Configure Bonita BPM Platform

The initial configuration that will be put in database is located in the folder `setup/platform_conf/initial`, Please refer to the [platform setup tool](BonitaBPM_platform_setup.md) for more details.

You will at least need to update the `setup/database.properties` with the connection information to your database if it is not h2.

<a id="database" />

### Configure the database

The Tomcat bundle is configured to use a h2 database by default. h2 is fine for a test platform, but for production, you are recommended to use one of the supported databases.

If you want to use another database you need to specify the [database configuration](database-configuration.md). Make sure you do this before you start Tomcat.

<a id="start" />

### Start and shut down Tomcat

#### Tomcat start script

Tomcat can be started by executing the following commands:

* Windows: `<TOMCAT_HOME>\bonita-start.bat`
* Linux: `<TOMCAT_HOME>/bonita-start.bat`

This command execute the [setup script](BonitaBPM_platform_setup.md) then start the tomcat.
If you use directly the tomcat startup script and not this bonita-start script for the first time, the BonitaBPM platform will start using default configuration.

#### Custom start-up script

If you have a Subscription Pack license covering fewer CPU cores that are available on your server, you need to limit number of CPUs available to Tomcat.
Do this this, you need to use a custom start script to to start Tomcat only with the number of cores allowed by the license (e.g. 2 cores for a development license).

* For Windows:
    * Copy the file `bonita-start.bat` to a file called `mystartup.bat`.
    * Change the last line of the file to `start /AFFINITY 3 bin\startup.bat` where 3 is the affinity mask (expressed as a hexadecimal number)

* For Linux:
    * Copy the file `bonita-start.sh` to a file called `mystartup.sh`.
    * Change the last line of the file to `taskset -c 0,1 bin/startup.sh 0,1` (where 0,1 indicate the CPU cores to use).

#### Shut down Tomcat

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

### How to update the license
To update the licenses after the first run please take a look at the [platform setup tool](BonitaBPM_platform_setup.md#update_platform_conf)
