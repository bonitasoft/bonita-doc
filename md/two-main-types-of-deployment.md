# Two main types of Bonita deployment

Discover the two main types of deployments of a Bonita Platform.

There are two main types of deployment
* Bonita Portal + Bonita Engine on the same application server: this is the usual deployment and the default one when
using a Bonita bundle
* Bonita Portal and Bonita Engine running on two different application servers

::: warning
The deployment of Bonita Portal and Bonita Engine running on two different application servers is **deprecated**.
It will not be supported starting from **Bonita version 2021.2**.   
:::

## Foreword
It is highly recommended using the provided Tomcat or WildFly bundles in order to carry out these deployments
successfully.

## Bonita Portal + Bonita Engine on the same application server

![deploy1](images/images-6_0/poss_deploy1.png)

This is the simplest deployment configuration. The engine used is the one embedded in the webapp bonita.war. Using the pre-packaged Tomcat or Wildfly bundle is the easiest way to achieve this kind of deployment.
It is fast because the Bonita Portal and the Bonita Engine run on the same JVM and so there is no serialization and network overhead every time the Bonita Portal calls the engine.

**Advantages**

* simple (single webapp and application server)
* works out of the box if you use the provided Tomcat or Wildfly bundle
* you can still access the embedded Bonita Engine API (or the Bonita Portal REST API) through HTTP if you need an external application to access it
* improved performance

**Drawbacks**

* may not be adapted to some architecture constraints

## Bonita Engine on a remote application server

Even if the `bonita.war` comes with an embedded Bonita Engine, you can choose **not** to use it.

### Accessible through HTTP

![deploy2](images/images-6_0/poss_deploy2.png)

With this deployment, the Bonita Engine is accessed by the portal (and possibly other applications) through HTTP. The Bonita
Portal is deployed on one application server and the engine on another one.
But you can still use the pre packaged Tomcat or Wildfly bundles, in both servers.
On one of them, only the Bonita Portal part will be used and on the other one, only the engine server.
Access to the portal can be de-activated by server or webapp configuration if necessary.

**Advantages**

* may be adapted to some architecture and network constraints

**Drawbacks**

* more complex than the first deployment option (two application servers instead of one)
* impact on performance (serialization + network overhead)


### Configuring the Bonita Runtime

The example below is for use with the Tomcat and Wildfly bundles. 

#### Bonita Engine

Follow the regular installation (see the [Tomcat](tomcat-bundle.md) or the [Wildfly](wildfly-bundle.md) bundle installation page)
and use the setup tool to configure Bonita


#### Bonita Portal 

##### Bonita Portal configuration overview

* unarchive the bundle
* configure custom authentication if required, see the [user authentication overview](user-authentication-overview.md) 
* apply the following to make the Portal be a Client of the Bonita Engine
* then you can start the Bonita Portal bundle with the startup script

