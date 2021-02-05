#  Pages
Pages are resources intended to be used in applications. They are [added, exported, edited, and deleted](resource-management.md) as resources in Bonita Portal. 

## Provided pages 
Bonita Portal comes with some provided pages to use in applications. They are wrapped pages developed in other technologies than Bonita UI Designer (AngularJS, React, PortalJS).  
Starting with Bonita 2021.1, you can also download the Bonita User and Administrator Applications (from Bonita Studio Welcome page), and get more provided pages, developped with Bonita UI Designer.

## Custom pages
To create the perfect user experience for different profiles of applications users, you need to create custom pages. This can be done with Bonita UI Designer, or in your favorite IDE.
A few examples of custom pages:
* Add a welcome page, with dashboards showing activity in Bonita and related external applications.
* Provide a process owner with a dashboard showing the activity of open cases of the process.
* Provide a busy user with a filtered view of the task list.
* Provide an administrator with a multi-attribute search facility.
* Integrate a page from an external application.
* Make a report available to users who do not have the Administrator profile.

For all information about developping a custom page, go to [page and form development overview](page-and-form-development-overview.md).

## Use in applications
Once the pages are all made available in the Resources section of Bonita Portal, they can be used to [create applications](applicationCreation.md).  
We highly recommand that the creation of applications is done in Bonita Studio, to be managed with all other project resources in the Version Control System (Git).

## Live update
[Live update](live-update.md) allows the Administrator to update one element of the application in a situation of emergency.

### Edit a page
You can [edit the content of a page](resource-management.md#modify) by installing a new version of a page.

### Modify the pages in an application
You can modify the pages in an application by [mapping other pages](applications.md#specify-pages) in the application descriptor, and/or [creating, moving, or deleting menus or menu options](applications.md#define-navigation).
