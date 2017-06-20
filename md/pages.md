#  Pages

This page explains how to use a page resource (also called a custom page) to the Bonita BPM Portal and make it available to users. Page resources are intended for use in applications. You can also use a page resource to customize the portal, 
for example:

* Add a welcome page, with dashboards showing activity in Bonita BPM and related external applications.
* Provide a process owner with a dashboard showing the activity of open cases of the process.
* Provide a busy user with a filtered view of the task list.
* Provide an administrator with a multi-attribute search facility.
* Integrate a page from an external application.
* Make a report available to users who do not have the Administrator profile.

Pages are [exported. imported, modified, and deleted](resource-management.md) as resources in Bonita BPM Portal. 

## Custom page definition

A page resource has the general [resource definition](resource-management.md). 
If it contains an `Index.groovy` file, this must implement the PageController interface optionally with libraries. 
If you create a custom page with the UI Designer, it has the required structure and content automatically.

A custom page is displayed inside an iframe to prevent conflicts between the portal resources (for example JS and CSS) and those used in the custom page. 
This also reduces the risk of migration issues, for example if a custom page uses the version of JQuery provided with Bonita BPM Portal and it is updated.

### PageController interface
```java
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
```

### Authorization permissions for custom pages

If you are using [REST API authorization](rest-api-authorization.md) and your custom page is an HTML page using the Web REST API, 
you need to specify the permissions that a user needs to have in order to access the resources in the custom page. 
These permissions are defined in the `page.properties` file. If your custom page is written in Groovy and uses the BonitaBPM Engine Java APIs, you do not need to specify permissions.

For each REST resource accessed in the page, specify the authorization needed for each method used.
You can find examples of the default resources in [`resources-permissions-mapping.properties`](BonitaBPM_platform_setup.md).

The following example shows the permissions defined for a custom page that enables a user to view but not update organization information:

```
#The name must start with 'custompage_'
name=custompage_orgViewer
displayName=Organization viewer
description=Organization viewer page. You cannot modify the organization from this page.
resources=[GET|identity/user, GET|identity/personalcontactdata, GET|identity/professionalcontactdata, GET|identity/role, GET|identity/group, GET|identity/membership, GET|customuserinfo/user, GET|customuserinfo/definition, GET|customuserinfo/value] 
```


## Custom page examples

Two custom page examples are available in the Bonita BPM Portal. Both examples show how to:

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

To view an example page, publish the page to a [custom profile](custom-profiles.md) or an [application](applications.md) so that you can view it in the portal. To view the source of an example, [export the custom page](resource-management.md#export).

On the [Customer Portal](https://customer.bonitasoft.com/), there is also an example in the form of a seed project for creating custom pages using AngularJS and a customizable example task list page.

## Reuse Bonita BPM Portal content

You can reuse pages from the Bonita BPM Portal in your custom pages. For example, in a page that gives details of a case history, you could include the live case status diagram to show the current status. For example, for case 1 of process definition 8270554088248243867, include these lines in your custom page definition:
```groovy
def idProcess = "8270554088248243867";
def idCase = "1";
out.write("""<iframe src=../portal.js/#/admin/monitoring/${idProcess}-${idCase}" style="width:100%; height:100%"></iframe>""");
```
This displays the case diagram exactly as it appears in the standard Bonita BPM Portal page. You can modify the view to hide the Portal **Back** button by adding `?diagramOnly` to the URL:
```groovy
out.write("""<iframe src=../portal.js/#/admin/monitoring/${idProcess}-${idCase}?diagramOnly}" style="width:100%; height:100%"></iframe>""");
```

### Debugging a custom page in development

While you are developing a custom page, you can enable custom page debug mode for your portal. In debug mode, you can see changes to your custom page without importing a new zip archive.

To enable custom page debug mode, edit [`console-config.properties`](BonitaBPM_platform_setup.md) and set `custom.page.debug` to `true`.

To work on a page in debug mode:

::: info
On a Tomcat installation, `<java.io.tmpdir>` points to `<TOMCAT_HOME>/temp/`
:::

1. Import your custom page zip archive into the portal. This creates a directory `<java.io.tmpdir>/bonita_portal_*/tenants/tenant_id/pages/custompage_<your custom page>`.
2. Publish the page to a profile, then log out and log in as a user having this profile.
3. You can now update `Index.groovy` and the contents of the `lib` directory directly in `<java.io.tmpdir>/bonita_portal_*/tenants/tenant_id/pages/custompage_<your custom page>`.
4. To view the page after you modify it, refresh the page in the browser.

When you have finished developing the page, recreate the custom page zip archive, and then modify the page to import it. This makes your final version of the page permanently available.

## Constraints

A custom page is displayed in an iframe in the Bonita BPM Portal, so is isolated from changes to the portal. 
When you migrate to a newer version of Bonita BPM, your custom page definition should still be valid. 
However, this cannot be guaranteed for all future migrations.

## Page resources management

### Page resources

Custom page resources can be accessed by a `PageResourceProvider`.

The `bonita.css` can be retrieved using `pageResourceProvider.getBonitaThemeCSSURL()`

Other `css/js` resources can be retrieved using `pageResourceProvider.getResourceURL("<path in the custom page resources folder>")`

If you are not using Groovy you can directly access a resource by adding a link in `index.html`.

For example: `<link href="css/file.css" rel="stylesheet" />`

### API access

If your page is viewed in a custom profile or in an application, you will have access facilities for [the portal API](rest-api-overview.md).

you will be able to access the portal API using the following path: `../API/{API name}/{resource name}`

### Theme access

If your page is viewed in an application, you will have access facilities for [the application theme](applications.md).

The `Theme.css` is directly accessible by adding the following link in `index.html`: `<link href="../theme/theme.css" rel="stylesheet" />`
