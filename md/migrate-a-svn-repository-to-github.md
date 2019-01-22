# How to migrate a SVN repository to Github 

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

This page explains how to migrate a **SVN** repository and its history to a **Git** repository on [GitHub](https://github.com/).

## Prerequistes

* Ubuntu
* awk : ```sudo apt-get install awk```
* subversion: ```sudo apt-get install subversion```
* git: ```sudo apt-get install git``` (tested with git 2.17.1)
* [git-svn](https://git-scm.com/docs/git-svn): ```sudo apt-get install git-svn```

## Migration steps

### Retrieve the list of all Subversion committers

A first step will be to retrieve the committers list of the repository.  
Checkout a copy of the repository to migrate in a location of your choice: ```svn checkout <svn-repository-url>```  
Then run the following command from the locally checkouted repository to retrieve the svn committers:  
```svn log -q | awk -F '|' '/^r/ {sub("^ ", "", $2); sub(" $", "", $2); print $2" = "$2" <"$2">"}' | sort -u > authors-transform.txt```  

In Git, the commit author needs to have a name and email listed. So update `authors-transform.txt` accordingly.  

eg: `wbates = wbates <wbates>` into `wbates = Walter Bates <wbates@acme.org>`

### Clone the Subversion repository using git-svn

`git svn clone <svn-repository-url>/<bonita-repo-name> --no-metadata --stdlayout --no-minimize-url -A authors-transform.txt ~/temp`

This will do the standard git-svn transformation (using the authors-transform.txt file you created in the step above) and place the git repository in the `~/temp` folder inside your home directory.  
Note: `<bonita-repo-name>` should have `trunk`, `branches`, `tags` children folder.

### Create a .gitignore

Add a .gitignore in `~/temp` with the following content

```
bin
.classpath
/src-providedGroovy
/template
/h2_database
/process_configurations
/META-INF
.settings
target/
/build.properties

#provided web widgets
/web_widgets/pb*/

#web component preferenes
/web_widgets/.metadata
/web_fragments/.metadata
/web_page/.metadata
/web_page/*/js
/web_fragments/*/*.js
/web_widgets/*/*.js

#bdm jar dependency is regenerate from bom.xml file
/lib/bdm-client-pojo.jar

#only used as user preferences
/database_connectors_properties
```

Double check that all files listed in the .gitignore are not present in `~/temp` folder.  
Remove them otherwise.

Then add all the changes and commit:
`git add -A`  
`git commit -m 'Add .gitignore.'`  

### Push repository to GitHub

Create a new empty repository on GitHub.  
Configure the upstream  
`git remote add origin <github-repo-url>`  
`git push --set-upstream origin master`  

You can now clone this git repository in Bonita Studio.

## References

For a more advanced migration read the following article  
* [https://john.albin.net/git/convert-subversion-to-git](https://john.albin.net/git/convert-subversion-to-git)
