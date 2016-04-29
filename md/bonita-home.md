# 2.3.7 Bonita home

var\_bonita\_home is a folder which contains configuration, working, and temporary folders and files. This folder is used by Bonita BPM Engine, Bonita BPM Portal and the Bonita Client Library (Engine APIs client library packaged in bonita-client.jar).

The location of the var\_bonita\_home folder depends on your installation.
It is defined by a JVM system property called `bonita.home`.

**[Downloading var\_bonita\_home](#download)**

**[Bonita home folder structure](#structure)**

**[Bonita home location](#location)**

> [Bonita Studio](#studio)

> [Bonita JBoss and Tomcat bundles](#bundles)

> [Deploy bundle](#deploy)

> [LDAP synchronizer](#ldap)

> [In your own client application](#client)

## Downloading var\_bonita\_home

There are two var\_bonita\_homes: one for the Community edition and one for the Subscription editions.
If you are using a Subscription edition, you can change from one edition to another by updating the value of the `activeProfiles` key in 
`engine-server/conf/platform-init/bonita-platform-init-community-custom.properties` before starting the platform.
The value is a comma-separated list with no spaces. 
You must have a suitable license installed for the specified subscription editions.

**Important:** Performance edition users must add 'performance' to the default value so that the value is 'community,performance'.

It is useful to store your var\_bonita\_home folder in a versioning or source code control system (such as Git), so that you have a record of the changes that you make.

## var\_bonita\_home folder structure

**Note**: the contents of the var\_bonita\_home folder depend on the Bonita BPM version and edition installed.

* `client`: files related to Bonita BPM Portal:
  * `platform`: files that impact Bonita BPM Portal, no matter which tenant is called. Also includes reference template files used for each new tenant.
All files in this folder are used only for Bonita BPM Portal and will have no impact on the Bonita client library.
    * `conf`: configuration files.
      * `cache-config.xml`: forms object model cache configuration.
      * `jaas-standard.cfg`: example of JAAS configuration for JaasLoginManager.
      * `loginManager-config.properties` (Portal only): specify and configure the implementation of the Login Manager component.
This component is used to verify the username and password provided by the user (see [User authentication overview](/user-authentication-overview.html) for more details).
      * `platform-tenant-config.properties`: used by Bonita BPM Portal to connect to the default tenant to retrieve its id. 
Then used to initialize the Portal tenant configuration based on a template (copy of `tenant-template` folder to tenants folder).
      * `security-config.properties`: configuration for [Cross-Site Request Forgery](/csrf-security.html) protection.
    * `tenant-template`: template configuration files used for tenant creation.
      * `conf`: configuration files:
        * `compound-permissions-mapping.properties`: association between Bonita BPM Portal pages and the list of permissions required to visualize them.
        * `console-config.properties`: settings such as maximum permitted file size for files uploaded using Bonita BPM forms, or the flag for custom page debug mode.
        * `custom-permissions-mapping.properties`: custom configuration of users or profiles and associated privileges.
        * `dynamic-permissions-checks.properties`: configuration of dynamic security checks for REST API calls.
        * `forms-config.properties`: URL used for redirection to Bonita BPM Portal, configuration for forms including the default template name, and enable/disable auto form generation.
        * `loginManager-config.properties`: same as Login Manager configuration at platform level but overloaded for the tenant.
        * `resources-permissions-mapping.properties`: association between REST operations and the permissions required to perform them.
        * `security-config.properties`: used for the autologin feature (not currently supported).
      * `work`: various files needed for the operation of Bonita BPM Portal.
        * `icons`: Portal images. 
        * `pages`: 
        * `theme`: Portal look and feel definition. Also includes the default look and feel for forms. 
    * `work`:
      * `i18n`: defines Portal translations (at Platform level, shared by all tenants).
  * `tenants`: includes tenant-specific files (configuration, work and temporary). 
The files in this folder are used only by Bonita BPM Portal and have no impact on Bonita client. There is a sub-folder in this folder for each tenant. Sub-folder content is based on the `tenant-template` content.
  
* `engine-client`: files related to Bonita Client Library.
  * `conf`: configuration of bonita-client library. This is where you can modify the client configuration.
    * `bonita-client-custom.properties`: define how the Bonita client accesses the Bonita BPM Engine APIs. Three options are available: Java, HTTP or EJB. The file includes extra settings for HTTP and EJB (e.g. server address).
  
* `server`:
  * `licenses`: contains license files. When you setup a server, you should put the license file here.
  
* `engine-server`: contains all Bonita Server related files.
  * `conf`: folder containing the files that you can modify. The properties and services in this folder override the default configuration. This folder cannot be deleted.
  * `work`: folder containing the default configuration files. Do not modify them. The folder also serves as a storage location for some services. This folder cannot be deleted.
  * `temp`: folder containing the temporary files that services need. Subfolders of this folder can safely be deleted when the server is not running.

## var\_bonita\_home location

### Bonita BPM Studio

Bonita BPM Studio includes two copies of the var\_bonita\_home folder:

1. `BonitaBPM[edition-name]-x.y.z/workspace/bonita`:  
Studio uses the Bonita client library to communicate with the Bonita BPM Engine (part of the Bonita BPM Platform embedded in Studio for testing).  
This home define the Bonita client configuration.
2. `BonitaBPM[edition-name]-x.y.z/workspace/[repository-name]/bonita_home`:  
This home is the configuration of the Bonita BPM Portal, client library and Engine of the Studio, that is, its embedded Bonita BPM Platform.

### Bonita BPM JBoss and Tomcat bundles

In Tomcat and JBoss bundles, var\_bonita\_home is located at the root folder of the bundle.

You might want to change location of var\_bonita\_home.

In this case, you will need to update the value of the JVM system properties, so the path points to the new location.

### Deploy bundle

The var\_bonita\_home folder provided in the deploy bundle can be used in various situations, such as:

* Installation "from scratch" of the Bonita BPM Platform
* LDAP synchronizer that use Bonita Client Library to communicate with Bonita BPM Engine ([see below](#ldap))
* Creation of an application that uses the Bonita Client Library ([see below](#client))

If, for example, you have an uncompressed version of the deploy bundle called "**BonitaBPMCommunity-7.0.0-deploy**", the var\_bonita\_home folder will be called "**bonita\_home-7.0.0**".

### LDAP synchronizer

The LDAP synchronizer is in fact a Bonita client application.

It relies on the Bonita client library and so requires a var\_bonita\_home folder.

If you need to configure LDAP synchronizer, refer to [LDAP synchronizer documentation](/ldap-synchronizer.html).

### In your own client application

Your application will need a var\_bonita\_home folder.

Because you are building a client application, you need only the `engine-client` folder, not the other folders.

The other folders are useful only to Bonita BPM Portal, so they are not needed.

In the `engine-client` folder, the `conf/bonita-client-custom.properties` file overrides the settings of the `work/bonita-client-community.properties` file.

This `engine-client/conf/bonita-client-custom.properties` properties file defines how the Bonita client library connects to the Bonita BPM Engine.