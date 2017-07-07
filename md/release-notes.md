# Release notes


<a id="living-application-development-and-deployment"/>

## Living Application development and deployment


### Industrialization of Living Application (in Studio)

## Technology updates

### Removed support 

#### Internet Explorer 11

### Other dependency updates

### API removals
  
## Breaking changes

 
### Forms, pages, layouts CSS cleaned


## Limitations and known issues

## Bug fixes

### Fixes in Bonita BPM 7.5.2

#### Fixes in Documentation
* BS-16372 7.4.x Deploy bundle installation procedure in not clear enough
* BS-16731 Applications Portal doc page still states that application development occurs in the Portal

#### Fixes in Engine component
* BS-16482 REST API Extensions are unstable in debug mode
* BS-16611 Alfresco connector breaks case instantiation
* BS-16629 Issue while resuming BPM services in Wildfly and cluster mode

#### Fixes in Studio component
* BS-16684	Business Object attributes table with height too short to access buttons on BDM Management
* BS-16692	Incoherence after contract type update
* BS-16699	In application page tokens,"-" and "_" are not considered as valid characters
* BS-16705	.proc file size is too BIG due to complex contrat input references in expression
* BS-16723	Wrong studio warning: cannot store the count query in a process data of type long
* BS-16729	When switching from one diagram to another, tab operations is not updated
* BS-16730	Missing import of BPMN2 diagram in the Studio
* BS-16732	Cannot assign a Parameter to a Data to send to a child process

#### Fixes in UI Designer component
* BS-16736 leaving the Rich text Area Max value empty leads to an error message

#### Fixes in Web component
* BS-16482 REST API Extensions are unstable in debug mode
* BS-16021 Http 400 response for font resources in an application page designed with UID
* BS-16263 Security fails in bonita/portal/resource/app and LivingApplicationPageServlet
* BS-16350 While using IE, IFrame removal causes loss of the ability to focus input elements
* BS-16474 Analytics Case history japser report broken
* BS-16758 Bonita wildfly bundle startup failure with the MS SQL Server 6.0 JDBC Driver Version
* BS-16809 File contract input is loaded twice in memory

### Fixes in Bonita BPM 7.5.1

#### Fixes in Documentation
* BS-15711 Connector maxThreads default is 20 and not 200 as indicated in the Doc

#### Fixes in Engine component
* BS-14752 Improve validation messages when two BOs of type A are in a composition in BO of type B
* BS-15015 Cannot start case with a Search Index referencing a Business data
* BS-16057 ProcessApi.sendMessage does not allow the messageContent value to be null or an empty string
* BS-16188 Invalid connector implementation generates a NULL pointer exeption
* BS-16253 LDAP Synchronizer can not resolve dynamic LDAP groups (groupOfURLs)
* BS-16521 Cannot get the document with DocumentsSearchDescriptor.CONTENT_STORAGE_ID
* BS-16543 Timetracker activated prevents the tenant resuming

#### Fixes in Studio component
* BS-16473 Improve Studio Help message for Operations
* BS-16554 Engine errors while exporting BAR file are not displayed in Studio
* BS-16589 While setting an actor filter you can read "Connector definitions" instead "Actor filter definitions"

#### Fixes in Web component
* BS-16551 Process Actor Mapping: Label role is not displayed in section "roles mapped"
* BS-16594 Process Actor Mapping: membership popup does not load Role at first load
* BS-16626 Unmapped an entity in Process Manager mapping, the name of entity isn't displayed in title.


## Bug fixes 

