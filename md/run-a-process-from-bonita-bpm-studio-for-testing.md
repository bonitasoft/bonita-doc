# Run a process in Bonita Studio

You can run a process from Bonita Studio. Bonita Studio includes a test environment with all the components required to execute a process.

When you run a process from Bonita Studio it runs on the local Bonita server. The server includes an Java application server (Tomcat), two databases (h2), Bonita Engine and Bonita Portal. Running a process from Bonita Studio is intended for testing during process development.

Before you can run a process, you must [configure the process](configuring-a-process.md)
and [configure the organization](organization-management-in-bonita-bpm-studio.md).

To run a process, open the process diagram and select the pool, then click **_Run_** in the Cool bar. The process in the selected pool runs. Only one pool can be run at a time.

If you are using the Performance, Efficiency, or Teamwork editions, you can select the environment in which to run the process. The 
process must be configured for the environment in which it runs.

There are two modes in which you can run a process, standalone and portal:

* Standalone mode uses templates to contain the form application, These templates are editable in Studio. When you run a process from the Studio, it runs in standalone mode.
* Portal mode uses a different container. When you run a process from the Portal, it runs in portal mode.
This means that if you include a script in the templates, which are the standalone container, the script cannot be called by the process when it runs in portal mode.

To include a script in a process so it can be used in portal mode, there are the following options:

* In the form, add an HTML widget that contains ``.
* In the Portal, use a [custom Look & Feel](managing-look-feel.md) that includes the JavaScript files between the `` tags of `BonitaForm.html`. 
This makes the script available for all forms in all processes launched from the Portal. 

To include a script in a process so it can be used in standalone mode:

* In Studio, define a custom look & feel for the Application and include the script in one of the template HTML files. The script is then available for all steps in the process.

After a process is [deployed and initialized](processes.md) in Bonita Portal, it is run by [starting a case](cases.md).
