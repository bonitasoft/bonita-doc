# Mobile User Interfaces

This page gives an overview of the use of Bonita on mobile devices.  

Bonita Portal has a mobile version to be used by the User profile only, available in Efficiency, Performance, and Enterprise editions.  
It displays the process list to start a process and a task list.  
But as [Bonita Portal will be replaced](bonita-bpm-portal-interface-overview.md) with Bonita applications in a next version, the Mobile Portal will not be supported anymore. It will be replaced by the Bonita User Application. Indeed, as Bonita applications can be adapted to four different screen sizes, the provided Bonita User Application is responsive.  
So far, the Bonita Administrator application is mostly thought for desktop and laptop screen sizes, as we believe this is the most likely screen sizes to be used to administrate Bonita.  
So just like Bonitasoft, you can [develop your own application](key-concepts.md) and choose the target screen sizes to optimize the content display: desktop, laptop, tablet, or mobile phone.  
The following applies to Bonita Mobile Portal.

## Security login

Use the same user login and password as Bonita Portal (based on the same database)

## Do I need a special license?

You will need an Efficiency license (and above) to run the mobile version

## What deployment bundle do I need to access the mobile version?

Bonita Subscription Pack edition.

## How do I access it?

Add `/mobile` after Bonita in the URL

For example: [http://localhost:8080/bonita/mobile](http://localhost:8080/bonita/mobile)

## Profile

Only the user profile is available.

## Mobile language

* How do I change the language of the mobile interface
* You need to change the language in the Bonita Portal first
[see Languages](languages.md)

## Navigation

The navigation is slightly different from the Portal (first choose a filter to list corresponding tasks, then click on a task in the list to display it).

Note: to display forms properly in the mobile version, only create a form with one column. If more than one column is used in a form design, then you will have to right scroll to display all the form.

## What menus and functions are available?

Display and perform tasks, create subtasks, add comments.

## Start a new case

You can start a case from the mobile version. Click **_Apps_** to see a list of the processes for which you can start a case. Click on an App to start a case.

Here are some examples of the mobile user screens:

![Mobile_interface](images/images-6_0/mobile7.x_0.login.png) ![Mobile_interface](images/images-6_0/mobile7.x_1b.tasksapps.png) ![Mobile_interface](images/images-6_0/mobile7.x_2.available.png) ![Mobile_interface](images/images-6_0/mobile7.x_3.todo.png) ![Mobile_interface](images/images-6_0/mobile7.x_4.tasks.png) ![Mobile_interface](images/images-6_0/mobile7.x_7.step1_comments.png) ![Mobile_interface](images/images-6_0/mobile7.x_8.step1_details.png) ![Mobile_interface](images/images-6_0/mobile7.x_9.step1_subtasks.png) ![Mobile_interface](images/images-6_0/mobile7.x_6.addsubtask2.png)
