# Resources management

A resource is an artifact that extends Bonita platform. It is possible to add resources to Bonita Portal and make them available to users. 

A resource is typed and can be one of the following:

## Resource definition

A resource is a zip archive, and must contains a `page.properties` file, a resources directory and an index file.

- The `page.properties` file contains the metadata for the page.

For example: 

```properties
#The name must start with 'custompage_'
name=custompage_layout
displayName=Application layout page
description=This is a layout page dedicated to new born living applications. It is created and editable using the UI designer. It allows to display an horizontal menu, and an iframe. The menu allows to target some pages and the iframe define the area to display those targeted pages.
resources=[GET|living/application,GET|living/application-page,GET|living/application-menu]
contentType=layout
```

- The `resources` directory contains all the public files of your resource (for example `index.md`, images, Javascript files, CSS files). 

- The zip archive must contain at least one of the following index files:
  - An `index.html` file in the `resources` directory
  - An `Index.groovy` class at the root of the archive with, optionally, libraries

If a resource contains both `Index.groovy` and `index.html`, the Groovy class takes precedence.

## Authorization permissions for resources

If you are using [REST API authorization](rest-api-authorization.md) and your resource needs the Web REST API, 
you need to specify the permissions that a user needs to have in order to access those API. 
These permissions are defined in the `page.properties` file. If your resources is a page written in Groovy and uses the Bonita Engine Java APIs, you do not need to specify permissions.
For each REST resource accessed in other resources, specify the authorization needed for each method used. 
You can find examples of the default resources in [`resources-permissions-mapping.properties`](BonitaBPM_platform_setup.md).

The following example shows the permissions defined for a page that enables a user to view but not update organization information:

```properties
#The name must start with 'custompage_'
name=custompage_orgViewer
displayName=Organization viewer
description=Organization viewer page. You cannot modify the organization from this page.
resources=[GET|identity/user, GET|identity/personalcontactdata, GET|identity/professionalcontactdata, GET|identity/role, 
   GET|identity/group, GET|identity/membership, GET|customuserinfo/user, GET|customuserinfo/definition, GET|customuserinfo/value] 
contentType=page  
```

<a id="export"/>

## Export a resource

You can export a resource from the portal. The page is exported as a zip archive.

To export a resource:

1. As an Administrator, go to **Resources**. You will see the list of all resources, and a filter for each type of resource (Page, Forms, Layout, Theme and API extension).
2. Select the page that you want to export.
3. Click **_Export_**.
4. In the popup, specify the name and location for the exported zip archive, and click **OK**.

The zip archive is exported to the location you specified.

## Import a resource

To add a resource to the portal, import a zip archive that contains the resource definition.

1. As an Administrator, go to **Resources**. You will see the list of all resources, and a filter for each type of resource (Page, Forms, Layout, Theme and API extension).
2. Click **_Add_**.
3. In the Content field, specify the zip archive to be imported. Click in the field, then specify the location and filename in the popup.
4. Click **_Add_**. The resource is added to the portal

If you have specified a resource permission that is not defined in the [REST API authorization configuration](rest-api-authorization.md) and REST API authorization is configured to be on, you will see an error message.

After a resource is added to the portal, it can be used in an [application](applications.md) or in a custom profile.

::: warning
**Warning**: As the deployment of resources automatically creates the appropriate resource permissions mapping, be careful not to [push a configuration](BonitaBPM_platform_setup.md#update_platform_conf) that does not contain the latest permissions updates. This would overwrite the deployed configuration. To avoid doing so, pull the latest configuration, edit the needed elements and push it back to the Bonita runtime in a pretty short amount of time.
:::

<a id="modify"/>

## Modify a resource

To modify a resource in the portal, you upload a zip archive containing the new version.

1. As an Administrator, go to **Resources**. You will see the list of all resources, and a filter for each type of resource (Page, Forms, Layout, Theme and API extension).
2. Select the page that you want to modify.
3. Click **_Edit_**.
4. To upload a new resource definition, click in the Content field and specify the new zip archive to import.
5. Click **OK** to save the changes.

The resource is updated.

## Delete a Resource

To delete a resource:

1. As an Administrator, go to **Resources**. You will see the list of all resources, and a filter for each type of resource (Page, Forms, Layout, Theme and API extension).
2. Select the pages that you want to delete.
3. Click **_Delete_**.

The selected resource is deleted.

Note: Either all the selected resources are deleted, or no resources are deleted. If you have selected a page, a layout or a theme that are used in an application or in a custom profile, you will see an error message listing these resources and the applications where they are used. In the case, none of the pages you selected is deleted.
