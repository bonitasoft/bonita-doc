# Role list in the Bonita Administrator Application

This page explains what a user with the _Administrator_ profile can see and do about roles (of the organization) in [Bonita Administrator Application](admin-application-overview).  
To easily manipulate users with the same rights, it is possible to give them the same role (in the same or in different groups), like "Project Manager", for example.   
Roles can be defined in the organization, users can then be added to roles, and roles are used to map actors or profiles or other permissions in Bonita.

Here is a view of this page:
![Administrator roles Portal](images/UI2021.1/admin-application-roles-list.png)<!--{.img-responsive}-->

On this page, an Administrator can:

## View the users directly mapped to a role
1. Go to _Organization_/_Roles_
2. In the row of the role, click on the _View the list of users mapped with this role_ icon
3. In the modal window, if you require more information about the user, go to the end of his row and click on the _View user details_ icon to navigate to the user details page.

## Live Update
The Administrator can [Live Update](live-update.md) a role:
 * create
 * delete
 * edit the name and description
 * modify users within
This is only in case of an issue to solve temporarily. We strongly encourage the modification of the organization to be conducted 
in Bonita Studio so it can be shared and versioned with the whole project, or through the [LDAP synchronizer](ldap-synchronizer.md) if the organization is located in an external system. 

### Create a role
1. Go to _Organization_/_Roles_
2. Click on the _Create_ button
3. In the modal window, enter the name (can be technical), the display name, and a description of the role
4. Click on _Create_
The new role will be displayed in the list of roles.

### Delete a role
1. Go to _Organization_/_Roles_
2. In the row of the role, click on the _Delete_ icon
3. In the modal window, click on _Delete_
4. In the confirmation modal, after checking that it is safe to delete, click on _Delete_

### Edit a role name and description
1. Go to _Organization_/_Roles_
2. On the row of the role, click on the _Edit role details_ icon
3. In the modal window, update the role information
4. Click _Save_

## Modify users in a role
In the way we conceive the pertainance of a user to an organization, it is only possible to add both a role and a group (what we call a membership) to a user.  
For example, "Assistant"(role) of "Human Resources"(group).  
1. Go to _Organization_/_Users_. You navigate to the [Users](admin-application-users-list.md) page
2. On the row of the user, click on the _View user details_ icon
3. Click on _Profiles_/_Memberships_
4. To delete a membership, click on the _Delete_ icon of an existing membership
or to add a membership, click on the _+_ button, select the role and the group for the user, and click on _Add_
