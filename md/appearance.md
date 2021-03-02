# Appearance of page and forms

Bonita allows you to define the appearance of a page or form using themes.

## Apply an application resource theme

Page and form appearance is based on the Bootstrap v3.3.2 CSS framework. To define the appearance of a page or form you can use an application [theme resource](themes.md), apply a Boostrap theme, or manually add a custom CSS class that you implement.
By default, pages designed with the UI Designer are deployed in an [application](applications.md) and use the theme chosen for the application.

## Apply a Boostrap CSS theme

Many Bootstrap CSS themes are available (for example at <https://bootswatch.com/>). 

To apply a Bootstrap theme, download it and add it to your page or form as a [CSS asset](assets.md). To see the result, preview your page. Applying a Bootstrap theme as a CSS asset will override the application theme.

## Customize appearance

The appearance of a page or form widget can be modified with a CSS stylesheet. 

The UI Designer use the Bootstrap CSS, so the markup provided for widgets uses [Bootstrap CSS classes](http://getbootstrap.com/css/#helper-classes). You can add classes by using the _CSS classes_ property field available for each widget in the whiteboard.

Then, to customize the widget appearance, include a [CSS asset](assets.md) in your page or form. In this CSS file you can either overwrite the Bootstrap CSS classes or implement the classes you specify in the _CSS classes_ property field.
