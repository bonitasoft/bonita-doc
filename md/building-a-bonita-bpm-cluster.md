# Build a Bonita BPM cluster

::: alert alert-info
**Note:** The cluster feature is a Subscription feature for **Performance** edition only.
:::

The recommended procedure to build a cluster is to start with a single node cluster and then add other nodes to the cluster. 
This enables you to check at each stage that your processes run correctly.

This page assumes you are creating a cluster of separate physical nodes, for high availability.

Warning: It is possible to manage the lifecycle of a node using the API to connect directly to the node, but this bypasses the load balancer so should be done with care and only in exceptional circumstances.

## Installing and configuring the platform

* Ensure that you meet the [requirements and that you have a database installed and configured](ubuntu-openjdk-tomcat-postgresql.md).
* Download the Bonita BPM [Deploy bundle](deploy-bundle.md) and unzip it at some place of your choice. It can be from a DevOps remote computer,
as the `platform-setup` tool does not need the Tomcat of JBoss bundle to be running, to execute.
* Go into the `platform-setup` folder and edit the file **`database.properties`** to point to the right database for your environment.
The values to modify are:
```
        db.vendor
        db.server.name
        db.server.port
        db.database.name
        db.user
        db.password
```
* Database drivers for Postgres, MySQL, H2 (not recommended for production, though) are already provided. If your Bonita BPM database is **SQLServer** or **Oracle**,
  add your drivers into `platform_setup/lib` folder.
* Update file [`bonita-platform-init-community.properties`](BonitaBPM_platform_setup.md#configuration_files) and change the value of the `activeProfiles` key
  from **`community`** to **`community,performance`**.
* Update file [`bonita-platform-sp-custom.properties`](BonitaBPM_platform_setup.md#configuration_files) and set the **`bonita.cluster`** property to `true`.
* In order to use cluster mode in environments where multicast is disabled (like main IaaS providers), you should switch to TcpIp mode, or AWS for Amazon Web Services cloud provider.
This can be parametrised in [`platform-sp-cluster-custom.properties`](BonitaBPM_platform_setup.md#configuration_files).Only one mode can be selected,
so only one of the following properties must be set to true: 
  * `bonita.platform.cluster.hazelcast.multicast.enabled` for multicast discovery, activated by default.
  * `bonita.platform.cluster.hazelcast.tcpip.enabled` for fixed addresses discovery. All possible members should be then precised separated by commas,
  in `bonita.platform.cluster.hazelcast.tcpip.members` property.
  * `bonita.platform.cluster.hazelcast.aws.enabled` for Amazon Web Services discovery. General information on access key, region, security groups etc.
  should then be provided as properties. 
* Copy license files for all your nodes in the cluster, into the `platform_setup/platform_conf/licenses` folder
* Run the following script:
```
    ./setup.sh init
```
  At the end of the script, you should see the following line: "Initial configuration successfully pushed to database from folder platform_conf/initial"
* This creates the database tables needed by Bonita BPM platform, stores the configuration into this database, and stores the licence files for all your cluster nodes
into the database.


## Install a node

1. Follow the instructions to [configure a Tomcat bundle on Ubuntu](BonitaBPM_platform_setup.md#configuring_tomcat).
2. Delete the entire content of the `[TOMCAT_DIRECTORY]/setup` folder, as the Bonita BPM Platform setup has already been done at the previous phase
3. In your `setenv.sh` file (Linux) or `setenv.bat` file (Windows), extend the `DB_OPTS` setting to specify a cluster name, as shown in the following examples:

    Linux or Mac OS:
    `DB_OPTS="-Dsysprop.bonita.db.vendor=postgresql -Dbonita.cluster.group.name=myBPMCluster"`

    Windows:
    `set DB_OPTS="-Dsysprop.bonita.db.vendor=postgresql" "-Dbonita.cluster.group.name=myBPMCluster"`

4. By default, the cluster name is _bonita_. The cluster name is used in the discovery process when you add a node to the cluster. If you only have one cluster in your network, you can use the default name.
5. If your Bonita installation is behind a proxy (mainly in TcpIp or Aws discovery modes), you must declare its public address by adding the following property : `-Dhazelcast.local.publicAddress=*publicaddress*`
6. When the installation is complete, start Tomcat on the node. This start Bonita BPM Platform:
```
    ./bonita-start.sh
```
6. Then start the cluster in the load balancer.

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

## How to stop a node

Simply run `./bonita-stop.sh` script.

## Add a node to a cluster

You can add a new node to a cluster without interrupting service on the existing nodes.

1. Install another Tomcat the same way you just installed the first node.
2. Configure the new node to access the same database, following the same [Tomcat configuration steps](BonitaBPM_platform_setup.md#configuring_tomcat).
3. Don't forget to **delete** the entire content of the `[TOMCAT_DIRECTORY]/setup` folder
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


## Remove a node from a cluster

This section explains how to perform a planned shutdown and remove a node from the cluster.

1. Update the load balancer configuration so that no further work is directed to the node. All work that is already in progress on the node that will be shutdown
   will continue until completion. Do not remove the node completely, because the load balancer needs to be informed when current work is finished.
2. Allow current activity instances to complete.
3. Stop the Tomcat server: run `./bonita-stop.sh`
4. Update the load balancer to remove the node from the cluster.

The node is now removed from the cluster.


## Dismantle a cluster

To dismantle a cluster:

1. Disable processes.
2. Allow current activity instances to complete.
3. When each node has finished executing, stop it.
4. When all nodes have been stopped, update the load balancer to remove the cluster.

The individual nodes can now be used as standalone Bonita BPM server, provided the following change in the configuration is done:
Update file [`bonita-platform-sp-custom.properties`](BonitaBPM_platform_setup.md#configuration_files) and set back the **`bonita.cluster`** property to **`false`**.

See [How to update a Bonita BPM Tomcat Bundle configuration](BonitaBPM_platform_setup.md#updating_configuration) for more details on updating the configuration.


## Managing the cluster with Hazelcast

A Bonita BPM cluster uses Hazelcast as the distributed cluster dispatcher layer. Therefore you can use the Hazelcast tools to manage the cluster topology.
See the [Hazelcast documentation](http://www.hazelcast.com/docs.jsp) for details.

Note that a Bonita BPM cluster uses multicast for discovery by default. You can disable this in Hazelcast.
If you are using multicast, you must ensure that your production environment is insulated from any test environment that might also contain cluster nodes.
This is to ensure the nodes do not discover each other on the network, if they are not supposed to run inside the same cluster.

It is possible to have more than one cluster on the same network. In this case, you must configure the cluster names to be sure that it is clear which node belongs to which cluster. 
You can configure the cluster name through Hazelcast or by updating [`bonita-platform-sp-cluster-custom.properties`](BonitaBPM_platform_setup.md#configuration_files).

See [How to update a Bonita BPM Tomcat Bundle configuration](BonitaBPM_platform_setup.md#updating_configuration) for more details on updating the configuration.
