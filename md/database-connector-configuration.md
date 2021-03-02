# Default database connector configuration

The Bonita Studio includes a generic database connector that allows both JDBC and Datasource configurations 

There are two types of configuration for database connectors:

- A JDBC connector is a point-to-point connection configured with information to access the database directly.
- A datasource connector is a connection to a datasource that is an intermediate point between the user (the Bonita process) and the database.  
  The advantage of using a datasource is that it can use a connection pool. The details of how the datasource retrieves information and the database it uses are hidden from the connector.

## How to configure a JDBC connector

These configuration steps are the same for all database connectors except the datasource connector.

1. Select the Database connector, for example, JDBC 4 database query. Click _**Next**_.
2. Enter the **Name**, **description**, **event** and**error message** (if any). Click _**Next**_.
3. Select the **.jar file** of the database driver. Click _**Next**_.
4. Enter the **Access information**. Click _**Next**_.
5. Enter the **Input query**. This is a query to send to the database. You can put single or multiple queries separated by a separator. 
   You can also use the [graphical query builder](graphical-query-builder.md) to specify the query. Click _**Next**_.
6. Choose how you want to specify the operations on connector outputs. Choose **Graphical mode** or **Scripting mode**.  
   The Graphical mode does not require scripting. Click _**Next**_.
7. Specify the output operations, using the [Graphical mode](initialize-a-variable-from-a-database-without-scripting-or-java-code.md) or using expressions.
8. In the **Edit expression window**, set the **provided variable** to get data from the external database.
9. Click _**Finish**_.

**Note:** in the return type, the type of the variable from the database must match the type of variable which is saved to the process variable.

## How to configure a datasource connector

Before you can configure the datasource connector, you need to configure the datasource itself, which is done in the application server.  
Follow the instructions in your application server documentation. [See here for an example using Tomcat with PostgreSQL.](http://tomcat.apache.org/tomcat-8.5-doc/jndi-datasource-examples-howto.html#PostgreSQL)  
Configure the connections of the datasource to be created with auto commit set to true.  
Make sure that all elements using connections return them to the pool with auto commit still set to true.

A datasource connector can be used in a Database Connection Pool (DBCP). A DBCP is a group of connections. Multiple connections are "reserved" and used as needed.

To configure the datasource connector, you need the following information:

- The datasource name (for example `java:/comp/env/yourDataSource`).
- Optionally, depending on how the datasource is configured, the properties needed to access it. These are specified as name-value pairs.

To configure the datasource connector, follow these steps:

1. Select the **Datasource database query** connector. Click _**Next**_.
2. Enter the **Name**, **Description**, **Event** and **error message** (if any). Click _**Next**_.
3. Specify the datasource name and, optionally, properties. Click _**Next**_.
4. Enter the **Input query**. This is a query to send to the database. You can put single or multiple queries separated by a separator. 
   You can also use the [graphical query builder](graphical-query-builder.md) to specify the query. Click _**Next**_.
5. Choose how you want to specify the operations on connector outputs. Choose **Graphical mode** or **Scripting mode**. 
   The Graphical mode does not require scripting. Click _**Next**_.
6. Specify the output operations, using the [Graphical mode](initialize-a-variable-from-a-database-without-scripting-or-java-code.md) or using expressions.
7. In the **Edit expression window**, set the **provided variable** to get data from the external database.
8. Click _**Finish**_.
