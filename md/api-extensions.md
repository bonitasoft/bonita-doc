# REST API Extensions

This page describes how to deploy a REST API extension manually, which is possible with all editions.

A REST API extension allows to extend REST Resources using Bonita, to send information on a form. 

To learn more on how to create REST API Extensions, refer to the [tooling for creating and testing REST API Extensions](rest-api-extensions.md) page (Enterprise, Performance, Efficiency, and Teamwork editions).


## Deploy a REST API Extension

REST API Extensions are [managed](resource-management.md) as resources.   

REST API Extensions use the same authorization mechanism as the standard Bonita REST APIs. When you import the extension, the information in `page.properties` is used to create the appropriate resource permission mappings in Bonita (see [REST API authorization](rest-api-authorization.md) for information about REST API security configuration).

::: info
**Note**: It is also possible to deploy a REST API Extensions using [REST portal API / "page" resource](portal-api.md#page).
:::

::: info
**Note**: The deployment of the REST API Extensions should always be made from Bonita Portal or its APIs, not directly from Engine APIs. Notably, the createPage() method of the Engine PageAPI would allow you to deploy a REST API Extensions, but would not update the security settings, meaning that you would not be able to access it at runtime. 
:::

::: warning
**Warning**: If you are running Bonita in a cluster, after you import a REST API Extensions, you must restart the application server on all the cluster nodes.
:::

::: warning
**Warning**: As the deployment of the REST API Extensions automatically creates the appropriate resource permission mapping, be careful not to [push a configuration](BonitaBPM_platform_setup.md#update_platform_conf) that does not contain the latest permissions updates. This would overwrite the deployed configuration. To avoid doing so, pull the latest configuration, edit the needed elements and push it back to the Bonita runtime in a pretty short amount of time.
:::

<a id="usage"/>

## Use in applications

A REST API Extensions must be deployed before any page or form resource using it is deployed.

A page that uses REST API Extensions must add the required resources in the page resource `page.properties` file.

::: info
**Note**: REST API permissions are stored in the user's session and new permissions will only be effective for a user the next time they log into Bonita Portal.
:::

## Live update
[Live update](live-update.md) allows the Administrator to update one element of the application in a situation of emergency.

### Edit the REST API extension
You can [edit the content of a REST API extension](resource-management.md#modify) by installing a new version.

