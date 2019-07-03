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

## Constraints

A theme can only be associated with an application to define the style. It cannot itself be used as a simple application page.

<a id="font-awesome"/>

## Migration notes 

Since Bonita 7.9.1 [bonita layout](bonita-layout.md) uses font-awesome icons, you may need to add font-awesome to your 
custom theme if you are migrating from an older version.  

### migrating from a version prior to 7.9.0

In order to to add font-awesome to your theme created with a Bonita version prior to 7.9.0,  
you need to:
* Download [font-awesome](https://fontawesome.com/v4.7.0/assets/font-awesome-4.7.0.zip) version 4.7.0
* Copy `font-awesome.min.css` from `font-awesome-4.7.0/css` and put it into your custom theme in `resources/css`
* Similarly, copy all the fonts from `font-awesome-4.7.0/fonts` and put them into your custom theme in `resources/fonts`
* Finally, edit `resources/theme.css` to add the following line 
```css
    @import url('./css/font-awesome.min.css');
```

### migrating from a version 7.9.0

In order to to add font-awesome to your 7.9.0 theme generated using the 'new theme' functionality of the studio,  
you need to:
* Download [font-awesome](https://fontawesome.com/v4.7.0/assets/font-awesome-4.7.0.zip) version 4.7.0
* Copy all the fonts from `font-awesome-4.7.0/fonts` and put them into your custom theme in `dist/fonts`
* In the custom theme file `package.json`, add `font-awesome-sass` in the `devDependencies` section
```json
    "font-awesome-sass": "4.7.0"
```
* In this same file `package.json`, include the font-awesome stylesheets path in the scripts/build section   
```json
    --include-path ./node_modules/font-awesome-sass/assets/stylesheets/
```
* In the file `src/scss/main.scss`, import font-awesome by adding 
```scss
    @import "font-awesome";
```
* In the file `src/scss/_bonita_variables.scss`, set the required font-awesome font path by adding:
```scss
     $fa-font-path: "./fonts/"; 
```      
* Finally, build and deploy your migrated theme to see if the 7.9.1 [bonita layout](bonita-layout.md) works well with 
your custoum theme.   