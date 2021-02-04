# Administrator Process list in Bonita Portal

This page explains what a user with the _Administrator_ profile in Bonita Portal can see and do about processes.

Users with the Administrator profile can: install, enable and edit processes as well as categories, forms, entities mapped to actors, parameters, and connectors.

Here is a view of the Process list page:
![Administrator Process list in Portal](images/UI2021.1/admin-process-list-portal.png)<!--{.img-responsive}-->

## Install a new process

1. Go to _BPM_ > _Processes_
3. Click on the _Install_ button on the top left of the page
4. Click to browse to the .bar file to import
5. Click on _Install_

The .bar file is ready to be resolved and/or enabled.

You can only install a .bar file that was exported from a Bonita Studio of the same minor (7.x) version as your Bonita Portal and Bonita Engine.  
If you have a .bar file that was exported from an earlier version of Bonita Studio (7.x-1), it will not work with Bonita Engine.  
Export the process definition as a .bos file from your old Bonita Studio, import in into the new Studio, then export it as a .bar.  
This is necessary for a .bar that has not been deployed. A process that was developed in an older version of Bonita Studio and is already deployed is migrated automatically when you migrate your platform.  
However, for future maintenance of the process definition, you are recommended to update all your process .bar files to the latest version each time you update your platform.

## Resolve a process

Resolving a process means completing the configuration in Bonita Portal and making sure that all dependencies are met. A process has to be resolved before it can be enabled. 

To resolve a process, you must complete the configuration of the actor mappings, parameters, forms, and connectors defined for the process.

* **Actors**: Every actor in a process must be mapped to at least one user, group, role or membership.
* **Parameters**: Every parameter defined in a process must have a value.
* **Connectors**: Every connector definition in a process must have a corresponding implemenetation (Class name).
* **Forms**: Every form defined in a process must be mapped to a page or a URL.
* Also, every business variable used in the process should have a corresponding model. 

To resolve a process for actors, parameters, connectors, and forms:
1. Go to _BPM_>_Processes_,
2. Click on a process.The _Configuration_ section of the right panel shows whether there are items to be resolved. 
4. Click on _More_ button.
5. A summary of configuration problems is displayed below the process name in a well and warning icons are displayed in the left navigation list.
6. Modify your configuration for each element displayed.

To resolve a process for business variables:
1. Logout
2. Login with the [technical user credentials](tenant_admin_credentials.md)
3. [Pause the BPM services](pause-and-resume-bpm-services.md)
4. [Update the BDM](bdm-management-in-bonita-bpm-portal.md)

## Enable a process
1. Go to _BPM_>_Processes_
2. Click on the _Resolved_ filter
3. Select the process
4. Click on the _More_ button
6. Click on the _Enable_ button
7. The activation state changes to "enabled"
8. The process disappears from the disabled filter and is now displayed in the enabled filter

::: info
**Note:** You can also select the processes you want to enable by checking the box in the _Resolved_ list, then click on the _ENABLE_ button in the bulk actions section, at the top of the list.
:::

## Disable a process
Disabling a process blocks the creation of new cases. This does not impact existing cases, where tasks can still be executed.
1. Go to _BPM_>_Processes_
2. Click on the _Enabled_ filter
4. Select the process 
5. Click on the _Disable_ button
6. The activation state changes to "disabled"
7. The process disappears from enabled filter and is located in the disabled filter

::: info
**Note:** You can also disable a process in the _More details_ view, by clicking on the _Enabled_ toggle button.
:::

## Delete a process
::: info
**Note:** A process must be disabled before it can be deleted.
:::

::: warning
**Warning:** **Beware! Data loss risk!**
Deleting a process will automatically delete all its cases (on-going and archived alike). Thus, the operation may take a long time, and fail if the transaction timeout is not large enough.
This feature should only be used on non-production environments.
**Proceed at your own risk.**
:::

1. Go to _BPM_>_Processes_
2. Select the process to delete by checking the tickbox next to the process
4. Click on the _Delete_ button

You can also delete the process in the _More details_ view of a disabled process by clicking on the _Delete_ button, then click on the _Delete_ button to confirm in the modal window.

