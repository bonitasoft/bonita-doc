# 4.7.2 Event handlers

An event handler is an extension to the engine that is configured to run when a specified event occurs.
You can add event handlers for several purposes and you can configure which events you want to catch.
We strongly recommend that you add only appropriate handlers and carefully code the handler filters to handle only those events that you are interested in.

An event is a change to any object in the database (user, activity, processDefinition,... ).
You can create an event handler to track any change to any object in the database and take the appropriate action. For example:

* Catch PROCESSINSTANCE\_CREATED to detect that a process instance has started, and notify the process supervisor.
* Catch FLOWNODE\_INSTANCE\_CREATED to detect that a human task is available, and send email to all the users elligible to perform it.
* Catch HIDDEN\_TASK\_CREATED to detect that a service task becomes available, and start an external system that is required to complete the task.

At the end of this page there is a [list of all the events](#list).

**[Example: deploy an event handler](#example)
**
> 
> [Create a maven project](#createProject)

> [Create a handler class](#createHandler)

> [Deploy](#deploy)

> [Configure events](#configure)

> [Test it](#test)

**[Filter an event](#filter)**

**[Event list](#list)**

## Example: deploy an event handler

This example shows an event handler that detects changes in the state of activity instances. When executing, the event handler calls [technical logger service](/technical-logging.md).

### create a maven project for event handler jar

pom.xml :
`
4.0.0org.bonitasoft.exampleeventHandlerExample1.0-SNAPSHOT7.2.0UTF-8org.bonitasoft.enginebonita-server${bonita.version}org.apache.maven.pluginsmaven-compiler-plugin1.71.7`

### Create event handler class:

Create a class that implements `SHandler`.

src/main/java/org/bonitasoft/example/EventHandlerExample.java:
`
package org.bonitasoft.example;

import java.util.UUID;

import org.bonitasoft.engine.events.model.SEvent;
import org.bonitasoft.engine.events.model.SHandler;
import org.bonitasoft.engine.events.model.SHandlerExecutionException;
import org.bonitasoft.engine.log.technical.TechnicalLogSeverity;
import org.bonitasoft.engine.log.technical.TechnicalLoggerService;

public class EventHandlerExample implements SHandler {

    private final TechnicalLoggerService technicalLoggerService;
    private TechnicalLogSeverity technicalLogSeverity;

    public EventHandlerExample(TechnicalLoggerService technicalLoggerService) {
        this.technicalLoggerService = technicalLoggerService;

        //set desired logging level
        this.technicalLogSeverity = TechnicalLogSeverity.INFO;
    }

    public void execute(SEvent event) throws SHandlerExecutionException {
        if (technicalLoggerService.isLoggable(this.getClass(), technicalLogSeverity)) {
        technicalLoggerService.log(this.getClass(), technicalLogSeverity, "ExampleHandler: executing event " + event.getType());
        }

        // add your business logic here

    }

    public boolean isInterested(SEvent event) {
        if (technicalLoggerService.isLoggable(this.getClass(), technicalLogSeverity)) {
            technicalLoggerService.log(this.getClass(), technicalLogSeverity,
            "ExampleHandler - event "
            + event.getType()
            + " - asks if we are interested in handling this event instance";

        }

        // add your business logic here
        // for this example purpose, assume we are always interested
        return true;
    }

     public String getIdentifier() {
        //ensure this handler is registered only once
        return UUID.randomUUID().toString();
    }
}

    `

### Deploy jar

build eventHandlerExample-1.0-SNAPSHOT.jar using `mvn clean install` maven command.

copy eventHandlerExample-1.0-SNAPSHOT.jar in webapps/bonita/WEB-INF/lib/ folder (for tomcat bundle)

### Register an event handler

An event handler is registered on an event by adding an entry to the appropriate map. The list of handlers registered can be extended in the BONITA\_HOME

engine-server/conf/tenants/TENANT\_ID/bonita-tenant-sp-custom.xml:
`
java.util.HashMap`

### Test it

Restart web server and run a basic process and check bonita log file in folder tomcat/logs:

    INFOS: THREAD_ID=78 | HOSTNAME=gt | ExampleHandler: event PROCESSINSTANCE_STATE_UPDATED - asks if we are interested in handling this event instance
    ...
    INFOS: THREAD_ID=78 | HOSTNAME=gt | ExampleHandler: executing event PROCESSINSTANCE_STATE_UPDATED
                

## Filter an event

An event handler contains a filter, `isInterested`, which detects the relevant instances of the event.
The example below shows how to use the State Id of a flow node to filter for a particular state (in this case, failed).
Flownode State Ids are defined in the subclasses of `org.bonitasoft.engine.core.process.instance.api.states.FlowNodeState`.
There is no exhaustive list; the set of states is extensible without notice.
`
public boolean isInterested(SEvent event) {
    boolean isInterested = false;

    // Get the object associated with the event
    Object eventObject = event.getObject();

    // Check that event is related to a task
    if (eventObject instanceof SFlowNodeInstance) {
        SFlowNodeInstance flowNodeInstance = (SFlowNodeInstance) eventObject;

        // Verify that state of the task is failed. See
        // FailedActivityStateImpl
        isInterested = (flowNodeInstance.getStateId() == 3);
    }

    return isInterested;
}
`

Event handlers are recursive, that is, if an event handler itself modifies something and triggers an event, the relevant event handler is called. This means you might need to include loop detection in your event handler.

## Event list

This is a snapshot of the events used in the Engine.
Service
Events

ActivityInstanceServiceImpl

ACTIVITYINSTANCE\_CREATED,
HUMAN\_TASK\_INSTANCE\_ASSIGNEE\_UPDATED,
ACTIVITYINSTANCE\_STATE\_UPDATED,
ACTIVITY\_INSTANCE\_TOKEN\_COUNT\_UPDATED,
HIDDEN\_TASK\_CREATED,
HIDDEN\_TASK\_DELETED,
PENDINGACTIVITYMAPPING\_CREATED,
PENDINGACTIVITYMAPPING\_DELETED

ActorMappingServiceImpl

ACTOR\_CREATED,
ACTOR\_DELETED,
ACTOR\_UPDATED,
ACTOR\_MEMBER\_CREATED,
ACTOR\_MEMBER\_DELETED

CategoryServiceImpl

CATEGORY\_CREATED,
CATEGORY\_DELETED,
CATEGORY\_UPDATED

CommandServiceImpl

COMMAND\_CREATED,
COMMAND\_DELETED,
COMMAND\_UPDATED

SCommentServiceImpl

COMMENT\_CREATED,
COMMENT\_DELETED

ConnectorInstanceServiceImpl

CONNECTOR\_INSTANCE\_CREATED,
CONNECTOR\_INSTANCE\_DELETED,
CONNECTOR\_INSTANCE\_STATE\_UPDATED,
CONNECTOR\_INSTANCE\_UPDATED

DependencyServiceImpl

DEPENDENCY\_CREATED,
DEPENDENCYMAPPING\_CREATED,
DEPENDENCY\_DELETED,
DEPENDENCYMAPPING\_DELETED,
DEPENDENCY\_UPDATED,
DEPENDENCYMAPPING\_UPDATED

DocumentMappingServiceImpl

DOCUMENTMAPPING\_CREATED,
DOCUMENTMAPPING\_DELETED,
DOCUMENTMAPPING\_UPDATED

SEventInstanceServiceImpl

EVENT\_INSTANCE\_CREATED,
EVENT\_TRIGGER\_INSTANCE\_CREATED,
EVENT\_TRIGGER\_INSTANCE\_DELETED,
MESSAGE\_INSTANCE\_CREATED,
MESSAGE\_INSTANCE\_DELETED,
MESSAGE\_INSTANCE\_UPDATED

ExternalIdentityMappingServiceImpl

EXTERNAL\_IDENTITY\_MAPPING\_CREATED,
EXTERNAL\_IDENTITY\_MAPPING\_DELETED

FlowNodeInstanceServiceImpl

ARCHIVED\_FLOWNODE\_INSTANCE\_DELETED,
FLOWNODE\_INSTANCE\_DELETED

GatewayInstanceServiceImpl

GATEWAYINSTANCE\_CREATED,
GATEWAYINSTANCE\_HITBYS\_UPDATED,
GATEWAYINSTANCE\_STATE\_UPDATED

IdentityServiceImpl

GROUP\_CREATED,
GROUP\_DELETED,
GROUP\_UPDATED,
METADATA\_CREATED,
METADATA\_DELETED,
METADATA\_UPDATED,
METADATAVALUE\_CREATED,
METADATAVALUE\_DELETED,
METADATAVALUE\_UPDATED,
ROLE\_UPDATED,
ROLE\_CREATED,
ROLE\_DELETED,
USER\_UPDATED,
USER\_CREATED,
USER\_DELETED,
USER\_CONTACT\_INFO\_UPDATED,
USER\_CONTACT\_INFO\_CREATED,
USER\_CONTACT\_INFO\_DELETED,
USERMEMBERSHIP\_UPDATED,
USERMEMBERSHIP\_CREATED,
USERMEMBERSHIP\_DELETED

JobServiceImpl

eventType\_CREATED,
eventType\_DELETED

JobWrapper

JOB\_COMPLETED,
JOB\_EXECUTING

ProcessDefinitionServiceImpl

PROCESSDEFINITION\_CREATED,
PROCESSDEFINITION\_DELETED,
PROCESSDEFINITION\_DEPLOY\_INFO\_UPDATED,
PROCESSDEFINITION\_IS\_DISABLED\_UPDATED,
PROCESSDEFINITION\_IS\_ENABLED\_UPDATED,
PROCESSDEFINITION\_IS\_RESOLVED\_UPDATED

ProcessInstanceServiceImpl

MIGRATION\_PLAN\_UPDATED,
PROCESS\_INSTANCE\_CATEGORY\_STATE\_UPDATED,
PROCESSINSTANCE\_CREATED,
PROCESSINSTANCE\_DELETED,
PROCESSINSTANCE\_STATE\_UPDATED,
PROCESSINSTANCE\_UPDATED

ProfileServiceImpl

PROFILE\_CREATED,
PROFILE\_DELETED,
PROFILE\_UPDATED,
ENTRY\_PROFILE\_CREATED,
ENTRY\_PROFILE\_DELETED,
ENTRY\_PROFILE\_UPDATED,
PROFILE\_MEMBER\_DELETED

ReportingServiceImpl

REPORT\_CREATED,
REPORT\_DELETED

SupervisorMappingServiceImpl

SUPERVISOR\_CREATED,
SUPERVISOR\_DELETED

ThemeServiceImpl

THEME\_CREATED,
THEME\_DELETED,
THEME\_UPDATED

TokenServiceImpl

PROCESS\_INSTANCE\_TOKEN\_COUNT\_CREATED,
PROCESS\_INSTANCE\_TOKEN\_COUNT\_DELETED