# Release notes

## Bonita BPM becomes Bonita
Bonita's mission is to provide a platform allowing our customers to create highly tailored digital user experiences for their customers and employees. This is the reason why, while staying strongly process-based, the scope of the platform opens, and so is its name.
Simply Bonita.

## New values added

<a id="living-application-development-and-deployment"/>

### Industrialization of Living Applications in Bonita Studio: Profiles
Our goal is to provide you with as few deployment artifacts as possible when creating applications.  
To achieve this, we need all application resources to be available in the Studio / UI Designer development suite.  
After application descriptors, [profiles](profileCreation.md) are now available in Bonita Studio.  
In Teamwork editions, you can edit the default profiles mapping with organization entities.  
In Efficiency and Performance editions, you can also create custom profiles, map them to the organization, and create their Bonita Portal menus if needed.  

### Process display name
It is now possible to add a display name for a process, so the development team can still use the technical "name" for a Pool in Bonita Studio and provide a readable name for users in Bonita Portal. If not set, the technical name is used.

### SAML logout
[SAML logout](single-sign-on-with-saml.md) has been implemented, so that a user logging out of Bonita is also loggued out of all applications managed by the compagny Single-Sign-On system.

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
* The product now supports Windows Server 2016 and SQLServer 2016.
* The SQLServer connector has changed, there is now a single connector, that supports sqlserver 2008, 2012, 2014 & 2016.
* The product now supports being run on Ubuntu 16.04.

### Other dependency updates
* Hazelcast is updated to Hazlecast 3.8.1 (SP), to improve clustering
types of installation


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

* MacOS environment: starting from MacOS El Capitan 10.11.4 (March 2016), new security rules block the launch of Bonita Studio. You must temporarily remove security on App launching in **System Preferences**>**Security & Confidentiality**.
* Process display name is now used everywhere in Bonita Portal (when it has been set in the process design) except in the default provided Jasper reports.
* The default living application layout does not re-encode the URL passed to the living application iframe anymore.

## Bug fixes

### Fixes in Bonita 7.6.3

#### Fixes in Documentation
* BS-17930 Documentation about 'Changing technical user' needs more detailed explanations
* BS-18134 Workaround or guidance missing for time-zoned Java 8 Date types usage in REST API extensions

#### Fixes in Engine component
* BS-17976 URL query string parsing on parameter 'filter' is too strict in dynamic security scripts
* BS-17977 apiAccessor.processAPI.updateDueDateOfTask doesn't do anything after migration to 7.6.1
* BS-18003 Engine should not try to delete event trigger instance on flownodes that don't have any
* BS-18017 Task Due date is always reset by the engine even if no expression is set

#### Fixes in Studio component
* BS-16454 Cannot initialize a business object with a query with parameters - value not saved in Studio
* BS-17965 Redeploy profile (after rename) fails if some deployed artifacts are using this profile
* BS-18113 Process configuration failed to migrate anonymousUserName and anonymousPassword

#### Fixes in UI Designer component
* BS-18008 UI Designer fail to load default widgets when running in Turkish environment
* BS-18012 SELECT widget sets NULL value when no element selected

#### Fixes in Web component
* BS-17668 Hamburger button should not be displayed in layout when there are no menu
* BS-17927 Typo in the TaskList's page.properties file, generates an error at Edit in the Portal
* BS-18020 Cache is enabled on REST APIs when called through Custom Pages

### Fixes in Bonita 7.6.2

#### Fixes in Documentation
* BS-17902 Broken link in documentation

#### Fixes in Engine component
* BS-13653 Unique index in group_ table contains nullable fields
* BS-17456 Connector Generate pdf from and office document (document-converter) fails in Widlfly

#### Fixes in Studio component
* BS-17819 Diagram view in portal displays 3rd lane collapsed over 2nd lane
* BS-17859 Rename a duplicated default profile in the Studio leads to en error
* BS-17898 Studio does not exit nicely when calling workspace API without a valid license

#### Fixes in UI Designer component
* BS-17623 UID artifacts using UI Bootstrap migrated at Studio import time no longer work
* BS-17852 Previewing a Fragment delete the associated .json file

#### Fixes in Web component
* BS-17694 Mobile portal doesn't show "Unable to log in' when credentials are wrong on Widlfly 
* BS-17714 Translation key missing for "Process: " string in case's "More details" portal page
* BS-17733 'Content-Disposition' header is filtered by RESTlet in REST API Extension
* BS-17736 Default jaas-standard.cfg unclear in setup tool vs server/conf
* BS-17826 bdm/businessData/ API returns response of type "text/plain" instead of "application/json"

### Fixes in Bonita 7.6.1

