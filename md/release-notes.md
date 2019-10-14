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
There is a new _Deploy..._ action in the Studio that let you [deploy a whole project](project_deploy_in_studio.md) (or a subset) in the embedded runtime environment.

## Feature deprecations and removals

### Removals
#### Wildfly bundle
As announced in the previous release, the Wildfly bundle has been removed in the 7.10 release.

#### EJB support
As announced in the previous release, the support for EJB communication to Bonita Engine has been removed in the 7.10 release.
