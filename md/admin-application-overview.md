# Bonita Administrator Application

The Bonita Administrator Application allows anyone with the _Administrator_ profile to manage the usages of Bonita throughout a department or a company.  
This pages describes the Bonita Administrator Application: its values, how to access it, its difference with the _Administrator_ profile of Bonita Portal, and the details of its features.   

## Value
Bonita Portal is deprecated and will be removed in a future Bonita release.  
We believe that Bonita Applications give our users much more freedom for customization:
  * Their menus can be customized compared to provided Portal profiles, by adding or removing pages, while still keeping the mapping with the profile _User_
  * They are responsive
  * Portal pages that have been re-created with the UI Designer have more features and/or features improvements  
  * These pages can also be modified in the UI Designer to fit precise users' needs.

We also want to come out of the Google Web Toolkit framework; as useful as it has been when building Bonita Portal, we now find some limitations.  

## Access during Implementation
To get the application when you are implementing your Bonita project, go to the "Resources" tile of the **Studio Welcome page**, and click on "Import Bonita Admin Application".

![Get application from Studio](images/application-deploy/studio-get-application.JPG)

You can also get it from our [Admin Application GitHub repository](https://github.com/bonitasoft/bonita-admin-application/).  
There are two ways to get the .bos file. You can either get it from the *Releases* on the right or by cloning the repository of your choice and building it using maven.  
Building the repository will create a .bos file in the ```target``` folder. You can import this one into the development environment.
<br>Using this method is also useful if you want to get an older version of an application or if you need a weekly version with a potential bugfix.  

After Studio validation, the application is imported or cloned; you can view its content in the project explorer, deploy it, and open it.

## Access during pre-Production and Production
To deploy the applications into a bundle or the Cloud, you can use [Bonita Continuous Delivery](https://documentation.bonitasoft.com/bcd//_manage_living_application).   

## Differences with _Administration_ profile of Bonita Portal
On top of the values of Bonita Living applications, here are the similarities and differences between this Bonita application and Bonita Portal:
  * All pages previously created within the Google Web Toolkit framework have been recreated in the UI Designer. They can be customized in the UI Designer. They come with the Admin Application you download from Bonita Studio.
  * All pages previously created in other technologies have been wrapped as custom pages. They cannot be customized in the UI Designer. Since they cannot be imported in a .bos archive, they do not come with the Admin Application you downlaod. Instead, they come as provided resources. You can find them in the "Resources" tab of the application.

Now, in details:
  * BPM menu
    * _Monitoring_: same as in Bonita Portal. 
    * _Processes_:
      * Process list: recreated with the UI Designer. It brings more clarity to the unresolved-resolved-enabled lifecycle of the processes.
      * Process details:  same than the one in Bonita Portal. For Community, monitoring information has been added to display what was previously in the third panel of the process list.
    * _Cases_:
      * Case list: same than in Bonita Portal.
      * Case details: recreated with the UI Designer. It brings more clarity in the information layout and the edition of process variables.
    * _Tasks_:
      * Task list: recreated with the UI Designer. It brings more clarity about what is displayed (all types of flow nodes or only human tasks), brings consistency in the page layout with the horizontal tabs, with the failed flownodes first as this is the main monitoring information to get a grip on.
      * Task details: recreated with the UI Designer. For failed flow nodes, the error management "replay" functionality has been clarified.
  
::: Warning
The _Analytics_ page has not been either wrapped or recreated with the UI Designer. This value is about to be created as part of a new application soon to be released. 
If you use one of our four BPM reports or one of the Jasper reports you have created and installed, do continue to use Bonita Portal with the Administrator profile.
:::

  * Organization menu
    * _Users_:
      * User list: recreated with the UI Designer. It gives less information without the left panel but allows a clearer display at top level.
      * User details: same than in Bonita Portal.
    * _Groups_: recreated with the UI Designer. All information in the third panel has been made available in the table (parent group, technical name, last updatee), or on click (subgroups, users in the group). Actions (Edit, Delete) have been made more reachable at the end of each row.
    * _Roles_: recreated with the UI Designer. Same improvement than for _Groups_.
    * _Install / Export_: same than in Bonita Portal.
    * _Profiles_: 
      * Profile list: recreated with the UI Designer. It gives the possibility to view and edit the profile mapping by a simple click. There is no option to create a Portal navigation for a profile anymore: applications can now be made of both custom as well as Bonita pages, so it is better to create applications, and the mapping UI has been streamlined.
      * Profile details: no more details page :)
  * _BDM_: same than in Bonita Portal. 
  * _Resources_: recreated with the UI Designer. You can now search a resource by its name, and hide resources that are provided by Bonita to only show your custom resources.
  * _Applications_: same than in Bonita Portal.
  * _Portal_: no more Portal means no more Porta Look & Feel, so this page is not needed in our application.
  * _License_: same than in Bonita Portal.
  
Note that for all pages recreated with the UI Designer, error management has been improved. A lot.

## Create your own Administrator application from ours
1. Have all your custom pages ready, either imported in the UI Designer or the studio.
1. Open our UI Designer pages to customize them.
1. In Bonita Studio, go to the "Project explorer" on the left and double click on the "bonita-admin-application.xml" application descriptor for Community, or "bonita-admin-application-sp.xml" for Enterprise.
1. In the editor, rename the pages, change the order in the menu, remove the pages you do not need, add yours in the menu, or as orphan pages accessed through a menu option.
:::warning
Make sure our "details" pages are always used as orphan pages, as they need an id to be passed from a list or another page to show any content.
:::
1. To add other Bonita provided pages, open the portal from the coolbar, switch to the Administrator profile, and look in the "Resources" page, filtered by pages.

::: info
Once a page has been customized, or when the Administrator application has been customized, it is no more supported.  
But you can reach one of our Professional Services team member to help you develop or maintain it.
:::

## Login and sign out
To know more, go to the [dedicated page](log-in-and-log-out.md).
  
## Language selection
To know more, go to the [dedicated page](languages.md).

## Navigation between applications
To know more, go to the [dedicated page](navigation.md).

