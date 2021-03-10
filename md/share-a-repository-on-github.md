# How to share a project on Github

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

This page explains how to push an existing Bonita project on [GitHub](https://github.com/) to share it with teammates.  
For more information on Git integration in Bonita Studio, you can read the [reference documentation page](workspaces-and-repositories.md#git).

## Create an empty GitHub repository

To create new GitHub repository you will need a [GitHub account](https://help.github.com/articles/signing-up-for-a-new-github-account/).
Then you will be able to [create a repository](https://help.github.com/articles/create-a-repo/). 

::: warning
**Note:** Leave the new repository empty. No .gitignore, no readme. Do not commit in the new repository.
:::

## Share with Git

1. Open a Bonita Studio. 
2. Go to Team > Git > Share with Git  
3. Click on "Share".  
   You can share the current project or create a new project and share it.  
   In all cases, the local Git repository is initialized, and a .gitignore file is created.  
4. Enter a commit message for the initial commit. If it is the first time you use Git, a dialog will prompt to ask for an identity (mail and name). This identity will be stored in the Git configuration and can be updated in preferences afterward. All your commits will be authored with this identity. Note that this is your Git identity, different from your GitHub credentials.  
5. Click on "Commit and Push".  
6. To push the project on the GitHub remote:  
   a.  On GitHub, navigate to the main page of the repository. Under the repository name, click on "Clone or download". In the Clone with HTTPs section, click on the icon to copy the clone URL for the repository.  
   b. In the studio, paste the URL in the URI text input  
   c. Do not select anything in the "Protocol" drop down list, nor write anything on the "Port" input field  
   c. If needed, enter your GitHub username and password in the Authentication form  
   d. Click on "Next"  
   e. By convention, the default Git branch is named `master`, but you can change this here.  
   f. You can also change the pulling strategy (default is `merge`)  
   g. Click on "Next"  
   h. Click on "Finish" (Push will be done in a background job, visible at the bottom right corner of the studio window)  
   i. When the Push is done, a push confirmation dialog is displayed  

You might encounter some issues if the two factor authentiation is activated on your github account, see the [Git trouble shooting section](workspaces-and-repositories.md#git-troubleshooting).

8. To validate that the push has actually been done, you can check your repository on GitHub

::: info
You may also use the ssh authentication mechanism if you do not want to use https. You still do not need to select the protocol nor the port in this case. See [GitHub documentation](https://help.github.com/articles/connecting-to-github-with-ssh/) to configure ssh. 
:::

## Committing with the Staging view

1. Create a new diagram and save it.
2. A new Git Staging view is now accessible. From this view you can manage the `status` of your repository:
   - You can see the **unstaged changes**: the files in this section have changed but not been updated yet, which means that they are unstaged. That is, if we commit right now, nothing will happen. You have to stage a file before you can commit it.
   - Below are the **staged changes**: you can add files from the unstaged changes in the staged changes by clicking on the add button (+). Only staged changes will be part of the next commit. You can remove a staged change by clicking on the remove button (-).
3. Add the new process to the staged changes
4. Type a commit message in the right panel of the Git Staging view
5. Click on Commit
6. Go to Team > Git > Show History
7. You can now view your commit in the repository history. You should have two commits at this stage.
8. Before pushing your commit, pull the remote changes
9. Go to Team > Git > Pull. This will fetch the remote and try to merge or rebase new commits into your local branch. A pull can put the repository in a **conflicting state** if the merge cannot be figured out by Git. Conlicting files can be merged using the Git Staging view: you need to double-click on the conflicting files indicated with a red icon to display the Diff Viewer.
10. In the Git Staging view you can see that your local master branch is ahead by 1 commit ([master ↑1])
11. Now that you are in synch with the remote, you can safely push your commit. To do so, go to Team > Git > Push. Click on `Preview >` and on `Push`

## Add, Commit and Push shortcut

1. Make a change on the diagram and save it
2. Go to Team > Git > Commit...
3. Enter a commit message and click on `Commit and Push`
