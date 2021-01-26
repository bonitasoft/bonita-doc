# Live update

This page defines what is called "Live update" and details the process information that can be live-updated from the Administrator profile.

::: info
**Note:** For Enterprise, Performance and Efficiency editions only.
:::

## Definition
Live update is the procedure by which the Administrator can modify elements of an application on a Runtime environment (Production or Non-Production environments). It is very useful to fix a Runtime when needed.   

::: warning
This procedure should only be used to recover from an error encountered after the deployment and when there is no time to go through the normal release cycle: from the project sources through all the testing environments and then to the target environment.  
Once such a procedure has been used, the development team should quickly report the change made on the Runtime in the source files, to insure the correct maintenance of the project, and tag a new project version.
:::

## Parameters
In Bonita Portal, with the _Administrator_ profile, or in the Bonita Administrator Application:
1. Go to _BPM_> _Processes_
2. Select a process and click on the _More..._ button
3. Select _Parameters_ on the left side menu
4. A table of parameters is displayed
5. In the _Value_ column, click on the parameter value you want to edit
6. Edit the process variable
7. Click on the _**✔**_ button to save it

## Connectors implementation
1. Go to _BPM_> _Processes_
2. Select a process and click on the _More..._ button
3. Select Connectors on the left side menu
4. In the connector definitions table, in the actions column, click on the _pencil_ button
5. Browse to a .zip file containing the new connector implementation
6. Click on _Save_ to import the new implementation.

## Forms
### Form list
This is the list of forms that can be mapped to a task, the case overview, or the process instantiation.
1. Go to _BPM_> _Processes_
2. Select a process and click on the _More..._
3. Select Forms on the left side menu
4. Select Form List tab
5. In the table, in the actions column, click on the _**pencil button**_ or the _**plus sign button**_
6. Browse to a .zip file containing the new page/form
7. Click on _**Next**_ to check the permissions associated with the uploaded page/form.
8. Click on _**Confirm**_ to import the new page/form.

### Form mapping of a task, case overview, or process instantiation
This is the actual mapping between a form in the list and a process element.
1. Go to _BPM_> _Processes_
2. Select a process and click on the _More..._ button
3. Select Forms on the left side menu
4. In the table, click on the current mapping name of the task you want to update
5. Enter the name of the already uploaded page/form or a URL that will handle the task submission
6. Click _**✔**_ button to save it

## Pages
### Page update
1. Go to _Resources_
2. Select a page and click on _Edit_
3. Select your file
4. Click on _Next_
5. Review the permissions to confirm the update

<a id="cache-busting"/>

### Cache busting
Cache busting is the mechanism used in Bonita to refresh the cache for users when a page created with the UI Designer is updated.

Cache busting has been introduced in Bonita 7.6, along with a new [cache policy](cache-configuration-and-policy.md).  
It allows end users to benefit from custom page update without the need to empty the browser cache.  
When you export a page or a layout from the UI Designer, we suffix the resource filename with a hash.  
If the page is updated, the resource filename will change, and the browser will download it from the server, and not from the cache.

If you do not use the UI Designer to edit and export your custom page, do not forget to manually trigger the cache busting mechanism.  
It means that, as a developer, you must make sure to either change the file names of the modified resources (javaScript, CSS, images, etc...)
 or add a query parameter (e.g. ?version=2) to the URLs used in the HTML to access those resources, so that the web-browser will not use the
 version it has in cache but the new file instead.  
Without this cache busting, end users will not benefit from the latest custom page changes, unless they empty their browser cache.

## Scripts
The _Scripts_ section of the process "More details" page allows to update a _TYPE\_READ\_ONLY\_SCRIPT_ Expression or a _TYPE\_CONSTANT_ Expression when associated to a Groovy script connector.
1. Go to _BPM_> _Processes_
2. Select a process and click on the _More..._ button
3. Select Scripts on the left side menu
4. In the displayed tree, find the script you want to update or enter the script name in the înput field
5. Click on the _pencil_ button in front of the script name
6. Edit the script in the displayed editor
7. Click on _Save_ to update the script content.

::: warning
The script dependencies are fixed, i.e. when the process is implemented, the developer designed the script to use some variables and/or parameters. The Live update capability cannot go against this design and only allows to change the script content. If the new script tries to use more variables, it will lead to execution errors. To change the script dependencies (data available in the script execution context), the process definition must be updated and a newer version of the process deployed.
:::
