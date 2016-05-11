## activity

### Description

Use this resource to retrieve activities (human or service tasks), call activities, and subprocesses currently running on the platform. It enables you to perform maintenance tasks like skipping or replaying a failed task and modifying variables.

### Identifier

The ID of the activity (a long value).

### Representation

    {
    "id": "_the activity id (long)_",
    "displayDescription": "_the human readable activity description (string)_",
    "executedBySubstitute": "_the id (long) of the user who really performed this activity in case where a substitute did it, or 0 if the activity was not performed by a substitute_",
    "caseId": "_the case id (long) that is associated with this activity_", 
    "parentCaseId": "_the parent case id (long) that is associated with this activity's case_",
    "rootCaseId": "_the root case initiator id (long) that is associated with this activity's case_",
    "processId": "_the process id (long) that is associated with this activity_",
    "rootContainerId": "_the root process id (long) of the root case that is associated with this activity_",
    "state": "_the current state of the activity (string,  for example, ready, completed, failed)_",
    "type": "_the activity type (string)_",
    "assigned_id": "_the user id (long) that this activity is assigned to, or 0 if it is unassigned_"
    "assigned_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current activity was assigned, for example '2014-10-17 16:05:42.626'_",
    "executedBy": "_the id (long) of the user who executed the activity, or 0 if the activity has not been executed_",
    "priority": "_the priority (string) of the current activity_",
    "actorId": "_the id (long) of the actor that can execute this activity, null otherwise_",
    "description": "_the activity description (string)_",
    "name": "_the activity name (string)_",
    "reached_state_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity reached the current state, for example '2014-10-17 16:05:42.626'_"
    "displayName": "_the display name (string) of this activity_",
    "dueDate": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity is due, for example '2014-10-17 16:05:42.626'_",
    "last_update_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity was last updated, for example '2014-10-17 16:05:42.626)_",
    "parentTaskId": "_in the case of a subtask, the parent task id (long)_"
    }
    

#### States:

* failed
* initializing
* ready
* executing
* completing
* completed
* waiting
* skipped
* cancelled
* aborted
* cancelling subtasks

#### Types:

* AUTOMATIC\_TASK
* HUMAN\_TASK
* USER\_TASK"
* MANUAL\_TASK
* LOOP\_ACTIVITY
* MULTI\_INSTANCE\_ACTIVITY
* SUB\_PROCESS

#### Priorities:

* highest
* above\_normal
* normal
* under\_normal
* lowest

### Methods

The methods used for this resource are:

* GET - Read an activity or search for an activity
* PUT - Update an activity

### Update activity variables

Note: if there is no data with the specified name in the activity, the update will be applied to the process data if a variable with the specified name exists.
Request url
http://../API/bpm/activity/<id\>

Request method

PUT

Request payload

{ "variables": "\[{\\"name\\":\\"foo\\",\\"value\\":\\"bar\\"}\]" }

Response payload

empty

### Update activity variables and execute a task

Note: if the task definition includes a connector that is executed on finish and updates the value of a variable, the value set by the REST API call is overwritten.
Request url
http://../API/bpm/activity/<id\>

Request method

PUT

Request payload

{ "state": "completed", "variables": "\[{\\"name\\":\\"foo\\",\\"value\\":\\"bar\\"}\]" }

Response payload

empty

### Skip activity
Request url
http://../API/bpm/activity/<id\>

Request method

PUT

Request payload

{ "state": "skipped" }

Response payload

empty

### Replay activity

Make this call after all failed connectors have been reset. (only in Performance edition)
Request url
http://../API/bpm/activity/<id\>

Request method

PUT

Request payload

{ "state": "replay" }

Response payload

empty

### Get an activity

Retrieve the activity information for the given id.
Request url
http://../API/bpm/flowNode/{id}

Request method

GET

Request payload

empty

Response payload

The JSON representation of the specified activity

#### Example

Get the details of activity 77456\.
Request url
http://../API/bpm/activity/77456

Request method

GET

Response payload

    
    {
        "displayDescription": "validate expense request",
        "executedBySubstitute": "0",
        "caseId": "76539",
        "parentCaseId": "68743",
        "rootCaseId": "65879",
        "processId": "7012","
        "rootContainerId": "7000",
        "state": "completed",
        "type": "_the activity type as a string_",
        "assigned_id": "304",
        "assigned_date": "'2014-10-17 16:05:42.626'",
        "id": "809764",
        "executedBy": "0",
        "priority": "_the priority of the current activity as a string_",
        "actorId": "50",
        "description": "In this step, a manager reviews and validates an expense request.",
        "name": "Validate",
        "reached_state_date": "'2014-10-18 10:37:05.643'",
        "displayName": "Validate expense request",
        "dueDate": "'2014-10-21 16:05:42.626'",
        "last_update_date": "'2014-10-18 10:37:05.643'"
    }
    			

### Search among activities

Search for flow activities using given parameters. Activities in states completed, cancelled, or aborted are not retrieved. The search returns an array of activities.
Request url
http://../API/bpm/activity?_search\_options_

Request method

GET

Request payload

Response payload

An array of JSON representations of activities

#### Parameters

For this resource, the available state search parameters for the GET verb are the same as for the flow nodes.

The following [search parameters](rest-api-overview.md) are available:

* o: 
  * name
  * displayName
  * state
  * processDefinitionId
  * parentProcessInstanceIdo
  * parentActivityInstanceId (order by parent activity id)
  * rootProcessInstanceId
  * lastUpdateDate
* s: search on any field that can be used to order results
* f: 
  * name
  * state
  * processId
  * parentCaseId
  * rootCaseId
  * last\_update\_date
  * supervisor\_id (only in Efficiency and Performance editions)
* d: 
  * processId
  * caseId
  * rootCaseId
  * parentCaseId
  * rootContainerId
  * executedBy
  * executedBySubstitute (only in Efficiency and Performance editions)
  * actorId
  * assigned\_id
  * parentTaskId
* The [standard search parameters](rest-api-overview.md)

#### Example

Get all the active activities named "Escalate", ordering the results by state.
Request url
http://../API/bpm/activity?p=0&c=10&f=name%3dEscalate&o%3dstate%20ASC

Request method

GET

Request payload

empty

Response payload

An array of JSON representations of activities