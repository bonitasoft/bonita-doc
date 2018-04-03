# How to share a repository on Github

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

This page explains how to push a Bonita repository on [GitHub](https://github.com/). For more information on Git integration in Studio, you can read the [reference documentation page](workspaces-and-repositories.md#git).

## Create an empty GitHub repository

To create new GitHub repository you will need a [GitHub account](https://help.github.com/articles/signing-up-for-a-new-github-account/).
Then you will be able to [create a repository](https://help.github.com/articles/create-a-repo/). 

::: warning
**Note:** Leave the new repository empty. Do not commit in the new repository.
:::

## Share with Git

* Open a Bonita Studio
* Go to Repositroy > Team > Git > Share with Git
* Select the repository to share or enter the name of new repository. The default repository cannot be shared, but you can make a copy of its content before sharing a new repository.
* Click on Share
* Enter a commit message for the initial commit. If it is the first time you use git, a dialog will prompt to ask for an identity (mail and name). This identity will be stored in the git configuration and can be updated in preferences afterward. All your commit will be authored with this identity.
* Push the repository on the GitHub remote:
   *  On GitHub, navigate to the main page of the repository. Under the repository name, click Clone or download. In the Clone with HTTPs section, click to copy the clone URL for the repository.
   * In the Studio, paste the URL in the URI text input
   * Enter your GitHub username and password in the Authentication form
   * Click next
   * By convention, the default git branch is named master, you change this here.
   * You can change the pulling strategy (default is merge)
   * Click next
   * Click on Finish (Push will be done in a background job)
   * You should have a push confirmation dialog 
* You can check your repository on GitHub to validate the push

::: info
You may also use the ssh authentication mechanism if you do not want to use https. See [GitHub documentation](https://help.github.com/articles/connecting-to-github-with-ssh/) to configure ssh.
:::

## Committing with the Staging view

* Create a new diagram and save it.
* A new Git Staging view is now accessible. From this view you can manage the `status` of your repository:
    * You can see the **unstaged changes**: the files in this section have changed but not been updated yet, which means that they are unstaged. That is, if we commit right now, nothing will happen. You have to stage a file before you can commit it.
    * Below are the **staged changes**: you can add files from the unstaged changes in the staged changes by clicking on the add button (+). Only staged changes will be part of the next commit. You can remove a staged change by clicking on the remove button (-).
* Add the new process to the staged changes
* Type a commit message in the right panel of the Git Staging view
* Click on commit
* Go to Repositroy > Team > Git > Show History
* You can now view your commit in the repository history. You should have two commits at this stage.
* Before pushing your commit, pull the remote changes
* Go to Repositroy > Team > Git > Pull. This will fetch the remote and try to merge or rebase new commits into your local branch. A pull can put the repository in a **conflicting state** if the merge cannot be figured out by git. Conlicting files can be merged using the Git Staging view.
* In the Git Staging view you can see that your local master branch is ahead by 1 commit ([master ↑1])
* Now that we are in synch with the remote we can safely push our commit, go to Repositroy > Team > Git > Push. Click on `Preview >` and on `Push`

## Add, Commit and Push shortcut

* Make a change on the diagram and save it
* Go to Repositroy > Team > Git > Commit...
* Enter a commit message and click on `Commit and Push`

