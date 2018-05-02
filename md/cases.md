# Cases

Logged on with the Administrator or Process Manager profile, you have rights to manage a case as follows:

## Add a comment to a case

1. Go to **BPM** \> **Cases**
2. Click a _**Case id**_ or _**ellipsis**_ icon.
3. Enter a comment in the **comment field**
4. Click _**Add comment**_

## Start a case for another user

This feature is available with the Efficiency, Performance and Entreprise editions.

To start a case for another user:

1. Go to **BPM** \> **Processes**.
2. Select the process and click **_Start for_**.
3. In the popup, specify the user for whom you are starting the case. Only valid users for the case are displayed.
4. Click **_Start_**.

The case is started as though the specified user had started it. 
For example, if a you start a case for user A and a subsequent task is to be done by the manager of the user, it is assigned to user A's manager, not to your manager.

## View status of cases

To view the open or archived cases, go to **BPM** \> **Cases**. The case table is displayed, showing the open cases. 
To switch between **Open cases** and **Archived cases** cases, use the tabs.

In a row in the table, you can click a case id or the ellipsis icon to open the case details page, or click the process name to open the process details page. 

You can change the view to see only the information that you need:

* View the cases of a specified process, by selecting the process name, or name and version, from the dropdown lists.
* Search indexes are also available as additional columns. In this way, you can use search indexes for adding business information to your cases. It is also possible to search on search indexes values.
* Filter the cases by state, by choosing **With failures** or **All** from the **State** dropdown list. 
The **Failed tasks** column shows the number of failed tasks and tasks where a connector has failed when starting or ending a case. A connector failure at a task is counted as a task failure. 
Connector failures on case start or end are shown by an exclamation point (!).
* Add or remove a column in the table, by selecting or deselecting it in the **Columns** menu.
* Change the column order, by dragging and dropping the column name in the **Columns** menu.
* Sort the table in ascending or descending order of one of the columns, by clicking arrow beside the column header. 
If the table is already sorted by the column you select, the first click reverses the sort order. If the table is currently sorted by some other column, clicking the header sorts by this column in ascending order. 
You can then click on the arrow to reverse the sort order. 

These changes to the view are stored in your browser [Local Storage](https://en.wikipedia.org/wiki/Web_storage#Local_and_session_storage): If you navigate away from the page then go back, the view will be as you configured it. If you reload the page, or close and reopen the same browser, your stored changes will be reapplied. If you want to go back to the default view settings, clear your browser cache and local storage.

From this table, you can delete a cases, or several cases. Select the cases you want to delete, and click **_Delete_**. Confirm in the popup that you want to delete the selected cases.

if you are using the Entreprise, Performance or Efficiency edition, you can also open a diagram of a case, by clicking on the picture icon for the case. 
On the diagram, colored flags on the steps show the number of step instances in the possible states. Click **_Show key_** to see an explanation of the display. 
Remember that a failure at a step does not necessarily mean that the case has failed entirely, but it might indicate that some action is needed, perhaps to replay a connector.

The process diagram is constructed from the deployed process definition. This means that some details visible in Bonita Studio, such as comments, are not available.

Note: if a process was deployed from a bar file created in Bonita Studio 6.3 or earlier, the diagram display is not available. This is because some details of the .bar structure have changed. 
To see the diagram for such a process, export the process definition from Bonita Studio 6.3 as a .bos file, import it into Bonita Studio 6.4 or later, generate a new .bar file, and deploy it.