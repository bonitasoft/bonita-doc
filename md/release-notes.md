# Release notes

::: info
**Note:** The 7.11 is currently work in progress (WIP). The 7.11.0 GA is planned on June 2019.
:::

## New values added

### Additional resources
Processes can now use additional resources. More details [here](additional-resources.md).


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
 
### Complex data-types generation have been removed

This feature was used to generate Java POJOs and XSD in Subscription editions. It is recommend to add your own Java model as jar file in the project classpath or create your [data model using Groovy objects](groovy-in-bonita.md#create-data-model).
