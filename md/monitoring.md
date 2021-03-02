# Monitor open cases

This page describes the "Monitor open cases" page of the Administration profile in Bonita Portal and in the [Bonita Administrator Application](admin-application-overview.md).  
In this page, _Administrators_ and _Process Managers_ can have a complete view of the sanity of the BPM operations, filter by process, access the process visualization and case details of a process. 

::: info
**Note:** For Enterprise, Performance and Efficiency editions only.
:::

Here is a view of the Monitoring page
![Monitoring](images/UI2021.1/monitoring.png)<!--{.img-responsive}-->

Go to _BPM_> _Monitoring_ for Administrator and _Monitoring_ for Process Manager.
The **Monitor open cases** page is displayed, with the following summary information:

- Number of cases with failure
- Number of healthy cases
- Number of open cases
- A table of open cases

You can filter the table to show only a specified process, or process and version. You can also filter it by process activation state.

Process Managers can see only the [processes they manage](process-manager.md).

From a row in the table, you can click the _List_ icon to see a list of cases of the process. 
You can also open a diagram of a process, by clicking on the _Picture_ icon for the process. On the diagram, you can see the number and state of cases in progress at each step.
Click on the _Show key_ button to see an explanation of the display. 

The process diagram is constructed from the deployed process definition. This means that some details visible in Bonita Studio, such as descriptions are not available.

::: info
Note: if a process was deployed from a .bar file created in Bonita Studio 6.3 or earlier, the diagram display is not available. 
This is because some details of the `.bar` structure have changed. 
To see the diagram for such a process, export the process definition from Bonita Studio 6.3 as a `.bos` file, import it into Bonita Studio 6.4 or later, generate a new `.bar` file, and deploy it.
:::
