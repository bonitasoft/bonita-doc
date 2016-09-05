# Install a Bonita BPM cluster

::: info
**Note:** The cluster feature is a Subscription feature for **Performance** edition only.
:::

::: warning
It is possible to manage the lifecycle of a node using the API to connect directly to the node, but this bypasses the load balancer so should be done with care and only in exceptional circumstances.
:::

You will learn here how to create a cluster in two ways:
* Create a cluster from scratch
* Convert a single node installation into a cluster

## Create a cluster from scratch

In this part we will create a cluster from scratch. We will initialize the database on which the cluster will run, then we will configure nodes to run on this cluster.

### Create and initialize the database for Bonita BPM Platform

In this step you will create and initialize the database for the Bonita BPM Platform cluster using the [platform setup tool](BonitaBPM_platform_setup.md).
When done you will have a database with all tables created and with a table `CONFIGURATION` containing all configuration required for the cluster to start.

* Ensure that you meet the [requirements](hardware-and-software-requirements.md)
* Ensure that you [have a database installed and configured for the platform](database-configuration.md#database_creation).
* In case you use [Business data](define-and-deploy-the-bdm), ensure that you [have a database installed and configured for the Business Data](database-configuration-for-business-data.md).
* Download the Bonita BPM [Deploy bundle](deploy-bundle.md) and unzip it at some place of your choice.
::: info
The platform setup tool is also present in the Tomcat or Wildfly bundle under the `setup` directory.
:::
* Configure it as described in the [platform setup tool page](BonitaBPM_platform_setup.md#configure_tool)
* Update configuration files that are in the `platform_conf/initial` folder of the platform setup tool.
    * In `platform_init_engine/bonita-platform-init-community-custom.properties` uncomment and update the value of `activeProfiles` property from **`community`** to **`community,performance`**.
    * In `platform_engine/bonita-platform-sp-custom.properties`
        * uncomment and set the **`bonita.cluster`** property to `true`.
        * <a id="disable-hibernate-cache"/>In order to keep consistency between nodes, the Hibernate cache must be disabled.  
          Uncomment and change the line  
          `#bonita.platform.persistence.use_second_level_cache=true`  
          to  
          `bonita.platform.persistence.use_second_level_cache=false`
    * In `platform_engine/bonita-platform-sp-cluster-custom.properties`
        * uncomment and set the **`bonita.cluster.name`** property to a name of your own, e.g. `myBPMCluster`, **This name must be unique on the local network if you are using *multicast***
        * set one of `bonita.platform.cluster.hazelcast.multicast.enabled`, `bonita.platform.cluster.hazelcast.tcpip.enabled` and `bonita.platform.cluster.hazelcast.aws.enabled` to true
        uncomment the # properties and set only one them to `true`, set the others to `false` depending on how you want your nodes to discover each others,
        for more information on this take a look at the [Hazelcast Documentation](http://docs.hazelcast.org/docs/3.4/manual/html-single/index.html#discovering-cluster-members).
* Copy licenses of all your nodes in `platform_conf/licenses`
* run the `setup.sh init` or `setup.bat init` as described in the [platform setup tool page](BonitaBPM_platform_setup.md#init_platform_conf).
* At the end of the script, you should see the following line: "Initial configuration files successfully pushed to database"
* This creates the database tables needed by Bonita BPM platform, stores the configuration into this database, and stores the licence files for all your cluster nodes
into the database.

If later you need to change the configuration of the node discovery or add new licenses to the Bonita BPM Platform configuration, you can update the configuration by following this [guide](BonitaBPM_platform_setup.md#update_platform_conf).

<a id="install_first_node" />

### Install a first node

1. Follow the instructions to [configure a Tomcat bundle](tomcat-bundle.md).
 You can skip the part on creating and initializing the database but you will need to configure the bundle connection to the database as described [in this part](tomcat-bundle.md#datasources_configuration).
2. Delete the entire content of the `[TOMCAT_DIRECTORY]/setup` folder.
3. If your Bonita installation is behind a proxy (mainly in TcpIp or Aws discovery modes), you must declare its public address by adding the following property : `-Dhazelcast.local.publicAddress=*publicaddress*`,
this property should be added in the `[TOMCAT_DIRECTORY]/bin/setenv.sh` or `[TOMCAT_DIRECTORY]/bin/setenv.bat`

4. When the installation is complete, start Tomcat on the node. This starts Bonita BPM Platform:
```bash
./bonita-start.sh
```
5. Then start the cluster in the load balancer.

Check that the log file contains messages of the following form:

```
March 22, 2016 5:07:07 PM com.hazelcast.cluster.ClusterService
INFO: [10.0.5.2]:5701 [myBPMCluster]

Members [1] {
        Member [10.0.5.2]:5701 this
}
[...]
March 22, 2016 5:09:18 PM org.apache.catalina.startup.Catalina start
INFO: Server startup in 30333 ms
```

Then deploy a basic process and check that it runs correctly, to validate the installation.


### Add a node to the cluster

You can add a new node to a cluster without interrupting service on the existing nodes.

1. Install another Tomcat the same way you just installed the first node.
2. Configure the new node to access the same database.
3. If Hazelcast Node discovery is configured with TCP, update the configuration in database using the [platform setup tool page](BonitaBPM_platform_setup.md).
4. Start the Tomcat on the new node, running `./bonita-start.sh` script
5. Update the load balancer configuration to include the new node.

The log file will contain messages of the following form:

```
March 22, 2016 5:12:53 PM com.hazelcast.cluster.ClusterService
INFO: [10.0.5.2]:5701 [bonita]

Members [2] {
        Member [10.0.5.2]:5701 this
        Member [10.0.5.3]:5701
}
[...]
March 22, 2016 5:12:28 PM org.apache.coyote.http11.Http11Protocol start
INFO: Starting Coyote HTTP/1.1 on http-7280
March 22, 2016 5:12:28 PM org.apache.catalina.startup.Catalina start
INFO: Server startup in 30333 ms
```

In the log, you can see how many nodes are in the cluster, and their IP addresses and port number. This node that has been started is indicated by `this`.
The new node is now available to perform work as directed by the load balancer.


## Convert a single node installation into a cluster

In this case you already have a Bonita BPM Platform running as single node installation, you will change the configuration to make it able to have multiple nodes.

### Update the configuration in database

Some properties of the Bonita BPM Platform needs to be changed in order to make the cluster work.

* Download the Bonita BPM [Deploy bundle](deploy-bundle.md) and unzip it at some place of your choice.
::: info
The platform setup tool is also present in the Tomcat or Wildfly bundle under the `setup` directory.
:::
* Configure it as described in the [platform setup tool page](BonitaBPM_platform_setup.md)
* Run the `setup.sh pull` or `setup.bat pull`. This will retrieve the configuration of your platform under `platform_conf/current` folder.
* Update configuration files that are in the `platform_conf/initial` folder of the platform setup tool.
    * In `platform_init_engine/bonita-platform-init-community-custom.properties` uncomment and update the value of `activeProfiles` property from **`community`** to **`community,performance`**.
    * In `platform_engine/bonita-platform-sp-custom.properties`
        * uncomment and set the **`bonita.cluster`** property to `true`.
    * In `platform_engine/bonita-platform-sp-cluster-custom.properties`
        * uncomment and set the **`bonita.cluster.name`** property to a name of your own, e.g. `myBPMCluster`, **This name must be unique on the local network if you are using *multicast***
        * set one of `bonita.platform.cluster.hazelcast.multicast.enabled`, `bonita.platform.cluster.hazelcast.tcpip.enabled` and `bonita.platform.cluster.hazelcast.aws.enabled` to true
        uncomment the # properties and set only one them to `true`, set the others to `false` depending on how you want your nodes to discover each others,
        for more information on this take a look at the [Hazelcast Documentation](http://docs.hazelcast.org/docs/3.4/manual/html-single/index.html#discovering-cluster-members).
* Copy licenses of all your nodes in `platform_conf/licenses`
* Run the `setup.sh push` or `setup.bat push`. This will update in database the configuration of your platform.

### Configure nodes to run on this cluster

The configuration of the node you were using is still valid. You should be able to run it without any issue.

To add more nodes, configure them like the first one. You can also refer to the [Install a first node part](#install_first_node).


## Cluster management

### Stop a node

Simply run `./bonita-stop.sh` script.

### Remove a node from a cluster

This section explains how to perform a planned shutdown and remove a node from the cluster.

1. Update the load balancer configuration so that no further work is directed to the node. All work that is already in progress on the node that will be shutdown
   will continue until completion. Do not remove the node completely, because the load balancer needs to be informed when current work is finished.
2. Allow current activity instances to complete.
3. Stop the Tomcat server: run `./bonita-stop.sh`
4. Update the load balancer to remove the node from the cluster.

The node is now removed from the cluster.


### Dismantle a cluster

To dismantle a cluster:

1. Disable processes.
2. Allow current activity instances to complete.
3. When each node has finished executing, stop it.
4. When all nodes have been stopped, update the load balancer to remove the cluster.

The individual nodes can now be used as standalone Bonita BPM server, provided the following change in the configuration is done:
Update file `bonita-platform-sp-custom.properties` located in the `platform_engine` folder of the configuration, use the [platform setup tool](BonitaBPM_platform_setup.md#configuration_files) to update it and set back the **`bonita.cluster`** property to **`false`**.

See [How to update a Bonita BPM Tomcat Bundle configuration](BonitaBPM_platform_setup.md#updating_configuration) for more details on updating the configuration.


### Managing the cluster with Hazelcast

A Bonita BPM cluster uses Hazelcast as the distributed cluster dispatcher layer. Therefore you can use the Hazelcast tools to manage the cluster topology.
See the [Hazelcast documentation](http://www.hazelcast.com/docs.jsp) for details.

Note that a Bonita BPM cluster uses multicast for discovery by default. You can disable this in Hazelcast.
If you are using multicast, you must ensure that your production environment is insulated from any test environment that might also contain cluster nodes.
This is to ensure the nodes do not discover each other on the network, if they are not supposed to run inside the same cluster.

It is possible to have more than one cluster on the same network. In this case, you must configure the cluster names to be sure that it is clear which node belongs to which cluster.
You can configure the cluster name through Hazelcast or by updating `bonita-platform-sp-custom.properties` located in the `platform_engine` folder of the configuration, use the [platform setup tool](BonitaBPM_platform_setup.md#configuration_files) to update it.


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
