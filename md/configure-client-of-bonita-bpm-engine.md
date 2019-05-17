# Configure connection to Bonita Engine

If you want your application to use the engine API of a remote engine, your application (the *client*) must be configured to connect to the engine (the *server*)

The engine (the *server*) must also be configured to accept the connection.

<a id="client_config" />

## Client configuration

There is three ways to configure the client to connect to the Bonita Engine.

First the engine client verify if the configuration is set programmatically,
then it tries to get the configuration set in system properties, finally it falls back to the legacy way of configuration that is the bonita home client.

::: info
In order to be able to start the portal with a remote engine the following system properties must be set in the JVM starting the Portal:
 * `org.bonitasoft.platform.username` must be set with the username of the platform admin
 * `org.bonitasoft.platform.password` must be set with the password of the platform admin
:::

### Configure Client using programmatic configuration
You can configure the connection to the engine directly using `org.bonitasoft.engine.util.APITypeManager`, please refer to the [Javadoc](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/org/bonitasoft/engine/util/APITypeManager.html).

Here is an example of programmatic configuration to an engine

```java
HashMap<String,String> parameters= new HashMap<>();
parameters.put("server.url", "http://myserver.com:8080");
parameters.put("application.name", "bonita-application");
APITypeManager.setAPITypeAndParams(ApiAccessType.HTTP, parameters)
```

### Configure Client using System properties
You can set the system property `org.bonitasoft.engine.api-type` to `HTTP`, `EJB3` or `LOCAL`.
 * `HTTP`:
   The `HTTP` connection mode will connect the client to the engine using the http protocol. This is the most common way to connect to engine remotly.  
   When using `HTTP` mode, you must set the following system properties
   * `org.bonitasoft.engine.api-type.server.url`: it is the url of the server, e.g. for a engine on the same host it can be `http://localhost:8080`
   * `org.bonitasoft.engine.api-type.application.name`: it is the name of the web aplication on wich the engine HTTP API is deployed, e.g. `bonita`

::: warning
We do not guarantee to keep the http protocol stable, so we strongly recommend that you use the same version for both
the client and the server
:::
::: danger
EJB communication protocol is removed in 7.10.
:::

 * `EJB3` (deprecated, removed in 7.10)
   The `EJB3` connection mode will connect the client to the engine using EJBs.  
   You will need to specify at least `org.bonitasoft.engine.ejb.naming.reference` that is the name use to lookup the ServerAPI
 * `LOCAL`
    This is the default connection mode, it connects to the server in the same JVM (not remote). If nothing is set this mode will be used.
    
These system properties have to be set in the file `<bonita-subscription>/setup/tomcat-templates/setenv.(bat|sh)`
    
Here is an example of system configuration to an engine installed on Linux (setenv.sh) :

   ```code
ENGINE_OPTS="-Dorg.bonitasoft.engine.api-type=HTTP -Dorg.bonitasoft.engine.api-type.server.url=http://localhost:8080"
ENGINE_OPTS="${ENGINE_OPTS} -Dorg.bonitasoft.engine.api-type.application.name=bonita"
ENGINE_OPTS="${ENGINE_OPTS} -Dorg.bonitasoft.platform.username=platformAdmin -Dorg.bonitasoft.platform.password=platform"

CATALINA_OPTS="${CATALINA_OPTS} ${PLATFORM_SETUP} ${ENGINE_OPTS} ..."
export CATALINA_OPTS
   ```
Here is an example of system configuration to an engine installed on Windows (setenv.bat) :

   ```code
set ENGINE_OPTS="-Dorg.bonitasoft.engine.api-type=HTTP" "-Dorg.bonitasoft.engine.api-type.server.url=http://localhost:8080"
set ENGINE_OPTS=%ENGINE_OPTS% "-Dorg.bonitasoft.engine.api-type.application.name=bonita"
set ENGINE_OPTS=%ENGINE_OPTS% "-Dorg.bonitasoft.platform.username=platformAdmin" "-Dorg.bonitasoft.platform.password=platform"

set CATALINA_OPTS=%CATALINA_OPTS% %PLATFORM_SETUP% %ENGINE_OPTS% ...
+HeapDumpOnOutOfMemoryError
   ```

### Configure client using Bonita Home client

::: danger
Deprecated, use the programmatic way instead, see [APITypeManager](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/org/bonitasoft/engine/util/APITypeManager.html).
:::

This is a legacy way to configure the connection to the remote engine.

In this case you have to create a folder containing a `engine-client` directory and a `conf` subdirectory.
This last subdirectory must contain a file named `bonita-client-custom.properties` having as content configuration of the engine client (see below).
Finally set the System property `bonita.home` to the root folder you created.

Here is the default content of this configuration file, uncomment the part of the file corresponding to the type of connection you want and customize it according to your application.
```properties
###template file
# LOCAL
org.bonitasoft.engine.api-type = LOCAL

# HTTP
#org.bonitasoft.engine.api-type = HTTP
#server.url = http://localhost:8080
#application.name = bonita

# Remote: EJB3
#org.bonitasoft.engine.api-type = EJB3
# WildFly 10
#java.naming.factory.url.pkgs = org.jboss.ejb.client.naming
#default EJB reference name
#org.bonitasoft.engine.ejb.naming.reference=ejb:bonita-ear/bonita-ejb/serverAPIBean!org.bonitasoft.engine.api.internal.ServerAPI
```
Next you can go to `<bonita-subscription>/start-bonita.(sh|bat)` and delete the following lines so you won't be prompted to configure h2 database each time you start your Bonita server.

For Linux (start-bonita.sh) :

```code
  ./setup/setup.sh init $@
  testReturnCode $?
   ```
