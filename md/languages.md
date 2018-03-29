# Languages

## Languages available by default

The following languages are officially supported:

* English (US)
* French
* Spanish (Latin American)
* Japanese

Officially supported language means that:
* Translation is performed by Bonitasoft.
* Following Bonita BPM components are translated: Studio, UI Designer and Portal.

## Select BPM Portal user interface language

For the web desktop version:
1. Go to the top right corner and click on _**Settings**_/_**Language**_
1. Select a language from the drop-down list.

For the web mobile version:

1. Click on the _**Tools icon**_
1. Click on _**Languages**_
1. Select a new language from the drop-down list

## Add a language to Bonita BPM Portal

::: info
Instructions below assume that the language you want to add is already available in the community translation project. If translation is not available see [Translate Bonita BPM Portal](#Translate_BonitaB_PM_Portal) for instruction about how to collaborate to a new or ongoing translation.
:::

Instructions below explain how to add a language to Bonita BPM Portal. Steps below involve using content created by Bonitasoft community and therefore not officially supported.

#### Download the language files

1. Go to [Bonita BPM translation project](http://translate.bonitasoft.org/).
1. Select the language you are interested in.
1. Make sure you click on the "Toggle Hidden Files" button ![Toggle hidden files button](images/crowdin_toggle_hidden_files.png) to see already fully translated files.
1. Browse the file tree to `${varVersion}.x/bonita-web/portal` folder.
1. For each file in the folder: open it and in the **_File_** menu click on **_Download_**. Each `.po/.pot` file has a language indicator and a locale indicator. For example, the files for the Brazilian Portuguese language end with `pt_BR.po`.
1. For Subscription editions, you also need to get the files from `${varVersion}.x/bonita-web-sp/portal` folder.

#### Install the files and configure java

7. Create a new folder depending on the situation:
    * `[TOMCAT_HOME]/server/i18n/`
    * `[WILDFLY_HOME]/server/i18n/`
    * `[STUDIO_HOME]/workspace/tomcat/server/i18n/`
1. Copy all the `.po/.pot` files into the new folder just created.
1. Declare a new JVM property **`org.bonitasoft.i18n.folder`** and set the value to the full path to `i18n` folder:
    * Tomcat on Windows, edit the `[TOMCAT_HOME]\setup\tomcat-templates\setenv.bat` file: **`"-Dorg.bonitasoft.i18n.folder=C:\path_to_i18n_folder"`**
    * Tomcat on Linux, edit the `[TOMCAT_HOME]/setup/tomcat-templates/setenv.sh` file: **`-Dorg.bonitasoft.i18n.folder="/path_to_i18n_folder"`**
    * WildFly on Windows, edit the `[WILDFLY_HOME]\server\bin\standalone.conf.bat` file.
    * WildFly on Linux, edit the `[WILDFLY_HOME]/server/bin/standalone.conf` file.
    * Tomcat embedded in Bonita Studio edit the appropriate .ini file and use the following syntax: **`-Dtomcat.extra.params="-Dorg.bonitasoft.i18n.folder=C:\path\to_i18n_folder"`**
        * Windows 64bit: `[STUDIO_HOME]/BonitaBPMSubscription64.ini`
        * Linux 64bit: `[STUDIO_HOME]/BonitaBPMSubscription64-linux.ini`
        * etc.
1. Restart your application server (or Click on Server in the Bonita Studio menu bar, click on Restart Web Server).
1. Check that the new language is listed in Settings menu of the Bonita Portal.

<a id="Translate_BonitaB_PM_Portal" />

## Translate Bonita BPM Portal

First step if to go to [Bonita BPM translation project](http://translate.bonitasoft.org/) hosted on Crowdin and check if the language you want to contribute to is already listed. If it's not, please request it by submitting an issue on our [community issue tracker](https://bonita.atlassian.net).

If the language you want to contribute to is already listed:

1. If you don't already have one, create a Crowdin account.
1. On the [Bonita BPM translation project](http://translate.bonitasoft.org/) page click on the language you want to translate.
1. At the top of the page, click on the "Join" button.
1. Wait for us to validate your request to join the project.
1. Navigate to the Portal `.po/.pot` files (see information in the "Add a language to Bonita BPM Portal" section above).
1. Click on a file to begin the translation. You can then use the filter **missing translation** to only display the strings to be translated.
