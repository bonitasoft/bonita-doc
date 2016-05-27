# BPM API

## Activities and Tasks

#### Activity

#### Description

Use this resource to retrieve activities (human or service tasks), call activities, and subprocesses currently running on the platform. It enables you to perform maintenance tasks like skipping or replaying a failed task and modifying variables.

#### Identifier

The ID of the activity (a long value).

#### Representation
```json
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
```

##### States:

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

##### Types:

* AUTOMATIC\_TASK
* HUMAN\_TASK
* USER\_TASK
* MANUAL\_TASK
* LOOP\_ACTIVITY
* MULTI\_INSTANCE\_ACTIVITY
* SUB\_PROCESS

##### Priorities:

* highest
* above\_normal
* normal
* under\_normal
* lowest

#### Methods

The methods used for this resource are:

* GET - Read an activity or search for an activity
* PUT - Update an activity

#### Update activity variables

Note: if there is no data with the specified name in the activity, the update will be applied to the process data if a variable with the specified name exists.
* **URL**  
  `/API/bpm/activity/:id`  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  {
    "variables": "[{\"name\":\"foo\",\"value\":\"bar\"}]"
  }
  ```
* **Success Response**  
  * **Code**: 200

#### Update activity variables and execute a task

Note: if the task definition includes a connector that is executed on finish and updates the value of a variable, the value set by the REST API call is overwritten.
* **URL**  
  `/API/bpm/activity/:id`  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  { 
    "state": "completed", 
    "variables": "[{\"name\":\"foo\",\"value\":\"bar\"}]" 
  }
  ```
* **Success Response**  
  * **Code**: 200

#### Skip activity

* **URL**  
  `/API/bpm/activity/:id`  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  {
    "state": "skipped"
  }
  ```
* **Success Response**  
  * **Code**: 200

#### Replay activity

Make this call after all failed connectors have been reset. (only in Performance edition)

* **URL**  
  `/API/bpm/activity/:id`  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  { "state": "replay" }
  ```
* **Success Response**  
  * **Code**: 200

#### Get an activity

Retrieve the activity information for the given id.
 
* **URL**  
  `/API/bpm/activity/:id`  
* **Method**  
  `GET`