#### Fixes in Documentation
* BS-16698 Links to nowhere in the 'Execute REST calls and integrate the results in your application'
* BS-16862 Cannot fully deploy a REST API extension with Engine APIs
* BS-17598 "Create your own password validator" steps lead to maven error: Could not find artifact
* BS-17659 "BDM Management in Bonita Portal" section leads customer to believe updating the BDM in production is supported
* BS-17699 Broken link to 7.6 Engine Javadoc
* BS-17770 Studio preferences Documentation still speaks about Studio profiles
* BS-17795 Single sign-on with SAML not described with WildFly

#### Fixes in Engine component
* BS-344 Admin / Failed Task / Connectors are not listed in the execution order specified in process definition
* BS-16047 Hibernate Sql Server dialect implementation doesn't set the Datatype to nvarchar automatically in the BDM fuctionnality
* BS-16189 updateActorsOfUserTask break idx_uq_pending_mapping unique constraint
* BS-16985 searchAssignedTasksSupervisedBy() returns duplicate tasks
* BS-17054 Engine API: getUsersInGroup() returns both active and inactive users
* BS-17106 In admin/tasks, "Pending" view should not display executing tasks
* BS-17251 apiAccessor.processAPI.getHumanTaskInstances doesn't work in a call activity
* BS-17304 Cannot use "\" character for database name defined in database.properties and used by setup tool
* BS-17312 Incorrect exception message for invalid multiple contract input
* BS-17373 Java API client library issue with LocalDate Serialization
* BS-17449 Profiles drop down list on the Portal also displays profiles used only for applications
* BS-17530 getProcessDefinitionIdFromProcessInstanceId() always logs stack trace if exception raised
* BS-17533 Same user returned several times as a possible process initiator in administrator view
* BS-17589 BDM REST api returns all elements when doing a query with parameter c=0

#### Fixes in Studio component
* BS-1758 SVN synchronization problem with REST API extension
* BS-17646 Cannot create a repository with same name but different case
* BS-17664 Groovy editor completion crash
* BS-17665 On MacOS, installer always uses the same path, no matter the version (7.6.0 and higher)
* BS-17682 In application descriptor App or Portal "menu", clicking out of the table doesn't save the modification
* BS-17703 Import workspace doesn't work if repository name contains a space (Windows only)

#### Fixes in UI Designer component
* BS-16235 Action "Remove from collection" doesn't delete the correct item
* BS-17669 "Create form" tooltip not translated

#### Fixes in Web component
* BS-2919 2 comments are added when assigning a task as admin (duplicates the following issue)
* BS-16010 Organization manager cannot be removed from Portal
* BS-16690 Double click on process "Delete" button generates error in logs
* BS-17317 Assigning task as Administrator produces double "task is now assigned" comments
* BS-17449 Profiles drop down list on the Portal also displays profiles used only for applications
* BS-17604 By default, import servlets are not filtered by authorization mechanism

### Fixes in Bonita 7.6

#### Fixes in Documentation
* BS-16697 internal.properties doc still not enough
* BS-16862 Cannot fully deploy a REST API extension with Engine APIs
* BS-16884 bpm/processSupervisor missing in the documentation
* BS-16955 Link from 7.3+ documentation website to Corporate blog/news is incorrect
* BS-16970 Install a Bonita BPM cluster Doc page unclear
* BS-17061 Missing doc info: diagram REST API is only available in Subscription edition
* BS-17251 apiAccessor.processAPI.getHumanTaskInstances doesn't work in call activity
* BS-17479 IE11 missing from 7.5 list of supported browsers
* BS-17527 Javadoc navigation bars rendering glitch
* BS-17598 "Create your own password validator" steps lead to maven error: Could not find artifact

#### Fixes in Engine component
* BS-11460 Slowness in retrieving Dependencies blocks server from starting up
* BS-15944 StaleObjectStateException: Row was updated or deleted by another transaction or unsaved-value mapping was incorrect
* BS-15960 Using REST API to call BDM decreases the performance
* BS-15975 process instance id and flownode instance id not found when executing the work for the Start event
* BS-16519 Inconsistent behavior of Bonita Portal for multiple group with same name
* BS-16595 "My Tasks" view displays executing tasks
* BS-16612 Re-Import organisation file: errors and duplicate if some element name contains slash character
* BS-16791 Can not have two extensions within the same REST API extension definition if one's pathTemplate is a prefix of the other's
* BS-16862 Cannot fully deploy a REST API extension with Engine APIs
* BS-16868 When there is communication issues with database sever, the works are lost
* BS-16960 Issue with REST Connector stuck on sockRead no default timeout.
* BS-16969 No license error in the logs when the performance activeProfile is set but the license is not performance
* BS-16980 spring-web-4.3.7.RELEASE.jar requires more recent version of jackson than the ones included in the bonita.war
* BS-16999 Cannot use $ and \ character for password defined in database.properties and use by setup tool
* BS-17527 Javadoc navigation bars rendering glitch

