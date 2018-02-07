# Release notes

::: info
**Note:** The 7.7 is currently work in progress (wip). The 7.7.0 GA is planned on June 2018.
:::

<a id="feature-removals"/>

## Feature removals

### Jasper 5 connector
Jasper connector has been removed from provided connectors in the Studio. If you have process that depends on this connector and want to migrate in 7.7+, you have two options:
* Export the Jasper connector from a previous Studio version
* Download the connector from the [community website](https://community.bonitasoft.com/project/bonita-connector-jasper)
Then just import the connector usomg `Development > Connectors > Import connector...` menu.