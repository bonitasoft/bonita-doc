# Community to Subscription upgrade

Upgrading means moving from a Bonita BPM Community edition environment to any Bonita BPM Subscription 
edition environment.

**Warnings:**

* An upgrade can only be performed on a single Bonita BPM versions. You cannot migrate to a new version at the same time as you update edition.
* After it is applied, an upgrade cannot be undone.

An upgrade is performed in two phases.

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

::: warning
A Bonita BPM platform upgrade can only be performed on the same database type.
:::

To upgrade a Bonita BPM platform from Community edition to a Subscription edition, follow these steps:

1. [Backup your Bonita BPM platform and databases](back-up-bonita-bpm-platform.md).
2. Make sure that the platform is shut down.
3. Download the [Deploy bundle](deploy-bundle.md).
4. Update the configuration using the Platform setup tool included:
    1. Configure the [Platform setup tool](BonitaBPM_platform_setup#configure_tool) to use your database.
    2. Copy the content of `platform_conf/initial` in a directory named e.g. `sp_conf`.
    3. Run `setup.sh pull` or `setup.bat pull` to get your current configuration in `platform_conf/current`.
    4. Reapply the customizations made in the current configuration to the configuration in the `sp_conf`.
    5. Delete the content of the folder `platform_conf/current`.
    6. Put the content of the folder `sp_conf` in `platform_conf/current`.
    7. Set the edition in the `sp_conf` configuration folder, see [here](tomcat-bundle.md#edition_specification).
    7. [Put your license](licenses.md) in `platform_conf/licenses`.
    8. Run `setup.sh push` or `setup.bat push` to push this configuration in database.
5. Replace the community bonita.war with the subscription version of bonita.war. You can find it in the Deploy bundle.
    * on Tomcat simply delete the `webapps/bonita.war` file and the `webapps/bonita` folder and copy the new war here.
    * on Wildfly delete `standalone/deployments/bonita-all-in-one-<VERSION>.ear` and the file having the same name with `.deployed`, then copy the new ear in the same place.
6. Start you platform again.

The Upgrade is now finished, you can verify that you are now running a subscription edition in the portal user interface, the dialog displayed from the top right "Settings / About" menu should indicates the correct Subscription edition.

