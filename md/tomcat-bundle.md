# 2.3.3 Tomcat bundle

The Tomcat bundle is a .zip archive that contains the Apache Tomcat JEE application server prepackaged along with Bonita BPM web application and Bonita configuration folder (known as var\_bonita\_home). 
The Tomcat bundle is a regular .zip archive based on Tomcat zip distribution.

There are three stages to installing the Tomcat bundle:

1. Download the distribution and unpack the files.
2. Get and install a license. This is not necessary if you are installing the Community edition.
3. Configure the database.

When these three stages are complete, you can start Tomcat to validate the installation. Then there are some post-installation setup tasks.

**[Download and unzip the Tomcat bundle](#download_unzip)**

**[License installation](#license)**

**[Edition specification](#edition)**

**[Database configuration](#db)**

**[Start and shut down Tomcat](#start_stop)**

**[First steps after installation](#postinstall)**

There is a known issue between Bitronix (the Transaction Manager shipped by Bonitasoft in the Tomcat bundle and in the Tomcat directories of the Deploy bundle) and the Microsoft SQL Server driver
(refer to: [MSDN note](http://msdn.microsoft.com/en-us/library/aa342335.aspx), [Bitronix note](http://bitronix-transaction-manager.10986.n7.nabble.com/Failed-to-recover-SQL-Server-Restart-td148.md)).
Therefore, using Bitronix as a Transaction Manager with SQL Server is not recommended. Our recommendation is to use the JBoss bundle provided by Bonitasoft.

## Download and unzip the Tomcat bundle

### Download

For the Community edition:

* Go to the [Bonitasoft website](http://www.bonitasoft.com/how-we-do-it/downloads) and get the Bonita BPM Community edition Tomcat bundle.

For a Subscription edition:

* Go to the [Customer Portal](https://customer.bonitasoft.com/download/request) and download the Bonita BPM Subscription Pack edition Tomcat bundle.

### Unzip

The fully qualified folder path (including the BonitaBPM-x.y.z-Tomcat-7.0.55 folder) to the folder where you unzip the Tomcat bundle is referred to as ``. We recommend the following locations: 

* Windows: `C:\BonitaBPM`. If you want to unzip the bundle to another folder, avoid spaces in the folder name. 
* Linux: in `/opt/BonitaBPM`. Make sure that Linux user account used to execute Tomcat is the owner of the folders and files.

**Important note **: Do not leave any blank spaces in the path to the directory containing the Tomcat installation.

### Content of the Tomcat bundle

The Tomcat bundle is based on a standard Tomcat installation with the following additions:

* `bin/setenv.bat`: script to configure JVM system properties for Windows.
* `bin/setenv.sh`: script to configure JVM system properties for Linux.
* `bonita`: var\_bonita\_home folder (standard, or edition-specific).
* `conf/Catalina/localhost/bonita.xml`: Tomcat context configuration for Bonita web application. Define data sources used by Bonita Engine.
* `conf/bitronix-*.properties`: configuration files for Bitronix
* `catalina.properties`: modified to include lib/bonita folder to Tomcat classpath.
* `context.xml`: modified to add JTA support using Bitronix library.
* `logging.properties`: modified to create a log file dedicated to Bonita.
* `server.xml`: modified to add listener for Bitronix and h2 (see below for modification needed if you want to switch to another RDBMS).
* `lib/bonita`: extra libraries needed by Bonita. The following libraries are included: Bitronix JTA Transaction Manager, h2, SLF4J (required by Bitronix).
* `request_key_utils`: script to generate license request keys (Subscription editions only).
* `webapps/bonita.war`: the Bonita web application.

## License installation

If you are installing a Subscription edition, you need to [request a license](licenses.md). 

Whe you receive your license, copy the file to the `/bonita/server/licenses` folder.

## Edition specification

If you are installing the Performance Subscription edition, 
you need to edit `engine-server/conf/platform-init/bonita-platform-init-community-custom.properties`
and change the value of the `activeProfiles` key to `'community,performance'`. No change is needed for the Community, Teamwork, or Efficiency edition.

## Database configuration

The Tomcat bundle is configured to use a h2 database by default. h2 is fine for a test platform, but for production, you are recommended to use one of the supported databases. 

If you want to use another database you need to specify the [database configuration](database-configuration.md). Make sure you do this before you start Tomcat.

## Start and shut down Tomcat

### Tomcat start script

Tomcat can be started by executing the following commands:

* Windows: `\bin\startup.bat`
* Linux: `/bin/startup.sh`

### Custom start-up script

If you have a Subscription Pack license covering fewer CPU cores that are available on your server, you need to limit number of CPUs available to Tomcat. 
Do this this, you need to use a custom start script to to start Tomcat only with the number of cores allowed by the license (e.g. 2 cores for a development license).

#### For Windows:

* Go to folder `/bin/`
* Create a file called `mystartup.bat`
* Content of the file should be `start /AFFINITY 3 startup.bat` where 3 is the affinity mask (expressed as a hexadecimal number)

#### For Linux:

* Go to the folder `/bin/`.
* Create a file called `mystartup.sh`. 
* The content of the file should be `taskset -c 0,1 startup.sh 0,1` (where 0,1 indicate the CPU cores to use).

### Shut down Tomcat

Tomcat can be shut down by executing the following command:

* Windows: `\bin\shutdown`
* Linux: `/bin/shutdown.sh`

If you see `checkThreadLocalMapForLeaks` errors, the probably indicates that Tomcat is shutting down before all work threads are completed. 
You can [increase the work service termination timeout](performance-tuning.md#work_service) to ensure that work is complete before shutdown. 

## First steps after installation

Once you have got your Tomcat bundle up and running a [few extra steps](first-steps-after-setup.md) are required in order to get a fully operational Bonita BPM platform.