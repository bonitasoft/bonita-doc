# Living application layout

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

::: warning
In 7.6 we made some improvements on the default layout.
We recommand that you re-create your custom layout based on Bonita 7.6.0+ default layout.
**:fa-exclamation-triangle: Warning:** This layout is deprecated starting with Bonita 7.9 because of the introduction of the [Bonita Layout](bonita-layout.md).
:::

This layout contains a line with the name of the application, followed by the names of the pages.

## Customizing this layout

You can customize this layout by following the [customize-application-layouts](customize-application-layouts.md) steps.

## Build a Side menu layout
As of version 7.5.x, the default provided layout does not allow this kind of customization anymore (at least not so easily), but if you start from a 7.4.x Layout you can follow the 7.4 documentation [customize-living-application-layout](/7.4?page=customize-living-application-layout#toc3) to build a side menu layout.

## Take advantage of the latest improvement in a customized layout

<a id="improve-navigation"/>

## Troubleshooting

### Living application layout log 3 error 500 on loading

This issue has been fixed in the 7.3.0 version ("[BS-14885] - Living application layout log 3 error 500 on loading").
If you want to import a custom layout created with a UI Designer older than version 7.3.0 into an application working with Bonita 7.3.0 or greater, you have to perform the following steps to prevent the issue from occurring:

1. Import the CustomLayout_7.2.x in UI Designer 7.3.3  
2. Export the default layout from Bonita Portal  
3. Import the default layout and confirm that custom widgets will be overwritten  
4. Open the CustomLayout_7.2.x Layout and remove the 3 variables _AuthorizeApplicationAPI_, _AuthorizeApplicationPageAPI_ and _AuthorizeApplicationMenuAPI_ (as shown below) 
Those variables are responsible of the SEVERE error logs on server.  
5. Select the iFrame widget and set the **reziseToContent** option to _yes_ (this option has been removed in 7.6.0, as the iframe is now resized using CSS)
6. Save then Export the layout (feel free to rename the layout if you want)  
7. On Bonita Portal edit the layout and import the newly exported layout  
8. Confirm all messages  
9. Validate that your application has a layout that fits your requirements. 

### Ui-bootstrap.js library removed from runtime
In our first design iteration, forms, pages and layouts designed with the UI Designer embedded 
[UI Bootstrap js, version 0.13.4](http://angular-ui.github.io/bootstrap/versioned-docs/0.13.4/) by default and silently, even when not needed. 
This issue has been fixed in version 7.5.0, we removed it so you can embed it as an asset only when you need it, and in the version of your choice.

Before this change, custom widgets could be created based on angular-bootstrap v0.13.0 with no explicit addition of
angular-bootstrap as an asset and without declaring required modules.

This will not affect any artifact that has been created with the UI Designer and is currently deployed in Bonita Platform.

In development though, if your custom widgets use angular-bootstrap, you need to add angular-bootstrap as an asset at widget level, and declare the appropriate required modules.

#### Forms, pages, layouts CSS cleaned
This cleaning has been made in 7.5.0 version, The default CSS file embedded in UI Designer artifacts (except custom widgets) has been cleaned. Indeed, some of this CSS
rules were overall not used and cluttered this file.

This will not affect any artifact that has been created with the UI Designer and is currently deployed in Bonita Platform.

Nevertheless some unwanted style could appear when importing a custom layout based on the default layout of Bonita prior to 7.5.0.
If you do so and observe that the layout menu does not fit the whole width of your page, you can bring back the default 
style by adding the following lines in `layout.css` file.
```css
.component .container {
     width: 100%;
 }
```
