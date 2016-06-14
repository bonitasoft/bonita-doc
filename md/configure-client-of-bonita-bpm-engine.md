# Configure connection to Bonita BPM Engine

If you want your application to use the engine API of a remote engine. Your application (the *client*) must be configured to connect to the engine (the *server*)

The engine (the *server*) must also be configured to accept the connection.

<a id="client_config" />

## Client configuration

There is three ways to configure the client to connect to the Bonita BPM Engine.

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
parameters.put("org.bonitasoft.engine.api-type.server.url","http://myserver.com:8080");
parameters.put("org.bonitasoft.engine.api-type.application.name","bonita-application");
APITypeManager.setAPITypeAndParams(ApiAccessType.HTTP, parameters)
```

### Configure Client using System properties
You can set the system property `org.bonitasoft.engine.api-type` to `HTTP`, `EJB3` or `LOCAL`.
 * `HTTP`:

   The `HTTP` connection mode will connect the client to the engine using the http protocol. This is the most common way to connect to engine remotly.

   When using `HTTP` mode, you must set the following system properties
   * `org.bonitasoft.engine.api-type.server.url`

      It is the url of the server, e.g. for a engine on the same host it can be `http://localhost:8080`
   * `org.bonitasoft.engine.api-type.application.name`

      It is the the of the web aplication on wich the engine HTTP API is deployed, e.g. `bonita`
 * `EJB3`

   The `EJB3` connection mode will connect the client to the engine using EJBs.

   You will need to specify at least `org.bonitasoft.engine.ejb.naming.reference` that is the name use to lookup the ServerAPI

 * `LOCAL`

    This is the default connection mode, it connects to the server in the same JVM (not remote). If nothing is set this mode will be used.

### Configure client using Bonita Home client (*legacy, not recommended*)

This is a legacy wawy to configure the connection to the remote engine.

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
# JBoss AS 7
#java.naming.factory.url.pkgs = org.jboss.ejb.client.naming
#default EJB reference name
#org.bonitasoft.engine.ejb.naming.reference=ejb:bonita-ear/bonita-ejb/serverAPIBean!org.bonitasoft.engine.api.internal.ServerAPI
# JBoss 5
#java.naming.factory.initial = org.jnp.interfaces.NamingContextFactory
#java.naming.provider.url = jnp://localhost:1099
#org.bonitasoft.engine.ejb.naming.reference=serverAPI
```


## Server configuration

### Server configuration to accept HTTP Connection

By default [Tomcat](tomcat-bundle.md) and [JBoss](jboss-bundle.md) bundles along with the `bonita.war` from the [deploy bundle](deploy-bundle.md) are configured to accept connection for HTTP connections.

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

By default the [JBoss bundle](jboss-bundle.md) is configured to accept connection for EJB3.

For an EJB3 connection to work on a custom deployment on JBoss 7, there are some additional configuration steps.

In the JBoss administration console, [create a user account](https://docs.jboss.org/author/display/AS71/Admin+Guide#AdminGuide-adduser.sh) to be used for remote connections.

**Add a properties file**, `jboss-ejb-client.properties`, to the client classpath. This file is in the `$JBOSS_HOME/bin/client` folder. 
It contains information needed to make the remote connection, including the username and password of the user you created in the JBoss console, as shown below:
```properties
endpoint.name=client-endpoint
remote.connectionprovider.create.options.org.xnio.Options.SSL_ENABLED=false
remote.connections=default
 
remote.connection.default.host=myhostname
remote.connection.default.port = 4447
remote.connection.default.connect.options.org.xnio.Options.SASL_POLICY_NOANONYMOUS=false
remote.connection.default.username 
remote.connection.default.password 
```

Add the following **Maven dependency**:
```
<dependency>
        <groupId>org.jboss.as</groupId>
        <artifactId>jboss-as-ejb-client-bom</artifactId>
        <version>7.1.1.Final</version>
        <type>pom</type>
</dependency>  
```

**Update the JBoss configuration file**, `standalone.xml`: 

* In the `interfaces` section, modify the IP address so that the Bonita BPM Engine is visible to the network.
* Specify that port 4447 comes from the remoting socket-binding.

