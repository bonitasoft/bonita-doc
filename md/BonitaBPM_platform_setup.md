
# Platform configuration

In this section you will learn what the Platform setup tool is and how to use it to configure the Bonita Platform, manage your licenses (for Subscription users), and more...

:::info
**Note:** First thing to know is that for all basic installation and start scenarios, you don't need to use the setup tool. 
We made it easy for you by creating `start-bonita.bat`(for Windows) or `start-bonita.sh` (for Unix), a script that initializes, configures and starts the bundle, using the Platform setup tool.
:::

<a id="platform_setup_tool" />

## Platform setup tool overview and use

The *Platform setup tool* handles:
  - The creation of the database tables
  - The configuration of the Tomcat or WildFly bundle with this database without the need for a fully manual configuration
  - The management of Bonita Platform configuration (stored in the database)
  - The management of licenses (also stored in the database)

It is located in both [Tomcat](tomcat-bundle.md) and [WildFly](wildfly-bundle.md) bundles. You can find the tool in the `setup` folder.

### Structure

It is composed of the following items:
* `platform_conf/`
    * `initial/`: contains the default configuration of Bonita Platform, that can be customized and will be pushed when the database is created.
    * `current/`: contains configuration files after a `pull` from the database is made.
    * `licenses/`: (Subscriptions only) folder to put the license file to allow Bonita Platform to start without error.
    * `sql/`: SQL scripts used to create Bonita database tables
    * `backup-{TIMESTAMP}/`: folder automatically created with every `push`; copy of the configuration and license in database at `{TIMESTAMP}`.  
* `database.properties`: used as a simplified entry form to get property values to connect to the database. Those values will be used by the file internal.properties.
* `internal.properties`: used internally by the setup tool to properly configure and initialize the bundle. It is made of both data entered in database.properties as well as other data like database driver class name, connection URL, etc. This file should not be modified manually in most cases, unless for specific use-cases like adding parameters in the connection URL or using a specific database driver.
* `setup.sh`: Unix / Mac script to run.
* `setup.bat`: Windows script to run.


### Functions

The script `setup` comes with 4 commands:

<a id="init_platform_conf" />

