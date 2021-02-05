# Themes

This page explains how to handle themes in Bonita Portal, and how to use it in an application.

A theme is an archive of files used to define and share CSS definitions and images for an application.
It enables you to specify the same style for all pages and layout of an application.
Each application can have its own theme, or the same theme can be consistently applied to several applications.

There are some examples of themes in Bonita Portal.  

## Use in applications

Themes are linked to applications in application descriptors, in Bonita Studio.  
A theme can only be associated with an application to define the style. It cannot itself be used as a simple application page.  

Themes are [added, exported, edited, and deleted](resource-management.md) as resources in Bonita Portal.  
In Non-Production or Production environements, a theme is imported as a .zip archive containing a `page.properties` file and a `resources` folder.

## Live Update

[Live update](live-update.md) allows the Administrator to update one element of the application in a situation of emergency.

### Edit the layout
You can [edit the content of a theme](resource-management.md#modify) by installing a new version.

### Modify the pages in an application
You can [link another theme to an application](applications.md#define-navigation) in the application descriptor.
