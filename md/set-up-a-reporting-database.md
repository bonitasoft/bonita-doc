# Set up a reporting database

::: info
**Note:** For Entreprise, Performance, Efficiency, and Teamwork editions only.
:::

Before you put reporting in place, you need to create a dedicated reporting database.
For performance reasons, it is a best practice to isolate reporting data from live data.

This installation is performed manually outside of Bonita.
This documentation does not detail the installation procedure of such a database but provides some best practices.

Best practices <!--{.h2}-->

Start by identifying the KPIs you wish to track, then create the reporting database structure. 
You need to create the appropriate tables and columns to store the reporting data.

When creating your reporting database, follow these best practices to ensure quick read/write operations:

* Avoid relational structures, in order to reduce the number of joins when querying data. Prefer flat table structures, because data duplication is generally not a concern.
* Do not use transactions as these can slow down read/write operations.
* Only perform select/insert operations and no update/delete.
