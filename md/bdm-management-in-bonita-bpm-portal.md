# 3.3.6 BDM Management in Bonita BPM Portal

Processes using Business Objects with persisted data need to run with a Business Data Model deployed in the Bonita BPM Portal.
Only one model can be deployed at a time in the Portal, so make sure it contains the Business object definition used in all processes that will run within this tenant.


The Business objects must match the structure used by the deployed processes. Make sure that when modifying the Business Model, the process is modified accordingly.


## How to import and activate a Business Data Model

1. To import the Business Data Model created in Bonita BPM Studio, first [](/business-data-model-856#exportabdm)export the Business Data Model from Bonita BPM Studio where it was designed.

2. In the Bonita BPM Portal, log in as the technical user (default login 'install', default password 'install').
3. Go to the **BPM Services** menu.
4. Click on **Pause** to [](/pause-and-resume-bpm-services-1)pause the tenant. 


**Note:** The deployment of a Business Data Model requires pausing the service during the operation, so that the update can be performed without affecting ongoing processes. 

5. When the service is paused, go to the **Business Data Model** menu.
6. A page called **Import and activate a new Business Data Model** is displayed.
7. Choose the file containing the Business Data Model exported from the Bonita BPM Studio, and click on _**Activate**_.
8. A warning is displayed:



**Warning:** The Business Data Model will now be installed.
Please note that existing business database tables will be modified definitively. This action cannot be reversed. It is highly recommended to back up the database before proceeding.

9. The Portal will load the file, retrieve the object definition and enable processes to use them at runtime. The portal will also create or update the database schema (set of tables, columns, indexes...)
in the business database, so as to store business objects appropriately when modified by processes. 
10. The Business Data Model will now be installed.
11. Go to the **BPM Services** menu.
12. Click on **Resume** to [](/pause-and-resume-bpm-services-1#how_unpause)resume tenant activity.

**Note:** the database model is automatically updated. You should avoid changing the database schema manually as it may jeopardize the persistence of business objects and cause errors at process runtime.
It is recommended to perform a backup of the business database before deploying a business data model.
(If the deployment fails, check the engine logs to analyse the problem.)