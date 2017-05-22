# Cluster administration

::: info
**Note:** For Performance edition only.
:::

This page explains how to manage a Bonita cluster.

## Backing up a cluster

Back up your cluster in the same as you would [back up a standalone Bonita system](back-up-bonita-bpm-platform.md), by backing up the database. 
You also need to back up the load balancer (see your load balancer documentation for details of how to do this).

## Troubleshooting

Each Bonita Engine maintains its own log file on the node at `tomcat_home/logs/bonita.`_`date`_`.log`, where _`date`_ is the date the file is created.
In addition, there is an incident file `tomcat_home/logs/tenants/[TENANT_ID]/incident.log` (where `[TENANT_ID]` is the ID of the tenant on which the error
occurred) that is used as a last resort to record an error that cannot be handled, such as failure to access the database.

## Monitoring a process

To monitor a process in a cluster, use the Bonita Portal as usual. The information presented applies to process activity on all nodes in the cluster.

## Deploying a process in a Bonita cluster

To deploy a process in a cluster, configure the process in Bonita Studio, and then create a .bar file using the Build option of the Server menu. 
Import the process bar file into Bonita Portal on one of the nodes. The process is now available to Bonita Portal on every node in the cluster. 
The process must be started on one node. Subsequently, instances can be created on all nodes.
This means that all nodes have the possibility of running instances of tasks of all processes.

You can also [deploy a process using the API](manage-a-process.md), exactly as you would in a standalone system.

## Managing your organization in a cluster

The organization data used by Bonita is stored in the database, so only has to be configured once. It can be maintained from any Bonita Portal in the cluster.
