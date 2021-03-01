# Upgrade from Community to Subscription

Upgrading means moving from a Bonita Community edition environment to any Bonita Subscription 
edition environment.

## To Check before upgrading
* An upgrade can only be performed on a single Bonita version. You cannot migrate to a new version at the same time as you upgrade to Subscription edition.  
  Eg. You can only upgrade from **Bonita 7.3.3 Community** edition to **Bonita 7.3.3 Subscription** edition. You **cannot** upgrade from **Bonita 7.3.3 Community** to **Bonita 7.4.0 Subscription**.
* After it is applied, an upgrade cannot be undone.

An upgrade is performed in two phases.

## Bonita Studio upgrade

To upgrade a Community edition Bonita Studio and its resources (such as process diagrams, data models), follow these steps:

1. [Install a Bonita  Studio](bonita-bpm-studio-installation.md) Subscription edition.
2. Export your resources from the Bonita Studio Community edition to `.bos` files. We recommend that you keep these resource files as a backup.
3. Import your resource files into the Bonita Studio in Subscription edition.

The upgrade is performed automatically and silently when importing resources into Bonita Studio Subscription edition.

Remember that an upgrade is a non-reversible operation: 
after your resources are imported in the Subscription edition, you will not be able to export from the Subscription edition Studio and then import them back into the Community edition.

## Bonita platform upgrade

Upgrading a Bonita platform allows you to keep the platform data (process definitions, cases, BDM...) 
while benefiting from the Subscription edition features.

The upgrade procedure is quite simple and only requires a limited service downtime (less than an hour for basic configurations).

::: warning
A Bonita platform upgrade can only be performed on the same database vendor (E.g. PostgreSQL) and on the same Bonita version (E.g. Bonita 2021.2 (=_7.13_))
:::

To upgrade a Bonita platform from Community edition to a Subscription edition, follow these steps:

1. Download and unzip the Bonita Subscription bundle (to retrieve the bonita.war Web App later) 
1. Retrieve a [Subscription license](licenses.md) file
1. Run `<bonita-community>/setup/setup(.sh/.bat) pull` to fetch your current Community configuration in `<bonita-community>/setup/platform_conf/current`
1. Create license folder `<bonita-community>/setup/platform_conf/licenses/`
1. Copy your license file into this newly-created folder
1. Push your new license in the database: `<bonita-community>/setup/setup(.sh/.bat) push`
1. Stop Bonita Community platform with `<bonita-community>/stop-bonita(.sh/.bat)` script
1. Remove Bonita Community Web App from `<bonita-community>/server/webapps`: both `bonita.war` and the auto-extracted folder with the same name `bonita/`
1. Copy the Bonita Subscription Web App where the Community version was: `<bonita-community>/server/webapps/bonita.war`
1. (Optionally rename the `<bonita-community>` folder with a name that does not contain the word `community`, for clarity)
1. Start the upgraded Bonita Platform using `<bonita-community>/start-bonita(.sh/.bat)` script

The Upgrade is now finished, you can verify that you are now running a subscription edition in the portal user interface, the dialog displayed from the top right "Settings / About" menu should indicate the correct Subscription edition.

Once you have started Bonita Subscription platform at least once, you can pull your Subscription configuration (`<install>/setup/setup(.sh/.bat) pull`)
and change the Subscription-specific configuration files to match your needs. See [Bonita platform setup tool](BonitaBPM_platform_setup.md) for details about
how to apply configuration changes.