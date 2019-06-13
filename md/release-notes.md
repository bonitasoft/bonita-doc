# Release notes

## New values added

<a id="improve-form-generation"/>

### Low code application development: business data management form the studio to the UI Designer

#### Easily create forms where business variables or documents are edited by the users (read/write)
A form that allows a user to edit business variables or documents needs to display the current values before the user modifies them. 
The Studio now creates the variables needed to display the current values and link them to the same widgets than the widgets linked to the task contract: what the user needs to fill and send back to the process.
No need to create variables and manipulate the BDM REST API anymore. 
For more information, read [the dedicated documentation](contracts-and-contexts.md).

#### Easily display read-only business variables in forms
A lot of forms that require users' input or edition of business variables also need to display other business data as read-only information. This information is useful to the users to make the right inputs and/or decisions.
For each form created for a task, the studio now gives the option to display all attributes that are linked to the business objects used to create the contract inputs as read-only widgets.
The unneeded attributes can easily be deleted, all useful ones are ready to be displayed to the users, saving a lot of development time. 
For more information, read [the dedicated documentation](contracts-and-contexts.md).

<a id="uid-lazyRef-filter"/>

#### New embedded AngularJS filter to resolve the lazy references of a business object 
This improves the management of embedded objects with lazy references.
When in the need to retrieve lazy references of objects for either edit or read-only use-case, the above features create a variable using the | lazyRef filter for the object to retrieve (as well as the widget to display the variable).
For more information, read [the dedicated documentation](variables.md).

#### Switch widget
Directly from whiteboard or from widget properties section, you will now be able to change your current widget by a new one without loosing the configuration you have done. Useful when switching to a new version of your widget custom or not, and as first customization steps after your form creation from studio to match your end user needs.

#### Update multiple documents
Operations at the level of tasks now handle the complete update of multiple documents: add/delete/update are automatically managed by the method, using document Ids. 
This improvement is also implemented in Bonita Portal case overview, where only the last version of each document is visible, and each document gets two widgets: file viewer to access the document, and file upload to update it.

#### Render a UID page and form in the end-user browser
Now you can open your preview in a browser tab, outside of current preview mechanism to allow you set new URL parameters, play with dynamic browser sizing, and to reuse same url in another browser to see how your form or page behaves in your user default browser.

#### A new method for Living Applications buttons: Assign and execute"
A new action is available on the provided _Button_ widget in the UI Designer: "Assign and submit task". 
This action is mandatory for ACM use-cases, where a user often manages a given case on his own, from begining to end, but can be used in many other use-cases.
As a result, a user of an ACM-type Living Application can view and fill out the form of any available task in the case, and then simply click on "Submit". 
This is different from Bonita Portal Task List where the user needs to click on "Take" to book a task and take it out his colleagues' To Do list.

### Continuous delivery of projects / Industrialization

<a id="theme-in-project"/>

#### "Theme" projects are now integrated in Bonita project (Subscription only)
From the Studio, the theme can now be created as any other part of a Living Application, from the Development Menu and from the Project Explorer "New" option. 
It is packaged as a Maven project, just like the REST API extensions, and is nested in the Bonita project. 
A theme created in the Studio can be deployed to the Portal, and managed (open, edit, delete) as any other element of the application. 
The theme is taken into account in [Bonita Continuous Delivery Add-on](bonita-continuous-delivery-doc/md/index.md), through the builder and the deployer. 
For more information on how to use it, go to the [dedicated documentation](customize-living-application-theme.md).

#### View a UI Designer artifact within an application theme while developing
Once the theme is mapped to applications, it can be used to view a page, form, layout or fragment under development in the context of the target application. 
To do so, a new "View in application" feature has been added to the preview window in the UI Designer, to ease the style adjustments of the artifact.

#### In Bonita Community, use customized themes and layouts in living applications
Themes created in an IDE can now be mapped with an application descriptor to customize the look and feel of a living application. 
Layouts created in the UI Designer can also be updated in an application descriptor for better customization.

#### Use provided UID widgets as a template for a custom widget 
Do you need a text widget that applies an specific numeric formating to match your external system keys? Do you need a table widget with specific padding? 
Bonita UI Designer provides a set of standard widgets to build your form & pages, and now you can extend them to fullfill your specific needs. 
In the Properties panel header, there is a new widget action menu. From this menu, you can launch all the widget-related actions, such as: edit, view, save as fragment (depending on the selected widget). 
From this widget action menu, you can view the widget, clone it as a custom widget and modify it. It will be directly available in your palette for further uses.

