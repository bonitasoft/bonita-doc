# Build a Bonita BPM cluster

The recommended procedure to build a cluster is to start with a single node cluster and then add other nodes to the cluster. 
This enables you to check at each stage that your processes run correctly.

This page assumes you are creating a cluster of separate physical nodes, for high availability.

Warning: It is possible to manage the lifecycle of a node using the API to connect directly to the node, but this bypasses the load balancer so should be done with care and only in exceptional circumstances.

## Install a node

A node that will be in a cluster is installed in exactly the same way as a standalone node. 

1. Follow the instructions to [install the 
Tomcat bundle on Ubuntu](ubuntu-openjdk-tomcat-postgresql.md).
2. In {{ var\_bonita\_home }}, update `engine-server/conf/platform/bonita-platform-sp-custom.properties` and set the `bonita.cluster` property to `true`.
3. In order to use cluster mode in environments where multicast is disabled (like main IaaS providers), you should switch to TcpIp mode, or AWS for Amazon Web Services cloud provider. This can be parametered in `/engine-server/conf/platform-sp-cluster-custom.properties.`Only one mode can be selected, so only one of the following properties must be set to true: 
  * `bonita.platform.cluster.hazelcast.multicast.enabled` for multicast discovery, activated by default.
  * `bonita.platform.cluster.hazelcast.tcpip.enabled` for fixed adresses discovery. All possible members should be then precised separated by commas, in `bonita.platform.cluster.hazelcast.tcpip.members` property.
  * `bonita.platform.cluster.hazelcast.aws.enabled` for Amazon Web Services discovery. General informations on access key, region, security groups etc. should then be provided as properties. 
4. In your `setenv.sh` file (Linux) or `setenv.bat` file (Windows), extend the `DB_OPTS` setting to specify a cluster name, as shown in the following examples:

Linux or Mac OS:
`DB_OPTS="-Dsysprop.bonita.db.vendor=postgresql -Dbonita.cluster.group.name=myBPMCluster"`

Windows:
`set DB_OPTS="-Dsysprop.bonita.db.vendor=postgresql" "-Dbonita.cluster.group.name=myBPMCluster"`

By default, the cluster name is _bonita_. The cluster name is used in the discovery process when you add a node to the cluster. If you only have one cluster in your network, you can use the default name.

If your Bonita installation is behind a proxy (mainly in TcpIp or Aws discovery modes), you must declare its public address by adding the following property : `-Dhazelcast.local.publicAddress=*publicaddress*`

As part of the installation, you create a `bonita_home` directory.

When the installation is complete, start Tomcat on the node. By default, this automatically starts Bonita BPM Engine. Then start the cluster in the load balancer.

Check that the log file contains messages of the following form:
```
Oct 22, 2013 5:07:07 PM com.hazelcast.cluster.ClusterService
INFO: [10.0.5.2]:5701 [myBPMCluster]

Members [1] {
        Member [10.0.5.2]:5701 this
}

[...]

Oct 22, 2013 5:07:28 PM org.apache.catalina.startup.Catalina start
INFO: Server startup in 30333 ms
```
Then deploy a basic process and check that it runs correctly, to validate the installation.

## Add a node to a cluster

You can add a new node to a cluster without interrupting service on the existing nodes.

1. Install the node with the same platform as the other nodes.
2. Configure the new node to access the shared `bonita_home` and the database.
3. In {{ var\_bonita\_home }}, update `engine-server/conf/platform/bonita-platform-sp-custom.properties` and set the `bonita.cluster` property to `true`.
4. Add the license for the node into the `bonita_home/server/licenses` directory.
5. Start the Tomcat on the new node, which will start the Engine.
6. Update the load balancer configuration to include the new node.

The log file will contain messages of the following form:
```
Oct 22, 2013 5:07:07 PM com.hazelcast.cluster.ClusterService
INFO: [10.0.5.2]:5701 [bonita]

Members [2] {
        Member [10.0.5.2]:5701 this
        Member [10.0.5.3]:5701
}

[...]

Oct 22, 2013 5:07:28 PM org.apache.coyote.http11.Http11Protocol start
INFO: Starting Coyote HTTP/1.1 on http-7280
Oct 22, 2013 5:07:28 PM org.apache.catalina.startup.Catalina start
INFO: Server startup in 30333 ms
```

In the log, you can see how many nodes are in the cluster, and their IP addresses and port number. This node that has been started is indicated by `this`. The new node is now available to perform work as directed by the load balancer.

## Remove a node from a cluster

This section explains how to perform a planned shutdown and remove a node from the cluster.

1. Update the load balancer configuration so that no further work is directed to the node. Work that is already in progress will continue to completion. 
Do not remove the node completely, because the load balancer needs to be informed when current work is finished.
2. Allow current activity instances to complete.
3. Stop the Engine.
4. Update the load balancer to remove the node from the cluster.

The node is now removed from the cluster.

## Dismantle a cluster

To dismantle a cluster:

1. Disable processes in the shared `bonita_home`.
2. Allow current activity instances to complete.
3. When each node has finished executing, stop it.
4. When all nodes have been stopped, update the load balancer to remove the cluster.

The individual nodes can now be used as standalone Bonita BPM systems, though some changes to the configuration might be required in `bonita_home`. 

## Managing the cluster with Hazelcast

A Bonita BPM cluster uses Hazelcast. Therefore you can use the Hazelcast tools to manage the cluster topology. See the [Hazelcast documentation](http://www.hazelcast.com/docs.jsp) for details.

Note that a Bonita BPM cluster uses multicast for discovery by default. You can disable this in Hazelcast. 
If you are using multicast, you must ensure that your production environment is insulated from any test environment that might also contain cluster nodes. 

It is possible to have more than one cluster on the same network. In this case, you must configure the cluster names to be sure that it is clear which cluster a node belongs to. 
You can configure the cluster name through Hazelcast or by updating `bonita-platform.properties` in `bonita_home`.
