
# Release notes

## New values added

<a id="acm"/>

### Adaptive Case Management with Bonita
It is now possible to create Living applications based on a mix of structured and unstructured processes. Users have more decision power on what to execute next, and can create their own task to adapt to a case specificities.
Open the Credit Card Dispute Resolution Management application from Bonita Studio welcome page, and [learn more](what-is-bonita.md).

<a id="monitoring"/>

### Monitoring
Bonita 7.10 now includes a brand new extensible [monitoring](runtime-monitoring.md) mechanism, in the form of a series of technical and Bonita-related metrics made available. Monitoring is crutial to ensure that Bonita runtime environment is correctly sized and tuned and  that it runs healthy.

<a id="guest-user"/>

### Guest User (Teamwork, Efficiency, Performance, and Enterprise editions only)
Opening the content of a living application to public access is now possible thanks to the new ["Guest User"](guest-user) feature. Used in process actor mappings, added to a custom profile to access applications, it allows anyone to access some public content.  
The Bonita application layout has been updated accordingly, to allow a Bonita user with credentials to log in from a public application and access password-protected content, if any.

<a id="deploy-project"/>

### Project deployment in Bonita Studio
The new _Deploy..._ action in Bonita Studio allows you to [deploy a whole project](project_deploy_in_dev_suite.md) (or a subset) in the embedded runtime environment, taking care of deploying all artifacts on the right order. Import a .bos file, clone a Git repository, or right click on the project name, click on _Deploy..._ and save a lot of time.

<a id="bdm-multi-package"/>

### Business Data Model handles multiple packages
Bonita 7.10 now allows to create different packages to store Business Objects.  
In the Development phase, it is also possible to import a BDM into the existing one, as long as Business Objects names are unique accross packages, so several teams can work on different packages and get their BDM integrated at some point, before deployment.    
Learn more [here](define-and-deploy-the-bdm.md).

### A Bonita User Application example available 
Create your own Living Application from a handy starting point with the new Bonita User Application. It contains the User Portal Tasklist, a new Case list developed in the UI Designer (i.e. customizable), and the User Portal Process list.   
It is made available from Studio Welcome page, in the _Resources_ tile.

### Archived contract data (Enterprise and Performance editions) 
Bonita 7.10 now allows to disable the archiving of Contract Data, to improve the platform performance. More details as to how [here](configurable-archive.md).

### Dynamic tabs in tab container
In the Tabs Container, you can now hide/show and enable/disable a tab given some conditions, customize a tab title and add CSS dynamically, or change tabs format to pills and build nice side menus thanks to vertical display.

### Docker
A Bonita docker distribution is now available for download and installation both in community and subscription editions.
See [how to install and use it](bonita-docker-installation.md).

## Improvements

### Better data management in the UI Designer
From the page or form editors, you can now:  
  - View the content of the Business Data Model thanks to a new vertical tab "Data Model"
  - Create a business variable to display instances of Business Objects. This can be achieved by drag and drop from the object to the whiteboard.

### Collaborative development of UI Designer artifacts
The JavaScript code contained in variable and custom widgets used to be presented on only one line in the code, making the code review very difficult. 
Extracting this code in external files makes it readable and makes working with Pull Requests an easy game when developing UI Designer artifacts.

### Studio Welcome page. New.
A new, simplified design has been implemented for the studio Welcome page. It is now more project-oriented in the Subscription editions and it allows to directly import official Bonita project examples like:
* Procurement example
* Expense report example
* Credit Card dispute resolution, with the implementation of an Adaptive Case Management use-case. (Enterprise only)  
To easily learn about each new Bonita version highlights, you can now also find this Release notes page at first Studio launch, in a second tab right after the Welcome page. Once closed, you can retrieve it later from the studio (Menu _Help_ > _Open Release Notes_) option.

### Table and Data table widgets
You can add links, icons, and actions or customize styles with the new html support in the table cells.   
Additional properties have also been added to differentiate lines (zebra-striping), condensate table contents or even add borders to cells and table.

### Profile dropdown in application modal of the Bonita layout
Labels for the default options were changed to be more intuitive. The profile dropdown was also disabled if the user has only one available profile.

