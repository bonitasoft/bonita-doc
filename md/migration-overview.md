# Migration overview

## Migrating your platform to the new version

You can automatically [migrate the platform from an earlier version of Bonita](migrate-from-an-earlier-version-of-bonita-bpm.md). You cannot migrate your platform from a version earlier than 6.0.2\. 
After migration, a process continues to run unchanged. You can modify the process definition later to take advantage of the new features in this version of Bonita.

## Migrating your Bonita Studio

To migrate to a newer version of Bonita Studio, install the new version using the [Studio installer wizard](bonita-bpm-studio-installation.md) for your operating system.
If you want to keep the artifacts in your workspace, select the option to migrate your workspace. 

**Warning:** if you do not migrate your workspace, or if you use the OS-independent archive to install the new Bonita Studio, 
your workspace is not automatically migrated. In this case, you must manually export each item from the older Bonita Studio and import it into the newer version. 

## Migrating your process definitions

A process definition created using a previous Bonita 7.x can be run on this version after a platform migration. You might choose to update the process definition to take advantage of new features. 
To update a process definition, export it from the older version of Bonita Studio as a `.bos` file, then import it into the 
newer version and update it.
Note: you cannot import a process definition `.bos` file into a version of Bonita Studio that is older than the version 
that was used to create it.

A process definition created using a version 6.x of Bonita, or using 6.x forms or case overview pages, needs to have its task and instantiation forms modified in a previous version of
Bonita (7.0.0 to 7.7.4) before migrating to this version. Bonita Studio 7.8 and above can't import these forms, which may result in data loss or process malfunctions. For more details see [platform migration](migrate-from-an-earlier-version-of-bonita-bpm.md).
