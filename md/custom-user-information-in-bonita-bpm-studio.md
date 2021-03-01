# Custom User Information in Bonita Studio

Learn how you can add custom (business) information on users, that will then be available for filtering.
For instance:

Custom User Information are (key, value) pairs that can be added on users.  
You define the attributes that you want to store, and then add the values for the users.  
You can use custom user information to assign tasks to users based on information that is specific to your organization
and not included in the standard Bonita organization definition.

## Purpose

For example, you may want to create a security badge with an individual value (number) for each user, or an office skill
for a user, a special professional activity, or geographical details.
All these types of information are not displayed in standard information tabs but you may want to filter candidates to a human task thanks to those attributes.

## Define custom user information

In the Organization menu > Manage organizations > Organization users, the second tab **User information management** offers a summary of the default information and allows to create custom user information. Use "Add" to create your own, with a name and an optional description.

1. In Bonita Studio, go to **Organization** in the cool bar
2. Click on _**Manage**_ in the dropdown menu
3. Click on _**Next**_ 3 times to get to the **Organization users** window
4. Click on the **User information management** tab
5. In the **Custom information** pane on the right hand side of the window, click on _**Add**_
6. This will put a default name **Information1** in the **Name column**
7. Add a description (if needed). This will only appear in Bonita Studio.
8. Double click on the default name **Information1**, to modify it to your needs
9. Click on **Finish**
10. A message is displayed: _The Organization has been modified. It is recommended to re-publish it. Do you want to do it now?_
11. Click on **Yes**
12. A confirmation message is displayed showing the organization was successfully re-published
13. Click on **Ok**
14. A new custom tab is applied to all users. 

If the value is changed in Bonita Portal by the admin, and the filter value does not exist in the organization

## Add custom user information values for each user

In the Organization menu > Manage organizations > Organization users, the first tab **List of users** shows detail information for each user on the right hand-side panel, spread over five tabs:

- General (Title, First and last name, Job title)
- Membership (Group/role)
- Personal (Email, phone, website, address etc.)
- Business card (Email, phone, website, address etc.)
- Custom 

To add custom user information values for a user, select a user in the **List of users**, click on the **_Custom_** tab, and enter the value for each relevant information. You also see a link **Manage custom information**, to go back and manage the list of custom user information.  
Note: this value can be changed by a user with the Admin profile in the Bonita Portal. See [How to edit Custom information for a single user](custom-user-information-in-bonita-bpm-portal.md)

## Set an actor filter on custom user information

A task or a lane is linked to an actor. An actor is mapped to a list of users. An actor filter applies to the set of users mapped to the actor. The actor filter configuration can be added to an actor at lane or human task level.

When all relevant users have their Custom User Information set, you can add an actor filter:

1. In a process diagram, select a lane or a task
2. In the **Details** panel, Go to **General** > **Actors** and select an actor to apply the filter (actors are defined at pool level)
3. At **Actor filter** level, click _**Set**_
4. In the Actor filters window > Categories, click on _**Organization**_ and choose  _**Users with Custom information**_
5. Click on _**Next**_
6. Enter a name and a description for the filter configuration
7. Click on _**Next**_
8. Enter a custom user information **Name** or click on the drop down list to select the one you need
9. Enter a value for the information
10. To filter on several values using the same string, click _**Partial match **_
11. If you expect the filter to return only one user, then it's good that the task is assigned to her automatically. In this case, click the _**Assign tasks automatically**_ checkbox. 
12. Click on _**Finish**_

The filter is set for the actor and is displayed in the actor filter field. Users from the actor and with the relevant value for the custom information chosen will become candidates to perform the task, or all the tasks in the lane if you set it at lane level.

Note that the filter will not work if you change values in the organization but do not re-publish the organization. This will throw a synchronization error.
