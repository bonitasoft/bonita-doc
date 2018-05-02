
# Workspaces and repositories

::: info
**Note:** For Entreprise, Performance, Efficiency, and Teamwork editions only.
:::

This page explains how to use a shared repository so that several people can collaborate on process design.

## Workspaces and repositories

A workspace is a directory where Bonita Studio stores working files related to process design. When you install Bonita Studio, a workspace is created automatically. 

A local repository is a directory within your workspace.  
You can use local repositories to organize your work efficiently, for example by separating processes that do not interact.

A team repository is a shared repository on a Subversion (SVN) server that is used by the team collaborating on developing a process.  
A shared repository has typical code management features: locks, synchronization, versioning.  
Your workspace contains your local copy of the shared repository, which is synchronized with the shared repository on the SVN server.  
Note that the values of the process configurations (such as parameters) will not be synchronized on the remote SVN, to allow each Studio to have its own configuration.

### Switch workspace

The default workspace is _studio\_install\_directory_/workspace.

To use a different workspace:

1. Go to the **Diagram** menu and choose **Switch workspace...**. 
2. A popup shows the path of the workspace you are currently using.
3. In the popup, specify the path of the workspace you want to use. If the new workspace does not exist, you are asked whether you want to create it.
4. Click **_OK_**.
5. The workspace switch is applied the next time Bonita Studio starts. Click **_OK_** in the popup to restart Studio, or **_Cancel_** to continue in your current session.

### Create a local repository

You can create a local repository in your local workspace.  
The repository is created in your current workspace.

To create a local repository:

1. Go to the **Repository** menu, choose **Local**, then choose **Create new local repository**.
2. Specify a name for the new repository.
3. Click **_OK_** .
4. A status window shows the progress of the repository being built.  
   When the repository has been successfully created, a message shows you are working with the new local repository.
5. Click on **_OK_** to finish.

A new local repository is created. A new directory with the same name as the repository is added to your local workspace folder.

In Bonita Studio, you can see the new repository name shown at the top left, in the title bar.

### Export/Import a repository

You can export all the content from a repository for exchange or backup purposes:

1. Click on **Diagram** > **Export...**
1. Click  on **Select All** to embed all the repository content into the BOS archive. 
1. Choose a location on your local drive to store the archive and click on **Finish**

The exported archive can then be shared with other Studio of the same or newer version.

To import a BOS archive:

1. Click on **Diagram** > **Import** >  **BOS Archive...**
1. Choose the location of the archive on your local drive
1. In Subscription, you can choose the target repository of the imported content
1. Handle conflicting files if any
1. Click on **Import**

You can retrieve the whole content of a Studio workspace by exporting all its repositories and importing them into another Studio.

### Change repository

Before you change to a different repository, make sure you have saved your work.

To change repository, follow these steps:

1. In the **Repository** menu, choose **Change the repository**.
2. A list of the available repositories is displayed. These are the local and shared repositories in your current workspace.
3. Select the repository to switch to, and click **_OK_**.
4. A confirmation message is displayed when you are working in the new location.
You can see the name of repository at the top left, in the title bar.

If the list does not contain the name of the repository you want to use, check that you are using the correct workspace, and if necessary, switch workspace.

## Use a shared repository

<a id="git"/>

### Git

#### Prerequisites

