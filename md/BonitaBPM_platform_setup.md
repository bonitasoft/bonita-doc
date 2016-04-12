

Platform installation and default configuration - Sequence flow
---
![alt text](images/BonitaBPM_platform_first_initialization.png "BonitaBPM Platform First Initialization")

Scenario 2 - On premise: how to install a Bonita BPM Tomcat Bundle (subscription)
---
* download and extract the zip file
* drop your Subscription license file into [TOMCAT_BUNDLE_DIR]/platform-setup/licenses/
* edit file [TOMCAT_BUNDLE_DIR]/conf/ **server.xml** and remove the following line to deactivate embedded H2 database:

```
<Listener className="org.bonitasoft.tomcat.H2Listener" tcpPort="9091" baseDir="${org.bonitasoft.h2.database.dir}" start="true" />
```

* edit file [TOMCAT_BUNDLE_DIR]/conf/ **bitronix-resources.properties**
    * comment the default embedded H2 database configuration
    * uncomment the configuration for your database vendor (PostgreSQL, Oracle, SQL Server, or MySQL)
    * change the default values for your database configuration to point to an existing database instance and valid credentials
    * Warning: this must be done for 2 different datasources in the file: **resource.ds1.*** and **resource.ds2.***
* drop your database vendor-specific drivers in [TOMCAT_BUNDLE_DIR]/lib/bonita
* edit file [TOMCAT_BUNDLE_DIR]/conf/Catalina/localhost/ **bonita.xml**
    * comment the default embedded H2 database configuration
    * uncomment the configuration for your database vendor (PostgreSQL, Oracle, SQL Server, or MySQL)
    * change the default values for your database configuration to point to an existing database instance and valid credentials
    * Warning: this must be done for 2 different datasources in the file: **bonitaSequenceManagerDS** and **NotManagedBizDataDS**
* edit file sentenv.sh (Unix system) or setenv.bat (Windows system)
    * change property **DB_OPTS** and change default **h2** value for the one corresponding to your database vendor (Bonita BPM internal database)
    * change property **BDM_DB_OPTS** and change default **h2** value for the one corresponding to your database vendor (Bonita BPM database specific for Business Data feature)



Platform configuration update - Sequence flow
---
![alt text](images/BonitaBPM_platform_update.png "BonitaBPM Platform configuration update")













