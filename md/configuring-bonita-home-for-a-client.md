# 4.5.3 Configuring Bonita Home for a client

This page explains how to set up a [Bonita home](/bonita-home.html) folder to configure properties for a client application. Every client application needs its own Bonita home.

The `bonita.home` system property points to the root directory for a client application of Bonita BPM. 
The directory contains a `client` subdirectory, which contains a `conf` subdirectory. 
The `conf` subdirectory contains the `bonita-client.properties` file. This properties file 
defines how the client application connects to the Bonita BPM Engine. 

There can be multiple clients accessing the same Bonita BPM Engine. Each client application runs in its own JVM and needs its own `bonita.home` system property, directory tree, 
and `bonita-client.properties` file. If you modify the `bonita-client.properties` files inside the application server or in the `bonita.home` of another application 
such as the Bonita BPM Portal, you risk breaking existing applications.

The following is an example of `${bonita.home}/client/conf/bonita-client.properties` for an application 
called myClientAppExample that is using a Bonita BPM Engine that is running with Tomcat:
`
application.name=myClientAppExample
org.bonitasoft.engine.api-type=HTTP
server.url=http://localhost:8080
`

The properties set in this example are the name of the application (`myClientAppExample`), the URL of the server including 
the port number (`http://localhost:8080`), and the type of server access (`HTTP`).

The Bonita BPM bundles are delivered with a `bonita-client.properties` file configured for use by a Bonita BPM Portal 
that is accessing the server locally. This file also contains template definitions for other access modes. You can take a 
copy of this file and use it as a template. The properties required vary depending on the access type that is used.
`
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
`

The client applicaton classpath must include any jar files referenced in the `bonita-client.properties` file.

## EJB3 connection and JBoss 7

For an EJB3 connection to work with JBoss 7, there are some additional configuration steps.

In the JBoss administration console, [create a user account](https://docs.jboss.org/author/display/AS71/Admin+Guide#AdminGuide-adduser.sh) to be used for remote connections.

**Add a properties file**, `jboss-ejb-client.properties`, to the client classpath. This file is in the `$JBOSS_HOME/bin/client` folder. 
It contains information needed to make the remote connection, including the username and password of the user you created in the JBoss console, as shown below:
`
endpoint.name=client-endpoint
remote.connectionprovider.create.options.org.xnio.Options.SSL_ENABLED=false
remote.connections=default
 
remote.connection.default.host=myhostname
remote.connection.default.port = 4447
remote.connection.default.connect.options.org.xnio.Options.SASL_POLICY_NOANONYMOUS=false
remote.connection.default.username 
remote.connection.default.password 
`

Add the following **Maven dependency**:
`
org.jboss.asjboss-as-ejb-client-bom7.1.1.Finalpom`

**Update the JBoss configuration file**, `standalone.xml`: 

* In the `interfaces` section, modify the IP address so that the Bonita BPM Engine is visible to the network.
* Specify that port 4447 comes from the remoting socket-binding.