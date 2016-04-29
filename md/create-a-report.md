# 1.10.4 Create a report

The final step when setting up reporting is to create a report template using a Business Intelligence (BI) tool.

You are free to choose any BI tool to do so, but if you want to display reports inside the Bonita BPM Portal you should design your reports using one of the following tools:

* [JasperReports iReport Designer](http://community.jaspersoft.com/project/ireport-designer) - Older stable tool in maintenance mode
* [Jaspersoft Studio](http://community.jaspersoft.com/project/jaspersoft-studio) - Newer tool

## Bonita BPM integration guidelines and tips for Jasper reports

This documentation does not detail the use of Jaspersoft Studio but provides some guidelines for report integration in Bonita BPM Portal. 
There are minor differences depending on which Japsersoft tool you are using, but these concern the user interface of the Japsersoft tools, not the Bonita BPM behavior.
For details about the use of the Jaspersoft products, please refer to their documentation:

* [JasperReports iReport Designer documentation](http://community.jaspersoft.com/project/ireport-designer/resources)
* [Jaspersoft Studio documentation](http://community.jaspersoft.com/project/jaspersoft-studio/resources)

### Change the script language to Java

By default Jasper reports use Groovy as a script language. 
However, Bonita BPM Portal does not provide Groovy dependencies to the report so you need to switch the report script language to Java.


This is how to do this for iReport:

1. In the **Report inspector** tree located on the left-hand side, select the root element.
2. In the properties table located on the right-hand side, locate the **Language** property and change it to **Java**.

### Access Bonita BPM database

If you build a report that requires access to the Bonita BPM database, you need to add the Bonita BPM SQL Query Executor as a report dependency.
All queries that fetch Bonita BPM Engine data must use this query executor.


This is how to add the query executor as a report dependency in iReport:

1. Open the **Tools** menu and select **Options**.
2. Make sure the **iReport** header is selected.
3. Select the **Query Executers** tab.
4. Click on the **_Add_** button.
5. Fill the form using the following values:
FieldValue

LanguageBONITASQL

Factory classorg.bonitasoft.JRBonitaJdbcQueryExecuterFactory

Fields Provider class (optional)com.jaspersoft.ireport.designer.data.fieldsproviders.SQLFieldsProvider


6. Click on **_OK_**.
7. Still in the **Options** window, select the **Classpath** tab.
8. Click on **_Add JAR_**.
9. Browse to your Bonita BPM Studio installation directory and navigate to `workspace/tomcat/webapps/bonita/WEB-INF/lib/`.
10. Select the `console-server-sp-X.Y.Z.jar` file, where `X.Y.Z` is the Bonita BPM version.
11. Click on **_Open_**.

### Add interactivity with Bonita BPM Portal to your report

When creating a report you may need to enable Bonita BPM Portal users to interact with it.
Bonita BPM Portal integration of the Jasper report viewer makes interactivity possible by providing widgets that can control report parameters.
Widgets are configured directly in the Jasper report as properties.


Here is the sequence of events when an interactive Jasper report is displayed in Bonita BPM Portal:

1. Bonita BPM Portal reads the report properties and generates an HTML form containing the widgets.
2. The HTML code is injected as a report parameter by Bonita BPM Portal.
3. The report renders the HTML code using the parameter.
4. The end-user can then interact with the widgets and the report is automatically re-generated if a value changes.

To enable interactivity, the first thing to do is to prepare the HTML form rendering parameter and component.

This is how to do this in iReport:

1. In the **Report Inspector** tree, right click on **Parameters** and select **Add Parameter**.
2. In the parameter properties, update the **Name** property to `BONITA_HTML_FORM`.
3. Drag and drop an **HTML** component from the **Palette** onto your report's **Title** section.
4. Select the **HTML** component that you have added.
5. In the component properties, set the **HTML Content Exp.** property to `$P{BONITA_HTML_FORM}`.

When the HTML form rendering parameter and component are ready, you need to set the report properties to configure the widgets that your report will integrate.


All widgets share the following mandatory properties (`XXX` is replaced by a number used to identify the widget):
Property
Mandatory
Description

BONITA\_FORM\__XXX_\_ID
Yes
Base name of the report parameter that will be updated with the widget value.  

Special rules apply depending on the widget type (see next parameter):  

* For a **SELECT** widget, the parameter name is the same as the base name.  

Example: if `BONITA_FORM_1_ID` is set to `p_country` then, the report parameter should be named `p_country`.
* For a **DATE** widget, the value will be saved to a parameter with the **\_from** suffix.  

Example: if `BONITA_FORM_2_ID` is set to `p_birthday`, then the report parameter should be named `p_birthday_from`.
* For a **DATE\_RANGE** widget, the values will be saved to two parameters: one with a **\_from** suffix and one with a **\_to** suffix.  

Example: if `BONITA_FORM_3_ID` is set to `p_period`, then the two report parameters should be named `p_period_from` and `p_period_to`.



BONITA\_FORM\__XXX_\_WIDGET
Yes
Widget type. Can be one of the following:

* `SELECT` for a drop down allowing a single selection
* `DATE` for a date picker
* `DATE_RANGE` for a date range picker with a start date and an end date


BONITA\_FORM\__XXX_\_LABEL
Yes
Widget label

The **SELECT** widget has the following extra properties:
Property
Mandatory
Description

BONITA\_FORM\__XXX_\_AVAILABLE\_VALUES
Yes: one of these two properties is required
Static list of available values defined in a JSON format.  

Example: `[{"id":"FR","label":"France"}, {"id":"US","label":"United States of America"}, {"id":"ES","label":"Spain"}]`


BONITA\_FORM\__XXX_\_QUERY
Query that dynamically retrieves the list of available values from the Bonita BPM database.

BONITA\_FORM\__XXX_\_HAS\_ALL
No
Set this to `TRUE` if you wish to dynamically add an "All" item to the list of available values. Otherwise, ignore this property.

BONITA\_FORM\__XXX_\_HAS\_ALL\_VALUE
Only if the "All" item is active
Specifies the value returned when the "All" item is selected.

The **DATE** and **DATE\_RANGE** widgets have the following extra properties:
Property
Mandatory
Description

BONITA\_FORM\__XXX_\_INITIAL\_VALUE
Yes: one of these two properties is required
Static initial value defined in the ISO format.  

Example: `2015-01-28`

BONITA\_FORM\__XXX_\_QUERY
Query that dynamically retrieves the initial value from the Bonita BPM database.

Create the report properties using iReport as following:

1. In the **Report Inspector** tree, right click on the report's name and select **Properties**.
2. In the **More** section, configure **Properties** by clicking on **...**
3. Add the properties based on the widgets you need.

Here is an example of a report configuration containing a "Period" date range and a "State" select widget:
![Widget property example in iReport](images/images-6_0/exampleswidgets.png)

### Package a report for Bonita BPM Portal integration

In order to integrate a Jasper report in Bonita BPM Portal, you need to prepare a ZIP archive.


The archive should contain at least the compiled Jasper report (a file with a .jasper extension).

If your report requires a connection to the reporting database, the archive must contain:

* The JDBC driver jar file used to connect to the reporting database. Do not include this file in the archive if the driver is already deployed at server level.
* A _connection.properties_ text file that contains the reporting database connection settings:
PropertyDescription

dbUrlJDBC Url to access the reporting database

dbDriverClassNameThe JDBC driver's class name

dbUserThe login of the database user

dbPasswordThe password of the database user

For example, connecting to a local MySQL database named _BonitaReport_ with a user _root_ and password _root_:
`
dbUrl=jdbc:mysql://localhost:3306/BonitaReport
dbDriverClassName=com.mysql.jdbc.Driver
dbUser=root
dbPassword=root
`


If your report contains sub reports, these should be placed in a directory named `sub`.

If your report uses a style sheet you may also provide a .jrtx file in the archive.


Once you have packaged the Jasper report as a ZIP archive, you can [install it in the Bonita BPM Portal](/analytics.md#install).