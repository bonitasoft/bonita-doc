# Customize the living application layout

UI Designer allows the customization of the page layouts (header, body and footer).

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

::: warning
In 7.6 we made some improvements on the default layout.
We recommand that you re-create your custom layout based on Bonita 7.6.0+ default layout.
:::

 ## Overview

As explained in the [layouts](layouts.md) documentation page, it is possible to customize the existing application layout with the UI Designer.
Keep in mind that this default layout is composed by tree containers: layout-header, layout-content, layout-footer. But only layout-header and layout-footer are designed to support additional widgets.

Prerequisites to customize the default living application layout:

* Basic knowledge of Java script
* Basic knowledge of AngularJS
* Basic knowledge of Bootstrap
* Basic knowledge of the UI Designer
* An existing living application (to test the modified layout)

The following example shows how to add new widget into the default layout.    
The example sections show how to:
* Export the default application layout from Bonita Portal
* Import the default application layout into the UI Designer
* Modify this layout
* Apply the customized layout onto a living application.

 ## Export the default application layout from Bonita Portal

1. Open Bonita Portal, and log in with username and password of someone mapped to the Administrator profile.
2. Click on the **Resources** menu.
3. Select the filter **Layouts**.
4. Select the element _Default layout_.
5. Click on **Export** and save this _Default layout_ on your file system.

## Import the default application layout into the UI Designer

To facilitate the modifications, the _Default layout_ is built using the UI Designer. Therefore you just have to import it into the UI Designer to make changes.

1. Open the UI Designer.
2. Click on the **Import** button.
3. Retrieve the _Default layout_ to import.

## Edit the default layout using the UI Designer

When you import the _Default layout_ into the UI Designer, you can see that it generates three artefacts:

1. _Living application layout page_.
2. _Living application IFrame_ widget to display the application page.
3. _Living application menu_ widget to display the application menu.

So we propose here to add new widgets to the **Living application layout page** header and footer. 

In the UI Designer:

1. Click on **Living application layout page** to open it in the page editor.
2. See that this page is composed by three main containers **layout-header**, **layout-content**, **layout-footer**.
3. Drag and drop an image widget on top of the menu in the **layout-header**, to display a brand image. 
4. Drag and drop a title widget in the **layout-footer**, to display a "Copyright © 2017, Example Corporation"
5. Click on **Save**.

## Export the customized layout on your file system

Once your changes are made, save the new layout using a new name and then export it.

1. Rename it into _myCustomLayout_.
2. Click on **Save**.
3. Click on the **Export** button.

## Import the _myCustomLayout_ into the portal

1. Open Bonita Portal, and again log in with username and password of someone mapped to the Administrator profile.
2. Click on the **Resources** menu.
3. Click on **Add**.
4. Add the new _myCustomLayout_.
5. Click **Next**.
6. Click **Confirm**.

## Configure your living application to use the modified layout

1. Click on the **Applications** menu.
2. Click on the edit action **...** of your living application.
3. In the **Look & Feel** section, click on the **Layout** link
4. Select the _myCustomLayout_
5. Click on the validation button
6. In the **Application details** section, click on the URL link to navigate to your living application.
7. See your new application layout with a custom layout.
8. Feel free to add lots of new improvements to create the layout that fits your needs.

## Build a Side menu layout
As of version 7.5.x, the default provided layout does not allow this kind of customization anymore (at least not so easily), but if you start from a 7.4.x Layout you can follow the 7.4 documentation [customize-living-application-layout](/7.4?page=customize-living-application-layout#toc3) to build a side menu layout.

## Take advantage of the latest improvement in a customized layout

<a id="improve-navigation"/>

### Navigate between pages without reloading the entire page.

Starting with Bonita 7.6.0, when the user clicks on any menu item, only the content of the iframe with the targeted page is refreshed: it does not reload the entire page anymore. The HTML5 History API is used to achieve that.  
To take advantage of this improvement if your customized layout has been created with a Bonita version older than 7.6.0, you will need to follow these steps:

1. Import your _CustomLayout_7.5.x_ (or lower) in the UI Designer 7.6.0 (or later versions)
2. Export the _Default layout_ from Bonita Portal 7.6.0 (or later versions)
3. Import the _Default layout_ in the UI Designer
4. Open your _CustomLayout_7.5.x_ 
5. If any of the custom widgets _livingApplicationMenu_ or _livingApplicationIFrame_ has been modified,  
you will need to merge your modifications and the modifications of the new version of those widgets, namely _livingApplicationMenuV3_ and _livingApplicationIFrameV3_.  

Note 1: To help this merge, you can generate a diff, between two version of the default layout by using Git.
If you don't already have [Git](https://git-scm.com/), you will need to install it, then clone the repository "https://github.com/bonitasoft/bonita-distrib.git".
At the root level, run the following command:  "git diff 7.5.0 7.6.0 -- ./community/resources/layout-page/src/main/resources"

Note 2: A good practice would be to rename those merged widgets into something like _myCustomizedMenuV3_ and _myCustomizedIFrameV3_)

6. Replace the custom widget _livingApplicationMenu_ by the new custom widget _livingApplicationMenuV3_ (or your _myCustomizedMenuV3_) 
7. Replace the custom widget _livingApplicationIFrame_ by the new custom widget _livingApplicationIFrameV3_  (or your _myCustomizedIFrameV3_) 
8. Export this updated layout page.
9. In Bonita portal, edit the layout and import the newly exported layout  
10. Confirm all messages  
11. Validate that your application has a layout that fits your requirements and the new menu behaviour. 

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
