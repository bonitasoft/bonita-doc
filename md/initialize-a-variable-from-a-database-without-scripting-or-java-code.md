# Initialize a variable from a database without scripting or Java code

This page explains how to set the value of a variable using the output of a database connector without using scripts or Java code.

## Procedure

You can initialize single valued items and multivalued items. The connector automatically populates the data structure of the variable.

Before you configure the database connector, define the pool-level variable to be initialized. If you do not define the variable first, 
you can define it from inside the wizard but only at the level when the connector is defined. This means that if you define the connector on a service task, which is recommended, the variable is only available in that service task.

To configure the database connector to initialize the variable, add the connector as usual and follow the steps in the wizard until you get to the Output operations definition screen.  
Then complete the following instructions:

1. In the Output operations definition screen, check Graphical mode, then specify the structure of the output result that corresponds to the data you specified in the query builder:
  * single value if you selected one cell to initialize a single-valued variable
  * 1 row x n columns if you selected all or part of a row to initialize a list variable
  * n rows x 1 column if you selected all or part of a column to initialize a list variable
  * n rows x n columns if you selected items from more than one row and more than one column to initialize a table (list of lists)
2. Then click **Next**.
3. Specify the name of the variable being initialized. The variable type must be compatible with the structure you specified. 
4. Then click **_Finish_**.

When the process runs, the variable is initialized with the value from the database.
