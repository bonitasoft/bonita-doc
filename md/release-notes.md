# Release notes

::: info
**Note:** The 7.11 is currently work in progress (WIP). The 7.11.0 GA is planned on June 2019.
:::

## New values added

### Business Data Model editor
BDM editor has been reworked, in order to improve the user experience.

### Generate project documentation
For Teamwork, Efficiency, Performace and Enterprise editions only.
Extract informations from a project sources to generate an asciidoc document. The generation templates can be customized to suit your needs. More details [here](project-documentation-generation.md).


## Runtime changes

### lib upgrade
- spring, spring-boot
- hibernate 4 to 5
- ...


## Bundle changes

Upgrade Tomcat from 8.5.47 to 8.5.50 (tomcat-dbcp from 9.0.16 to 9.0.30) **subject to change prior GA**


### Tomcat Manager removal

- the Tomcat Manager is no more provided
- the bundle is not intended to be used to deploy extra webapps
- alternatives exist to deploy extra webapps if still needed

### Tomcat root url redirected to Bonita

Simplify access to bonita by redirecting tomcat root to the bonita webapps.
For instance http://localhost:8080 redirected to http://localhost:8080/bonita

TODO: find other rationales


### Thread name in Bonita logs

**TODO**: improve wording + provide more info

As of Bonita 7.11, the thread name information is added in `bonita.log` (by default, right after the logger name).
This helps tracking the processing when parallel requests are in progress.
```
2020-03-02 17:32:51.529 +0100 INFO (localhost-startStop-1) org.bonitasoft.engine.EngineInitializer Initialization of Bonita Engine done! ( took 8982ms)
2020-03-02 17:33:12.515 +0100 INFO (http-nio-8080-exec-4) org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/bonita] RestletServlet: [Restlet] ServerServlet: component class is null
2020-03-02 17:33:12.792 +0100 INFO (http-nio-8080-exec-1) org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/bonita] RestletServlet: [Restlet] Attaching application: org.bonitasoft.web.rest.server.BonitaRestletApplication@383b5fb0 to URI: /bonita/API
2020-03-02 17:33:12.806 +0100 INFO (http-nio-8080-exec-1) org.restlet.Component.BonitaRestletApplication Starting org.bonitasoft.web.rest.server.BonitaRestletApplication application
2020-03-02 17:33:32.938 +0100 INFO (http-nio-8080-exec-7) org.apache.catalina.core.ContainerBase.[Catalina].[localhost].[/bonita] CustomPageRestletServlet: [Restlet] ServerServlet: component class is null
```


## No more migration between maintenance versions of Bonita
Starting with Bonita 7.11.0, it is not necessary to run the Bonita migration tool to migrate between maintenance versions of Bonita Runtime (between 7.11.**0** and 7.11.**1**, for instance).  
More details on the new procedure [here](migrate-from-an-earlier-version-of-bonita-bpm.md#maintenanceVersionCompatible)  
On the technical side, Bonita 7.11.0 introduces a loose couple between Bonita binaries and the Database schema it runs on. 
There is now a distinction between a new database field Bonita Database Schema, and the Bonita Platform Version.
The Bonita Database Schema version is, for now, a technical number (not accessible through APIs), set at ```{Major}.{Minor}```, ie. at ```7.11``` for this release.
The Bonita Platform Version is the same as the Bonita Version in versions < 7.11.0 (ie. 7.11.0, 7.11.1 etc.).
On startup Bonita now only checks if the database version is compatible with the binaries version, not if they are identical.

Aside of the quality of life update of not having to run a migration between migration versions, this update brings a few behavioral changes:
* Platform.getVersion() method now returns the version of the Bonita binaries (ie. 7.11.0), not the "version" field of the database.
* Platform.getPreviousVersion() is now deprecated, and voided (will always return ""). The method was effectively deterministic, as the queried database field was always set at ```CurrentBonitaVersion - 1```.
* A check has been added in Cluster mode as to forbid the start of nodes in different Bonita platform versions. For example, on a two nodes cluster, you can't have a node in 7.11.0 and another in 7.11.1.
The feature of having nodes in different Bonita versions was never supported, though there were cases where it "worked" in previous versions.  

## API Removal

### rest api extension

The classes located in the `org.bonitasoft.console.common.server` have been removed. They have been deprecated since December 2015 as of Bonita 7.2.0

Replacements
- for `PageController`
  - `org.bonitasoft.console.common.server.page.PageContext` by `org.bonitasoft.web.extension.page.PageContext`
  - `org.bonitasoft.console.common.server.page.PageController` by `org.bonitasoft.web.extension.page.PageController`
  - `org.bonitasoft.console.common.server.page.PageResourceProvider` by `org.bonitasoft.web.extension.page.PageResourceProvider`
- for `RestApiController `
  - `org.bonitasoft.console.common.server.page.RestApiController` by `org.bonitasoft.web.extension.rest.RestApiController`
  - `org.bonitasoft.console.common.server.page.RestApiResponse` by `org.bonitasoft.web.extension.rest.RestApiResponse`
  - `org.bonitasoft.console.common.server.page.RestApiResponseBuilder` by `org.bonitasoft.web.extension.rest.RestApiResponseBuilder`
  - `org.bonitasoft.console.common.server.page.PageContext`, `org.bonitasoft.console.common.server.page.PageResourceProvider`,
  `org.bonitasoft.console.common.server.page.RestApiUtil` are no more used and are replaced by
  `org.bonitasoft.web.extension.rest.RestAPIContext`

Examples of replacements are available in the bonita source code
- `PageController` in the [bonita-distrib github repository](https://github.com/bonitasoft/bonita-distrib/commit/f1f9d356c96d4e2807bd8b59376ce57d4af89b9a#diff-caa18f5f325ab429a66c76851e3bdd42)
- `RestApiController` in the [bonita-web github repository](https://github.com/bonitasoft/bonita-web/commit/1387c4c513bdc2bb97071cddefc75d519886ed90#diff-c08aeb7d35cf380be1cdc09fea7ef822)


## Development suite changes

### Increase the default value of the development runtime's maximum memory heap size to 1Gb (512Mo previously)

To avoid memory issues with large bar files deployment the default xmx value has been increased to 1Gb. If you want to revert this change, you can change it in the Studio preferences -> Server settings -> Tomcat Maximum memory allocation.
 
### Complex data-types generation have been removed

This feature was used to generate Java POJOs and XSD in Subscription editions. It is recommend to add your own Java model as jar file in the project classpath or create your [data model using Groovy objects](groovy-in-bonita.md#create-data-model).
