# Migrate a process from Bonita Open Solution 5.x

A process exported from Bonita Open Solution 5.x must be modified to run in Bonita BPM because of the modifications and new features.  
Bonita BPM provides a guided migration for importing a process from 5.9 or 5.10 to the Bonita BPM legacy 6.x concepts and tooling.  
You can then modify the process definition to take advantage of the new features in the latest version of Bonita BPM.  
To migrate a process from a version of Bonita Open Solution earlier than 5.9, you must first upgrade it to 5.9\.

When you import a process from Bonita Open Solution 5.9 or 5.10, Bonita BPM automatically modifies the process where possible, and provides a report indicating the items that need to be checked or that must be modified manually. You can use this report to track the status of the modifications required as you complete them.

To migrate a process from Bonita Open Solution 5.9 or 5.10:

1. Choose **Import** -> **Other..** from the **Diagram** menu.
2. Select the Bonita BAR 5.9/5.10 input format, and select the file to be imported.
3. Click **_Import_**.
4. A pop-up explaining the format of the import status report is displayed. You can choose not to see this popup for subsequent imports.
5. Click **_Finish_**. The process is imported and Bonita BPM Studio displays an Import status report. This report lists the status of each item in the process definition.
6. Select an item to see what migration action has been done, or to see what manual action is required.

When an item has been completely migrated, either automatically or after review or manual action, check the box in the Reviewed column.   You can use this column to track what remaining migration is required.

At any stage during migration, you can close the report and move out of migration mode. Note, however, that when you have closed the report you cannot reopen it. To close the report,click on **_Exit import mode_**.

You can modify the view of the report as follows:

* You can sort the report by any of the columns by clicking on the relevant column heading.
* You can hide all items that have valid changes, by choosing **Hide valid changes** from the report menu.
* You can hide all reviewed changes, by choosing the **Hide reviewed changes** from the report menu.

You can also create a PDF version of the report, by choosing **Export PDF** from the report menu.