* **Success Response**  
  The JSON representation of the specified activity
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "displayDescription": "validate expense request",
      "executedBySubstitute": "0",
      "caseId": "76539",
      "parentCaseId": "68743",
      "rootCaseId": "65879",
      "processId": "7012","
      "rootContainerId": "7000",
      "state": "completed",
      "type": "the activity type as a string",
      "assigned_id": "304",
      "assigned_date": "'2014-10-17 16:05:42.626'",
      "id": "809764",
      "executedBy": "0",
      "priority": "the priority of the current activity as a string",
      "actorId": "50",
      "description": "In this step, a manager reviews and validates an expense request.",
      "name": "Validate",
      "reached_state_date": "'2014-10-18 10:37:05.643'",
      "displayName": "Validate expense request",
      "dueDate": "'2014-10-21 16:05:42.626'",
      "last_update_date": "'2014-10-18 10:37:05.643'"
    }
    ```

#### Search among activities

Search for flow activities using given parameters. Activities in states completed, cancelled, or aborted are not retrieved. The search returns an array of activities.
* **URL**  
  `/API/bpm/activity`  
  _Example_: Get all the active activities named "Escalate", ordering the results by state: `/API/bpm/activity?p=0&c=10&f=name%3dEscalate&o%3dstate%20ASC`
* **Method**  
  `GET`
* **Data Params**  
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
* **Success Response**  
  An array of JSON representations of activities
  * **Code**: 200

### ArchivedActivity

#### Description

Use this resource to retrieve finished activities (human or service tasks), call activities, and subprocesses.

For this resource, the available state search parameters for the GET verb are the same as for the archived flow nodes.

#### Identifier

The ID of the archived activity (a long value). This is different from the ID of the activity before it was archived.

#### Representation
```json
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
```   

##### States:

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

##### Types:

* AUTOMATIC\_TASK
* HUMAN\_TASK
* USER\_TASK
* MANUAL\_TASK
* CALL\_ACTIVITY
* LOOP\_ACTIVITY
* MULTI\_INSTANCE\_ACTIVITY
* SUB\_PROCESS

##### Priorities:

* highest
* above\_normal
* normal
* under\_normal
* lowest

#### Methods

The methods used for this resource are:

* GET - Read a resource or search for an archived activity

#### Get an archived activity

Retrieve the activity information for the given id.

* **URL**  
  `/API/bpm/archivedActivity/:id`  
* **Method**  
  `GET`
* **Success Response**  
  The JSON representation of the specified activity
  * **Code**: 200

#### Search among archived activities

Search for archived activities using given parameters. Only archived activities in a final state are retrieved (completed, cancelled, aborted). It returns an array of archived activities.
* **URL**  
  `/API/bpm/archivedActivity`  
  _Example_: ``
* **Method**  
  `GET`
* **Data Params**  
  The following [search parameters](rest-api-overview.md) are available:
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
* **Success Response**  
  An array of JSON representations of the specified activities
  * **Code**: 200

### HumanTask

#### Description

A Human task is Manual task or a User task. 
A User task is a task that can be done by a user.
A Manual task is a subtask of a user task, and is also done by a user. 

#### Identifier

Simple, the ID of the object (a long value)

#### Representation
```json
{
  "displayDescription":"_description_",
  "executedBySubstitute":"_id of the user who executed the task for the assigned user_",
  "processId":"_id of the process_",
  "state":"_state_",
  "rootContainerId":"_id of the rootContainer_",
  "type":"USER_TASK | MANUAL_TASK",
  "assigned_id":"_id of the assigned user_",
  "assigned_date":"_date the task was assigned_",
  "id":"_id of the task_",
  "sourceObjectId":"for a manual task, the id of the parent human task",
  "executedBy":"_id of the user who executed the subtask_",
  "caseId":"_case id_",
  "priority":"normal",
  "actorId":"_id of the actor associated with the task_",
  "description":"_description_",
  "name":"_name_",
  "reached_state_date":"_date and time when the task reached the current state_",
  "displayName":"_task name displayed in the Portal_",
  "dueDate":"_date and time that the task is due_",
  "last_update_date":"_date and time when the task was last updated_"
}
```

#### Methods

The methods used for this resource are:

* GET - Read a resource
* PUT - Update a resource

#### Actions

##### Retrieve a humanTask

* **URL**  
  `/API/bpm/humanTask/:taskId`  
* **Method**  
  `GET`
* **Success Response**  
  Returns a Human task representation
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "displayDescription":"",
      "executedBySubstitute":"0",
      "processId":"5826139717723008213",
      "state":"ready",
      "rootContainerId":"1002",
      "type":"USER_TASK",
      "assigned_id":"",
      "assigned_date":"",
      "id":"20004",
      "executedBy":"0",
      "caseId":"1002",
      "priority":"normal",
      "actorId":"102",
      "description":"",
      "name":"Analyse case",
      "reached_state_date":"2014-09-05 11:11:30.808",
      "displayName":"Analyse case",
      "dueDate":"2014-09-05 12:11:30.775",
      "last_update_date":"2014-09-05 11:11:30.808"
    }
    ```

##### Search for a humanTask

Retrieve humanTask objects that match the specified filters.