## Create a category for a process
1. Go to _BPM_>_Processes_
2. Select a process in the list
3. Click on the _More_ button
4. In _General_, click the _Pencil_ next to _Categories_ label
5. In the opened modal window, type a new category name then press _**Enter**_ key
6. Click on the _Save_ button.

After you created a category and added to the process, you can add other processes to the category.

## Add a category to a process
1. Go to _BPM_>_Processes_
2. Select a process in the list
3. Click on the _More_ button
4. In _General_, click the _Pencil_ next to _Categories_ label
5. In the opened modal window, start typing the category name, and then select among the suggestions by using the arrow keys or mouse.
6. Press the _**Enter**_ key
6. Click on the _Save_ button

All of what fallows belongs to the [Live update feature](live-update.md) and are only available in for the Enterprise, Performance, and Efficiency editions.

## Edit the actor mapping
You need to map more or less organization entities to an actor. To do so:
1. Go to _BPM_>_Processes_.
2. Select a process in the list.
3. Click on the _More_ button.
4. Click on _Actors_ in the left menu.
To add entities:
5. Click the _+_ button in the user, group, role or membership column of the actor line.
6. In the opened modal window, click on the dropdown list to select one or several actors. The list displays the first five elements, then a number is displayed representing the other selected entities.
To remove entities:
6. In the opened modal window, there is a list of the actors already mapped. Click on the _X_ button next to the actor, or click on _Remove all_. A list appears filled with the actors you are about to remove. 
   You can **undo** a removal by clicking on the _X_ button next to the actor or by clicking _Enable all_ 
7. Click on the _Apply_ button.

::: info
**Note:** Only the first 200 actors are displayed in the dropdown.
::: 

## Modify a parameter
1. Go to  _BPM_> _Processes_
2. Select a process
3. Click on the _More_ button
4. Click on _Parameters_ in the left menu
5. In the _Value_ column, click on the value you want to edit. A field appears.
6. Click on the _Tick_ button to validate your change or _X_ to dismiss your change.

## Edit a connector implementation
1. Go to _BPM_>_Processes_
2. Click on the _More_ button
3. Click on _Connectors_ in the left menu
4. In the connector definitions table, in the actions column, click on the _Pencil_ icon
5. Browse to a .zip file containing the new connector implementation
6. Click on _Save_ to import the new implementation.

## Upload a new form
1. Go to _BPM_>_Processes_
2. Click on the _More_ button
3. Click on _Forms_ in the left menu
4. Click on the _Form list_ tab. A list of form is displayed. These forms are only visible to the current process. 
5. Click the _plus_ button at the bottom of the list. A file selector popup is displayed. 
6. Browse to a .zip containing a form.
7. Click on _Next_, then if your form requires some authorization, it will be displayed.
8. Click on _Confirm_.

## Edit an existing form
1. Go to _BPM_>_Processes_
2. Click on the _More_ button
3. Click on _Forms_ in the left menu
4. Click on the _Form list_ tab. A list of forms is displayed. These forms are only visible to the current process.
5. Click the _Pencil_ button of a form line. A file selector popup is displayed.
6. Browse to a .zip containing a form
7. Click _Next_, then if your form requires some authorization, it will be displayed.
8. Click on _Confirm_.

## Fix forms
1. Go to _BPM_>_Processes_
2. Click on the _More_ button
3. Click on _Forms_ in the left menu.
5. The tables are displayed which list available forms. Click on a red link. A field input appears.
6. Starting to type some text, and any matching names of installed forms will be proposed. If there is no match for the name you enter, it will be considered as a URL.
7. Click the _Tick_ button to validate your change or _**X**_ to dismiss your change.

::: info
**Note:** You can also upload a form in order to create a new mapping.
:::

## Edit a script content
1. Go to _BPM_>_Processes_
2. Click on the _More_ button
3. Click on _Scripts_ in the left menu. A script content tree is displayed.
4. You can search for a script by typing text in the dedicated field
5. Click on the _Pencil_ button next to a script name. A popup window is displayed
6. Edit your script content
7. Click on _Save_
