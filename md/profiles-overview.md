# Profiles overview

A profile is a set of access rights given to a user. It is made of two distinct parts: 

- A mapping with the organization (which users are mapped to this profile)
- A set of _portal menu entries_ (menus and pages accessible in the portal when an user is logged with this profile)

Profiles can be used in differents ways:

- To give access to [Living Applications](applications.md)
- To customize the portal interface for a set of users, regarding their rights and their needs (_only for custom profiles, available with the Performance and Efficiency editions_)

To map users to a profile or define portal menu entries, use the [profile editor](profileCreation.md) is the studio. In production, an admin can do it in the **Organization menu**.

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
A custom profile is created in the Studio, using the [profile editor](profileCreation.md), or in the portal by an Administrator.  

## Profile editor overview

in Bonita 7.6, we introduced the possibility to manage profiles from the Studio.
It accounts for an additional step to ease the management of [Living Applications](applications.md) in Bonita, since our objective is to offer a unique application deployment artifact, managed from the Studio.  
Then, all resources used by applications (like profiles) will be centralized and shared by the Bonita development suite: Bonita Studio and the UI Designer.