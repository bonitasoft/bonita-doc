# 1.7.2.12 Migrate a form from 6.x

Although a form created with Bonita BPM 6.x will work with Bonita BPM 7.x, you are recommended to migrate your 6.x forms and process definitions to take advantage of the new features. 
There is no specific tooling to assist with migration, and you do not have to migrate all apsects of a process definition at the same time. 
You can take a staged approach, testing that your process continues to behave as expected after each change.

The most efficient sequence for migrating a process and its forms to use the Bonita BPM 7.x features is as follows:

1. BDM: create your [business data model](/define-and-deploy-the-bdm.md). If you already have a BDM from 6.x, no changes are needed.
2. Business data: if you created a new BDM, populate your business data database with the data by importing it from where it was previously stored (process data ort external data). 
You can do this with a process that uses a connector to retrieve external data and an operation using the REST API to store the business objects.
3. Process: check that the process runs with the business data, and update it if necessary.
4. Contracts: define [contracts](/contracts-and-contexts.md) for process instantiation and for each human task.
5. Forms: generate the forms from the contracts, then update them as needed.