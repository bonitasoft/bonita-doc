# Migrate a live environment to upgrade the version

Service stopped: Migrate the data, install a new environment, test non-migrated elements behavior and compatibility with new bonita version

## Overview

This page explains how to migrate your platform to a newer version of Bonita.

You can migrate your platform using the `Bonita Migration Tool`. There are 2 versions of the migration tool:
* The version 1.x that migrate the platform from version 6.0.2 or later to any version up to 7.0.0
* the version 2.x that migrate the platform from version 7.0.0 or later to any version up to the last one.


For example, if you are migrating from 6.5.3 to 7.1.0, you must migrate from 6.5.3 to 7.0.0 using version 1.x of the *Bonita Migration Tool*, and then migrate from 7.0.0 to 7.1.0 using version 2.x.

::: warning
:fa-exclamation-triangle: **Caution:**
You should always migrate to the latest version of a major version. Usually, maintenance version might contain bug fixes made after the release of subsequent major or minor release.

For example, the 6.5.4 release contains fixes to certain bugs that were found in early 7.x.y versions, up to 7.1.0.
When you are ready to migrate from 6.5.4 to a 7.x.y version, make sure you migrate to at least 7.1.1 to be sure that these fixes are present in your new version after migration. 
To migrate from 6.5.4 to 7.1.1 or later there are two phases: first you upgrade to 7.0.0 then to the latest version. 
You are recommended not to start 7.0.0 after you migrate to it, but to proceed immediately with the second phase of the migration.
:::

**JRE requirements:**
* Versions 7.0 to 7.4 only support JRE version 7. If you comes from older versions of Bonita supporting JRE 6, you must also upgrade your JRE to version 7.
* Version 7.5 only supports JRE version 8. If migrating to version 7.5, please upgrade your JRE to version 8.
* For more info, see Support Guide and Supported Environment Matrix for Server.

<a id="rdbms_requirements" />