#### Manage UID assets order to guarantee user interface rendering  
Apply the right order on assets affects the behaviour the page such as the order or CSS loading to override styles, or JS object declarations. 
Base framework assets are now visible to show you which ones are used to build your UI Designer page, such as Angular or Bootstrap and in which version, additionally a documentation link has been added to take benefit of such frameworks documentation.

### From Bonita Portal to Bonita Living Applications
We are pursuing the initiative of progressively migrating Bonita Portal to our UI Designer technology and transforming it into three applications, one per provided profile. 
Each new page is provided as a new custom page that is responsive, that can be customized in the UI Designer, and used in any living application.

#### "Install/Export Organization" for the Administrator Portal
It offers the same features than the old Portal page:
  - A file updload expecting the .xml of an organization
  - An Export button to download the .xml locally and share it
Additionally, it offers better validation (checks for any error in the file format with a dedicated error message).

<a id="new-bonita-layout"/>

#### A new Bonita Layout
Created with the UI Designer, it is responsive, it can be customized and added to any living application.
It is composed of a few custom widgets. 
Provided as a Resource in Bonita Portal (the old one is deprecated), it can be imported and edited in Bonita UI Designer.
It offers new features:
* A "list of applications" icon: once clicked, it displays a modal window that lists the available Applications for the profiles of the loggued user, so the user can pick one and switch application.
* The name of the loggued user: once clicked, it displays a modal window with user's information, the language picker for the application and a logout button 
It is compliant with all browsers: Microsoft Edge, IE11, Mozilla Firefox and Google Chrome.

### Getting to Adaptive Case Management (ACM)
Bonita Platform now embeds the underlying mechanism that allows the update of tasks statuses in the scenario of mixed diagrams (structures as well as unstructured). 
This event-handler will evaluate the value of task variables that begin with "$" after any task execution.  
For the purpose of ACM, the variable is the status of each task, deciding for its availability for the user at any step of case execution. 
This event-handler is included in the Studio and the Runtime bundle, but is disabled by default. 
To use it, it needs to be enabled in the studio Preferences or in the bundle configuration.

## Improvements

### Performance

#### Engine work execution

A work execution audit mechanism has been introduced. It can be activated to detect when a work takes too much time to be executed or it was _rescheduled_ too many times.
See [Work execution audit page](work-execution-audit.md).
<a id="asynchronous-connector-execution"/>

#### Asynchronous connector execution

The Bonita Runtime is now up to 10x more performant in a context of slow connectors, allowing more tasks to be executed and avoiding and SPOC (single point of contention). 
 - Connectors are executed in an asynchrous manner. In earlier versions each work was waiting for the connector to end before processing other workload. This resulted in degraded performance if few connectors had a long execution time. 
 - Worker threads are now released as soon as the execution of the connector is triggered. see [connector execution page](connectors-execution.md) for more details.
As a consequence, in a context of connectors taking a lot of time (connecting to slow third party services, high computing, ...) the usual job executions are not blocking and can continue. 

#### Timer execution

