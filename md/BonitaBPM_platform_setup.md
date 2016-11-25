
# Platform configuration

In this section you will learn what the Platform setup tool is and how to use it to configure the Bonita BPM Platform, manage your licenses (for Subscription users), and more...

:::info
**Note:** First thing to know is that for all basic installation and start scenarios, you don't need to use the setup tool. 
We made it easy for you by creating `start-bonita.bat`(for Windows) or `start-bonita.sh` (for Unix), a script that initializes, configures and starts the bundle, using the Platform setup tool.
:::

<a id="platform_setup_tool" />

## Platform setup tool overview and use

The *Platform setup tool* handles:
  - The creation of the database tables
  - The configuration of the Tomcat or WildFly bundle with this database without the need for a fully manual configuration
  - The management of Bonita BPM Platform configuration (stored in the database) 
  - The management of licenses (also stored in the database)

It is located in both [Tomcat](tomcat-bundle.md) and [WildFly](wildfly-bundle.md) bundles, and also in the [deploy bundle](deploy-bundle.md). In Tomcat and WildFly bundles, you can find the tool in the `setup` folder.

### Structure

It is composed of the following items:
* `platform_conf/`
    * `initial/`: contains the default configuration of Bonita BPM Platform, that can be customized and will be pushed when the database is created.
    * `current/`: contains configuration files after a `pull` from the database is made.
    * `licenses/`: (Subscriptions only) folder to put the license file to allow Bonita BPM Platform to start without error.
    * `sql/`: SQL scripts used to create Bonita BPM database tables
* `database.properties`: contains properties to connect to the database on which the configuration is managed.
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

<a id="run_bundle_configure" />

* `configure`, to configure the server of a Bonita BPM Tomcat / WildFly bundle to use the appropriate database: 
  If run from inside a Bonita BPM bundle, it configures the Application Server environment, so you don't need to configure all Tomcat / WildFly basic configuration files manually.  
  It is run by the global script `start-bonita`, but you can also insert it in your own scripts.
  
  Eg. `setup.sh configure`

::: info
You do not need to configure Tomcat / WildFly files directly anymore. The command `setup configure` does it for you.
If you decide to do it anyway, the tool will overwrite your custom values (after storing a restore backup into folder `tomcat-backups` or `wildfly-backups`).
If you need to finely tune the configuration, modify the following template files, as they serve as a basis for configuration:

For Tomcat:
* tomcat-templates/bitronix-resources.properties
* tomcat-templates/bonita.xml
* tomcat-templates/setenv.sh
* tomcat-templates/setenv.bat

For WildFly:
* wildfly-templates/standalone.xml
:::

<a id="update_platform_conf" />

* `pull`, to retrieve the current configuration 

  It gets the current configuration of Bonita BPM Platform from the database and saves it locally in the `platform_conf/current` folder.  
  **Note:** You must pull the configuration from the database every time you need to update your license file or edit the configuration of Bonita BPM Platform. Since some information is inserted by the platform itself in the database, this prevents database inconsistency.
  
  Eg. `setup.sh pull`

* `push`, to update the configuration of Bonita BPM Platform, and update your license

  It gets the platform configuration you have edited locally in the folder `platform_conf/current` folder and pushes it to the database.  
  To make the platform take your changes into account, you must (re-)start Bonita BPM Platform.
  
  Eg. `setup.sh push`

::: warning
Note that the *Platform Setup tool* does not need Bonita BPM Server to be running for the configuration to be updated. However, the server needs to be restarted for the changes to be taken into account.
:::

Type `setup help` or `setup help <command>` to get detailed help on the tool syntax or on a specific command.  
Eg. `setup.sh help configure`

::: info
Keep in mind that the folder **`platform_conf/initial`** is not used anymore once the platform has been initialized for the first time. To update your configuration, only the **`platform_conf/current`** folder is taken into account.
:::

<a id="configure_tool" />

## Pre-requisites

Before running it, make sure the setup tool is configured to point to the database of the Bonita BPM Platform.  

::: info
**Note:** If you have already run `start-bonita` script inside a [Tomcat bundle](tomcat-bundle.md#configuration) or a [WildFly bundle](wildfly-bundle.md#configuration), those steps are already done.
:::

Here is how to do so:
   1. Create the database
   2. Customize it so it works with Bonita BPM
   3. Modify the `database.properties` file: Set the right db vendor and change connection url, user credentials, database name and so on.
   4. If you are using an Oracle or Microsoft SQL Server database, add the related JDBC driver in the `lib` folder. 


<a id="advanced_use" />

## Advanced use of the *Platform setup tool*

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
If you need to pass more than 8 parameters, use file `database.properties` instead.
:::


## Troubleshooting

---

**Issue**: When I run Platform setup tool, I get the exception `Cannot determine database vendor (valid values are h2, postgres, sqlserver, oracle, mysql).`

**Potential cause**: property `db.vendor` is not found when reading file `database.properties`

**Solution**: Edit file `database.properties` and ensure there is a valid `db.vendor` value. Also ensure the line is not commented (no `#` at the beginning of the line)

---