* A remote Git repository ([GitHub](https://github.com/), [Bitbucket](https://bitbucket.org)...)
* Basic Git workflow knowledge ([Reference article](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics))

#### Git integration in Studio 

Bonita studio Git integration is based on th EGit eclipse plugin.

Git command available in Studio interface:

* **Share with Git**  
This action connect the current repository to Git and share it on a remote.
To configure the remote see the following [Egit userguide](http://wiki.eclipse.org/EGit/User_Guide#Working_with_remote_Repositories) or the [Share on GitHub howto](share-a-repository-on-github.md).

* **Clone**  
Create an new Studio repository from an existing Git repository (must contains a proper Bonita project). If the remote repository version is lower than the Studio, a migration will be applied on the cloned repository. Be carefull before pushing a migration on the remote. All contributors will have to use the proper Studio version.

* **Commit...**  
Shortcut action to `add`, `commit` and `push` the local changes.

* **Push to Upstream**  
Send the local commited changes to the configured upstream remote repository. You should make a pull before pushing.

* **Fetch from Upstream**  
Downloads new data from the upstream remote repository. It doesn't integrate any of this new data into your working files. Fetch is great for getting a fresh view on all the things that happened in a remote repository.

* **Push branch...**  
Send the local commited changes to a specfic branch on the remote repository. If the push fails, you may need to use make [force push](https://git-scm.com/docs/git-push) with the command line tool.

* **Pull**  
Fetch and try to integrate the remote changes of the current branch. This operation can put your repository in conflicting state.
Use the Git staging view and provided merge tool to resolve the conflicts. You can abort the merge with a [hard reset](https://git-scm.com/docs/git-reset) with the command line tool or the `Reset...` action.

* **Switch branch**  
Change current branch, checkout a new branch from remote or create a new branch.

* **Merge**  
Merge the content of a branch into current branch. [Reference article](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

* **Reset**  
Reset the content of the working tree to the head reference (latest commit).

* **Rebase...**  
Like a merge, you can retrieve the content of another using a `rebase`. It replay all commits of a selected branch into the current branch. [Reference article](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)

* **Git statging view**  
This view display the current status of your repository. From this view you can stage/unstage your changes, commit and even commit and push. You can access to the compare editor using the contextal menu.
More information available in [EGit user guide](http://wiki.eclipse.org/EGit/User_Guide#Git_Staging_View).

* **History view**  
This view display the commit history of the repository.
More information available in [EGit user guide](http://wiki.eclipse.org/EGit/User_Guide#Inspect_History).

Those commands can be found in Repository > Team > Git menu.

#### Conflict management 

The use of Git often lead to conflicts when contributions are merged. There is different ways to manage conflicts, with a diff tool, in a text editor...  
Bonita Studio integrates the default merge tool of EGit. Here are some hints on how to resolve conflicts using EGit: [Manage conflicts using EGit](http://wiki.eclipse.org/EGit/User_Guide#Resolving_a_merge_conflict).

#### Advanced Git commands

Git worklow offers a lot of other features that are not directly integrated in Bonita Studio. You can still use them using the command line interface ([available here](https://git-scm.com/download/)). To retrieve the location of your repository on your filesystem go to <bonita_studio_install_dir>/workspace/<name_of_the_repository>.

### SVN

A shared repository is a repository on an SVN server. It can be accessed by members of the team working on a process definition.  
It is protected by username and password. Only directories in the SVN 'trunk' can be used as Bonita repositories.  
The repository created remotely is then copied to your default local workspace and synchronized.

A shared Bonita development repository contains the artifacts developed in Bonita Studio and the UI Designer. For the UI Designer artifacts, there is no locking, merging, or conflict management.

**Caution:** Items defined in Bonita Portal are not stored in the shared repository.  
This includes applications and custom profiles. To share these artifacts, export them into an external repository such as Git. 

#### Prerequisites

* A central SVN server accessible by the process designers, accessible by URL, and protected by login and password.  
* The same version of Bonita must be used by all users of the shared repository.

#### Create a shared repository

There are two stages to creating a repository: connect to the SVN server, then specify the name of the new repository. Follow these steps:

1. In the **Repository** menu, choose **Team**.
2. Click on **Connect to the repository**.
3. In the Create a new connection window, enter the URL, username, and password in the appropriate fields.
4. Click **_Next_** to connect to the remote SVN server.
5. From time to time, depending on your system and network security setup, you may be asked to confirm security credentials.
6. A popup displays a list of the existing Bonita repositories available on the SVN server.
7. Click on the button **_Create a new Bonita repository_**.
8. In the window, Repository name, give the repository a name e.g "my\_new\_repository".
9. Click on **_OK_**.

The new repository is created locally and copied remotely to the SVN server. You can configure synchronization for this new shared repository.

#### Connect to a shared repository

To connect to a shared repository, follow these steps:

1. In the **Repository** menu, choose **Team**.
2. Click on **Connect to the repository**.
3. In the Create a new connection window, enter the URL, username, and password in the appropriate fields.
4. Click on **_Next_** to connect to the remote SVN server.
5. From time to time, depending on your system and network security setup, you may be asked to confirm security credentials.
6. A popup displays a list of the existing Bonita repositories available on the SVN server.
7. Select the name of the repository, and click **_Connect_**.
8. A message is displayed, showing that you are connected to the shared repository. You can see the name of repository at the top left, in the title bar.
9. Click on **_OK_**.

The first time you connect to a repository, you might get a security warning.  
Configure security for the connection according to your organization's security policy.


#### Synchronize a shared repository

Synchronizing a shared repository means merging the changes you have made in your local copy into the central repository on the server, and updating your local copy with the result.  
There are three modes for synchronizing:

* Recommended: Use manual synchronization for all repositories: With this mode, no automatic synchronization is done in either direction. This is the default behavior.
You launch synchronization manually, by going to the **Repository** menu, choosing **Team** then **Commit artifacts**. There is also a keyboard shortcut: **_Ctrl+Alt+C_**.
* Use automatic synchronization for all repositories: With this mode, every time you make a change, it is saved in both your local copy and the central repository. 
   Changes made to the central repository are sent immediately to your local copy.   
   You can only use this mode if you have a continuous network connection to the system hosting the SVN server. There is a significant network performance cost for using automatic synchronization. This option is not recommended.
* Define synchronization mode repository by repository: With this mode, you define whether synchronization is manual or automatic for each repository.

#### Manage locks on shared resources

This information applies to artifacts created in Bonita Studio but not those created in the UI Designer.

Bonita Studio automatically locks an artifact (process or shared resource) when you open it for editing. You can also lock an artifact manually.   
If you try to open an artifact that is locked by another user, a popup tells you that the artifact is logged and gives the SVN username of the person who owns the lock.   
You can choose to open the artifact in read-only mode, which means you cannot make any changes.  
It is also possible to unlock a locked artifact and lock it yourself, but this is not generally recommended except as a last resort if the owner of the lock cannot be contacted to release the lock.

You can choose to open an artifact in read-only mode, even if it is not locked by another user. If an artifact you are viewing in read-only mode is locked, there is a lock icon in the name tab at the top of the whiteboard.

To manually lock or unlock an artifact:

1. Go to the **Repository** menu, and choose **Team**, then **Manage locks**.
2. A popup displays the list of artifacts.
3. Select the artifact to lock or unlock, and then click the **_Lock_** or **_Unlock_** button.
4. Click **_OK_**.

To check the lock status of an artifact, go to the **Diagram** menu and choose **Open**, or click **_Open_** in the coolbar.   
In the popup, artifacts that you have locked are marked with a green padlock, and artifacts that another user has locked are marked with a red padlock and the user's SVN username.  
From the popup, you can:

* Open a process that you have locked (marked with a green padlock) or that is not locked (no padlock).
* Open a process in read-only mode. You can do this for any process, but it is most useful for a process that is locked by another user (red padlock).
* Open a locked process (red padlock). You can open a locked process in read-only mode. You cannot open a locked process read-write.

#### Avoiding conflicts

A conflict occurs when two or more users update the same process in a repository and the updates are not compatible.  
If you are using a shared repository, Bonita Studio automatically locks a Studio artifact when a user opens it for edit. (Note: UI Designer artifacts are not locked.)  
This means that only one user at a time can update the artifact, avoiding the possibility of conflicts. The only risk of conflicts is if a user takes over a lock from another user who has not committed their changes.   
For this reason, you are not recommended to unlock artifacts that are locked by another user.

It is also good practise to commit your changes regularly, to keep your local working copy synchronized with the central repository.   
To commit your changes, go to the **Repository** menu, choose **Team**, and then choose **Commit artifacts**.   
When you commit your changes, you have the option to release the lock so that another user can edit the artifact. By default, your lock is maintained.  
If you want to release the lock, uncheck the **Keep locks** box in the Commit dialog.

#### Versioning and history

If you are using a shared repository, all modifications to an artifact are recorded by the SVN server. 

To view the history for an artifact:

1. Go to the **Repository** menu and choose **Team**, then **History**.
2. In the history list popup, select the artifact in the left-hand column.
3. The revision history for the selected artifact is displayed in the right-hand column. 
This shows all the changes that have been made, and the author of each change.

To revert to an older version, click on that version in the revision history, then click on **_Revert to this version_** in the popup.  
The selected version will be restored.

#### Restore points

A restore point is a marker in a repository that you can use to restore your repository back to an earlier state.  
The difference between a restore point and a version in the revision history is that a restore point applies to the whole repository but a version applies to a single artifact.

To create a restore point:

1. Go to the **Repository** menu and choose **Team**, then **Manage restore points**.
2. Select **Create a restore point** then click **_Next_**.
3. Enter a description for the restore point, then click **_Create_**. The restore point is created.

To restore an older point:

1. Go to the **Repository** menu and choose choose **Team**, then **Manage restore points**.
2. Select **Restore to an older point** then click **_Next_**.
3. Select the restore point you want to restore, then click **_Restore_**. The repository reverts to the restore point.
