# Develop a theme

This page describes how to create, import, and use personal themes to skin your Bonita application.

## Definition

A theme is an archive of files used to define and share CSS definitions and images for an application.
It enables you to specify the same style for all pages and layout of an application.
Each application can have its own theme, or the same theme can apply consistantly to all applications.

There are some examples of themes in Bonita Portal, in the Administrator "Resources" section.

A theme is imported as a .zip archive containing a `page.properties` file and a `resources` folder.

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

### Using bootswatch for a custom theme

Some of the default themes are based on the [bootswatch examples](https://bootswatch.com/), so you can easily choose another existing theme and package it to define a new theme.

A second way to create a custom theme is starting from a new custom theme in Studio and using a Bootswatch default Sass theme. In order to do this using the version 3.3.7 of Bootswatch:
* In the custom theme file `package.json`, add `bootswatch` in the `devDependencies` section
```json
    "bootswatch": "3.3.7"
```
* In this same file `package.json`, include the bootswatch path towards the default theme in the scripts/build section   
```json
    --include-path ./node_modules/bootswatch/`name-of-default-theme`/
```
* In the file `src/scss/main.scss`, import the variables of the theme before importing bootstrap by adding: 
```scss
    @import "variables";
```
* In the file `src/scss/main.scss`, import bootswatch after importing bootstrap by adding: 
```scss
    @import "bootswatch";
```
* You can optionally remove the custom `src/scss/_bonita_buttons.scss` and `src/scss/_bonita_pager.scss` files, as well as everything except the font paths from `src/scss/_bonita_variables.scss`. If you remove the custom files, also remove the imports of the files in the file `src/scss/main.scss`.

## Constraints

A theme can only be associated with an application to define the style. It cannot itself be used as a simple application page.

::: warning
Migrating from version 7.9.1 to 7.9.X: In these versions, the provided themes were embedding font-awesome. The library was removed in favor of adding the webfonts directly in the pages. 
If you were using a provided theme and any font-awesome icon, either:
* create a custom theme out of the provided theme and add the font-awesome library (as explained in the 7.9 version of this page)
* add the font-awesome webfonts to your page
:::
