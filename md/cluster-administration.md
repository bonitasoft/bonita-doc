# 2.4.8.3 Cluster administration

This page explains how to manage a Bonita BPM cluster.


[Backing up a cluster](#backup)  
[Troubleshooting](#troubleshooting)  
[Monitoring a process](#monitoring)  
[Deploying a process in a Bonita BPM cluster](#deploy_process)  
[Managing your organisation in a Bonita BPM cluster](#manage_org)  

## Backing up a cluster


Back up your cluster in the same as you would [back up a standalone Bonita BPM system](/back-bonita-bpm-platform.md), by backing up `bonita_home` and the database. 
You also need to back up the load balancer (see your load balancer documentation for details of how to do this).


## Troubleshooting


Each Bonita BPM Engine maintains its own log file on the node at `bonita_home/tomcat/logs/bonita.`_`date`_`.log`,
where _`date`_ is the date the file is created.


In addition, there is an incident file in `bonita_home` that is used as a last resort to record an error that cannot be handled, such as failure to access the database.



## Monitoring a process


To monitor a process in a cluster, use the Bonita BPM Portal as usual. The information presented applies to process activity on all nodes in the cluster.


## Deploying a process in a Bonita BPM cluster


To deploy a process in a cluster, configure the process in Bonita BPM Studio, and then create a .bar file using the Build option of the Server menu. 
Import the process bar file into Bonita BPM Portal on one of the nodes. Through the shared `bonita_home`, the process is now available to Bonita BPM Portal on every node in the cluster. 
The process must be started on one node. Subsequently, instances can be created on all nodes.
This means that all nodes have the possibility of running instances of tasks of all processes.


You can also [deploy a process using the API](/manage-process#deploy), exactly as you would in a standalone system.


## Managing your organization in a cluster


The organization data used by Bonita BPM is stored in the database, so only has to be configured once. It can be maintained from any Bonita BPM Portal in the cluster.