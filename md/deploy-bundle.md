# Deploy bundle

## What is the purpose of the Bonita BPM Deploy bundle?

* The Bonita BPM Deploy bundle is used if you have **already installed a JEE Application Server**.
* The Bonita BPM Deploy bundle is a way of setting up a Bonita BPM Platform. You'll be able to get a setup quite similar to Wildfly or Tomcat bundle.
* It's also used to package other tools such as the LDAP synchronizer.

## Deploy bundle content

* `BonitaBPMSubscription-`_`version`_`-LDAP-Synchronizer`: the LDAP Synchronizer (Subscription editions only).
* `Wildfly-`_`version`_: a folder/file structure to be merged with an existing setup of Wildfly in order to install Bonita BPM Portal and Bonita BPM Engine.
* `License`: license files that apply to Bonita components.
* `Request_key_utils-6.0`: include script files to generate license request keys.
* `Tomcat-`_`version`_: a folder/file structure to be merged with an existing setup of Apache Tomcat, in order to install Bonita BPM Portal and Bonita BPM Engine.
<a id="platform_setup_tool" />
* `platform-setup`: a command-line tool that creates the Bonita BPM platform before it can be run. It creates the Bonita BPM platform internal database, and stores the runtime configuration.
It is useful to update the configuration, locally or from a remote computer.
* `README.TXT`: contains the detailed contents and structure of the `deploy.zip`.

## Installation

1. Download the deploy.zip file from the [Bonitasoft download page](http://www.bonitasoft.com/downloads-v2) for the Community edition 
or from the [Customer Portal](https://customer.bonitasoft.com/download/request) for Subscription editions.
2. Unzip the `deploy.zip` into a temporary folder.
3. Install Bonita BPM in your Application Server, by merging the appropriate folder (e.g. `Wildfly-9.0.2.Final` or `Tomcat-7.0.55`) from `BonitaBPMSubscription-6.x.y-deploy` folder 
into the existing root folder of your application server.
4. If you do not want to use the h2 database, you need to specify the [database configuration](database-configuration.md). The h2 database is not suitable for a production environment.

## License installation

If you are installing a Subscription edition, you need to [request a license](licenses.md). 

When you receive your license, copy the file to the `setup/platform_conf/licenses` folder of your application server.

## Edition specification

If you are installing the Performance Subscription edition, 
you need to edit [`bonita-platform-init-community-custom.properties`](BonitaBPM_platform_setup.md)
and change the value of the `activeProfiles` key to `'community,performance'`. No change is needed for the Community, Teamwork, or Efficiency edition.

## Next steps

When you have finished installing the deploy bundle, [complete the setup](first-steps-after-setup.md) of your system by validating the installation, setting passwords, and creating the Administrator user.
