# Release notes

::: info
**Note:** The 2021.1 is currently work-in-progress (WIP). The 2021.1 GA is planned for January 2021.
:::

<a id="renaming"/>

## Renaming Bonita
This version of Bonita offers significant improvements and new values, among which the clarification of what we call Enterprise and Community editions:

### Bonita Community
The open source edition of the platform including all capabilities required to develop and deploy process automation projects. The platform is based on Bonitasoft's genuine approach to low-code and clearly separates visual programming vs coding capabilities to drive collaboration and simplify project governance.

### Bonita Enterprise
The commercial edition of the platform to address core and critical process automation use cases. This edition adds capabilities to Bonita Community to secure, scale, monitor and continuously improve process automation projects. The Enterprise edition is bundled with a customer success subscription that provides full project lifecycle support and services from development to operations.

### The changes 
This means that more values [were added in Community](<a id="feature-transfer"/>), so users can achieve the target goals. Alternatively, some values, linked to the goals of Enterprise, have been [moved from Community to Enterprise](<a id="feature-transfer2"/>).  
As a direct benefit, upgrades/downgrades operations between Community and Enterprise editions will be simplified. Both operations still require the re-installation of the targeted platform but there is no need for project re-development anymore.  
Enterprise downgrades to Community also imply that Enterprise edition capabilities and subscription services will not be available anymore.

<a id="feature-transfer"/>

### Reinforcing our Open Source DNA: enhancing the Community capabilities
Bonita has always been a highly open-source project, and we strongly think that it is the best to create a great and extensible platform. 

In 2021.1, we've decided to provide the Community edition with all the tools to create state-of-the-art and successful automation projects:
  - Multi environment management
  - Collaboration tooling (Git)
  - Search keys
  - All connectors (SAP, Office, Salesforce, UI Path)
  - Advanced connector wizards (email, web service, database, Twitter)
  - All editors with simplified UIs (Rest API Extension, Themes, Living Applications)
  - Translation of the pages and forms created in the UI Designer
  - New widgets (save form, rich text area, chart, advanced table)
  - Responsive UI - Multiple Screen Sizes
  - Fragments
  
