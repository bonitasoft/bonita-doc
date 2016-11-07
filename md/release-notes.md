# Release notes

Bonita BPM 7.4 Beta includes a set of user-based product enhancements, bug fixes related to Bonita BPM Engine, 
a new REST connector and important technology updates.

## user-based product enhancements

<a id="bdm-usability-improvements"/>

### BDM
* .xml is now the storage format in the Studio repository making it possible using any VCS to handle a diff of 2 different revisions of the same BDM
* in the Studio, a new menu gives access to the H2 console to visualize and browse business data
* when importing a .bos file in the Studio it is possible to select another repository in order to manage resources from multiple projects `(SP)`

<a id="uid-usability-improvements"/>

### UI Designer
* URL parameter variable is updated when URL changes
* possibility to edit CSS, Javascript, localisation.json assets inline
* possibility to order and filter variables
* reload open preview window instead of opening a new one

<a id="task-and-case"/>

### Task & Case Management
* possibility to use an expression to compute the estimated task due date
* possibility to re-order the list of task & connector operations
* possibility to retrieve a task based on its cased ID
* possibility to list all open tasks related to a task

<a id="bpm-studio"/>

### Bonita BPM Studio
* when importing a .bos file, 3 options are now available:
    * import it in the current repository,
    * import in another existing repository,
    * create a new repository
* possibility to define a process contract input with the type long. Sending long values is the way to send IDs via call activity
* process simulation capability available in the Studio has been removed from the product `(removed)`

### Connectivity
* new REST connector to make REST calls from any service task and connect to a third-party system `(new)`
* improved CMIS connector including support of multiple documents (list & upload)

<a id="csrf-security"/>

### Security
* CSRF security mechanism is now enabled by default when installing Bonita BPM

<a id="platform-installation"/>

### Platform installation
* As a system administrator I can configure all required data sources (process engine + BDM) in one place

<a id="technology-updates"/>

## Technology updates
* support of Wildfly 10.1.0 application server replacing Jboss AS 7.1.1
* clustering: upgrade to Hazelcast 3.6.3 `(SP)`

## Limitations and known issues

* **MacOS Sierra (10.12)**: **Bonita BPM Studio** installed using zip package failed during launch. Bonita BPM can successfully be installed on **MacOS Sierra** using the `dmg` package
* **MacOS** environment: starting from **MacOS El Capitan 10.11.4** (March 2016), new security rules block the launch of **Bonita BPM Studio**. You must temporarily remove security on `App` launching in _System Preferences→Security & Confidentiality_.
* 6.x legacy forms: There might be some graphical issues (CSS) when displaying 6.x forms in the right panel of the new user tasklist. Use preferably the expended mode (full page list + popup for the form) or modify the portal look & feel in order to add a min-width to the from container in BonitaForm.html 
* Default applications layout is not compatible with new task list custom page
* Having executed a task in a subprocess, I cannot see the overview of the root process instance

## Bug fixes

#### Fixes in Bonita BPM 7.4.0 Beta (released on November 9th, 2016)

* BS-15947	Messages stuck due to BPMEventHandling Triggers
* BS-15818	Task form from "Administrator" does not display normally on IE11
* BS-15780	Text Annotation and Association not supported in Case Visu
* BS-15770	"Text Annotation" elements are missing when export to BPMN XML
* BS-15733	fileInput generated with {} by default instead of null
* BS-15717	The override popup message provided at UI Designer element import can be inconsistent
* BS-15716	Cannot access to pending tasks from case details view anymore
* BS-15712	When a GET Action Button Widget is clicked on a Task Form on the Task List, the event is caught like a Submit Action Button
* BS-15701	Date widget shows wrong "today" when timezone does not match gmt
* BS-15696	Error while stopping JBoss bundle
* BS-15684	The portal starts loading and then reloads
* BS-15659	Start For should store the name of the person for whom the action is made
* BS-15579	Infinite $digest Loop when radio buttons is bind to an array
* BS-15550	Cannot start process in mobile app if skip form is defined
* BS-15501	REST request retrieve a JSON containing an error and a stack trace
* BS-15500	Portal error popup contains a stack trace of an exception
* BS-15484	The manager is set to System when overriding an existing user at organization import
* BS-15471	Custom widget bond not updated when already in the page
* BS-15449	Unique index or primary key violation: "UC_CD_SCOPE_NAME_INDEX_9 ON CONTRACT_DATA
* BS-15431	Security issue - SQL injection [reproducible in JBOSS]
* BS-15416	Case visualization image does not contain arrows and does not match the process diagram for a process imported from 6.3.6
* BS-15408	Cache is enabled on REST APIs call
* BS-15381	Oracle constraint violation on IDX_UQ_PENDING_MAPPING
* BS-15008	ARJUNA016051: thread is already associated with a transaction!
* BS-14886	Profile API (SP version) createProfileEntry() does not work
* BS-14787	Deploying a process having a form undefined and no contract lead to disturbing behavior in the configuration view
* BS-11280	Jasper Connector is not working by default on JBoss
* BS-10745	Starting a disabled process through a Call Activity should not be allowed


