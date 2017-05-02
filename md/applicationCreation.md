# Application Descriptor



## Overview

In Bonita BPM 7.5, we introduced the possibility to manage application descriptors from the Studio.  
It accounts for an additional step to ease the management of [Living Applications](applications.md) in Bonita BPM, since our objective is to offer a unique application deployment artifact, managed from the Studio.  
Therefore, all resources used by applications will be centralized and shared by the Bonita BPM development suite: Bonita BPM Studio and the UI Designe.  
Those resources are used to create Application Descriptors from the Studio. Application Descriptors can be deployed in the Portal to create Applications.  

## Definition 

Basically, an **application descriptor** is an XML file. It represents the skeleton of an Application, as it contains the references to all resources installed in Bonita BPM Portal and used by a given application.  
An application descriptor must be imported onto the portal (Administrator profile), in the Applications tab.  
Before Bonita BPM 7.5, this portal tab was the only way to create and manage applications.  
For development purposes, the studio can deploy applications descriptors onto the portal for you.  

Application descriptors are packaged in **application files**.  
An **application file** is a XML file containing one or more application descriptors.  

	 <!--  Application File -->
    <applications>
		<application>
			<!--  First Application Descriptor -->
		</application>
		<application>
			<!--  Second Application Descriptor -->
		</application>
	</applications>
	
Application Descriptors in a given application file are totally **independent**.  
The purpose of grouping application descriptors in one file is to manage together applications with the same company purpose, each of them dedicated to a different user profile.  
For example, four leave management applications for employees, managers, Human Resources officers, and Administrators should be managed together, therefore grouped in the same application file.  

## How to create and build an Application Descriptor

::: info
**Note:** All Bonita BPM editions come with an .xml editor for this feature. Only Performance and Efficiency editions also come with a graphical UI.
:::

From Bonita BPM Studio, click on **Development** -> **Application Descriptor** -> **New..**  
It will create an empty Application File with a default name and open an editor. You can rename this Application file from the graphical UI or from the menu **Open**.  

![Empty Application File](images/applicationDescriptors/emptyApplicationFile.png)
Here is an overview of the graphical UI provided, in the tab *Editor* (_only for efficiency and performance editions_).  
You can switch from the graphical UI to the xml source at any moment, using the tabs _Editor_ and _Source_ at the bottom of the editor.  
A toolbar is embedded to the editor, use it to:  

 - **Add** an application descriptor to this Application File
 - **Deploy** this application File (i.e all the application descriptors contained in this application file) and the referenced resources (pages, layout..) in the portal. /!\ If your pages use Rest API Extensions, you have to deploy those API manually.  
 - **Rename** this Application File
 - **Export** this Application File
 - **Delete** this Application File from your current workspace

![Application Descriptor Editor](images/applicationDescriptors/applicationDescriptorEditor.png)
Here is the application descriptor graphical UI provided. It is bound to the XML source, so you can use it to build your application descriptor without even coding!  

The application **Token** is the identifier of your Application Descriptor, it has to be unique. It is used to define the URL root of your Application:  _../apps/APPLICATIONTOKEN/.._   
 When you update the application token, if the Application Descriptor with the old token was deployed on the portal, we propose you to re-deploy your application descriptor. Re-deploy means here that we replace the old deployed instance with the old token by a new deployed instance with the new token. If you refuse, then the deployed instance with the old token won't be replaced by the new one when you will deploy again, because tokens are different. Your will have two deployed instances. 

We provide an auto complete tool for fields _Profile_, _Layout_, _Theme_, _Application Page_ and _Home page token_.  
Be aware that we can only propose choices known by the Studio and the UI designer at the moment.  
It means that custom profiles, custom themes or custom pages / layouts only known by the portal (not created with the UID) won't be proposed. You can still reference an unknown resource, but you will have to write the exact identifier by yourself.  

There is two ways to reference pages used by your Application. In the _Navigation_ table or in the _Orphan pages_ table.  
Pages referenced in the Navigation table will be accessible by a menu. Use this table to create all your menu/submenu, and bind those menu to pages. A page needs an unique token (unique in this Application descriptor). It will be use to define the URL to reach this page : _../apps/applicationToken/PAGETOKEN_  
Pages referenced in the Orphan page stable will be accessible using the associated URL, but won't be attached to a menu. It can be the home page of your application, or pages accessible from other pages but not from a menu.  
/!\ You don't need to define your pages twice, a page defined in the Navigation table will be accessible in the whole Application, you don't have to re-define it as an orphan page.  

A preview link is also provided, at the top of the _Overview_ section. Clicking on the link will first deploy the whole Application File, and then open the defined home page of the associated Application descriptor. 