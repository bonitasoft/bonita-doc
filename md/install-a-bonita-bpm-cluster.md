# Bonita cluster installation and configuration

Discover how to create a cluster from scratch, convert a single node into a cluster, allow communication between nodes and manage a cluster.

::: info
**Note:** The cluster feature is a Subscription feature for **Enterprise** and **Performance** edition only.
:::

::: warning
It is possible to manage the lifecycle of a node using the API to connect directly to the node, but this bypasses the load balancer so should be done with care and only in exceptional circumstances.
:::

## Note when using the AWS support

Please read the following to ensure that Bonita Cluster works correctly on AWS.

### IAM role configuration

If you want to use IAM role for EC2 autodiscovery, you need to attach a role to your EC2 instances with a policy allowing "ec2:DescribeInstances" action. For details about IAM Roles for Amazon EC2 see [AWS documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html)

## Create a cluster from scratch

In this part we will create a cluster from scratch. We will initialize the database on which the cluster will run, then we will configure nodes to run on this cluster.

## Allow communication between servers

Bonita cluster uses Hazelcast as the distributed cluster dispatcher layer.
Hazelcast needs the port 5701 (by default) to be opened on all the servers that compose the cluster.
Ensure that these ports are opened in all the nodes of your cluster.

### <a id="create_init_bonita_db" /> Create and initialize the database for Bonita Platform

In this step you will create and initialize the database for the Bonita Platform cluster using the  [platform setup tool](BonitaBPM_platform_setup.md).
When done you will have a database with all tables created and with a table `CONFIGURATION` containing all configuration required for the cluster to start.

