# REST API extensions

A REST API extension is a way to add extra REST resources using Bonita BPM. REST API extensions are [exported, imported, updated, and deleted](resource-management.md) as resources in Bonita BPM Portal.

If you want to learn how to create REST API extension, refer to the documentation page about Bonita BPM Studio [tooling for creating and testing REST API extensions](rest-api-extensions.md) (for Bonita BPM subscription edition).

Page below contains information about deploying a REST API manually, which is possible with all editions.

## Deploy a REST API extension

You need to deploy the REST API zip archive using Bonita BPM Portal:

1. Connect to the Bonita BPM Portal and switch to "administrator" view.
1. Go to Resources. You will see the list of all resources, and a filter for each type of resource (Pages, Forms, Layouts, Themes and API extensions).
1. Click Add button (top left).
1. Click in the Archive field, then select the REST API extension zip file.
1. Click Next.
1. Click Confirm. The resource is added to the portal

REST API extensions use the same authorization mechanism as the standard Bonita BPM REST APIs. When you import the extension, the information in `page.properties` is used to create the appropriate resource permission mappings in Bonita BPM (see [REST API authorization](rest-api-authorization.md) for information about REST API security configuration).

::: info
**Note**: It is also possible to deploy a REST API extension using [REST portal API / "page" resource](portal-api.md#page).
:::

::: info
**Note**: The deployment of the REST API extensions should always be made from the portal or its APIs, not directly from Engine APIs. Notably, the createPage() method of the Engine PageAPI would alllow you to deploy a REST API extension, but would not update the security settings, meaning that you would not be able to access it at runtime. 
:::

::: warning
**Warning**: If you are running Bonita BPM in a cluster, after you import a REST API extension, you must restart the application server on all the cluster nodes.
:::

::: warning
**Warning**: As the deployment of the REST API extensions automatically creates the appropriate resource permission mapping, be careful not to [push a configuration](BonitaBPM_platform_setup.md#update_platform_conf) that does not contain the latest permission updates. This would overwrite the deployed configuration. To avoid doing so, pull the latest configuration, edit the needed elements and push it back to the Bonita runtime in a pretty short amount of time.
:::

<a id="usage"/>

## Usage

A REST API extension must be deployed before any page or form resource using it is deployed.

A page that uses REST API extensions must add the required resources in the page resource `page.properties` file.
For example, if a page uses the demoHeaders, demoXml, and putResource API extensions, its `page.properties` must include this line:
```
resources=[GET|extension/demoHeaders,POST|extension/demoXml,PUT|extension/putResource]
```
If the page declares its resources correctly, then every user being able to access this page (because it is part of a custom profile or Living Application they have access to)
will also be automatically granted the necessary permissions to call the REST API extension. This works the same way as with the other resources of the REST API.  
However, if you need to grant access to this API extension to some users regardless of the pages they have access to, then you need to add [custom permissions](rest-api-authorization.md#custom-permissions-mapping) for these users.  
In order to do so, edit `custom-permissions-mapping.properties` to give the permissions (value of the property `apiExtension.permissions`) declared in the page.properties of the REST API extension to the required profiles or users.

::: info
**Note**: REST API permissions are stored in the user's session and new permissions will only be effective for a user the next time he logs in to the portal.
:::

## REST API extension examples

A REST API extension example resource and API extension viewer page are provided in administrator portal. They are located in administrator portal.

To use the examples, define a [custom permissions](rest-api-authorization.md#custom-permissions-mapping) mapping for `demoPermission`:

* Retrieve platform configuration using the [setup tool](BonitaBPM_platform_setup.md#update_platform_conf).
* Edit `platform_conf/current/tenants/<TENANT_ID>/tenant_portal/custom-permissions-mapping.properties`.
* Add the following line: `profile|User=[demoPermission]`.
* Push the changed platform configuration into database using the _setup tool_.
* Restart Tomcat bundle


REST API extension examples show how to:

* Customize response with additional header, cookie and response code
* Get resource return a simple echo of query parameters
* Use a SLF4J logger
* Post resources with Json payload and return a simple echo of parameters
* Return an XML content with specific media type and character set
* Call to external SOAP webservice (requires internet connexion)

Another REST API extension example with SQL data source is available on [Bonitasoft Community](http://community.bonitasoft.com/project/data-source-rest-api-extension). This example show how to execute SQL queries on a external database.
