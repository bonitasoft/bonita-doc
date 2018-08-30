# Bonita Studio preferences

This page provides information about Bonita Studio preferences and the Bonita Studio embedded Tomcat configuration.

## Bonita Studio preferences

To configure Bonita Studio preferences, click _**Preferences**_ in the Cool bar.

### General preferences

Database
   Database clean-up: by default, the database (used by Bonita Engine) is purged when Bonita Studio exits, which is useful when you are testing processes. You can override this in order to preserve all data.  
   Organization load: by default, the default organization is loaded with Bonita Studio starts. You can override this. 

Appearance
    Coolbar size: Normal (default) or small.   
    Grid options for process diagrams. You can choose to use a grid positioning for all new process diagrams
  
Language
   Bonita Studio language.  
   Web applications language: the language to use by default when loading process forms and Bonita Portal  

Java
   The JRE (Java Runtime Environment) to used by default. JRE will be used when compiling and running Java code  

### Deployment preferences

Run mode
   Validation: whether to validate the process before it runs. We recommend to keep this option enabled.  
   The default look & feel for application forms. Will be applied to any newly created process.

Server settings
   Port number: Studio embedded Tomcat HTTP listening port.  
   Log in: the username and password of the user who will be logged when Bonita Portal or an application is started from Bonita Studio. The password can be obscured.   
   The default look & feel for the Portal  

Database connectors  
   Manage the JDBC drivers associated with database connectors. You should use that to include JDBC drivers for commercial DBMS (e.g. DB2)  

### Web preferences

Browser
   Specify the web browser used when a web page is displayed. Note that some application might override this setting and use a different browser

Proxy
   HTTP Proxy settings for web access 

### Other preferences

Advanced
   SVN connector: the SVN connector used if you are using a remote SVN ["repository](workspaces-and-repositories.md). Note: if you change this your local working copy might become unstable. To avoid this, commit any outstanding changes before you modify the connector setting, and reinitialize your local working copy after the update  

6.x legacy
   Controls whether the 6.x legacy features are shown are hidden 

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
