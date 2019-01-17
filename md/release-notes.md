# Release notes

## New values added

<a id="project-explorer"/>

### Project explorer in Bonita Studio
In one glance, view the content of the current Bonita project. In Bonita 7.8, the project is the equivalent of what used to be a repository. Now repository is dedicated to SVN and Git, where Bonita becomes only about projects. 
From this view, you can create, open, edit, delete and use SVN and Git commands, simply with a right click.
**Diagrams:**
The BPMN palette is now included in the diagram view, and if you collapse it, it still automatically opens when your mouse passes over its closed panel, and closes once you have selected the element to drag and drop on the diagram.
The overview of the diagram is now stacked in the properties view, after the Validation tab, and is now called "Minimap".
As for the Tree view, it is displayed just by the Project explorer, as a deep dive in the diagram content.
**REST API extensions:**
The tree view is now nested in the global project explorer.

<a id="uipath"/>

### Integration with UiPath : add Robotic Process Automation (RPA) to your BPM processes 
_(Teamwork, Efficiency, Performance, and Enterprise editions)_
Sometimes, because of legacy systems, or the way systems interact, and the complexity and cost it would take to change things, employees must perform repetitive tasks, with not much added-value, like copying and pasting values from one system to another. This times are over now with the possibility to connect Bonita with its [technology partner UiPath](https://www.bonitasoft.com/robotic-process-automation), the leader in RPA. Let a robot do the boring tasks for the employees, and let the employees focus on the complex tasks with strong added-value. New connectors are now available in the Studio:
* Start jobs: start a job on Orchestrator on a specified number of Robots. (compatible with _job input parameters_  in version 2018.3)
* Add queue item: add a new item in a queue in order to exchange data with jobs
* Get job status: retrieve the current status of a job  

Moreover, UiPath provides native activities to interact with Bonita in order to start a Case, send a BPM Message, validate a Task. (see UiPath documentation for more details)

<a id="modal"/>

### Modal container to create pop-ins 
A new [_Modal_ container](widgets.md#modal-container) is now available in the UI Designer palette, that open over the content of a page/form/layout. 
To manage such containers, the _Button_ widget gains two actions: "Open modal" and "Close modal".

<a id="kerberos"/>

### Integration of Kerberos/SPNEGO-based SSO 
_(Teamwork, Efficiency, Performance, and Enterprise editions)_
Bonita works with [Single-Sign-On (SSO) solutions using Kerberos/SPNEGO protocol](single-sign-on-with-kerberos.md):
- Uses password or passphrase authentication service engine side
- Allows connection to Bonita Portal and Living Applications with company credentials
- Per tenant configuration
- Compatible with Windows authentication and many UNIX-like operating systems

<a id="convert"/>

### Change the type of a UI Designer artifact (page/form)
From the page or form editors, right by the "Save" button, a click on the arrow displays a new option "Convert to...". Moreover, in the "Save as" option, the possibility to change the type has also been added, to, for example, save a form as a case overview page.

<a id="callback"/>

### Bonita callback method
A new [REST API sendMessage](bpm-api.md#message) is available for when Bonita has launched an external service (like UiPath or DocuSign) and needs to be called back in an asynchronous manner.

<a id="translate-expression"/>

### In the UI Designer, strings in JavaScript expressions can now be translated
When writing the content of a variable of type JavaScript Expression, you may want to translate the strings withing.
Autocompletion (_ctrl+space_) now offers a new service for translation: [uiTranslate()](multi-language-pages.md#uiTranslate). 
This gives the opportunity to get such strings available for translation in the _localization.json_ asset of the UI Designer artifact.

<a id="metadata"/>

### Add a display name and display description to a page, form, or layout from the Editor
Display name and description are used when the page, form, or layout are imported in the portal's Resources page.
They could be edited by opening the page.properties file. Now, they can be directly edited in the page, form, or layout editor of the UI Designer, by clicking on the new "Tag" button.

<a id="bonita-calls"/>

### Get a summary of the calls to Bonita REST API made in a page, form, or layout
Also by clicking on the "Tag" button, you can get a summary of all REST API calls made by the current artifact to the Bonita REST API.
This helps validating if all expected calls are well implemented in the artifact in its current state.

<a id="clause-in"/>

### BDM query parameters accept arrays
For a given BDM attribute of an object, custom queries can now be performed within a selection of values passed as a parameter (array).
One example: 
```sql
SELECT e
FROM Employee e
WHERE e.firstName IN (:firstNames)
ORDER BY p.persistenceId ASC
```  
where _:firstNames_ is a query parameter of type `String[]`.

<a id="workers-logs"/>

### Monitoring of number and details of engine workers
_(Teamwork, Efficiency, Performance, and Enterprise editions)_
Busy engine workers and their activity is now available through JMS counters. Plug a JMX client on Bonita JVM to monitor workers activity.

<a id="bonita-theme"/>

### New Living Applications theme
A new theme is available for any Living Application you create: "bonita-default-theme". 
<a id="improvements"/>

## Improvements

<a id="uuid"/>

### Stability of sources files throughout revisions
Updating timers, business data, data dependencies, messages, pools, contract inputs, parameters, expressions, connectors, and documents, used to create additional UUID (Universal Unique Identifier) that resulted in false positives when comparing two revisions of the same file (using Git or SVN). This has been improved to make only real changes stick out when using a Diff Tool.

<a id="gwt"/>

### New pages in the Portal: process list for profile "User" and BPM services for profile "Technical User"
As Google Web Toolkit is an ageing technology, Bonita needs to transform the pages of Bonita Portal step by step.
In this Bonita 7.8 release, two pages have been rewritten: 
 - **Process list** for the profile User, very simplified compared to the GWT one.
   It has been created using [React](https://reactjs.org/). It is made available in the portal's Resources page, so it can be used in any application. It cannot be edited in the UI Designer.
 - **BPM Services** page for the profile Technical Administrator
   It has been created using the UI Designer and the new modal container. Since it is dedicated to a profile critical for the good initialization and management of Bonita, the page has not been made available in the portal's resources. It cannot be added to any application nor be edited in the UI Designer. It's designed has been slightly reviewed compared to the GWT one.
   
<a id="performance"/>

### Performance
The following improvements have been made to Bonita performance:
- There is less I/O requests to temp folders
- Work execution consumes less database resources
- The login REST APIs mechanism consumes less resources
- At engine startup and BPM services resume, the process dependencies loading consumes less memory

A special attention has also been carried out to an improved deletion mechanism of archived cases. Deleting archived cases is now way more efficient.

:::warning
As a result, some [Events](event-handlers.md) are not triggered anymore (among others: ARCHIVED\_FLOWNODE\_INSTANCE\_DELETED, only concerns deletion of **archived** elements).
If you used these events and still need them, there is a way to switch back to the previous deletion mechanism.
In such cases, please contact Customer Support to activate this legacy deletion mechanism.
Be aware that this legacy deletion mechanism is deprecated and will be deleted in a future version. There will be not support in the long-term.
:::

<a id="rest-timeout"/>

### REST connector Read timeout is configurable
In the REST connector, it is now possible to set the connection timeout (during connection) and the socket timeout (lack of answer of the distant machine after connection).
The default value is one minute for both, the values that were hard-coded before.

<a id="ldap-error"/>

### LDAP synchronizer manages errors and continues on fail
Better error management during LDAP synchronization.

<a id="operations-apiaccessor"/>

### Warning on best practices when using API in operations
In diagram operations, the right operand should only use the apiAccessor with read-only methods. After helping several customers with scripts calling the apiAccessor with "write"-type methods, we have created a warning in the studio, when detecting the apiAccessor is called in an operation script.

<a id="technology-updates"/>

## Technology updates

<a id="tomcat"/>

### Tomcat 8.5.34
Update to a newer Tomcat version. Find more info on the [Tomcat changelog official page](https://tomcat.apache.org/tomcat-8.5-doc/changelog.html)

<a id="other-dependencies"/>

## Other dependency updates

<a id="spring"/>

### Spring
Some internal libraries have been updated to newer versions:
* spring framework version is now 5.0.10.RELEASE
* spring-boot version is now 2.0.6.RELEASE

<a id="feature-removals"/>

## Feature removals

<a id="6.x-form"/>

### 6.x forms based on GWT technology
Studio forms and case overview page based on Google Web Toolkit (GWT) technology are not supported anymore. 
They have been removed from Bonita Studio. Importing a .bos will not import such forms or overview pages.
Cloning a Git repository or migrating a SVN repository will remove such forms and their related content (validators, look and feel, forms and widgets templates).  
Before you start Bonita Studio 7.8 or migrate your production to Bonita 7.8., make sure you have replaced such forms/pages by forms/pages created with more recent technologies and newer concepts, offered since Bonita 7.0.
The latest Bonita version to support 6.x forms and overview pages is Bonita 7.7.x. 
For more information, go to the documentation on [UI Designer](ui-designer-overview.md) and [contract and context](contracts-and-contexts.md) or [migrate processes and forms](migrate-a-form-from-6-x) .
For any questions, contact the Bonita Support Team or Customer Success representative.

<a id="bar-importer"/>

### 5.x BAR file import in Studio
It is no longer possible to import BAR files created with Bonita 5.x in the Studio. If you still need to migrate 5.x bar, use Bonita Studio __7.7.x__ version.

### Directory "Resources/forms" for the business archives
This used to store Legacy v6 forms. When migrating a production environment to 7.8.0, it will be removed from the database.

### Debug action in Studio
Debug, the option to run a diagram without its connectors, is not supported anymore, as its value proved to be too small.

## Bug fixes

#### Fixes in Documentation
* BS-17850	Missing documentation for REST API extension creation with Community Edition
* BS-17993	Missing information about possible filters when searching for case using REST API
* BS-18444	Whole Javascript expression variable reset when a Collection object is changed in a Form
* BS-18494	No fallback to English when translation not provided in Mobile app
* BS-19105	Studio Import: unable to recognize git repositories after studio migration
* BS-19158	Default SAML configuration doesn't work with AD FS

### Fixes in Bonita 7.8.1 (2019-01-17)
#### Fixes in Engine component
* BS-19123	Transient activity data instance should be reevaluated when needed when using `getActivityTransientDataInstance`
* BS-19107	MultiInstance variable 'numberOfCompletedInstances' not available in expression evaluation
* BS-19104 Unclear/Useless exception when merging a null Business Objects into a Multiple Business Data reference
* BS-19084	Provided variable 'activityInstanceId' is not available in default value expression of a task variable

#### Fixes in Studio component
* BS-19236	Impossible to import a BOS with a renamed diagram in Community
* BS-19201	When importing an old .bos archive, migration is performed on diagrams with the 'keep existing' flag
* BS-19095	Studio Import: Unresolved dependency for expression of type Variable

#### Fixes in UI Designer component
* BS-19177 SELECT widget continually re-evaluates the selected value
* BS-19144 UI Designer data table does not sort correctly when column key uses filter
* BS-18911 Form name size limitation incorrect. Currently 240 characters, should be 228 characters
* BS-17278 Cannot update custom widget property

#### Fixes in Web component
* BS-19185	Cannot bypass SAML authentication when using /bonita/login.jsp
* BS-19183	In portal, if you open the language modal in settings, the current language is always english and not the current one
* BS-19181	In portal, after switching language, there are 2 cookies BOS_Locale instead of one
* BS-19158	Default SAML configuration doesn't work with AD FS (Active Directory Federation Services)

### Fixes in Bonita 7.8.0 (2018-12-06)
#### Fixes in Engine component
* BS-16972	Engine classloader refresh should use less Heap memory on Engine startup and BPM services resume
* BS-17905	LDAP Synchronizer failure with Microsoft Active Directory when MaxValRange limit reached for member in a uniq group
* BS-18131	Performance issue when retrieving process.bpmn from bar resources
* BS-18528	Engine logs should allow to troubleshoot why licence in DB is not loaded
* BS-18563	Engine arbitrarily fails with License Error 51,27 at server start-up on Windows
* BS-18615	Missing Hibernate query searchSProcessInstancewithSProcessSupervisor
* BS-18741	Operation does not apply changes within the same transaction for document list
* BS-18745	Operation: Assignment to a list of document from a list of File from the contract is failing when one element is null
* BS-18783	SKIP button on a Failed Task, with Interrupting boundary event, does not cancel the event
* BS-18847	Parallel archive cases deletion via REST API does not delete all rows
* BS-18866	Deletion of archived case times out because it takes too long to execute
* BS-18900	Operation does not apply changes within the same transaction for single document
* BS-19062	Lazy referenced BO field to itself fails to serialize with StackOverflowError
* BS-19073	Archived contract data are never deleted
#### Fixes in Studio component
* BS-18588	String process variable in diagram appears as Boolean in .proc file
* BS-18664	Studio thread takes 100% CPU when selecting a call activity
* BS-18707	UI designer forms and pages SVN delete only remove file in Local and tag as Missing instead of Delete
* BS-18708	The bonita la builder doesn't build the global zip correctly (add a slash root folder)
* BS-18861	Typo in description Git Clone assistant 2nd window clone destination
* BS-18903	Nothing indicates you cannot click OK because your Groovy script is not named
* BS-18946	Studio launches several processes to open BDM H2 console
* BS-19033	Git reset leaves files that should not be there
* BS-19105	Studio Import: unable to recognize git repositories after studio migration
#### Fixes in UI Designer component
* BS-18472	Rename fragment does not rename fragment used in a container in a form
* BS-18860	Date widget input not removed from binded variable
* BS-19006	Cannot use a exported page from UID if one of widget asset is inactive
* BS-19100	Rename a fragment replace others fragments reference use in a page same page
#### Fixes in Web component
* BS-18847	Parallel archive cases deletion via REST API does not delete all rows
* BS-18672	Do some check in caseOverview to ensure display in any case.
* BS-18770	Profile User should not be able to see the list of users installed on the platform using a call to API/identity/user
* BS-18816	Due Date translation is lost in the tasklist page imported inside a custom profile or living application
* BS-18818	Due Date format is wrong in japanese
* BS-18968	Security issue on Tomcat (CVE-2018-8037) impact Tomcat bundle
* BS-19032	404 not found: Task's form and process' form displayed in a living application cannot load the assets (image and font) listed in the CSS of the application's theme

