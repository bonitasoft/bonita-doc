# Workspaces and projects

Organize and share your Bonita project using workspaces and projects in order to ease developers team collaboration.

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
Community Edition only support a single workspace with a single project. To use Git with Community Edition refer to the [dedicated tutorial](git-versioning-community-edition.md).
:::


## Workspaces and projects

A workspace is a directory where Bonita Studio stores files such as Studio configuration settings (shared by all projects in the workspace) and projects folders. When you install Bonita Studio, a default workspace is created automatically: the folder is named `workspace` and is located in your Studio installation folder. 

A project is a directory within your workspace.  
You can use local projects to organize your work efficiently, for example by separating processes that do not interact.

A team project is a shared project on a Subversion (SVN) or Git server that is used by the team collaborating on developing a process.  
A shared project has typical code management features: locks (SVN only), synchronization, versioning.  
Your workspace contains a local copy of the project, which is synchronized with the remote Subversion or Git server.  
Note that the values of the _Local_ process configurations (such as parameters) will not be synchronized on the remote repository, to allow each Studio to have its own configuration. You can use another environment for shared configurations (Qualification, Production or custom environments).

### Switch workspace

The default workspace is _studio\_install\_directory_/workspace.

To use a different workspace:

1. Go to the **File** menu and choose **Switch workspace...**. 
2. A pop up window shows the path of the workspace you are currently using.
3. In the pop up window, specify the path of the workspace you want to use. If the selected destination does not exist, you are asked whether you want to create a new workspace.
4. Click **_OK_**.
5. The workspace switch is applied the next time Bonita Studio starts. Click **_OK_** in the pop up window to restart the studio, or **_Cancel_** to continue using the current workspace.

### Create a project

You can create a project in your workspace.  
The project is created in your current workspace.

To create a project:

1. Go to the **File** menu, choose **New project...**.
2. Specify a name for the new project.
3. Click **_OK_** .

A new project is created. Only one project can be active at a time.


### Export/Import a project

You can export all the content from a project for exchange or backup purposes:

1. Click on **File** > **Export...**
1. Click  on **Select All** to embed the whole project content into the BOS archive. 
1. Choose a location on your local drive to store the archive and click on **Finish**.

The exported archive can then be shared with other studios of the same version or newer.

To import a BOS archive:

1. Click on **Diagram** > **Import** >  **BOS Archive...**
1. Choose the location of the archive on your local drive
1. Choose the target project of the imported content
1. Handle conflicting files if any
1. Click on **Import**

You can retrieve the whole content of a studio workspace by exporting all its projects and importing them into another studio.

### Switch project

Before you change to a different project, make sure you have saved your work.

To switch the current project, follow these steps:

1. In the **File** menu, choose **Switch project...**.
2. The list of the available projects is displayed. These are the local and shared projects in your current workspace.
3. Select the project to switch to, and click **_OK_**.
4. A confirmation message is displayed when you are working in the new location.
You can see the name of the current project at the top, in the title bar.

If the list does not contain the name of the project you want to use, check that you are using the correct workspace, and if necessary, switch workspace.
