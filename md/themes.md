# Themes

This page explains how to create a theme and add it to the Portal.

A theme is an archive of files used to define and share CSS definitions and images for an application.
It enables you to specify the same style for all pages and layout of an application.
Each application can have its own theme.

There are some examples of themes in the portal.

A theme is [exported, imported, modified, and deleted](resource-management.md) as a resource in Bonita Portal. You specify the [theme for an application](applications.md) in Bonita Portal.

## Theme definition

A theme is imported as a zip archive containing a `page.properties` file and a `resources` folder.

* The `page.properties` file contains the metadata for the theme (the name used in the URL, the display name, and a description). For example: 
```properties
name=custompage_defaulttheme
displayName=Default theme
description=Application theme based on Bootstrap "Simplex" theme (see http://bootswatch.com/simplex/)
contentType=theme
```

* The `resources` folder must contain at least a CSS file named `theme.css`.

Any CSS, images or JavaScript files can be shared using a theme resource.

Export the examples to see how to structure a theme.

The default themes are based on the [bootswatch example](https://bootswatch.com/), so you can easily choose another existing theme and package it to define a new theme. 

It is also possible to customize your own theme using [bootstrap-live-customizer](http://bootstrap-live-customizer.com/) or [bootstrap basic customization tool](http://getbootstrap.com/customize/).

## Constraints

A theme can only be associated with an application to define the style. It cannot itself be used as a simple application page.

<a id="font-awesome"/>

## Migration notes 

Since Bonita 7.9.1 [bonita layout](bonita-layout.md) uses font-awesome icons, you may need to add font-awesome to your 
custom theme if you are migrating from an older version.  
In order to do this:
* Download [font-awesome](https://fontawesome.com/v4.7.0/assets/font-awesome-4.7.0.zip) version 4.7.0
* Copy `font-awesome.min.css` from `font-awesome-4.7.0/css` and put it into your custom theme in `resources/css`
* Similarly, copy all the fonts from `font-awesome-4.7.0/fonts` and put them into your custom theme in `resources/fonts`
* Finally, edit `resources/theme.css` to add the following line `@import url('./css/font-awesome.min.css');`
