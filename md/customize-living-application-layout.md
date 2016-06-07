# Customize a living application layout

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

::: warning
Since 7.3 we made some changes on the default layout. You will have to remove `layout.css` from the page asset to make the following instructions relevant.
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

So we propose here to convert the **Living application menu** into a side menu.

Into the UI Designer:

1. Click on **Living application menu** widget to open the widget editor.
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
5. Click on **Living application layout page**.
6. Drag and drop the existing **living application Menu** on the left side of the **living application IFrame**.
7. Resize the **living Application Menu** by setting the width to 2\.
8. Resize the **living Application IFrame** by setting the width to 10\.
9. Click on **Save**.

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
