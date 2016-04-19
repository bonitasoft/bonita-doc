# 2.7 Migration overview

There are several aspects to migrating to a new version of Bonita BPM: 

* migrating your [platform](#platform) to the new version
* migrating your [Bonita BPM Studio](#studio)
* migrating your [process definitions](#procdef) to use the features of the new version


## Platform


You can automatically [migrate the platform from an earlier version of Bonita BPM](/migrate-earlier-version-bonita-bpm.md). You cannot migrate your platform from a version earlier than 6.0.2\. 
After migration, a process continues to run unchanged. You can modify the process definition later to take advantage of the new features in this version of Bonita BPM.



## Bonita BPM Studio


To migrate to a newer version of Bonita BPM Studio, install the new version using the [Studio installer wizard](/bonita-bpm-studio-installation.md#installer) for your operating system.
If you want to keep the artifacts in your workspace, select the option to migrate your workspace. 


**Warning:** if you do not migrate your workspace, or if you use the OS-independent archive to install the new Bonita BPM Studio, 
your workspace is not automatically migrated. In this case, you must manually export each item from the older Bonita BPM Studio and import it into the newer version. 




## Process definitions


A process definition created using Bonita BPM 6.x can be run on this version after the [platform migration](/migrate-earlier-version-bonita-bpm.md). 
However, you might choose to update the process definition to take advantage of new features. 
To update a process definition, export it from the older version of Bonita BPM Studio as a `.bos` file, then import it into the 
newer version and update it.


Note: you cannot import a process definition `.bos` file into a version of Bonita BPM Studio that is older than the version 
that was used to create it.


You can import a .bos file containing a process definiiton from a Bonita BPM 6.x or Bonita Open Solution 5.x. 
The [guided migration](/migrate-process-bonita-open-solution-5x.md) converts the 5.x process definition to use the legacy 6.x tooling so that the process can run on a Bonita BPM 7.x platform. 
You can modify the process definition later to take advantage of the new features in this version of Bonita BPM.