# Profile

## Overview

in Bonita 7.6, we introduced the possibility to manage profiles from the Studio.
It accounts for an additional step to ease the management of [Living Applications](applications.md) in Bonita, since our objective is to offer a unique application deployment artifact, managed from the Studio.  
Then, all resources used by applications (like profiles) will be centralized and shared by the Bonita development suite: Bonita Studio and the UI Designer.

## Definition

Basically, a **profile** is an XML file. It contains the profile name, the mapping with the organization (which users / groups / roles / memberships have this profile) and the portal menu entries (menus accessible to a user logged with this profile).  
A profile must be imported onto the portal, in the **Profiles** tab, to enable the profile (you need to connect with the **Administrator** profile to do it).  
Before Bonita 7.6, this portal tab was the only way to create and manage profiles.  
For development purposes, the Studio can **deploy** profiles onto the portal for you (_only for Performance and Efficiency editions_).

Profiles are packaged in **profile files**.  
An **profile file** is an XML file containing one or more profiles.  
```xml
	 <!-- Profile File -->
    <profiles>
		<profile>
			<!--  First Profile -->
		</profile>
		<profile>
			<!--  Second Profile -->
		</profile>
	</profiles>
```


