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

## API behavior change

* [addProcessComment()](https://documentation.bonitasoft.com/javadoc/api/7.7/org/bonitasoft/engine/api/ProcessRuntimeAPI.html#addProcessComment-long-java.lang.String-) method in ProcessRuntimeAPI has had a behavior change that went unnoticed in 7.3:
when called from a groovy script, it will systematically write the process comment as having been made by the "System" user, while previously it was using the user executing the task.
While the new behavior will not be reverted for this method, a new method has been introduced : [addProcessCommentOnBehalfOfUser()](https://documentation.bonitasoft.com/javadoc/api/7.7/org/bonitasoft/engine/api/ProcessRuntimeAPI.html#addProcessCommentOnBehalfOfUser-long-java.lang.String-long-), that will allow to replicate the previous behavior of the [addProcessComment()](https://documentation.bonitasoft.com/javadoc/api/7.7/org/bonitasoft/engine/api/ProcessRuntimeAPI.html#addProcessComment-long-java.lang.String-) method.
What it means in practice if your process has been designed prior to Bonita 7.3 :
* If you are calling the method outside of groovy scripts, you can use the method you like ( addProcessComment() being probably more practical), and your process will not require any additional modifications
* If you are calling the method from a groovy script, in a process designed prior to 7.3 and migrated to 7.7, and want to maintain the previous behavior, you will have to modify your groovy scripts to use the new API method.
* If your process has been designed in Bonita 7.4, 7.5 or 7.6, the behavior of your process will not change. You will however have now access to a new API method upon migration, which will open new possibilities.

### Jasper 5 connector
Jasper connector has been removed from provided connectors in the Studio. If you have a process that depends on this connector and want to migrate in 7.7+, you have two options:
* Export the Jasper connector from a previous Studio version
* Download the connector from the [community website](https://community.bonitasoft.com/project/bonita-connector-jasper)
Then just import the connector using `Development > Connectors > Import connector...` menu.

### Deprecated Workspace API
The Workspace API tooling (headless studio build) has been deprecated. You are recommanded to use the *LA builder* which is part of the tooling suite of [Bonita Continuous Delivery add-on](https://documentation.bonitasoft.com/bcd/2.0/).
