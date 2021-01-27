# Profiles management in Bonita Portal

This page explains what a user with the _Administrator_ profile can do with profiles in Bonita Portal.
In all Bonita editions, those users can change the mapping between a provided profile and the organization entities.
In Enterprise, Performance, and Efficiency editions, they can also create new profiles and edit them.

Here is a view of this page:
![Profiles in Portal](images/UI2021.1/profiles-portal.png)<!--{.img-responsive}-->

A profile is an indirection to some entities of the organization: users, groups, roles, and/or memberships.
Profiles work as permissions to give access to:
- [Living Applications](applications.md)
- Defined objects and attributes of the BDM (through [BDM Access Control](access-control-api.md))
- [REST API extension permissions](rest-api-authorization.md)
- Navigation (menus) of Bonita Portal

One organization entity can be mapped to several profiles. In Bonita Portal, a loggued user can switch between his/her profiles in the navigation bar.

In development, the creation and edition of profiles is done through the [profile editor](profileCreation.md) in Bonita Studio.   
In non-production and production, an Administrator can use the _Organization_>_Profiles_ menu of Bonita Portal.

::: info
Changing the mapping of a profile on a non-production or production Runtime may lead to inconsistencies when updating the project or deploying it on another server.  
It should only be done to recover from an error temporarily. We strongly encourage you to report all changes in the sources profiles files of the project.
:::

## View profiles
In _Organization_/_Profiles_, the list shows all profiles sorted by alphabetical order:
- Three provided profiles: "User", "Administrator", and for Enterprise, Performance, Efficiency, and Teamwork editions,"Process Manager"
- All custom profiles created, for Enterprise, Performance, and Efficiency editions

## Default profiles 
### User
By default, they access the User navigation of Bonita Portal. It includes:
  * a [Process list](user-process-list.md)
  * a [Case list](portal-user-case-list.md)
  * a [Task list](user-task-list.md).
This profile is also the only one mapped with Bonita Mobile Portal.  
This profile is also mapped to the [Bonita User Application](user-application-overview.md), bringing the same value but with more customization options.
  
### Administrator
By default, they access the Administrator navigation of Bonita Portal. It includes:
  * [Process Management](_process-maintenance.md) and [Analytics](analytics.md)
  * [Organization Management](organization-in-bonita-bpm-portal-overview.md)
  * [Business Data Model Management](bdm-management-in-bonita-bpm-portal.md)
  * [Applications Management](applications.md)
  * [Portal Look & Feel Management](managing-look-feel.md)
  * [License Information](license-info.md) (Enterprise, Performance, Efficiency, and Teamwork editions only)
  This profile is also mapped to the [Bonita Administrator Application](admin-application-overview.md), bringing about the same value but with more customization options.

### Process manager
This profile is available for Subscription editions only.
An employee mapped to the **Process manager** profile has limited administration rights for activities related to the processes they manage, as defined by the Administrator.

::: info
**Note:** In Bonita ACME organization, all users have the role **Member**, and the role **Member** is mapped to all default profiles.  
This simplifies process testing (log in as any user to see any Portal content). 
:::

## Custom profiles
In addition to the default profiles, users of Enterprise, Performance and Efficiency editions can create [custom profiles](custom-profiles.md).  
To create a custom profile, use the [profile editor](profileCreation.md) in Bonita Studio, and map it to entities of the organization.   
If a custom profile is created to give access to custom content in Bonita Portal, its Portal menu (navigation structure and pages) must also be defined in the profile.
We highly recommend to create the profiles in Bonita Studio so the custom profiles are versioned with the whole project and maintained consistently.   
In a production environment, if updating a profile is needed to recover from an issue temporarily, the Administrator can use the _Organization_>_Profiles menu.

## Edit a profile mapping with the organization
In specific situations, the Administrator may need to add or remove entities to the profile mapping. To do so:
1. Go to _Organization_>_Profiles_
1. Select a profile in the list
1. Click on _More..._
1. To add, click on one of the for _Add_ buttons depending on the right entity to add, select the entities, and click on _Add_
   To remove, click on the _remove_ link in the table row of the entity you need to remove, and confirm the deletion

## Edit a custom profile name and description
In specific situations, the Administrator may need to edit the name and/or description of a custom profile.  
This is not allowed for default profiles.  
To do so:
1. Go to _Organization_>_Profiles_
1. Select a profile in the list
1. Click on _More..._
1. Click on the _Edit_ button
1. Edit the name and or description
1. Click on _Save_

## Edit a custom profile Portal navigation
In specific situations, the Administrator may need to add, remove, or reorganize pages and menus in a profile's Portal navigation.
1. Go to _Organization_>_Profiles_
1. Select a profile in the list
1. Click on _More..._
   1. To edit or remove a menu, hover over the menu option and click on the _pencil_ or _trash can_ icon, then edit and save, or confirm the removal
   1. To reorganize the menu, drag and drop the menu horizontally to the right location
   1. To edit or remove a menu option, hover over the option and click on the _pencil_ or _trash can_ icon, then edit and save, or confirm the removal
   1. To reorganize options within a menu, drag and drop the option vertically to the right location
   1. To create a new menu, click on the _Create_ button
   1. Name the menu, and select the default or custom pages for the menu, and click on _Create_
   
## Export a profile
It may happen that the Administrator needs to export a profile, to reimport it in a Bonita Studio or install it on another Bonita Portal.
To do so:
1. Go to _Organization_>_Profiles_
1. Click on the checkbox close to the profile or profiles to export
1. Click on the _Export_ button at the top of the list
1. Confirm the exportation
1. Select where to download it
1. Click on _Save_

## Add a profile
It may happen that the Administrator needs to import a profile, from a Bonita Studio or another Bonita Portal.  
Less frequently, the Administrator may have to create a custom profile from Bonita Portal.
To do so:
1. Go to _Organization_>_Profiles_
1. Click on the _Add_ button
1. Select whether you want to "import" or "create" a profile
    1. To import, click in the file field, select your .xml file, click on _Open_, and then on _Import_.
       It is possible to import a profile file made of several profiles. All the profiles it contains will be imported.
    1. To create, type the name and description, and click on the _Create_ button. This will take you to the details page.
       Create the mapping with the organization entities, and if needed, create a Portal navigation.  
       
Starting with Bonita 2021.1, because Bonita Portal is deprecated, we strongly encourage to create applications instead of Custom Profiles in Bonita Portal.
   
## Delete a profile
Very rarely, the Administrator may have to delete a profile. It is not possible for Bonita default profiles.  
Deleting a profile will not delete the mapped entities, but if the custom profile has a Portal navigation, this will be deleted.  
To do so:
1. Go to _Organization_>_Profiles_
1. Click on the profile to delete
1. Click on the _Delete_ button
1. Confirm the deletion
