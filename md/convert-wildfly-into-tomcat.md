# Convert a Bonita WildFly installation into a Bonita Tomcat installation

Learn how to convert a Bonita installation based on WildFly to a one based on Tomcat

## Overview

Bonita 7.10 does not provide nor support WildFly anymore. As a consequence, it is necessary when updating
Bonita to version 7.10 or superior to convert the installation so that it works the same way under tomcat.

## Conversion steps to Bonita Tomcat bundle
* unzip the last Bonita Tomcat bundle 7.10+
* configure `setup/database.properties` to point to the same database server as WildFly did (it should be the exact same `database.properties` file)
* run `setup/setup.sh pull` to retrieve the current configuration from database
* update your license file by putting the new one into `setup/platform_conf/licenses` (and by removing any old license file)
* run `setup/setup.sh push` to update the new license file (and optional changed configuration) to the database
* start your new Bonita Tomcat bundle with `./start-bonita.sh`

## Specific configuration
If you are using specific configuration that you set up in file `wildfly/server/standalone/configuration/standalone.xml`,
report your equivalent configuration into Tomcat.  
For instance, if you use Bonita datasource connector, and you configured it to access to a datasource defined in WildFly
`standalone.xml` file, report your datasource configuration in Tomcat file `server/conf/Catalina/localhost/bonita.xml`.  
Be aware that the JNDI name of the datasource does not have the same prefix: `java:jboss/datasources/` from WildFly,
for `java:comp/env/` Tomcat.
