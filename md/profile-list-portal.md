# Profiles management in Bonita Portal

This page explains what a user with the _Administrator_ profile can do with [profiles](profiles-portal-overview.md) in Bonita Portal.
In all Bonita editions, those users can change the mapping between a provided profile and the organization entities.
In Enterprise, Performance, and Efficiency editions, they can also create new profiles and edit them.

Here is a view of this page:
![Profiles in Portal](images/UI2021.1/profiles-portal.png)<!--{.img-responsive}-->

## View profiles
In _Organization_/_Profiles_, the list shows all profiles sorted by alphabetical order:
- Three provided profiles: "User", "Administrator", and for Enterprise, Performance, Efficiency, and Teamwork editions,"Process Manager"
- All custom profiles created, for Enterprise, Performance, and Efficiency editions

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
       It is possible to import a profile file made of several profiles. The file is imported and checked.  
       A popup reports the status of the import. It shows the number of profiles successfully imported, partially imported, or with errors.
       ::: info
       Note: The default profiles defined in Bonita have the flag `isDefault` set to "True" in the XML file. Do not change the setting of `isDefault` for any profile, or you will get an error message on import.
       :::
    1. To create, type the name and description, and click on the _Create_ button. This will take you to the details page.
       Create the mapping with the organization entities, and if needed, create a Portal navigation.  
 
::: info
Starting with Bonita 2021.1, because Bonita Portal is deprecated, we strongly encourage to create applications instead of Custom Profiles for Bonita Portal.
:::   

## Delete a profile
Very rarely, the Administrator may have to delete a profile. It is not possible for Bonita default profiles.  
Deleting a profile will not delete the mapped entities, but if the custom profile has a Portal navigation, this will be deleted.  
To do so:
1. Go to _Organization_>_Profiles_
1. Click on the profile to delete
1. Click on the _Delete_ button
1. Confirm the deletion
