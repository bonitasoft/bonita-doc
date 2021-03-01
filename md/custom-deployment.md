# Custom Deployment

:::warning
This installation procedure only specifically targets the Java EE application Servers that have been installed under a single root folder (typically, from a .zip file).
Thus, for installations using native distribution packages (that more often than not split the binaries and the configuration files into separate folder hierarchies),
it would be up to you to adapt the documented steps to your very own folder layout.
:::

:::warning
Remember that the recommended way of installing Bonita is to use the provided [Tomcat](tomcat-bundle.md) bundle.  
It saves you from doing all the following configuration at hand, as the setup tool included handles it automatically.
:::

## Installation

1. Download the Tomcat bundle file from the [Bonitasoft download page](http://www.bonitasoft.com/downloads-v2) for the Community edition 
   or from the [Customer Portal](https://customer.bonitasoft.com/download/request) for Subscription editions.
2. Unzip it into a temporary folder (BUNDLE_DIRECTORY).
3. Follow the [Tomcat bundle steps](#tomcat-installation).

<a id="tomcat-installation" />

## Tomcat installation

### Install Bonita Platform in Tomcat

Copy, from the bundle into your Tomcat server:

- `server/bin/setenv.sh` or `server/bin/setenv.bat`, depending if you are on Unix or Windows, to `bin`
- The entirety of the bundle `server/conf` folder to `conf`
- The entirety of the bundle `server/lib/bonita` folder to `lib/bonita`
- The `server/webapps/bonita.war` and `webapps/ROOT/favicon.ico` to `webapps` and `webapps/ROOT/`
- The entirety of the `setup` directory at the root of your tomcat server.
- The entirety of the `tools/request_key_utils-`. Includes script files to generate license request keys.

:::warning
Some of the libraries copied from the bundle `server/lib/bonita` may already exist (albeit in a different version) in your Tomcat server `lib` folder. e.g.:

- bundle (Tomcat 8.5.40): `server/lib/bonita/tomcat-dbcp-9.0.16.jar`
- Tomcat server (Tomcat 8.0.36): `lib/tomcat-dbcp-8.0.36.jar` and `lib/tomcat-dbcp.jar`

For such libraries, you should only keep the ones copied from the bundle under `lib/bonita`, or else the Bonita server may encounter `NoSuchMethodError`-type of issues.
:::
:::warning
Some configuration files from the bundle will overwrite some default tomcat configuration files. Proceed
with care in a tomcat where other applications are already installed.
:::
:::warning
There is an [issue on tomcat 8.0.32](https://bz.apache.org/bugzilla/show_bug.cgi?id=58999) preventing the portal Look & feel to be compiled. If you deploy bonita on an existing tomcat installation, make sure it is a different version of tomcat (preferably 8.5.x with x>=23).
:::

### Configure data sources

1. Open the file BUNDLE_HOME/conf/Catalina/localhost/bonita.xml
2. Remove or comment out the lines regarding the h2 database.
3. Uncomment the lines matching your RDBMS.
4. Update following attributes value:
   - username: your RDBMS user name.
   - password: your RDBMS password.
   - url: the URL, including the RDBMS server address, RDBMS server port and database (schema) name.
5. There are 4 datasources declared. Make sure you made the change for them all, named RawBonitaDS, bonitaSequenceManagerDS, RawBusinessDataDS, NotManagedBizDataDS.

### Configure RDBMS vendor

1. Open the file BUNDLE_HOME/bin/setenv.(bat|sh)
2. Change the value of sysprop.bonita.db.vendor according to your RDBMS vendor
3. Change the value of sysprop.bonita.bdm.db.vendor according to your RDBMS vendor

### Add Jdbc driver

You need to add your jdbc driver in BUNDLE_HOME/lib. 
MySQL, PostgreSQL, Oracle and Microsoft SQL Server drivers can be found in the Tomcat bundle under DEPLOY_ZIP_HOME/setup/lib directory.

## License installation

If you are installing a Subscription edition, you need to [request a license](licenses.md). 

When you receive your license, copy the file to the `TOMCAT_DIRECTORY/setup/platform_conf/licenses` folder of your application server.

## Database initialization

We assume here that the database has already been [created and configured for Bonita](database-configuration.md#database_creation).
Once created and configured you need to initialize it using the setup tool provided in the bundle.
This will create database schema and initial values.

1. In TOMCAT_DIRECTORY/setup folder, edit the file database.properties with properties matching your rdbms. Beware of [backslash characters](BonitaBPM_platform_setup.md#backslash_support).
2. In TOMCAT_DIRECTORY/setup folder, run `setup.(sh|bat) init`

## Next steps

You're done with Bonita installation. You can now start your application server as usual.
When you have finished installing the deploy bundle, [complete the setup](first-steps-after-setup.md) of your system by validating the installation, setting passwords, and creating the Administrator user.
