# BDM access control - documentation

::: info
**Note:** for Performance and Efficiency editions only.
:::

## Overview
In bonita 7.6, we introduced the possibility to define access controls on the BDM.  Define access control on a business object means define which attributes of this business object a given user is allowed to access.  
If access controls are defined on the BDM, when a user call a BDM API to retrieve some objects, the response will only contains the attributes this user is allowed to see.

## Use of profiles

The access logic should concern several users, based on there roles / groups in the organisation. It doesn't make a lot of sens to define an access logic for each user of the organization. That's why access control are bounded with profiles.  
A [profile](profiles-overview.md) is basically a mapping with the organization. Granting access to some attributes of a business object to a given profile means grant access to those attributes to all the users with this profile.  
The idea is to create profiles accordingly to your logic, and to grant access to those profiles.

## Define BDM access control

::: warning
**Warning:** The access control feature follows **a white list logic**. If you start to define access control on your BDM, you have to do it **for each business object of your BDM**, else some objects won't be accessible.
:::

To define access control on your BDM, you have to use the Access Control Editor embed in the Studio. You can open it using the menu:  
*Development -> Business Data Model -> Define BDM access control*

Define access control on a business object means define a set of **access rules** on this object.  
A rule is made of the following elements:  

 - A name
 - A description
 - A list of attributes
 - A list of profiles
 
A rule define which attributes a set of profiles are allowed to access. You can define several rules for a business object. If several rules reference the same profile, then this profile is allowed  to access to the union of the attributes defined on those rules.  

For development purpose, the Studio can **deploy** access control on the portal for you. To install it in production, you have to export your access control file from the Studio (using the shortcut in the editor) and install it from the portal, using [those instructions](bdm-management-in-bonita-bpm-portal.md).

## Example of use-cases to implement

### Human resources novice

**Use case:** In a company, there is two kind of human resources employee: The experimented ones and the novice ones. Human resources employees have to review other employees leave requests. Leave requests often include a medical comment. *A novice human resources employee shall not see the medical comment of a leave request.*

**Technical use case:** Grant access to some attributes of a business object depending on the profiles of the requester.

::: info
**Note:** Part III and IV are not directly related to the access control definition, it is just a convenient way to observe the result of the access control definition.
:::

**I - BDM definition**

First, define a *LeaveRequest* business object, with the following attributes:  

 | Name | Type |
|---|---|
| employee | STRING |
| departureDate | DATE ONLY |
| duration | INTEGER |
| medicalComment | STRING |
| managerComment | STRING |

**II - Organization and Profiles definition**

In your organization, create a group 'Human Resources' and two roles: 'Trainee' & 'Manager'.  
Create some users with the membership 'trainee of human resources' and some others with the membership 'manager of human resources'.

Define two custom profiles using the [profile editor](profileCreation.md) in the Studio:  

 - **Novice HR**, mapped with the membership 'trainee of human resources' 
 - **Experimented HR**, mapped with the membership 'manager of human resources' 

**III - Create a process and generate some data**

Create a new diagram, with only a start event and an end event.  
On the pool, add a business variable of type *LeaveRequest*, generate a contract from this data, and generate an instantiation form from this contract.  
Run this process a couple of time to generate some LeaveRequest data.

**IV - Create a basic living application to display data**

::: info
**Note:** In this tutorial, we create a basic living application to observe the result of the access control. If you are not interested in creating this living application, you can just call the API and check the response. Here is the API to call :   *../API/bdm/businessData/com.company.model.LeaveRequest?q=find&p=0&c=10*
:::

 In the UI Designer,  create an application page (*displayLeaveRequest*):

 - Create a new variable
	 -  **Name** : leaveRequests
	 -  **Type** : External API
	 -  **API URL** :  ../API/bdm/businessData/com.company.model.LeaveRequest?q=find&p=0&c=10
 
 - Add a title to your page (Existing leave requests)
 - Add a container under the title
	 - **Collection**: leaveRequests 
	 - **CSS classes**: alert alert-info
 - Inside this container, for each of the following attributes of your Business object *(employee - departureDate - duration - medicalComment - managerComment)*:
	 - Add an input with the following configuration *( [current attribute name] should be replaced by employee or departureDate or duration or medicalComment or managerComment )*
		 - Label : [current attribute name]
		 - Value : $item.[current attribute name]
		 - Read-only: true

Create a new application descriptor using the [application editor](applicationCreation.md) in the Studio:  

 - Set the application token: leaveRequest
 - Set the Application Profile: User (ensure that the users mapped with the two profiles created in part II are also mapped with the profile User)
 - Add an orphan page:
	 - **Application Page**: custompage_displayLeaveRequest
	 - **Token**:  displayLeaveRequest
 - Set the Home page token: displayLeaveRequest
 - deploy

Ensure that the living application works correctly, and that all the attributes are displayed at the moment.

**V - Define access control for your business object LeaveRequest**

We want to ensure that only experimented member of HR can access to the attribute *medicalComment* of a leave request. A novice member of HR shall not see this attribute.  
For that, we are going to define two rules for our business object *LeaveRequest*:  

The first rule is the rule for the novices members of HR:

 - **Rule name**: Novice HR Access
 - **Rule description**: A novice member of HR can't see the medical comment of a leave request
 - **Attributes checked**:  [employee, departureDate, duration, managerComment]
 - **Profiles checked**: [Novice HR]

The second rule is the rule for the experimented members of HR:

 - **Rule name**: Experimented HR Access
 - **Rule description**: An experimented member of HR can see all the attributes of a leave request
 - **Attributes checked**:  [employee, departureDate, duration, medicalComment, managerComment]
 - **Profiles checked**: [Experimented HR]

Deploy your access control file

**VI - Access control validation**

The access to your previous data is now controlled by the BDM Access Control file you just deployed. A novice member of HR can't see the attribute *medicalComment* on a LeaveRequest anymore.  
Connect onto the portal as a user with the profile Novice HR. Go to your application , and ensure that the medical comment is always empty.  
Connect now as a user with the profile Experimented HR. On your application, you should see the medical comments.
