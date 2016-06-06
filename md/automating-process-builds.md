# Automate process builds

Bonita BPM includes a Workspace API, which is a script, `BonitaStudioBuilder`, to build a bar file from a process in a repository. 
The goal is to use it in a continuous integration and testing environment. 

You can use the `BonitaStudioBuilder` to build a bar file for processes stored in a repository. It accesses the build features of Bonita BPM Studio in the background.   
Bonita BPM Studio must be installed but must not be running. You must to use a dedicated Bonita BPM Studio for continuous integration.
This is because the Bonita BPM Studio `workspace` directory should be removed before running the `BonitaStudioBuilder` script. 
(For continuous integration, it is best practice to clean the files before and after a build.)

To use `BonitaStudioBuilder`, you need the following:

* Bonita BPM Studio (the same version as the Bonita BPM repository). This must be a dedicated Bonita BPM Studio and repository used only for your `BonitaStudioBuilder`, because the tool removes the content of the repository.
* A window manager
* Java 1.6

After Bonita BPM Studio is installed, the `BonitaStudioBuilder` scripts are in the `workspace_api_scripts` folder. 
There are scripts for Windows (`.bat`), Linux (`.sh`), and MacOS (`_Mac.sh`).

Pass configuration information to the `BonitaStudioBuilder` script as system properties, using the following arguments: Argument, Purpose.

`repoPath`   
The parent folder of the repository storing the process. Typically, this is the trunk folder. It can also be a folder in tags if you want to point to a restore point in the repository. 
You cannot use a remote repository folder. A process to be built must be manually checked out before running the script.

`outputFolder`  
The folder where the generated bar files will be stored.

`processes`  
The list of the processes in the repository for which bar files are required. For each process, specify the process identifier and, optionally, the version. If you do not specify the version, the latest version is used.   
Format: _process_,_version;_process_,_version_...  
Example: `-process=TravelRequest,1.5;Expenses;LeaveRequest,1.0`_

`buildAll`  
If enabled, bar files are built for the latest version of each process in the repository.

`migrate`  
If enabled, you can point the `repoPath` argument to a repository of an older version than the version of the running Bonita BPM Studio. The processes in the older version repository will be automatically migrated to the current version.

`environment`  
The [environment](environments.md) with which the bar files will be built. The environment defines the [process configuration](configuring-a-process.md), including dependencies. If you do not specify an environment, the exported bar file will not contain the dependencies. All the specified processes are built for the same environment. If you want to build for different environments, you need to run the script once for each environment.

To run the script:

1. Check out the project to a directory in the Studio path.
2. Delete the content of the `workspace` directory in your Bonita BPM Studio installation.
3. Run the script. For example:
```bash
./BonitaStudioBuilder.sh -repoPath=/home/myBonitaRepoCheckedOut
-outputFolder=/home/bonita/myBARs -buildAll -migrate 
-environment=Qualification
```

When the script runs, information is logged in `workspace/.metadata/.log`.

#### Deploying a process bar file

From the bar file, a process can be [deployed manually using Bonita BPM Portal](processes.md). 
You can also [deploy a process using the Engine API](manage-a-process.md).
