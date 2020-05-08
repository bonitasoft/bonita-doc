# Automating build of artifacts outside the Studio

Learn how to build processes and other artifacts developed in Bonita Studio, but without the need to open
and interact with Bonita Studio.
This allows to automate builds through scripts or any automation tooling.

::: warning
This way of building artifacts is deprecated. Use [Bonita Continuous Delivery add-on](https://documentation.bonitasoft.com/bcd/latest/livingapp_build) instead.
:::

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

::: warning
**Warning:**
* The solution described here relies on the `Workspace API`/`BonitaStudioBuilder`, which has been deprecated since Bonita 7.7.0. Instead, we strongly encourage you to use the LA builder included in the tooling suite of [*Bonita Continuous Delivery* add-on](https://documentation.bonitasoft.com/bcd/latest/) add-on. One added-value is that LA builder does not need a studio to be installed.
:::

## Overview

Bonita includes a Workspace API, in the form of the script `BonitaStudioBuilder`, to build a .bar file from a process and/or a .zip file from a REST API extension in a repository. It accesses the build features of Bonita Studio in the background. 
This is intended to be used in a continuous integration and testing environment. 

Bonita Studio must be installed but must not be running. You must use a dedicated Bonita Studio for continuous integration.
This is because the Bonita Studio `workspace` directory should be removed before running the `BonitaStudioBuilder` script. 
(For continuous integration, it is best practice to clean the files before and after a build.)

To use `BonitaStudioBuilder`, you need the following:

* Bonita Studio (the same version as the Bonita repository). This must be a dedicated Bonita Studio and repository used only for your `BonitaStudioBuilder`, because the tool removes the content of the repository.
* A window manager
* Java 1.8

After Bonita Studio is installed, the `BonitaStudioBuilder` scripts are in the `workspace_api_scripts` folder. 
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
If enabled, you can point the `repoPath` argument to a repository of an older version than the version of the running Bonita Studio. 
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
2. Delete the content of the `workspace` directory in your Bonita Studio installation.
3. Run the script. For example:
```bash
./BonitaStudioBuilder.sh -repoPath=/home/myBonitaRepoCheckedOut
-outputFolder=/home/bonita/myArtefacts -buildAll -migrate 
-environment=Qualification -profile=qa
```

When the script runs, information is logged in `workspace/.metadata/.log`.

## Deploying a process bar file

From the bar file, a process can be [deployed manually using Bonita Portal](processes.md). You can also [deploy a process using the Engine API](manage-a-process.md).

## Deploying a REST API extension file

From the zip file, a REST API extension can be [deployed manually using Bonita Portal](api-extensions.md). You can also deploy a REST API extension using the REST API.

## Automate build of a specific REST API extension

A REST API extension is a maven project stored in a Studio repository. You can find them in the studio workspace: `workspace/yourRepositoryName/restAPIExtensions/yourRestAPIProject`. From there you can simply use maven cli or a CI job to build, test or packake your REST API Extension.
