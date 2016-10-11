# Release notes

Below are the changes introduced in Bonita BPM 7.3

## Features & Enhancements

### Bonita home removal

Starting from Bonita BPM 7.3.0, there is no more Bonita Home to store the configuration, all the configuration is in the database.  
Please refer to the [platform configuration page](BonitaBPM_platform_setup.md) to find out how to manage configuration.

It simplifies bundle configuration and cluster deployments by removing file system dependencies (no more shared filesystem) and enables hot backup of runtime data. Here are more details:

* Fewer files to configure
* Configuration can be managed remotely (new admin tool in command line)
* Deployment process is ready to be automated with scripts
* Database schema creation can be reviewed by DBA
* Database can be created before the first start of the engine
* Improved messages in the logs explain the checks done by the Engine at startup.
* Backup is easier (no need to synchronize database backup with filesystem anymore)
* Backup is possible without downtime (depending on DBMS vendor capabilities)

The [migration tool](migration-overview.md) is impacted by the removal of the Bonita Home folder. Please see the associated release notes for further details.

<a id="user-task"/>

### User task list re-design

The users can now:

* Choose between 2 view modes to efficiently pick the right task and do it fast:
  * Master / Details: when selecting a task in the list, a detail panel displays the form to submit so you don't go back and forth between list and forms.
  * Wide table: a large table displays task details with the possibility to use display name for tasks that include business data. In this view, the form is displayed in a popup
* Easily view large forms with the option to expand the form panel to any size
* Select columns to be displayed in the list
* Select the number of elements per page
* Retrieve information on the case thanks to the case overview, displayed just a tab away from the form. 
* Allow users involved in a case to exchange comments on the case directly from the task list, just a tab away from the form.

    ::: info
    _Note_: User display preferences are stored in the Browser Local Storage
    :::

<a id="new-widgets"/>

### New UI Designer widgets

New widgets in UI Designer for Subscription edition:

#### [File viewer](widgets#file-viewer)

It adds the capability to preview or download a file or a process document in a page or a form. 
  * With this new widget, you can display a document in a modal dialog box or directly in the page.  
  * The documents displayable are limited to the document supported by the end user browser (by default pdf and images on usual browsers). Documents that are not displayable are prompted to be downloaded.

#### [Rich Text Area](widgets#rich-text-area)

It adds the capability to edit formatted text from a page or a form.
  * With this new widget, you can add rich text area for end users to create text to be exported in HTML format for integration on emails, etc.  
  * Text area can be prefilled with an HTML template.
  * Toolbar options exposed to end users can be customized and localized with the usual [localization mechanism](multi-language-pages.md) (localization.json file).

<a id="usability-improvements"/>

### UI Designer usability improvements

Many improvements to existing features:
* Generated form from contract (in the Studio) are filled into a Form Container using basic form validation.
* Quick save everywhere on the editor with the usual keyboard shortcut Ctrl-S.  
* Custom Widgets and Fragments have now their own icons with an auto-generated image displayed on the editor palette and whiteboard. For Custom Widget, it is now possible to customize the template for better whiteboard rendering.
* New icons for the different containers.
* In Custom widget editor, it is now possible to add a caption and tooltip when adding or editing a widget property.
* In Fragment Editor, when a data is exposed, it is shown as (exposed) in the variables panel.
* Subscription Edition: On DataTable widget, when there is only one page, the pagination footer is removed.
* Home Page: when clicking on Create, the selected artifact type is the same as the current selected tab.  

### UI Designer [Date Picker](widgets.md#date-picker) improvements

* Capability to edit and set manually the dates with a format validation (works within a Form Container)
* Capability to add a "Today" button to select automatically and quickly the current day.
* Subscription Edition: Calendar can be localized with the usual [localization mechanism](multi-language-pages.md) (localization.json file).  

### Other minor changes

* Tomcat has now better default log messages: clearer, less redundant, shorter log lines

## Limitations and known issues

* MacOS environment: the new version of MacOS El Capitan 10.11.4 (March 2016) has introduced new security rules that block the launch of Bonita BPM Studio. You must temporarily remove security on App launching in System Preferences→Security & Confidentiality.
* 6.x legacy forms: There might be some graphical issues (CSS) when displaying 6.x forms in the right panel of the new user tasklist. Use preferably the expended mode (full page list + popup for the form) or modify the portal look & feel in order to add a min-width to the from container in BonitaForm.html 
* Default applications layout is not compatible with new task list custom page
* Having executed a task in a subprocess, I cannot see the overview of the root process instance

## Bug fixes

#### Fixes in Bonita BPM 7.3.3 (released on October 7th, 2016)

