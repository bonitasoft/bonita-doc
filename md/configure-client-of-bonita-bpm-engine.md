# Configure connection to Bonita Engine

If you want your application to use the engine API of a remote engine, your application (the *client*) must be configured to connect to the engine (the *server*)

The engine (the *server*) must also be configured to accept the connection.

**Note**: the Bonita Portal can be configured to be used as a Client of the Bonita Engine. See the [Alternate Bonita Deployment](two-main-types-of-deployment.md)
documentation for more information


<a id="client_config" />

## Client configuration

There is three ways to configure the client to connect to the Bonita Engine.

First the engine client verify if the configuration is set programmatically,
then it tries to get the configuration set in system properties, finally it falls back to the legacy way of configuration that is the bonita home client.

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
You can set the system property `org.bonitasoft.engine.api-type` to `HTTP` or `LOCAL`.
 * `HTTP`:
   The `HTTP` connection mode will connect the client to the engine using the http protocol. This is the most common way to connect to engine remotly.  
   When using `HTTP` mode, you must set the following system properties
   * `org.bonitasoft.engine.api-type.server.url`: it is the url of the server, e.g. for a engine on the same host it can be `http://localhost:8080`
   * `org.bonitasoft.engine.api-type.application.name`: it is the name of the web aplication on wich the engine HTTP API is deployed, e.g. `bonita`

::: warning
We do not guarantee to keep the http protocol stable, so we strongly recommend that you use the same version for both
the client and the server
:::

 * `LOCAL`
    This is the default connection mode, it connects to the server in the same JVM (not remote). If nothing is set this mode will be used.
    
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
```

## Server configuration

### Server configuration to accept HTTP Connection

By default the [Tomcat bundle](tomcat-bundle.md) is configured to accept connection for HTTP connections.

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