### Support of invalid XML characters
Some special characters are considered as invalid in XML [(more details)](https://www.w3.org/TR/xml/#charsets) .  
In Bonita 7.10, it is now possible to submit a contract containing some of those invalid characters.  
The following connectors have also been updated to be resilient to those characters:  

 - The connector _document templating_ in version 1.1.3 removes all invalid XML characters from the resulting document. 
 - The connector _web service_ in version 1.2.5 removes all invalid XML characters from the envelope.
 
### Studio Windows installer
* Now detects if an anti-virus is enabled and if so, suggests to exclude the folder where Bonita is installed from the anti-virus scanning scope, to improve Studio performance.
* Now detects if the fire-wall is enabled and if so, automatically allows incoming traffic for the studio and the embedded JVM (Community only) executables. It will avoid fire-wall security notifications at first startup.

### MySql utf8mb4 support
Previously, when using a Mysql database, the only supported encoding was utf8mb3, which was deprecated as of Mysql 8.
Bonita now supports the (default) utf8mb4 encoding, and it is now the recommended configuration.

### Email connector
Connector definition has been updated to add a Return-Path input parameter.

### Document name encoding
We now URL encode the document name server-side by default. This will avoid errors when a document to be downloaded contains special characters in its name.
In the previous versions, a workaround was necessary client-side using the javascript native function "encodeURI" to generate document download url. You can now remove this workaround.

## Change of edition

### User Portal Task list 
This custom page, first one in the User Portal, is now made available in the Community edition. Create your own Living Application with a fully-functional task list.

## Technical updates
### Renaming
The Tomcat bundle packaging has changed. Previously called _Bonita{edition}-7.x.y-tomcat_, it has been renamed to _Bonita{edition}-7.x.y_.
The file structure underneath, the location of scripts and configuration files remain unchanged.

### Connectors
 - The connectors _document templating_  and _document converter_ dependency on [xdocreport](https://github.com/opensagres/xdocreport) has been updated from 1.0.5 to 2.0.2.

## Feature deprecations and removals
### Deprecations
#### Alfresco connectors
Alfresco connectors has been deprecated in favors of [CMIS connectors](cmis.md).

#### Transactional Groovy script connector
The transactional Groovy script connector is deprecated. Use the non-transactional Groovy script connector instead.

### Removals
#### Wildfly bundle
As announced in the previous release, the Wildfly bundle has been removed in the 7.10 release.  
To convert your installation into a Bonita Tomcat installation, [follow the guide](convert-wildfly-into-tomcat.md)

#### EJB support
As announced in the previous release, the support for EJB communication to Bonita Engine has been removed in the 7.10 release.

#### font-awesome in applications's themes
In versions 7.9.1-7.9.x the provided themes were embedding font-awesome. The library was removed in favor of adding the webfonts directly in the pages in order to avoid version conflicts. If you were using a provided theme and any font-awesome icon, either :
* create a custom theme out of the provided themes and add the font-awesome library to it (as explained in the [documentation for version 7.9](../../7.9/themes))
* add the font-awesome webfonts to your page

## Bug fixes
### Fixes in Documentation
* BS-19323 Bonita documentation is not clear enough about PostgreSQL versions supported
* BST-151 Default outgoing transition not executed when there is more than one outgoing transition from inclusive gateway
* BST-269 Document workaround for MacOS - ssh issue
* BST-171 Can't share a project on github using HTTPS and double authentication factor
* BST-341 On MacOS, Studio installer might not detect the installed JRE

### Fixes in Bonita 7.10.6 (2020-10-01)
#### Fixes in Bonita Runtime (including Portal)
* BS-19528 Process stuck when Error End Event fails because Error Start Event Sub-process no longer exists
* BS-19489 StarterThread fails and stops half-way if flownode instance is not found
* BS-18869 The underlying database request for displaying the User Archived cases page in the Bonita Portal is very slow
* BS-19508 JSONSerializer class generates too much GC pressure
* BS-19511 Process api call ActorInitiator and generates too much GC pressure
* BR-429 Search queries now use hibernate prepared statements, which improves performance
* BR-440 Hibernate query plan cache is now configurable
* BR-443 Improve Starter thread robustness
* BR-451 Some errors submitting work on transaction may corrupt the java thread forever (should fix the "lost work" phenomenon)
* BR-477 Fix Process stuck due to errors on event subprocesses

#### Fixes in Bonita Development Suite (Studio and UI Designer)
* STUDIO-3599 LA-Builder randomly not find uid pages

#### Fixes in Bonita LDAP Synchronizer
* BS-19527 LDAP Synchronizer fails to assign manager

### Fixes in Bonita 7.10.5 (2020-06-04)
#### Fixes in Bonita Runtime (including Portal)
* BR-408 - Update tomcat to 8.5.53 version that includes latest security fixes
* BR-421 - Deploying an invalid BDM make the state of services inconsistent
* BPO-539 - `../API/bpm/message` returns a `400` error code when message value is `null` (instead of `500`), message value can now be an empty string.
#### Fixes in Bonita Development Suite (Studio and UI Designer)
* STUDIO-3521 - Changes into Business Data initialization scripts are lost every time
* STUDIO-3492 - Process imported from a version lesser than 7.8.4 can be invisible on the diagram
* STUDIO-3530 - Performance issues when exporting a diagram with a lot of configurations and forms to .bos archive
* UID-252 - Data management section is not shown if BDM has a query with a multiple parameter

### Fixes in Bonita 7.10.4 (2020-04-02)
#### Fixes in Bonita Development Suite (Studio and UI Designer)
* UID-243 - UI Designer fails to start when pages workspace does not contain folders only
* UID-244 - Mac os .DS_Store prevents UID to start
* UID-253 - Switching a widget to a tab widget should not be possible
* STUDIO-3477 - Deploy fails when launched after a git update containing a BDM change used in updated process

### Fixes in Bonita 7.10.3 (2020-03-06)
#### Fixes in Bonita Development Suite (Studio and UI Designer)
* STUDIO-3452 - NPE when closing LA editor without saving

#### Fixes in Bonita Runtime (including Portal)
* BS-19451 - Not enough log messages available to track message coupling thread's activity
* BS-19464 - Cannot instantiate/execute a process with a Business Object with Oracle and Tomcat bundle, or restart the BPM services after installing a BDM.
* BR-370 - Standalone engine does not use real XA datasources


### Fixes in Bonita 7.10.2 (unreleased)
The following bugs have a 7.10.2 fix version, but since this version has net been released, you will find them in version 7.10.3.

#### Fixes in Bonita Development Suite (Studio and UI Designer)
* STUDIO-3393 - Lots of Nullpointer exception in the studio		
* STUDIO-3398 - Email connector migration error		
* STUDIO-3404 - NPE when importing a Living App Xml file		
* STUDIO-3435 - Dialog "Are you sure to delete the file.proc" appears but it shouldn't		
* STUDIO-3444 - Connector configuration automatically resets default value of some parameters		
* STUDIO-3454 - Cannot export .bos when an custom widget asset contains .json in its name	
* UID-248 - Export and reimport a custom widget does not work	

#### Fixes in Bonita Runtime (including Portal)
* BR-342 - getBusinessDataModelVersion() returns Optional[1001] instead of 1001	
* BR-361 - Process with only on_enter connector does not work	
* BPO-336 - Profile User cannot see the case timeline for his cases
* BPO-359 - ClassCastException generated when bpm/userTask REST API call is used	


### Fixes in Bonita 7.10.1 (2020-02-06)
#### Fixes in Bonita Development Suite (Studio and UI Designer)
* STUDIO-3328 - Studio is out of sync when merging a rebase conflict
* STUDIO-3362 - Configure toolbar icon has disappeared in Community
* STUDIO-3366 - NullPointerException is shown in the Studio when trying to export a project
* UID-74 - Whitespace between title and options is confusing on Editor and Preview for fred in RadioButton and Checklist widgets
* UID-113 - Generated Form displayDescription Text widget doesn't honor 'interpret HTML' property
* UID-115 - Renaming custom widget is not checked correctly
* UID-166 - Column keys starting with number in a table widget leads to incorrect display
* UID-217 - When editing an asset and immediately press the Supr key, the selected widget is removed
* UID-218 - Remove files declared in gitIgnore to avoid ghost files on user workspace
* UID-221 - Enable page or form artifact import when reference exist in index.json metadata file

#### Fixes in Bonita Runtime (including Portal)
* BS-15956 - The CPU of the DB server spikes to 100% for 90 minutes due to Portal Admin -Start for- button
* BS-19401 - ClassCastException when calling BDM queries that do not return BDM entities on Business Objects with an Access Control defined
* BS-19443 - Context information missing in error message when BDM install fails because business object class already exists
* BPO-73 - Documents returned by the REST API should have a valid downloadUrl
* BPO-104 - CAS ticket persists in URL in portal after login
* BPO-205 - Occasional 500 error when accessing BPM services page
* BPO-256 - Redirection back to CAS when Authenticated CAS user not valid in Bonita tries to access Bonita
* BPO-258 - Wrong spanish translation in BPM Services page
* BPO-313 - Process instantion form URL redirection has invalid processDefinitionId parameter
* BPO-316 - BDM and License page Access Denied when associated to custom profile menu
* BPO-325 - HTTP Status 400 : IE11 - Cannot download a document with chinese chars in the name from the overview page
* BPO-337 - Translation errors in french in applications pop-up window
* BPO-341 - Default case overview form leads to error 500 when trying to access archived process instance document
* BPO-358 - TaskPermissionRule : Process manager cannot list the tasks with f=parentCaseId with Dynamic authorization checking enable
* BPO-373 - Error message shown with Broken characters when trying to create an existing user in the Portal
* BPO-374 - When using the process list in an app, the app theme is not applied to the instantiation form
* BPO-376 - Guest user access doesn't work with CAS Authentication

### Fixes in Bonita 7.10.0 (2019-12-05)   

#### Fixes in Bonita Development Suite (Studio and UI Designer)
* BST-276 - Bonita installation may fail if installation folder is not empty
* BST-339 - Living apps token should be case insensitive
* BST-433 - Studio freezing when refreshing Theme resources
* BST-463 - Studio Community 7.9.2 build failed due to usage of repositories.rd.lan
* BST-483 - changing credentials for studio user has no effects 
* BST-530 - Delete a theme that has already been built doesn't always delete all the resources in node module 
* BST-667 - "Always run in background" not saved after restart

#### Fixes in Bonita Runtime (including Portal)
* BPO-177 - Loginservice returns a 200 despite a LoginException
* BPO-196 - Task name truncated in portal view case design
* BPO-236 - Case overview does not handle well cases started by the technical user (and tasks executed by)
* BPO-260 - Link widget returns hard-coded "/bonita" as Portal base URL
* BPO-296 - Process manager cannot start a case with Dynamic authorization checking enabled
* BPO-297 - Process instantiator can start a process on behalf of another user with Dynamic authorization checking enabled
* BPO-301 - Community build.gradle should use Maven central repository
* BPO-306 - Font Awesome in Bonita default Theme causes migration issue: default user icon is not displayed
* BR-155 - Contract data archiving is not configurable 
* BR-189 - NullPointerException error is shown when the description of a page/form is empty 
* BS-15975 - process instance id and flownode instance id not found when executing the work for the Start event 
* BS-19262 - The duration of the classloaders initialization at startup has increased with last product versions
* BS-19272 - Engine initialization uses only one XA transaction which forces customer to continuously raise up the Default XA transaction timeout as the database size is growing 
* BS-19324 - Cannot submit a form when the JSON output contains some unicode characters 
* BS-19335 - Timers triggers keep being rescheduled and are not fired on time or fired randomly 
* BS-19372 - failed flownode_instance when there is some cluster node start and stop
* BS-19384 - When sequence manager fail on all retry. Next id is still updated in memory
* BS-19395 - Java clients are limited to only 2 remote HTTP connections to Bonita server 
* BS-19398 - Process instantiation fails with NullPointerException if initialisation script of multiple business variables returns 'null'
