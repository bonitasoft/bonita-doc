# Release notes

::: info
**Note:** The 7.7 is currently work in progress (wip). The 7.7.0 GA is planned on June 2018.
:::


<a id="techonolgy-updates"/>

### Other dependency updates

* (Performance Edition) Bonita 7.7 now supports usage of Hazelcast on AWS out-of-the box. Previous versions required
modifying the Bonita installation.

<a id="feature-removals"/>

## Feature removals

### Jasper 5 connector
Jasper connector has been removed from provided connectors in the Studio. If you have a process that depends on this connector and want to migrate in 7.7+, you have two options:
* Export the Jasper connector from a previous Studio version
* Download the connector from the [community website](https://community.bonitasoft.com/project/bonita-connector-jasper)
Then just import the connector using `Development > Connectors > Import connector...` menu.

### Deprecated Workspace API
The Workspace API tooling (headless studio build) has been deprecated and replaced with a better tooling as part of the [Bonta Continous Integration addon](https://documentation.bonitasoft.com/bcd/2.0/).
