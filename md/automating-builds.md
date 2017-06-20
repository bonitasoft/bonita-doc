# Automate builds

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

## Overview

Bonita BPM includes a Workspace API, which is a script, `BonitaStudioBuilder`, for building a bar file from a process and/or a zip file from a REST API extension in a repository. 
This is intended for a use in a continuous integration and testing environment. 

You can use the `BonitaStudioBuilder` to build a bar file for processes and Rest API extensions stored in a repository. It accesses the build features of Bonita BPM Studio in the background. 
Bonita BPM Studio must be installed but must not be running. You must to use a dedicated Bonita BPM Studio for continuous integration.
This is because the Bonita BPM Studio `workspace` directory should be removed before running the `BonitaStudioBuilder` script. 
(For continuous integration, it is best practice to clean the files before and after a build.)

To use `BonitaStudioBuilder`, you need the following:

* Bonita BPM Studio (the same version as the Bonita BPM repository). This must be a dedicated Bonita BPM Studio and repository used only for your `BonitaStudioBuilder`, because the tool removes the content of the repository.
* A window manager
* Java 1.8

After Bonita BPM Studio is installed, the `BonitaStudioBuilder` scripts are in the `workspace_api_scripts` folder. 
There are scripts for Windows (`.bat`), Linux (`.sh`), and MacOS (`_Mac.sh`).

Pass configuration information to the `BonitaStudioBuilder` script as system properties, using the following arguments:
Argument
Purpose

`repoPath`
The parent folder of the repository storing the process. Typically, this is the trunk folder. It can also be a folder in tags if you want to point to a restore point in the repository. 
You cannot use a remote repository folder. A process to be built must be manually checked out before running the script.

`outputFolder`
The folder where the generated bar and zip files will be stored.

`processes`
The list of the processes in the repository for which bar files are required. 
For each process, specify the process identifier and, optionally, the version. 
If you do not specify the version, the latest version is used.   
Format: _process_,_version;_process_,_version_...  
Example: `-process=TravelRequest,1.5;Expenses;LeaveRequest,1.0`_

`buildAllProcesses`
If enabled, bar files are built for the latest version of each process in the repository.

`buildAllRestAPIExtensions`
If enabled, zip files are built and installed in maven repository for all REST API extensions in the repository.

`buildAll`
If enabled, bar files are built for the latest version of each process in the repository and zip files are built and installed in maven repository for all REST API extensions.

`migrate`
If enabled, you can point the `repoPath` argument to a repository of an older version than the version of the running Bonita BPM Studio. 
The processes in the older version repository will be automatically migrated to the current version.

`environment`
The [environment](environments.md) with which the bar files will be built. 
The environment defines the [process configuration](configuring-a-process.md), including dependencies. 
If you do not specify an environment, the exported bar file will not contain the dependencies. 
All the specified processes are built for the same environment. 
If you want to build for different environments, you need to run the script once for each environment.

`profile`
Optional Maven profiles (comma separated list of profile id) to activate when building the REST API extensions projects.

`link`
If enabled, do not make a copy of the project to build.

To run the script:

1. Check out the project to a directory in the Studio path.
2. Delete the content of the `workspace` directory in your Bonita BPM Studio installation.
3. Run the script. For example:
```bash
./BonitaStudioBuilder.sh -repoPath=/home/myBonitaRepoCheckedOut
-outputFolder=/home/bonita/myArtefacts -buildAll -migrate 
-environment=Qualification -profile=qa
```

When the script runs, information is logged in `workspace/.metadata/.log`.

## Deploying a process bar file

From the bar file, a process can be [deployed manually using Bonita BPM Portal](processes.md). You can also [deploy a process using the Engine API](manage-a-process.md).

## Deploying a REST API extension file

From the zip file, a REST API extension can be [deployed manually using Bonita BPM Portal](api-extensions.md). You can also deploy a REST API extension using the REST API.

## Automate build of a specific REST API extension

A REST API extension is a maven project stored in a Studio repository. You can find them in the studio workspace: `workspace/yourRepositoryName/restAPIExtensions/yourRestAPIProject`. From there you can simply use maven cli or a CI job to build, test or packake your REST API Extension.
