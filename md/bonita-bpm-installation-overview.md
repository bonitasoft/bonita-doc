# Bonita installation overview

Description of the different options for Bonita installation.

Bonita exists in several [editions](http://www.bonitasoft.com/bonita-editions): Enterprise, Performance, Efficiency, Teamwork, and Community.

For the Bonita Subscription editions: Enterprise, Performance, Efficiency, and Teamwork, you need to [install a license](licenses.md) during the installation procedure. This license depends on the edition, the deployment environment, the number of cases purchased or the number of cores. 

For the Bonita Community edition, no license is needed.

## Bonita Studio

Bonita Studio contains an embedded test platform that includes an Apache Tomcat application server, an h2 database and the Bonita web application (that itself includes Bonita Engine).

To install Bonita Studio you can either use:

- The installer for your operating system (Windows, Mac OS, Linux).
  Used to install Bonita Studio (using a wizard) on your computer. No configuration necessary.
- The OS independent package. Used to manually set up Bonita Studio.
  The package contains the individual launchers in one .zip file, and creates the same installation environment as the installers.

To know more, go to [Bonita Studio installation](bonita-bpm-studio-installation.md).

<a id="platform"/>

## Bonita Platform

Bonita Platform can be installed in several ways:

- If you want to migrate an existing installation to the latest version follow the [migration guide](migrate-from-an-earlier-version-of-bonita-bpm.md).
- If you want to do a fresh install, get one of our prepackaged bundles that include an Application Server
  - [Tomcat + Bonita](tomcat-bundle.md)
  - [WildFly + Bonita](wildfly-bundle.md)
- If you want to do a custom installation, see [Custom Deployment](custom-deployment.md).

For all options, you will need to [configure](database-configuration.md) Bonita Engine to work with the database of your choice (e.g. PostgreSQL or Oracle).

::: warning
Starting from Bonita 7.3.0, there is no more bonita home to store the configuration, all the configuration is in the database. For more information, take a look at [Bonita Platform configuration](BonitaBPM_platform_setup.md)
:::

For detailed information on the Supported Environment Matrix, see the [Support Guide](https://customer.bonitasoft.com/support-policies) or [ask to be contacted by our commercial team](http://www.bonitasoft.com/contact-us).

## Bonita Engine only ![](images/bonita-lab-icon.png)

If you only need the execution engine you can integrate it two different ways:

- Using the Spring boot starter
- If you are not using Spring boot, it can be integrated programmatically

This mode of installation is currently in _Lab_ mode, see how to [embed Bonita Engine](embed-engine.md).
