# 2.5 How to install Red Hat + Oracle JVM + WebLogic + Oracle

## Overview

This documentation page gives instructions to set up a Bonita BPM platform in a specific environment. This environment
includes the following sets of components:

* Operating System: Red Hat Enterprise Linux 6 Server (RHEL)
* Java Virtual Machine: Oracle JVM 7
* Database: Oracle Database 11gR2 (11.2.0.1)
* JEE Application Server: Oracle WebLogic server 12c (12.1.2)

## Operating System

No specific configuration is required for RHEL.

Note: you might need to configure a firewall if you want to allow remote connections to the server. You should
probably allow port 7001 for TCP protocol:

1. Go to **System / Administration / Firewall**.
2. Authenticate with the root user password.
3. In the left menu, select **Others Ports**.
4. Click the _**Add**_ button.
5. Check **User Defined**.
6. In **Port / Port Range**, type `7001`.
7. In **Protocol**, select **tcp**.
8. Click the _**OK**_ button.
9. Click the _**Apply**_ button.
10. Close the window.

## Java Virtual Machine

The instructions below explain how to set up the Oracle Java 7 JDK using the Red Hat official package.

### Prerequisite

First, you need to add **RHEL EUS Server Supplementary** to your system
[subscriptions](https://access.redhat.com/site/documentation/en-US/Red_Hat_Subscription_Management/1/html/Subscription_Concepts_and_Workflows/index.html).
In fact Oracle Java is provided only in this subscription.



To install Oracle Java JDK:

1. Go to System / Administration / Add/Remove Software.
2. In the search field, type `java-1.7.0-oracle-devel`.
3. Click the _**Find**_ button.
4. In the package list, select the latest version of **Oracle Java Development Kit**.
5. Click the _**Apply**_ button.
6. Type your root user password and click the _**Authenticate**_ button.
7. You can now close the "Add/Remove Software" window.

### Check the Java setup

To check that Java is correctly set up:

1. Go to **Applications / System Tools / Terminal**. 
2. In the terminal window, type `java -version`. You should get something like:
`java version "1.7.0_15"
Java(TM) SE Runtime Environment (build 1.7.0_15-b03)
Java HotSpot(TM) 64-Bit
Server VM (build 23.7-b01, mixed mode)`


## Database

### DBMS installation

Follow the standard Oracle Database installation.


### Create a database user

1. Execute the following command to create the user:
`
CREATE USER bonita_db_user IDENTIFIED BY bonita_db_password
GRANT connect, resource TO bonita_db_user IDENTIFIED BY bonita_db_password
`


2. Now you will need to perform some specific configuration required by Bonita BPM.
(Usage of transaction (XADataSource) requires extra privileges for the Oracle user used by Bonita BPM). 

3. Grant the appropriate privileges to your user with the following operations:
`
GRANT select ON sys.dba_pending_transactions TO bonita_db_user
GRANT select ON sys.pending_trans$ TO bonita_db_user
GRANT select ON sys.dba_2pc_pending TO bonita_db_user
GRANT execute ON sys.dbms_system TO    bonita_db_user
`


## JEE Application Server

### Setup

1. 
To set up WebLogic, you need to know the location of the **Java home folder**. If you set up the Red Hat package of
Oracle JDK 7 64 bits, the Java home folder will be:
`/usr/lib/jvm/java-1.7.0-oracle-1.7.0.15.x86_64`.

2. You just need to follow a standard installation of WebLogic. The Bonita BPM platform doesn't have any specific
needs.
3. Once the installation of WebLogic is completed, you will need to create a new domain. Make sure you remember the user name
and password, as you will need both later on in the installation guidelines.
4. At this point you should be able to start WebLogic server and log in to the web administration console. The default address
would be:
`http://localhost:7001/console`
.


## Data source declaration

Here we will configure data sources that are available at a global scope (all applications deployed). For all Bonita BPM Platform systems, you need two data sources, bonitaDS and bonitaSequenceManagerDS. 
If you are using [business data](/business-data-model-856), you need two additional data sources, BusinessDataDS and NotManagedBizDataDS.



### bonitaDS and BusinessDataDS


Follow this procedure to configure the bonitaDS datasource, and (optionally) again to configure the BusinessDataDS data source.

1. Connect to **WebLogic administration console**.
2. In the tree menu on the left, go to **Services / Data Sources**.
3. Click New and select **Generic Data Sources**.
4. Set
  * The data source name: bonitaDS (or BusinessDataDS)
  * JDNI name: bonitaDS (or BusinessDataDS)
  * Database type: Oracle

5. Click _**Next**_.
6. Select **Oracle Driver (Thin XA) for Instance connections; Versions: Any**.
7. Click _**Next**_.
8. Click _**Next**_ again.
9. Set the connection:
  * Database name, e.g.: bonita\_db
  * Hostname, e.g.: localhost
  * Port, e.g.: 1521
  * Database user name, e.g.: bonita\_db\_user
  * Database password, e.g.: bonita\_db\_password

10. Click _**Next**_.
11. Click _**Test Configuration**_ to confirm that configuration is correct.
12. Click _**Next**_.
13. Select **AdminServer** to associate your datasource with the default server.
14. Click **_Finish_**.


### bonitaSequenceManagerDS and NotManagedBizDataDS


Follow this procedure to configure the bonitaSequenceManagerDS datasource, and (optionally) again to configure the NotManagedBizDataDS data source.


1. Connect to **WebLogic administration console**.
2. In the tree menu on the left, go to **Services / Data Sources**.
3. Click New and select **Generic Data Sources**.
4. Set
  * The data source name: bonitaSequenceManagerDS (or NotManagedBizDataDS)
  * JDNI name: bonitaSequenceManagerDS (or NotManagedBizDataDS)
  * Database type: Oracle

5. Click _**Next**_.
6. Select **Oracle Driver (Thin) for Instance connections; Versions: Any**. This data source does not need to be XA.
7. Click **_Next_**.
8. Uncheck _**Supports Global Transactions**_.
9. Click **_Next_**. 

10. Set the connection:
  * Database name, e.g.: bonita\_db
  * Hostname, e.g.: localhost
  * Port, e.g.: 1521
  * Database user name, e.g.: bonita\_db\_user
  * Database password, e.g.: bonita\_db\_password

11. Click _**Next**_.
12. Click _**Test Configuration**_ to confirm that configuration is correct.
13. Click _**Next**_. 
14. Select **AdminServer** to associate your datasource with the default server.
15. Click **_Finish_**.


## Bonita BPM platform

1. Download the deploy.zip file from the [Bonitasoft site](http://www.bonitasoft.com/downloads-v2) for the Community edition 
or from the [Customer Portal](https://customer.bonitasoft.com/download/request) for Subscription editions.
2. Unzip the deploy bundle. The path to the unzipped deploy bundle will be referred to as ``
3. Create a new folder to store Bonita "home" folder. For the Community or Subscription edition, copy bonita "home" folder from deploy bundle folder
(`/bonita_home-x.y.z`) (where `x.y.z` is the version number) to the newly created folder. 
The full path including `bonita_home-x.y.z`
will be referred as ``.

4. Edit `/engine-server/conf/platform/bonita-platform-community-custom.properties` and update the following properties:
  * database.journal.datasource.name=bonitaDS
  * database.sequence.manager.datasource.name=bonitaSequenceManagerDS
  * hibernate.transaction.jta\_platform = org.hibernate.service.jta.platform.internal.WeblogicJtaPlatform
  * db.vendor=oracle
  * transaction.manager=java:comp/UserTransaction
  * userTransaction=java:comp/UserTransaction


5. Edit `/engine-server/conf/tenants/template/bonita-tenant-sp-custom.properties` and update the following property:
  * database.journal.datasource.name=bonitaDS


6. Edit `/engine-server/conf/tenants/tenant-template/bonita-tenant-community-custom.properties` and update the following properties:
  * bdm.db.vendor=oracle
  * bdm.datasource.jndi.path=BusinessDataDS
  * bdm.notmanageddatasource.jndi.path=NotManagedBizDataDS
  * bdm.hibernate.transaction.jta\_platform=org.hibernate.service.jta.platform.internal.WeblogicJtaPlatform

For each new tenant created, the structure will be as shown above.



7. Configure JVM system properties:
  * Edit `/user_projects/domains//bin/startWebLogic.sh` and set: `
JAVA_OPTIONS="${SAVE_JAVA_OPTIONS} -Dbonita.home="
`


8. Add the license file to your ``folder
9. Add SLF4J libraries (API and JDK back-end located in `/Tomcat-6.0.37/lib`) to bonita.war file to `WEB_INF/lib/`
(located in: `/Tomcat-6.0.37/webapps`).


**Note:**To add a file to a WAR you can use a tool such as 7-zip or
command line: `jar uf bonita.war WEB-INF/lib/slf4j-api-1.6.1.jar`.
10. Check that the weblogic.xml descriptor is present in `bonita.war/WEB-INF` folder of the war.
11. Deploy Bonita war file, as follows:
  * Connect to WebLogic administration console.
  * In the tree menu on the left, go to **Deployments**.
  * Click the _**Install**_ button.
  * Browse to the folder of your Deploy Bundle and deploy the bonita.war file provided for Tomcat.
  * Click _**Next**_.
  * Select _**Install this deployment as an application**_.
  * Click _**Next**_.
  * Keep the default settings.
  * Click _**Next**_.
  * Click _**Finish**_.

## Check the installation

1. To verify that the installation was successful and the database is correctly configured, connect to Bonita BPM Portal.
2. In the URL field of your web browser, enter the host address, for example `http://localhost:7001/bonita">http://localhost:7001/bonita`.

**Note:** If the Bonita BPM Portal login page is not displayed, [empty your browser cache](http://www.wikihow.com/Clear-Your-Browser's-Cache) and then reload the page. 


At this stage no organization information is loaded: only the technical user account exists.


## Log in as the Technical user 

Log in as the **Technical user** in order to create a new user with an Administrator profile.

Note: the Technical user has limited rights in Bonita BPM Portal and exists just to initialize the organization.

The default values for login and password are:

* Login = install
* Password = install

The login and password are read from the 
`/engine-server/conf/tenants//bonita-tenant-community-custom.properties
`file.

These settings are also located in client side configuration file `client/platform/conf/platform-tenant-config.properties`.


## Modify the Technical user login and password

To modify the default Technical user/password, update the following files with the same values:

* `engine-server/conf/tenants//bonita-tenant-community-custom.properties`
* `client/platform/conf/platform-tenant-config.properties`

## Create an Administrator user

Note: do not create a user or an administrator with the same login as the technical users (platform and tenant) 

To create a user with the "administrator" profile:

1. Log in to Bonita BPM Portal as the technical user.
2. Create a new user.
3. Go to **Configuration** /**Profiles**.
4. Select the **Administrator** profile. 
5. Click on the **_More_** button (in the top right corner).
6. Under **Users mapping**, click on **_Add a user_**.
7. Select your user and click on the **_Add_** button. Log out as the Technical user and log back in as the newly created user with administrative rights.
8. Create [users with the standard profile](/manage-user.md).
9. You can add newly created users to the **User** (standard) profile or to a custom profile.

#### Information

If you already have a system that stores information about end users, you can use it to create user accounts in Bonita BPM. 

If you use an LDAP or Active Directory system, you can use the [LDAP synchronizer](/ldap-synchronizer.md) to keep the Bonita BPM organization synchronized with it.