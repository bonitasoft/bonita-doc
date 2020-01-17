# Release notes

::: info
**Note:** The 7.11 is currently work in progress (WIP). The 7.11.0 GA is planned on June 2019.
:::


## Runtime changes

### lib upgrade
- spring, spring-boot
- hibernate 4 to 5
- ...


## Bundle changes

Upgrade Tomcat to 8.5.47 (tomcat-dbcp to 9.0.30) **subject to change prior GA**


### Tomcat Manager removal

- the Tomcat Manager is no more provided
- the bundle is not intended to be used to deploy extra webapps
- alternatives exist to deploy extra webapps if still needed

### Tomcat root url redirected to Bonita

Simplify access to bonita by redirecting tomcat root to the bonita webapps.
For instance http://localhost:8080 redirected to http://localhost:8080/bonita

TODO: find other rationales


## API Removal
### web-extensions

**In Progress**

The classes located in the `org.bonitasoft.console.common.server` have been removed. They have been deprecated since December 2015 as of Bonita 7.2.0

Replacements
- `org.bonitasoft.console.common.server.page.PageContext` by `org.bonitasoft.web.extension.page.PageContext`
- `org.bonitasoft.console.common.server.page.PageController` by `org.bonitasoft.web.extension.page.PageController`
- `org.bonitasoft.console.common.server.page.PageResourceProvider` by `org.bonitasoft.web.extension.page.PageResourceProvider`


An example of `PageController` migration is available in the [bonita-distrib github repository](https://github.com/bonitasoft/bonita-distrib/commit/f1f9d356c96d4e2807bd8b59376ce57d4af89b9a#diff-caa18f5f325ab429a66c76851e3bdd42)


