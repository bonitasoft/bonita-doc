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

## Deprecation

### EJB

EJB communication protocol with the engine is now deprecated. Removal is planned for 7.10 version.

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

### Databases supported

#### Oracle

From Bonita 7.9, the supported version of Oracle database is **12c (12.2.x.y)**

#### PostgreSQL

From Bonita 7.9, the supported version of PostgreSQL database is **11.2**

#### Microsoft SQL Server

Microsoft SQL Server **open-source drivers** are now provided by Bonita. There is no need to download and install them manually anymore.

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

### Migration

For Bonita 7.9.0, the migration step tries to migrate the *CMIS*, *Email* and *Webservice* connectors of the processes deployed on the platform, along with their dependencies, to allow the migrated platform to run on Java 11.
The step works at best effort:
* It will try to upgrade all the connectors it can.
* It will not upgrade connectors that have dependencies used by other connectors. Those connectors will still work on java 8, but not in java 11, and will require a manual update.
* A detailed report of all the changes made is displayed at the end of the migration step.
* Beware that if one of these connectors' removed dependencies was used in one your scripts, it will still be removed/updated, and therefor your scripts might not work anymore after migration. The full list of updated and deleted dependencies can be found below.

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

The following dependencies were updated to ensure Java 11 compliance:
- _org.apache.chemistry.opencmis:chemistry-opencmis-client-impl_ dependency has been updated from _0.13.0_ to _1.1.0_
- _org.apache.chemistry.opencmis:chemistry-opencmis-client-api_ dependency has been updated from _0.13.0_ to _1.1.0_
- _org.apache.chemistry.opencmis:chemistry-opencmis-commons-api_ dependency has been updated from _0.11.0_ to _1.1.0_
- _org.apache.chemistry.opencmis:chemistry-opencmis-commons-impl_ dependency has been updated from _0.11.0_ to _1.1.0_
- _org.apache.chemistry.opencmis:chemistry-opencmis-client-bindings_ dependency has been updated from _0.11.0_ to _1.1.0_
- _org.apache.cxf:cxf-rt-bindings-xml_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-frontend-simple_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-core dependency_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-transports-http_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-ws-policy_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-ws-addr_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-bindings-soap_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-databinding-jaxb_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.cxf:cxf-rt-frontend-jaxws_ dependency has been updated from _2.7.7_ to _3.0.12_
- _org.apache.neethi:neethi_ dependency has been updated from _3.0.2_ to _3.0.3_
- _org.apache.ws.xmlschema:xmlschema-core_ dependency has been updated from _2.0.3_ to _2.2.1_


The following dependencies have been added to ensure Java 11 compliance:

- _org.apache.cxf:cxf-rt-wsdl-3.0.12_

The following dependencies have been removed: 

- _org.jvnet.mimepull:mimepull-1.9.4.jar_
- _org.codehaus.woodstox:stax2-api-3.1.1.jar_
- _org.apache.geronimo.javamail:geronimo-javamail_1.4_spec-1.7.1.jar_
- _org.codehaus.woodstox:woodstox-core-asl-4.2.0.jar_
- _org.apache.cxf:cxf-api-2.7.7.jar_

In addition _bonita-connector-cmis-<specific Implementation>.jar_ and _bonita-connector-cmis-common-<version>.jar_ have been replaced by a single bonita-connector-cmis-<version>.jar

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

### Asynchronous connector execution

Connectors are executed in an asynchrous manner. In earlier versions each work was waiting for the connector to end before processing other workload. This resulted in degraded performance if few connectors had a long execution time.
Worker threads are now released as soon as the execution of the connector is triggered. see [connector execution page](connectors-execution.md) for more details.

## Timer execution

Bugs were fixed to increase stability of the integration with Quartz

* BS-19239 Exception during Quartz Job execution leaves the associated flownode in WAITING state and the process execution is stopped
* BR-56 Failure in a cron timer cancels future executions

A [new page](timers-execution.md) was added to explain how Timers are executed and how to handle time execution failures

Also details were added on how to configure Quartz for timers execution: [quartz performance tunning](performance-tunning.md#cron)

