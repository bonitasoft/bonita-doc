# Set log and archive levels

There are three ways to record the information about a running process:

* Archive: used by a business analyst or process administrator using Bonita Portal, during the production phase, to trace the running of the process instances in their life cycle. Records who did what and when.
* Technical log: used by an application developer for troubleshooting, debugging and process tuning.
* Queriable log: used by a database administrator extracting information related to business actions that is stored in the internal database to be retrieved by a database request.

You can configure the information that is recorded in the archive and the logs.

## Archive

In the portal, after a process is executed, it can be viewed using the "Archived" filter.
There you can find the information on the process instances (the cases). This information is also available using the Web REST API. 
By default, all the information is archived but in the Performance edition this is [configurable](configurable-archive.md).

Recommended configuration (Performance only):

* To keep all the user activity, set all the flowNode types to true.
* To maximize the overall performance of the system and reduce the disk space used by the database, set all the values to false. Completed tasks will not be visible.

Between these two extreme cases, you can [customize archiving](configurable-archive.md) to your exact need.

## Technical log

The [technical logger service](technical-logging.md) is part of the Bonita Engine. The default implementation is based on the framework Java Util Logging.

You can [configure the log level](logging.md). The log level can be set on several categories in the `logging.properties` file. Some categories are very specific to a particular issue. 
For example:

* If you have an issue related to the database access, it might be interesting to change the level of `org.hibernate.level` from the default, `WARNING`, to `FINE`.
* When debugging cache issues, change the level of `net.sf.ehcache.level`.
* For the process execution, the relevant properties are `org.bonitasoft.level` and (for Subscription editions) `com.bonitasoft.level`.

## Queriable log

You can use the [queriable logger service](queriable-logging.md) to log in a database the creation, deletion or update of bonita objects that are not related to a process (for instance users, groups, roles, profiles). 
Items that can be archived cannot be included in the queriable log.

To configure what information you want to record in the quieriable log, modify the [`bonita-tenant-sp-custom.properties`](BonitaBPM_platform_setup.md).
This file contains a map of available events. By default all are logged (the value is set to true). If you do want to log a particular event, set the value to false and restart the Bonita Engine.
