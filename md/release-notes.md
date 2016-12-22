# Release notes

Bonita BPM 7.4 includes a set of user-based product enhancements, bug fixes related to Bonita BPM Engine, 
a new REST connector and important technology updates.

## User-based product enhancements

<a id="bpm-studio"/>

### Bonita BPM Studio
* When importing a .bos file, 3 options are now available:
    * import it in the current repository
    * import it in another existing repository
    * create a new repository and import it there
  This may prevent from overriding a BDM file or other types of development artifacts.
* Contract inputs can be defined with the type LONG, at pool level only. In called processes, this is helpful to receive IDs from call activities
* The list of operations in a task and in the outputs of a connector configuration can be reordered
* Process simulation capability has been removed from the product `(removed)`

<a id="bdm-usability-improvements"/>

### Business Data Model (BDM)
* In the Studio, a new menu item Development > Business Data Model > Browse data (h2 console) opens the H2 console to visualize and browse business data. When testing a process, this helps to see how Business Objects instances evolve.
* In the Studio repository, .xml is now the storage format of the BDM. Using any Version Control System, you can now manually handle a _diff_ of 2 different revisions of the same BDM

<a id="uid-usability-improvements"/>

### UI Designer
* CSS, Javascript, and localization.json assets can be edited in line, directly in the UI Designer
* Variables can be sorted by names and types
* Variables search field sticks at the top of the pane, so you can scroll vertically and still see it
* When the "Preview" window is open and you click on "Preview" again, it is now reloaded, so only one window is open at a given time

<a id="task-and-case"/>

### Task & Case Management
* The estimated due date for a human task can be defined as an expression in the Studio
* A task can now be retrieved by its case ID in the user Portal task list
* In the user Portal case list, a new icon has been added at the end of each case row. It takes the user to the task list To do, filterd by the case ID.

### Connectivity
* A new REST connector has been added, to make REST calls (GET, PUT, POST, DELETE) to a third-party system `(new)`
* The CMIS connector has been improved, to retrieve a list of documents in a content management system (CMS), and to upload multiple documents to a CMS

<a id="csrf-security"/>

### Security
* CSRF security mechanism is now enabled by default when installing Bonita BPM, to protect the REST API against Cross-Site Request Forgery (CSRF) attacks. Custom pages not developped with the UI Designer may need to be updated to comply with this new setting. 
 To know more, go to http://documentation.bonitasoft.com/7.4?page=csrf-security

<a id="platform-installation"/>

### Platform installation
* The installation procedure of Bonita BPM bundles has been simplified, namely the database configuration part. Read the file HOW_TO_INSTALL_AND_RUN located in the bundles to learn more.


<a id="technology-updates"/>

## Technology updates
* Wildfly 10.1.0 application server replaced Jboss AS 7.1.1
* Hazelcast is updated to Hazlecast 3.6.3 `(SP)`, to improve clustering types of installation


## Limitations and known issues
* **MacOS Sierra (10.12)**: **Bonita BPM Studio** installed using the `zip` package fails during launch. Bonita BPM can successfully be installed on **MacOS Sierra** using the `dmg` package
* **MacOS** environment: starting from **MacOS El Capitan 10.11.4** (March 2016), new security rules block the launch of **Bonita BPM Studio**. You must temporarily remove security on `App` launching in _System Preferences→Security & Confidentiality_.

## Bug fixes

### Fixes in Bonita BPM 7.4.0 

* BS-10745  Starting a disabled process through a Call Activity should not be allowed
* BS-11280  Jasper Connector is not working by default on JBoss
* BS-13977  A human task can be submitted several times when connector execution is long enough
* BS-14276  When a task operation fails the UI form submit receives an exception and fails too
* BS-14327  Cannot install/deploy a connector implementation with a "long" version
* BS-14787  Deploying a process with a form undefined and no contract leads to disturbing behavior in the configuration view
* BS-14816  Executing task leads to violation of unique constraint: idx_uq_pending_mapping
* BS-14878  When importing a .bos from the Studio, all "favorites" UID artefacts are kept
* BS-14886  Profile API (SP version) createProfileEntry() does not work
* BS-15008  ARJUNA016051: thread is already associated with a transaction!
* BS-15076  Exception when using BDM queries that return primitive java types
* BS-15127  Web Service connector cannot send requests with size > 8 KB on JBOSS only
* BS-15381  Oracle constraint violation on IDX_UQ_PENDING_MAPPING
* BS-15408  Cache is enabled on REST APIs calls
* BS-15416  Case visualization image does not contain arrows and does not match the process diagram for a process imported from 6.3.6
* BS-15431  Security issue - SQL injection [reproduced on JBOSS]
* BS-15449  Unique index or primary key violation: "UC_CD_SCOPE_NAME_INDEX_9 ON CONTRACT_DATA"
* BS-15471  Custom widget bond not updated when already in the page
* BS-15484  The manager is set to System when overriding an existing user at organization import
* BS-15489  Process-design.xml may not be valid against XSD after migration
* BS-15500  Portal error popup contains a stack trace of an exception
* BS-15501  REST request retrieves a JSON containing an error and a stack trace
* BS-15550  Cannot start process in the mobile app if Skip Form is selected
* BS-15579  Infinite $digest Loop when radio buttons is bound to an array
* BS-15659  Start For should store the name of the person for whom the action is made
* BS-15684  The portal starts loading and then reloads
* BS-15696  Error while stopping JBoss bundle
* BS-15701  Date widget shows wrong "Today" when timezone does not match GMT
* BS-15712  When a GET Action Button Widget is clicked on a Task Form on the Task List, the event is caught like a Submit Action Button
* BS-15716  Cannot access pending tasks from case details view anymore
* BS-15717  The override popup message provided at UI Designer artifact import can be inconsistent
* BS-15733  fileInput are generated with {} by default instead of null 
* BS-15770  Text Annotation elements are missing when exporting to BPMN XML
* BS-15780  Text Annotation and Association not supported in Case Visualization
* BS-15797  Variables panel does not resize properly after resizing Property panel
* BS-15818  Task form from "Administrator" does not display normally on IE11
* BS-15823  Installer 7.4.0 displays Copyright 2015 instead of 2016
* BS-15827  UI Designer Preview always displays an horizontal scroll bar
* BS-15841  Unable to create a Business Object with more than one list of the same type
* BS-15847  Studio Subscription installer does not support Workspace importation
* BS-15947  Messages are stuck due to BPMEventHandling Triggers
* BS-15970  Studio installer on Windows 32bits uses locally installed JRE 6 instead of embedded JRE 7
* BS-15972  Can't paste anything in the name field of the expression editor
* BS-15981  Random 404 Errors using API/bpm/humanTask/TASKID
* BS-16016  UI Designer date filter throws an error when selecting non default language on preview
* BS-16017  Can't run previously created .bos with 6.x forms in studio 7.4.0.beta-01