#### Fixes in Studio component
* BS-16686 Studio migration 7.5 result in empty workspace
* BS-16928 Links to documentation on Studio welcome page lead to the wrong doc version
* BS-16971 Provided engine variables are not available in pattern expression completion
* BS-16991 Not possible to remove "initiator" flag on an actor in the Studio
* BS-17047 BDM pom generated from studio does not have all required dependencies
* BS-17049 Groovy script size limited to 64k
* BS-17067 Unable to create a new parameter from connector config
* BS-17093 Expression editor return type set at null
* BS-17121 Workspace API succeeds to build on rare ocassions
* BS-17127 Focus problem on CTRL+f search pop-up in groovy script editor
* BS-17154 Installer try to load invalid URL on macOS
* BS-17156 .bar file generation failed: corrupted .proc file
* BS-17199 "select / unselect all" buttons from export organization dialog box do not refresh validation status
* BS-17206 CTRL+A does not work in pattern expression editor
* BS-17210 Download defaut confirmation layout does not work for V6 forms
* BS-17299 Call activity Data to send fetch Data button throw error and broken empty popup
* BS-17447 "Multiple Document" type lost in migration and operation fails

#### Fixes in UIDesigner component
* BS-16708 Time picker doesn't behave the same if, in the date picker, a date is selected or if Today is selected
* BS-16854 Part of "Filters" embedded help is not translated
* BS-16923 Put only 1 proposal instead of 3 in time picker
* BS-16977 Link widget additional url parameters are not passed (based on a contribution of a Community member)
* BS-16983 File viewer and link widget use wrong docbase URL to display document
* BS-16996 External System Document not usable in file viewer widget or Overview
* BS-17278 Cannot update custom widget property
* BS-17526 Label property of input widget has not correct type

#### Fixes in Web component
* BS-15849 Internal Server Error in Report when report has a space, and clicking on date range.
* BS-15960 Using REST API to call BDM decreases the performance
* BS-16097 Dynamic CaseContextPermissionRule implementation always provides access when requested by an archived case
* BS-16234 Download servlets not secured by authorization filter + dynamic rule invalid
* BS-16324 Living Application ressources are not cached
* BS-16449 Administrator "Do for" raises a 403 error when security.rest.api.authorizations.check.enabled is set to false
* BS-16481 Process Manager profile can't Edit case variable
* BS-16519 Inconsistent behavior of Bonita Portal for multiple group with same name
* BS-16595 "My Tasks" view displays executing tasks
* BS-16612 Re-Import organisation file: errors and duplicate if some element name contains slash character
* BS-16678 Portal displays "Successfully updated categories" when the category is not created
* BS-16685 Executing a task or instantiating a process from Mobile Portal redirects to Portal
* BS-16756 Resize window cuts the Instantiation form
* BS-16774 Get HTTP 400 Error page, on redirect after submit task in the portal and on Mobile
* BS-16790 ClientAbortException are generated in the log files when a submit button redirect on success on an application page
* BS-16791 Can not have two extensions within the same REST API extension definition if one's pathTemplate is a prefix of the other's
* BS-16858 Pager empty pager_bottom using Bonita Wildfly Bundle in HTTPS in Chrome
* BS-16929 Security Issue: Autocomplete Enabled inForm
* BS-16953 CustomPage servlets do not set a content-type in the response
* BS-16980 spring-web-4.3.7.RELEASE.jar requires more recent version of jackson than the ones included in the bonita.war
* BS-16992 CannotResolveClassException: org.apache.catalina.util.ParameterMap on engine on Wildfly when portal is on separate Tomcat
* BS-17119 Cannot load ressources or classes from the custom Rest API
* BS-17176 new line in human step comment are lost when the comment is displayed in the portal
* BS-17204 Layout iframe always display a border
* BS-17207 Calendar Date picker + Suggest box v6 are not displayed under/above their input fields in Chrome v61 when the scroll bar is used
* BS-17231 CSRF token cookie missing when accessing a form URL directly after loging in with SAML
* BS-17285 Profile token loss makes "View case design" show blank page in Process Manager's Cases tab
* BS-17495 displayName Update breaks the view diagram
* BS-17550 Do not encode URL param on redirect in living application servlet
* BS-17574 v6 form broken when task name contains special character

#### Acknowledgments
Thank you [Dominique Toupin](https://github.com/domtoupin) (Engine) and [Antoni Pàmies](https://github.com/tonipamies) (UI Designer) for your contribution.

