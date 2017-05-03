# Deploy bundle

## What is the purpose of the Bonita BPM Deploy bundle?

* The Bonita BPM Deploy bundle is used if you have **already installed a Java EE Application Server**.
* The Bonita BPM Deploy bundle is a way of setting up a Bonita BPM Platform. You'll be able to get a setup quite similar to WildFly or Tomcat bundle.
* It's also used to package other tools such as the LDAP synchronizer.

## Deploy bundle content

* `Tomcat-`_`version`_: a folder/file structure to be merged with an existing setup of Apache Tomcat, in order to install Bonita BPM Portal and Bonita BPM Engine.
* `Wildfly-`_`version`_: a folder/file structure to be merged with an existing setup of WildFly in order to install Bonita BPM Portal and Bonita BPM Engine.
<a id="platform_setup_tool" />
* `setup`: a command-line tool that creates the Bonita BPM platform before it can be run. It creates the Bonita BPM platform internal database, and stores the runtime configuration.
It is useful to update the configuration, locally or from a remote computer.
* `Request_key_utils-`_`key_utils.version`_: include script files to generate license request keys.
* `LDAP-Synchronizer-`_`LDAPSync.version`_: LDAP synchronizer to synchronize your organization in Bonita with your LDAP
* `cas-`_`cas.version`_`-module`: Module files and description to enable CAS dependency to bonita EAR.
* `License`: license files that apply to Bonita components.
* `README.TXT`: See this file for more details about the `deploy.zip` contents and structure. 

## Installation

1. Download the deploy.zip file from the [Bonitasoft download page](http://www.bonitasoft.com/downloads-v2) for the Community edition 
or from the [Customer Portal](https://customer.bonitasoft.com/download/request) for Subscription editions.
2. Unzip the `deploy.zip` into a temporary folder.
3. Install Bonita BPM in your Application Server, by merging the appropriate folder (e.g. `Wildfly-10.1.0.Final` or `Tomcat-7.0.67`) from `BonitaBPMSubscription-x.y.z-deploy` folder
into the existing root folder of your application server.
4. Follow the [Tomcat bundle steps](tomcat-bundle.md#configuration) or [WildFly bundle steps](wildfly-bundle.md#configuration)

## License installation

If you are installing a Subscription edition, you need to [request a license](licenses.md). 

When you receive your license, copy the file to the `setup/platform_conf/licenses` folder of your application server.

## Next steps

When you have finished installing the deploy bundle, [complete the setup](first-steps-after-setup.md) of your system by validating the installation, setting passwords, and creating the Administrator user.
