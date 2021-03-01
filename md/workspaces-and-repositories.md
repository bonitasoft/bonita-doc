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

The default workspace is _studio_install_directory_/workspace.

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
2. Click  on **Select All** to embed the whole project content into the BOS archive. 
3. Choose a location on your local drive to store the archive and click on **Finish**.

The exported archive can then be shared with other studios of the same version or newer.

To import a BOS archive:

1. Click on **Diagram** > **Import** >  **BOS Archive...**
2. Choose the location of the archive on your local drive
3. Choose the target project of the imported content
4. Handle conflicting files if any
5. Click on **Import**

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

## Use a shared project

::: info
Bonita Studio provide a feature (**File** menu, **Import**, **Workspace...**) to import all the projects from a given workspace into your current workspace. If the workspace you import from includes shared projects (Git or Subversion), be aware that importing the workspace will result in having a local project instead of a shared one. For shared projects, it’s advised to clone them directly from the remote Git repository instead of using the import workspace feature.
:::

<a id="git"/>

### Git

#### Prerequisites

- A remote Git repository ([GitHub](https://github.com/), [Bitbucket](https://bitbucket.org)...)
- Basic Git workflow knowledge ([Reference article](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics))

#### Git integration in Studio

Bonita Studio Git integration is based on the EGit Eclipse plugin.

Git commands available in the studio interface:

- **Share with Git**  
  This action connects the current project to Git and shares it on a remote.
  To configure the remote, see the following [Egit user guide](http://wiki.eclipse.org/EGit/User_Guide#Working_with_remote_Repositories) or the [Share on GitHub howto](share-a-repository-on-github.md).

- **Clone**  
  Create a new Studio project from an existing Git repository (that must contain a proper Bonita project). If the remote project version is lower than the studio, a migration will be applied on the cloned project. Be careful before pushing a migrated project back to the remote: all contributors will have to use the proper studio version.

If you used Bonita on Git before Bonita 7.7.0, you might want to clone it from the studio.  
Be careful though: we cannot guarantee that cloning a Git repository not created with Bonita Studio will work properly.  
However, to do so, first check that your project on GitHub is "Bonita compliant":

```
 * The Git repository content must includes a Bonita project (and not a Bonita workspace)
 * The .project file must be present 
 * It is highly recommended to use the .gitignore file generated by Bonita when you share a Bonita project from the studio.
```

Still, the best way to proceed is to export the project from the older version of the studio (as a .bos file) and import it in the new studio, and then share this project on Git, although with this procedure, the history of revisions will be lost.

- **Commit...**  
  Shortcut action to `add`, `commit` and `push` the local changes.

- **Push to Upstream**  
  Send the local committed changes to the configured upstream remote repository. You should make a pull before pushing.

- **Fetch from Upstream**  
  Download new data from the upstream remote repository. It doesn't integrate any of this new data into your working files. Fetch is great for getting a fresh view on all the things that happened in a remote repository.

- **Push branch...**  
  Send the local committed changes to a specific branch on the remote repository. If the push fails, you may need to use make [force push](https://git-scm.com/docs/git-push) with the command line tool.

- **Pull**  
  Fetch and try to integrate the remote changes of the current branch. This operation can put your repository in conflicting state.
  Use the Git staging view and provided merge tool to resolve the conflicts. You can abort the merge with a [hard reset](https://git-scm.com/docs/git-reset) with the command line tool or the `Reset...` action.

- **Switch branch**  
  Change current branch, checkout a new branch from remote or create a new branch.  

- **Merge**  
  Merge the content of a branch into current branch. [Reference article](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

- **Reset**  
  Reset the content of the working tree to the head reference (latest commit).

- **Rebase...**  
  Like a merge, you can retrieve the content of another using a `rebase`. It replay all commits of a selected branch into the current branch. [Reference article](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)

- **Git staging view**  
  This view display the current status of your repository. From this view you can stage/unstage your changes, commit and even commit and push. You can access to the compare editor using the contextual menu.
  More information available in [EGit user guide](http://wiki.eclipse.org/EGit/User_Guide#Git_Staging_View).

- **History view**  
  This view display the commit history of the repository.
  More information available in [EGit user guide](http://wiki.eclipse.org/EGit/User_Guide#Inspect_History).

- **Status**
  This gives you connection information with the remote as well as the current status (ahead or behind) compared to the remote.
  This information is also available at the top of Bonita Studio window, as well as at the top of the Git Staging view.

Those commands can be found in Team > Git menu.

::: warning
**Branches can be merged/rebased into each others if and only if branches are in the same Bonita version.** Else, migration might be skipped.
:::

#### Conflict management

The use of Git often lead to conflicts when contributions are merged. There is different ways to manage conflicts, with a diff tool, in a text editor...  
Bonita Studio integrates the default merge tool of EGit. Here are some hints on how to resolve conflicts using EGit: [Manage conflicts using EGit](http://wiki.eclipse.org/EGit/User_Guide#Resolving_a_merge_conflict).

#### Advanced Git commands

Git workflow offers a lot of other features that are not directly integrated in Bonita Studio. You can still use them using the command line interface ([available here](https://git-scm.com/download/)). To retrieve the location of your project on your filesystem do a right click on the project name in the project explorer and select **Show in system explorer** (default location of your project would be: &lt;bonita_studio_install_dir>/workspace/&lt;name_of_the_project>).

<a id="git-troubleshooting"/>

#### Troubleshooting

- **My diagram has many validation issues after a clone / a switch branch operation:** Keep in mind that Bonita artifacts (Business Data Model, Organization, Profiles, Applications, Pages ...) are not redeployed when you perform a clone or a switch branch operation. So, if you switch from a branch A to a branch B, you may need for example to deploy manually your BDM to ensure that all the business objects specific to the branch B are available.
- **My git history view is empty:** The history view is based on  the active editor or the current selection (in Eclipse, a selection is a file selected in a package explorer). Sometimes you can manage to open the history view without having any active editor and nothing selected (which is often the case in Bonita because we only provide a package explorer in the REST API extensions editor) -> the history view does not display anything. Just open a diagram for example and then re-open your history view.
- **Cloning a repository hosted on Azure DevOps** When authentication to azure dev ops git repository uses SSO, cloning using https and Microsoft dedicated eclipse plugin is not supported (e.g. `https://user@dev.azure.com/organization/repository/_git/repository`). Use SSH URL instead (e.g. `git@ssh.dev.azure.com:v3/user/organization/repository`)/
- **I try to use git with HTTPS, but I have authentication issues (_not authorized_)** This might happen if you have enabled the _two factor authentication_ on your GitHub account. You must use an [access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) to be able to use HTTPS with the _two factor authentication_ activated. Once the token is created, use it instead of your password. An other solution is to use [ssh](https://help.github.com/en/articles/connecting-to-github-with-ssh).
- **I have _invalid privatekey_ issues when I try to use Git with ssh on macOs**: Since the macOs mojave update, the ssh-keygen default export format has changed. The new format isn't compatible with all eclipse versions. Use the following command to force ssh-keygen to export the private key as PEM format if you face this issue: _ssh-keygen -m PEM -t rsa -b 4096 -C "[your_email@example.com](mailto:your_email@example.com)"_.

### Subversion (SVN)

A shared project is a repository on an SVN server. It can be accessed by members of the team working on a process definition.  
It is protected by username and password. Only directories in the SVN 'trunk' can be used as Bonita repositories.  
The repository created remotely is then copied to your default local workspace and synchronized.

A shared project contains the artifacts developed in Bonita Studio and the UI Designer. For the UI Designer artifacts, there is no locking, merging, or conflict management.

#### Prerequisites

- A central SVN server accessible by the process designers, accessible by URL, and protected by login and password.  
- The same version of Bonita must be used by all users of the shared project.

#### Shared a project

There are two stages to creating a repository: connect to the SVN server, then specify the name of the new repository. Follow these steps:

1. In the menu **Team** > **SVN**.
2. Click on **Connect to a repository**.
3. In the Create a new connection window, enter the URL, username, and password in the appropriate fields.
4. Click **_Next_** to connect to the remote SVN server.
5. From time to time, depending on your system and network security setup, you may be asked to confirm security credentials.
6. A popup displays a list of the existing Bonita repositories available on the SVN server.
7. Click on the button **_Create a new Bonita project_**.
8. In the window, Project name, give the project a name e.g "my_new_project".
9. Click on **_OK_**.

The new project is created locally and copied remotely to the SVN server. You can configure synchronization for this new shared project.

#### Connect to a shared project

To connect to a shared repository, follow these steps:

1. In the  menu **Team** > **SVN**.
2. Click on **Connect to a repository**.
3. In the Create a new connection window, enter the URL, username, and password in the appropriate fields.
4. Click on **_Next_** to connect to the remote SVN server.
5. From time to time, depending on your system and network security setup, you may be asked to confirm security credentials.
6. A popup displays a list of the existing Bonita repositories available on the SVN server.
7. Select the name of the project, and click **_Connect_**.
8. A message is displayed, showing that you are connected to the shared project.
9. Click on **_OK_**.

The first time you connect to a repository, you might get a security warning.  
Configure security for the connection according to your organization's security policy.

#### Synchronize a shared project

Synchronizing a shared project means merging the changes you have made in your local copy into the central repository on the server, and updating your local copy with the result.  
There are three modes for synchronizing:

- Recommended: Use manual synchronization for all repositories: With this mode, no automatic synchronization is done in either direction. This is the default behavior.
  You launch synchronization manually, by going to the **Team** > **SVN** menu then **Commit artifacts**. There is also a keyboard shortcut: **_Ctrl+Alt+C_**.
- Use automatic synchronization for all repositories: With this mode, every time you make a change, it is saved in both your local copy and the central repository. 
   Changes made to the central repository are sent immediately to your local copy.  
   You can only use this mode if you have a continuous network connection to the system hosting the SVN server. There is a significant network performance cost for using automatic synchronization. This option is not recommended.
- Define synchronization mode project by project: With this mode, you define whether synchronization is manual or automatic for each project.

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

- Open a process that you have locked (marked with a green padlock) or that is not locked (no padlock).
- Open a process in read-only mode. You can do this for any process, but it is most useful for a process that is locked by another user (red padlock).
- Open a locked process (red padlock). You can open a locked process in read-only mode. You cannot open a locked process read-write.

#### Avoiding conflicts

A conflict occurs when two or more users update the same process in a project and the updates are not compatible.  
If you are using a shared project, Bonita Studio automatically locks a Studio artifact when a user opens it for edit. (Note: UI Designer artifacts are not locked.)  
This means that only one user at a time can update the artifact, avoiding the possibility of conflicts. The only risk of conflicts is if a user takes over a lock from another user who has not committed their changes.  
For this reason, you are not recommended unlocking artifacts that are locked by another user.

It is also a good practice to commit your changes regularly, to keep your local working copy synchronized with the central repository.  
To commit your changes, go to the  **Team** > **SVN** menu, and then choose **Commit artifacts**.  
When you commit your changes, you have the option to release the lock so that another user can edit the artifact. By default, your lock is maintained.  
If you want to release the lock, uncheck the **Keep locks** box in the Commit dialog.

#### Versioning and history

If you are using a shared repository, all modifications to an artifact are recorded by the SVN server. 

To view the history for an artifact:

1. Go to the **Team** > **SVN** > **History**.
2. In the history list popup, select the artifact in the left-hand column.
3. The revision history for the selected artifact is displayed in the right-hand column. 
   This shows all the changes that have been made, and the author of each change.

To revert to an older version, click on that version in the revision history, then click on **_Revert to this version_** in the popup.  
The selected version will be restored.

#### Restore points

A restore point is a marker in a repository that you can use to restore your project back to an earlier state.  
The difference between a restore point and a version in the revision history is that a restore point applies to the whole project but a version applies to a single artifact.

To create a restore point:

1. Go to the **Team** > **SVN** then **Manage restore points**.
2. Select **Create a restore point** then click **_Next_**.
3. Enter a description for the restore point, then click **_Create_**. The restore point is created.

To restore an older point:

1. Go to the **Team** > **SVN**, then **Manage restore points**.
2. Select **Restore to an older point** then click **_Next_**.
3. Select the restore point you want to restore, then click **_Restore_**. The project reverts to the restore point.
