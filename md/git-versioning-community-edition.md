# Git versioning with Community Edition

::: info
**Note:** This page explains how to use Git to do versioning control of your Bonita Community Edition project. Enterprise Edition provides additional features including a [native integration of Git](workspaces-and-repositories.md) in Bonita Studio.
:::

## Workspaces and projects

Community Edition support a single workspace located in: `<studio_install_directory>/workspace` and a single project located inside the workspace folder. Project folder name depends on your language ("My project" for English users).

## Prerequisites
You need to have Git installed on your computer to follow this tutorial. You can download it from [https://git-scm.com/downloads](https://git-scm.com/downloads). In this tutorial we will use Git command line tool but you should be able to achieve the same result using graphical user interfaces.

You also need to have a Bonita Studio installed.

## Initialize your local Git repository

The first step is to Initialize a Git repository in your project folder.

On Windows:
- Start Git bash
- Change the directory to your project folder using the `cd` command. E.g. `cd /c/BonitaStudioCommunity-7.8.4/workspace/My\ project/`
- Type: `git init`

On Linux:
- Open a terminal
- Change the directory to your project folder using the `cd` command. E.g. `cd /home/<your username>/BonitaStudioCommunity-7.8.4/workspace/My\ project/`
- Type `git init`

At this stage you have an empty Git local repository. If you run the command `git status` you will see that all folders and files in the project folder are reported as "Untracked files".

## Ignoring some projects files
Part of the files located in the Bonita project folder should not be tracked by Git. Such files are usually the result of compilation operations.

To ignore the appropriate files:
- Download the file [Bonita.gitignore](https://raw.githubusercontent.com/Bonitasoft-Community/gitignore/7.8-1.0.0/Bonita.gitignore)
- Rename the file `Bonita.gitignore` to `.gitignore`
- Add the file `.gitignore` to your project directory

If you run again the command `git status` you should now get a shorter list of untracked files.

## Add files and create the first commit
Now you can run the command `git add --all` to add all untracked files to the Git staging area.

And create your first commit by doing `git commit`.

## Publish your project to a remote Git repository (e.g. GitHub)
At this stage you can track the history of your project locally. But what if you want to share your project publicly? Let see how we can share the project on GitHub:
- First create an account on GitHub
- Click on the button to create a new repository
- Set the repository name. E.g. `my-project`
- Make sure you leave the repository empty: no readme (you can add one in your local project if needed), no gitignore (already done), no license (add it to your local project if needed).
- Copy the project URL (either SSH or HTTPS). E.g. git@github.com:Bonitasoft-Community/my-project.git
- Add this repository as a new remote of your local Git repository. E.g. `git remote add origin git@github.com:Bonitasoft-Community/my-project.git`
- Push the master branch to GitHub: `git push --set-upstream origin master`