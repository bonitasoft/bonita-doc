# 2.8 Upgrade from Community to Subscription edition

Upgrading means moving from a Bonita BPM Community edition environment to any Bonita BPM Subscription 
edition environment.

**Warnings:**

* An upgrade can only be performed on a single Bonita BPM versions. You cannot migrate to a new version at the same time as you update edition.
* After it is applied, an upgrade cannot be undone.

An upgrade is performed in two phases:

* [Bonita BPM Studio upgrade](#studio_upgrade)
* [Bonita BPM platform upgrade](#platform_upgrade)

## Bonita BPM Studio upgrade

To upgrade a Community edition Bonita BPM Studio and its resources (such as process diagrams, data models), follow these steps:

1. [Install a Bonita BPM Studio](bonita-bpm-studio-installation.md) Subscription edition.
2. Export your resources from the Bonita BPM Studio Community edition to `.bos` files. We recommend that you keep these resource files as a backup.
3. Import your resource files into the Bonita BPM Studio in Subscription edition.

The upgrade is performed automatically and silently when importing resources into Bonita BPM Studio Subscription edition.

Remember that an upgrade is a non-reversible operation: 
after your resources are imported in the Subscription edition, you will not be able to export from the Subscription edition Studio and then import them back into the Community edition.

## Bonita BPM platform upgrade

Upgrading a Bonita BPM platform allows you to keep the platform data (process definitions, cases, BDM...) 
while benefiting from the Subscription edition features.

The upgrade procedure is quite simple and only requires a limited service downtime (less than an hour for basic configurations).

**Warning:**
A Bonita BPM platform upgrade can only be performed on the same database type.

To upgrade a Bonita BPM platform from Community edition to a Subscription edition, follow these steps:

1. [Backup your Bonita BPM platform and databases](back-up-bonita-bpm-platform.md).
2. Make sure that the platform is shut down.
3. [Install a new Bonita BPM platform](basic-bonita-bpm-platform-installation.md) Subscription edition with an H2 database. 
(The database is only used temporarily).
4. Start the Bonita BPM Subscription platform for the first time (this will initialize the platform data).
5. Log in to the Bonita BPM Portal as the technical user (default login and password: install) to make sure that your installation is functional.
6. Shut down the server.
7. Reset the Bonita BPM Portal menus by deleting this file:
`/engine-server/work/tenants/1/profiles.md5`
8. Overwrite the `/engine-server/work/tenants/1/processes` folder of your Subscription edition installation with your 
backup files for the this folder from the Community edition. This will transfer your process definitions. 
9. If the Community edition platform was running on a H2 database, use the files from your Community edition back to overwrite the following files of your Subscription edition installation:  
`/engine-server/work/platform/bonita_journal.db.h2.db`  
`/engine-server/work/platform/business_data.db.h2.db`
10. If the Community edition platform was not running on a H2 database:
  1. From your Subscription edition installation, delete these files:  
`/engine-server/work/platform/bonita_journal.db.h2.db`  
`/engine-server/work/platform/business_data.db.h2.db`
  2. Configure your Subscription edition platform to use your Community edition database.
11. Start the Subscription edition platform.
12. Log in to the Bonita BPM Portal with your administration or personal account (it should have been imported during the upgrade).
13. Validate that the dialog displayed from the top right "Settings / About" menu indicates the correct Subscription edition.
14. Validate that your platform data is properly upgraded. This is the end of the upgrade procedure.