# Layouts

::: warning
 Since 7.3 we made some changes on the default layout. 
 Those changes live in the `layout.css` page asset and allow us to better handle the content layout of the page displayed. 
 Another consequence is that it removes a margin which was automatically added at the top of each pages.
:::

This page explains how to create and add a layout to the Bonita BPM Portal, and how to use it in an application.

A layout is a page used to define the main frame of an application.

It defines menu positioning, a footer, or any common content that could be displayed on every page of the application.
Each application can have it own layout.

There is an example of layout in the portal, it is made of three containers:
- layout-header  
            Comes with the living application menu widget to display the navigation of your application.                
- layout-content  
            Comes with the living application iframe widget to display pages or forms of your application.  
- layout-footer  
            Empty by default
    
The layout was created using the UI designer, so you can export it and edit it with the UI designer. 
You can add more widgets in the containers layout-header and layout-footer.
The 'layout.css' file manages the layout behaviour, allows to display the content container in full height, 
and header and footer with fixed size.  
But it does not allow to add other widget than the living application iframe into layout-content.

For example, you could:

* Add elements in the layout-header, on top of the menu, like a login box or brand image
* Add somme content in the layout-footer 

Layouts are [exported. imported, modified, and deleted](resource-management.md) as resources in Bonita BPM Portal. 

## Layout definition

A layout is imported as a zip archive containing a page.properties file and a resources folder.

* The `page.properties` file contains the metadata for the layout (the name used in the URL, the display name, and a description). For example: 
```
name=custompage_layout
displayName=Application layout page
description=This is a layout page dedicated to new born living applications. It is created and editable using the UI designer. It allows to display an horizontal menu, and an iframe. The menu allows to target some pages and the iframe define the area to display those targeted pages.
resources=[GET|living/application,GET|living/application-page,GET|living/application-menu]
contentType=layout
```
* The resources folder must contain an `Index.groovy` class or an `index.html` file and optionally can contain some additional resources.

If you create a resource with the UI Designer, the exported zip automatically has the correct format (only the contentType will have to be changed to "layout").

In case of layout edition using the UI Designer, the contentType is conserved.
[Export the examples](resource-management.md) to see how to structure your layout.

## Constraints

A layout can only be use as the main container of an application. It cannot be used as a simple application page.

## Layout resources management

### Layout resources 

If you are not using Groovy, you can directly access a resource by adding a link in `index.html`.

For example: `<link href="css/file.css" rel="stylesheet" />`

### API acces

If your page is viewed in a custom profile or in an application, you will have access facilities for [the portal API](rest-api-overview.md).

you will be able to access the portal API using the following path: "../API/{API name}/{resource name}"

### Theme access

If your page is viewed in an application, you will have access facilities for [the application theme](applications.md).

The `Theme.css` is directly accessible by adding the following link in `index.html`: `<link href="../theme/theme.css" rel="stylesheet" />`
