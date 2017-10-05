# BDM Management in Bonita Portal

Processes using Business Objects with persisted data need to run with a Business Data Model deployed in the Bonita Portal.
Only one model can be deployed at a time in the Portal, so make sure it contains the Business object definition used in all processes that will run within this tenant.

The Business objects must match the structure used by the deployed processes. Make sure that when modifying the Business Model, the process is modified accordingly.

1. To import the Business Data Model created in Bonita Studio, first [export the Business Data Model](define-and-deploy-the-bdm.md) from Bonita Studio where it was designed.
2. In the Bonita Portal, log in as the technical user (default login 'install', default password 'install').
3. Go to the **BPM Services** menu.
4. Click on **Pause** to [pause](pause-and-resume-bpm-services.md) the tenant.

::: info
**:fa-info-circle: Note:** The deployment of a Business Data Model requires pausing the service during the operation, so that the update can be performed without affecting ongoing processes. 
:::

5. When the service is paused, go to the **Business Data Model** menu (and, for Efficiency and Performance editions, choose **Definition**).
6. A page called **Import and activate a new Business Data Model** is displayed.
7. Choose the file containing the Business Data Model exported from Bonita Studio, and click on _**Activate**_.
8. A warning is displayed:

::: warning
**:fa-exclamation-triangle: Warning:** The Business Data Model will now be installed.
:::

Please note that existing business database tables will be modified definitively. This action cannot be reversed. It is highly recommended to back up the database before proceeding.
9. The Portal will load the file, retrieve the object definition and enable processes to use them at runtime. The portal will also create or update the database schema (set of tables, columns, indexes...)
in the business database, so as to store business objects appropriately when modified by processes. 
10. The Business Data Model will now be installed.
11. Go to the **BPM Services** menu.
12. Click on **Resume** to [resume tenant activity](pause-and-resume-bpm-services.md).

::: info
**:fa-info-circle: Note:** the database model is automatically updated. You should avoid changing the database schema manually as it may jeopardize the persistence of business objects and cause errors at process runtime.
:::

It is recommended to perform a backup of the business database before deploying a business data model.
(If the deployment fails, check the engine logs to analyse the problem.)  

::: info
**Note:** For Efficiency and Performance editions only.
:::

It is possible to define Business Data Model access control rules in Bonita Studio and import them in Bonita Portal.  
The Access control rules must match the Business Data model.

1. To import the BDM access control rules created in Bonita Studio, first [export the Access Control file](bdm-access-control.md) from Bonita Studio where it was designed.
2. In the Bonita Portal, log in as the technical user (default login 'install', default password 'install') or as a user with the administrator profile.
3. As the technical user, go to the **Business Data Model** menu and choose **Access Control**. As an administrator, go to the **BDM** menu.
4. A page with a section **Import a BDM access control file** is displayed.
5. Choose the file containing the Business Data Model access control definition exported from Bonita Studio, and click on _**Import**_.
6. A successful import message will be displayed.

Please note that a delay is required after the import for the engine to process the access control and for the filtering to be effective.

::: info
**:fa-info-circle: Note:** Contrary to the BDM definition, the deployment of a Business Data Model access control file doesn't require pausing the BPM services during the operation. 
:::

