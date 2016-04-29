# 4.7.2 Event handlers

An event handler is an extension to the engine that is configured to run when a specified event occurs. You can add event handlers for several purposes and you can configure which events you want to catch. 
We strongly recommend that you add only appropriate handlers and carefully code the handler filters to handle only those events that you are interested in.


**[Add an event handler](#add)**

**[Register an event handler](#register)**

**[Example](#example)**

> [Registration](#registration)



> [Event handler source code](#code)



**[Event list](#list)**

An event is a change to any object in the database (user, activity, processDefinition,... ). You can create an event handler to track any change to any object in the database and take the appropriate action. For example:


* Catch PROCESSINSTANCE\_CREATED to detect that a process instance has started, and notify the process supervisor.
* Catch FLOWNODE\_INSTANCE\_CREATED to detect that a human task is available, and send email to all the users elligible to perform it.
* Catch HIDDEN\_TASK\_CREATED to detect that a service task becomes available, and start an external system that is required to complete the task.

At the end of this page there is a [list of all the events](#list).






## Add an event handler


An event handler is added to the system as a jar file and made available using a classloader.   

(e.g. placing jar file under /WEB-INF/lib folder of the web application)



An event handler contains a filter, `isInterested`, which detects the relevant instances of the event. 
The [example](#code) below shows how to use the State Id of a flow node to filter for a particular state (in this case, failed). 
Flownode State Ids are defined in the subclasses of `org.bonitasoft.engine.core.process.instance.api.states.FlowNodeState`.
There is no exhaustive list; the set of states is extensible without notice.


Event handlers are recursive, that is, if an event handler itself modifies something and triggers an event, the relevant event handler is called. This means you might need to include loop detection in your event handler.




## Register an event handler


An event handler is registered on an event by adding an entry to the appropriate map.
The list of handlers registered at platform level can be extended in the `BONITA_HOME/engine-server/conf/platform/bonita-platform-sp-custom.xml` file.
Theist of handlers registered at tenant level can be extended in the `BONITA_HOME/engine-server/conf/tenants/TENANT_ID/bonita-tenant-sp-custom.xml` file.


Each entry in the map is a key-value pair, which specifies the event handler to be called for each event. 
The isInterested filter in the event handler detects the relevant instances of the event and calls the event handler. 
You cannot have more than one handler for a given event, but you can use the isInterested filter to specify different actions for different instances of the event.



## Example


This example shows an event handler that detects changes in the state of activity instances. If an activity has moved into Failed state, the event handler calls [DelayedRetry](/technical-logger-service.md#delayedretry).


### Registration

`
java.util.HashMap`


### Event handler source code

`
package com.bonitasoft.handlers;

import org.bonitasoft.engine.core.process.instance.model.SFlowNodeInstance;
import org.bonitasoft.engine.events.model.SEvent;
import org.bonitasoft.engine.events.model.SHandler;
import org.bonitasoft.engine.events.model.SHandlerExecutionException;

/**
 * Handler that run when a task is failed. The handler will start a new
 * thread that will try to run again the task with a delay.
 * 
 * @author Antoine Mottier
 * 
 */
public class FailedTaskHandler implements SHandler {

	/**
	 * Build the handler. 
	 * 
	 */
	public FailedTaskHandler() {
	}

	public void execute(SEvent event) throws SHandlerExecutionException {
		// Get the object (the task object) associted with the event
		SFlowNodeInstance flowNodeInstance = (SFlowNodeInstance) event.getObject();
		
		// Configure and start a retry thread
		DelayedRetry delayedRetry = new DelayedRetry();
		delayedRetry.setTaskId(flowNodeInstance.getId());
		delayedRetry.setTechnicalLog(technicalLog);
		Thread delayedRetryThread = new Thread(delayedRetry, "Retry task: "
				+ flowNodeInstance.getId());
		delayedRetryThread.start();
	}

	/**
	 * Report if this handler should take care of the received event.
	 */
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

}
`


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