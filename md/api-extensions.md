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

REST API extensions use the same authorization mechanism as the standard Bonita BPM REST APIs. When you import the extension, the information in `page.properties` is used to set the appropriate resource permission mappings in Bonita BPM (see [REST API authorization](rest-api-authorization.md) for information about REST API security configuration).

**Note**: It is also possible to deploy a REST API extension using [REST portal API / "page" resource](api_resources/page_6.4_1.md).

**Warning**: If you are running Bonita BPM in a cluster, after you import a REST API extension, you must restart the application server on all the cluster nodes.

## Usage

A REST API extension must be deployed before any page or form resource using it is deployed.

A page that uses REST API extensions must add the required resources in the page resource `page.properties` file.
For example, if a page uses the demoHeaders, demoXml, and putResource API extensions, the `page.properties` must include this line:
```groovy
resources=[GET|extension/demoHeaders, POST|extension/demoXml,PUT|extension/putResource]
```

Additional resources and related permissions are stored in user's session. A logout/login to the portal is required to get new permissions effective for user.

## REST API extension examples

A REST API extension example resource and API extension viewer page are provided in administrator portal. They are located in administrator portal.

To use the examples, define a mapping for `demoPermission`.

* Edit `$BONITA_HOME/client/tenants/1/conf/custom-permissions-mapping.properties`.
* Add the following line: `profile|User=[demoPermission]`.
* Restart Tomcat bundle


REST API extension examples show how to:

* Customize response with additional header, cookie and response code
* Get resource return a simple echo of query parameters
* Use a SLF4J logger
* Post resources with Json payload and return a simple echo of parameters
* Return an XML content with specific media type and character set
* Call to external SOAP webservice (requires internet connexion)

Another REST API extension example with SQL data source is available on [Bonitasoft Community](http://community.bonitasoft.com/project/data-source-rest-api-extension). This example show how to execute SQL queries on a external database.
