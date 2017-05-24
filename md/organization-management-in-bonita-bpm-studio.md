# Organization management in Bonita Studio

In Bonita, the organization is the set of users who performs tasks in your business processes.

Within Bonita Studio, more than one organization can be defined. This is useful if you are developing a process that will be deployed in several different organizations. It is also useful for testing, because you can create a reduced version of your organization that has the same structure but fewer users, saving time in managing your test environment.

## The ACME example organization

Bonita Studio includes a sample organization, called ACME. This organization contains a small number of users, who belong to different groups, with realistic roles.

You can use this example organization to explore how to manage an organization in Bonita Studio, for example by adding a user, or changing the role of a user.

You can also use this sample organization to test a process that you develop.

## Creating an organization

You must load an organization into Bonita Engine before running a process. There are two ways to to do this:

* Create the organization in Bonita Studio, export it, and then import it into Bonita Portal.
* If you have a Subscription edition, use the [LDAP synchronizer](ldap-synchronizer.md) to automatically load information from your LDAP directory into Bonita Engine. 

To specify an organization manually, you create the organization, create the group hierarchy, specify roles, and then add users and their memberships. 

1. Start Bonita Studio.
2. Go to the Organization menu and select **Manage....**
3. Add a new organization:
  1. Click **_Add_**. A line will be added to the table of organizations, with a placeholder name such as Organization1\.
  2. Change the placeholder name to the name of your organization, and add a description.
4. Add groups to your organization:
  1. Select the name of your organization and click **_Next_**.
  2. Click **_Add_** to add a group. You can specify the following:
    * the group Name, which is used internally by the Bonita software
    * the Display name, which is the group name displayed in lists and wizards
    * the Path, which shows the hierarchical relationship between groups
    * a Description of the group
  3. Click **_Add_** to add the next group, and continue until you have added all the groups required. Note that each time you add a group, it is added as a subgroup of the group that is currently selected (by default this is the last group added). You can change the group hierarchy by specifying the Path.
  4. When you have added all the groups you need, click **_Next_**.
5. Specify roles in your organization:
  1. Click **_Add_**, and add a role called member. This will be the default role for users within a group.
  2. Click **_Add_** and add the other roles you require. Typically, most organizations have a Manager role so the group manager can be easily identified, but the specific roles you require will depend on your processes. Remember that it is not necessary to copy all the role information from your business organization into your Bonita organization, but instead you should just create the roles that are useful in processes.
  3. When you have specified all the roles you require, click **_Next_**.
6. Add users to your organization.
  1. Click **_Add_**. A default username is added to the list of users. 
  2. You can change the username, but the value must be in a format the Bonita software can use: only unaccented alphanumeric characters are permitted plus a period (.).  
One option is to use the personal part of the user's email address, that is, the part before the @ sign.
  3. Specify a password for the user. The password characters are not displayed, so keep note of the password you choose.
  4. Specify the manager of the user. 
  5. In the **General** tab, specify the Title, First name, Last name, and Job title of the user.
  6. In the **Membership** tab, specify the groups that the user belongs to, and what role they have in each group.
  7. You can also specify **Personal contact** and **Professional contact** information for the user. 
7. Add all the users in your organization. When you have finished, click **_Finish_**.

## Exporting and importing an organization

You can export an organization definition from Bonita Studio. The exported file is in XML, so can be modified.  
You can import an organization definition in this XML format that was exported from another Bonita Studio running the same version of Bonita, or that was constructed by some other method but has the same format.  
Choose **Export...** or **Import...** from the **Organization** menu.

To prepare your production system (unless you are using the LDAP synchronizer), you must create the organization that you need for all the processes that will be deployed, export it from Bonita Studio, and import it into Bonita Portal. After the organization is imported into Bonita Portal, you can [manage groups](group.md), [roles](role.md), and [users](manage-a-user.md) in the organization.

## Modifying an organization

To modify an organization, choose **Manage...** from the Organization menu and use the same dialogs that you used to create the organization.  
To modify an item in an organization, select it in the item list and modify the information on the right-hand side of the list.  
To delete an item, select and it click **_Remove_**.

## Publishing an organization to Bonita Portal

Publishing an organization means uploading the organization data to Bonita Portal temporarily so that you can test your process.  
The organization that you publish overwrites one in Bonita Portal.

To upload organization data into the Portal permanently, so a process can run when Studio is not running, you need to export the organization from Studio and import it into Portal. Warning; importing an organization overwrites the existing organization in
Bonita Portal, which could have an impact on deployed processes.

To publish the organization data:

1. Choose **Publish...** from the Organization menu.
2. Click the organization to be uploaded, and
then click **_Next_**.
3. Specify the username and password of the user that will be
used to log in to Bonita Portal when a process is started from
Bonita Studio. This user must be in the organization you have
selected.
4. Click **Publish**.
