# Customize living application layout

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

::: warning
Since 7.5 we made some improvements on the default layout.
We recommand that you re-create your custom layout based on Bonita 7.5.0+ default layout.
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
* Export the default application layout from the Bonita BPM Portal
* Import the default application layout into the UI Designer
* Modify this layout
* Apply the customized layout onto a living application.

 ## Export the default application layout from Bonita BPM Portal

1. Open Bonita BPM Portal, and log in with username and password of someone mapped to the Administrator profile.
2. Click on the **Resources** menu.
3. Select the filter **Layouts**.
4. Select the element **Default layout**.
5. Click on **Export** and save this **Default layout** on your file system.

## Import the default application layout into the UI Designer

To facilitate the modifications, the **default layout** is built using the UI Designer. Then you just have to import it into the UI Designer to make changes.

1. Open the UI Designer.
2. Click on the **Import** button.
3. Retrieve the **Default layout** to import.

## Edit the default layout using the UI Designer

When you import the **Default layout** into the UI Designer, you can see that it generates three artefacts:

1. **Living application layout page**.
2. **Living application IFrame** widget to display the application page.
3. **Living application menu** widget to display the application menu.

So we propose here to add new widgets to the **Living application layout page** header and footer.

Into the UI Designer:

1. Click on **Living application layout page** to open it in the page editor.
2. See that this page is composed by three main containers **layout-header**, **layout-content**, **layout-footer**.
3. Drag and drop an image widget on top of the menu in the **layout-header**, to display a brand image. 
4. Drag and drop a title widget in the **layout-footer**, to display a "Copyright © 2017, Example Corporation"
5. Click on **Save**.

## Export the Side menu layout on your file system

Once your changes are made, save the new layout using a new name and then export it.

1. Rename it into **SideMenuLayout**.
2. Click on **Save**.
3. Click on the **Export** button.

## Import the **Side Menu Layout** into the portal

1. Open the Bonita BPM Portal, and again log in with username and password of someone mapped to the Administrator profile.
2. Click on the **Resources** menu.
3. Click on **Add**.
4. Add the new **Side Menu Layout Page**.
5. Click **Next**.
6. Click **Confirm**.

## Configure your living application to use the modified layout

1. Click on the **Applications** menu.
2. Click on the edit action **...** of your living application.
3. In the **Look & Feel** section, click on the layout link
4. Select the **Side Menu layout**
5. Click on the validation button
6. In the application details section, click on the URL link to navigate to your living application.
7. See your new application layout with a side menu.
8. Feel free to add lots of new improvements to create the layout that fits your needs.

## Build a Side menu layout
As of version 7.5.x, the default provided layout does not allow this kind of customization anymore (at least not so easily), but if you start from a 7.4.x Layout you can follow the 7.4 documentation [customize-living-application-layout](/7.4?page=customize-living-application-layout#toc3) to build a side menu layout.

## Troubleshooting

### Living application layout log 3 error 500 on loading

This issue has been fixed in the 7.3.0 version ("[BS-14885] - Living application layout log 3 error 500 on loading").
If you want to import a custom layout created with an oldest UIDesigner version (7.2.x or lower) in a 7.3.0 (or greater) version, you have to perform the following
steps to prevent the issue to occur.

1. Import the CustomLayout_7.2.x in UIDesigner 7.3.3  
2. Export the default layout from Bonita Portal  
3. Import the default layout and confirm the overwrite of custom widgets  
4. Open the CustomLayout_7.2.x Layout and remove the 3 variables AuthorizeApplicationAPI, AuthorizeApplicationPageAPI and AuthorizeApplicationMenuAPI (as shown below) 
Those variables are responsible of the SEVERE error logs on server.  
5. Select the iFrame widget and set the reziseToContent option to yes  
6. Save then Export the layout (feel free to rename the layout if you want)  
7. On Bonita Portal server edit the layout and import the newly exported layout  
8. confirm all the messages  
9. Validate that your application has a layout that fits your requirements. 

### Ui-bootstrap.js library removed from runtime
In our first design iteration, forms, pages and layouts designed with the UI Designer embedded 
[UI Bootstrap js, version 0.13.4](http://angular-ui.github.io/bootstrap/versioned-docs/0.13.4/) by default and silently, even when not needed. 
This issue has been fixed in version 7.5.0, we removed it so you can embed it as an asset only when you need it, and in the version of your choice.

Before this change, custom widgets could be created based on angular-bootstrap v0.13.0 with no explicit addition of
angular-bootstrap as an asset and without declaring required modules.

This will not affect any artifact that has been created with the UI Designer and is currently deployed in Bonita BPM Platform.

In development though, if your custom widgets use angular-bootstrap, you need to add angular-bootstrap as an asset at widget level, and declare the appropriate required modules.

#### Forms, pages, layouts CSS cleaned
This cleaning has been made in 7.5.0 version, The default CSS file embedded in UI Designer artifacts (except custom widgets) has been cleaned. Indeed, some of this CSS
rules were overall not used and cluttered this file.

This will not affect any artifact that has been created with the UI Designer and is currently deployed in Bonita BPM Platform.

Nevertheless some unwanted style could appear when importing a custom layout based on the default layout of Bonita BPM prior to 7.5.0.
If you do so and observe that the layout menu does not fit the whole width of your page, you can bring back the default 
style by adding the following lines in `layout.css` file.
```css
.component .container {
     width: 100%;
 }
```
