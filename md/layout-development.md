# Develop a layout

This pages describe how to create a layout and use it in an application.  

## Definition

A layout is structure of the application and page content. It defines menu positioning, a footer, or any common content that could be displayed on every page of the application.
Each application can have its own layout, or the same layout can be used consistently to all applications.

There is an example of layout in Bonita Portal, "Bonita Layout", that can be found in the Administrator "Resources" section.  
It is made of three containers:
- layout-header  
            Comes with the links to the user modal and the applications modal, and the living application menu widget to display the navigation of your application.                
- layout-content  
            Comes with the living application iframe widget to display pages or forms of your application.  
- layout-footer  
            Empty by default
    
The layout was created using Bonita UI Designer, so you can export it and customize it with Bonita UI designer. 
You can add more widgets in the containers layout-header and layout-footer.
The 'layout.css' file manages the layout behavior, allows to display the content container in full height, 
and header and footer with fixed size.  
But it does not allow to add other widgets than the living application iframe into layout-content.

For example, you could:

* Add elements in the layout-header, on top of the menu, like a login box or brand image
* Add somme content in the layout-footer 

::: warning
 Since 7.3 we made some changes on the default layout. 
 Those changes live in the `layout.css` page asset and allow us to better handle the content layout of the page displayed. 
 Another consequence is that it removes a margin which was automatically added at the top of each pages.
:::

## Usage

A layout is deployed in a Bonita Runtime as a .zip archive containing a page.properties file and a resources folder.

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

In case of layout edition using Bonita UI Designer, the contentType is kept unchanged.
[Export the examples](resource-management.md) to see how to structure your layout.

## Constraints

A layout can only be used as the main container of an application. It cannot be used as a simple application page.

## Layout resources management

### Layout resources 

If you are not using Groovy, you can directly access a resource by adding a link in `index.html`.

For example: `<link href="css/file.css" rel="stylesheet" />`

### API acces

If your page is viewed in an application, you will have access facilities for [the portal API](rest-api-overview.md).

You will be able to access the portal API using the following path: "../API/{API name}/{resource name}"

### Theme access

If your page is viewed in an application, you will have access facilities for [the application theme](applications.md).

The `Theme.css` is directly accessible by adding the following link in `index.html`: `<link href="../theme/theme.css" rel="stylesheet" />`
