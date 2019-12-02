# Two main types of Bonita deployment

Discover the two main types of deployments of a Bonita Platform.

There are two main types of deployment
* Bonita Portal + Bonita Engine on the same application server: this is the usual deployment and the default one when
using a Bonita bundle
* Bonita Portal and Bonita Engine running on two different application servers

## Bonita Portal + Bonita Engine on the same application server

![deploy1](images/images-6_0/poss_deploy1.png)

Bonita Portal and the Bonita Engine run on the same JVM. This is the simplest deployment configuration and is also the most performant as there is no serialization and network overhead.
To perform this setup, you can use the [prepackaged bundle](tomcat-bundle.md) or the Bonita [docker image](bonita-docker-installation.md).

**Advantages**

* simple (single webapp and application server)
* works out of the box
* you can access the embedded Bonita Engine API (or the Bonita Portal REST API) through HTTP if you need an external application to access it
* improved performance

**Drawbacks**

* may not be adapted to some architecture constraints

## Bonita Engine on a remote application server

![deploy2](images/images-6_0/poss_deploy2.png)

With this deployment, the Bonita Engine is accessed by the portal (and possibly other applications) through HTTP. The Bonita
Portal is deployed on one application server and the engine on another one.
But you can still use the pre-packaged Tomcat bundle, or Bonita docker image, in both servers.
On one of them, only the Bonita Portal part will be used and on the other one, only the engine server.
Access to the portal can be de-activated by server or webapp configuration if necessary.

**Advantages**

* may be adapted to some architecture and network constraints (DMZ)

**Drawbacks**

* more complex than the first deployment option (two application servers instead of one)
* impact on performance (serialization + network overhead)


### Configuring the Bonita Runtime

The example below is for use with the Tomcat bundle. 

#### Bonita Engine

Follow the regular installation (see the [Tomcat bundle](tomcat-bundle.md) installation page)
and use the setup tool to configure Bonita

#### Bonita Portal 
In this deployment, we will configure the Bonita Engine Client used by the Bonita Portal, by setting JVM System Properties for the following elements :
* set the Engine Client to use the HTTP protocol
* set the url to the Engine
* set username and password that match credentials configured for the platform admin (see the [Tomcat bundle](tomcat-bundle.md) configuration page)
In addition, all database datasources will be disabled

For more details, please read [configuring the connection to a remote engine](configure-client-of-bonita-bpm-engine.md#client_config)

##### Configuring the Bonita Portal
:::info 
**Note:** At the end of these steps, you can start the Bonita Portal bundle with the startup script.
:::

Unarchive the bundle.
Remove the content of the `setup` directory as the setup tool in not used on the Portal part

Configure the Engine Client by setting system properties in the `<bonita-installation-directory>/server/bin/setenv.(bat|sh)` file
We suggest to define a `ENGINE_OPTS` variable and add its content to the `CATALINA_OPTS` variable, and remove `ARJUNA_OPTS`
    
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

Disable XA datasources managed by Arjuna by commenting or deleting the following line in the `<bonita-installation-directory>/server/conf/server.xml` file 
```xml
  <Listener className="org.jboss.narayana.tomcat.jta.TransactionLifecycleListener" />
```

Disable datasources managed by Tomcat by commenting or removing database resources declared in the in the `<bonita-installation-directory>/conf/Catalina/localhost/bonita.xml` file

You can now start the Bonita Portal bundle with the startup script.