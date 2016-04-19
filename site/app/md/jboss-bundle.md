# 2.3.2 JBoss bundle

The JBoss bundle is a zip archive that contains the Red Hat JBoss JEE application server packaged with Bonita BPM web application and Bonita configuration folder (known as var\_bonita\_home). 
The JBoss bundle is a regular zip archive based on the JBoss zip distribution.


There are three stages to installing the JBoss bundle:

1. Download the distribution and unpack the files.
2. Get and install a license. This is not necessary if you are installing the Community edition.
3. Configure the database.

When these three stages are complete, you can start JBoss to validate the installation. Then there are some post-installation setup tasks.



**[Download and unzip the JBoss bundle](#download_unzip)**

**[License installation](#license)**

**[Edition specification](#edition)**

**[Database configuration](#db)** 

**[Start and shut down JBoss](#start_stop)**

**[First steps after installation](#postinstall)**

## Download and unzip the JBoss bundle




### Download




For the Community edition:

* Go to the [Bonitasoft website](http://www.bonitasoft.com/how-we-do-it/downloads) and get the Bonita BPM Community edition JBoss bundle.

For a Subscription edition:

* Go to the [Customer Portal](https://customer.bonitasoft.com/download/request) and download the Bonita BPM Subscription Pack edition JBoss bundle.


### Unzip


The folder where you unzip the Jboss bundle is known as _``_. We recommend the following locations: 

* Windows: `C:\BonitaBPM`. If you want to unzip the bundle to another folder, do not use spaces in the folder name. 
* Linux: in `/opt/BonitaBPM`. Make sure that Linux user account used to execute JBoss is the owner of the folders and files.

## License installation



If you are installing a Subscription edition, you need to [request a license](/licenses.md).


When you receive your license, copy the file to the `/bonita/server/licenses` folder.



## Edition specification


If you are installing the Performance Subscription edition, 
you need to edit `engine-server/conf/platform-init/bonita-platform-init-community-custom.properties` 
and change the value of the `activeProfiles` key to `'community,performance'`. No change is needed for the Community, Teamwork, or Efficiency edition.




## Database configuration 




The JBoss bundle is configured to use an h2 database by default. h2 is suitable for a test platform, but for production, you are recommended to use one of the supported databases.


If you want to use another database you need to specify the [database configuration](/database-configuration.md). Make sure you do this before you start JBoss.




## Start and shut down JBoss




### JBoss start script




JBoss can be started by executing the following script:

* Windows `\bin\standalone.bat`
* Linux `/bin/standalone.sh`

### Custom start-up script




If you have a Subscription edition license covering fewer CPU cores than are available on your server, you must limit the number of CPUs available to JBoss.

To do so, create a custom startup script to start JBoss only with the number of cores allowed by your license (e.g. 2 for development license).

For example: 

* For Windows: `start /AFFINITY 3 standalone.bat` 3 is the affinity mask (expressed as a hexadecimal number).
* For Linux: `taskset -c 0,1 standalone.sh` 0,1 indicate CPU cores to use. 

### Shutdown




JBoss can be shut down by running the following script:

* Windows `<JBOSS_HOME>\bin\jboss-cli.bat --connect --command=:shutdown`
* Linux `<JBOSS_HOME>/bin/jboss-cli.sh --connect --command=:shutdown`

## First steps after installation


Once you have your JBoss bundle up and running, complete these [first steps](/first-steps-after-setup.md) to get a fully operational Bonita BPM platform.