In this deployment, the Engine Client used by the Bonita Portal is configured by setting JVM System Properties for the following elements
* instruct the Engine Client to use the HTTP protocol
* set the url to the Engine
* use username and password that match credentials configured for the platform admin (see the [Tomcat](tomcat-bundle.md)
or the [Wildfly](wildfly-bundle.md) bundle configuration page)
* for more details, please read [configuring the connection to a remote engine](configure-client-of-bonita-bpm-engine.md#client_config)

In addition, all database datasources are disabled


##### Common to all bundle types

Remove the content of the `setup` directory as the setup tool in not used on the Portal part

##### Tomcat

Configure the Engine Client by setting system properties in the `<bonita-installation-directory>/server/bin/setenv.(bat|sh)` file
We suggest to define a `ENGINE_OPTS` variable and add its content to the `CATALINA_OPTS` variable
    
On Linux (setenv.sh)
```
ENGINE_OPTS="-Dorg.bonitasoft.engine.api-type=HTTP -Dorg.bonitasoft.engine.api-type.server.url=http://localhost:8080"
ENGINE_OPTS="${ENGINE_OPTS} -Dorg.bonitasoft.engine.api-type.application.name=bonita -Dorg.bonitasoft.engine.api-type.connections.max=20"
ENGINE_OPTS="${ENGINE_OPTS} -Dorg.bonitasoft.platform.username=platformAdmin -Dorg.bonitasoft.platform.password=platform"

CATALINA_OPTS="${CATALINA_OPTS} ${ENGINE_OPTS} ${PLATFORM_SETUP} ..."
export CATALINA_OPTS
```

On Windows (setenv.bat)
```
set ENGINE_OPTS="-Dorg.bonitasoft.engine.api-type=HTTP" "-Dorg.bonitasoft.engine.api-type.server.url=http://localhost:8080"
set ENGINE_OPTS=%ENGINE_OPTS% "-Dorg.bonitasoft.engine.api-type.application.name=bonita -Dorg.bonitasoft.engine.api-type.connections.max=20"
set ENGINE_OPTS=%ENGINE_OPTS% "-Dorg.bonitasoft.platform.username=platformAdmin" "-Dorg.bonitasoft.platform.password=platform"

set CATALINA_OPTS=%CATALINA_OPTS% %ENGINE_OPTS% %PLATFORM_SETUP% ...
```

Remove the `<bonita-installation-directory>/server/webapps/bonita` folder if it exists
Edit the `WEB-INF/web.xml` file in the `<bonita-installation-directory>/server/webapps/bonita.war` file and comment the
following lines to disable Engine resources

Community Edition only: listener starting the Engine
```xml
<listener> 
    <listener-class>org.bonitasoft.engine.api.internal.servlet.EngineInitializerListener</listener-class> 
</listener>
```

Subscription Edition only: listener starting the Engine
```xml
<listener> 
    <listener-class>com.bonitasoft.engine.api.internal.servlet.EngineInitializerListenerSP</listener-class> 
</listener>
```

HTTP Engine API Configuration
```xml
    <servlet>
        <servlet-name>HttpAPIServlet</servlet-name>
        <servlet-class>org.bonitasoft.engine.api.internal.servlet.HttpAPIServlet</servlet-class>
    </servlet>
...
    <servlet-mapping>
        <servlet-name>HttpAPIServlet</servlet-name>
        <url-pattern>/serverAPI/*</url-pattern>
    </servlet-mapping>
```

Disable XA datasources managed by Bitronix by commenting or deleting the following line in the `<bonita-installation-directory>/server/conf/server.xml` file 
```xml
  <Listener className="bitronix.tm.integration.tomcat55.BTMLifecycleListener" />
```

Disable datasources managed by Tomcat by commenting or removing database resources declared in the in the `<bonita-installation-directory>/conf/Catalina/localhost/bonita.xml` file


##### Wildfly

Edit the `<bonita-installation-directory>/server/standalone/configuration/standalone.xml` file as described in the following

Configure the Engine Client
```xml
    <system-properties>
        ...
        <!-- Engine Client configuration -->
        <property name="org.bonitasoft.engine.api-type" value="HTTP" />
        <property name="org.bonitasoft.engine.api-type.server.url" value="http://localhost:8080" />
        <property name="org.bonitasoft.engine.api-type.application.name" value="bonita" />
        <property name="org.bonitasoft.engine.api-type.connections.max" value="20" />
        <property name="org.bonitasoft.platform.username" value="platformAdmin" />
        <property name="org.bonitasoft.platform.password" value="platform" />
    </system-properties>
```

Remove or comment the datasources configuration
```xml
    <subsystem xmlns="urn:jboss:domain:datasources:4.0">
        <datasources>
        ...
        </datasources>
    </subsystem>
```


Edit the `<bonita-installation-directory>/server/standalone/deployments/bonita-all-in-one-x.y.z.ear/bonita.war/WEB-INF/web.xml`

Apply the same changes as for the Tomcat bundle to disable Engine resources


### Accessible through RMI (EJB3) - Deprecated Solution

::: danger
EJB communication protocol is removed in 7.10.
:::

![deploy3](images/images-6_0/poss_deploy3.png)

With this third type of deployment, the engine is accessed by the Bonita Portal (and possibly other applications) through the EJB.
The Portal is deployed on one application server and the engine on another one.
However, you can still use the pre packaged Tomcat bundle for the Bonita Portal and the pre-packaged WildFly Bundle for the Bonita Engine.
In this case, you will need to add the WildFly client libraries to the classpath of the Bonita Portal webapp. 
On one of the application servers, only the portal part will be used and on the other one, only the engine server. 
Access to the Bonita Portal can be deactivated by server or app configuration, if necessary.

**Advantages**

* may fit some architecture and network constraints

**Drawbacks**

* more complex than the first deployment option (two application servers instead of one)
* impact on performance (serialization + network overhead) but it should be faster than the second option though (no HTTP protocol overhead)
