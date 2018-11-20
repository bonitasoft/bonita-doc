# Release notes

::: info
**Note:** The 7.8 is currently work in progress (WIP). The 7.8.0 GA is planned on December 2018.
:::


<a id="technology-updates"/>

## Technology updates

<a id="feature-removals"/>

## Feature removals

<a id="6.x-form"/>

### 6.x forms based on GWT technology
Studio forms based on Google Web Toolkit (GWT) technology are not supported anymore, starting with Bonita 7.8.  
They have been removed from Bonita Studio.  
This means that, in the studio, there is no more:
  - "Resources" tab, 
  - "Application" tab, nor all associated configuration in the process (Pageflow transition, Entry forms, View forms, Recap forms, etc.)
  - Look'n'feels, validators, forms and widgets templates, and theme editor 
  - In the _Execution > Form_ tab, the "Legacy 6.x" option is no longer available.
In a repository/project, there is no more "Application resources" folder.

Importing a .bos will not import such forms.
Cloning a Git repository or migrating a SVN repository will remove such forms.

Before you migrate your production to Bonita 7.8, make sure you use Bonita Studio in a version older than 7.8.0 to [replace such forms/pages](migrate-form-from-6.x.md) by forms/pages created with more recent technologies and newer concepts, offered since Bonita 7.0: [UI Designer](ui-designer-overview.md) and [contract and context](contracts-and-contexts.md). 
Learn for example how to replace the [configuration page](migrate-form-from-6.x.md), no longer available.

Moreover, deploying a process (.bar file) containing forms/pages developped using Google Web Toolkit is not possible anymore.

<a id="bar-importer"/>

### 5.x BAR file import in Studio
It is no longer possible to import BAR files created with Bonita 5.x in the Studio. If you still need to migrate 5.x bar, use Bonita Studio __7.7.x__ version.

### Debug action in Studio

## Other dependency updates
Some internal libraries have been updated to newer versions:
* spring framework version is now 5.0.10.RELEASE
* spring-boot version is now 2.0.6.RELEASE