Bugs were fixed to increase stability of the integration with Quartz:
* BS-19239 Exception during Quartz Job execution leaves the associated flownode in WAITING state and the process execution is stopped
* BR-56 Failure in a cron timer cancels future executions
A [new page](timers-execution.md) was added to explain how Timers are executed and how to handle time execution failures. 
Also details were added on how to configure Quartz for timers execution: [quartz performance tuning](performance-tuning.md#cron)

#### Cluster locks

A new configuration capability was added:

`bonita.platform.cluster.lock.leaseTimeSeconds` : 

Specify a maximum time a lock is kept cluster-wise. It avoids having an instance of process indefinitely locked when one node does not release a lock due to errors like network issues.  
It is set by default to 600 seconds. It should be kept to a high value (more than transaction timeout) or else some concurrent modifications on processes can happen.

### Studio usability

#### Import a .bos archive in Bonita Studio using Drag and Drop
Bos archive can now be imported in Bonita Studio by being dragged from a file system and dropped into the Bonita project explorer.

## Packaging

### Bundles
Tomcat and Wildfly bundles have been renamed. The Wildfly and Tomcat version are no longer specified in their name.

### LDAP synchronizer & CAS single sign-on module
The LDAP synchronizer & CAS single sign-on module are now provided with the Bonita Subscription bundles, in the `tools/` sub-directory.

### License Request Key generator
Within Tomcat and WildFly bundles, the License Request Key generator tool has been moved from the `server/` sub-directory to the `tools/` sub-directory.


## Technical updates

<a id="java-11-compliance"/>

### Java 11 Compliance

Bonita now runs on Java 8 and Java 11.
Bonita is still compiled with java 8, but can now run on Java 11.
The various libraries and dependencies of the product have been updated according to this mindset.
It means:
- Some of Bonita dependencies might officially be listed as not working or problematic with Java 11. The dependencies presenting security issues, as well as those not working at runtime have been updated.
The others were left as they were. The main updated libraries can be found [there](release-notes.md#java-11-lib-update)
- If you are migrating to Bonita 7.9, and plan to run it on Java 11, some of your connectors will have to be migrated. See [Connectors dependency updates](release-notes.md#connector-dependency-updates)
- Generally speaking, custom code and connectors might require updated version of libraries used in Bonita. In such cases, those updated versions should be added as script/connector dependencies.
<a id="rest-api-extension-update"/>

#### REST API extension project update
In order to be compatible with Java 11, you must update the following plug-ins dependencies in your _pom.xml_:
* _groovy-all_ dependency must be updated to **2.4.16**
* _groovy-eclipse-batch_ dependency must be updated to **2.4.16-02** 
* _maven-compiler-plugin_ dependency must be updated to **3.8.0** 
* _groovy-eclipse-compiler_ dependency must be updated to **3.3.0-01**
  * You need to add the plugin repository below in your pom.xml
```
 <pluginRepositories>
  <pluginRepository>
   <id>bintray</id>
   <name>Groovy Bintray</name>
   <url>https://dl.bintray.com/groovy/maven</url>
   <releases>
    <updatePolicy>never</updatePolicy>
   </releases>
   <snapshots>
    <enabled>false</enabled>
   </snapshots>
  </pluginRepository>
  ...
 </pluginRepositories>
``` 

#### Bonita Studio
Underlying Eclipse version has been updated to 2018-12 version integrating Java 11 support.   
Bonita Studio Community installers are now packaged with a JRE 11 by default (instead of a JRE 8).  
For Linux users, you now need GTK3 library to be installed. 

### Tomcat
Tomcat has been updated to the version 8.5.40.

### Dependency updates

#### Bonita dependency updates

<a id="java-11-lib-update"/>

The following Bonita dependencies have been upgraded to improve the Java 11 support
* groovy-all from 2.4.4 to 2.4.16
* spring framework version is now 5.1.5.RELEASE
* spring-boot version is now 2.1.3.RELEASE

#### Connectors dependency updates

<a id="connector-dependency-updates"/>

### Migration

For Bonita 7.9.0, the migration step tries to migrate the *CMIS*, *Email* and *Webservice* connectors of the processes deployed on the platform, along with their dependencies, to allow the migrated platform to run on Java 11.  
The step works at best effort:
* It will try to upgrade all the connectors it can.
* It will not upgrade connectors that have dependencies used by other connectors. Those connectors will still work on java 8, but not in java 11, and will require a manual update.
* A detailed report of all the changes made is displayed at the end of the migration step.
* Beware that if one of these connectors' removed dependencies was used in one your scripts, it will still be removed/updated, and therefore your scripts might not work anymore after migration. The full list of updated and deleted dependencies can be found below.

#### WebService connector

The following dependencies have been added, to ensure Java 11 compliance:

 - _javax.xml.stream:stax-api:1.0-2_
 - _org.codehaus.woodstox:woodstox-core-asl:4.1.2_
 - _org.codehaus.woodstox:stax2-api:3.1.1_
 - _com.sun.istack:istack-commons-runtime:2.4_
 - _javax.activation:activation:1.1_
 - _com.sun.xml.messaging.saaj:saaj-impl:1.3.28_
 - _javax.xml.ws:jaxws-api:2.2.7_
 - _com.sun.xml.ws:jaxws-rt:2.2.7_
 - _javax.jws:jsr181-api:1.0-MR1_
 - _javax.xml.bind:jaxb-api_
 - _com.sun.xml.bind:jaxb-impl_

#### CMIS connector

The following dependencies were updated to ensure Java 11 compliance:
- _org.apache.chemistry.opencmis:chemistry-opencmis-client-impl_ dependency has been updated from _0.13.0_ to _1.1.0_
- _org.apache.chemistry.opencmis:chemistry-opencmis-client-api_ dependency has been updated from _0.13.0_ to _1.1.0_
- _org.apache.chemistry.opencmis:chemistry-opencmis-commons-api_ dependency has been updated from _0.11.0_ to _1.1.0_
- _org.apache.chemistry.opencmis:chemistry-opencmis-commons-impl_ dependency has been updated from _0.11.0_ to _1.1.0_
- _org.apache.chemistry.opencmis:chemistry-opencmis-client-bindings_ dependency has been updated from _0.11.0_ to _1.1.0_
- _org.apache.cxf:cxf-rt-bindings-xml_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-frontend-simple_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-core dependency_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-transports-http_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-ws-policy_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-ws-addr_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-bindings-soap_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-databinding-jaxb_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-frontend-jaxws_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.neethi:neethi_ dependency has been updated from _3.0.2_ to _3.0.3_
- _org.apache.ws.xmlschema:xmlschema-core_ dependency has been updated from _2.0.3_ to _2.2.1_

The following dependencies have been added to ensure Java 11 compliance:

- _org.apache.cxf:cxf-rt-wsdl-3.0.12_

The following dependencies have been removed: 

- _org.jvnet.mimepull:mimepull-1.9.4.jar_
- _org.codehaus.woodstox:stax2-api-3.1.1.jar_
- _org.apache.geronimo.javamail:geronimo-javamail_1.4_spec-1.7.1.jar_
- _org.codehaus.woodstox:woodstox-core-asl-4.2.0.jar_
- _org.apache.cxf:cxf-api-2.7.7.jar_

In addition _bonita-connector-cmis-<specific Implementation>.jar_ and _bonita-connector-cmis-common-<version>.jar_ have been replaced by a single bonita-connector-cmis-<version>.jar

#### Email connector

The version of the _javax.mail:mail_ dependency has been updated from _1.4.5_ to _1.4.7_

#### Twitter connector

The version of the _org.twitter4j:twitter4j-core_ dependency has been updated from _4.0.2_ to _4.0.7_

### JTA transaction manager replacement

In Bonita 7.9.0, we replaced the JTA transaction manager used to handle XA transactions in Bonita Engine from Bitronix to Narayana (also known as Arjuna). 
This change should not impact the way to use Bonita. 
However, tuning Bonita transaction configuration is now a little different. If you wish to change the default transaction timeout,
it is now done by changing the `defaultTimeout` property in file `server/conf/jbossts-properties.xml` instead of file `server/conf/bitronix-config.properties`
More configuration info can be found [here](tomcat-bundle.md).

### Databases supported

#### Oracle

From Bonita 7.9, the supported version of Oracle database is **12c (12.2.x.y)**

#### PostgreSQL

From Bonita 7.9, the supported version of PostgreSQL database is **11.2**

#### Microsoft SQL Server

Microsoft SQL Server **open-source drivers** are now provided by Bonita. There is no need to download and install them manually anymore.

#### MySQL

From Bonita 7.9, the supported version of MySQL database is **8.0 (8.0.x)**

To migrate to Bonita 7.9+ from an earlier version, you need to run the [Bonita Migration Tool](migrate-from-an-earlier-version-of-bonita-bpm.md), so that the database and configuration is updated. Then you must upgrade MySQL to version 8.0. See [Migrating to Bonita 7.9+ using MySQL](migrate-from-an-earlier-version-of-bonita-bpm.md#mysql8) for more details.

::: info
**Note:** Bonita requires MySQL to use [UTF-8 encoding](database-configuration.md#utf8_requirement), which is an alias for 'utf8mb3', now deprecated by MySQL. 
The [official recommendation is to use 'utf8mb4'](https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8.html). Bonitasoft will handles this change in a later release.
:::

<a id="other-dependencies"/>

### Supported Operating Systems
Bonita now supports Red Hat Enterprise Linux 7, and Ubuntu 18.04 LTS


## Componentization and tools for developers

### Embed Bonita Engine in your application

You can now easily embed a Bonita Engine and easily interact with processes within your business application.  
This can be done in two different ways:
* using standard Spring Boot starter integration
* programmatically, calling Bonita Engine code through Java, Kotlin, Groovy, or any other language running on JVM

For more information, see [how to embed Bonita Engine](embed-engine.md).

**Warning**: This is a Lab feature and is subject to change without warning in any version. It is not recommended for production.

## Feature deprecations and removals

### Deprecations

#### EJB

EJB communication protocol with the engine is now deprecated. Removal is planned for 7.10 version.

#### Wildfly Bundle

The Wildfly bundle has been deprecated in Bonita 7.9. 
If you are using the Wildfly bundle, we advise you to switch to the Tomcat bundle when migrating to 7.9. 
The Wildfly bundle was mainly used with the SQL server database. The Tomcat bundle is now compatible with it, and is the recommended solution.

### Removals

<a id="32bits-installers"/>

#### 32 bits installers
32 bits installers for all platforms are no longer provided.

#### SAP JCO2 connector (Subscription only)
The SAP JCO2 connector is no longer available. SAP JCO3 connector is more recent and can still be used.

#### Deploy zip
The BonitaSubscription-x.y.z-deploy.zip is no longer provided starting from Bonita 7.9.
Please use the Tomcat bundle instead, or see the [Custom Deployment](deploy-bundle.md) page for more specific needs.

## Bug fixes

## Bug fixes

### Fixes in Bonita 7.9.0 (2019-06-13)
#### Fixes in Engine component
* BR-69 SQLServerException error when deleting cases with more then 2100 subprocesses
* BS-15896 Unable to configure EntityManagerFactory
* BS-18364 Connector Replay stays in state TO_RE_EXECUTE when executeFlowNode arrives at the same time the task is transitioning from 'initializing' to 'ready'
* BS-18734 Deploying a BAR with two forms with the same name but a different case leads to Unique index or primary key violation CONSTRAINT_INDEX_29 BAR_RESOURCE(TENANTID, PROCESS_ID, NAME, TYPE)
* BS-18748 Portal Organization IMPORT button has no feedback
* BS-18874 work execution: 5 seconds SELECT * FROM flownode_instance WHERE kind = 'boundaryEvent' ...
* BS-18880 work execution: 84 seconds SELECT * FROM from flownode_instance where logicalGroup3=nn and terminal=0 order by id ASC limit 1;
* BS-18910 message_instance x waiting_event couples: 72 seconds request duration
* BS-19082 Long execution duration for this processAPI.searchAssignedAndPendingHumanTasks API call
* BS-19239 Exception during Quartz Job execution leaves the associated flownode in WAITING state and the process execution is stopped
* BS-19293 REST API extension: ClassCastException
* BS-19295 SELECT widget sets the field of the variable holding the initial value to null when the page/form loads if it is shared by another SELECT widget
* BS-19298 Process may end up locked forever
* BS-19319 [BDM] Business Object Java Setter does not create aggregated instances
* BS-19322 Contract validation fail if a complex contract input is null and has a multiple complex child contract input
* BS-19335 Timers triggers keep being rescheduled and are not fired on time or fired randomly
* BS-19345 Script Connector does not return stderr in connector result

#### Fixes in Studio component
* BST-126 Studio must be restarted to use User-defined functions
* BST-132 Wrong script generated in some specific cases with multiple data
* BST-162 Generate process documentation does not work post 7.7
* BST-204 Default Application created in the Portal raises an error about custompage_home when imported and Deployed from Studio
* BST-221 UID allows to have 2 forms with same name when created from the Studio: this breaks LA Builder
* BST-271 Import .bpmn diagram fails

#### Fixes in UI Designer component
* UID-29 RichTextArea readOnly property should be dynamic
* UID-34 ui-bootstrap-tpls.js asset should be displayed in the Assets panel for the modal container (as for tabs container)
* UID-69 Localization help section is empty in custom widget editor
* UID-86 Modal container: the focus should be located on the input element
* UID-90 Deleting one asset from a custom Widget based on the default one remove all the assets

#### Fixes in Web/Portal component
* BPO-71 REST API - bpm/humanTask filter by displayName doesn't work
