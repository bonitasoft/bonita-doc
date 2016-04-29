# 4.7.2.2 Queriable logger service


This page describes the queriable logger service.


## Purpose

The queriable logger service provides information about important events in the Bonita BPM Platform that are not directly related to execution of a process. The log includes
information about 
administration operations such as deployment of a new process definition, commands, reporting, actor mapping, Portal Look & Feel themes, and organization and user management.


The Bonita BPM Engine stores information in the queriable log. The information in the log is accessible using the [LogAPI](/javadoc-71)
(Performance, Efficiency, and Teamwork editions only).



The information available from the queriable log is primarily for the platform and process administrator. It is
not intended to be used as a notification system: avoid pooling on the queriable log. If you need to be notified of
specific events, use the configurable event service.



## Usage


Here is an example of how to search for log message about a specific activity:
`
final SearchOptionsBuilder builder = new SearchOptionsBuilder(0, 100);
builder.filter(LogSearchDescriptor.ACTION_SCOPE, aTaskId);
builder.searchTerm("Adding a new user");
builder.sort(LogSearchDescriptor.ACTION_TYPE, Order.ASC);
final LogAPI logAPI = TenantAPIAccessor.getLogAPI(session);
final SearchResult searchedLogs = logAPI.searchLogs(builder.done());
for (Log log : searchedLogs.getResult()) {
     // Print the detailed user creation message:
System.out.println(log.getMessage());
}
`


## Implementation details


The queriable logger service stores log message in the Bonita BPM Engine back-end database using the Hibernate library. The [interface](https://github.com/bonitasoft/bonita-engine/blob/master/services/bonita-log/bonita-log-api/src/main/java/org/bonitasoft/engine/services/QueriableLoggerService.java)
and the [implementation](https://github.com/bonitasoft/bonita-engine/tree/master/services/bonita-log/bonita-log-impl/src/main/java/org/bonitasoft/engine/services/impl)
of the service are available from the source code repository on [GitHub](https://github.com/bonitasoft/).