# Release notes

<a id="living-application-development-and-deployment"/>

## Bonita BPM becomes Bonita
Bonita's mission is to provide a platform allowing our customers to create highly tailored digital user experiences for their customers and employees. This is the reason why, while staying strongly process-based, the scope of the platform opens, and so is its name.
Simply Bonita.

## New values added

### Industrialization of Living Application in Bonita Studio: Profiles
Our goal is to provide you with as few deployment artifacts as possible when creating applications.
To achieve this, we need all application resources to be available in the Studio / UI Designer development suite.
After application descriptors, profiles are now available in Bonita Studio.
In Teamwork editions, you can edit the default profiles mapping with organization entities.
In Efficiency and Performance editions, you can also create custom profiles, map them to the organization, and create their Bonita Portal menus if needed.
/!\Profiles are bundled in files of profiles, to allow to create a file of profiles per target environment / target organization.

### Process display name
It is now possible to add a display name for a process, so the development team can still use the technical "name" for a Pool in Bonita Studio and provide a readable name for users in Bonita Portal. If not set, the technical name is used.

### SAML logout
SAML logout has been implemented, so that a user logging out of Bonita is also loggued out of all applications managed by the compagny Single-Sign-On system.

### New API method to protect task assignation
As an alternative to the current API method, a new method has been developped to prevent AssignHumanTasks to overwrite assignee programmatically. For more information, go to the Java doc.

## Improvements

### UI Designer performance improvement: artifacts loading and display
#### Performance at first display
1. Widgets JavaScript has been minified and contatenated.
Such optimized versions of the widgets are now part of the .zip file exported from the UI Designer. At runtime the minified versions are used to improve display performance of pages.
The standard vesion of the widgets is also available in the .zip archive if you need to edit it outside of the UI Designer.
Reminder: such edited JavaScript won't be readable back to the UI Designer, and you will need to take minification in charge to optimize display performances.
The exported .zip still contains the JSON file, and this is the file used by the UI Designer.

2. Living Application layout doesn't reload when user selects another menu option
As a consequence, the new content is displayed faster.
Attention: if your applications layout is based on the default layout, to benefit from this enhancement, you need to export the new default layout, apply your customization, and update the layout in the application.

3. If your pages call REST API extensions on BDM data, a new documentation page has been created to help you make them as efficient as possible.

Performances on realistic pages show a 20% improvement with an Ethernet connection, and a 40% improvement on 3G.

#### Performance at following displays
1. Pages and forms resources are now saved in the brwoser cache.
Cache has been set to 6 months, but this is configurable.

2. Cache-busting has been implemented 
As a consequence, any udpate in application artefacts is automatically visible by end users
Attention: if you create or edit artifacts outside of the UI Designer, you will need to udpate the artifacts URL to trigger the cache-busting mechanism to reflect the updates.

Performances on realistic pages show a 33% improvement with an Ethernet connection, and a 86% improvement on 3G.

### Engine performance improvement: startup and BPM Services resume
A major improvement has been integrated, especially for tenants with a lot of processes, processes with large dependencies or processes with a lot of dependencies.

Tests conducted both internally at Bonitasoft and on customer's sites with real production data have shown the following decreases
* execution time by a factor of 5 to 10
* JVM Heap memory consumption by a factor of 2 to 3

### Workspace import moved to a menu in Bonita Studio
Importing an existing workspace into a new version of the studio is no more available in the installer: it has been moved to a new menu "File > Import > Workspace..." in the studio, and is automatically prompted on the first start of the studio.

### Button widget and forms integration improvements
The integration of the forms/pages in Bonita (mobile) Portal or applications and the behavior of the Button widget have been improved in order to:
 - avoid redirecting the current window when the form submitted is displayed in the (mobile) portal and in the applications
 - ignore the target URL on success when the form submitted is displayed in the (mobile) portal.
In addition to those improvements, an embedded help as been added to the Button widget in the UI Designer, explaining this behavior.

### User management page in Administrator Portal is all new 
To insure the move of all Bonita Portal pages to AngularJS, the User "more" page in the Administrator Portal has been redesigned and reimplemented.

### Time picker improvement
We brought a little more consistency to time picking in our date/time picker widget: if no time has been set, clicking on button "Today", "Now", or picking a date in the calendar sets the time to "now". If a time has been set, the button "Today" or a date picked in the calendar don't change it, whereas the button "Now" changes it to "now".

### "Initiator" switch for actors
When defining actors in a pool, it is now possible to remove the "initiator" tag of an actor instead of moving the tag to another actor.

### UI Designer properties autocomplete for variables
Autocomplete capacity has been added in UI Designer properties fields, to help you input variable names with no risk of typos anymore.

### Button widget and forms integration improvements

The integration of the forms/pages in Bonita (mobile) Portal or applications and the behavior of the Button widget have been improved in order to:
- avoid redirecting the current window when the form submitted is displayed in the (mobile) portal and in the applications 
- ignore the target URL on success when the form submitted is displayed in the (mobile) portal 
In addition to those improvements, an embedded help as been added to the Button widget in the UI Designer, explaining this behavior.

## Technology updates
* The supported Tomcat version for this new release is Tomcat 8.5.23 (included in the bundle).
* The product now supports SQLServer 2016.
* The SQLServer connector has changed, there is now a single connector, that supports sqlserver 2008, 2012, 2014 & 2016.
* The product now supports being run on Ubuntu 16.04.

## Feature removals

### Early warning: v6 forms removal in 2018
Attention: By the end of 2018, V6 GWT forms won't be available for modeling or execution.
We strongly advise you to switch to forms created with Bonita UI Designer to benefit from technologies like html/AngularJS and use contracts in tasks and process instantiation.

### Old connectors 
Google Calendar v2 connector, Sugar CRM connector, and Talend connector have been removed from Bonita.
SAP connector has been removed from the Community edition.

### Studio profiles
Developer and Business Analyst profiles in the studio have been removed.
Now all features are available to all users.

### Other dependency updates

### API removals

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


#### Fixes in Documentation

#### Fixes in Engine component

#### Fixes in Studio component

#### Fixes in Web component

#### Acknowledgments
Thank you [Dominique Toupin](https://github.com/domtoupin) (Engine) and [Antoni Pàmies](https://github.com/tonipamies) (UI Designer) for their contributions. 

