# Customize the living application layout

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

::: warning
Since Bonita BPM 7.3, we have made some changes in the default layout. You will have to remove `layout.css` from the page asset to make the following instructions relevant.
:::

 ## Overview

As explained in the [layouts](layouts.md) documentation page, it is possible to customize the existing application layout with the UI Designer.

For example, you could:

* Add a login box
* Change the menu to add a side menu
* Add a footer

Prerequisites to customize the default living application layout:

* Basic knowledge of Java script
* Basic knowledge of AngularJS
* Basic knowledge of Bootstrap
* Basic knowledge of the UI Designer
* An existing living application (to test the modified layout)

The following example shows how to convert the default top menu of an application into a side menu.  
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

So we propose here to convert the _Living application menu_ into a side menu.

In the UI Designer:

1. Click on _Living application menu_ widget to open the widget editor.
2. Replace the template by using the following one:
```html
<div class="container" style="height:100%">
        <div class="row">
                <div id="leftCol">
                        <div class="well">
                                <ul class="nav nav-stacked" id="sidebar">
                                        <li ng-class="{active:ctrl.pageToken===menu.applicationPageId.token}" ng-repeat="menu in ctrl.filterChildren(-1)" dropdown>
                                                <a ng-if="!ctrl.isParentMenu(menu)" ng-href="../{{menu.applicationPageId.token}}/" ng-click="ctrl.reload()" >{{menu.displayName}}</a>            
                                                <a ng-if="ctrl.isParentMenu(menu)" dropdown-toggle>{{menu.displayName}}<span class="caret"></span></a>
                                                <ul ng-if="ctrl.isParentMenu(menu)" class="dropdown-menu">  
                                                        <li ng-repeat="childMenu in ctrl.filterChildren(menu.id)">
                                                                <a ng-href="../{{childMenu.applicationPageId.token}}/" ng-click="ctrl.reload()">{{childMenu.displayName}}</a>
                                                        </li>
                                                </ul>
                                        </li>
                                </ul>
                        </div>
                </div>  
        </div>  
</div>
```
3. Click on **Save**.
4. Return to the UI Designer home page.
5. Click on _Living application layout page_.
6. Drag and drop the existing _living application Menu_ on the left side of the _living application IFrame_.
7. Resize the _living Application Menu_ by setting the width to _2_.
8. Resize the _living Application IFrame_ by setting the width to _10_.
9. Click on **Save**.

## Export the Side menu layout on your file system

Once your changes are made, save the new layout using a new name and then export it.

1. Rename it into _SideMenuLayout_.
2. Click on **Save**.
3. Click on the **Export** button.

## Import the _Side Menu Layout_ into the portal

1. Open Bonita Portal, and again log in with username and password of someone mapped to the Administrator profile.
2. Click on the **Resources** menu.
3. Click on **Add**.
4. Add the new _Side Menu Layout Page_.
5. Click **Next**.
6. Click **Confirm**.

## Configure your living application to use the modified layout

1. Click on the **Applications** menu.
2. Click on the edit action **...** of your living application.
3. In the **Look & Feel** section, click on the **Layout** link
4. Select the _Side Menu layout_
5. Click on the validation button
6. In the **Application details** section, click on the URL link to navigate to your living application.
7. See your new application layout with a side menu.
8. Feel free to add lots of new improvements to create the layout that fits your needs.

## Take advantage of the latest improvement in a customized layout

<a id="improve-navigation"/>

### Navigate between pages without reloading the entire page.

Starting with Bonita 7.6.0, when the user clicks on any menu item, only the content of the iframe with the targeted page is refreshed: it does not reload the entire page anymore.  
To take advantage of this improvement if your customized layout has been created with a Bonita version older than 7.6.0, you will need to follow these steps:

1. Import your _CustomLayout_7.5.x_ (or lower) in the UI Designer 7.6.0 (or later versions)
2. Export the _Default layout_ from Bonita Portal 7.6.0 (or later versions)
3. Import the _Default layout_ in the UI Designer
4. Open your _CustomLayout_7.5.x_ 
5. If any of the custom widgets _livingApplicationMenu_ or _livingApplicationIFrame_ has been modified,  
you will need report those modifications into the new version of those widgets, namely _livingApplicationMenuV3_ and _livingApplicationIFrameV3_.  
Note: A good practice would be to rename those widgets into something like _myCustomizedMenuV3_ and _myCustomizedIFrameV3_)
Here the differences 

6. Replace the custom widget _livingApplicationMenu_ by the new custom widget _livingApplicationMenuV3_ (or your _myCustomizedMenuV3_) 
7. Replace the custom widget _livingApplicationIFrame_ by the new custom widget _livingApplicationIFrameV3_  (or your _myCustomizedIFrameV3_) 
8. Export this updated layout page.
9. On Bonita Portal, edit the layout and import the newly exported layout  
10. Confirm all messages  
11. Validate that your application has a layout that fits your requirements and the new menu behaviour. 

## Troubleshooting

### Living application layout log 3 error 500 on loading

This issue has been fixed in the 7.3.0 version ("[BS-14885] - Living application layout log 3 error 500 on loading").
If you want to import a custom layout created with a UI Designer older than version 7.3.0 into an application working with Bonita 7.3.0 or greater, you have to perform the following steps to prevent the issue to occur:

1. Import the CustomLayout_7.2.x in UI Designer 7.3.3  
2. Export the default layout from Bonita Portal  
3. Import the default layout and confirm that custom widgets will be overwritten  
4. Open the CustomLayout_7.2.x Layout and remove the 3 variables _AuthorizeApplicationAPI_, _AuthorizeApplicationPageAPI_ and _AuthorizeApplicationMenuAPI_ (as shown below) 
Those variables are responsible of the SEVERE error logs on server.  
5. Select the iFrame widget and set the **reziseToContent** option to _yes_  
6. Save then Export the layout (feel free to rename the layout if you want)  
7. On Bonita Portal edit the layout and import the newly exported layout  
8. Confirm all messages  
9. Validate that your application has a layout that fits your requirements. 



 
