# 3.3 Processes

Logged on with the Administrator profile, you have rights to manage a process as follows:

* [How to install a process](#installanapp)
* [How to resolve a process](#resolveanapp)
* [How to enable a process](#enableanapp)
* [How to disable a process](#disableanapp)
* [How to delete a process](#deleteanapp)
* [How to create a category for a process](#createcat)
* [How to add a category to a process](#addcat)
* [How to make a process available to a user via entity mapping](#entitymap)
* [How to modify a parameter](#modpar)
* [How to edit connector definitions](#conndef)
* [How to fix forms](#formMapping)
* [How to upload new form](#formUpload)
* [How to edit an existing form](#editFormUpload)
* [How to edit a script content](#editScriptContent)




## How to install a new process

1. Go to the BPM tab
2. Click _**Processes**_
3. Click _**Install new process**_
4. Click to browse to the .bar file to import
5. Click _**Install**_

The .bar file is ready to be resolved and enabled

**Note:** if you try to install the same process twice, a message is displayed: "Process \[yourProcessName\] in version \[yourProcessVersion\] already exists."

You can only install a .bar file that was exported from a Bonita BPM Studio of the same minor (7.x) version as your Bonita BPM Portal and Bonita BPM Engine. If you have a .bar file that was exported from an earlier version of Bonita BPM Studio (7.x.md), it will not work with Bonita BPM Engine. Export the process definition as a .bos file from your old Bonita BPM Studio, import in into the new Studio, then export it as a .bar. This is necessary for a .bar that has not been deployed. A process that was developed in an older version of Bonita BPM Studio and is already deployed is migrated automatically when you migrate your platform. However, for future maintenance of the process definition, you are recommended to update all your process bar files to the latest version each time you update your platform.


[Watch the Install a process video](images/videos-6_0/install_an_app_in_bonita_portal.mp4)





## How to resolve a process

Resolving a process means completing the configuration in the Portal and making sure that all dependencies are met. A process has to be resolved before it can be enabled. 

To resolve a process, you must complete the configuration of the actor mappings, parameters, forms, and connectors defined for the process. You can also configure other information such as Categories and Scripts, but this is not mandatory for resolving a process.

* **Actor mapping**; Every actor in a process must be mapped to at least one user, group, role or membership.
* **Parameters**: Every parameter defined in a process must have a value.
* **Connector definitions**: Every connector definition in a process must have a corresponding Class name.
* **Business Data Model**: Every business data object defined in a process must have a corresponding model.
* **Forms**: Every form defined in a process must be mapped to a page or a URL.

To resolve a process:

1. Go to BPM tab.
2. Click _**Processes**_,
3. Click on a _**Process**_. The Configuration section of the right panel shows whether there are items to be resolved. 
4. Click on _**More**_.
5. A summary of configuration problems is displayed below the process name in a well and warning icons are displayed in the left navigation list.
6. Modify your configuration for each element displayed.



## How to enable a process

1. Go to the BPM menu tab
2. Click _**Processes**_
3. Click _**Resolved filter**_
4. Select the process
5. Click _**More** button_
6. Click _**Enable**_
7. The activation state changes to "enabled"
8. The process disappears from the disabled filter and is now displayed in the enabled filter

**Note:** You can also select the processes you want to enable by checking the box in the Resolved list, then click _**ENABLE**_ button in the bulk actions section




## How to disable a process

1. Go to the BPM tab
2. Click _**Processes**_
3. Click _**Enabled filter**_
4. Select the process 
5. Click _**Disable**_
6. The activation state changes to "disabled"
7. The process disappears from enabled filter and is located in the disabled filter

**Note:** You can also disable a process in the more details view, by clicking _**Enabled**_ toggle button.




## How to delete a process

**Note:**A process must be disabled before it can be deleted.

1. Go to BPM menu tab
2. Click _**Processes**_
3. Select the process to delete by checking the tickbox next to the process
4. Click _**Delete**_

You can also delete the process in the more details view of a disabled process by clicking _**DELETE**_, then click _**DELETE**_ in the modal window



## How to create a category for a process

1. Go to BPM tab
2. Select a process in the list
3. Click _**More**_
4. In General, click the pencil next to Categories label
5. In the opened modal, type a new category name then press _**Enter**_ key
6. Click _**Save**_

After you created a category and added to the process, you can add other processes to the category.





## How to add a category to a process

1. Go to BPM tab
2. Select a process in the list
3. Click _**More**_
4. In General, click the pencil next to Categories label
5. In the opened modal, type a new category name then press _**Enter**_ key, or use arrow keys to browse among exisiting categories
6. Click _**Save**_





## How to add an entity to an actor

1. Go to the BPM tab.
2. Click _**Processes**_.
3. Select a process in the list.
4. Click _**More**_.
5. Click _**Actors**_ in the left navigation.
6. In the Actors section, click the _**+**_ button in the user, group, role or membership column of the actor line.
7. In the opened popup, click on the dropdown list to select one or several actors. The list displays the first five elements, then a number is displayed representing the other selected entities.
8. Click _**APPLY**_.

**Note:** Notice that only the first 200 actors are displayed in the dropdown.


## How to remove an entity from an actor

1. Go to the BPM tab.
2. Click _**Processes**_.
3. Select a process in the list.
4. Click _**More**_.
5. Click _**Actors**_ in the left navigation.
6. In the Actors section, click the _**pencil**_ button in the user, group, role or membership column of the actor line.
7. In the opened popup, there is a list of the actors already mapped.
8. Click the _**X**_ button next to the actor, or click _**Remove all**_.
9. A list appears filled with the actors you can to remove. You can undo a removal by clicking _**X**_ button next to the actor or by clicking _**Enable all**_ 
10. Click _**APPLY**_.

## How to modify a parameter in the Administrator profile

**Note:** For Bonita BPM Performance and Efficiency editions only.



1. Go to the BPM tab
2. Click _**Processes**_
3. Select a process
4. Click _**MORE**_
5. Click _**Parameters**_ in the left navigation
6. In the **Value** column, click on the value you want to edit
7. A field appears
8. Click the _**Tick**_ button to validate your change or _**X**_ to dismiss your change.



## How to edit a connector implementation

**Note:** For Bonita BPM Performance and Efficiency editions only.

1. Go to the BPM tab
2. Click _**Processes**_
3. Click _**More**_ button
4. Click _**Connectors**_
5. In the connector definitions table, in the actions column, click on the _**Pencil**_
6. Browse to a .zip file containing the new connector implementation
7. Click _**Save**_ to import the new implementation.

## How to fix forms

**Note:** For Bonita BPM Performance and Efficiency editions only.

1. Go to the BPM tab.
2. Click _**Processes**_.
3. Click _**More**_ button.
4. Click _**Forms**_ in the left navigation.
5. The tables are displayed which list available forms. Click on a red link.
6. A field input appears.
7. Starting to type some text, and any matching names of installed forms will be proposed. If there is no match for the name you enter, it will be considered as a URL.
8. Click the _**Tick**_ button to validate your change or _**X**_ to dismiss your change.

**Note:** You can also upload a form in order to create a new mapping.


## How to upload a new form

**Note:** For Bonita BPM Performance and Efficiency editions only.

1. Go to the BPM tab.
2. Click _**Processes**_.
3. Click _**More**_ button.
4. Click _**Forms**_ in the left navigation.
5. Click _**Form list**_ tab.
6. A list of form is displayed. These forms are only visible to the current process.
7. Click the _**plus**_ button at the bottom of the list.
8. A file selector popup is displayed.
9. Browse to a .zip containing a form.
10. Click _**NEXT**_, then if your form requires some authorization, it will be displayed.
11. Click _**CONFIRM**_.

## How to edit an existing form

**Note:** For Bonita BPM Performance and Efficiency editions only.

1. Go to the BPM tab.
2. Click _**Processes**_.
3. Click _**More**_ button.
4. Click _**Forms**_ in the left navigation.
5. Click _**Form list**_ tab.
6. A list of forms is displayed. These forms are only visible to the current process.
7. Click the _**pencil**_ button of a form line.
8. A file selector popup is displayed.
9. Browse to a .zip containing a form
10. Click _**NEXT**_, then if your form requires some authorization, it will be displayed.
11. Click _**CONFIRM**_.

## How to edit a script content

**Note:** For Bonita BPM Performance and Efficiency editions only.

1. Go to the BPM tab
2. Click _**Processes**_
3. Click _**More**_ button
4. Click _**Scripts**_ in the left navigation
5. A script content tree is displayed.
6. You can search for a script by typing text in the dedicated field
7. Click the _**pencil**_ button next to a script name
8. A popup window is displayed
9. Edit your script content
10. Click _**SAVE**_