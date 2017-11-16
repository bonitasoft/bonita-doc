# Release notes

## Bonita BPM becomes Bonita
Bonita's mission is to provide a platform allowing our customers to create highly tailored digital user experiences for their customers and employees. This is the reason why, while staying strongly process-based, the scope of the platform opens, and so is its name.
Simply Bonita.

## New values added

<a id="living-application-development-and-deployment"/>

### Industrialization of Living Applications in Bonita Studio: Profiles
Our goal is to provide you with as few deployment artifacts as possible when creating applications.  
To achieve this, we need all application resources to be available in the Studio / UI Designer development suite.  
After application descriptors, profiles are now available in Bonita Studio.  
In Teamwork editions, you can edit the default profiles mapping with organization entities.  
In Efficiency and Performance editions, you can also create custom profiles, map them to the organization, and create their Bonita Portal menus if needed.  

### Process display name
It is now possible to add a display name for a process, so the development team can still use the technical "name" for a Pool in Bonita Studio and provide a readable name for users in Bonita Portal. If not set, the technical name is used.

### SAML logout
SAML logout has been implemented, so that a user logging out of Bonita is also loggued out of all applications managed by the compagny Single-Sign-On system.

### New API method to protect task assignation
As an alternative to the current API method, a new method has been developped to prevent AssignHumanTasks to overwrite assignee programmatically. For more information, go to the Java doc.

## Improvements

<a id="ui-designer-performance"/>

### UI Designer performance improvement: artifacts loading and display
#### Performance at first display
* Widgets JavaScript has been minified and contatenated.  
Such optimized versions of the widgets are now part of the .zip file exported from the UI Designer. At runtime the minified versions are used to improve display performance of pages.  
The standard vesion of the widgets is also available in the .zip archive if you need to edit it outside of the UI Designer.  
Reminder: such edited JavaScript won't be readable back to the UI Designer, and you will need to take minification in charge to optimize display performances.  
The exported .zip still contains the JSON file, and this is the file used by the UI Designer.

