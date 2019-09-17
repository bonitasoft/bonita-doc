# Release notes

::: info
**Note:** The 7.10 is currently work in progress (WIP). The 7.10.0 GA is planned on December 2019.
:::

## Global Changes
### Renaming
The Tomcat bundle packaging has changed. Previously called _Bonita{version}-7.x.y-tomcat_, it has been renamed _Bonita{version}-7.x.y_.
The file structure underneath, the location of scripts and configuration files remain unchanged.

## New features

### Monitoring
Bonita 7.10 now includes a brand new extensible [monitoring](runtime-monitoring.md) mechanism.

## Feature deprecations and removals

### Removals
#### Wildfly bundle
As announced in the previous release, the Wildfly bundle has been removed in the 7.10 release.

#### EJB support
As announced in the previous release, the support for EJB communication to Bonita Engine has been removed in the 7.10 release.