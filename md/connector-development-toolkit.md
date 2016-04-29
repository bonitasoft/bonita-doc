# 4.3.2 Connector development toolkit

* [Overview](#overview)
* [Installation](#install)
* [Creating a new connector definition](#creatingConnectorDef)
* [Creating a new connector implementation](#creatingConnectorImpl)
* [Widget types and parameters](#widgetTypeReference)
  * [Mandatory common widget parameters](#mandatory-common)
  * [Optional common widget parameters](#optional-common)
  * [RadioGroup widget parameters](#typeRadioGroup)
  * [Select widget parameters](#typeSelect)
  * [Array widget parameters](#typeArray)
  * [List widget parameters](#typeList)
  * [Group widget parameters](#typeGroup)


## Overview


The Connector Development Toolkit is a set of tools for implementing and testing Bonita BPM connectors independently of the Bonita BPM Studio.  

A connector implemented with the toolkit can be used in Bonita BPM Studio or in Bonita BPM Portal just like any Bonita BPM connector.


This toolkit uses industry-standard tools such as Java IDEs, dependency management tools (Maven), and unit testing frameworks (JUnit, Mockito and AssertJ). 
It has the following benefits for connector developers:

* You can use any Java IDE for implementation, so you have access to all configuration options and can make use of convenient features such as refactoring.
* You can unit test connectors, perform integration tests, and automate builds with a CI platforms.
* It simplifies refactoring of connector wizards, by enabling them to be regenerated them at any time.
* It simplifies dependency management and connector artifact version management, by leveraging Maven capabilities.

## Installation

### Prerequisites

To develop and test a Bonita BPM connector with the toolkit, you need the following software installed:

* Java 7 or later
* Maven 3.2.x or later

### Installation procedure

1. Download the toolkit from the Customer Portal.
2. Unzip the toolkit file into a temporary installation folder.
3. Run either `install.bat` for Windows users or `install.sh` for Mac or Linux users.
4. When the installer has finished, delete the temporary installation folder because you no longer not need.

## Creating a new connector definition


1. Open a command window and navigate to the folder that will hold your connector definition.
2. Prepare to run the following command (Windows users: remove the trailing slashes and edit the content to have everything on a single line):
`
mvn archetype:generate \
    -DinteractiveMode=false \
    -DarchetypeGroupId=com.bonitasoft.connector.definition \
    -DarchetypeArtifactId=bonita-connector-definition-archetype \
    -DarchetypeVersion=1.0 \
    -DgroupId=com.mycompany.connectors \
    -DartifactId=myFirstConnector \
    -Dversion=1.0.0
`

Before running the command, update the following parameter values:
Parameter
Description

archetypeVersion
This must match the version of the toolkit.

groupId
Maven project group id.

artifactId
Maven project artifact id and Bonita BPM connector definition id.

version
Maven project version and Bonita BPM connector definition version.

  


3. Run the command. This generates a new folder named `artifactId` containing the connector definition project files, as follows:
`
/
    src/main/resources/
        category-icon.png
        connector_definition.xml
        connector-icon.png
    pom.xml
`

4. Configure the `src/main/resources/connector_definition.xml` file to define the connector wizard pages with their inputs, widgets,and outputs 
(see [Connector widget reference](#widgetTypeReference) for details).
5. Optionally, change the icons for the connector and the connector category in the `src/main/resources` folder.

## Creating a new connector implementation

A connector definition can hold multiple implementations so the steps described in this section can be repeated.  

All implementations will be stored under the definition project folder.


**Caution:** Connector implementations that are not located under the definition project folder will not compile.


1. Open a command window and navigate to the folder that contains the connector definition project.
2. 
Prepare to run the following command (Windows users: remove the trailing slashes and edit the content to have everything on a single line):
`
mvn archetype:generate \
    -DinteractiveMode=false \
    -DarchetypeGroupId=com.bonitasoft.connector.implementation \
    -DarchetypeArtifactId=bonita-connector-implementation-archetype \
    -DarchetypeVersion=1.0 \
    -DgroupId=com.mycompany.connectors \
    -DartifactId=myFirstConnectorImpl \
    -Dversion=1.0.0 \
    -DdefinitionId=myFirstConnector \
    -DdefinitionVersion=1.0.0
`

Before running the command, update the following parameter values:
Parameter
Description

archetypeVersion
This should match the version of the toolkit.

groupId
Maven project group id and Java package for the Bonita BPM connector implementation.

artifactId
Maven artifact id and Bonita BPM connector implementation id.

version
Maven version id and Bonita BPM connector implementation version.

definitionId
This should match the connector definition artifactId.

definitionVersion
This should match the connector definition version.

  

3. Run the command. This generates a new folder named `artifactId` containing the connector implementation project.

4. 

In the connector implementation project folder, run the following command :
`
mvn bonita-connector-definition:generate
`

This generates the connector abstract definition class based on the definition configuration:
`
/src/main/java//Abstract.java
`


**Note:**
If you subsequently change the connector definition configuration, run this command again to apply your changes.  

This will regenerate the abstract definition class, overwriting the previous version.

5. 

In the connector implementation project folder, run the following command :
`
mvn bonita-connector-implementation:generate
`

This generates a stub of the connector implementation and test classes:
`
src/main/java//.java
src/test/java//Tests.java
`

**Caution:** Do not run this command again at a later stage, because it resets your implementation and test classes.

6. Complete your connector implementation and test classes.
7. 

When you are ready to package the connector, run this command in the implementation project folder:
`
mvn package
`

This will produce a connector zip file that can be imported in Bonita BPM Studio:
`
/target/--dist.zip
`


## Widget types and parameters

The following widget types are supported in connectors:
Widget
Description

Text
Text field

Password
Text field with obfuscated characters

TextArea
Multi-line text field

Checkbox
Single checkbox

RadioGroup
Group of radio buttons

Select
Drop down

Array
Editable table with user customizable rows and columns

ScriptEditor
Multi-line text zone for entering a script

List
List in which user can add/remove elements

Group
Collapsile zone that contains one or more widgets

  
This is the same as the set of connector widgets available Bonita BPM Studio.

A widget is configured by setting parameters. Some [mandatory parameters](#mandatory-common) and [optional parameters](#optional-common) are common to all types of widget. 
There are also some specific widget properties for some types of widget, which are listed later in this page.


### Mandatory common widget parameters
Parameter
Description

id
Unique widget identifier.

label
Text displayed beside the widget.

widgetType
Type of the widget. Set this to Text, Password, TextArea, Checkbox, RadioGroup, Select, Array, ScriptEditor, List, or Group.

javaType
Java type used to assign the value of this widget. This is not supported for Group widgets.

### Optional common widget parameters
Parameter
Description
Default value

mandatory
Boolean flag that indicates whether or not this widget can be left empty.
true

defaultValue
Default value assigned to this widget.
n/a

description
Mouseover text displayed by the 'information' icon beside the widget. If there is no description, the icon is not displayed.
n/a

The following example is the configuration for a Text widget:
`
firstNameFirst name
    Textjava.lang.StringtrueJohnYour first name`



### RadioGroup widget parameters

Parameter
Mandatory
Description
Default value

choices
yes
List of values for the radio button group. Each value is specified in a "choice" tag.
n/a

orientation
no
Alignment of the widget values. One of: HORIZONTAL or VERTICAL.
VERTICAL

The following example is the configuration for a RadioGroup widget with three choices:
`
radioGroupRadioGroup widget
	java.lang.StringRadioGroupChoice1Choice2Choice3VERTICAL`



### Select widget parameters

Parameter
Mandatory
Description
Default value

items
yes
List of values for the widget. Each value is specified in an "item" tag.
n/a

The following example is the configuration for a Select widget with three choices:

`
selectSelect widget
	java.lang.StringSelectItem1Item2Item3`



### Array widget specific parameters


All Array widget specific parameters are mandatory and must be placed under a single parent "arrayOptions" tag.

Parameter
Description

cols
Initial number of columns in the table.

rows
Initial number of rows in the table. A value of -1 indicates a table with no row (only the column headers are displayed).

fixedCols
Boolean flag that indicates whether the number of table columns can be modified by the end user. If set to "true", the user cannot add or remove columns.

fixedRows
Boolean flag that indicates whether the number of table rows can be modified by the end user. If set to "true", the user cannot add or remove rows.

colsCaption
List of captions for the column headers. Each caption is specified in a "colsCaption" tag.

The following example is the configuration for an Array widget two columns and any number of rows:


`
arrayArray widget
	java.util.ListArray2-1truefalseHeader 1Header 2`



### List widget specific parameters

Parameter
Mandatory
Description
Default value

showDocuments
no
Boolean flag that indicates whether the end user can select Bonita BPM documents in the list of values.
false

The following example is the configuration for a List widget:

`
listList widget
	java.util.ListListtrue`



### Group widget parameters


**Note:** A Group widget does not support the common "javaType" parameter.

Parameter
Description

collapsed
Boolean flag that indicates whether the group is collapsed by default.

widgets
Specifies the list of widgets contained in the group.

The following example is the configuration for a Group widget that contains two other widgets:

`
credentialsGroupUser credentials
	trueloginjava.lang.StringtrueTextLogin
		passwordjava.lang.StringtruePasswordPassword
		`