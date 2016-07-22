# Ubuntu + OpenJDK + Tomcat + PostgreSQL

This page explains how to set up a Bonita BPM Platform in a specific environment. This environment
includes the following set of components:

## Operating System

Simply follow a standard Ubuntu installation procedure. You won't need any specific settings here.

Note: make sure you got a text editor installed such as `nano`. In order to install it: `sudo apt-get install nano`

Note: we use `aptitude` command line tool to install packages such as OpenJDK or PostgreSQL. You can also use different tool such
as `apt-get` or a graphical package manager such as `synaptic`.

## Java Virtual Machine

To install the OpenJDK JVM you need to install the `openjdk-7-jre-headless` package:

* Run the following command line: `sudo aptitude install openjdk-7-jre-headless`
* If needed, type your Ubuntu user password
* Type _**Enter**_ to confirm that you want to continue installation

To check that Java is correctly setup in a console/terminal, type: `java -version`.
You should get a similar message to the one below:  
```
java version "1.7.0_65"
OpenJDK Runtime Environment (IcedTea 2.5.3) (7u71-2.5.3-1ubuntu0.14.04.1)
OpenJDK 64-Bit Server VM (build 24.65-b04, mixed mode)`
```

## Database

### Install

To install the PostgreSQL 9.3 you need to install the `postgres-9.3` package:

* Run the following command line: `sudo aptitude install postgresql-9.3`
* If needed, type your Ubuntu user password
* Type _**Enter**_ to confirm that you want to continue installation

### Create databases and user

You now need to create: a new PostgreSQL user and two new databases for Bonita BPM, and grant the user the appropriate privileges to access
the databases. In a terminal or console, type following commands:

* Switch to a shell for `postgres` user account: `sudo -u postgres -i`
* To create a new database user named `bonita_db_user` type: `createuser -P bonita_db_user`
* Enter (twice) the password for the newly created database user. E.g.: `bonita_db_password`
* Create a new database (for Bonita BPM Engine) named `bonita_db` and give ownership to `bonita_db_user`: `createdb -O bonita_db_user bonita_db`
* Create another database (for BDM) named `bonita_bdm` and give ownership to `bonita_db_user`: `createdb -O bonita_db_user bonita_bdm`
* Exit `postgres` session, type command: `exit`

You can now verify that user and database are correctly created. In a terminal or console type following commands:

* Start PostgreSQL client program by typing: `psql -d bonita_db -h 127.0.0.1 -U bonita_db_user`
* Type the PostgreSQL user password. E.g.: bonita\_db\_password
* You can run test query that should return `1`: `SELECT 1;`
* Now you can quit PostgreSQL client, type: `\q`

### Enable prepared transactions

Prepared transactions is disabled by default in PostgreSQL. You need to enable it:

* Edit the `postgresql.conf` configuration file: `sudo nano /etc/postgresql/9.3/main/postgresql.conf`
* Look for the line with `max_prepared_transactions` (line 117)
* Uncomment the line: remove `#` character
* Change the value from `zero` to `100`
* Save modification and quit text editor
* Restart PostgreSQL server: `sudo service postgresql restart`

## Application Server

### Install Tomcat 7

To install the Apache Tomcat 7 you need to install the `tomcat7` package:

* Run the following command line: `sudo aptitude install tomcat7`
* If needed, type your Ubuntu user password
* Type **Enter ** to confirm that you want to continue installation

### Add JDBC driver

You need to include JDBC driver in Tomcat classpath:

* Change to Tomcat libraries directory: `cd /usr/share/tomcat7/lib`
* Install `wget` tool in order to be able to download JDBC driver: `sudo aptitude install wget`
* Download the JDBC driver: `sudo wget http://jdbc.postgresql.org/download/postgresql-9.3-1102.jdbc4.jar`

## Bonita BPM Platform

### Download and unzip the Bonita BPM deploy bundle

