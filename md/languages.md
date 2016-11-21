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
2. Click on _**Languages**_
3. Select a new language from the drop-down list

## Add a language to Bonita BPM Portal

::: info
Instructions below assume that the language you want to add is already available in the community translation project. If translation is not available see [Translate Bonita BPM Portal](#Translate-Bonita-BPM-Portal) for instruction about how to collaborate to a new or ongoing translation.
:::

Instructions below explain how to add a language to Bonita BPM Portal. Steps below involve using content created by Bonitasoft community and therefore not officially supported.

1. Go to [Bonita BPM translation project](http://translate.bonitasoft.org/).
1. Select the language you are interested in.
1. Browse the file tree to `7.3.x/bonita-web/portal` folder.
1. For each file in the folder: open it and in the **_File_** menu click on **_Download_**. Each `.po` file has a language indicator and a locale indicator. For example, the files for the Brazilian Portuguese language end with `pt_BR.po`.
1. For Subscription editions, you also need to get the files from `7.3.x/bonita-web-sp/portal` folder.
1. Copy all the `.po` files to a new folder of your choice, preferably in a sub-folder inside your bundle. E.g. `[TOMCAT_INSTALL_FOLDER]/i18n/`. For Bonita BPM Studio, Tomcat installation folder is located in `workspace/tomcat`.
1. Declare a new JVM property "org.bonitasoft.i18n.folder" and set the value to the full path to `i18n` folder:
    * For Tomcat embedded in Bonita BPM Studio edit the appropriate **.ini** file (e.g. **BonitaBPMCommunity64.ini** for Windows 64bit).
    * For Tomcat on Windows edit **setenv.bat**
    * For Tomcat on Linux edit **setenv.sh**
    * For JBoss on Windows edit **standalone.conf.bat**
    * For JBoss on Linux edit **standalone.conf**
1. Restart your application server (or restart Bonita BPM Studio). The next time Bonita BPM Portal starts, it will detect the new language and add it to the list in the **Settings** menu.

## Translate Bonita BPM Portal

First step if to go to [Bonita BPM translation project](http://translate.bonitasoft.org/) hosted on Crowdin and check if the language you want to contribute to is already listed. If it's not, please request it by submitting an issue on our [community issue tracker](https://bonita.atlassian.net).

If the language you want to contribute to is already listed:

1. If you don't already have one, create a Crowdin account.
1. On the [Bonita BPM translation project](http://translate.bonitasoft.org/) page click on the language you want to translate.
1. At the top of the page, click on the "Join" button.
1. Wait for us to validate your request to join the project.
1. Navigate to the Portal `.po` files.
1. Click on a file to begin the translation. You can then use the filter **missing translation** to only display the strings to be translated.
