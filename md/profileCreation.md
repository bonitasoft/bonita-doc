# Profile

## Overview

in Bonita 7.6, we introduced the possibility to manage profiles from the Studio.
It accounts for an additional step to ease the management of [Living Applications](applications.md) in Bonita, since our objective is to offer a unique application deployment artifact, managed from the Studio.  
Then, all resources used by applications (like profiles) will be centralized and shared by the Bonita development suite: Bonita Studio and the UI Designer.

## Definition

Basically, a **profile** is an XML file. It contains the profile name, the mapping with the organization (which users / groups / roles / memberships have this profile) and the portal menu entries (menus accessible to a user logged in the portal with this profile).  
A profile must be imported onto the portal, in the **Profiles** tab, to enable the profile (you need to connect with the **Administrator** profile to do it).  
Before Bonita 7.6, this portal tab was the only way to create and manage profiles.  
For development purposes, the Studio can **deploy** profiles onto the portal for you (_only for Performance and Efficiency editions_).

Profiles are packaged in **files of profiles**.  
An **file of profiles** is an XML file containing one or more profiles.  
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
The purpose of grouping profiles in one file is to manage together profiles related to a same business application.  
For example, if you want to create a leave management application for four kind of users (Employees, Managers, Human Resources officers, and Administrators) then you will have to create four applications and four profiles, and to bind each profile to the related application. As for the four applications, the four profiles should be managed together, and so grouped in the same file of profile. 

There is a special file of profiles for default profiles: `default_profiles.xml`  
This file can only contain default profiles and cannot be renamed or deleted.

Only Performance and Efficiency editions can create new file of profiles, in order to create custom profiles.

## Create and build a profile

::: info
**Note:** All Bonita editions come with an .xml editor for this feature. Only Performance and Efficiency editions also come with a graphical UI.
:::

From Bonita Studio, click on **Organization** -> **Profile** -> **New...**  
It will create an empty file of profiles with a default name and open an editor. You can **rename** this file from the graphical UI or from the menu **Open**.  

The profile graphical UI provided is bound to the xml source, so you can use it to build your profile without writing xml.  
You can switch from the graphical UI to the xml source at any moment, using the tabs _Editor_ and _Source_ at the bottom of the editor.  
A toolbar is embedded to the editor, use it to:  

 - **Add** a profile to this file of profiles: you can add a new profile or duplicate an existing one from your current repository
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

In the mapping section you can map Users / groups / roles / memberships to your profile. You have to map your profile with elements of the active organization.  
⚠  Nodes in the group tree are **independent** ⚠  It means that mapping `/acme` to your profile won't map `/acme/hr` to it. Each node has to be mapped individually to be took into account. 

The portal menu entries can be edited for custom profiles.  
Pages proposed are those provided by default in the Bonita Portal and those created with the UI designer. You can reference a custom page only present in the portal, but you will have to write its exact identifier.

The Applications section provides a quick access to the applications mapped to this profile.  
To map a new application to this profile, you have to open the application and then chose this profile in the profile section of the [application descriptor editor](applicationCreation.md)










  