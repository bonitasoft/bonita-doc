# Profiles overview

A profile is a set of access rights given to a user. Users have to be given a certain profile in order to access applications, processes, cases or tasks.

The admin can map users to a profile in the **Organization menu**.

## Default profiles

There are 3 default profiles in Bonita Portal, **User**, **Administrator** and **Process manager**, which correspond to functions performed in the Bonita Portal.

Users can also have several profiles and switch between them in the Bonita Portal in the navigation bar.

### User profile

A user given a **User** profile can perform everyday tasks: start cases, perform tasks, create subtasks, add comments to a task. 

A manager can also see the **More details** view for their team member's tasks, by specifying the task id. 
If you are a manager and want to see a task of a member of your team, display another task in the Portal. Then change the task id in the URL to the id of the task you want to see. 
You can see only the **More details** view for the task, unlike in Bonita 6.x where you could also see the task form by using the task id.
The manager needs only the user profile for this, not a special profile.

This is the profile used in the Mobile Portal. A user who does not have the **User** profile cannot access the mobile portal. 

### Administrator profile

A user given an **Administrator** profile has management rights, including importing and exporting processes, monitoring, creating reports, correcting errors, creating and modifying users, creating custom profiles, changing user memberships, creating applications

### Process manager profile

The process manager profile is available with the Performance and Efficiency editions.

A user given the **Process manager** profile has limited management rights for activities related to the process they are assigned by the Administrator.

## Custom profiles

Custom profiles are available with the Performance and Efficiency editions. 
A custom profile is created by the Administrator. 
Each profile can be given a set of customized functions organized in a customized navigation menu.

See [Custom profiles](custom-profiles.md).