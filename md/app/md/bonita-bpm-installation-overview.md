# 2 Bonita BPM installation overview

Bonita BPM exists in four [editions](http://www.bonitasoft.com/node/14673/products-v2#versions): Performance, Efficiency, Teamwork, and Community.

For the Bonita BPM Subscription Pack editions, Performance, Efficiency, and Teamwork, you need to [install a license](licenses.md). The license depends on the edition, the deployment environment, and the number of cores. 

For the Bonita BPM Community edition, no license is needed.

## Bonita BPM Studio and Bonita BPM Platform

* [Bonita BPM Studio](bonita-bpm-overview.md#bonitastudio) is the tool for business analysts and developers to design processes.
* [Bonita BPM Platform](bonita-bpm-overview.md#bonitaplatform) is the server part of the solution.

### Bonita BPM Studio

Bonita BPM Studio has an embedded test platform that includes an Apache Tomcat application server, an h2 database and the Bonita web application (that itself includes Bonita BPM Engine).

To install Bonita BPM Studio you can either use:

* The [installer](bonita-bpm-studio-installation.md) for your operating system (Windows, Mac OS, Linux). 
Used to install Bonita BPM Studio (using a wizard) on your computer. No configuration necessary.
* The [OS independant](bonita-bpm-studio-installation.md#all_os) package. Used to manually set up Bonita BPM Studio. 
The package contains the individual launchers in one .zip file, and creates the same installation environment as the installers.

### Bonita BPM Platform

**Note:** If you have **already installed ** a Community edition or a Subscription edition, 
and want to migrate to the latest version version, follow the instructions to [migrate your platform](migrate-from-an-earlier-version-of-bonita-bpm.md).

You have two options to install a Bonita BPM Platform:

* If you have not already installed a Java application server, you can get one of our bundles, [JBoss + Bonita BPM](jboss-bundle.md) or [Tomcat + Bonita BPM](tomcat-bundle.md), 
ready to be used out of the box.
* If you have an existing application server installation (for example JBoss or Tomcat), 
you can use the [Deploy bundle.](deploy-bundle.md)

For all options, you will need to [configure](database-configuration.md) Bonita BPM Engine to work with the database of your choice (e.g. PostgreSQL or Oracle).

For detailed information on the Supported Environment Matrix, see the [Support Guide](https://customer.bonitasoft.com/support-policies) or [ask to be contacted by our commercial team](http://www.bonitasoft.com/be-part-it/contact-us).