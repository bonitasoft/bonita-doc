# Release notes

::: info
**Note:** The 7.8 is currently work in progress (WIP). The 7.8.0 GA is planned on December 2018.
:::


<a id="technology-updates"/>

## Technology updates

<a id="feature-removals"/>

## Feature removals

<a id="6.x-form"/>

### 6.x forms based on GWT technology removed.
Studio forms based on Google Web Toolkit (GWT) technology are not supported anymore, starting with Bonita 7.8. They have been removed from Bonita Studio. Importing a .bos will not import such forms.
Cloning a Git repository or migrating a SVN repository will remove such forms and their related content (validators, look'n'feels, forms and widgets templated).  
Before you start Bonita Studio 7.8 or migrate your production to Bonita 7.8., make sure you have replaced such forms/pages by forms/pages created with more recent technologies and newer concepts, offered since Bonita 7.0: [UI Designer](ui-designer-overview.md) and [contract and context](contracts-and-contexts.md).


## Other dependency updates
Some internal libraries have been updated to newer versions:
* spring framework version is now 5.0.5.RELEASE
* spring-boot version is now 2.0.1.RELEASE

