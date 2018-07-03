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
Make sure you have used the newer mechanism in Bonita Studio older than 7.8 to replace your forms, using pool and task contracts as well as the UI Designer, as [documented here](contracts-and-contexts.md). The case overview page should also be replaced if you have customized it.

### Other dependency updates
Some internal libraries have been updated to newer versions:
* spring framework version is now 5.0.5.RELEASE
* spring-boot version is now 2.0.1.RELEASE

