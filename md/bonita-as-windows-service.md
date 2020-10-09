# How to install Bonita as a service on Windows

In this tutorial we show how to install Tomcat with Bonita configured as a windows service.

## Software needed

For this tutorial you will need the following softwares:
* Tomcat
* Bonita Tomcat Bundle
* Postgresql Database (or another database supported by Bonita)

Please verify the supported version in Installation/Basic Bonita Platform installation/hardware-and-software-requirements

## Download and installation

* **_Download_** apache-tomcat-x.y.exe from Tomcat website: https://tomcat.apache.org/

:::warning
download the same apache-tomcat version (visible in Installation/Basic Bonita Platform installation/hardware-and-software-requirements)
Choose the "32-bit/64-bit Windows Service Installer" installation.
:::

* **_Install_** apache-tomcat-x.y.exe. From now on we'll call the installation path as `%TOMCAT_INSTALL_FOLDER%`
* **_Verify_** that Tomcat is well installed browsing the following URL: http://localhost:8080

![Tomcat home page](images/bonita-as-windows-service/tomcatHome.png)

* **_Download_** the bundle BonitaSubscription-x.y.z.zip (or BonitaCommunity-x.y.z.zip for the community edition)
* **_Unzip_** the bundle in a folder that we'll call: %TOMCAT_BUNDLE%
* **_Move_** the setup tool `%TOMCAT_BUNDLE%`/setup into another folder, for example `%TOMCAT_INSTALL_FOLDER%/setup`

## Get the license (In case of Subscription edition)

* **_Execute_** `%TOMCAT_BUNDLE%/tools/request_key_utils/generateRequestKey.bat`
* **_Use_** the generated key to get a license from the customer portal. The license should not be a development license.
* **_Move_** the received license file into the folder `%TOMCAT_INSTALL_FOLDER%/setup/platform_conf/licenses`

## Database configuration

* **_Configure_** the file `%TOMCAT_INSTALL_FOLDER%/setup/database.properties` to point towards the suited database (engine and BDM)

![database-properties file](images/bonita-as-windows-service/databaseProperties.png)

* **_Add_** the database driver here: %TOMCAT_INSTALL_FOLDER%/setup/lib
Check your Database provider documentation in order to get the proper driver version. 
* **_Execute_** the command "%TOMCAT_INSTALL_FOLDER%/setup/setup.bat init" in order to initialize the Bonita database with the default configuration.
* **_Verify_** that the tables in the engine database are properly created.


![database tables](images/bonita-as-windows-service/postgresTables.png)

:::Note
This is an example with Postgres, any database works
:::

## Server configuration

* **_Move_** the folder **bonita** located under `%TOMCAT_BUNDLE%/server/lib/bonita` to `%TOMCAT_INSTALL_FOLDER%/lib`
* **_Add_** your database driver to `%TOMCAT_INSTALL_FOLDER%/lib`
* **_Move_** **All Files** in the folder `%TOMCAT_BUNDLE%/server/conf` to `%TOMCAT_INSTALL_FOLDER%/conf`
* **_Move_** File **bonita.war** under application `%TOMCAT_BUNDLE%/server/webapps` to `%TOMCAT_INSTALL_FOLDER%/webapps`
* **_Configure_** `%TOMCAT_INSTALL_FOLDER%/conf/Catalina/localhost/bonita.xml`

![datasource configuration](images/bonita-as-windows-service/bonitaXml.png)

## Configure JVM properties

* The file `%TOMCAT_BUNDLE%/server/bin/setenv.bat` contains all JVM parameters to use in the new installation.
* The properties should be the following ones:

  * -Dorg.bonitasoft.platform.setup.folder=%TOMCAT_INSTALL_FOLDER%\setup
  * -Dorg.bonitasoft.engine.incident.folder=C:\Program Files\Apache Software Foundation\Tomcat x.y\logs
  * -Dsysprop.bonita.db.vendor=postgres
  * -Dsysprop.bonita.bdm.db.vendor=postgres
  * -Dcom.arjuna.ats.arjuna.common.propertiesFile=C:\Program Files\Apache Software Foundation\Tomcat x.y\conf\jbossts-properties.xml
  * -Dfile.encoding=UTF-8

:::warning
Replace the `%TOMCAT_INSTALL_FOLDER%` by the exact path where you move the setup folder, for example `C:\Program Files\Apache Software Foundation\setup`
:::


where we replaced the `%CATALINA_HOME% with our new Tomcat directory`

In order to apply these configurations to the new installation, you have to use the program %TOMCAT_INSTALL_FOLDER%/bin/TomcatXw.exe (Where X is the Tomcat major version), and replicate them in the **Java Options** field.


:::info
Note:
This is not a command line. 
* One properties per line.
* Attention, no space at the end of the line.
* do not use environment variable. All path must be resolved.
* do not set the -Xms and -Xmx option: use the field "Initial memory pool" and "Maximul memory pool".
:::

Then for example
```properties
-Dorg.bonitasoft.platform.setup.folder=C:\Program Files\Apache Software Foundation\Tomcat 8.5\setup
-Dcatalina.home=C:\Program Files\Apache Software Foundation\Tomcat 8.5
-Dcatalina.base=C:\Program Files\Apache Software Foundation\Tomcat 8.5
-Djava.io.tmpdir=C:\Program Files\Apache Software Foundation\Tomcat 8.5\temp
-Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager
-Djava.util.logging.config.file=C:\Program Files\Apache Software Foundation\Tomcat 8.5\conf\logging.properties
-Dorg.bonitasoft.platform.setup.folder=C:\Program Files\Apache Software Foundation\Tomcat 8.5\setup
-Dorg.bonitasoft.h2.database.dir=C:\Program Files\Apache Software Foundation\Tomcat 8.5\h2_database
-Dorg.bonitasoft.engine.incident.folder=C:\Program Files\Apache Software Foundation\Tomcat 8.5\logs
-Dsysprop.bonita.db.vendor=postgres
-Dsysprop.bonita.bdm.db.vendor=h2
-Dcom.arjuna.ats.arjuna.common.propertiesFile=C:\Program Files\Apache Software Foundation\Tomcat 8.5\conf\jbossts-properties.xml
-Xshare:auto
-XX:+HeapDumpOnOutOfMemoryError
-Dfile.encoding=UTF-8
```
is correct


![tomcatw configuration](images/bonita-as-windows-service/tomcatw.png)

* Setup `%TOMCAT_INSTALL_FOLDER%/bin/Tomcat8w.exe -> Java` -> "Initial memory" with a proper value based on your hardware and project requirements.
* Do the same with "Maximum Memory pool" property.
As an example, if your Operating system has 8 GB of ram you could setup Initial Memory Pool = Maximum Memory Pool = 4096.

* Verify that in the Startup tab the "Mode" property is set to "Jvm".

![tomcatw startup tab](images/bonita-as-windows-service/tomcatWStartup.png)

## System restart and test

* Restart the Tomcat service to take in account the new updates.
* Verify that the Bonita portal is available at the following address:
http://localhost:8080/bonita

* Connect with the technical user (default install/install) and do some tests:
  * Add an organization.
  * Assign profiles to users.
  * Deploy a simple process and test its execution.

