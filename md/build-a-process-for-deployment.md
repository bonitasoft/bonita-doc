# Build a process for deployment

Build deployment artifacts that will allow you to install your process onto a server. 

## How to

When a process is ready for deployment, build an archive file in Bonita Studio that can be installed in Bonita Portal.
You also need to initialize the organization information needed in Bonita Portal.

A process is deployed by installing a business archive (.bar) file in Bonita Portal.
To create the business archive you can :

1. Choose **Build...** from the **Server** menu.
2. Select the process to be exported.
3. Specify whether you want to export a configuration with the process. 
   Exporting a configuration will export all the information and other items that you configured, including connectors and dependencies.
4. Specify the location where the .bar file will be created. The filename is determined by the process name and cannot be changed at this stage.
5. Click **Finish**. The business archive is created.

or

1. Right click on a diagram on the project explorer
2. Select a process on the menu Build
3. Specify the location where the .bar file will be created. The filename is determined by the process name and cannot be changed at this stage.
4. Click **Finish**. The business archive is created.

When you build a process from the project explorer, the configuration used is the configuration saved as default. You can edit it from the [configure menu](configuring-a-process.md)

You can now [install the process in Bonita Portal](processes.md).

## Initialize the organization in Bonita Portal

To prepare your production system (unless you are using a Subscription editions and the LDAP synchronizer), 
you must create the organization that you need for all the processes that will be deployed, export it from Bonita Studio,
and import it into Bonita Portal. 

To export the organization, go to the **Organization** menu and choose **Export...**. You
can then [import the organization into Bonita Portal](import-export-an-organization.md). After the organization is imported into Bonita Portal, 
you can [manage the groups](group.md), [roles](role.md), and [users](manage-a-user.md) in the organization.
