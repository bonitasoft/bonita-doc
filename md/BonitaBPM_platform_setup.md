
# Bonita BPM Platform configuration


In this section you will learn what the the Platform setup tool and how to initialize and configure the Bonita BPM Platform.


<a id="platform_setup_tool" />

## What is the Platform setup tool

The *Platform setup tool* handles the creation of the database schema and the configuration of Bonita BPM Platform.  
You can find it in the [deploy bundle](deploy-bundle.md) and in both [Tomcat](tomcat-bundle.md) and [JBoss](jboss-bundle.md) bundles.


## Functions

This tool has 3 functions:

* Initialize the database:`init`
Creates the database schema and pushes the initial configuration in database.   
This initial configuration is taken from the `platform_conf/initial` folder.

* Retrieve current configuration: `pull`
Gets the current configuration of Bonita BPM Platform and saves it in the `platform_conf/current` folder.  

* Update current configuration: `push`
Pushes the configuration from the `platform_conf/current` folder into the database of an already initialized Bonita BPM Platform

## Structure

It is composed of the following structure:
* `platform_conf/`
    * `initial/`: contains the default configuration of the Bonita BPM Platform, it can be customized and will be pushed when the database is created.
    * `current/`: will contains configuration files after a `pull` is made.
    * `licenses/`: (Subscriptions only) ==> folder where you must drop your license file to allow Bonita BPM Platform to start without error.
    * `sql/`: SQL scripts that are used to create the Bonita BPM database tables.
* `setup.sh`: Unix / Mac script to run.
* `setup.bat`: Windows script to run.
* `database.properties`: contains properties to connect to the database on which configuration is managed.


## Configure the Platform setup tool

Before running it, the tool must be configured to point to the database of the Bonita BPM Platform.

To do so modify the `database.properties` file. Set the right db vendor by commenting and uncommenting properties inside this file and change connection url, user credentials, database name and so on.

You will need to add in the `lib` folder the JDBC driver corresponding to your database if it is Oracle or Microsoft SQL Server.

::: warning
This database will affect only the platform setup tool, not the Tomcat or JBoss bundle. You still need to configure it. Please refer to the [Tomcat](tomcat-bundle.md) and [JBoss](jboss-bundle.md) bundles pages.
:::



<a id="init_platform_conf" />

## Initialize Bonita BPM Platform

You can initialize Bonita BPM Platform manually on an empty database using this tool.

::: info
Remember that this is done automatically in the [Tomcat](Tomcat-bundle.md) and [JBoss](jboss-bundle.md) bundles
:::

To do so, proceed as follows:

1. Create a new empty database.
2. Update the `database.properties` of the *Platform setup tool* to point to this newly created database.  
The database configuration here is only for the platform setup tool and not for Bonita BPM Platform.  
Therefore, you will also need to configure the Bonita BPM Platform database connection of your bundle: see [Tomcat](tomcat-bundle.md) or [JBoss](jboss-bundle.md) bundles.  
3. If you are using an Oracle or Microsoft SQL Server database, copy the JDBC driver in the `lib` directory of the tool.
4. Run `setup.sh init` or `setup.bat init` from the tool.

This last step will connect to the database pointed in `database.properties`, create the tables required for the platform to run, push all configuration from the `platform_conf/initial` folder and push the licenses from the licenses folder.

That's it! You can now run Bonita BPM Platform on this database.


<a id="update_platform_conf" />

## Update configuration or licenses of Bonita BPM Platform

If you want to modify the configuration of an already initialized Bonita BPM Platform, you must proceed as follows:

1. Stop Bonita BPM Platform.
2. If not already done, update the `database.properties` of the **Platform setup tool** to point to the database used by Bonita BPM Platform.
3. Run `setup.sh pull` or `setup.bat pull` from the tool. It will get the current configuration and put it in the `platform_conf/current` folder.
4. Modify the configuration files inside the `platform_conf/current` folder according to your needs.
5. If you are updating your license file, put it inside `platform_conf/licenses`, along with the existing ones. If some retrieved license files are not valid anymore, you can remove them, so that they will be deleted from the database.
6. Run `setup.sh push` or `setup.bat push` from the tool.
7. Start Bonita BPM Platform.


::: info
Note that the Platform Setup Tool does not need the Bonita BPM Server to be running for the configuration to be updated. However, the server needs to be restarted for the changes to take effect.
:::


::: warning
Keep in mind that the folder **`platform_conf/initial`** is not used anymore once the platform has been initialized for the first time. To update your configuration, only the **`platform_conf/current`** folder is taken into account.
:::



