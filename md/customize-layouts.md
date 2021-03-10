# Customize layouts

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

## Overview

As explained in the [layouts](layouts.md) documentation page, it is possible to customize the existing application layout using the UI Designer.
Keep in mind that any layout is composed by tree containers: layout-header, layout-content, layout-footer. But only layout-header and layout-footer are designed to support additional widgets.

Prerequisites to customize a layout:

- Basic knowledge of Java script
- Basic knowledge of AngularJS
- Basic knowledge of Bootstrap
- Basic knowledge of the UI Designer
- An existing living application (to test the modified layout)

The following example shows how to add a new widget into the layout.  
The example sections show how to:

- Export the layout from Bonita Portal
- Import the layout into the UI Designer
- Modify the layout
- Apply the customized layout onto a living application.

## Export a layout from Bonita Portal

1. Open Bonita Portal, and log in with username and password of someone mapped to the Administrator profile.
2. Click on the **Resources** menu.
3. Select the filter **Layouts**.
4. Select the layout that you want to modify.
5. Click on **Export** and save this layout on your file system.

## Import a layout into the UI Designer

To facilitate the modifications, layouts are built using the UI Designer. Therefore you just have to import it into the UI Designer to make changes.

1. Open the UI Designer.
2. Click on the **Import** button.
3. Select the layout to import.

## Edit the layout using the UI Designer

When you import the layout into the UI Designer, you can see that it generates three artefacts:

1. A _Layout page_, which can be found in the layout tab.
2. The _Living application IFrame_ widget, used to display the application page, found in the custom widgets tab.
3. An _Application menu_ widget to display the application menu, found in the custom widgets tab.

So we propose here to add new widgets to the **Layout page** header and footer. 

In the UI Designer:

1. Click on the **Layout page** to open it in the page editor.
2. See that this page is composed by three main containers **layout-header**, **layout-content**, **layout-footer**.
3. Drag and drop an image widget on top of the menu in the **layout-header**, to display a brand image. 
4. Drag and drop a title widget in the **layout-footer**, to display a "Copyright © 2017, Example Corporation"
5. Click on **Save**.

## Export the customized layout onto your file system

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
4. Select _myCustomLayout_
5. Click on the validation button
6. In the **Application details** section, click on the URL link to navigate to your living application.
7. See your new application layout with a custom layout.
8. Feel free to add lots of new improvements to create the layout that fits your needs.

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
If you don't already have [Git](https://git-scm.com/), you will need to install it, then clone the repository "<https://github.com/bonitasoft/bonita-distrib.git">.
At the root level, run the following command:  "git diff 7.5.0 7.6.0 -- ./community/resources/layout-page/src/main/resources"

Note 2: A good practice would be to rename those merged widgets into something like _myCustomizedMenuV3_ and _myCustomizedIFrameV3_)

6. Replace the custom widget _livingApplicationMenu_ by the new custom widget _livingApplicationMenuV3_ (or your _myCustomizedMenuV3_) 
7. Replace the custom widget _livingApplicationIFrame_ by the new custom widget _livingApplicationIFrameV3_  (or your _myCustomizedIFrameV3_) 
8. Export this updated layout page.
9. In Bonita portal, edit the layout and import the newly exported layout  
10. Confirm all messages  
11. Validate that your application has a layout that fits your requirements and the new menu behaviour. 