* **URL**  
  `/API/bpm/humanTask`  
  _Example_: Get the human tasks that have been skipped. `/API/bpm/humanTask?p=0&c=10&f=state=skipped`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  You can filter on:

  * `assigned\_id={user\_id}`: retrieve only the human tasks assigned to the specified ID. For example, retrieve the human tasks assigned to user with id 2: `/API/bpm/humanTask?p=0&c=10&f=assigned\_id%3d2`
  * `state=`: retrieve only the archived user tasks with the specified state. For example, retrieve the skipped tasks: `/API/bpm/humanTask?p=0&c=10&f=state=skipped`
  * `name=`: retrieve only the human tasks with the specified name. For example, retrieve the human tasks with the name "Analyse Case": `/API/bpm/humanTask?p=0&c=10&f=name=Analyse Case`
  * `displayName=`: retrieve only the archived user tasks with the specified displayName. For example, retrieve the human tasks with the displayName "Analyse Case": `/API/bpm/humanTask?p=0&c=10&f=displayName=Analyse Case`
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    The results are paged using the [standard search parameters](rest-api-overview.md), with a maximum of 10 results returned in each page. The first set of results are returned. In this example, two results are returned.
    ```json
    [
      {
        "displayDescription":"Case analysis",
        "executedBySubstitute":"0",
        "processId":"5826139717723008213",
        "state":"skipped",
        "rootContainerId":"1002",
        "type":"USER_TASK",
        "assigned_id":"974",
        "assigned_date":"2014-09-05 09:19:30.150",
        "id":"20004",
        "executedBy":"0",
        "caseId":"1002",
        "priority":"normal",
        "actorId":"102",
        "description":"",
        "name":"Analyse case",
        "reached_state_date":"2014-09-05 11:11:30.808",
        "displayName":"Analyse case",
        "dueDate":"2014-09-05 12:11:30.775",
        "last_update_date":"2014-09-05 11:11:30.808"
      }, {
        "displayDescription":"Validate case",
        "executedBySubstitute":"0",
        "processId":"5826139717723007999",
        "state":"skipped",
        "rootContainerId":"1010",
        "type":"USER_TASK",
        "assigned_id":"971",
        "assigned_date":"2014-09-06 10:29:30.766",
        "id":"20004",
        "executedBy":"0",
        "caseId":"1023",
        "priority":"normal",
        "actorId":"102",
        "description":"",
        "name":"Validate case",
        "reached_state_date":"2014-09-06 12:10:50.744",
        "displayName":"Validate case",
        "dueDate":"2014-09-06 12:11:30.775",
        "last_update_date":"2014-09-06 12:10:50.744"
      }
    ]
    ```

#### Update a humanTask

##### Description

Fields that can be updated are `assignedId` and `state`. Specify only those fields that you want to change.

* **URL**  
  `/API/bpm/humanTask/:taskId`  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  { 
    "assigned_id" : "new_user_id", 
    "state": "new_state"
  }
  ``
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "state":"skipped"
    }
    ```

* [manualTask](api_resources/bpm_manualtask_6.0_0_0_1.md)
* [task](api_resources/bpm_task_6.0_0_0.md)
* [userTaskActions](api_resources/bpm_usertask_6.0_1_2_0_0_0.md)
* [archivedHumanTask](api_resources/bpm_archivedhumantask_6.0_2_0_0_0.md)
* [archivedManualTask](api_resources/bpm_archivedmanualtask_6.0_0_0_0_0.md)
* [archivedTask](api_resources/bpm_archivedtask_6.0_0_0_1.md)
* [archivedUserTask](api_resources/bpm_archivedusertask_6.0_0_0.md)

## Data
* [activityVariable](api_resources/bpm_activityvariable_6.0_0_0_0_0.md)
* [caseVariable ](api_resources/bpm_casevariable_6.4_0_0_1.md)
* [document](api_resources/bpm_document_7.1.md)
* [caseDocument](api_resources/bpm_casedocument_6.5_0_0_0_0.md)
* [archivedCaseDocument](api_resources/bpm_archivedcasedocument_6.0_0_0.md)

## Actors
* [actor](api_resources/bpm_actor_6.4_1_0_0_1.md)
* [actorMember](api_resources/bpm_actormember_6.4_0_0_0_0.md)

## Cases (Process Instances)
* [case](api_resources/bpm_case_7.0_1_0.md)
* [archivedCase](api_resources/bpm_archivedcase_7.0_0.md)
* [caseInfo](api_resources/bpm_caseinfo_6.5_0_0_0.md)

## Process
* [process](api_resources/bpm_process_7.0_1_0.md)
* [diagram](api_resources/bpm_diagram_6.4_0_0_0_0.md)
* [processParameter](api_resources/bpm_processparameter_6.0_0_0_0.md)
* [processResolutionProblem](api_resources/bpm_processresolutionproblem_6.0_1_0_0.md)

## Connectors
* [processConnectorDependency](api_resources/bpm_processconnectordependency_6.0_0_0_0.md)
* [connectorFailure](api_resources/bpm_connectorfailure_6.1_1_0_0.md)
* [connectorInstance](api_resources/bpm_connectorinstance_6.0_0_0.md)
* [archivedConnectorInstance](api_resources/bpm_archivedconnectorinstance_6.0_0_0.md)

## Flow Nodes
* [flowNode](api_resources/bpm_flownode_6.0_0_0_0_2.md)
* [archivedFlowNode](api_resources/bpm_archivedflownode_6.0_0_1.md)
* [timerEventTrigger](api_resources/bpm_timereventtrigger_6.4_0_0_0_0.md)
