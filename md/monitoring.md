# Monitoring

::: info
**Note:** For Performance and Efficiency editions only.
:::

Monitoring gives information relative to a process.

This is only available to the Administrator and Process Manager profile.

Go to **Process management \> Monitoring** for Administrator and **Monitoring** for Process Manager.

The **Monitor open cases** page is displayed, with the following summary information:

* Number of cases with failure
* Number of healthy cases
* Number of open cases
* A table of open cases

You can filter the table to show only a specified process, or process and version. You can also filter it by case state.

Process Manager users can see only the processes they manage.

From a row in the table, you can click the list icon to see a list of cases of the process. 
You can also open a diagram of a process, by clicking on the picture icon for the process. On the diagram, you can see that number and state of cases in progress at each step.
Click **_Show key_** to see an explanation of the display. 

The process diagram is constructed from the deployed process definition. This means that some details visible in Bonita BPM Studio, such as comments, are not available.

Note: if a process was deployed from a bar file created in Bonita BPM Studio 6.3 or earlier, the diagram display is not available. 
This is because some details of the `.bar` structure have changed. 
To see the diagram for such a process, export the process definition from Bonita BPM Studio 6.3 as a `.bos` file, import it into Bonita BPM Studio 6.4 or later, generate a new `.bar` file, and deploy it.
