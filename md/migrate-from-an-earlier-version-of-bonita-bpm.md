# 2.7.2 Migrate from an earlier version of Bonita BPM

This page explains how to migrate your platform to a newer version of Bonita BPM.


You can migrate your platform using the `migration` script. This script can migrate from Bonita BPM 6.0.2 or later to any

later version up to 7.0.0\.


To migrate from Bonita BPM 7.0.0 or later to any later version, use the latest 2.x version of the `migration` script.


For example, if you are migrating from 6.5.3 to 7.0.1, you must migrate from 6.5.3 to 7.0.0 using version 1.x of the `migration` script, and then migrate from 7.0.0 to 7.0.1 using version 2.x.


**Caution:** 
The 6.5.4 release contains fixes to certain bugs that were found in early 7.x.y versions, up to 7.1.0\. 
When you are ready to migrate from 6.5.4 to a 7.x.y version, make sure you migrate to at least 7.1.1 to be sure that these fixes are present in your new version after migration. 
To migrate from 6.5.4 to 7.1.1 or later there are two phases: first you upgrade to 7.0.0 then to the latest version. 
You are recommended not to start 7.0.0 after you migrate to it, but to proceed immediately with the second phase of the migration.



The script migrates your platform bonita\_home and the database. You cannot [change edition](/upgrade-community-subscription-edition) while migrating. If you are running a

Bonita BPM Subscription Pack edition, you need a valid license for your target version.
If you are upgrading to a new maintenance version and not changing the minor version number (for example, you are migrating from 6.3.0

to 6.3.1), your current license remains valid after migration.


![Migration steps](images/images-6_0/migration_bigsteps.png)

Migration steps


