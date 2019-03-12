# Release notes

::: info
**Note:** The 7.9 is currently work in progress (WIP). The 7.9.0 GA is planned on June 2019.
:::

## Java 11 Migration

<a id="rest-api-extension-update"/>

### REST API extension project update
In order to be compatible with Java 11, you must update the following plug-ins dependencies in your _pom.xml_:
* _groovy-all_ dependency must be updated to **2.4.16**
* _groovy-eclipse-batch_ dependency must be updated to **2.4.16-02** 
* _maven-compiler-plugin_ dependency must be updated to **3.8.0** 
* _groovy-eclipse-compiler_ dependency must be updated to **3.3.0-01**
	* You need to add the plugin repository below in your pom.xml
```
 <pluginRepositories>
    <pluginRepository>
      <id>bintray</id>
      <name>Groovy Bintray</name>
      <url>https://dl.bintray.com/groovy/maven</url>
      <releases>
        <updatePolicy>never</updatePolicy>
      </releases>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
    </pluginRepository>
    ...
  </pluginRepositories>
``` 

## Data Management

<a id="uid-lazyRef-filter"/>

### New embedded AngularJS filter to resolve business object lazy references
More info on how to use it [here](variables.md).

## Feature removals

<a id="32bits-installers"/>

### 32 bits installers
32 bits installers for all platforms are no longer provided.


## Technology updates

### JTA transaction manager replacement

In Bonita 7.9.0, we replaced the JTA transaction manager used to handle XA transactions in Bonita Engine from
Bitronix to Narayana (also known as Arjuna).  
This change should not impact the way to use Bonita.  
However, tuning Bonita transaction configuration is now a little different. If you wish to change the default transaction timeout,
it is now done by changing the `defaultTimeout` property in file `server/conf/jbossts-properties.xml`  instead of
file `server/conf/bitronix-config.properties`

<a id="other-dependencies"/>

## Dependency updates

### Bonita dependency updates

<a id="java-11-lib-update"/>

The following Bonita dependencies have been upgraded to improve the Java 11 support
* groovy-all from 2.4.4 to 2.4.16
* spring framework version is now 5.1.5.RELEASE
* spring-boot version is now 2.1.3.RELEASE

### Connectors dependency updates

<a id="connector-dependency-updates"/>

#### WebService connector

The following dependencies have been added, to ensure Java 11 compliance:

 - _javax.xml.stream:stax-api:1.0-2_
 - _org.codehaus.woodstox:woodstox-core-asl:4.1.2_
 - _org.codehaus.woodstox:stax2-api:3.1.1_
 - _com.sun.istack:istack-commons-runtime:2.4_
 - _javax.activation:activation:1.1_
 - _com.sun.xml.messaging.saaj:saaj-impl:1.3.28_
 - _javax.xml.ws:jaxws-api:2.2.7_
 - _com.sun.xml.ws:jaxws-rt:2.2.7_
 - _javax.jws:jsr181-api:1.0-MR1_
 - _javax.xml.bind:jaxb-api_
 - _com.sun.xml.bind:jaxb-impl_

#### CMIS connector

The version of the _org.apache.chemistry.opencmis:chemistry-opencmis-client-impl_ dependency has been updated from _0.13.0_ to _1.1.0_

The following dependencies have been added to ensure Java 11 compliance:

- _javax.xml.bind:jaxb-api:2.2.7_
- _com.sun.xml.bind:jaxb-core:2.2.7_
- _com.sun.xml.bind:jaxb-impl:2.2.7_

The following dependencies have been removed: 

- _org.apache.cxf:cxf-rt-frontend-jaxws:2.7.7_
- _org.apache.cxf:cxf-rt-transports-http:2.7.7_

#### Email connector

The version of the _javax.mail:mail_ dependency has been updated from _1.4.5_ to _1.4.7_

#### Twitter connector

The version of the _org.twitter4j:twitter4j-core_ dependency has been updated from _4.0.2_ to _4.0.7_

## Monitoring capabilities

### Engine work execution

A work execution audit mechanism has been introduced. It can be activated
to detect when a work takes too much time to be executed or it was _rescheduled_
too much times.
See [Work execution audit page](work-execution-audit.md)

## Performance

### Asynchronous connetor execution

Connectors are executed in an asynchrous manner. in earlier version each work was waiting for the connector to end before processing other workload resulting in degraded performances if few connectors have a long execution time.
Worker thread are now releases as soon as the execution of the connector is triggered. see [connector execution page](connectors-execution.md) for more details.