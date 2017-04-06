# Community to Subscription upgrade

Upgrading means moving from a Bonita BPM Community edition environment to any Bonita BPM Subscription 
edition environment.

**Warnings:**

* An upgrade can only be performed on a single Bonita BPM version. You cannot migrate to a new version at the same time as you upgrade to Subscription edition.  
  Eg. Migrate from **Bonita BPM 7.3.3 Community** edition to **Bonita BPM 7.3.3 Subscription** edition. 
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

1. [Install the Subscription Bundle](bonita-bpm-installation-overview) but do not start it. We will call this installation folder `bonita-subscription`.
2. Configure the Subscription installation to use your existing database editing the file `<bonita-subscription>/setup/database.properties`).
3. Shut down the Community server being migrated using the `bonita-stop` script, we will call this installation folder `bonita-community`.
4. Run `<bonita-community>/setup/setup(.sh/.bat) pull` to fetch your current Community configuration in `<bonita-community>/setup/platform_conf/current` and copy this last in a different folder, we will call this new folder `bonita-community-configuration`.
5. [Backup your Bonita BPM platform and databases](back-up-bonita-bpm-platform.md).
6. Update the configuration using the [Platform setup tool](BonitaBPM_platform_setup#configure_tool) in `bonita-subscription`:
    1. Create the folder `<bonita-subscription>/setup/platform_conf/current`, we will call it `bonita-subscription-configuration`.
    3. Copy the content of the `<bonita-subscription>/setup/platform_conf/initial` to `bonita-subscription-configuration`.
    4. In the `bonita-subscription-configuration`, reapply the modifications for all the folders but the one named `tenants` (use `bonita-community-configuration` as a reference).
    5. Create the folder `<bonita-subscription-configuration>/tenants`.
    6. For each folder contained in `<bonita-community-configuration>/tenants`.
        1. We will call this folder `bonita-community-configuration-tenant`.
        2. Create one folder with the same name as `bonita-community-configuration-tenant` in `<bonita-subscription-configuration>/tenants`, we will call it `bonita-subscription-configuration-tenant`.
        3. Copy all folders with prefix `tenant_template_` from `bonita-subscription-configuration` to `bonita-subscription-configuration-tenant` and remove the prefix in their names.
        4. In the `bonita-subscription-configuration-tenant`, reapply the modifications (user `bonita-community-configuration-tenant` as a reference).
    7. Run `<bonita-subscription>/setup/setup(.sh/.bat) push` to push the migrated configuration `bonita-subscription-configuration` in database.
7. Start the migrated platform using the `start-bonita` script located in `bonita-subscription`.

The Upgrade is now finished, you can verify that you are now running a subscription edition in the portal user interface, the dialog displayed from the top right "Settings / About" menu should indicate the correct Subscription edition.

