# Bonita Studio preferences

This page provides information about Bonita Studio preferences and the Bonita Studio embedded Tomcat configuration.

## Bonita Studio preferences

To configure Bonita Studio preferences, click _**Preferences**_ in the Cool bar.

### General preferences

Database
* Database clean-up: by default, the database (used by Bonita Engine) preserves all data when Bonita Studio exits. You can override this in order to purge all data instead, which may be useful when you are testing processes.
* Organization load: by default, the default organization is loaded with Bonita Studio starts. You can override this. 

Appearance
* Coolbar size: Normal (default) or small.
* Grid options for process diagrams. You can choose to use a grid positioning for all new process diagrams
* Grid spacing (in centimeters). Default: 0.5
  
Language
* Bonita Studio language.  
* Web applications language: the language to use by default when loading process forms and Bonita Portal  

Java
* The JRE (Java Runtime Environment) to used by default. JRE will be used when compiling and running Java code  

### Deployment preferences

Run mode
* Validation: whether to validate the process before it runs. We recommend to keep this option enabled.  

Server settings
* Start engine server lazily: by default, the engine server is started when the Studio starts up. You may choose not to start the engine until it is actually needed, that is, when you first deploy a new process/organisation/BDM/... or when you launch the UI Designer for the first time.
* Port number: Studio embedded Tomcat HTTP listening port.
* Tomcat Maximum memory allocation (in Mb): the maximum memory allocation (Xmx) for the heap of the JVM running the Tomcat server. Default: 512
* Tomcat JVM additional arguments: additional java arguments to be passed to the Tomcat JVM at startup time. e.g.: -XX:+HeapDumpOnOutOfMemory

Database connectors  
* Manage the JDBC drivers associated with database connectors. You should use that to include JDBC drivers for commercial DBMS (e.g. DB2)  

### Web preferences

Browser
* Specify the web browser used when a web page is displayed. Note that some application might override this setting and use a different browser

Proxy
* HTTP Proxy settings for web access 

### Other preferences

Advanced
* Rename diagram the first time it is saved.
* Do not show confirmation on connector definition edition.
* SVN connector: the SVN connector used if you are using a remote SVN ["repository](workspaces-and-projects.md). Note: if you change this your local working copy might become unstable. To avoid this, commit any outstanding changes before you modify the connector setting, and reinitialize your local working copy after the update  

Eclipse
   Give access to all Eclipse settings (Bonita Studio is based on Eclipse)  

## Bonita Studio embedded Tomcat configuration

### Default configuration

* Embedded Tomcat listens on the following ports:
  * 8080: HTTP. This value can be modified using Bonita Studio preferences (see above).
  * 8006: shutdown.
  * 8009: AJP.
  * 9091: embedded h2 database server.
* Bonita Studio also uses the following port:
  * 6969: watchdog

### Changing the configuration

You might need to edit the Tomcat configuration files for example to:

* [Configure logging](logging.md)
* Change listening ports (shutdown, AJP, h2) to prevent conflicts
* Declare a datasource to connect to a business database

The Tomcat configuration files are located in the Bonita Studio `workspace/tomcat/conf` folder. 

* To change a port number, edit `server.xml`. 
* To add a data source, edit `context.xml` or `workspace/tomcat/conf/Catalina/localhost/bonita.xml`.

For more details, see the [Tomcat documentation](http://tomcat.apache.org/tomcat-8.5-doc/).
