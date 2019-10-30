
# Release notes

## New values added

### Monitoring
Bonita 7.10 now includes a brand new extensible [monitoring](runtime-monitoring.md) mechanism.

### Guest User (Teamwork, Efficiency, Performance, and Enterprise editions only)
Opening the content of some living applications available for public access is now possible thanks to a brand new "Guest User" implemented in Bonita. Use it in process actor mappings, add it to a custom profile to access the public applications, and you allow anyone to access some public content.  
The Bonita application layout has been updated accordingly, to allow a Bonita user with credentials to login when accessing a public application and access password-protected content, if any. Learn more [here](......md).

### Archived contract data (Enterprise and Performance editions) 
Bonita 7.10 now allows to disable the archiving of Contract Data, to improve the platform performance. More details as to how [here](configurable-archive.md).

### Business Data Model handles multiple packages
Bonita 7.10 now allows to create different packages to store Business Objects.  
It is also possible to import a BDM into the existing one, as long as Business Objects names are unique accross packages, so several teams can work on different packages and get their BDM integrated at some point.    
Learn more [here](define-and-deploy-the-bdm.md).

### Project deployment in Studio
There is a new _Deploy..._ action in Bonita Studio that lets you [deploy a whole project](project_deploy_in_dev_suite.md) (or a subset) in the embedded runtime environment.

### A Bonita User Application example available 
With the User Portal Tasklist, a new Case list developed in the UI Designer (i.e. customizable), and the User Portal Process list, this Bonita User Application can be a handy starting point for your own Living Application. You can import it from the new Studio Welcome page, in the _Resources_ tile.

## Improvements

### Collaborative development of UI Designer artifacts
The JavaScript code contained in variable and custom widgets used to be presented on only one line in the code, making the code review very difficult. 
Extracting this code in external files makes it readable and makes working with Pull Requests an easy game when developing UI Designer artifacts.

### Studio Welcome page updated
A new, simplified design has been implemented for the studio Welcome page. It is now more project-oriented in the Subscription editions and it allows to directly import official Bonita project examples like:
* Procurement example
* Expense report example
* Credit Card dispute resolution, with the implementation of an Adaptive Case Management use-case. (Enterprise only)  
To easily learn about each new Bonita version highlights, you can now also find this Release notes page at first Studio launch, in a second tab right after the Welcome page. Once closed, you can retrieve it later from the studio (Menu _Help_ > _Open Release Notes_) option.

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

### utf8mb4 support
Previously, when using a Mysql database, the only supported encoding was utf8mb3, which was deprecated as of Mysql 8.
Bonita now supports the (default) utf8mb4 encoding, and it is now the recommended configuration.

### Email connector
Connector definition has been updated to add a Return-Path input parameter.

### User Task list now available for the Community edition

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

#### EJB support
As announced in the previous release, the support for EJB communication to Bonita Engine has been removed in the 7.10 release.




