# Analytics

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

A report presents the Administrator with data about the usage of cases and tasks in processes. 

There are four reports available by default:

* Case average time - export in .pdf
* Case list - export in .pdf
* Task list - export in .pdf
* Case history - export in .csv

You can also [define](reporting-overview.md) and [install a custom report](#install). For example, you could define a report to track purchase order progress.

## Default reports

### Case average time

Choose a filter to display certain parameters:

* Case average time: period, processes
* Case list: period, state (all, archived, opened), processes (all)
* Task list: period, state (all, archived failed, opened)

### Case list

Choose a filter to display certain parameters:

* Case average time: period, process
* Case list: period, state (all, archived, opened), process (all)
* Task list: period, state (all, archived failed, opened)

### Task list time

Choose a filter to display certain parameters:

* Case average time: period, process
* Case list: period, state (all, archived, opened), process (all)
* Task list: period, state (all, archived failed, opened)

### Case history

For Efficiency and Performance editions.

This report lists human actions on cases. This enables you to analyse and standardize cases in processes.

In the case history report, the format of the exported file is a .csv file. This enables the data to be sorted and filtered.

#### Parameters

In the report, the **query** parameters are displayed in the **Parameters** section:

* Date range - Period with two fields **from** and **to** or select a **date**
* Process - Select **All** or a **specific process and version** 

If a selection is made in the **Process combo box**, the following combo box is displayed:

* Case ID list named "Cases" \> Select "All" or a specific case ID. This is only available when a process is selected

#### Generated export display

The generated .csv export contains the following in order of display:

* Date
* Time
* Case ID
* Process name
* Process version
* First name
* Last name
* User name
* Action
  * Started
  * Skipped
  * Failed
  * Done
* Task or Subtask
* Parent task name (only filled if there is a subtask created for a task)
* Due date
* Due time
* Overdue - (only filled if the task is done after the due date)

Note: what is not exported in the .csv report

* Comments
* Human actions performed on **Parameters and variables**

<a id="install"/>

## Install a custom report

You can import a customized report into Bonita BPM Portal.

Custom reports are created externally using [Jaspersoft Studio](http://community.jaspersoft.com/project/jaspersoft-studio).

### Contents of a .report archive (.zip), used in Jasper

The report archive (.zip) contains the Jasper file, a connection properties file and a .jar driver file.
Optionally, a properties file can be added if the report is localized in different languages.

### Install a report created in the standard Jasper format.

1. Go to **Analytics**.
2. Click the _**Install**_ button in the top left corner of the screen.
3. Name the report.
4. Select to your Jasper file (.zip) on your disk drive.
5. Click _**Install**_.

### Result

A report is displayed in Bonita BPM Portal containing your data.

## Export a report

A report in the Bonita BPM Portal can be exported as a .pdf file.

1. Go to **Analytics**.
2. Select the report that you want to export. This can be one of the default reports, or a custom report that you have installed.
3. Click the _**More**_ button.
4. Click the _**Export**_ button.
5. Specify where the report PDF file will be saved.
6. Click _**OK**_.

## Manage Japanese PDF reports

Japanese language support for reports is not provided by default. 
In order to display the Japanese translations in the default PDF reports, you need to download the Japanese translation `my_report_ja_jp.properties` file from [Crowdin](http://translate.bonitasoft.org/). 
If the tenant is deployed and your report has been displayed, open the directory of the report in the Bonita Home folder
(`bonita/client/tenants/`_`yourTenantId`_`/work/reports/`_`yourReport`_). 
Then add your "ja\_jp.properties" translation files to this directory. 
If your report has never been displayed, go to your deployed war or ear \> `WEB-INF\classes` then edit your report zip file to add the Japanese properties file.
