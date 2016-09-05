# Bonita BPM installation overview

Bonita BPM exists in several [editions](http://www.bonitasoft.com/products#versions): Performance, Efficiency, Teamwork, and Community.

For the Bonita BPM Subscription editions: Performance, Efficiency, and Teamwork, you need to [install a license](licenses.md) during the installation procedure. This license depends on the edition, the deployment environment, the number of cases purchased or the number of cores. 

For the Bonita BPM Community edition, no license is needed.

Bonita BPM Studio <!--{.h2}-->

Bonita BPM Studio contains an embedded test platform that includes an Apache Tomcat application server, an h2 database and the Bonita web application (that itself includes Bonita BPM Engine).

To install Bonita BPM Studio you can either use:

* The installer for your operating system (Windows, Mac OS, Linux).
Used to install Bonita BPM Studio (using a wizard) on your computer. No configuration necessary.
* The OS independent package. Used to manually set up Bonita BPM Studio.
The package contains the individual launchers in one .zip file, and creates the same installation environment as the installers.

To know more, go to [Bonita BPM Studio installation](bonita-bpm-studio-installation.md).

<a id="platform"/>

Bonita BPM Platform  <!--{.h2}-->

Bonita BPM Platform can be installed in several ways:

* If you want to migrate an existing installation to the latest version follow the [migration guide](migrate-from-an-earlier-version-of-bonita-bpm.md).
* If you want to do a fresh install, get one of our prepackaged bundles that include an Application Server
    * [Tomcat + Bonita BPM](tomcat-bundle.md)
    * [Wildfly + Bonita BPM](wildfly-bundle.md)
* If you want to do a custom installation, use the [Deploy bundle](deploy-bundle.md).


For all options, you will need to [configure](database-configuration.md) Bonita BPM Engine to work with the database of your choice (e.g. PostgreSQL or Oracle).


::: warning
Starting from Bonita BPM 7.3.0, there is no more bonita home to store the configuration, all the configuration is in the database. For more information, take a look at [Bonita BPM Platform configuration](BonitaBPM_platform_setup.md)
:::


For detailed information on the Supported Environment Matrix, see the [Support Guide](https://customer.bonitasoft.com/support-policies) or [ask to be contacted by our commercial team](http://www.bonitasoft.com/contact-us).