::: warning
**RDBMS requirements:**
The version targeted may not support the version of the database that is being migrated. You may then need to upgrade the version of your database prior to running the migration tool.
* Please check the [database requirements](hardware-and-software-requirements.md).
* If you need to upgrade your database:
   * Please make sure to apply all the [RDBMS customisations required by Bonita](database-configuration.md#specific_database_configuration) when setting up the new version.
   * Please make sure to use the [appropriate JDBC driver](database-configuration.md#proprietary_jdbc_drivers)
   * Warning: **Oracle database** requires to use the official driver for each specific version. Make sure your driver's checksum matches the Oracle official one for your [database version](database-configuration.md#proprietary_jdbc_drivers) 
:::

**Community/Subscription edition:**
The tool migrates your platform (_bonita_home_ folder and the database). You cannot [change edition](upgrade-from-community-to-a-subscription-edition.md) while migrating.
* If you are running a Bonita Subscription Pack edition, you need a valid license for your target version.
* If you are upgrading to a new maintenance version and not changing the minor version number (for example, you are migrating from x.y.0 to x.y.1), your current license remains valid after migration.

::: info
Starting from version 7.3 there is no more _bonita home_ folder. This means that, if your installation does not have any custom change, then you do not need to configure the bundle any further for an installation migrated in 7.3 or above.

On the other hand, if you have customized your configuration, you will have to use the [platform setup tool](BonitaBPM_platform_setup.md#update_platform_conf) to send your customized configuration files to the database where configuration is stored, for versions 7.3 and above.
:::

![Migration steps](images/images-6_0/migration_bigsteps.png)


## How it works

The *Bonita Migration Tool* contains a set of script that execute changes on the data to make it compatible with earlier version of Bonita Platform.
This tool is provided as a zip archive and contains an executable script that will determine your current configuration and ask you in which version you want to migrate.

The migration is step-wise by maintenance version and the script manages the sequence of steps from your current version to the target version.
After each minor or maintenance version upgrade, you have the option to pause or continue to the next step.

The migration script migrates the following:

* Engine server
* Engine database, including all data on active and archived process instances
* Organization definition
* Runtime data in Bonita Home, *until 7.3*
* Configuration files in Bonita Home, which are replaced with the default configuration files for the new version
* Log files from the previous version are not impacted by migration

The following are not migrated automatically:

* Configuration of the platform: Before 7.3 in the _Bonita Home_ folder and after 7.3 in database. Reapply your customizations manually after the migration script has finished (using [platform setup tool](BonitaBPM_platform_setup.md#update_platform_conf) if migrated to 7.3.0+).
* Deployed process definitions: The processes will continue to run using the definition created in the previous version of Bonita.
* Process definition sources (`.bos` files): Migrate these by importing them into the new version of Bonita Studio.
* <a id="bdm_redeploy" />Business data model, and the business data database: if the migration path include version `7.0.0`,`7.2.0` or `7.2.4`, the Business data model must be redeployed after migration, using [Define and deploy the BDM](define-and-deploy-the-bdm)). Otherwise, no action is required.
* Custom connectors, actor filers, data types: These might continue to work in the new version, but should be tested, depending on your custom code.
* Custom pages: These might continue to work in the new version, but should be tested depending on your custom code.
* Custom reports: These might continue to work in the new version, but should be tested depending on your custom code.
* REST API Extensions: These might continue to work in the new version, but should be tested depending on your custom code.

When the script has finished,
you need to complete the migration by unzipping and configuring a bundle for the new version.
See [Migrate your platform](#migrate) for step-by-step instructions.

## Constraints

* If you have added indexes to certain tables in the Engine database, you must remove them before migrating from 6.2.6 to a later version. If you do not remove these indexes, the migration will not complete.
This applies to the following tables: `arch_process_instance`, `arch_connector_instance`, `arch_flownode_instance`, `arch_data_instance` and `arch_data_mapping`.

* There is no guarantee that the Look & Feel definition is compatible across maintenance versions.
For example, in 6.2.2, `jquery+` was renamed `jqueryplus` in `BonitaConsole.html`, for compatibility with more application servers.
If you are using a custom Look & Feel, [export](managing-look-feel.md) it before migrating.
Then after the migration is complete, [export the default Look & Feel](managing-look-feel.md) from the new version,
modify your custom Look & Feel to be compatible with the new definition, and with the [recommendations for form footers](creating-a-new-look-feel.md).
Then [import](managing-look-feel.md) your updated custom Look & Feel into Bonita Portal.

* The migration script supports MySQL, Postgres, Oracle, and Microsoft SQL Server. There is no migration for h2 database.

::: warning
**Important:**  
The migration operation resets the Bonita configuration files to default version for new settings to be applied (from the _$BONITA_HOME_ folder in <7.3.0 version or inside database in >=7.3.0).
Therefore, you must do a [backup of your configuration files](BonitaBPM_platform_setup.md#update_platform_conf) before starting the migration.  
You will need to merge custom properties and configurations to the migrated environment.

Furthermore, from the database point of view, as any operations on a production system, a migration is not a zero risk operation.   
Therefore, it is strongly recommended to do a [backup of your database](back-up-bonita-bpm-platform.md) before starting the migration.
:::

## Estimate time required

The platform must be shut down during migration.
The time required depends on several factors including the database volume, the number of versions between the source version and the
target version, and the system configuration,
so it is not possible to be precise about the time that will be required. However, the following example can be used as a guide:
|                   |                                                                                                 |
|:-                 |:-                                                                                               |
| Database entries: | data: 22541  <br/>flownode: 22482 <br/> process: 7493 <br/> connector: 7486 <br/> document: 7476|
| Source version:   | 6.0.2                                                                                           |
| Target version:   | 6.3.0                                                                                           |
| Time required:    | 2.5 minutes                                                                                     |

<a id="migrate"/>

## Migrate your platform

This section explains how to migrate a platform that uses one of the Bonita bundles.

1. Download the target version bundle and the migration tool for your Edition from the
[Bonitasoft site](http://www.bonitasoft.com/downloads-v2) for Bonita Community edition
or from the [Customer Portal](https://customer.bonitasoft.com/download/request) for Bonita Subscription Pack editions.
1. Check your current RDBMS version is compliant with the versions supported by the target version of Bonita (see [above](#rdbms_requirements))
1. Unzip the migration tool zip file into a directory. In the steps below, this directory is called `bonita-migration`.
1. If you use Oracle, add the JDBC driver for your database to `bonita-migration/lib`. This is the same driver as you have installed in your web server `lib` directory. You must upgrade to [Oracle 12c (12.2.x.y)](migrate-from-an-earlier-version-of-bonita-bpm.md#oracle12) in order to migrate to 7.9+. 
1. If you use Oracle or Microsoft SQL Server, add the JDBC driver for your database type to `bonita-migration/lib`. This is the same driver as you have installed in
your web server `lib` directory. **Warning**: For Oracle, make sure you double check that you use the official driver version that match your Database version. The correct driver is mandatory for a smooth migration: [Follow instructions for Oracle driver download.](database-configuration.md#proprietary_jdbc_drivers)
1. Configure the database properties needed by the migration script, by editing `bonita-migration/Config.properties`.
Specify the following information:

    | Property       | Description                                                      | Example                                                    |
   |:-              |:-                                                                |:-                                                          |
   | bonita.home    | The location of the existing bonita_home. Required only until 7.3| `/opt/BPMN/bonita` (Linux) or `C:\\BPMN\\bonita` (Windows) |
   | db.vendor      | The database vendor                                              | postgres                                                   |
   | db.driverClass | The driver used to access the database                           | org.postgresql.Driver                                      |
   | db.url         | The location of the Bonita Engine database                       | `jdbc:postgresql://localhost:5432/bonita_migration`        |
   | db.user        | The username used to authenticate to the database                | bonita                                                     |
   | db.password    | The password used to authenticate to the database                | bpm                                                        |

    ::: info
    Note: If you are using MySQL, add `?allowMultiQueries=true` to the URL. For example,
    `db.url=jdbc:mysql://localhost:3306/bonita_migration?allowMultiQueries=true`.  
    Also, if you are migrating to Bonita 7.9+, you must upgrade your database server to MySQL 8.0, see [Migrating to Bonita 7.9+ using MySQL](#mysql8) specific procedure below.
    :::

1. If you use a custom Look & Feel, [export](managing-look-feel.md) it, and then [restore the default Look & Feel](managing-look-feel.md).
1. If you use a Business data model that requires to be redeployed (see [above](#bdm_redeploy)), you can pause the tenant so that as a tenant admin, you'll be able to redeploy the BDM on a paused tenant once migration is done.  
1. Stop the application server.
1. **IMPORTANT:**
[Back up your platform](back-up-bonita-bpm-platform.md) and database in case of problems during migration.
1. Go to the directory containing the migration tool.
1. Run the migration script:
   * For version 1.x of the migration tool, run `migration.sh` (or `migration.bat` for Windows).
   * For version 2.x of the migration tool, go to the `bin` directory and run the migration script for your edition and operating system:

     |                       |                                                                                     |
     |:-                     |:-                                                                                   |
     | Community edition     | `bonita-migration-distrib` (Linux) or `bonita-migration-distrib.bat` (Windows)      |
     | Subscription editions | `bonita-migration-distrib-sp` (Linux) or `bonita-migration-distrib-sp.bat` (Windows)|
   * Starting from version 2.44.1, an additional script called `check-migration-dryrun` is present in the same folder. This script only run checks the migration would without actually migrating. This is equivalent to running the migration script with a `--verify` option.

1. The script detects the current version of Bonita, and displays a list of the versions that you can migrate to. Specify the
version you require.
The script starts the migration.
1. As the script runs, it displays messages indicating progress. After each migration step, you are asked to confirm whether to
proceed to the next step. You can pause the migration by answering `no`.
To suppress the confirmation questions, so that the migration can run unattended, set the ` (-Dauto.accept=true)` system
property.
When the migration script is finished, a message is displayed showing the new platform version, and the time taken for the migration.
The `bonita_home` and the database have been migrated.
1. Unzip the target bundle version into a directory. In the steps below, this directory is called `bonita-target-version`.
1. [Configure the bundle to use the migrated database](database-configuration.md).

    Do not recreate the database and use the setup tool of the `bonita-target-version` Edit the `bonita-target-version/setup/database.properties` file to point to the  migrated database.
1. Reapply configuration made to the platform, using the setup tool of the `bonita-target-version`

    Download the configuration from database to the local disk.

    There is below a Linux example:
    ```
    cd setup
    ./setup.sh pull
    ```

    You must reapply the configuration that had been done on the original instance's BONITA_HOME into the `bonita-target-version/setup/platform_conf/current`
Please refer to the guide on updating the configuration file using the [platform setup tool](BonitaBPM_platform_setup.md#update_platform_conf)

    When done, push the updated configuration into the database:
    ```
    ./setup.sh push
    ```
1. If you have done specific configuration and customization in your server original version, re-do it by configuring the application server at `bonita-target-version/server` (or `bonita-target-version` if target version is 7.3.n): customization, libs etc.

1. **If your Bonita version is 7.4 or above before migrating, you can skip this point.** <a id="compound-permission-migration" />
In the case where deployed resources have required dedicated [authorizations to use the REST API](resource-management.md#permissions), these authorizations are not automatically migrated.
Some manual operations have to be done on files that are  located in the extracted `platform_conf/current` folder (see [Update Bonita Platform configuration](BonitaBPM_platform_setup.md#update_platform_conf) for more information). You need to:
    
    * Perform a diff between the version before migration and the version after migration of `tenants/[TENANT_ID]/conf/compound-permissions-mapping.properties` and put the additional lines into the file `tenants/[TENANT_ID]/conf/compound-permissions-mapping-custom.properties`
    * Perform a diff between the version before migration and the version after migration of `tenants/[TENANT_ID]/conf/resources-permissions-mapping.properties` and put the additional lines into the file `tenants/[TENANT_ID]/conf/resources-permissions-mapping-custom.properties`
    * Perform a diff between the version before migration and the version after migration of `tenants/[TENANT_ID]/conf/dynamic-permissions-checks.properties` and put the additional lines into the file `tenants/[TENANT_ID]/conf/dynamic-permissions-checks-custom.properties`
    * Report all the content of the version before migration of`tenants/[TENANT_ID]/conf/custom-permissions-mapping.properties` into the new version.
               
1. Configure License:

    you need to put a new license in the database: see [Platform configuration](BonitaBPM_platform_setup.md#update_platform_conf) for further details.
    There is below a Linux example:
    ```
    cd setup
    vi database.properties
    ./setup.sh pull
    ls -l ./platform_conf/licenses/
    ```

    If there is no valid license in the `./platform_conf/licenses/`, these 2 pages will help you to request and install a new one:

      * [Licenses](https://documentation.bonitasoft.com/?page=licenses)
      * [Platform configuration](BonitaBPM_platform_setup.md#update_platform_conf)

    Install the new license:
    ```
    cp BonitaSubscription-7.n-Jerome-myHosname-20171023-20180122.lic ./platform_conf/licenses/
    ./setup.sh push
    ```
1. Start the application server. Before you start Bonita Portal, clear your browser cache. If you do not clear the cache, you might see old, cached versions of Portal pages instead of the new version.
Log in to the Portal and verify that the migration has completed. 
If you did not set the default Look & Feel before migration and you cannot log in, you need to [restore the default Look & Feel](managing-look-feel.md) using a REST client or the Engine API.
1. **If you migrated pasted version 7.7**
In that case, if you used the migration tool 2.41.1 or greater, the table `arch_contract_data` is automatically backed up to the table `arch_contract_data_backup` to avoid long lasting migration.
To reintegrate the data into your installation, a new tool is provided in versions 2.46.0 and above. It is located in the `tools/live-migration` folder.
Follow instruction in the README.md to run this tool and re-integrate data from `arch_contract_data_backup`.

The migration is now complete. If you were using a custom Look & Feel before migration, test it on the new version before applying it to your migrated platform.

## Migration of processes with 6.x forms and case overview pages

Until the version 7.0.0, Bonita used UI artifacts based on the Google Web Toolkit (GWT) technology: process instantiation, task execution forms and case overview page.
The runtime support for those forms and pages was removed in 7.8.0.

It means that if one or more processes on the migrated server uses 6.x forms or overview page, the migration to a version above 7.7.x cannot be performed directly. The following lines explain how to migrate to a version 7.8.0.

Specifically if you are migrating from a 6.x version:
* Migrate to the 7.0.0 using the migration tool 1.x.
* Migrate to the last 7.7.x version, using the migration tool 2.x.
* Redesign your process to use contracts at process instantiation and task execution levels, and recreate all your forms and case overview pages in the Studio using the UI Designer or your favorite IDE, so that they use [contracts](contracts-and-contexts.md). For more information, go to [migrate a form from 6.x](migrate-a-form-from-6-x.md)
* Upload the new version of all your processes using contracts, new forms, and new case overview pages.
* Make sure the versions of the processes using 6.x forms have no more running instances, and disable them.
* Perform the migration to the desired version.

If you are migrating from a 7.x version:
* Redesign all your forms in the Studio using the UI designer. See [here](migrate-a-form-from-6-x.md) for more info.
* Upload the new version of all your processes using the new forms.
* Disable the version of your processes using 6.x forms. Make sure they have no more running instances.
* Perform the migration to the desired version.

The disabled processes with 6.x forms will not be able to be enabled again post migration.
Having 6.x case overview pages on your processes will not prevent the migration of the platform,
however they will all be replaced by the default 7.x case overview page, created with the UI Designer.
It means that you might want to redo the case overview page as well as the forms, especially if you have configure
a custom case overview page for your processes in version 6.x. Or (for Enterprise, Performance, and Efficiency editions only),
you can live update it after migration.

::: info
Note: 6.x application resources have been removed too in 7.8.0, so if you are migrating a process that leverage this feature, you need to modify it (for example to use process dependencies instead (Configure > Process dependencies in Bonita Studio)).
:::

<a id="update-case-overview-pages" />

## Use the provided Bonita tool to update case overview pages before migrating to 7.8.0

Bonita Migration Tool now ships an option to allow you to replace 6.x case overview pages with the default 7.x case overview page
(created with the UI Designer), when your Bonita runtime is still in a pre-7.8.0 version. This allows you to see if the page suits your needs, or if not,
it can be used as a base to customize your case overview page. Your pages will then be ready for the 7.8.0 migration step.

To run it, unzip the latest Migration Tool and run, for **Community** edition:  
`./bonita-migration-distrib` (Linux) or `bonita-migration-distrib.bat` (Windows) `--updateCaseOverview <PROCESS_DEFINITION_ID>`

or for **Subscription** edition:  
`./bonita-migration-distrib-sp` (Linux) or `bonita-migration-distrib-sp.bat` (Windows) `--updateCaseOverview <PROCESS_DEFINITION_ID>`
 
For instance:
```bash
./bonita-migration-distrib-sp --updateCaseOverview 6437638294854549375
```

If you want to update several processes, simply run the command with all the processDefinitionId's one by one.

::: info
Note: This tool will only change case overview pages. This means that if some of your processes still have process instantiation / task execution forms,
you need to redesign them in the Studio using Bonita UI designer, as explained in the section above.
:::

Example of output issued when running the tool:

<script type="text/javascript">
function loadCSS(filename){
    let file = document.createElement("link");
    file.setAttribute("rel", "stylesheet");
    file.setAttribute("type", "text/css");
    file.setAttribute("href", filename);
    document.head.appendChild(file);
}
loadCSS("./assets/asciinema-player.css");
</script>
<asciinema-player src="bonita/images/${varVersion}/case_overview_update_mode-ascii.cast" speed="2" theme="monokai" title="Update case overview console output example" cols="240" rows="32"></asciinema-player>
<script src="./assets/asciinema-player.js"></script>

## Migrating to Java 11 in Bonita 7.9

Bonita 7.9+ supports Java 11.
Migrating an existing platform to Java 11 is not an easy, or painless endeavour.
To migrate a Bonita platform to Java 11, you need to follow the following steps:
- Migrate the platform to Bonita 7.9.0 as usual, and keep running it in Java 8. Verify that everything works as expected.
- Test the migrated platform in Java 11, on a test environment.
- Once tested, update what is required on the production server, and switch it to Java 11.

The main parts that require attention and testing are connectors and custom code.
While the 7.9.0 migration step tries its best to migrate the implementation of connectors that are known not to work in Java 11, namely [WebService, CMIS, Email and Twitter](release-notes.md#connector-dependency-updates), custom connectors, groovy scripts, rest api extensions etc. are not migrated and might not work outright in Java 11.
Aside from just code incompatibility, special attention has to be given to the dependencies of the custom code, as they might either not work in Java 11, work fine but conflict with Bonita own dependencies or the script might use dependencies previously included in Bonita, but no more accessible, or accessible in a different version.

<a id="postgres11"/>

## Migrating to Bonita 7.9+ using PostgreSQL

Bonita 7.9+ supports PostgreSQL 11.x (x>=2) which is not compatible with previous versions.
When migrating to Bonita 7.9+ using PostgreSQL follow this procedure:

* shutdown Bonita
* Run Bonita migration tool to the latest Bonita version supporting postgres 9 (7.8.4)
* Backup the Bonita database
* Migrate PostgreSQL from 9 to 11.x (x>=2) following the [Official documentation]
(https://www.postgresql.org/docs/11/upgrading.html)
* Run again the migration tool to the desired Bonita version requiring PostgreSQL 11
* Restart your updated Bonita platform

<a id="mysql8"/>

## Migrating to Bonita 7.9+ using MySQL

Bonita 7.9+ supports MySQL 8.0.x version, which is not compatible with older versions of MySQL. For this reason, to migrate to Bonita 7.9+ when using MySQL,
please follow this procedure:
* ensure your Bonita platform is shut down
* run Bonita migration tool to update Bonita platform to version 7.9 or newer, following the procedure above
* upgrade your MySQL database server installation following the [official documentation](https://dev.mysql.com/doc/refman/8.0/en/upgrading.html)
* once done, you can restart your updated Bonita platform


<a id="oracle12"/>

## Migrating to Bonita 7.9+ using Oracle

Bonita 7.9+ supports Oracle 12c (12.2.x.y) version. To migrate to Bonita 7.9+ when using Oracle,
please follow this procedure:
* ensure your Bonita platform is shut down
* in a first step, run Bonita migration tool to update Bonita platform to version 7.8.4, following the procedure above
* then upgrade your Oracle database server to the version 12c (it must be 12.2.x.y)
* in a second step, run the migration tool again to migrate the platform to 7.9.0 or newer
* once done, you can restart your updated Bonita platform


## Migrate your cluster

A Bonita cluster must have the same version of Bonita on all nodes. To migrate a cluster:

1. Download the migration tool:
    * In version 1.x you need to download the tool for Performance cluster, the ordinary Performance migration tool does not support migration of a cluster.
    * In version 2.x there is only one kind of migration tool. It will work for both cluster and non cluster installation.
1. Shutdown all cluster nodes.
1. On one node, follow the procedure above to migrate the platform.
1. When the migration is complete on one node, follow steps 12 to 16 on all the other nodes.


The migration of the cluster is now complete, and the cluster can be restarted.


## Migrate your client applications

If you have applications that are client of Bonita, you may have to change your client code or library. Most of the
time, we guarantee backward compatibility. In any cases, please read the [release notes](release-notes.md) to check if
some changes have been introduced.

In addition, if your application connect to the Bonita Engine using the HTTP access mode, see the [bonita-client library](configure-client-of-bonita-bpm-engine)
documentation page.

## Migration troubleshooting
### Quartz timers are stuck after migrating to 7.10.0
_Symptom_: When migrating to 7.10.0+ the timers on processes don't work anymore.

_Cause_: A bug in the pause/resume of tenant services, fixed in 7.12.1.

_Solutions_: The easier solution is to **NOT** [pause the bpm services](pause-and-resume-bpm-services.md) before migrating.
Failing that, if the bpm services were paused before migrating or have to be paused for whatever reason, then you need to execute the following database requests after the migration completes:

```
DELETE FROM QRTZ_PAUSED_TRIGGER_GRPS;
UPDATE QRTZ_TRIGGERS SET TRIGGER_STATE = 'WAITING' WHERE TRIGGER_STATE = 'PAUSED';
```
After the operation, the table QRTZ_PAUSED_TRIGGER_GRPS should be empty, and all the triggers in the QRTZ_TRIGGERS table should be in state _waiting_, and not _paused_.