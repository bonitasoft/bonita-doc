# 1.8.7 Jasper 5.0


A Jasper 5.0 connector is used for creating pre-formatted reports of data extracted from a database.


The procedure below is an example, and not a reference:

1. Using MySQL or PostGreSQL, create a database and a table called e.g. `address` containing data 
2. Use Jasper Studio to connect to the database and create a pre-formatted report in a special .jrxml format
3. Setup the diagram in Bonita Studio by adding a Jasper connector to a task and the variables and the form variables
4. Import the pre-formatted .jrxml file into Bonita which will be used to create the graphic version of the data
5. When the process is run, it will connect to the database in real time
6. The request in the .jrxml report will be executed
7. The data will be extracted, imported into Bonita via the connector, a report will be created and then saved in the chosen format (pdf, xml or html) and to the chosen folder. 
It can be displayed directly in the Portal.

## How to create a report using the Jasper 5.0 connector

This is an example only and not a reference.

**Preparation**

In MySQL, create a database with a table and information. In this example put **address** as the name of the table, for example.




**Note:** The `.jrxml` file is created by Jasper Studio, and contains the database and the table name. If the names are changed, the request in the `.jrxml` file will fail, the connector will not recognise the name and not connect.

The structure of the table must be identical to the one below, but the names and cities can be anything you like:

INTEGER
VARCHAR
VARCHAR
VARCHAR
VARCHAR

id
Firstname
Lastname
Street
City

1
Sherlock
Holmes
221b Baker street
London

2
Bruce
Wayne
Wayne Manor
Gotham

2
Indy
Jones
38 Adler avenue
Fairfield

Use [Jasper Studio](http://community.jaspersoft.com/project/jaspersoft-studio) to connect to the external database to create a report in the compatible .jrxml format.



**Diagram**

1. Create a new diagram.
2. Create a **start event**, then **3 tasks**: 
(1 human task called _beforeJasper_, one service task called _Jasper_ and one human task called _afterJasper_), and lastly an **end event**.

**Pool data**

Select the pool and create 2 documents: a bonitadocument called input (.jxrml) and an output format for the document to be created (.pdf,.xml or.html).

Go to the **Details** panel, **Data** tab, **Documents** panel, and click **_Add_**. 
In the popup, click **From Bonita BPM** \> **Browse...** \> **Import...** (example.jrxml) to import the Bonita document.



**Document**

Name
Data type

jrxmlDocName
text

Now to configure the first task:

1. Add a Jasper connector to the task.
2. Enter the database connection information to connect to your database.
3. In **Report Settings**, enter the name of the .jrxml document used to create the report.`jrxmlDocName`.
4. Choose the output format: pdf, xml or html.
5. In Output operations, choose **name of the object to contain the document** and take the value **reportDocValue**.

Click on _**Run.**_ Bonita BPM Portal will be launched.


## Result

A report is created, graphically representing the data from the database. 



**Note:** The Jasper connector is only testable in Bonita BPM Studio if a JDBC driver is installed.