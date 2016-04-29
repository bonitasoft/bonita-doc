## archivedActivity

### Description

Use this resource to retrieve finished activities (human or service tasks), call activities, and subprocesses.

For this resource, the available state search parameters for the GET verb are the same as for the archived flow nodes.

### Identifier

The ID of the archived activity (a long value). This is different from the ID of the activity before it was archived.

### Representation

    {
    "id": "_the activity id (long)_",
    "sourceObjectId": "_the original id of the activity before it was archived_",
    "displayDescription": "_the human readable activity description (string)_",
    "executedBySubstitute": "_the id (long) of the user who really performed this activity in case where a substitute did it, or 0 if the activity was not performed by a substitute_",
    "caseId": "_the case id (long) that is associated with this activity_",
    "parentCaseId": "_the parent case id (long) that is associated with this activity's case_",
    "rootCaseId": "_the root case initiator id (long) that is associated with this activity's case_",
    "processId": "_the process id (long) that is associated with this activity_",
    "rootContainerId": "_the root process id (long) of the root case that is associated with this activity_",
    "state": "_the current state of the activity (string,  for example, ready, completed, failed)_",
    "type": "_the activity type (string)_",
    "assigned_id": "_the user id (long) that this activity is assigned to, or 0 if it is unassigned_",
    "assigned_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current activity was assigned, for example '2014-10-17 16:05:42.626'_",
    "executedBy": "_the id (long) of the user who executed the activity, or 0 if the activity has not been executed_",
    "priority": "_the priority (string) of the current activity_",
    "actorId": "_the id (long) of the actor that can execute this activity, null otherwise_",
    "description": "_the activity description (string)_",
    "name": "_the activity name (string)_",
    "reached_state_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity reached the current state, for example '2014-10-17 16:05:42.626'_",
    "displayName": "_the display name (string) of this activity_",
    "dueDate": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity is due, for example '2014-10-17 16:05:42.626'_",
    "archivedDate": "_the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this activity was archived, for example '2014-10-17 16:05:42.626'_",
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
* USER\_TASK
* MANUAL\_TASK
* CALL\_ACTIVITY
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

* GET - Read a resource or search for an archived activity

### Get an archived activity

Retrieve the activity information for the given id.
Request url
http://../API/bpm/archivedActivity/{id}

Request method

GET

Request payload

empty

Response payload

The JSON representation of the specified activity

### Search among archived activities

Search for archived activities using given parameters. Only archived activities in a final state are retrieved (completed, cancelled, aborted). It returns an array of archived activities.
Request url
http://../API/bpm/archivedActivity

Request method

GET

Request payload

empty

Response payload

An array of JSON representations of the specified activities

#### Parameters

The following search parameters are available:

* o: 
  * name : the name of this activity
  * displayName : the display name of this activity
  * state : the current state of the activity
  * type : the activity type
  * isTerminal : say whether or not the activity is in a terminal state
  * processId : the process this activity is associated to
  * caseId : the case initiator this activity is associated to
  * reached\_state\_date : the date when this activity arrived in this state
* f: 
  * supervisor\_id: retrieve the information the process manager associated to this id has access to (only in Efficiency and Performance edition)
  * f: same as the sort order fields
* d: 
  * processId: the id of the process that is associated with the activity 
  * caseId: the id of the case that is associated with the activity
  * rootCaseId: the root case that is associated with this activity's case
  * parentCaseId: the parent case that is associated with this activity's case
  * rootContainerId: the root process of the root case that is associated with this activity
  * executedBy: the user who executed the activity
  * executedBySubstitute: the user who executed the activity for the executedBy user (only in Effeciency and Performance editions)
  * actorId: the actor that can execute this activity
  * assigned\_id: the user this activity is assigned to
  * parentTaskId: in the case of a subtask, the parent task
* The [standard search parameters](/rest-api-overview.html#standard_search_params).