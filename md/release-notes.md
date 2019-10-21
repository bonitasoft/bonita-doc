
# Release notes

::: info
**Note:** The 7.10 is currently work in progress (WIP). The 7.10.0 GA is planned on December 2019.
:::

## Global Changes
### Renaming
The Tomcat bundle packaging has changed. Previously called _Bonita{edition}-7.x.y-tomcat_, it has been renamed to _Bonita{edition}-7.x.y_.
The file structure underneath, the location of scripts and configuration files remain unchanged.

## New features

### Monitoring
Bonita 7.10 now includes a brand new extensible [monitoring](runtime-monitoring.md) mechanism.

### Archives
#### Contract data
Bonita 7.10 now allows (in Enterprise and Performance editions) to disable the archiving of Contract Data, to improve the platform performance. More details as to how [here](configurable-archive.md).

### Project deployment in Studio
There is a new _Deploy..._ action in Bonita Studio that lets you [deploy a whole project](project_deploy_in_dev_suite.md) (or a subset) in the embedded runtime environment.

### Studio Welcome page updated
A new design has been implemented for the studio Welcome page. It is now more project oriented in Enterprise editions and it is possible to directly import official Bonita examples like:
* Procurement example
* Expense note example
* Credit Card dispute resolution, with the implementation of an Adaptive Case Management use-case. (Enterprise only)  
This Release note is now opened at first Studio launch or can be opened later from the studio (Menu _Help_ > _Open Release Notes_)

## Improvements

### Support of invalid XML characters
Some special characters are considered as invalid in XML [(more details)](https://www.w3.org/TR/xml/#charsets) .  
In Bonita 7.10, it is now possible to submit a contract containing some of those invalid characters.  
The following connectors have also been updated to be resilient to those characters:  

 - The connector _document templating_ in version 1.1.3 removes all invalid XML characters from the resulting document. 
 - The connector _web service_ in version 1.2.5 removes all invalid XML characters from the envelope.
 
## Technical updates

### Connectors

 - The connectors _document templating_  and _web service_ dependency on [xdocreport](https://github.com/opensagres/xdocreport) has been updated from 1.0.5 to 2.0.2.

## Feature deprecations and removals

### Removals
#### Wildfly bundle
As announced in the previous release, the Wildfly bundle has been removed in the 7.10 release.

#### EJB support
As announced in the previous release, the support for EJB communication to Bonita Engine has been removed in the 7.10 release.
