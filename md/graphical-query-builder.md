# Graphical query builder

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

The graphical query builder helps you configure a database connector by showing you the structure of database content to help you construct the database query.

## Connect to the database

In the Database access information screen, check **Use the graphical query builder** and click **_Connect_**.  
In the popup, enter the information needed to connect to the database. A popup tells you when the connection is established.  
The graphical query builder connects to a database and retrieves information that you can use to construct the query graphically.  
The first time you provide the connection information, it is for the connection used by the graphical query builder.  
Subsequently, you may be asked to give the connection information again: this is to configure the connector for the running process.  
It is possible to use one database with the graphical query builder and a different database when running the process, provided that the structure of the data in the two databases is the same.

When the database access information is configured, click **_Next_** to go to the graphical query builder.

## Build a query

With the graphical query builder you can construct a select, update, insert, or delete query.  
At any point, you can switch from the graphical query builder to entering the SQL query directly, by clicking on the **Query** tab.  
From the **Query** tab, you can go back to the graphical view by clicking on the **Designer** tab.

### Create a select query

Use a select query to get information out of the database. To define a select query:

1. Specify the table, by clicking **_Add a table..._** and selecting the table from the list in the popup. The query builder shows the columns of the database table.
2. Check the column or columns from which you want to retrieve the values.
3. If you want to ignore duplicate values and retrieve only the distinct values, check the **DISTINCT** box.
4. Optionally, set a condition on the values to be retrieved. 
If you do not set a condition, you will get all the values from the selected columns (with or without duplicates, depending on the DISTINCT setting).  
Setting a condition is a way of choosing the rows from which you want to get the value from the specified column.

You can also specify groups to group the selected values, and group conditions to filter the results based on the value of a database element.

### Create an update query

An update query modifies a value in the database. To define an update query:

1. Specify the table, by clicking **_Add a table..._** and selecting the table from the list in the popup. The query builder shows the columns of the database table.
2. Check the column or columns where you want to update the values.
3. Optionally, go to the **Where** tab and specify a condition to identify the specific row to be updated.
4. Go to the **Set** tab and specify how the identified value is to be updated:
  1. In the left-hand list, select the item to be updated.
  2. Click the right-arrow to move it to the **Update Column** list.
  3. In the **Expression** column, specify the new value for the item. 
This can be a constant entered directly, the value of a field, or the value of a process variable.  
You can also specify DEFAULT to set the value to the default defined in the database.

### Create an insert query

An insert query adds a new entry to the database. To define an insert query:

1. Specify the table, by clicking **_Add a table..._** and selecting the table from the list in the popup. The query builder shows the columns of the database table.
2. Check the column or columns to include in the new entry. They are added to the **Column** column in the table. The default value, if one is defined, is shown in the **Value** column.  
In the **Value** column, specify the value to be added for each item. A value can be specified directly as a constant, or can be a process variable or a field value.

### Create a Delete query

A delete query removes an entry from the database. To define a delete query:

1. Specify the table, by clicking **_Add a table..._** and selecting the table from the list in the popup. The query builder shows the columns of the database table.
2. Specify a condition to identify the entry or entries to be deleted:
  1. In the **Column** column, specify the column name. This can be specified directly, or can be a field value or a variable. 
  2. In the **Operator** column, choose the logical operator.
  3. In the **Value** column, specify the value as a constant, field value, or variable.

You can combine conditions by specifying AND or OR operators in the last column of the table.