More information [here](https://www.bonitasoft.com/Offering) WHY THIS LINK?

<a id="feature-transfer2"/>
## Full power to the Enterprise version
To ensure consistency with Community vs Enterprise concepts, in 2021.1, we have moved from Community to Enterprise edition the following capabilities:
  - PurgeTool to manage Bonita Platform scalability. The tool allows to purge finished (archived) process instances from a Bonita Runtime environment.
  - Maintenance releases. From now on, maintenance releases are only available to customers (Enterprise users). Community users will benefit from all fixes done on a minor release in the next minro release. 
  - JMX metrics publisher, monitoring log files and API dynamic security capabilities will be removed from Bonita Community 7.13 and will be part of the set of Enterprise features related to security and monitoring themes respectively. As a matter of clarification, operational logging capabilities of the platform will remain in the Community edition.


### The name 
So, how should we name this version? Not 7.12 because of all those changes, and all the following ones, but not 8.0 either, as it does not embed backwards incompatible APIs or any other breaking changes.
And because of its new clear concepts, Bonita will now follow a special type of #CalendarVersioning, with a YEAR.NUM pattern.
So we are proud to present the new (and fresh) Bonita 2021.1!
As for the Maintenance versions, they will be taggued yyyy.#-mmdd like 2021.1-0212 for the maintenance release of Feb 12th, based on the first minor release of 2021.

## New values added

<a id="maintenance-compatibility"/>

### Development Suite supports multi-maintenance versions
For a given minor version of the development suite (Studio and UI Designer), you can now seamlessly work on projects that have a different maintenance version (but the same minor version).
For example: if your Studio is in a later version of 2021.1, you will be able to work on all 2021.1 projects without migrating the project or being blocked.

<a id="simplified-script"/>

### Simplified Expression editor
Writing a script expression has never been easier with the reviewed expression editor. You can drag and drop variables and quickly access operators.

<a id="admin-app"/>

### New Bonita Administrator Application available
Give a try to our new *Bonita Administrator Application!* (get it from Bonita Studio Welcome page, in the Resources tile).
Starting now, you can use it as is, but you can also customize the pages that have been recreated with the UI Designer, or create your own Administrator Application from a handy starting point. 
It replicates the current Administrator Portal profile, except for Analytics page, available in the Enterprise edition. 

In a later version of Bonita, this application will replace the current and now deprecated Administrator Portal profile. 

## Improvements

### Development suite changes
#### Warning before the migration when cloning a project
If you are cloning a repository branch that required migration then you will be informed of the need for migration before it is actually done. This allows you to cancel the operation and change the branch if needed.

#### Project Problem view and Project validation
A new view is now available in the Studio to see all the project issues and warnings. It is also possible to validate a project through the contextual menu.

#### Dark mode theme for the Studio
In the "Appearance" section of the Studio settings, you can now change the theme. You have two possibilities: light (default) and dark.

#### Multi-selection for REST API and Theme build
You can now select several REST APIs or themes to build in the Studio

#### Displaying the fragments and custom widgets full name in the UI Designer
When editing a UI Designer artifact, you can now see the full name of the available fragments and custom widgets in a new tooltip. Previously, fragments and custom widgets with long names were truncated, making their selection cumbersome.

#### Google Calender New authentication method
The google connector can now use JSON tokens to authenticate.

#### Java REST API Extension
It is now possible to create REST API Extensions in Java.

#### Autocomplete Widget returned value
Within the autocomplete widget, you can select a returned value different from the displayed value, opening for new use-cases.

### Runtime changes

#### New Monitoring metrics available 
Notably two new hibernate metrics: `hibernate.cache.query.plan` respectively `hit` & `miss`, to help troubleshoot performance problems.
How to activate this metrics is documented [here](runtime-monitoring.md).

<a id="fault-tolerance-mechanism"/>

#### Fault tolerance mechanism
It was already possible to ensure the high availability using a [clustered architecture](overview-of-bonita-bpm-in-a-cluster.md), 
Bonita Platform is now even more tolerant to incidents like database outages thanks to the brand new **Recovery mechanism**.

New properties added are:

```properties
bonita.tenant.recover.consider_elements_older_than
bonita.tenant.recover.delay_between_recovery
```
See [Fault tolerance mechanisms](fault-tolerance.md) documentation page for more details.

<a id="SSO-create-users"/>

#### User creation on the fly for SSO Authenticated users  
You can now configure Bonita to allow Bonita Engine to create user accounts on the fly as soon as they have been previously authenticated in their SSO (SAML or Kerberos).
Find more information on how to configure it [here](single-sign-on-with-saml.md).

#### REST API and portal login
The redirect parameter is now optional when logging in to the REST API using `/bonita/loginservice` as well as when logging out using `/bonita/logoutservice`.  
This means it is no longer needed to put redirect=false in the request to log in/out using the API.
However, previous login requests with a redirect URL will continue working as the redirect parameter is optional.  
If you use a customized login page to log in to Bonita portal UI **and** your page don't send any `redirectURL=<targetBonitaURL>` parameter to the login service, **then** you need to make sure your page send a parameter `redirect=true` in the request to the login service.
Same thing if you have a logout link in a custom page that does not pass a `loginUrl` or a `redirectUrl` parameter.  
If you use Bonita layout version 5 or a customized version of it in your applications, make sure you upgrade to version 6 when migrating. Otherwise, the logout button will not redirect to the login page when clicked.

#### Search keys
As part of the reinforcement of our Open Source DNA, Search keys can now be defined and used in the Community edition.  
Take a look at the [search keys documentation](define-a-search-index.md) to learn more about it. 

#### BDM (Business Data Model) class generation

In Bonita 2021.1, we changed the way ID's are generated when you deploy a (new version of a) Business Data Model.  
Previously, the strategy to generate table ID's of BDM objects was left to Hibernate to decide. It could be a database SEQUENCE, an auto-incremented column, ...  
Now, the specific implementation is explicitly set on each ID column during the BDM class generation. It is however different
from one Database vendor to another (a database SEQUENCE for Oracle and PostgreSQL, an auto-incremented column for MySQL and MS SQL Server).  
Note that no change is required from you, and upgrading to Bonita 2021.1 does not affect your already generated BDM until you actually redeploy it (next time you update it).

## Technical updates
### Libraries
Groovy updated to 2.4.20
Micrometer updated to 1.6.1

### Support Matrix
Bonita now supports Red Hat Enterprise Linux (RHEL) and CentOS 8.2 version 

## Feature deprecations and removals

### Deprecations
#### Bonita Portal transformation
Bonita Portal is being transformed into Bonita Applications. When Bonita Applications are ready, Bonita Portal will be removed. Developers and users will need to learn how to stop using the Portal and start using Bonita Applications instead. This change will allow Bonita and its users to get free from Google Web Toolkit (GWT) technology and offer opportunities for customization.
Indeed, some Portal pages (built with GWT) are being totally recreated with our own UI Designer. They will be customizable. Other pages (those that were already using another technology than GWT) are being wrapped and will not be customizable.
Moreover, as any Living Application, Bonita applications will be extensible to add any page the users need. More details in the upcoming versions of Bonita.
Until then, we strongly advise not to create Custom Portal Profiles anymore but applications instead. When Bonita Portal will not exist anymore, the existing Portal Custom Profiles will need to be migrated into Living applications.


### Removals
#### IE11 support
Internet Explorer 11 is not supported anymore through the Bonita Platform. 
The web browsers supported by Bonita 2021.1 are Mozilla Firefox, Google Chrome and Microsoft Edge.

#### Legacy third party format importers
In the Community edition, XPDL and jBPM importers have been removed.  
In Enterprise edition, Visio and Aris importers have been removed.  
Use BPMN 2 importer for model exchange with third-party editors.

## Bug fixes

### Fixes in Bonita 2021.1 (2021-01-28)
#### Fixes in Bonita Development Suite (Studio and UI Designer)
* STUDIO-3630 - More log messages are needed to debug the SAP Connector
* STUDIO-3694 - User password is not retrieved from the active organization when logging in Portal/App

#### Fixes in Bonita Runtime (including Portal)
* BS-17167 Live update of connector fails after BDM redeployment
* BS-18685 Portal's task REPLAY says failed connector will be re-executed but it is not true if task's prev_state_id=4 (ready)
* BS-19410 - Failed Flownodes after a database server restart
* BS-19453 - no state found after AbortedFlowNodeStateImpl for flow node of type SBoundaryEventInstance
* BS-19455 - Performance: 10 sec SQL request on ARCH_FLOWNODE_INSTANCE with 13500000 rows
* BS-19497 - NullPointerException is generated after replaying a call activity in a failed state
* BS-19534 - no state found after CancelledFlowNodeStateImpl for flow node of type SBoundaryEventInstance CANCELLING
* BS-19538 - Cancel of process instance fails because MULTI element cancelled before all children call activities are cancelled
* BS-19543 Cannot create case because hibernate_sequence table or sequence is missing after migration to 7.11
* BPO-307 Process manager can assign a task and execute a task on behalf of a user which is not associated to the process in the actor mapping with our without Dynamic authorization checking
* BPO-643 - Not all processes get disabled when multiple ones are selected in Portal - Administration - BPM - Processes page
* BPO-645 Erroneous space at the end of property value breaks the standard authentication allowed functionality
* BPO-648 - Load more limitation when result is multiple of number per page
* BPO-655 - LoginServlet redirect param should be optional and default to false
* BPO-662 Expanding/collapsing the form resets input data
* BPO-664 - Security risk: API/formsDocumentImage executes injected script
* BR-454 - Sometimes CallActivity are left Completed without target process
