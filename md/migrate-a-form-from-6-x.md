# Migrate a form from 6.x

Although a form created with Bonita 6.x will work with Bonita 7.x, you are recommended to migrate your 6.x forms and process definitions to take advantage of the new features, namely live update of a form.   
There is no specific tooling to assist with migration, and you do not have to migrate all apsects of a process definition at the same time.  
You can take a staged approach, testing that your process continues to behave as expected after each change.

The most efficient sequence for migrating a process and its forms to benefit from Bonita 7.x features is as follows:

1. BDM: create your [business data model](define-and-deploy-the-bdm.md). If you already have a BDM from 6.x, no change is needed.
2. Business data: if you have created a new BDM, populate your business data database by importing it from where it was previously stored (process data or external data).  
You can do so with a process that uses a connector to retrieve external data and an operation using the REST API to store the business objects.
3. Process: check that the process runs with the business data, and update it if necessary.
4. Contracts: define [contracts](contracts-and-contexts.md) based on your business data, for process instantiation and for each human task.
5. Forms: generate the forms from the contracts into the UI Designer, then update them as needed. 
6. In the Studio, at pool level and for each human task, go to the **_Details_** panel, **_Execution_** tab, **_Form_** section, and change the option from **Legacy (6.x)** to **_UI Designer_**. You can also generate them in another development environment. In this case, choose **_External URL_** option.

When you export a diagram, forms created in the UI Designer are embedded by default in the .bos and .bar files, to share between Bonita Studios (.bos) or install in a Bonita Portal (.bar), so you don't need to manually export them and import them one by one.
