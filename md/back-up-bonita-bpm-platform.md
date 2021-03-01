# Back up Bonita Platform

To provide continuity, regular backups of the platform (clustered or not) is advised.

## Procedure

Any basic one node (non-clustered) installation can be backed up to be restored later. 
In a [Bonita cluster](overview-of-bonita-bpm-in-a-cluster.md), you need to back up the nodes, the shared database.

A cold backup (total shutdown) is recommended, to avoid losing data being processed during the backup process. Note: make sure your database server is backed up. 
(Please refer to the specific documentation for your database concerning the backup procedure).

1. Stop the application server
2. Save the Application Server configuration files modified during Bonita setup.
3. Save the deployed web application (i.e. `bonita.war`) (for Tomcat `[BUNDLE_HOME]/server/webapps/bonita.war`), or you can redeploy all applications at startup. 
   If you decide not to save the `webapps` directory, make sure that you have a copy of your Bonita application available.
4. Back up your database (Please refer to the specific documentation for your database concerning the backup procedure).
5. Start the application server.
