# Live update

Some process definition information can be live updated from Administrator profile.

::: info
**Note:** For Performance and Efficiency editions only.
:::

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

::: warning
**:fa-exclamation-triangle: Warning:** The script dependencies are fixed, i.e. when the process is implemented the developer designed the script to use some variables and/or parameters. The live update capability cannot go against this design and only allows to change the script content. If the new script tries to use more variables, it will lead to execution errors. To change the script dependencies (data available in the script execution context), the process definition must be updated and a newer version of the process deployed.
:::

<a id="cache_busting"/>

## Cache busting

Cache busting has been introduced in Bonita 7.6, along with a new [cache policy](cache-configuration-and-policy.md).
It allows end users to benefit from custom page update without the need to empty the browser cache.
When you export a page or a layout from the UI Designer, we suffix the resource filename with a hash. 
If the page is updated, the resource filename will change, and the browser will download it from the server, and not from the cache.

If you don't use the UI Designer to edit and export your custom page, don't forget to manually trigger the cache busting mechanism. It means that, as a developer, you must make sure to either change the file names of the modified resources (javacsript, CSS, images, etc...) or add a query parameter (e.g. ?version=2) to the URLs used in the HTML to access those resources. This way the web-browser will not use the version it has in cache but the new file instead. 
Without this cache busting, end users won't benefit from the latest custom page changes, unless they empty their browser cache.

