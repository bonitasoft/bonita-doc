# Live update

::: info
**Note:** For Performance and Efficiency editions only.
:::

This page explains how to update live process definition information. You need to be logged in with the Administrator profile.

## Parameters

#### How to modify a parameter in Administrator view  

**Note:** In versions 7.0.x, this feature is only available for Bonita Performance edition. Starting from version 7.1.0, this feature is available for Bonita Performance and Efficiency editions. 

1. Go to Process management
2. Select a process and click on the _**More...**_
3. Select Parameters on the left side menu
4. A table of parameters is displayed
5. In the **Value** column, click on the parameter value you want to edit
6. Edit the process variable
7. Click _**✔**_ button to save it

## Connectors

#### How to edit connector implementation in Administrator view  

**Note:** In versions 7.0.x, this feature is only available for Bonita Performance edition. Starting from version 7.1.0, this feature is available for Bonita Performance and Efficiency editions. 

1. Go to Process management
2. Select a process and click on the _**More...**_
3. Select Connectors on the left side menu
4. In the connector definitions table, in the actions column, click on the _**pencil button**_
5. Browse to a .zip file containing the new connector implementation
6. Click on _**Save**_ to import the new implementation.

## Forms

#### How to add/edit a form or a page of a process in Administrator view

**Note:** For Bonita Performance and Efficiency editions. 

1. Go to Process management
2. Select a process and click on the _**More...**_
3. Select Forms on the left side menu
4. Select Form List tab
5. In the table, in the actions column, click on the _**pencil button**_ or the _**plus sign button**_
6. Browse to a .zip file containing the new page/form
7. Click on _**Next**_ to check the permissions associated with the uploaded page/form.
8. Click on _**Confirm**_ to import the new page/form.

#### How to update the form/page mapping of a task, process overview or process instantiation in Administrator view

**Note:** For Bonita Performance and Efficiency editions.

1. Go to Process management
2. Select a process and click on the _**More...**_
3. Select Forms on the left side menu
4. In the table, click on the current mapping name of the task you want to update
5. Enter the name of the already uploaded page/form or a URL that will handle the task submission
6. Click _**✔**_ button to save it

## Scripts

#### How to edit a script of a process in Administrator view

**Note:** For Bonita Performance and Efficiency editions.

1. Go to Process management
2. Select a process and click on the _**More...**_
3. Select Scripts on the left side menu
4. In the displayed tree, find the script you want to update or enter the script name in the înput field
5. Click on the _**pencil Button**_ in front of the script name
6. Edit the script in the displayed editor
7. Click on _**Save**_ to update the script contents.

The Scripts section of the process more details page allows to update a _TYPE\_READ\_ONLY\_SCRIPT_ Expression or a _TYPE\_CONSTANT_ Expression when associated to a Groovy script connector

<a id="cache_busting">

## Cache busting

Cache busting is introduce on 7.6 version at same time of [cache policy](cache-configuration-and-policy.md). 
He allows the end user to benefit from custom page update without need to empty the browser cache.
When you export a page or a layout with ui-designer, we suffix resource file name with a hash. 
If the page is updated, the resource file name will change, and the browser will download it from the server and not from the cache.

If you don't use UI Designer to export your custom page, you need to manually manage a cache busting mechanism. 
Without this cache busting, the end user won't see the latest custom page version, unless he empties his browser cache.
 
