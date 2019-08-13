# Two main types of Bonita deployment

There are two main types of deployment
* Bonita Portal + Bonita Engine on the same application server: this is the usual deployment and the default one when
using a Bonita bundle
* Bonita Portal and Bonita Engine running on two different application servers

**Note:** It is highly recommended to use the provided Tomcat bundle or the artifact `bonita.war` provided in the deploy bundle, in order to carry out these deployments successfully.

There are two main types of deployment.

## Bonita Portal + Bonita Engine on the same application server

![deploy1](images/images-6_0/poss_deploy1.png)

This is the simplest deployment configuration. The engine used is the one embedded in the webapp bonita.war. Using the pre-packaged Tomcat bundle is the easiest way to achieve this kind of deployment, but it is also possible to retrieve the `bonita.war` webapp provided in the **deploy.zip** and deploy it on another application server/servlet container.
It is fast because the Bonita Portal and the Bonita Engine run on the same JVM and so there is no serialization and network overhead every time the Bonita Portal calls the engine.

**Advantages**

* simple (single webapp and application server)
* works out of the box if you use the provided Tomcat bundle
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
But you can still use the pre-packaged Tomcat bundle, in both servers.
On one of them, only the Bonita Portal part will be used and on the other one, only the engine server.
Access to the portal can be de-activated by server or webapp configuration if necessary.

**Advantages**

* may be adapted to some architecture and network constraints

**Drawbacks**

* more complex than the first deployment option (two application servers instead of one)
* impact on performance (serialization + network overhead)


### Configuring the Bonita Runtime

The example below is for use with the Tomcat bundle. 

#### Bonita Engine

Follow the regular installation (see the [Tomcat](tomcat-bundle.md) or the [Wildfly](wildfly-bundle.md) bundle installation page)
and use the setup tool to configure Bonita

#### Bonita Portal 

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

Remove the content of the `setup` directory as the setup tool in not used on the Portal part

Configure the Engine Client by setting system properties in the `<bonita-installation-directory>/server/bin/setenv.(bat|sh)` file
We suggest to define a `ENGINE_OPTS` variable and add its content to the `CATALINA_OPTS` variable
    
On Linux (setenv.sh)
```
ENGINE_OPTS="-Dorg.bonitasoft.engine.api-type=HTTP -Dorg.bonitasoft.engine.api-type.server.url=http://localhost:8080"
ENGINE_OPTS="${ENGINE_OPTS} -Dorg.bonitasoft.engine.api-type.application.name=bonita"
ENGINE_OPTS="${ENGINE_OPTS} -Dorg.bonitasoft.platform.username=platformAdmin -Dorg.bonitasoft.platform.password=platform"

CATALINA_OPTS="${CATALINA_OPTS} ${ENGINE_OPTS} ${PLATFORM_SETUP} ..."
export CATALINA_OPTS
```

On Windows (setenv.bat)
```
set ENGINE_OPTS="-Dorg.bonitasoft.engine.api-type=HTTP" "-Dorg.bonitasoft.engine.api-type.server.url=http://localhost:8080"
set ENGINE_OPTS=%ENGINE_OPTS% "-Dorg.bonitasoft.engine.api-type.application.name=bonita"
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
