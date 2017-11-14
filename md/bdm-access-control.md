# BDM access control - documentation

::: info
**Note:** for Performance and Efficiency editions only.
:::

## Overview
When defining access control on a business object, one use-case is to define which attributes of this business object a given user is allowed to access through REST API.  
If access controls are defined on the BDM, when a user calls a BDM API to retrieve some objects, the response will only contain the attributes this user is allowed to see.

## Use of profiles

Most of the time, the access logic applies to several users, based on there roles/groups in the organization. This is why access control rules are bound with profiles.  
A [profile](profiles-overview.md) is basically a mapping with the organization. Granting access to some attributes of a business object to a given profile means granting access to all users mapped to this profile.  
The idea is to create profiles accordingly to your logic, and to grant access to those profiles.

## Define BDM access control

To define access control on your BDM, you have to use the Access Control Editor embedded in Bonita Studio. You can open it using the menu: *Development* > *Business Data Model* > *BDM access control* > *Define*

Defining access control on a business object means defining a set of **access rules** on this object.  
A rule is made of the following elements:  
 - A name
 - A description
 - A list of attributes
 - A list of profiles
 
A rule defines which attributes a set of profiles are allowed to access. You can define several rules for a business object. If several rules reference the same profile, then this profile is allowed  to access to the union of the attributes defined on those rules.  

::: warning
**Warning:** To allow an easy migration to this new feature, and to keep our BDM API working, all objects are visible by everyone by default. But as soon as you define an accss control rule for one object, the BDM access control switches to **a white list logic**, meaning that you have to define access control **for each and every business object of your BDM**.  
Else some objects won't be accessible by anyone.
:::

For development purposes, the Studio can **deploy** access control on the portal for you. To install it in production, you have to export your access control file from the Studio (using the shortcut in the editor) and install it from the portal, using [those instructions](bdm-management-in-bonita-bpm-portal.md).

## Example of use-cases to implement

### Human resources novice

**Business use case:** In a company, there are two kinds of Human Resources employee: The experimented ones and the novice ones. Human Resources employees have to review the company's employees' leave requests. Leave requests include a medical comment if the cause of the leave is illness. So the access rule is *A novice HR employee should not be able to access the medical comment of any leave requests.*

**Technical use case:** Grant access to some attributes of a business object depending on the profiles of the requester.

**1. BDM definition**

First, define a *LeaveRequest* business object, with the following attributes:  

 | Name | Type |
|---|---|
| employee | STRING |
| departureDate | DATE ONLY |
| duration | INTEGER |
| medicalComment | STRING |
| managerComment | STRING |

**2. Organization and Profiles definition**

In your organization, create a group 'Human Resources' and two roles: 'Trainee' & 'Manager'.  
Create some users with the membership 'Trainee of Human Resources' and some others with the membership 'Manager of Human Resources'.

Define two custom profiles using the [profile editor](profileCreation.md) in the Studio:  

 - **Novice HR**, mapped with the membership 'Trainee of Human Resources' 
 - **Experimented HR**, mapped with the membership 'Manager of Human Resources' 

::: info
**Note:** Part 3. and 4. are not directly related to access control definition, it is just a convenient way to observe its results.
:::

**3. Create a process and generate some data**

Create a new diagram, with only a start event and an end event.  
On the pool, add a business variable of type *LeaveRequest*, generate a contract from this data, and generate an instantiation form from this contract.  
Run this process a couple of times to generate LeaveRequest data.

**4. Create a living application to display data**

::: info
**Note:** In this tutorial, we create a basic living application to observe the results of our access rules. You can also directly call the API and check the response. Here is the API to call: *../API/bdm/businessData/com.company.model.LeaveRequest?q=find&p=0&c=10*
:::

 In the UI Designer, create an application page (*displayLeaveRequest*):

 - Create a new variable
	 -  **Name** : leaveRequests
	 -  **Type** : External API
	 -  **API URL** :  ../API/bdm/businessData/com.company.model.LeaveRequest?q=find&p=0&c=10
 
 - Add a title to your page (*Leave requests*)
 - Add a container under the title
	 - **Collection**: leaveRequests 
	 - **CSS classes**: alert alert-info
 - Inside this container, for each of the following attributes of your Business Object *(employee - departureDate - duration - medicalComment - managerComment)*:
	 - Add an input with the following configuration *( [current attribute name] should be replaced by employee or departureDate or duration or medicalComment or managerComment )*
		 - **Label** : *[current attribute name]*
		 - **Value** : *$item.[current attribute name]*
		 - **Read-only**: *true*

Create a new application descriptor using the [application editor](applicationCreation.md) in the Studio:  

 - Set the application token: leaveRequest
 - Set the Application Profile: User (ensure that the users mapped with the two profiles created in 2. are also mapped with the profile User)
 - Add an orphan page:
	 - **Application Page**: *custompage_displayLeaveRequest*
	 - **Token**:  *displayLeaveRequest*
 - Set the Home page token: *displayLeaveRequest*
 - Deploy

Ensure that the living application works fine, and that all attributes are displayed at the moment.

**5. Define access control for your Business Object LeaveRequest**

We want to ensure that only experimented members of HR can access the attribute *medicalComment* of a leave request. A novice member of HR should not see this attribute.  
To do so, define two rules for our *LeaveRequest*:  

The first rule is the rule for the novices members of HR:

 - **Rule name**: *Novice HR Access*
 - **Rule description**: *A novice member of HR should not see the medical comment of a leave request*
 - **Attributes checked**:  *[employee, departureDate, duration, managerComment]*
 - **Profiles checked**: *[Novice HR]*

The second rule is the rule for the experimented members of HR:

 - **Rule name**: *Experimented HR Access*
 - **Rule description**: *An experimented member of HR should see all the attributes of a leave request*
 - **Attributes checked**:  *[employee, departureDate, duration, medicalComment, managerComment]*
 - **Profiles checked**: *[Experimented HR]*

Deploy your access control file.

**6. Access control validation**

Access to your previous data is now controlled by the BDM Access Control file you just deployed. A novice member of HR can't see the attribute *medicalComment* on a LeaveRequest anymore.  
Connect onto the portal as a user with the profile *Novice HR*. Go to your application: the medical comment is always empty.  
Connect now as a user with the profile *Experimented HR*. On your application, the medical comments is displayed.
