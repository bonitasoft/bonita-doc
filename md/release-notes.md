# Release notes
-----
[ to remove at Beta time ]
Don't forget to link your announcement to documentation pages that tell more about them.
We have forgotten that in 7.5
-----
<a id="living-application-development-and-deployment"/>

## Living Application development and deployment


### Industrialization of Living Application (in Studio)

## Performance improvements

### Engine startup and BPM Services resume

A major improvement has been integrated in Bonita 7.6.0, especially for tenants with a lot of processes, processes with large dependencies or processes with a
lot of dependencies

Tests conducted both internally at Bonitasoft and on customer sites with real production data have shown the following decreases
* execution time by a factor of 5 to 10
* JVM Heap memory consumption by a factor of 2 to 3

### Living Application

To be documented

### Button widget and forms integration improvements

The integration of the forms/pages in Bonita (mobile) Portal or applications and the behavior of the Button widget have been improved in order to:
- avoid redirecting the current window when the form submitted is displayed in the (mobile) portal and in the applications (issues [BS-16774](https://bonitasoft.atlassian.net/browse/BS-16774) and [BS-16790](https://bonitasoft.atlassian.net/browse/BS-16790) )
- ignore the target URL on success when the form submitted is displayed in the (mobile) portal (issue [BS-16685](https://bonitasoft.atlassian.net/browse/BS-16685) ).
In addition to those improvements, an embedded help as been added to the Button widget in the UI Designer, explaining this behavior.

## Technology updates

* The supported Tomcat version for this new release is Tomcat 8.5.23 (included in the bundle).
* The product now supports SQLServer 2016.
* The SQLServer connector has changed, there is now a single connector, that supports sqlserver 2008, 2012, 2014 & 2016.
* The product now supports being run on Ubuntu 16.04.

### Removed support

#### Internet Explorer 11

### Other dependency updates

### API removals

#### BDM Api removal
Since 7.0, BDM APIs and model classes in `com.bonitasoft.engine.bdm.*` packages are deprecated in favor of the Community version in `org.bonitasoft.engine.bdm.*` packages.  
They have been removed in this release.  
If you use a client Java application depending on Engine APIs / models in `com.bonitasoft.engine.bdm.*`, simply change the import declaration with `org.bonitasoft.engine.bdm.*`
when upgrading to 7.6.0+.

### Configuration changes

#### Removal of the ```platform_init_engine/bonita-platform-init-community-custom.properties``` file

In previous versions, this file should be updated to activate the archive configurability feature (Performance edition).  
The configuration is now easier: the feature is activated by default when using the Performance edition and the file
has been removed.

__Note__: the migration process automatically removes this file from an existing configuration


## Breaking changes

### API
* BS-16519: Change method [updateGroup()](https://documentation.bonitasoft.com/javadoc/api/7.6/org/bonitasoft/engine/api/GroupAPI.html#updateGroup-long-org.bonitasoft.engine.identity.GroupUpdater-) in identityAPI to forbid group name update when new name already exists.

### Connectors
* SugarCRM version API v4 has been **removed**: newer versions of [SugarCRM expose a REST API](http://support.sugarcrm.com/Documentation/) that should be used with the REST connector.
* [SAP Connector (jco2)](sap-jco-2.md) has been **removed from Community edition** due license incompatibility.
* Talend connectors has been **removed**: newer versions of [Talend expose a REST API](https://help.talend.com/reader/ISPDm8GQ6s0HN0348QulWg/HF8MMjUq3bllDlzOz2lqxw) that should be used with the REST connector.
* Google Calendar v2 connectors has been **removed**: v2 API are not more supported by Google, use Google Calendar v3 instead.

::: info
**Migration**: in order to migrate processes using those connectors, you will have to export those connectors from a previous Bonita Studio version and re-import them.
:::


### Forms, pages, layouts CSS cleaned
* Application layout performance improvement. It now allows to navigate between pages without reloading the entire page.  
  See how to [update your custom layout](customize-living-application-layout.md#improve-navigation) to take advantage of this improvement.


## Limitations and known issues

* Process display name is now used everywhere in Bonita portal (when it has been set in the process design) except in the default provided Jasper reports.

## Bug fixes

### Fixes in Bonita 7.6

#### Acknowledgments

Thanks to [Dominique Toupin](https://github.com/domtoupin) (Engine) and [Antoni Pàmies](https://github.com/tonipamies) 
(UI Designer) for their contributions.  

#### Fixes in Documentation

#### Fixes in Engine component

#### Fixes in Studio component

#### Fixes in Web component


## Bug fixes 

