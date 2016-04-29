# 4.11 Building Bonita BPM from source files

This page explains how to build Bonita BPM Community Edition from the source files.


You can download the sources of the Bonita BPM components from the [Bonitasoft source repository](https://github.com/bonitasoft). 
The source files are stored on GitHub. You are recommended to take a tagged version, so that you have a coherent set of sources. 




Bonita BPM Engine and Web components are compiled using [Maven](http://maven.apache.org/index.html). Each source directory contains a configuration file, `pom.xml`. 
If you make any changes to the source file structure, to add, remove, or replace a source, update the POM file accordingly. 
Bonita BPM Studio components are built using [Tycho](http://eclipse.org/tycho/), which is an overlay of Maven.



To build the product, you need the following:


* Access to the internet
* Git
* JDK 1.7
* Apache Maven 3.0.3
* NodeJS
* An available maven repository with `javax.jms:jms:jar 1.1`
* Bitrock Install Builder 9.5.3 (optional: required only for building Bonita BPM Studio installers)


The following table shows how to build all the product components. Some components rely on components that are built earlier in the sequence, so the build order must be respected. This is table shows the components for 7.0.0\. 
For later versions, replace "7.0.0" with the relevant version number. Some components, notably connectors have independent versioning so it is normal that some version numbers are different.
  
Note: this is not a script. However, you could create a script suitable for your build environment using these commands.


`
echo "# Building project bonita-jboss-h2-mbean / tag 1.1.0"
git clone --branch 1.1.0 --single-branch git@github.com:bonitasoft/bonita-jboss-h2-mbean.git bonita-jboss-h2-mbean
mvn clean install -DskipTests=true -f bonita-jboss-h2-mbean/pom.xml

echo "# Building project bonita-tomcat-h2-listener / tag bonita-tomcat-h2-listener-1.0.1"
git clone --branch bonita-tomcat-h2-listener-1.0.1 --single-branch git@github.com:bonitasoft/bonita-tomcat-h2-listener.git bonita-tomcat-h2-listener
mvn clean install -DskipTests=true -f bonita-tomcat-h2-listener/pom.xml

echo "# Building project bonita-tomcat-valve / tag 7.0.55"
git clone --branch 7.0.55 --single-branch git@github.com:bonitasoft/bonita-tomcat-valve.git bonita-tomcat-valve
mvn clean install -DskipTests=true -f bonita-tomcat-valve/pom.xml

echo "# Building project bonita-engine / tag 7.0.0"
git clone --branch 7.0.0 --single-branch git@github.com:bonitasoft/bonita-engine.git bonita-engine
mvn clean install -DskipTests=true -Pjavadoc,package-all -f bonita-engine/pom.xml

echo "# Building project bonita-userfilters / tag 7.0.0"
git clone --branch 7.0.0 --single-branch git@github.com:bonitasoft/bonita-userfilters.git bonita-userfilters
mvn clean install -DskipTests=true -f bonita-userfilters/pom.xml

echo "# Building project bonita-connectors / tag bonita-connectors-1.0.0"
git clone --branch bonita-connectors-1.0.0 --single-branch git@github.com:bonitasoft/bonita-connectors.git bonita-connectors
mvn clean install -DskipTests=true -f bonita-connectors/pom.xml

echo "# Building project bonita-connector-alfresco / tag 1.1.4"
git clone --branch 1.1.4 --single-branch git@github.com:bonitasoft/bonita-connector-alfresco.git bonita-connector-alfresco
mvn clean install -DskipTests=true -f bonita-connector-alfresco/pom.xml

echo "# Building project bonita-connector-cmis / tag 2.0.1"
git clone --branch 2.0.1 --single-branch git@github.com:bonitasoft/bonita-connector-cmis.git bonita-connector-cmis
mvn clean install -DskipTests=true -f bonita-connector-cmis/pom.xml

echo "# Building project bonita-connector-database / tag bonita-connector-database-datasource-1.0.12"
git clone --branch bonita-connector-database-datasource-1.0.12 --single-branch git@github.com:bonitasoft/bonita-connector-database.git bonita-connector-database
mvn clean install -DskipTests=true -f bonita-connector-database/pom.xml

echo "# Building project bonita-connector-email / tag bonita-connector-email-impl-1.0.14"
git clone --branch bonita-connector-email-impl-1.0.14 --single-branch git@github.com:bonitasoft/bonita-connector-email.git bonita-connector-email
mvn clean install -DskipTests=true -f bonita-connector-email/pom.xml

echo "# Building project bonita-connector-googlecalendar / tag bonita-connector-googlecalendar-2.0.0"
git clone --branch bonita-connector-googlecalendar-2.0.0 --single-branch git@github.com:bonitasoft/bonita-connector-googlecalendar.git bonita-connector-googlecalendar
mvn clean install -DskipTests=true -f bonita-connector-googlecalendar/pom.xml

echo "# Building project bonita-connector-googlecalendar-V3 / tag bonita-connector-google-calendar-v3-1.0.0"
git clone --branch bonita-connector-google-calendar-v3-1.0.0 --single-branch git@github.com:bonitasoft/bonita-connector-googlecalendar-V3.git bonita-connector-googlecalendar-V3
mvn clean install -DskipTests=true -f bonita-connector-googlecalendar-V3/pom.xml

echo "# Building project bonita-connector-jasper / tag bonita-connector-jasper-1.0.0"
git clone --branch bonita-connector-jasper-1.0.0 --single-branch git@github.com:bonitasoft/bonita-connector-jasper.git bonita-connector-jasper
mvn clean install -DskipTests=true -f bonita-connector-jasper/pom.xml

echo "# Building project bonita-connector-ldap / tag bonita-connector-ldap-1.0.0"
git clone --branch bonita-connector-ldap-1.0.0 --single-branch git@github.com:bonitasoft/bonita-connector-ldap.git bonita-connector-ldap
mvn clean install -DskipTests=true -f bonita-connector-ldap/pom.xml

echo "# Building project bonita-connector-salesforce / tag update_querysobjects_output_name_1.0.14"
git clone --branch update_querysobjects_output_name_1.0.14 --single-branch git@github.com:bonitasoft/bonita-connector-salesforce.git bonita-connector-salesforce
mvn clean install -DskipTests=true -f bonita-connector-salesforce/pom.xml

echo "# Building project bonita-connector-sap / tag jco2-callfunction-update-1.0.3"
git clone --branch jco2-callfunction-update-1.0.3 --single-branch git@github.com:bonitasoft/bonita-connector-sap.git bonita-connector-sap
mvn clean install -DskipTests=true -f bonita-connector-sap/pom.xml

echo "# Building project bonita-connector-scripting / tag bonita-connector-scripting-1.0.2"
git clone --branch bonita-connector-scripting-1.0.2 --single-branch git@github.com:bonitasoft/bonita-connector-scripting.git bonita-connector-scripting
mvn clean install -DskipTests=true -f bonita-connector-scripting/pom.xml

echo "# Building project bonita-connector-sugarcrm / tag delete-several-1.0.3"
git clone --branch delete-several-1.0.3 --single-branch git@github.com:bonitasoft/bonita-connector-sugarcrm.git bonita-connector-sugarcrm
mvn clean install -DskipTests=true -f bonita-connector-sugarcrm/pom.xml

echo "# Building project bonita-connector-talend / tag update-joblauncher-impl-1.0.3"
git clone --branch update-joblauncher-impl-1.0.3 --single-branch git@github.com:bonitasoft/bonita-connector-talend.git bonita-connector-talend
mvn clean install -DskipTests=true -f bonita-connector-talend/pom.xml

echo "# Building project bonita-connector-twitter / tag 1.1.0-pomfixed"
git clone --branch 1.1.0-pomfixed --single-branch git@github.com:bonitasoft/bonita-connector-twitter.git bonita-connector-twitter
mvn clean install -DskipTests=true -f bonita-connector-twitter/pom.xml

echo "# Building project bonita-connector-webservice / tag 1.0.12"
git clone --branch 1.0.12 --single-branch git@github.com:bonitasoft/bonita-connector-webservice.git bonita-connector-webservice
mvn clean install -DskipTests=true -f bonita-connector-webservice/pom.xml

echo "# Building project bonita-simulation / tag bos-simulation-6.1.0"
git clone --branch bos-simulation-6.1.0 --single-branch git@github.com:bonitasoft/bonita-simulation.git bonita-simulation
mvn clean install -DskipTests=true -f bonita-simulation/pom.xml

echo "# Building project bonita-theme-builder / tag 6.1.0"
git clone --branch 6.1.0 --single-branch git@github.com:bonitasoft/bonita-theme-builder.git bonita-theme-builder
mvn clean install -DskipTests=true -f bonita-theme-builder/pom.xml

echo "# Building project bonita-studio-watchdog / tag studio-watchdog-6.0.1"
git clone --branch studio-watchdog-6.0.1 --single-branch git@github.com:bonitasoft/bonita-studio-watchdog.git bonita-studio-watchdog
mvn clean install -DskipTests=true -f bonita-studio-watchdog/pom.xml

echo "# Building project bonita-gwt-tools / tag gwt-tools-2.5.0-20130521"
git clone --branch gwt-tools-2.5.0-20130521 --single-branch git@github.com:bonitasoft/bonita-gwt-tools.git bonita-gwt-tools
mvn clean install -DskipTests=true -f bonita-gwt-tools/pom.xml

echo "# Building project bonita-web / tag 7.0.0"
git clone --branch 7.0.0 --single-branch git@github.com:bonitasoft/bonita-web.git bonita-web
mvn clean install -DskipTests=true -f bonita-web/pom.xml

echo "# Building project bonita-portal-js / tag 7.0.0"
git clone --branch 7.0.0 --single-branch git@github.com:bonitasoft/bonita-portal-js.git bonita-portal-js
mvn clean install -DskipTests=true -f bonita-portal-js/pom.xml

echo "# Building project bonita-ui-designer / tag 1.0.0"
git clone --branch 1.0.0 --single-branch git@github.com:bonitasoft/bonita-ui-designer.git bonita-ui-designer
mvn clean install -DskipTests=true -f bonita-ui-designer/pom.xml

echo "# Building project bonita-distrib / tag 7.0.0"
git clone --branch 7.0.0 --single-branch git@github.com:bonitasoft/bonita-distrib.git bonita-distrib
mvn clean install -DskipTests=true -f bonita-distrib/pom.xml

echo "# Building project image-overlay-plugin / tag image-overlay-plugin-1.0.1"
git clone --branch image-overlay-plugin-1.0.1 --single-branch git@github.com:bonitasoft/image-overlay-plugin.git image-overlay-plugin
mvn clean install -DskipTests=true -f image-overlay-plugin/pom.xml

echo "# Building project bonita-studio / tag bos-studio-7.0.0-201506160900"
git clone --branch bos-studio-7.0.0-201506160900 --single-branch git@github.com:bonitasoft/bonita-studio.git bonita-studio
mvn clean install -DskipTests=true -f bonita-studio/platform/pom.xml -Pmirrored -Dp2MirrorUrl=http://update-site.bonitasoft.com/p2/7.0/
mvn clean install -DskipTests=true -f bonita-studio/patched-plugins/pom.xml
mvn clean install -DskipTests=true -f bonita-studio/tests-dependencies/pom.xml
mvn clean tycho-eclipserun:eclipse-run -Dtycho.mode=maven -DskipTests=true -Dp2MirrorUrl=http://update-site.bonitasoft.com/p2/7.0/ -Pgenerate -f bonita-studio/bundles/plugins/org.bonitasoft.studio-models/pom.xml
mvn clean install -DskipTests=true -f bonita-studio/bundles/pom.xml
mvn clean install -DskipTests=true -f bonita-studio/translations/pom.xml
mvn clean install -DskipTests=true -f bonita-studio/all-in-one/pom.xml -Dp2MirrorUrl=http://update-site.bonitasoft.com/p2/7.0/

echo "# Building project bonita-migration / tag 1.23.1"
git clone --branch 1.23.1 --single-branch git@github.com:bonitasoft/bonita-migration.git bonita-migration
mvn clean install -f bonita-migration/pom.xml -N
mvn clean install -DskipTests=true -f bonita-migration/bonita-migration-distrib/pom.xml

`