* BS-15920	"Thank you" page does not open at the end of installer execution on Windows
* BS-15904	Studio does not use embedded JRE on Mac OS X 10.11.1
* BS-15888	Cannot run process when Actor mapping defined with Group starting with the same string
* BS-15875	Data table: Runtime page and Preview reloads when user click to order a column
* BS-15831	push enter when an input is selected do a bad submit of the form
* BS-15816	User/group/role avatar does not refresh when updated
* BS-15806	Fail to compile bonita-web
* BS-15802	Placeholder font style is too close from input style
* BS-15793	Cannot Select element when using the search of user/role/group/membership in the Process Manager and Actors mappings
* BS-15792	Impossible to remove user/role/group/membership one by one from the Process Manager mapping
* BS-15791	Process manager Mapping only shows 5 elements
* BS-15783	Impossible to edit the list of member/role/group/membership in the Process Manager mapping
* BS-15774	Error when editing group or role in Portal
* BS-15759	Portal - Can't switch to profile "Process manager" in Internet Explorer 11
* BS-15752	Instantiation form submit: Impossible to retrieve the process definition id value from the URL
* BS-15743	Classloader remove when the first node of a cluster is shutdown
* BS-15713	Fileviewer widget does not use the right id to preview document
* BS-15535	engine do not start if no licenses in platform_conf folder even if platform already initialized
* BS-15486	Wrong archived case ID retrieved from URL parameter in overview page for archived case
* BS-15485	Rest API Extensions broken after migration - Error 403
* BS-15356	IE9: Select widget with dynamic list does not show all the values in the list.

#### Fixes in Bonita BPM 7.3.2 (released on September 1st, 2016)

* BS-12240 	Sequential multi-instantiation with empty list unexpectedly create one instance
* BS-13575 	java.lang.Error thrown at connector execution blocks the process instance and is not logged
* BS-13652 	Unique index in ref_biz_data_inst contains nullable fields
* BS-14100 	Live Update - Does not work if the replacing connector has the same class name
* BS-14732 	IndexOutOfBoundsException while storing results of multi-instantiation
* BS-14825 	'sourceObjectId' is unknown for the entity searched using SearchArchivedConnectorInstanceDescriptor
* BS-14831 	REST API Search ActivityType failure when used in a complex query
* BS-15051 	Japanese Document fileName corrupted when attached in email connector
* BS-15361 	NoClassDefFoundError not catched from executeBusinessLogic()
* BS-15390 	URL parameter variables are not updated when the URL changes
* BS-15421 	Exception generated when changing the connector implementation
* BS-15435 	Step's variable not found in groovy binding for the Early completion condition of a Sequential multi-instantiation of a human task iteration
* BS-15505 	The first added widget disappears when dragging it below other widgets
* BS-15511 	Live update broken: "Violation of UNIQUE KEY constraint" message is generated when changing connector implementation with dependency
* BS-15569 	Unable to start process containing task with same name but different case
* BS-15573 	No page to explain how to install a custom page + link broken
* BS-15624 	WAR + EAR contains useless jars
* BS-15629 	Uninstaller does not remove Desktop launch icon
* BS-15654 	Problem in group organization management from studio
* BS-15679 	Update of connector implementation does not work with single and same jar dependency 

#### Fixes in Bonita BPM 7.3.1 (released on August 4th, 2016)

* BS-15244 Error 500 and NPE are generated when a cluster is started with FINEST log level
* BS-15358 Exception thrown when starting server in cluster mode
* BS-15407 Deploy a bar file with a file without content in Oracle11g doesnt work
* BS-15487 Error "The script is null" while testing Groovy connector
* BS-15511 Live update broken: "Violation of UNIQUE KEY constraint" message is generated when changing connector implementation with dependency
* BS-15526 Process Manager profile can't delete case
* BS-15536 Refine an existing Resource Permission Mapping fails
* BS-15548 Studio does not validate (50 char max) contract input name length after click
* BS-15572 ProcessPermissionRule.groovy prevents a process manager to update a groovy expression
* BS-15588 Portal un-extracted strings for translation
* BS-15632 Preview of initialisation script is empty when creating a contract from a data 

#### Fixes in Bonita BPM 7.3.0 (released on July 19th, 2016)

