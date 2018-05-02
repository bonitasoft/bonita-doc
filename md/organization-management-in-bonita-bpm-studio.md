# Organization management in Bonita Studio

In Bonita, the organization is the set of users who performs tasks in your business processes.

Within Bonita Studio, more than one organization can be defined. This is useful if you are developing a process that will be deployed in several different organizations. It is also useful for testing, because you can create a reduced version of your organization that has the same structure but fewer users, saving time in managing your test environment.

## The ACME example organization

Bonita Studio includes a sample organization, called ACME. This organization contains a small number of users, who belong to different groups, with realistic roles.

You can use this example organization to explore how to manage an organization in Bonita Studio, for example by adding a user, or changing the role of a user.

You can also use this sample organization to test a process that you develop.

## Creating an organization

You must load an organization into Bonita Engine before running a process. There are two ways to do this:

* Create the organization in Bonita Studio, export it, and then import it into Bonita Portal.
* If you have a Subscription edition, use the [LDAP synchronizer](ldap-synchronizer.md) to automatically load information from your LDAP directory into Bonita Engine. 

To specify an organization manually, you create the organization, create the group hierarchy, specify roles, and then add users and their memberships. 

1. Start Bonita Studio.
1. Go to the Organization menu and select **Manage....**
1. Add a new organization:
   * Click **_Add_**. A line will be added to the table of organizations, with a placeholder name such as Organization1\.
   * Change the placeholder name to the name of your organization, and add a description.
1. Add groups to your organization:
   * Select the name of your organization and click **_Next_**.
   * Click **_Add_** to add a group. You can specify the following:
     * the group Name, which is used internally by the Bonita software.
		::: warning
		**NB:** Bonita doesn't support the '/' character in the group name field. A group name that contains a '/' may lead to unstable behaviour and may be forbidden in the future.
		:::
     * the Display name, which is the name displayed in Bonita Portal
     * the Path, which shows the hierarchical relationship between groups
     * a Description of the group
   * Click **_Add_** to add the next group, and continue until you have added all the groups required. Note that each time you add a group, it is added as a subgroup of the group that is currently selected (by default this is the last group added). You can change the group hierarchy by specifying the Path.
   * When you have added all the groups you need, click **_Next_**.
1. Specify roles in your organization:
   * Click **_Add_**, and add a role called _member_. This will be the default role for users within a group.
   * Click **_Add_** and add the other roles you require. Typically, most organizations have a Manager role so the group manager can be easily identified, but the specific roles you require will depend on your processes. Remember that it is not necessary to copy all the role information from your business organization into your Bonita organization, but instead you should just create the roles that are useful in processes.
   * When you have specified all the roles the processes/applications require, click **_Next_**.
1. Add users to your organization.
   * Click **_Add_**. A default username is added to the list of users. 
   * You can change the username, but the value must be in a format Bonita can use: only unaccented alphanumeric characters are permitted plus a period (.).  
One option is to use the personal part of the user's email address, that is, the part before the @ sign.
   * Specify a password for the user. The password characters are not displayed, so keep note of the password you choose.
   * Specify the manager of the user. 
   * In the **General** tab, specify the Title, First name, Last name, and Job title of the user.
   * In the **Membership** tab, specify the groups that the user belongs to, and what role they have in each group.
   * You can also specify **Personal contact** and **Professional contact** information for the user. 
1. Add all the users needed to test your processes and applications. 
1. When you have finished, click **_Finish_**.

## Exporting and importing an organization

You can export an organization definition from Bonita Studio. The exported file is in XML, so can be modified.  
You can import an organization definition in this XML format that was exported from another Bonita Studio running the same version of Bonita, or that was constructed by some other method but has the same format.  
Choose **Export...** or **Import...** from the **Organization** menu.

To prepare your production system (unless you are using the LDAP synchronizer), you must create the organization that you need for all the processes that will be deployed, export it from Bonita Studio, and import it into Bonita Portal. After the organization is imported into Bonita Portal, you can [manage groups](group.md), [roles](role.md), and [users](manage-a-user.md) in the organization.

## Modifying an organization

To modify an organization, choose **Manage...** from the Organization menu and use the same dialogs that you used to create the organization.  
To modify an item in an organization, select it in the item list and modify the information on the right-hand side of the list.  
To delete an item, select and it click **_Remove_**.

## Deploying an organization to Bonita Portal

Deploying an organization means uploading the organization data to Bonita Portal temporarily so that you can test your process.  
The organization that you deploy overwrites one in Bonita Portal.

::: warning
Importing an organization overwrites the existing organization in Bonita Portal, which could have an impact on deployed processes.
:::

To deploy the organization data:

1. Choose **Deploy...** from the Organization menu.
2. Click the organization to be deployed, and
3. Specify the username of the user that will be
used to log in to Bonita Portal when a process is started from
Bonita Studio. This user must be in the organization you have
selected.
4. Click **Deploy**.

## Profile management

In order to log in to bonita UIs (Portal, applications...), a user must have at least one profile (User, Adminstrator...etc).

**_In Community_**, only provided profiles are supported (User and Adminstrator). When deploying an organization from the Studio, each user is automatically mapped to all those profiles.

**_In Teamwork edition_**, 3 provided profiles (User, Process Manager and Adminstrator) can be edited in the Studio using an XML editor (Go to Organization > Profiles > Open). For development purposes, all users mapped to role _member_ (cf _ACME_ organization) will benefit from all profiles in the Portal to let you log in with any of those users and test your processes.
This will not be true for other environments.

**_In Efficiency, Performance and Entreprise editions_**, in addition to provided profiles it is possible to defined custom profiles in the Studio using the [Profile Editor](profileCreation.md).

When creating or importing other organizations, you need to make sure that all users are mapped to at least one profile, through a group, a role, a membership, or as a user, to grant them access to Bonita Portal or applications.

