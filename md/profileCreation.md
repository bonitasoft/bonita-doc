# Profile Editor

## Definition

### Fonctional
Profiles work as permissions to give access to:
+- [Living Applications](applications.md)
+- Navigation (menus) of Bonita Portal

A profile is made of a name, a description, and a mapping with the organization entities. 
When the profile is used to access a Portal menu, Portal menu entries must be defined in the profile too.  
(When used to access a Living Application, the application menu is defined in the [application descriptor](applicationCreation.md) itself.)  

All profiles can use the default profiles **Administrator** and **User**.
Performance and Efficiency users can also use the default profile **Process Manager**, and can create custom profiles.

### Technical
Technically, a **profile** is an XML file.  
Profiles are packaged in **files of profiles**.  
A **file of profiles** is an XML file containing one or more profiles.  
```xml
<!-- file of profiles -->
<profiles>
	<profile>
		<!--  First Profile -->
	</profile>
	<profile>
		<!--  Second Profile -->
	</profile>
</profiles>
```
However, profiles in a given file of profiles are totally **independent**.  

Default profiles (Administrator, Process Manager, and User) belong to the file `default_profiles.xml`. 
This file can only contain default profiles. It cannot be renamed or deleted. 
Neither can be the default profiles within: only the mapping between default profiles and entities of the organization can be edited.

Only Enterprise, Performance and Efficiency editions can create new file of profiles, in order to create custom profiles.  

The purpose of grouping profiles in one file is to manage together profiles related to a same business application.  
For example, if you want to create a leave management application for four kinds of users (Employees, Managers, Human Resources officers, and Administrators), then you will have to create four applications and four profiles, and to bind each profile to the related application. As for the four applications, the four profiles should be managed together, and so grouped in the same file of profiles. 

Files of profiles are also handy to be used in different environments: you can create different files, with the same profile names, but each profile is mapped to different entities of the organization depending on the target environment.
Therefore, you could have a "profiles_dev.xml", a "profiles_UAT.xml", and a "profiles_prod.xml" files of profiles.

## Create and build a profile

::: info
**Note:** All Bonita subscription editions come with an .xml editor for this feature. Only Enterprise, Performance and Efficiency editions also come with a graphical UI.
:::

From Bonita Studio, click on **Organization** -> **Profile** -> **New...**  
It will create an empty file of profiles with a default name and open an editor. You can **rename** this file from the graphical UI or from the menu **Open**.  

The profile graphical UI provided is bound to the xml source, so you can use it to build your profile without writing xml.  
You can switch from the graphical UI to the xml source at any moment, using the tabs _Editor_ and _Source_ at the bottom of the editor.  
A toolbar is embedded to the editor, use it to:  

 - **Add** a profile to this file of profiles: you can add a new profile or duplicate an existing one from your current project
 - **Save** this file of profiles **As** an other file of profiles (useful to duplicate the whole file)
 - **Deploy** this file of profiles (i.e all the profiles in this file)
 ⚠  For _development_ purposes, it also deploys their referenced pages used as portal menu entries, but if those resources use REST API Extensions, you have to deploy those manually. In _production_ environment, you still need to import pages, and REST API Extensions manually **before** to import the file of profiles.   
 - **Rename** this file of profiles
 - **Export** this file of profiles (download the .xml)
 - **Delete** this file of profiles from your current workspace
 - **Manage** the Organization: add users / groups / roles to the organization in order to map them to this profile
 - **Restore** the default file of profiles to its initial state (_only available for the file_ `default_profile.xml`) 

Using the graphical editor, you can set all the parameters of your profile.

The **profile name** has to be unique in a given file of profiles, else it will lead to conflicts when you will try to deploy the file of profiles.  
You can duplicate a profile name in different files, but remember that you can only have one instance of a given profile in production.

In the mapping section you can map Users / Groups / Roles / Memberships to your profile. You have to map your profile with elements of the active organization.  
⚠  Nodes in the group tree are **independent** ⚠  It means that mapping `/acme` to your profile won't map `/acme/hr` to it. Each node has to be mapped individually to be taken into account. However, you can easily add a whole part of your organization, using the _add subtree_ button:  select a node in the tree, and then click on _add subtree_.

The portal menu entries can be edited for custom profiles.  
Pages proposed are those provided by default in Bonita Portal and those created with the UI Designer. You can reference a custom page only if it is imported to the portal, and you will have to write its exact identifier.

The Applications section provides a quick access to the applications mapped to this profile.  
To map a new application to this profile, you have to open the application and then choose this profile in the profile field of the [application descriptor editor](applicationCreation.md)


## Enable a profile

To enable a profile, it must be installed onto the portal.   
For development purposes, the Studio can **deploy** profiles onto the portal for you (_only for Performance and Efficiency editions_).  
On a production environment, it is done via the **Organization > Profiles** menu of the **Administrator** Portal.
