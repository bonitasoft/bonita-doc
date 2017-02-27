# How to map authorization rules

## Introduction

This tutorial explains how to customize authorization rule mapping.

Authorization rule is a java bean that must implement `getId` and `isAllowed` methods.

Authorization Rule Mapping is a set of rules used to allow connected user to access [page and form](page-and-form-development-overview.md). An empty list grants access to user. A non empty list allows access if all rules return true to their `isAllowed` method. Those rules grant or not access to the connected user for:
  * use a page or form to start a process
  * display process overview
  * use a page or form to execute a task

The tutorial can be used with Bonita BPM Community edition, and uses features that are available in all editions.

::: warning
The following elements may be used as extension points but could be subject to change across versions. No changes are planned, but we reserve the right to change make incompatible changes in any future version.
:::

## Create and deploy custom authorization rule

### Create custom authorization rule java project

In this example, Custom authorization rule is a maven-based java project that need a `maven` dependency on `bonita-server` maven artifact.

* `pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.bonitasoft.example</groupId>
    <artifactId>authorization-tutorial</artifactId>
    <version>1.0-SNAPSHOT</version>
    <dependencies>
        <dependency>
            <groupId>org.bonitasoft.engine</groupId>
            <artifactId>bonita-server</artifactId>
            <version>${bonita-server.version}</version>
        </dependency>
    </dependencies>
    <properties>
        <bonita-server.version>[${varVersion}.0,)</bonita-server.version>
    </properties>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.5.1</version>
                <configuration>
                    <source>1.7</source>
                    <target>1.7</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

* create CustomRule class that implements `org.bonitasoft.engine.page.AuthorizationRule`

```java
package org.bonitasoft.example.authorization;

import java.io.Serializable;
import java.util.Map;

import org.bonitasoft.engine.commons.exceptions.SExecutionException;
import org.bonitasoft.engine.core.process.instance.api.ProcessInstanceService;
import org.bonitasoft.engine.page.AuthorizationRule;
import org.bonitasoft.engine.page.AuthorizationRuleWithParameters;
import org.bonitasoft.engine.session.SessionService;
import org.bonitasoft.engine.sessionaccessor.SessionAccessor;

public class CustomRule extends AuthorizationRuleWithParameters implements AuthorizationRule {

    private ProcessInstanceService processInstanceService;

    private SessionService sessionService;

    private SessionAccessor sessionAccessor;

    public CustomRule(ProcessInstanceService processInstanceService, SessionService sessionService, SessionAccessor sessionAccessor) {
        // some services autowired by spring
        this.processInstanceService = processInstanceService;
        this.sessionAccessor = sessionAccessor;
        this.sessionService = sessionService;
    }

    @Override
    public boolean isAllowed(String key, Map<String, Serializable> context) throws SExecutionException {
        //add business logic here
        return true;
    }

    @Override
    public String getId() {
        return "CUSTOM_RULE_UNIQUE_ID";
    }
}

```

* create CustomAuthorizationRuleMapping class that implements `org.bonitasoft.engine.core.form.AuthorizationRuleMapping`

```java
package org.bonitasoft.example.authorization;

import java.util.Arrays;
import java.util.List;

import org.bonitasoft.engine.core.form.AuthorizationRuleMapping;

public class CustomAuthorizationRuleMapping implements AuthorizationRuleMapping {

    @Override
    public List<String> getProcessStartRuleKeys() {
        return Arrays.asList("CUSTOM_RULE_UNIQUE_ID");
    }

    @Override
    public List<String> getProcessOverviewRuleKeys() {
        return Arrays.asList("CUSTOM_RULE_UNIQUE_ID");
    }

    @Override
    public List<String> getTaskRuleKeys() {
        return Arrays.asList("CUSTOM_RULE_UNIQUE_ID");
    }
}

```

* build maven jar

```
mvn clean install
```

### Configure engine with new rules

* copy jar into `webapps/bonita/WEB-INF/lib/` folder (for default tomcat bundle)

* pull current engine configuration using platform setup tool

```
 ./setup/setup.sh pull  
```

* add customRule bean registration in `platform_conf/current/tenants/TENANT_ID/tenant_engine/bonita-tenant-custom.xml`

```xml
 <bean id="customRule" class="org.bonitasoft.example.authorization.CustomRule">
    <constructor-arg name="processInstanceService" ref="processInstanceService" />
    <constructor-arg name="sessionService" ref="sessionService" />
    <constructor-arg name="sessionAccessor" ref="sessionAccessor" />
 </bean>         
 
```

* add customAuthorizationRuleMapping bean registration in `platform_conf/current/tenants/TENANT_ID/tenant_engine/bonita-tenant-custom.xml`

```xml
 <bean id="customAuthorizationRuleMapping"
          class="org.bonitasoft.example.authorization.CustomAuthorizationRuleMapping"/>
```

* uncomment to declare customAuthorizationRuleMapping in `platform_conf/current/tenants/TENANT_ID/tenant_engine/bonita-tenant-community-custom.properties`

```
bonita.tenant.authorization.rule.mapping=customAuthorizationRuleMapping
```


* push current engine configuration using platform setup tool

```
 ./setup/setup.sh push  
```

* restart server

```
./bonita-stop.sh
./bonita-start.sh
```