Download the Bonita BPM deploy bundle from the [Customer Portal](https://customer.bonitasoft.com/)
(Subscription editions) or get the [Community edtion](http://www.bonitasoft.com/downloads-v2). Instructions
below will be given for Bonita Subscription Pack. You can easily adapt files and folder names to your edition.

* Go to Bonitasoft [Customer Portal](https://customer.bonitasoft.com/)
* In **Download** menu, click on _**Request a download**_
* Select your version and click on _**Access download page**_ button
* On the download page, go to the **Deploying Server Components** section
* Click on _**Download BonitaBPMSubscription-x.y.z-deploy.zip**_ link. If your server only has a terminal available
you can copy the link and use `wget` to download the file or use SSH with `scp` command to copy
the file from another computer.
* Make sure that the `BonitaBPMSubscription-x.y.z-deploy.zip` is located in your home folder (e.g. `/home/osuser`).
If you type `cd ~ && ls` you should see the file listed.
* Make sure the `unzip` command is installed: `sudo aptitude install unzip`
* Unzip the deploy bundle: `unzip -q BonitaBPMSubscription-x.y.z-deploy.zip`

Finally, make sure that the user that runs the Tomcat server, is the owner of all Bonita "home" files:

* Create a folder for Bonita specific configuration and runtime info: `sudo mkdir /opt/bonita`
* Change folders and files ownership: `sudo chown -R tomcat7:tomcat7 /opt/bonita`

### JVM system variables

To define JVM system properties, you need to use a new file named `setenv.sh`:

* Copy the file from deploy bundle to Tomcat `bin` folder: `sudo cp ~/BonitaBPMSubscription-6.4.0-deploy/Tomcat-7.0.55/bin/setenv.sh /usr/share/tomcat7/bin/`
* Make the file executable: `sudo chmod +x /usr/share/tomcat7/bin/setenv.sh`
* Edit `setenv.sh` file: `sudo nano /usr/share/tomcat7/bin/setenv.sh`
* Change `sysprop.bonita.db.vendor` from `h2` to `postgres`
* Change `btm.root` from `${CATALINA_HOME}` to `/opt/bonita/btm`
* Change `bitronix.tm.configuration` from `${CATALINA_HOME}/conf/bitronix-config.properties` to `/opt/bonita/btm/conf/bitronix-config.properties`
* Change `org.bonitasoft.platform.setup.folder` from `${CATALINA_HOME}/setup` to `/opt/bonita/setup`

### Add extra libraries to Tomcat

Bonita needs extra libraries such as Bitronix, in order to run on Tomcat:

* Change to the Deploy bundle Tomcat lib folder: `cd ~/BonitaBPMSubscription-6.4.0-deploy/Tomcat-7.0.55/lib`
* Copy the libraries (.jar files) from the Deploy bundle to your Tomcat folder: `sudo cp bonita-tomcat-valve-7.0.55.jar btm-2.1.3.jar btm-tomcat55-lifecycle-2.1.3.jar jta-1.1.jar slf4j-api-1.6.1.jar slf4j-jdk14-1.6.1.jar /usr/share/tomcat7/lib/`

### Configure Bonita to use PostgreSQL

You need to configure the data source for Bonita BPM Engine.

Warning: make sure you stop Tomcat before performing following operations: `sudo service tomcat7 stop`

* Create new folders in order to store Bitronix files: `sudo mkdir -p /opt/bonita/btm/conf && sudo mkdir /opt/bonita/btm/work`
* Set the ownership of the Bitronix folder: `sudo chown -R tomcat7:tomcat7 /opt/bonita/btm`
* Copy the Bitronix configuration files to `/opt/bonita/btm/conf` folder: `sudo cp ~/BonitaBPMSubscription-6.4.0-deploy/Tomcat-7.0.55/conf/bitronix-* /opt/bonita/btm/conf/`
* Edit `bitronix-resources.properties` file, comment (using `#`) h2 section, uncomment PostgreSQL example
and update the username, password and DB name ("bonita" in the URL property) to match your configuration (e.g.
`bonita_db_user`, `bonita_db_password` and `bonita_db`): `sudo nano /opt/bonita/btm/conf/bitronix-resources.properties`
* Also in `bitronix-resources.properties` update the section for `resource.ds2` (BDM data source) and set the value for the BDM data base (e.g. `bonita_db_user`, `bonita_db_password` and `bonita_bdm`)
* Save and quit: `CTRL+X, Y, ENTER`
* Copy the `bonita.xml` file (Bonita web app context configuration): `sudo cp ~/BonitaBPMSubscription-6.4.0-deploy/Tomcat-7.0.55/conf/Catalina/localhost/bonita.xml /etc/tomcat7/Catalina/localhost/`
* Edit the `bonita.xml` file by commenting the h2 datasource configuration (using ),
uncomment PostgreSQL example and update username, password and DB name (bonita in the URL property) to match your
configuration (e.g. `bonita_db_user`, `bonita_db_password` and `bonita_db`): `sudo nano /etc/tomcat7/Catalina/localhost/bonita.xml`
* Also in `bonita.xml` file update data base configuration for BDM to match your configuration (e.g. `bonita_db_user`, `bonita_db_password` and `bonita_bdm`)
* Save and quit: `CTRL+X, Y, ENTER`
* Copy and overwrite `logging.properties` file: `sudo cp ~/BonitaBPMSubscription-6.4.0-deploy/Tomcat-7.0.55/conf/logging.properties /etc/tomcat7/logging.properties`
* Copy and overwrite `context.xml` file: `sudo cp ~/BonitaBPMSubscription-6.4.0-deploy/Tomcat-7.0.55/conf/context.xml /etc/tomcat7/context.xml`
* Copy and overwrite `server.xml` file: `sudo cp ~/BonitaBPMSubscription-6.4.0-deploy/Tomcat-7.0.55/conf/server.xml /etc/tomcat7/server.xml`
* Edit `server.xml` (`sudo nano /etc/tomcat7/server.xml`) and comment out h2 listener line
* Fix ownership on the copied files: `sudo chown -R root:tomcat7 /etc/tomcat7`
* Copy the folder `platform_setup`: `sudo cp -R ~/BonitaBPMSubscription-7.3.0-deploy/platform_setup /opt/bonita/` and rename it: `sudo mv /opt/bonita/platform_setup /opt/bonita/setup`
* Fix ownership on the copied files: `sudo chown -R tomcat7:tomcat7 /opt/bonita/setup`

### Fix service tomcat7 issue
* Edit the tomcat7 script: `sudo nano /etc/init.d/tomcat7` and the following lines before TOMCAT_SH variable definition (line 154):
```
if [ -r "$CATALINA_BASE/bin/setenv.sh" ]; then
  . "$CATALINA_BASE/bin/setenv.sh"
elif [ -r "$CATALINA_HOME/bin/setenv.sh" ]; then
  . "$CATALINA_HOME/bin/setenv.sh"
fi
```
* Edit the tomcat7 script: `sudo nano /etc/init.d/tomcat7` and modify the variable TOMCAT_SH to add the CATALINA_OPTS transfer. The code should looks like that:
```
# Define the command to run Tomcat's catalina.sh as a daemon
# set -a tells sh to export assigned variables to spawned shells.
TOMCAT_SH="set -a; JAVA_HOME=\"$JAVA_HOME\"; source \"$DEFAULT\"; \
        CATALINA_HOME=\"$CATALINA_HOME\"; \
        CATALINA_BASE=\"$CATALINA_BASE\"; \
        JAVA_OPTS=\"$JAVA_OPTS\"; \
        CATALINA_OPTS=\"$CATALINA_OPTS\"; \
        CATALINA_PID=\"$CATALINA_PID\"; \
        CATALINA_TMPDIR=\"$CATALINA_TMPDIR\"; \
        LANG=\"$LANG\"; JSSE_HOME=\"$JSSE_HOME\"; \
        cd \"$CATALINA_BASE\"; \
        \"$CATALINA_SH\" $@"
```

### License

If you run the Subscription Pack version, you will need a license:

* Generate the key in order to get a license:
  * Change the current directory to license generation scripts folder: `cd ~/BonitaBPMSubscription-6.4.0-deploy/request_key_utils-6.4-006`
  * Make the license generation script executable: `chmod u+x generateRequestForAnyEnvironment.sh`
  * Run the script, type the number of CPU cores to use: `./generateRequestForAnyEnvironment.sh`
  * You will get a license key number that you can copy. Make sure that you keep the brackets. If the key is separated by a linebreak, remove it and put the key on a single line.
* Connect to Bonitasoft [Customer Portal](https://customer.bonitasoft.com/)
* Go to Licenses \> **Request a license**
* Fill in the license request forms
* You should receive the license file by email
* Copy the license file to the Bonita "home" folder: `sudo cp BonitaBPMSubscription-6.1-Your_Name-ServerName-YYYYMMDD-YYYYMMDD.lic /opt/bonita/bonita_home-6.4.0/server/licenses/`
* Change folders and files ownership: `sudo chown -R tomcat7:tomcat7 /opt/bonita`

### Deployment

Deploy the Bonita web application:

Copy `bonita.war` to Tomcat `webapps` folder: `sudo cp ~/BonitaBPMSubscription-6.4.0-deploy/Tomcat-7.0.55/webapps/bonita.war /var/lib/tomcat7/webapps/`

Take care to set the proper owner: `sudo chown tomcat7:tomcat7 /var/lib/tomcat7/webapps/bonita.war`

Start Tomcat: `sudo service tomcat7 start`

### First connection

You can access the Bonita BPM Portal using your web browser, just type the following URL `http://<your_server_hostname>:8080/bonita` (your\_server\_hostname can be either an IP address or a name).  
You can log in using the tenant administrator login: `install` and password: `install`.  
The first step is to create at least one user and add it to "administrator" and "user" profiles.