* Living Application layout doesn't reload when user selects another menu option
As a consequence, the new content is displayed faster.  
Attention: if your applications layout is based on the default layout, see how to [update your custom layout](customize-living-application-layout.md#improve-navigation) to take advantage of this improvement.
  
* If your pages call REST API extensions on BDM data, a new documentation page has been created to help you make them as efficient as possible.

Performances on realistic pages show a 20% improvement with an Ethernet connection, and a 40% improvement on 3G.

#### Performance at following displays
* Pages and forms resources are now saved in the browser cache.  
Cache has been set to 6 months, but this is configurable.

* Cache-busting has been implemented 
As a consequence, any udpate in application artefacts is automatically visible by end users.  
Attention: if you create or edit artifacts outside of the UI Designer, you will need to udpate the artifacts URL to trigger the cache-busting mechanism to reflect the updates.

Performances on realistic pages show a 33% improvement with an Ethernet connection, and a 86% improvement on 3G.

<a id="engine-start-performance"/>

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

<a id="techonolgy-updates"/>

## Technology updates
* Bonita Studio now runs on Eclipse Oxygen (4.7).
* The supported Tomcat version for this new release is Tomcat 8.5.23 (included in the bundle).
* The product now supports SQLServer 2016.
* The SQLServer connector has changed, there is now a single connector, that supports sqlserver 2008, 2012, 2014 & 2016.
* The product now supports being run on Ubuntu 16.04.


<a id="feature-removals"/>

## Feature removals

### Early warning: v6 forms removal in 2018
Attention: In Bonita version released at the end of 2018, V6 GWT forms won't be available for modeling or execution.  
By then, we strongly advise you to switch to forms created with Bonita UI Designer to benefit from technologies like html/AngularJS and use contracts in tasks and process instantiation.

### Studio profiles
Developer and Business Analyst profiles in the studio have been removed.  
Now all features are available to all users.

### Connectors
* SugarCRM version API v4 has been **removed**: newer versions of [SugarCRM expose a REST API](http://support.sugarcrm.com/Documentation/) that should be used with the REST connector.
* [SAP Connector (jco2)](sap-jco-2.md) has been **removed from Community edition** due to license incompatibility.
* Talend connectors have been **removed**: newer versions of [Talend expose a REST API](https://help.talend.com/reader/ISPDm8GQ6s0HN0348QulWg/HF8MMjUq3bllDlzOz2lqxw) that should be used with the REST connector.
* Google Calendar v2 connectors have been **removed**: v2 API are not more supported by Google, use Google Calendar v3 instead.

::: info
**Migration**: in order to migrate processes using those connectors, you will have to export those connectors from a previous Bonita Studio version and re-import them.
:::

### Deprecated BDM API
Since 7.0, BDM APIs and model classes in `com.bonitasoft.engine.bdm.*` packages were deprecated in favor of the Community version in `org.bonitasoft.engine.bdm.*` packages.  
They have been removed in this release.  
If you use a client Java application depending on Engine APIs / models in `com.bonitasoft.engine.bdm.*`, simply change the import declaration with `org.bonitasoft.engine.bdm.*` when upgrading to 7.6.0+.

### Configuration: ```platform_init_engine/bonita-platform-init-community-custom.properties``` file
In previous versions, this file needed to be updated to activate the archive configurability feature (Performance edition).  
The configuration is now easier: the feature is activated by default when using the Performance edition and the file
has been removed.

::: info
**Note**: the migration process automatically removes this file from an existing configuration
:::


## API behavior change
* Change method [updateGroup()](https://documentation.bonitasoft.com/javadoc/api/7.6/org/bonitasoft/engine/api/GroupAPI.html#updateGroup-long-org.bonitasoft.engine.identity.GroupUpdater-) in identityAPI to forbid group name update when new name already exists.


## Limitations and known issues

* Process display name is now used everywhere in Bonita portal (when it has been set in the process design) except in the default provided Jasper reports.

## Bug fixes

### Fixes in Bonita 7.6.1

#### Fixes in Web component
* BS-17449 Do not list profiles without ProfileEntry in Portal.

### Fixes in Bonita 7.6

#### Fixes in Documentation
* BS-17479 IE11 missing from 7.5 list of supported browsers

#### Fixes in Engine component
* BS-15944	StaleObjectStateException: Row was updated or deleted by another transaction or unsaved-value mapping was incorrect
* BS-15960	Using REST API to call BDM decreases the performance
* BS-15975	process instance id and flownode instance id not found when executing the work for the Start event
* BS-16519	Inconsistent behavior of Bonita Portal for multiple group with same name
* BS-16595	"My Tasks" view displays executing tasks
* BS-16791	Can not have two extensions within the same REST API extension definition if one's pathTemplate is a prefix of the other's
* BS-16868	Robustness: When there is communication issues with database sever, the works are lost
* BS-16960	Issue with REST Connector stuck on sockRead no default timeout.
* BS-16969	No license error in the logs when the performance activeProfile is set but the license is not performance
* BS-16999	Cannot use $ and \ character for password defined in database.properties and use by setup tool

#### Fixes in Studio component
* BS-16686	Studio migration 7.5 result in empty workspace
* BS-16928	Links to documentation on Studio welcome page lead to the wrong doc version
* BS-16971	Provided engine varaibles are not available in pattern expression completion
* BS-17047	BDM pom generated from studio does not have all required dependencies
* BS-17049	Groovy script size limited to 64k
* BS-17067	unable to create a new parameter from connector config
* BS-17093	Expression editor return type set at null
* BS-17127	Focus problem on CTRL+f search pop-up in groovy script editor
* BS-17154	Installer try to load invalid URL on macOS
* BS-17156	.bar file generation failed: corrupted .proc file
* BS-17199	"select / unselect all" buttons from export organization dialog box do not refresh validation status
* BS-17206	CTRL+A does not work in pattern expression editor
* BS-17210	Download defaut confirmation layout does not work for V6 forms
* BS-17299	Call activity Data to send fetch Data button throw error and broken empty popup
* BS-17447	"Multiple Document" type lost in migration and operation fails

#### Fixes in UIDesigner component
* BS-16708	Time picker doesn't behave the same if, in the date picker, a date is selected or if Today is selected
* BS-16923	Time picker is not user friendly
* BS-16977	Link widget additional url parameters are not passed (based on a contribution of a Community member)
* BS-16983	File viewer and link widget use wrong docbase URL to display document
* BS-16996	External System Document not usable in file viewer widget or Overview
* BS-17278	Cannot update custom widget property

#### Fixes in Web component
* BS-15960	Using REST API to call BDM decreases the performance
* BS-16519	Inconsistent behavior of Bonita Portal for multiple group with same name
* BS-16595	"My Tasks" view displays executing tasks
* BS-16791	Can not have two extensions within the same REST API extension definition if one's pathTemplate is a prefix of the other's
* BS-16097	Dynamic CaseContextPermissionRule implementation always provides access when requested by an archived case
* BS-16234	Download servlets not secured by authorization filter + dynamic rule invalid
* BS-16324	Living Application ressources are not cached
* BS-16449	Administrator "Do for" raises a 403 error when security.rest.api.authorizations.check.enabled is set to false
* BS-16481	Process Manager profile can't Edit case variable
* BS-16678	Portal displays "Successfully updated categories" when the category is not created
* BS-16685	Executing a task or instantiating a process from Mobile Portal redirects to Portal
* BS-16774	Get HTTP 400 Error page, on redirect after submit task in the portal and on Mobile
* BS-16790	ClientAbortException are generated in the log files when a submit button redirect on success on an application page
* BS-16858	Pager empty pager_bottom using Bonita Wildfly Bundle in HTTPS in Chrome
* BS-16929	Security Issue: Autocomplete Enabled inForm
* BS-16953	CustomPage servlets do not set a content-type in the response
* BS-16992	CannotResolveClassException: org.apache.catalina.util.ParameterMap on engine on Wildfly when portal is on separate Tomcat
* BS-17176	new line in human step comment are lost when the comment is displayed in the portal
* BS-17204	Layout iframe always display a border
* BS-17231	CSRF token cookie missing when accessing a form URL directly after loging in with SAML

#### Acknowledgments
Thank you [Dominique Toupin](https://github.com/domtoupin) (Engine) and [Antoni Pàmies](https://github.com/tonipamies) (UI Designer) for your contribution. 