[How it works](#how_it_works)  
[Constraints](#constraints)  
[Estimate time required](#time)  
[Migrate your platform](#migrate)  
[Migrate your cluster](#cluster)





## How it works


The migration script is a wrapper for a set of scripts that are specific to the versions and database being migrated. It is provided
as a zip archive, and applies to Bonita BPM version 6.0.2 and later.


The migration is step-wise by maintenance version and the script manages the sequence of steps from your current version to the
target version.
After each minor or maintenance version upgrade, you have the option to pause or continue to the next step.



The migration script migrates the following:

* Engine server
* Engine database, including all data on active and archived process instances
* Organization definition
* Business data model, and the business data database
* Runtime data in var\_bonita\_home
* Configuration files in var\_bonita\_home, which are replaced with the default configuration files for the new version
* Log files from the previous version are not impacted by migration

The following are not migrated automatically:

* var\_bonita\_home customizations: Reapply your customizations manually after the migration script has finished.
* Deployed process definitions: The process continue to run using the definition create in the previous version.
* Process definition sources (`.bos` files): Migrate these by importing them into the new version of Bonita BPM Studio.
* Custom connectors, actor filers, data types: These might continue to work in the new version, but should be tested.
* Custom pages: These might continue to work in the new version, but should be tested.
* Reports: These might continue to work in the new version, but should be tested.


When the script has finished,
you need to complete the migration by unzipping and configuring a bundle for the new version.
See [Migrate your platform](#migrate) for step-by-step instructions.





## Constraints


If you have added indexes to certain tables in the Engine database, you must remove them before migrating from 6.2.6 to a later version.
If you do not remove these indexes, the migration will not complete.
This applies to the following tables: `arch_process_instance`, `arch_connector_instance`, `arch_flownode_instance`, `arch_data_instance` and `arch_data_mapping`.


There is no guarantee that the Look & Feel definition is compatible across maintenance versions.
For example, in 6.2.2, `jquery+` was renamed `jqueryplus` in `BonitaConsole.html`, for compatibility with more application servers.
If you are using a custom Look & Feel, [export](/managing-look-feel.md#export_current) it before migration.
Then after the migration is complete, [export the default Look & Feel](/managing-look-feel.md#export_default) from the new version,
modify your custom Look & Feel to be compatible with the new definition, and with the [recommendations for form footers](/creating-new-look-feel.md#migration).
Then [import](/managing-look-feel.md#import) your updated custom Look & Feel into Bonita BPM Portal.


The migration script supports MySQL, Postgres, Oracle, and MS SQLServer. There is no migration for h2 databases.





## Estimate time required


The platform must be shut down during migration.
The time required depends on several factors including the database volume, the number of versions between the source version and the

target version, and the system configuration,
so it is not possible to be precise about the time that will be required. However, the following example can be used as a guide:

Database entries:
data: 22541  

flownode: 22482  

process: 7493  

connector: 7486  

document: 7476

Source version:
6.0.2

Target version:
6.3.0

Time required:
2.5 minutes




## Migrate your platform


This section explains how to migrate a platform that uses one of the Bonita BPM bundles.


1. 

Download the target version bundle and the migration tool for your Edition from the
[BonitaSoft site](http://www.bonitasoft.com/how-we-do-it/downloads) for Bonita BPM Community edition
or from the [Customer Portal](https://customer.bonitasoft.com/download/request) for Bonita BPM Subscription Pack editions.

2. Unzip the migration tool zip file into a directory. In the steps below, this directory is called `bonita-migration`.
3. Add the JDBC driver for your database type to `bonita-migration/lib`. This is the same driver as you have installed in
your web server `lib` directory.
4. Configure the database properties needed by the migration script, by editing `bonita-migration/Config.properties`.

Specify the following information:
Property
Description
Example

bonita.home
The location of the existing bonita\_home.
`/opt/BPMN/bonita` (Linux) or `C:\\BPMN\\bonita` (Windows)

db.vendor
The database vendor
postgres

db.driverClass
The driver used to access the database
org.postgresql.Driver

db.url
The location of the Bonita BPM Engine database
`jdbc:postgresql://localhost:5432/bonita_migration`

db.user
The username used to authenticate to the database
bonita

db.password
The password used to authenticate to the database
bpm

Note: If you are using MySQL, add `?allowMultiQueries=true` to the URL. For example,

`db.url=jdbc:mysql://localhost:3306/bonita_migration?allowMultiQueries=true`.

5. If you use a custom Look & Feel, [export](/managing-look-feel.md#export_current) it, and then [restore the default Look & Feel](/managing-look-feel.md#restore_default).
6. Stop the application server and database server.
7. [Back up your platform](/back-bonita-bpm-platform.md) and database in case of problems during migration.

8. Go to the directory containing the migration tool.
9. Run the migration script:
  * For version 1.x of the migration tool, run `migration.sh` (or `migration.bat` for Windows).
  * For version 2.x of the migration tool, go to the `bin` directory and run the migration script for your edition and operating system:
Community edition
`bonita-migration-distrib` (Linux) or `bonita-migration-distrib.bat` (Windows)

Subscription editions
`bonita-migration-distrib-sp` (Linux) or `bonita-migration-distrib-sp.bat` (Windows)



10. The script detects the current version of Bonita BPM, and displays a list of the versions that you can migrate to. Specify the
version you require.
The script starts the migration.
11. As the script runs, it displays messages indicating progress. After each migration step, you are asked to confirm whether to

proceed to the next step. You can pause the migration by answering `no`.
To suppress the confirmation questions, so that the migration can run unattended, set the ` (-Dauto.accept=true)` system

property.
When the migration script is finished, a message is displayed showing the new platform version, and the time taken for the migration.
The `bonita_home` and the database have been migrated.


12. 
Configure the migrated `bonita-migration/bonita_home` for your system, by reapplying the configuration settings you had in `bonita_home` before migration
(for example by updating `bonita-platform.properties` or services configuration files). 

13. Unzip the target bundle version into a directory. In the steps below, this directory is called `bonita-target-version`.
[Install the bundle](/bonita-bpm-installation-overview.md) and configure it but do not start it. 

14. In your new `bonita-target-version` folder, delete the `bonita` folder. You will use the `bonita_home` that you have migrated instead.

15. Set the bonita\_home system property to point to the migrated `bonita_home`.

16. [Configure the bundle to use the migrated database](/database-configuration.md). Do not recreate the database.

17. Make sure there is a valid license file in `bonita-target-version/bonita_home/server/licenses`.
  * If you have migrated from an earlier maintenance version of the same minor version, for example, from 6.3.0 to 6.3.1, your existing license is still valid and you do not need to do anything.
  * If you have have migrated from an earlier minor version, for example from 6.0.4 to 6.2.1, you need to [request a new license](/licenses.md).
Use the license request utility of the new version to create the license request key.


18. Start the application server. Before you start Bonita BPM Portal, clear your browser cache. If you do not clear the cache, you might see old, cached versions of Portal pages instead of the new version. 
Log in to the Portal and verify that the migration has completed. 
If you did not set the default Look & Feel before migration and you cannot log in, you need to [restore the default Look & Feel](/managing-look-feel.md#restore_default) using a REST client or the Engine API.


The migration is now complete. If you were using a custom Look & Feel before migration, test it on the new version before applying it to your migrated platform.



## Migrate your cluster



A Bonita BPM cluster must have the same version of Bonita BPM on all nodes. To migrate a cluster:


1. Download the migration tool for Performance cluster. The ordinary Performance migration tool does not support migration of a

cluster.
2. Shut down all cluster nodes.
3. On one node, follow the procedure above to migrate the platform.
4. When the migration is complete on one node, follow steps 12 to 16 on all the other nodes.

The migration of the cluster is now complete, and the cluster can be restarted.