1. Ensure that you meet the  [requirements](hardware-and-software-requirements.md).
2.  [Create the database](database-configuration.md#database_creation).
3. In case you use  [Business data](define-and-deploy-the-bdm.md),  [create a database for the Business Data](database-configuration.md#database_creation).
4. Download a Bonita  [Tomcat bundle](tomcat-bundle.md) or a Bonita  [WildFly bundle](wildfly-bundle.md), and unzip it at some place of your choice.
5. Edit file **`setup/database.properties`** and modify the properties to suit your databases (Bonita internal database & Business Data database). Beware of  [backslash characters](BonitaBPM_platform_setup.md#backslash_support).

In the following steps, you will update the configuration files that are in the `setup/platform_conf/initial` folder of the platform setup tool.

1. Edit the file `setup/platform_conf/initial/platform_engine/bonita-platform-sp-custom.properties`: Uncomment and set the **`bonita.cluster`** property to `true`, as follows: `bonita.cluster=true`
2. Edit the file `setup/platform_conf/initial/platform_engine/bonita-platform-sp-custom.properties`: <a id="disable-hibernate-cache"/>In order to keep consistency between nodes, the Hibernate cache must be disabled:
   Uncomment and change the line:
         `#bonita.platform.persistence.use_second_level_cache=true`
       change it to:
         `bonita.platform.persistence.use_second_level_cache=false`
3. Edit the file `setup/platform_conf/initial/platform_engine/bonita-platform-sp-cluster-custom.properties`: uncomment and set the **`bonita.cluster.name`** property to a name of your own, e.g. `myBPMCluster`, **This name must be unique on the local network if you are using _multicast_**
4. Edit the file `setup/platform_conf/initial/platform_engine/bonita-platform-sp-cluster-custom.properties`: set to `true` one of `bonita.platform.cluster.hazelcast.multicast.enabled` or `bonita.platform.cluster.hazelcast.tcpip.enabled` or `bonita.platform.cluster.hazelcast.aws.enabled`, as follows:
   Uncomment the # properties and set only one of them to `true`, set the others to `false` depending on how you want your nodes to discover each others.
   Example:
   
   ```properties
   bonita.platform.cluster.hazelcast.multicast.enabled=false
   bonita.platform.cluster.hazelcast.tcpip.enabled=true
   bonita.platform.cluster.hazelcast.tcpip.members=ipServer01,ipServer02
   ```
   **Important**: If you don't use `bonita.platform.cluster.hazelcast.multicast.enabled`, **you must uncomment the # properties and set it to `false`** to deactivate it, as follows: `bonita.platform.cluster.hazelcast.multicast.enabled=false`.
   
    For more information on this take a look at the  [Hazelcast Documentation](http://docs.hazelcast.org/docs/3.4/manual/html-single/hazelcast-documentation.html#hazelcast-cluster-discovery).
5. Copy licenses of all your nodes in `setup/platform_conf/licenses`.
6. Run `setup.sh init` or `setup.bat init` as described in the  [platform setup tool page](BonitaBPM_platform_setup.md#init_platform_conf).

At the end of the script, you should see the following line: "Initial configuration files successfully pushed to database".
This creates the database tables needed by Bonita platform, stores the configuration into this database, and stores the license files for all your cluster nodes into the database.

If later you need to change the configuration of the node discovery or add new licenses to the Bonita Platform configuration, you can update the configuration by following this  [guide](BonitaBPM_platform_setup.md#update_platform_conf).

### <a id="install_first_node" /> Install a first node

1. Once you have done all the steps from section **Create and initialize the database for Bonita Platform** above,  run `setup.sh configure` or `setup.bat configure` as described in the  [Bundle configuration](BonitaBPM_platform_setup.md#run_bundle_configure) to have your Tomcat / WildFly bundle configured to point to the right database.

2. Once the bundle is configured, and to avoid unsynchronized versions of the configuration files between several nodes, you are advised to delete
   the folder `[TOMCAT_DIRECTORY]/setup` and its entire content.
   Note:  if you want to keep it for future configuration changes, just move the folder `[TOMCAT_DIRECTORY]/setup` and its entire content outside the `[TOMCAT_DIRECTORY]`
   to use it as your main   [platform setup tool](BonitaBPM_platform_setup.md#init_platform_conf).

3. If your Bonita installation is behind a proxy or is installed inside a Docker container (mainly in TcpIp or Aws
   discovery modes), you must declare its public address by adding the following property:
   `-Dhazelcast.local.publicAddress=*publicaddress*`, this property should be added in the `[TOMCAT_DIRECTORY]/setup/tomcat-templates/setenv.sh` or `[TOMCAT_DIRECTORY]/setup/tomcat-templates/setenv.bat`

4. When the installation is complete, start Tomcat on the node. This starts Bonita Platform:
   ```bash
   ./start-bonita.sh
   ```

5. Then start the cluster in the load balancer.

::: warning
If you are using apache-tomcat load-balancer whith mod_jk, make sure that jvmRoute attribute is set at your Engine <Engine name="Catalina" defaultHost="localhost" jvmRoute="node01" > and that the jvmRoute attribute value matches your worker name in workers.properties. See official documentation: https://tomcat.apache.org/tomcat-7.0-doc/cluster-howto.html 
In the server.xml file, for example, change the line to: Engine name="Catalina" defaultHost="localhost" jvmRoute="node01"
:::

1. Check that the log file contains messages of the following form:

   ```log
   March 22, 2016 5:07:07 PM INFO: com.hazelcast.cluster.ClusterService [10.0.5.3]:5701 [myBPMCluster]

   Members [1] {
           Member [10.0.5.3]:5701 this
   }
   [...]
   March 22, 2016 5:09:18 PM INFO: org.apache.catalina.startup.Catalina start Server startup in 30333 ms
   ```
+
2. Then deploy a basic process and check that it runs correctly, to validate the installation.

### Add a node to the cluster

You can add a new node to a cluster without interrupting service on the existing nodes.

1. Copy the entire Tomcat / WildFly directory to another machine.
2. If Hazelcast Node discovery is configured with TCP, update the configuration in database using the  [platform setup tool](BonitaBPM_platform_setup.md), as follows:
   1. Run the `setup.sh pull` or `setup.bat pull`. This will retrieve the configuration of your platform under `platform_conf/current` folder.
   2. Edit the file `platform_conf/current/platform_engine/bonita-platform-sp-cluster-custom.properties` and add the node to the list of members as follows for example: `bonita.platform.cluster.hazelcast.tcpip.members=ipServer01,ipServer02,ipServer03`
3. Start the Tomcat on the new node, running `./start-bonita.sh` script
4. Update the load balancer configuration to include the new node.
   The log file will contain messages of the following form:
   
   ```log
   March 22, 2016 5:12:53 PM INFO: com.hazelcast.cluster.ClusterService [10.0.5.17]:5701 [myBPMCluster]

   Members [2] {
           Member [10.0.5.3]:5701
           Member [10.0.5.17]:5701 this
   }
   [...]
   March 22, 2016 5:12:28 PM INFO: org.apache.coyote.http11.Http11Protocol start Starting Coyote HTTP/1.1 on http-7280
   March 22, 2016 5:12:28 PM INFO: org.apache.catalina.startup.Catalina start Server startup in 30333 ms
   ```
   ````

In the log, you can see how many nodes are in the cluster, and their IP addresses and port number. This node that has been started is indicated by `this`.
The new node is now available to perform work as directed by the load balancer.

## Convert a single node installation into a cluster

In this case you already have a Bonita Platform running as single node installation, you will change the configuration to make it able to have multiple nodes.

### Update the configuration in database

Some properties of the Bonita Platform needs to be changed, through  [Bonita platform setup tool](BonitaBPM_platform_setup.md), in order to make your installation work as a cluster node.

- Download Bonita  [Tomcat bundle](tomcat-bundle.md) or  [WildFly bundle](wildfly-bundle.md), that contains the platform setup tool, and unzip it at some place of your choice.
- Go into the `setup` folder: `cd ./setup/`
- Configure the Setup Tool as described in the  [platform setup tool page](BonitaBPM_platform_setup.md)
- Run the `setup.sh pull` or `setup.bat pull`. This will retrieve the configuration of your platform under `platform_conf/current` folder.
- Update configuration files that are in the `platform_conf/current` folder of the platform setup tool.
  ```
  * In `platform_engine/bonita-platform-sp-custom.properties`
      * uncomment and set the **`bonita.cluster`** property to `true`.
  * In `platform_engine/bonita-platform-sp-cluster-custom.properties`
      * uncomment and set the **`bonita.cluster.name`** property to a name of your own, e.g. `myBPMCluster`, **This name must be unique on the local network if you are using *multicast***
      * set one of `bonita.platform.cluster.hazelcast.multicast.enabled`, `bonita.platform.cluster.hazelcast.tcpip.enabled` and `bonita.platform.cluster.hazelcast.aws.enabled` to `true`:
      uncomment the # properties and set only one of them to `true`, set the others to `false` depending on how you want your nodes to discover each others,
      for more information on this take a look at the [Hazelcast Documentation](http://docs.hazelcast.org/docs/3.4/manual/html-single/index.html#discovering-cluster-members).
  * In `platform_engine/bonita-platform-sp-custom.properties`: In order to keep consistency between nodes, the Hibernate cache must be disabled:
  ```
  Uncomment and change the line:
        `#bonita.platform.persistence.use_second_level_cache=true`
      change it to:
        `bonita.platform.persistence.use_second_level_cache=false`  
- Copy licenses of all your nodes in `platform_conf/licenses`
- Run the `setup.sh push` or `setup.bat push`. This will update in database the configuration of your platform.

### Configure nodes to run on this cluster

The configuration of the node you were using is still valid. You should be able to run it without any issue.

If your Bonita installation is behind a proxy or is installed inside a Docker container, please refer to the

[Install a first node part](#install_first_node).

## Cluster management

### Stop a node

Simply run `./stop-bonita.sh` script.

### Remove a node from a cluster

This section explains how to perform a planned shutdown and remove a node from the cluster.

1. Update the load balancer configuration so that no further work is directed to the node. All work that is already in progress on the node that will be shutdown
   will continue until completion. Do not remove the node completely, because the load balancer needs to be informed when current work is finished.
2. Allow current activity instances to complete.
3. Stop the Tomcat server: run `./stop-bonita.sh`
4. Update the load balancer to remove the node from the cluster.

The node is now removed from the cluster.

### Dismantle a cluster

To dismantle a cluster:

1. Disable processes.
2. Allow current activity instances to complete.
3. When each node has finished executing, stop it.
4. When all nodes have been stopped, update the load balancer to remove the cluster.

The individual nodes can now be used as standalone Bonita server, provided the following change in the configuration is done:
Update file `bonita-platform-sp-custom.properties` located in the `platform_engine` folder of the configuration, use the  [platform setup tool](BonitaBPM_platform_setup.md#configuration_files) to update it and set back the **`bonita.cluster`** property to **`false`**.

See [How to update a Bonita Tomcat Bundle configuration](BonitaBPM_platform_setup.md#updating_configuration) for more details on updating the configuration.

### Managing the cluster with Hazelcast

As said before, Bonita cluster uses Hazelcast as the distributed cluster dispatcher layer. Therefore you can use the Hazelcast tools to manage the cluster topology.
See the [Hazelcast documentation](http://www.hazelcast.com/docs.jsp) for details.

Note that a Bonita cluster uses multicast for discovery by default. You can disable this in Hazelcast.
If you are using multicast, you must ensure that your production environment is insulated from any test environment that might also contain cluster nodes.
This is to ensure the nodes do not discover each other on the network, if they are not supposed to run inside the same cluster.

It is possible to have more than one cluster on the same network. In this case, you must configure the cluster names to be sure that it is clear which node belongs to which cluster.
You can configure the cluster name through Hazelcast or by updating `bonita-platform-sp-custom.properties` located in the `platform_engine` folder of the configuration, use the  [platform setup tool](BonitaBPM_platform_setup.md#configuration_files) to update it.

## FAQ

**Q**: I regularly get this warning message when 2 or more nodes are started in cluster:

```log
2016-06-13 11:41:22.783 +0200 WARNING: org.bonitasoft.engine.scheduler.impl.BonitaJobStoreCMT This scheduler instance (...) is still active but was recovered by another instance in the cluster.  This may cause inconsistent behavior.
```

**Symptom**:
The clocks of the servers are not synchronized.

**Resolution**:
The system time of all cluster nodes must be maintained in synchronization with time servers.
It is a good idea to have also the db server system time synchronized too.
Synchronize the system time of all nodes and restart application servers.
