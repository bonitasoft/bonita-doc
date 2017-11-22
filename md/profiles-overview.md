# Profiles overview

A profile is an indirection to some entities of the organization: users, groups, roles, and/or memberships.
Profiles can be used to:
- Give access to [Living Applications](applications.md)
- Give access to some content on Bonita Portal.

One organization entity can be mapped to several profiles. In Bonita Portal, a loggued user can switch between his/her profiles in the navigation bar.

To map entities of the organization to a profile, use the [profile editor](profileCreation.md) in the studio.   
In a production environment, an administrator must use the **Organization**>**Profiles** menu.

## Profile editor overview

In Bonita 7.6, we introduced the possibility to manage profiles from the Studio.
It accounts for an additional step to ease the management of [Living Applications](applications.md) in Bonita, since our objective is to offer a unique application deployment artifact, managed from the Studio.  
Then, all resources used by applications (like profiles) will be centralized and shared by the Bonita development suite: Bonita Studio and the UI Designer.

## Default profiles

Bonita comes with 3 default profiles: **User** and **Administrator** are available in all editions ; **Process Manager** is available in Subscription editions only.

### User profile

An employee mapped to the **User** profile can perform everyday tasks: start cases, perform tasks, add comments to a task. 

A manager can also see the **More details** page for their team members' tasks, by specifying the task id. To do so, display any task in the Portal, then change the task id in the URL to the id of the task you want to see. 
You can see only the **More details** view for the task, unlike in Bonita 6.x where you could also see the task form by using the task id.
The manager needs only the user profile for this, not a special profile.

**User** is the profile used in Bonita Mobile Portal. As a consequence, an employee who does not have the **User** profile cannot access the mobile portal. 

### Administrator profile

An employee mapped to the **Administrator** profile has administration rights, including importing and exporting processes, monitoring, creating reports, live updating processes or resources, creating and modifying users, creating custom profiles, changing user memberships, creating applications, and so on.

### Process manager profile

This profile is available for Subscription editions only.
An employee mapped to the **Process manager** profile has limited administration rights for activities related to the processes they manage, as defined by the Administrator.

**Note:** In Bonita ACME organization, all users have the role **Member**, and the role **Member** is mapped to all default profiles. This simplifies process testing (log in as any user to see any Portal content). 


## Custom profiles

In addition to the default profiles, users of Performance and Efficiency editions can create **[custom profiles]**(custom-profiles.md).
If a custom profile is created to give access to custom content in the portal, its _Portal menu_ (navigation structure and pages) must also be defined in the profile.
To create a custom profile, map it to entities of the organization, and create its portal menu, use the [profile editor](profileCreation.md) in the studio. 
In a production environment, an Administrator must use the **Organization**>**Profiles** menu.