For Windows (start-bonita.bat) :

```code
   call setup\setup.bat init %0 %1 %2 %3 %4 %5 %6 %7 %8 %9
   if errorlevel 1 (
       goto exit
   )
   ```
   
Finally, you can edit the file `<bonita-subscription>/server/webapps/bonita/WEB-INF/web.xml` and comment these three lines to disable the engine of your Client server :

```xml
<listener> 
<listener-class>com.bonitasoft.engine.api.internal.servlet.EngineInitializerListenerSP</listener-class> 
</listener>
   ```

## Server configuration

### Server configuration to accept HTTP Connection

By default [Tomcat](tomcat-bundle.md) and [WildFly](wildfly-bundle.md) bundles are configured to accept connection for HTTP connections.

It is configured in the `web.xml` file of the web application like this:

```xml
<servlet>
    <servlet-name>HttpAPIServlet</servlet-name>
    <servlet-class>org.bonitasoft.engine.api.internal.servlet.HttpAPIServlet</servlet-class>
</servlet>
```

::: warning
This HTTP access  is not secured, it should not be exposed outside a trusted area. We recommend you to deactivate it if you expose directly your deployment to the outside world.
:::

### Server configuration to accept EJB3 connection

::: danger
EJB communication protocol is removed in 7.10.
:::

By default the [WildFly bundle](wildfly-bundle.md) is configured to accept connection for EJB3.

For an EJB3 client connection to work with WildFly 10, there are some additional configuration steps.

If the client is not located on the same host than the WildFly server, you need to create a Application user in the WildFly administration console.  
So open the WildFly administration console and [create a user account](https://docs.jboss.org/author/display/WFLY10/add-user+utility) to be used for remote connections (for example, username _bonita_ and password _bpm_).  

Your Java client needs to have the WildFly client classes in the classpath for it to communicate correctly with the server.  
If you use Maven to manage your dependencies, add the following dependency in your pom.xml :

```xml
<dependency>
    <groupId>org.wildfly</groupId>
    <artifactId>wildfly-ejb-client-bom</artifactId>
    <version>10.1.0.Final</version>
    <type>pom</type>
</dependency>
```

The same kind of configuration is possible if you use some other dependency management tool like gradle or ivy.  
If you do not use any management tool, you have to include the _jboss-client.jar_ to your classpath. It is available in the WildFly bundle in the $WILDFLY_HOME/bin/client folder.

*Create a property file* named `jboss-ejb-client.properties`, to the client classpath.  
It contains information needed to make the remote connection, including the username and password of the user you created in the WildFly console, as shown below:

```
endpoint.name=client-endpoint
remote.connectionprovider.create.options.org.xnio.Options.SSL_ENABLED=false
remote.connections=default

remote.connection.default.host=myhostname
remote.connection.default.port = 8080
remote.connection.default.connect.options.org.xnio.Options.SASL_POLICY_NOANONYMOUS=false
remote.connection.default.username=bonita
remote.connection.default.password=bpm
```

Update the `bonita-client.properties` file configured in the `${bonita.home}/client/conf` folder for the bonita client to connect to the server with the appropriate API type.

```
# Remote: EJB3
org.bonitasoft.engine.api-type = EJB3
# WildFly 10
java.naming.factory.url.pkgs = org.jboss.ejb.client.naming
#default EJB reference name
org.bonitasoft.engine.ejb.naming.reference=ejb:bonita-ear/bonita-ejb/serverAPIBean!org.bonitasoft.engine.api.internal.ServerAPI
```

If it is not already done for the WildFly server to accept remote connections, update the WildFly configuration file, standalone.xml:
* In the interfaces section, modify the IP address so that the Bonita Engine is visible to the network.
* Specify that port 4447 comes from the remoting socket-binding.

## Troubleshooting

If the following stacktrace appears in your client console :
```
IllegalStateException
Sep 29, 2015 3:46:16 PM org.jboss.ejb.client.EJBClient <clinit>
INFO: JBoss EJB Client version 1.0.5.Final
Exception in thread "main" java.lang.IllegalStateException: No EJB receiver available for handling [appName:bonita-ear,modulename:bonita-ejb,distinctname:] combination for invocation context org.jboss.ejb.client.EJBClientInvocationContext@24e6d224
        at org.jboss.ejb.client.EJBClientContext.requireEJBReceiver(EJBClientContext.java:584)
        at org.jboss.ejb.client.ReceiverInterceptor.handleInvocation(ReceiverInterceptor.java:119)
        at org.jboss.ejb.client.EJBClientInvocationContext.sendRequest(EJBClientInvocationContext.java:181)
        at org.jboss.ejb.client.EJBInvocationHandler.doInvoke(EJBInvocationHandler.java:136)
        at org.jboss.ejb.client.EJBInvocationHandler.doInvoke(EJBInvocationHandler.java:121)
        at org.jboss.ejb.client.EJBInvocationHandler.invoke(EJBInvocationHandler.java:104)
        at com.sun.proxy.$Proxy0.invokeMethod(Unknown Source)
        at org.bonitasoft.engine.api.EJB3ServerAPI.invokeMethod(EJB3ServerAPI.java:68)
        at org.bonitasoft.engine.api.impl.ClientInterceptor.invoke(ClientInterceptor.java:86)
        at com.sun.proxy.$Proxy1.login(Unknown Source)
        at org.support.bonitasoft.example.CountInstances.login(CountInstances.java:127)
        at org.support.bonitasoft.example.CountInstances.main(CountInstances.java:90)
```

It means that the `jboss-ejb-client.properties` has not been found in the classpath or that it has not been configured correctly.
