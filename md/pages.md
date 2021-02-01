#  Pages

Page resources are intended for use in applications. See how to use it and make it available to users. 

## Custom page usage examples

* Add a welcome page, with dashboards showing activity in Bonita and related external applications.
* Provide a process owner with a dashboard showing the activity of open cases of the process.
* Provide a busy user with a filtered view of the task list.
* Provide an administrator with a multi-attribute search facility.
* Integrate a page from an external application.
* Make a report available to users who do not have the Administrator profile.

Pages are [added, exported, edited, and deleted](resource-management.md) as resources in Bonita Portal. 

## Custom page definition

A page resource has the general [resource definition](resource-management.md). 
If it contains an `Index.groovy` file, this must implement the PageController interface optionally with libraries. 
If you create a custom page with Bonita UI Designer, its required structure and content are right, by default.

A custom page is displayed inside an iframe to prevent conflicts between Bonita Portal resources (for example JS and CSS) and those used in the custom page. 
This also reduces the risk of migration issues, for example if a custom page uses the version of JQuery provided with Bonita Portal and it is updated.

For all information about developping a custom page, go to [page and form development overview](page-and-form-development-overview.md).
