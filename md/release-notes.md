# Release notes

::: info
**Note:** The 7.9 is currently work in progress (WIP). The 7.9.0 GA is planned on June 2019.
:::

## Java 11 Migration

<a id="rest-api-extension-update"/>

### REST API extension project update
In order to be compatible with Java 11, you must update the following plug-ins dependencies in your _pom.xml_:
* _groovy-all_ dependency must be updated to **2.4.16**
* _groovy-eclipse-compiler_ dependency must be updated to **3.0.0-01**
* _groovy-eclipse-batch_ dependency must be updated to **2.4.16-02**  


## Feature removals

<a id="32bits-installers"/>

### 32 bits installers
32 bits installers for all platforms are no longer provided.