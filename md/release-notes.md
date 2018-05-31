# Release notes


## New values added

<a id="git"/>

### Collaborative development with Git (starting with Teamwork edition)
Working as a team on a Bonita project, securing resources on a shared server, and keeping track of the resources revisions is now possible with the integration of Eclipse [EGit plug-in](http://wiki.eclipse.org/EGit/User_Guide) in Bonita Studio, as well as the creation of a dedicated gitignore file.
Managing branches, viewing the differences between two revisions of a file, or between the local and remote repositories, as well as managing conflicts for a given file can be performed. Find more in the dedicated [documentation page section](workspaces-and-repositories.md#git) and in the howto: [Share a repository on GitHub](share-a-repository-on-github.md).
Combining Git capabilities with [Bonita Continuous Delivery add-on](https://documentation.bonitasoft.com/bcd/2.0/) offers best of breed technologies for multi-disciplinary teams to sustain a DevOps approach. 

<a id="bdm-access-control"/>

### Business data access control (BDM AC) (starting with Efficiency edition)
It is now possible to protect the access to BDM data through REST API calls.
This feature, [**BDM access control**](bdm-access-control.md), is available in Bonita Studio and works as a **white list** mechanism: through access rules, access is granted to entire business objects or to some attributes only, so that only users mapped with the selected **profiles** can access the data.
Help is provided on consistency checking between BDM, profiles, and BDM access control when changes are made on the BDM or the profiles.
A "profile access" tooling is also provided, to validate BDM access by profile.
This new resource can be installed and updated on a Bonita platform while BPM services are running, via the Administrator Portal.

<a id="save-form"/>

### Save Form (starting with Teamwork edition)
When a form contains lots of fields, or when the user misses some information required to fill out the form at once, saving the form to complete it later is a need. This is now possible with the new "Save" widget, that can be added to any form.
JavaScript information entered by the user is temporarily saved in the browser local storage while the task is still in "pending" status. When the user comes back to the task, the values entered are displayed on the form, missing data can be added, so the user efficiently submits the form to either start a process instance or execute a task.


## Improvements

<a id="ldap-synchronizer"/>

### LDAP synchronizer to synchronize Custom User Information too (starting with Teamwork edition)
More information than groups can now be synchronized from a Company's LDAP into a Bonita organization: the [LDAP synchronizer](ldap-synchronizer.md#cui) can input those additional fields into [Custom User Information](custom-user-information-in-bonita-bpm-studio.md). Such information is defined in Bonita Studio, and viewed or edited in Bonita Administrator Portal, and is used in actor filters for better task allocation.

<a id="readable-names"/>

### [Readable UI Designer artifact names](ui-designer-overview.md#readable-page-name) in Bonita repositories
New pages, forms, layouts, and fragments created with Bonita UI Designer now use the name given by the developer as IDs in the repository.
Easier to find when they need to be updated.
For existing artifacts, nothing has changed: their IDs is a UUID. You can switch them to the new mechanism by renaming them.

### UI Designer artifacts last update date
Last update date of all UI Designer artifacts is not updated with the use of the preview any more. Only when changes are made.

### BDM meta-information for Portal Administrator
Since installing or updating BDM requires BPM Services to be paused, such rights are only granted to the Technical User.
However, since the Portal Administrator can now install and update the BDM Access Control file from the Administrator Portal, he can now get information on BDM status and last update date.

### New layout for the Administrator Portal "User details" page
All details of a user in the organization are now diplayed on an AngularJS page of the Administrator Portal, bringing still more consistency to the Administrator Portal.

### Business objects relationships
The default relationship type between business objects is now "agreggation". It was "composition" before, which led to some validation errors: a single object cannot be linked to several parents with a composition relationship, but it can with an aggregation relationship.

### API error messages
Improvements of messages in case of error on API calls have been done: explain the cause and give options for easier error recoveries.

### Studio status bar
At the bottom right hand corner of Bonita Studio, the Eclipse status bas has been added to give information about the back-end activities, especially in case of operations on remote repositories. In order not to lose diagram designing space, icons of the coolbar are now small by default. If you prefer them large, go to the studio Preferences menu.

### Application descriptor "deploy"
Just like for profiles or BDM access control, there is now a "Deploy" option in the Application descriptor menu of Bonita Studio.

### Official signatures on Windows
Bonita binaries as well as Studio installer are now officially signed on Windows OS, to prevent useless security alerts.

<a id="techonolgy-updates"/>

## Technology updates

* The supported Tomcat version for this new release is Tomcat 8.5.31, in the Bonita Studio as well as in the Tomcat bundle.

### Other dependency updates

* (Enterprise and Performance editions) Bonita 7.7 now supports usage of Hazelcast on AWS out-of-the box. Previous versions required
modifying the Bonita installation.


<a id="feature-removals"/>

## Feature removals

### Jasper 5 connector
Jasper connector has been removed from provided connectors in Bonita Studio. If you have a process that depends on this connector and want to migrate in 7.7+, you have two options:
* Export the Jasper connector from a previous Studio version
* Download the connector from the [community website](https://community.bonitasoft.com/project/bonita-connector-jasper)
  Then just import the connector using the `Development > Connectors > Import connector...` menu.

## API behavior change

### Add comment in an open case
[addProcessComment()](https://documentation.bonitasoft.com/javadoc/api/7.7/org/bonitasoft/engine/api/ProcessRuntimeAPI.html#addProcessComment-long-java.lang.String-) method in ProcessRuntimeAPI has had a behavior change that went unnoticed in 7.4.0:
when called from a groovy script, it will systematically write the process comment as having been made by the "System" user, while previously it was using the user executing the task. It is caused by the fix to the bug [BS-14276](https://bonitasoft.atlassian.net/browse/BS-14276). Operations on human tasks are now asynchronous (as it should have been from 7.0.0). Hence all methods relying on the Session to get the userID, as addProcessComment() does, will find -1 as a value.
All scripts that want to perform an action on behalf of the user executing the task, should rely on the task assignee to do so, as there is no user logged during the script execution hence the -1 value in the sessions; as the execution is asynchronous.

This behavior will not be reverted to pre 7.4.0 state for the addProcessComment() method, or any other method that might suffer from a similar problem.
A new method has been introduced : [addProcessCommentOnBehalfOfUser()](https://documentation.bonitasoft.com/javadoc/api/7.7/org/bonitasoft/engine/api/ProcessRuntimeAPI.html#addProcessCommentOnBehalfOfUser-long-java.lang.String-long-), that will allow to replicate the previous behavior of the [addProcessComment()](https://documentation.bonitasoft.com/javadoc/api/7.7/org/bonitasoft/engine/api/ProcessRuntimeAPI.html#addProcessComment-long-java.lang.String-) method.
This new API method is designed so that a script can leave  a comment on behalf of the user.
**Note:** This use case has never been considered before. As a comment was thought to be left by the user himself / herself.

In practice, it means that if your process has been designed prior to Bonita 7.3 :
* If you are calling the method outside of groovy scripts, you can use the method you like ( addProcessComment() being probably more practical), and your process will not require any additional modifications
* If you are calling the method from a groovy script, in a process designed prior to 7.3 and migrated to 7.7, and want to maintain the previous behavior, you will have to modify your groovy scripts to use the new API method.
* If your process has been designed in Bonita 7.4, 7.5 or 7.6, the behavior of your process will not change. You will however have now access to a new API method upon migration, which will open new possibilities.

### UI Designer URL change

The UI Designer webapp embedded in Bonita Studio is now deployed with the name "bonita" (instead of "designer") in its own container (different from the one of Bonita Engine and Portal). As a result, it is now accessible through the URL http://localhost:<designer_port>/bonita instead of http://localhost:<tomcat_port>/designer.
This name update was a requirement in order for the UI Designer preview to continue working with bonita portal resources URLs starting with "/bonita".

### Jasper 5 connector
Jasper connector has been removed from provided connectors in Bonita Studio. If you have a process that depends on this connector and want to migrate in 7.7+, you have two options:
* Export the Jasper connector from a previous Studio version
* Download the connector from the [community website](https://community.bonitasoft.com/project/bonita-connector-jasper)
Then just import the connector using `Development > Connectors > Import connector...` menu.

### Deprecated Workspace API
The Workspace API tooling (headless studio build) has been deprecated. You are recommanded to use the *LA builder* which is part of the tooling suite of [Bonita Continuous Delivery add-on](https://documentation.bonitasoft.com/bcd/2.0/).


## Limitations and known issues

* In the Studio environment the UI Designer and the Engine/Portal are now split into two different tomcat instances. They now have different ports.
* MacOS environment: starting from MacOS El Capitan 10.11.4 (March 2016), new security rules block the launch of Bonita Studio. You must temporarily remove security on App launching in **System Preferences**>**Security & Confidentiality**.
* Process display name is now used everywhere in Bonita Portal (when it has been set in the process design) except in the default provided Jasper reports.
* The default living application layout does not re-encode the URL passed to the living application iframe anymore.

## Bug fixes

### Fixes in Bonita 7.7.0

## Acknowledgments
Thank you [Jerome Ventribout](https://github.com/jventrib) (Engine) for your contribution.
