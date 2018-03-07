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
* Select the repository to share. The default repository cannot be shared, but you can make a copy ot its content before sharing a new repository.
* Click on Share
* Enter a commit message for the initial commit. If it is the first time you use git, a dialog will prompt to ask for an identit (mail and name). This identity will be store in t git configuration and can be updated in preferences afterward. All your commit will be authored with this identity.
* Push the repository on the GitHub remote:
   *  On GitHub, navigate to the main page of the repository. Under the repository name, click Clone or download. In the Clone with HTTPs section, click to copy the clone URL for the repository.
   * Copy the URL in the URI text input
   * Enter your GitHub username and password in the Authentication form
   * Click next
   * By convention, the default git branch is named master, you change this here.
   * You can change the pulling strategy (default is merge)
   * Click next
   * Click on Finish
   * You should have a push confirmation dialog
* You can check your repository on GitHub to validate the push

You may also use the ssh authentication mechanism if you do not want to use https. See [GitHub documentation](https://help.github.com/articles/connecting-to-github-with-ssh/) to configure ssh.