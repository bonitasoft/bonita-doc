# Bonita User Interfaces overview

This page describes the User Interfaces provided by Bonita.   
They rely on the analysis that four types of personas use process-based applications in a company:
  - the **Administrator** is responsible for the administration of Bonita at tenant level, and particularly for the management of the processes, the organization, the reports, the custom profiles and the Look & Feel.
  - the **Process Manager** shares process management responsibilities with the Administrator for the processes he has been declared as the Process Manager.
  - the **User** is responsible of performing the tasks for which s·he is a candidate and also for starting new cases of the processes to which s·he has access.
  - the **Technical User** is responsible for opening permissions to use Bonita in non-production or production environments by creating users. S·he is also the only person with permissions to start and stop the BPM services for maintenance or update (namely BDM update). For more information, go to the dedicated [documentation page](first-steps-after-setup.md).

## Default User Interfaces

Starting with Bonita 7.12, there are two types of User Interfaces provided by Bonita: Bonita Portal (legacy), and Bonita applications (the way to go).  

 ::: info
 **Note:** In next versions of Bonita, Portal will be replaced with the Applications, so we encourage you to use the applications as of now.
 :::   

Bonita Portal gives access to:
  - an Administrator view
  - a Process Manager view, with administrator rights applicable on a defined scope of the deployed processes (in Efficiency, Performance, and Enterprise editions only)
  - a User view
  - a Technical User view

Each view accounts for a set of single-page or multiple-page menu options.
Bonita Portal views are automatically launched when running a process from the Studio. You can also open Bonita Portal with the Portal icon in the Studio Coolbar.

In Bonita 7.12, Bonita Applications offer:
  - the Bonita Administrator Application
  - the Bonita User Application
  
Both Bonita Applications can be downloaded from the Welcome Page of the Studio, in the "Resources" tile.

Applications are more flexible than the portal, in two ways:
   - The navigation can be customized: remove the pages that are not needed, add custom pages that are needed. This is the equivalent of Custom Profiles, but with the flexibility of an application. 
   - Some pages of those applications have been recreated with Bonita UI Designer (see the list [here]). This means that you can open and customize the page to make it fit the precise needs of the users. Starting with an existing page accounts for a big gain of time.

Moreover, for Bonitasoft as for its users, applications are free from the Google Web Toolkit framework used to build an important part of Bonita Portal, which accounts for an important technical update and optimized maintenance ahead of us.

## Custom User Interfaces

You can also create views that fit users' needs better than the provided User Interfaces.  
In Bonita Portal, this has been made possible through the concept of [custom profiles](custom-profiles.md), new Portal views *made of Bonita pages and/or custom pages*.  
Then, with Bonita 7.0, Living applications have given the possibility to create applications *made of custom pages*, with their own look & feel. The pages can be created with Bonita UI Designer or in another environment.  
With Bonita 7.12 and the availability of Administrator and User applications, Living applications can be *made of Bonita pages and/or custom pages* too.

::: info
**Note:** As Portal will be replaced by applications in next versions of Bonita, we strongly encourage you **not** to create Custom profiles for Portal views anymore, but applications.  
For more information on how to migrate existing Custom profiles with Portal views into applications, go to the dedicated [documentation page](custom-profiles.md).
:::   
