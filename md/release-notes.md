# Release notes

## New values added

<a id="uipath"/>

## Integration with UiPath : add Robotic Process Automation (RPA) to your BPM processes
Sometimes, because of legacy systems, or the way systems interact, and the complexity and cost it would take to change things, employees must perform repetitive tasks, with not much added-value, like copying and pasting values from one system to another. This times are over now with the possibility to connect Bonita with its [technology partner UiPath](https://www.bonitasoft.com/robotic-process-automation), the leader in RPA. Let a robot do the boring tasks for the employees, and let the employees focus on the complex tasks with strong added-value. New connectors are now available in the Studio:
* Start jobs: start a job on Orchestrator on a specified number of Robots. (compatible with _job input parameters_  in version 2018.3)
* Add queue item: add a new item in a queue in order to exchange data with jobs
* Get job status: retrieve the current status of a job
Moreover, UiPath provides native activities to interact with Bonita in order to start a Case, send a BPM Message, validate a Task. (see UiPath documentation for more details)

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

<a id="callback"/>

### Bonita callback method
A new REST API sendMessage is available for when Bonita has launched an external service (like UiPath or DocuSign) and needs to be called back in an asynchronous manner.

<a id="modal"/>

### Modal container to create pop-ins 
A new container is now available in the UI Designer palette. To manage such containers, the button widget gains two actions: "Open modal" and "Close modal".
It is important to notice that on the editor, embedding a modal window in another modal window is not supported. Embed the buttons to open pop-ins in pop-ins, but not the modal containers themselves.

<a id="workers-logs"/>

### Monitoring of number and details of engine workers
In Bonita logs, busy engine workers and their activity is now available.

<a id="convert"/>

### Change the type of a UI Designer artifact, from page to form and from form to page
From the page or form editors, right by the "Save" button, a click on the arrow displays a new option "Convert to...". Moreover, in the "Save as" option, the possibility to change the type has also been added, to, for example, save a form as a case overview page.

<a id="improvements"/>

## Improvements

<a id="uuid"/>

### Stability of files throughout revisions
Updating timers, business data, data dependencies, messages, pools, contract inputs, parameters, expressions, connectors, and documents, used to create additional UUID (Universal Unique Identifier) that resulted in false positives when comparing two revisions of the same file (using Git or SVN). This has been improved to make only real changes stick out when using a Diff Tool.

<a id="rest-timeout"/>

### REST connector Read timeout is configurable
In the REST connector, it is now possible to set the connection timeout (during connection) and the socket timeout (lack of answer of the distant machine after connection).
The default value is one minute for both, the values that were hard-coded before.

<a id="ldap-error"/>

### LDAP synchronizer manages errors and continues on fail
Better error management during LDAP synchronization.

<a id="clause-in"/>

### BDM query parameters accept arrays
It is now possible to query for multiple values of an attribute in the BDM objects.

<a id="translate-expression"/>

### In the UI Designer, strings in JavaScript expressions can now be translated
When writing the content of a variable of type JavaScript Expression, autocompletion now offers a new service for translation; uiTranslate().

<a id="metadata"/>

### Add a display name and display description to a page, form, or layout from the Editor
Display name and description are used when the page, form, or layout are imported in the portal's Resources page.
They could be edited by opening the page.properties file. Now, they can be directly edited in the page, form, or layout editor of the UI Designer, by clicking on the new "Tag" button.

<a id="bonita-calls"/>

### Get a summary of the calls to Bonita REST API made in a page, form, or layout
Also by clicking on the "Tag" button, you can get a summary of all REST API calls made by the current artifact to the Bonita REST API.
This helps validating if all expected calls are well implemented in the artifact in its current state.

<a id="bonita-theme"/>

### New Living Applications theme
A new theme is available for any Living Application you create: "bonita-default-theme". 

<a id="operations-apiaccessor"/>

### Warning on best practices when using API in operations
In diagram operations, the right operand should only use the apiAccessor with read-only methods. After helping several customers with scripts calling the apiAccessor with "write"-type methods, we have created a warning in the studio, when detecting the apiAccessor is called in an opreation script.

<a id="technology-updates"/>

## Technology updates

<a id="kerberos"/>

### Integration of SSO Kerberos (Teamwork, Efficiency, Performance edition)
Bonita works with Single-Sign-On (SSO) solutions using Kerberos protocol:
- Use standard authentication service
- Connect to Bonita Living Applications with company credentials (per tenant configuration)
- Works for Windows and many UNIX and UNIX-like operating systems: FreeBSD, Apple's MacOS, RED Hat Enterprise Linux, Oracle's Solaris..

<a id="other-dependencies"/>

## Other dependency updates

<a id="spring"/>

### Spring
Some internal libraries have been updated to newer versions:
* spring framework version is now 5.0.10.RELEASE
* spring-boot version is now 2.0.6.RELEASE

<a id="tomcat"/>

### Tomcat 8.5.34
Update to a newer Tomcat version.

<a id="feature-removals"/>

## Feature removals

<a id="gwt"/>

### GWT technology in the Portal (1/n)
As Google Web Toolkit is an ageing technology, Bonita needs to transform the pages of Bonita Portal step by step.
In this Bonita 7.8 release, two pages have been redone: 
 - Process list for the profile User
   It has been done using React. It is made available in the portal's Resources page, so it can be used in any application. It cannot be edited in the UI Designer.
 - Tenant status page for the profile Technical Administrator
   It has been done using the UI Designer and the new modal container. Since it is dedicated to a profile critical for the good initialization and management of Bonita, the page has not been made available in the portal's resources. It cannot be added to any application nor be edited in the UI Designer.

<a id="6.x-form"/>

### 6.x forms based on GWT technology
Studio forms based on Google Web Toolkit (GWT) technology are not supported anymore, starting with Bonita 7.8. They have been removed from Bonita Studio. Importing a .bos will not import such forms.
Cloning a Git repository or migrating a SVN repository will remove such forms and their related content (validators, look'n'feels, forms and widgets templated).  
Before you start Bonita Studio 7.8 or migrate your production to Bonita 7.8., make sure you have replaced such forms/pages by forms/pages created with more recent technologies and newer concepts, offered since Bonita 7.0: [UI Designer](ui-designer-overview.md) and [contract and context](contracts-and-contexts.md).

<a id="bar-importer"/>

### 5.x BAR file import in Studio
It is no longer possible to import BAR files created with Bonita 5.x in the Studio. If you still need to migrate 5.x bar, use Bonita Studio __7.7.x__ version.

### Debug action in Studio
Debug, the option to run a diagram without its connectors, is not supported anymore, as its value proved to be too little.
