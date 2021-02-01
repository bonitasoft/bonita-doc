# Page and form development overview

Your process-based application can use pages and forms to show or collect information in a browser. Let's discover how they work here.

## Pages and forms

A page presents information to a user or can also collect information entered by a user. Displayed in a browser, a [page](pages.md) is intended for use in applications. You can also use a page resource to customize the portal.

A form is a page that belongs to a process. In a process, there can be forms for process instantiation and for human tasks, and there can be overview forms.

## Custom pages

A page resource has the general [resource definition](resource-management.md). 
If it contains an `Index.groovy` file, this must implement the PageController interface optionally with libraries. 
If you create a custom page with Bonita UI Designer, its required structure and content are right, by default.

A custom page is displayed inside an iframe to prevent conflicts between Bonita Portal resources (for example JS and CSS) and those used in the custom page. 
This also reduces the risk of migration issues, for example if a custom page uses the version of JQuery provided with Bonita Portal and it is updated.

For all information about developping a custom page, go to the dedicated page

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

### Permissions for custom pages

If you are using [REST API authorization](rest-api-authorization.md) and your custom page is an HTML page using the Web REST API, 
you need to specify the permissions that a user needs to have in order to access the resources in the custom page. 
These permissions are defined in the `page.properties` file. If your custom page is written in Groovy and uses the Bonita Engine Java APIs, you do not need to specify permissions.

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

### Custom page examples

Two custom page examples are available in Bonita Portal. Both examples show how to:

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

To view an example page, map the page to an [application](applications.md) so that you can view it in Bonita Portal. To view the source of an example, [export the custom page](resource-management.md#export).

### Reuse Bonita Portal content

You can reuse pages from Bonita Portal in your custom pages. For example, in a page that gives details of a case history, you could include the case status diagram to show the current status. For example, for case 1 of process definition 8270554088248243867, include these lines in your custom page definition:
```groovy
def idProcess = "8270554088248243867";
def idCase = "1";
out.write("""<iframe src=../portal.js/#/admin/monitoring/${idProcess}-${idCase}" style="width:100%; height:100%"></iframe>""");
```
This displays the case status diagram exactly as it appears in the standard Bonita Portal page. You can modify the view to hide the Portal _Back_ button by adding `?diagramOnly` to the URL:
```groovy
out.write("""<iframe src=../portal.js/#/admin/monitoring/${idProcess}-${idCase}?diagramOnly}" style="width:100%; height:100%"></iframe>""");
```

### Debugging a custom page in development

While you are developing a custom page, you can enable custom page debug mode. In debug mode, you can see changes to your custom page without importing a new .zip archive.

To enable custom page debug mode, edit [`console-config.properties`](BonitaBPM_platform_setup.md) and set `custom.page.debug` to `true`.

To work on a page in debug mode:

::: info
On a Tomcat installation, `<java.io.tmpdir>` points to `<BUNDLE_HOME>/temp/`
:::

1. Import your custom page zip archive into the portal. This creates a directory `<java.io.tmpdir>/bonita_portal_*/tenants/tenant_id/pages/custompage_<your custom page>`.
2. Publish the page to a profile, then log out and log in as a user having this profile.
3. You can now update `Index.groovy` and the contents of the `lib` directory directly in `<java.io.tmpdir>/bonita_portal_*/tenants/tenant_id/pages/custompage_<your custom page>`.
4. To view the page after you modify it, refresh the page in the browser.

When you have finished developing the page, recreate the custom page zip archive, and then modify the page to import it. This makes your final version of the page permanently available.

::: info
In Bonita Studio, the debug mode is enabled by default.  
If you want to disable it, you need to use the setup tool provided in `workspace/tomcat/setup/` to update `console-config.properties` (Update the file database.properties first so it points to the target database. E.g.: h2.database.dir=../../default/h2_database).
:::

### Constraints

A custom page is displayed in an iframe in the Bonita Portal, so is isolated from changes to the portal. 
When you migrate to a newer version of Bonita, your custom page definition should still be valid. 
However, this cannot be guaranteed for all future migrations.

### Page resources management

#### Page resources

Custom page resources can be accessed by a `PageResourceProvider`.

The `bonita.css` can be retrieved using `pageResourceProvider.getBonitaThemeCSSURL()`

Other `css/js` resources can be retrieved using `pageResourceProvider.getResourceURL("<path in the custom page resources folder>")`

If you are not using Groovy you can directly access a resource by adding a link in `index.html`.

For example: `<link href="css/file.css" rel="stylesheet" />`

#### API access

If your page is viewed in a custom profile or in an application, you will have access facilities for [the portal API](rest-api-overview.md).

you will be able to access the portal API using the following path: `../API/{API name}/{resource name}`

#### Theme access

If your page is viewed in an application, you will have access facilities for [the application theme](applications.md).

The `Theme.css` is directly accessible by adding the following link in `index.html`: `<link href="../theme/theme.css" rel="stylesheet" />`

## Form sources

You are recommended to use the [UI Designer](ui-designer-overview.md) to create forms for Bonita 7.x processes. UI Designer forms enable you to take full advantage of the separation between the process definition and the UI definition, by using contracts. 

You can also use external forms referenced by URL. If an external URL is being used, the information submitted to the Engine by the form must fulfill the contract. You can store external forms wherever you want as long as they are accessible by URL. 

For certain cases, you can specify that there is no form. This is required for a process that is instantiated programmatically (by a call activity or by an API call from an application, for example), or for a process or a task that does not have any contract input.  
A human task with no form and no contract represents a manual task completed outside Bonita. The user will indicate in the application or Portal that the manual task is complete. A process or a human task with a contract but no form expects the information needed to fulfill the contract to be provided programmatically.

::: warning
**Attention**: Bonita 7.8 does not support 6.x GWT forms and case overview pages, neither for design nor at runtime.
To migrate your processes still using them, follow those [instructions](migrate-a-form-from-6-x.md)
:::

## Form types

A form is a page that belongs to a process. It could be a process instantiation form, a human task form, or an overview form. There are some extra things to consider when you are creating a form compared with an ordinary page, concerning how data is passed between the process instance and the form.

A [context](contracts-and-contexts.md) is the set of data provided by the process instance or task instance to the form. There is no context for a process instantiation form.

A [contract](contracts-and-contexts.md) is the definition of that data that the form returns to the process instance. There is no contract for an overview form.

During process development, some temporary forms are generated if necessary when you run a process from Bonita Studio, for process instantiation, for human task execution, and for the case overview. These forms are generated if the "UI Designer" option is chosen but no form is specified in the process definition.

The process instantiation and step execution temporary forms are based on the relevant contract and they are a useful tool for testing and debugging your application. 

The case overview contains three main sections:

* List of business data: the content of the business variables used by the case
* List of documents: the content of each document used by the case
* Timeline: information in chronological order about all the actions that have been performed in the selected case
