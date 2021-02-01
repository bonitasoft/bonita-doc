# Layouts

This page explains how to handle layouts in Bonita Portal, and how to use it in an application.

A layout is a page used to define the main frame of an application.

It defines menu positioning, a footer, or any common content that could be displayed on every page of the application.
Each application can have it own layout.

There is an example of layout in Bonita Portal.
    
Layouts are [added, exported, edited, and deleted](resource-management.md) as resources in Bonita Portal. 

## Use in applications

It is linked to an application thanks to the application descriptor in Bonita Studio.  
A layout can only be use as the main container of an application. It cannot be used as a simple application page.  

In a Non-Production or Production environment, a layout is imported as a .zip archive containing a page.properties file and a resources folder.  

## Live update
[Live update](live-update.md) allows the Administrator to update one element of the application in a situation of emergency.

### Edit the layout
You can [edit the content of a layout](resource-management.md#modify) by installing a new version.

### Modify the pages in an application
You can [link another layout to an application](applications.md#define-navigation) in the application descriptor.
