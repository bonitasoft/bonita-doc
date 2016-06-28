# Organization in Bonita BPM Portal overview

In Bonita BPM Portal, a user with the Administrator profile active can view all the parts of an organization including:

* the parent groups
* child groups
* the number and list of users in a group
* the manager of each user
* the email address of a user
* the date and time of the user's last login
* the roles created and the number of users with that role

The Administrator has the right to:

* [import an organization exported from Bonita BPM Studio](import-export-an-organization.md)
* [export an organization from Bonita BPM Portal](import-export-an-organization.md)
* [create and delete groups](group.md)
* [create and delete roles](role.md)
* [create and manage users](manage-a-user.md) and manage memberships

**Developer environment:** When you are testing a process locally by running it from Bonita BPM Studio, the default organization defined in the Studio is **automatically published** to the Bonita BPM Portal.

**Production environment:** When you first launch Bonita BPM Portal in a Production environment, there is **no default organization**.
You must [create a user with the Administrator profile](first-steps-after-setup.md). This user can than create and manage the organization.
