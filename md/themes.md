# Themes

This page explains how to handle themes in Bonita Portal, and how to use it in an application.

A theme is an archive of files used to define and share CSS definitions and images for an application.
It enables you to specify the same style for all pages and layout of an application.
Each application can have its own theme, or the same theme can be consistently applied to several applications.

There are some examples of themes in Bonita Portal.  

## Use in applications

Themes are linked to applications in application descriptors, in Bonita Studio.  
A theme can only be associated with an application to define the style. It cannot itself be used as a simple application page.  
- The `page.properties` file contains the metadata for the theme (the name used in the URL, the display name, and a description). For example: 

```properties
name=custompage_defaulttheme
displayName=Default theme
description=Application theme based on Bootstrap "Simplex" theme (see http://bootswatch.com/simplex/)
contentType=theme
```

- The `resources` folder must contain at least a CSS file named `theme.css`.

Any CSS, images or JavaScript files can be shared using a theme resource.

Export the examples to see how to structure a theme.

### Using bootswatch for a custom theme

Some of the default themes are based on the [bootswatch examples](https://bootswatch.com/), so you can easily choose another existing theme and package it to define a new theme.

A second way to create a custom theme is starting from a new custom theme in Studio and using a Bootswatch default Sass theme. In order to do this using the version 3.3.7 of Bootswatch:

- In the custom theme file `package.json`, add `bootswatch` in the `devDependencies` section

```json
    "bootswatch": "3.3.7"
```

- In this same file `package.json`, include the bootswatch path towards the default theme in the scripts/build section   

```json
    --include-path ./node_modules/bootswatch/`name-of-default-theme`/
```

- In the file `src/scss/main.scss`, import the variables of the theme before importing bootstrap by adding: 

```scss
    @import "variables";
```

- In the file `src/scss/main.scss`, import bootswatch after importing bootstrap by adding: 

```scss
    @import "bootswatch";
```

- You can optionally remove the custom `src/scss/_bonita_buttons.scss` and `src/scss/_bonita_pager.scss` files, as well as everything except the font paths from `src/scss/_bonita_variables.scss`. If you remove the custom files, also remove the imports of the files in the file `src/scss/main.scss`.

## Constraints

A theme can only be associated with an application to define the style. It cannot itself be used as a simple application page.

Themes are [added, exported, edited, and deleted](resource-management.md) as resources in Bonita Portal.  
In Non-Production or Production environements, a theme is imported as a .zip archive containing a `page.properties` file and a `resources` folder.

## Live Update

[Live update](live-update.md) allows the Administrator to update one element of the application in a situation of emergency.

### Edit the layout

You can [edit the content of a theme](resource-management.md#modify) by installing a new version.

### Modify the pages in an application

You can [link another theme to an application](applications.md#define-navigation) in the application descriptor.
