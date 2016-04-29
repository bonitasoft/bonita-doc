# 3.5.2 Pages

This page explains how to use a page resource (also called a custom page) to the Portal and make it available to users. Page resources are intended for use in applications. You can also use a page resource to customize the portal, 
for example:

* Add a welcome page, with dashboards showing activity in Bonita BPM and related external applications.
* Provide a process owner with a dashboard showing the activity of open cases of the process.
* Provide a busy user with a filtered view of the task list.
* Provide an administrator with a multi-attribute search facility.
* Integrate a page from an external application.
* Make a report available to users who do not have the Administrator profile.

**[Custom page definition](#page_definition)**

> [PageController interface](#pageController)

> [Authorization permissions for custom pages](#permissions)

**[Custom page examples](#examples)**

**[Using Bonita BPM Portal content](#portal)**

> [Debugging a custom page in development](#debug)

**[Constraints](#constraints)**

**[Page resources management](#resources)**

> [Page resources](#page-resources)

> [API access](#api-access)

> [Theme access](#theme-access)

Pages are [exported. imported, modified, and deleted](/resource-management.md) as resources in Bonita BPM Portal. 

## Custom page definition

A page resource has the general [resource definition](/resource-management.md#resource_definition). 
If it contains an `Index.groovy` file, this must implement the [PageController interface](#pageController), optionally with libraries. 
If you create a custom page with the UI designer, it has the reequired structure and content automatically.

A custom page is displayed inside an iframe to prevent conflicts between the portal resources (for example JS and CSS) and those used in the custom page. 
This also reduces the risk of migration issues, for example if a custom page uses the version of JQuery provided with Bonita BPM Portal and it is updated.

### PageController interface
`
public interface PageController {

/**
* Let the custom page parse request for specific attribute handling.
*
* @param request the HTTP servlet request intended to be used as in a servlet
* @param response the HTTP servlet response intended to be used as in a servlet
* @param pageResourceProvider provide access to the resources contained in the custom page zip
* @param pageContext provide access to the data relative to the context in which the custom page is displayed
*/
public void doGet(HttpServletRequest request, HttpServletResponse response, PageResourceProvider pageResourceProvider, PageContext pageContext);
}
`

## Custom page examples

Two example custom pages are available in the portal. Both examples show how to:

* Get the Bonita CSS
* Write simple HTML code
* Get session information, including the locale
* Get resources from the custom page definition
* Call the Engine Java APIs (in the Groovy example) or the Web REST APIs (in the.md example)
* Write a clickable link to an external page
* Write a clickable link to a portal page
* Write locale-specific messages

**Groovy example page** defines a custom page using Groovy. 
**HTML example page** defines a custom page using only HTML. 
In practice, you will probably use a combination of Groovy and HTML to create your custom pages.

To view an example page, [publish the page to a custom profile](#publish) so that you can view it in the portal. To view the source of an example, [export the custom page](#export).

On the [Customer Portal](https://customer.bonitasoft.com/), there is also an example in the form of a seed project for creating custom pages using AngularJS and a customizable example task list page.

## Using Bonita BPM Portal content

You can reuse pages from the Bonita BPM Portal in your custom pages. For example, in a page giving details of a case history, you could include the live case status diagram to show the current status. For example, for case 1 of process definition 8270554088248243867, include these lines in your custom page definition:
`
def idProcess = "8270554088248243867";
def idCase = "1";
out.write("""""");
`

This displays the case diagram exactly as it appears in the standard Bonita BPM Portal page. You can modify the view to hide the Portal **Back** button by adding `?diagramOnly` to the URL:
`
out.write("""""");
`

### Debugging a custom page in development

While you are developing a custom page, you can enable custom page debug mode for your portal. In debug mode, you can see changes to your custom page without importing a new zip archive.

To enable custom page debug mode, edit ` /client/tenants//conf/console-config.properties` and set `custom.page.debug` to `true`.

To work on a page in debug mode:

1. Import your custom page zip archive into the portal. This creates a directory `/client/tenants//work/pages/`.
2. Publish the page to a profile, then log out and log in as a user having this profile.
3. You can now update `Index.groovy` and the contents of the `lib` directory directly in `/client/tenants//work/pages/`.
4. To view the page after you modify it, refresh the page in the browser.

When you have finished developing the page, recreate the custom page zip archive, and then [modify the page](#edit) to import it. This makes your final version of the page permanently available.

## Constraints

A custom page is displayed in an iframe in the portal, so is isolated from changes to the portal. 
When you migrate to a newer version of Bonita BPM, your custom page definition should still be valid. 
However, this cannot be guaranteed for all future migrations.

## Page resources management

### Page resources

Custom page resources can be accessed by a `PageResourceProvider`.

The `bonita.css` can be retrieved using `pageResourceProvider.getBonitaThemeCSSURL()
`

Other `css/js` resources can be retrieved using `pageResourceProvider.getResourceURL("")
`

If you are not using Groovy you can directly access a resource by adding a link in `index.html`.

For example: ``

### API acces

If your page is viewed in a custom profile or in an application, you will have access facilities for [the portal API](/rest-api-overview.md).

you will be abble to access the portal API using the following path: "../API/{API name}/{resource name}"

### Theme access

If your page is viewed in an application, you will have access facilities for [the application theme](/applications.md#theme).

You can directly access a resource by adding the following link in `index.html`: ``