* `init`, to initialize the database

  It creates the database tables and pushes the initial configuration in the database.  
  This initial configuration is taken from the `platform_conf/initial` folder.  
  It is run by the global script `start_bonita`, but you can also insert it in your own scripts.
  
  Eg. `setup.sh init`  
  Eg. `setup.sh init -Ddb.vendor=postgres` (see [Advanced use](#advanced_use) for information on using `-D` properties)

  ::: info
  When `db.vendor` and `bdm.db.vendor` properties are both set to `h2` - which is the default configuration - the `init` command asks you to confirm this choice before continuing. The following message is displayed:
  ```
  [WARN] Default H2 configuration detected. This is not recommended for production. If this is not the required configuration, change file 'database.properties' and run again.
  Are you sure you want to continue? (y/n):
  ```

  If you want to bypass this confirmation prompt you can add the `h2.noconfirm` property to `setup` or `start-bonita` scripts.

  Eg. `setup.sh init -Dh2.noconfirm`
  Eg. `start-bonita.sh -Dh2.noconfirm`
  :::

<a id="run_bundle_configure" />

* `configure`, to configure the server of a Bonita Tomcat / WildFly bundle to use the appropriate database:
  If run from inside a Bonita bundle, it configures the Application Server environment, so you don't need to configure all Tomcat / WildFly basic configuration files manually.
  It is run by the global script `start-bonita`, but you can also insert it in your own scripts.
  
  Eg. `setup.sh configure`

::: info
You do not need to configure Tomcat / WildFly files directly anymore. The command `setup configure` does it for you.
If you decide to do it anyway, the tool will overwrite your custom values (after storing a restore backup into folder `tomcat-backups` or `wildfly-backups`).
If you need to finely tune the configuration, modify the following template files, as they serve as a basis for configuration:

For Tomcat:
* tomcat-templates/bonita.xml
* tomcat-templates/setenv.sh
* tomcat-templates/setenv.bat

For WildFly:
* wildfly-templates/standalone.xml
:::

<a id="update_platform_conf" />

* `pull`, to retrieve the current configuration 

  It gets the current configuration of Bonita Platform from the database and saves it locally in the `platform_conf/current` folder.
  Eg. `setup.sh pull`

::: warning
  **Warning:** You must pull the configuration from the database every time you need to update your license file or edit the configuration of Bonita BPM Platform. Since some information is inserted by the platform itself in the database, this prevents database inconsistency.
:::

* `push`, to update the configuration of Bonita Platform, and update your license

  It downloads the platform configuration and licenses from the database into the `platform_conf/backup-{TIMESTAMP}` folder.  
  It gets the platform configuration you have edited locally in the folder `platform_conf/current` folder and pushes it to the database.  
  To make the platform take your changes into account, you must (re-)start Bonita Platform.
  
  Eg. `setup.sh push`

::: warning
Note that the *Platform Setup tool* does not need Bonita Server to be running for the configuration to be updated. However, the server needs to be restarted for the changes to be taken into account.
:::

Type `setup help` or `setup help <command>` to get detailed help on the tool syntax or on a specific command.  
Eg. `setup.sh help configure`

::: info
Keep in mind that the folder **`platform_conf/initial`** is not used anymore once the platform has been initialized for the first time. To update your configuration, only the **`platform_conf/current`** folder is taken into account.
:::

<a id="configure_tool" />

## Pre-requisites

Before running it, make sure the setup tool is configured to point to the database of the Bonita Platform.

::: info
**Note:** If you have already run `start-bonita` script inside a [Tomcat bundle](tomcat-bundle.md#configuration) or a [WildFly bundle](wildfly-bundle.md#configuration), those steps are already done.
:::

Here is how to do so:
   1. Create the database
   2. Customize it so it works with Bonita
   3. Modify the `database.properties` file: Set the right db vendor and change connection url, user credentials, database name and so on.
   4. If you are using an Oracle database, add the related [JDBC driver](database-configuration.md#proprietary_jdbc_drivers) in the `lib` folder. 


<a id="advanced_use" />

## Advanced use of the *Platform setup tool*

### Database configuration using system properties

Instead of modifying the `database.properties` file, you can set the required database values through the command line (with Java-like system properties).
If these latter are defined, they have prevalence on the values defined in the `database.properties` file.

e.g. for Unix command line:
```shell
./setup.sh configure -Ddb.vendor=postgres -Ddb.server.name=localhost -Ddb.server.port=5432 -Ddb.database.name=bonita \
-Ddb.user=bonita -Ddb.password=bpm -Dbdm.db.vendor=postgres -Dbdm.db.server.name=localhost -Dbdm.db.server.port=5432 \
-Dbdm.db.database.name=business_data -Dbdm.db.user=bonita -Dbdm.db.password=bpm
```

e.g. for Windows command line:
```shell
setup.bat configure "-Ddb.vendor=postgres" "-Ddb.server.name=localhost" "-Ddb.server.port=5432" "-Ddb.database.name=bonita" "-Ddb.user=bonita" "-Ddb.password=bpm"
```

::: warning
For Windows users: Due to Windows Batch limitations, only 8 parameters are supported.
If you need to pass more than 8 parameters, modify file `database.properties` instead.
:::


### Advanced database configuration using file internal.properties

The file `internal.properties` is used internally by the Platform setup tool to properly configure and initialize the bundle.
It is made of both data entered in file `database.properties` as well as other data like database driver class name, connection URL, etc.  
This file **should not** be modified manually in most cases, unless for specific use-cases like adding parameters in the connection URL or using a specific database driver.

This file contains the Database configuration information that are not inside file `database.properties` (database driver class name, connection URL, etc).
Those information are used internally by the Platform setup tool to configure properly the bundle (See [configure command](#run_bundle_configure)) and the database initialization procedure (See [init command](#init_platform_conf)).  
The Platform setup tool uses the values provided in file `database.properties` as replacement strings to the properties defined in file `internal.properties`. Those new processed values are then used by the tool.

_Usage_:  
You are allowed to modify these values if, in the example of Oracle RAC, you need to add parameters in the **connection URL**, or for mysql you need to add characterEncoding or other parameters: 

```properties
   oracle.url=jdbc:oracle:thin:@(description=(address_list=(address=(protocol=tcp)(port=${db.server.port})(host=${db.server.name})))(connect_data=(INSTANCE_NAME=${db.database.name}))(source_route=yes))

   oracle.bdm.url=jdbc:oracle:thin:@(description=(address_list=(address=(protocol=tcp)(port=${bdm.db.server.port})(host=${bdm.db.server.name})))(connect_data=(INSTANCE_NAME=${bdm.db.database.name}))(source_route=yes))

   oracle.bdm.url=jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=myrac1.us.oracle.com)(PORT=1521))(ADDRESS=(PROTOCOL=TCP)(HOST=myrac2.us.oracle.com)(PORT=1521))(LOAD_BALANCE=ON)(FAILOVER=OFF)(CONNECT_DATA=(SERVICE_NAME=myrc.us.oracle.com)(FAILOVER_MODE=(TYPE=SELECT)(METHOD=BASIC))))

   mysql.url=jdbc:mysql://${db.server.name}:${db.server.port}/${db.database.name}?dontTrackOpenResources=true&useUnicode=true&characterEncoding=UTF-8&profileSQL=true
```

Or also if you need to use a specific **database Driver** java class name:
```properties
   sqlserver.nonXaDriver=net.sourceforge.jtds.jdbc.Driver
```

**But in most cases, you don't need to modify this file.**



## Troubleshooting

---

**Issue**: When I run Platform setup tool, I get the exception `Cannot determine database vendor (valid values are h2, postgres, sqlserver, oracle, mysql).`

**Potential cause**: property `db.vendor` is not found when reading file `database.properties`

**Solution**: Edit file `database.properties` and ensure there is a valid `db.vendor` value. Also ensure the line is not commented (no `#` at the beginning of the line)

---

<a id="backslash_support" />

**Issue**: My database name / password / ... contains a backslash (`\`) character. It seems to be ignored in file `database.properties`

**Cause**: Backslash (`\`) characters are special characters in a .properties file

**Solution**: Replace your backslash (`\`) characters by double-backslashes (`\\`) everywhere in file `database.properties` (and also in file `internal.properties` if you have modified it)

---