* [BS-8234] - Current Tenant information is lost on session timeout 
* [BS-12240] - Sequential multi-instantiation with empty list unexpectedly create one instance
* [BS-13575] - java.lang.Error thrown at connector execution blocks the process instance and is not logged 
* [BS-13652] - Unique index in ref_biz_data_inst contains nullable fields
* [BS-13653] - Unique index in group_ table contains nullable fields
* [BS-13654] - Unique index in page table contains nullable fields
* [BS-14027] - Date picker not internationalized
* [BS-14279] - "item not found" error popup when starting a process fully automated without instanciation form
* [BS-14579] - ProcessAPIImpl.cancelProcessInstance fails when parent Process cannot find subprocess
* [BS-14629] - Unreleased Resource: Streams
* [BS-14766] - jackson-annotations-2.2.3.jar redundant dependencies JBoss Bundle
* [BS-14816] - Executing task lead to violation of unique constraint : idx_uq_pending_mapping
* [BS-14833] - Javadoc is not clear for *archived* methods and *InstanceId* parameter
* [BS-14837] - Cannot replay a gateway on Community edition with flowNode REST API
* [BS-14844] - typos in wizard "create contract inputs from document"
* [BS-14868] - Groovy autocompletion do not display proposals
* [BS-14878] - When  importing a .bos from the Studio, all "favorites" UID artefacts are kept  
* [BS-14879] - UsedBy property is wrong for forms and layout
* [BS-14885] - Living application layout log 3 error 500 on loading
* [BS-14903] - Engine creates new temporary files at each startup without cleaning old ones
* [BS-14960] - Overview: started or terminated : Access denied: you do not have the rights to view this page
* [BS-14976] - Overview and actor filter and sub process : started or terminated : Access denied: you do not have the rights to view this page
* [BS-15003] - BO POJO Clear the list without check
* [BS-15072] - Incoherent behaviour of the legacy overview form
* [BS-15073] - ehcache (Hibernate Level 2 cache) has a configuration issue: all objects are cached into default cache (all together)
* [BS-15085] - Create New Application raises SEVERE error
* [BS-15123] - Contract data not found when used in a BDM query setting default value of business variable at Event Subprocess start
* [BS-15155] - Engine API getArchivedUserTaskExecutionContext fails with documents
* [BS-15172] - REST API humanTask miss parameters, standard search parameters is incomplete 
* [BS-15174] - Portal: blank page after log in on Windows with bonita.home located on a network drive
* [BS-15195] - Process manager mapping memberships entities selection fails when using the search with blank spaces
* [BS-15202] - Radio group button in connector selects two values at the same time
* [BS-15213] - TextArea in a group with contingency is not editable with IE11
* [BS-15219] - Published organization falls back to ACME or none after studio restart
* [BS-15236] - Documentation REST bpm case comment missing
* [BS-15241] - Cannot import REST API extension based on provided example
* [BS-15253] - Legacy forms contingency: Show when a trigger field has changed generates a NPE
* [BS-15256] - Sub Fragments not Displayed in UI Designer whiteboard
* [BS-15261] - Task Assign doesn't block another user + No message for other user when task is done
* [BS-15270] - Studio information collection failed when using HTTP proxy that requires authentication
* [BS-15274] - Cannot display the diagram overview if a message contains the '+' (plus) sign
* [BS-15275] - Event sub process creates a new BO instance instead of updating the parent one
* [BS-15276] - Ambiguous Error message when Custom connector using BDM dependance bdm-polo.jar conflicts with automatic dependencies
* [BS-15314] - Studio and Portal copyrights are out of date
* [BS-15315] - Rest API Extension not commited 
* [BS-15317] - SVN lock not released when closing Diagram 
* [BS-15322] - NullPointerException in the Portal when deploying a Process with UI Designer selected but no forms included
* [BS-15323] - Rest API Extensions not Synchronized after a commit in SVN
* [BS-15325] - Find query that select subset of object attributes failed
* [BS-15329] - SSO with CAS: specific URL to log in as tenant administrator is failing
* [BS-15336] - SSO with CAS: JBOSS/modules/org/jasig/cas/main/module.xml contains an invalid resource element.
* [BS-15337] - Organization and Environment SVN Delete only remove file in Local 
* [BS-15338] - Cannot remove date on datepicker once selected
* [BS-15340] - Problem using saved connector configurations
* [BS-15341] - Multiple Task Bars in Mobile view
* [BS-15345] - Login from Portal License tab URLs not encoded - 403 Forbidden - Login fails 
* [BS-15355] - Cannot import a diagram exported as BPMN2 in Eclipse BPMN modeler
* [BS-15357] - Studio cannot import a BPMN process
* [BS-15362] - As a real hacker, execute code (XSS) in the web browser of your victim
* [BS-15364] - Case fails on End Event when the Business data are archived in Performance edition
* [BS-15371] - Memory leak on the engine
* [BS-15379] - Publish in 7.2.x studio an organization created in 6.2.1 fails for unexplain reasons
* [BS-15403] - It is no more possible to use a query to assign a bdm to a legacy form transient data
* [BS-15410] - Double menu after a sequence Form V6 + Form UIDesigner
* [BS-15411] - Error deploying process from Studio
* [BS-15418] - Process "Enable/Disable" button randomly disabled
* [BS-15444] - OutOfMemoryError: PermGen space when using BDM
* [BS-15447] - Invalid JSON produce by /API/bpm/activityVariable when process variable is null
* [BS-15451] - Connection with the anonymous user doesn't recreate /bonita/client/tenants/1/work/ correclty after Migration
* [BS-15457] - REST API extension can't be deployed if user walter.bates is not into the Organization
* [BS-15488] - Date Picker Display broken in an Application in Chrome
* [BS-15494] - Studio Reset Engine doens't work
* [BS-15495] - init without license result in an inconsistent state
* [BS-15497] - MANIFEST.MF is not generated properly when repository name is not a valid java identifier
* [BS-15512] - Task Perfomer Actor filter only works once
* [BS-15525] - Task iteration multi-instanciation output result data "is multiple" shouldn't be checked by default
* [BS-15546] - Missing translation in Case Overview page 

