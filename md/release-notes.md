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
