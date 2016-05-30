# BPM API

## Activities and Tasks

### Activity

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
      "assigned_date": "2014-10-17 16:05:42.626",
      "id": "809764",
      "executedBy": "0",
      "priority": "the priority of the current activity as a string",
      "actorId": "50",
      "description": "In this step, a manager reviews and validates an expense request.",
      "name": "Validate",
      "reached_state_date": "2014-10-18 10:37:05.643",
      "displayName": "Validate expense request",
      "dueDate": "2014-10-21 16:05:42.626",
      "last_update_date": "2014-10-18 10:37:05.643"
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

### ManualTask

#### Description

Use the manualTask resource to access process subtasks. For archived subtasks use archivedManualTask.

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
  "type":"MANUAL_TASK", 
  "assigned_id":"_id of the assigned user_", 
  "assigned_date":"_date the subtask was assigned_", 
  "id":"_id of the humanTask that the subtask belongs to_", 
  "executedBy":"_id of the user who executed the subtask_", 
  "caseId":"_case id_", 
  "priority":"normal", 
  "actorId":"_id of the actor associated with the task_", 
  "description":"_description_", 
  "name":"_name_", 
  "reached_state_date":"_date and time when the subtask reached the current state_", 
  "rootCaseId" : "_id case_",  
  "displayName":"_subtask name displayed in the Portal_", 
  "parentTaskId":"_id of the parentTask that the subtask is associated with_", 
  "dueDate":"_date and time that the subtask is due_", 
  "last_update_date":"_date and time when the subtask was last updated_"
}

#### Methods

The methods used for this resource are:

* POST - Add a new subtask
* GET - Read or search a subtask
* PUT - Execute the subtask

#### Add a new subtask

Use a POST method to create a new subtask. A subtask is attached to a parent task and it needs to be immediately assigned to a user.

Example: 
* **URL**  
  `/API/bpm/manualTask``  
* **Method**  
  `POST`
* **Request Payload**  
  _Example_: Add a new subtask to the parent task with id 1\. The subtask has displayName "My subtask" , is assigned to user 1, and contains other important information.
  ```json
  {
    "parentTaskId":"40001", 
    "state":"ready", 
    "name":"My subtask", 
    "description":"This is my subtask", 
    "priority":"above_normal", 
    "dueDate":"2014-12-25 00:00:00.000", 
    "assigned_id":"1" 
  }
  ```
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    { 
      "displayDescription":"This is my subtask", 
      "executedBySubstitute":"1", 
      "processId":"8367255255370237633", 
      "parentCaseId":"1", 
      "state":"ready", 
      "rootContainerId":"1", 
      "type":"MANUAL_TASK", 
      "assigned_id":"1", 
      "assigned_date":"2014-12-01 17:39:53.784", 
      "id":"40006", 
      "executedBy":"1", 
      "caseId":"1", 
      "priority":"above_normal", 
      "actorId":"1", 
      "description":"This is my subtask", 
      "name":"My subtask", 
      "reached_state_date":"2014-12-01 17:39:53.784", 
      "rootCaseId":"1", 
      "displayName":"My subtask", 
      "parentTaskId":"40001", 
      "dueDate":"2014-12-25 00:00:00.000", 
      "last_update_date":"2014-12-01 17:39:53.784" 
    }
    ```

#### Execute a subtask

Use a PUT method to execute a subtask. Executing a subtask basically means changing its state to completed and providing an executedBy value.

* **URL**  
  `/API/bpm/manualTask``  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  { 
    "state":"completed", 
    "executedBy":"1" 
  }
  ```
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    { 
      "displayDescription":"This is my subtask", 
      "executedBySubstitute":"1", 
      "processId":"8367255255370237633", 
      "parentCaseId":"1", 
      "state":"ready", 
      "rootContainerId":"1", 
      "type":"MANUAL_TASK", 
      "assigned_id":"1", 
      "assigned_date":"2014-12-01 17:39:53.784", 
      "id":"40006", 
      "executedBy":"1", 
      "caseId":"1", 
      "priority":"above_normal", 
      "actorId":"1", 
      "description":"This is my subtask", 
      "name":"My subtask", 
      "reached_state_date":"2014-12-01 17:39:53.784", 
      "rootCaseId":"1", 
      "displayName":"My subtask", 
      "parentTaskId":"40001", 
      "dueDate":"2014-12-25 00:00:00.000", 
      "last_update_date":"2014-12-01 17:39:53.784" 
    }
    ```

#### Retrieve a subtask

Use a GET method to retrieve information about a subtask.

* **URL**  
  `/API/bpm/manualTask/:manualTaskId``  
* **Method**  
  `GET`
* **Success Response**  
  * **Code**: 200

#### Search subtasks

Use a GET method with filters and search terms to search for subtasks.

* **URL**  
  `/API/bpm/manualTask`  
* **Method**  
  ``
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  You can filter on:

  * `assigned\_id={user\_id}`: retrieve only the manual tasks assigned to the specified user. For example, retrieve the manual tasks assigned to user with id 1: `/API/bpm/manualTask?p=0&c=10&f=assigned_id%3d1`.
  * `state=skipped | ready | completed | failed` : retrieve only the manual tasks with the specified state. For example, retrieve the ready tasks: `/API/bpm/manualTask?p=0&c=10&f=state%3dready`.
  * `caseId={case\_id}`: retrieve only the manual tasks created in the specified case. For example, retrieve the manual tasks for the case\_id 2: `/API/bpm/manualTask?p=0&c=10&f=caseId%3d2`.
  * `parentTaskId={parentTask\_id}`: retrieve only the manual tasks for a specific parentTask. For example, retrieve the manual tasks for the parentTask\_id 40001: `/API/bpm/manualTask?p=0&c=10&f=parentTaskId%3d40001`.

  You can search on:

  * name: search all manual tasks with a name that starts with the search string. For example, search for all manual tasks that have a name that starts with MySubTask: `/API/bpm/manualTask?p=0&c=10&s=MySubTask`.
* **Success Response**  
  An array of manualTask objects
  * **Code**: 200

## Task

#### Description

Manage process tasks

#### Identifier

The ID of the task (a long value).

#### Representation
```json
{ 
  "displayDescription":"_the human readable task description (string)_", 
  "executedBySubstitute":"_the id (long) of the user who really performed this task in case where a substitute did it, or 0 if the task was not performed by a substitute_", 
  "processId":"_the process id (long) that is associated with this task_", 
  "parentCaseId":"_the parent case id (long) that is associated with this task's case_", 
  "state":"_the current state of the task (string, for example, ready, completed, failed)_", 
  "rootContainerId":"_the root process id (long) of the root case that is associated with this task_", 
  "type":"_the task type (string)_", 
  "assigned_id":"_the user id (long) that this task is assigned to, or 0 if it is unassigned_", 
  "assigned_date":"_date_", 
  "id":"_the task id (long)_", 
  "executedBy":"_the id (long) of the user who executed the task, or 0 if the task has not been executed_", 
  "caseId":"_the case id (long) that is associated with this task_", 
  "rootCaseId":"_the root case initiator id (long) that is associated with this task's case_", 
  "parentCaseId":"_the parent case id (long) that is associated with this task's case_", 
  "priority":"_the priority (string) of the current task_", 
  "actorId":"_the id (long) of the actor that can execute this task, null otherwise_", 
  "description":"_the task description (string)_", 
  "name":"_the task name (string)_", 
  "reached_state_date":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task reached the current state, for example '2014-10-17 16:05:42.626'_", 
  "displayName":"_the display name (string) of this task_", 
  "dueDate":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task is due, for example '2014-10-17 16:05:42.626'_", 
  "last_update_date":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was last updated, for example '2014-10-17 16:05:42.626'_" 
}

#### Methods

The methods used for this resource are:

* GET - Read a resource or search for a resource
* PUT - Update a resource

#### Read a task

* **URL**  
  `/API/bpm/task/:taskId`  
* **Method**  
  `GET`
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    JSON representation of a task
    ```json
    { 
      "displayDescription":"", 
      "executedBySubstitute":"0", 
      "processId":"9132099022957910959", 
      "parentCaseId":"5", 
      "state":"ready", 
      "rootContainerId":"5", 
      "type":"USER_TASK", 
      "assigned_id":"4", 
      "assigned_date":"2014-12-01 16:22:54.685", 
      "id":"10", 
      "executedBy":"0", 
      "caseId":"5", 
      "priority":"normal", 
      "actorId":"6", 
      "description":"", 
      "name":"Step1", 
      "reached_state_date":"2014-12-01 16:22:50.814", 
      "rootCaseId":"5", 
      "displayName":"Step1", 
      "dueDate":"2014-12-01 17:22:50.809", 
      "last_update_date":"2014-12-01 16:22:50.814" 
    }
    ```

#### Update a task

* **URL**  
  `/API/bpm/task/:taskId`  
* **Method**  
  `PUT`
* **Request Payload**  
  Task fields to update (forbidden fields are : caseId, processId, name, executedBy, type, id, reached\_state\_date, last\_update\_date)
  ```json
  { "state": "completed" }
  ```
* **Success Response**  
  * **Code**: 
  * **Payload**:  
    ```json
    ```

#### Search tasks

* **URL**  
  `/API/bpm/task`  
  _Example_: Get ten first tasks for process id 8410739119827826184 order by state `/API/bpm/task?c=10&p=0&f=processId=8410739119827826184&o=state`
* **Method**  
  `GET`
* **Data Params**  
  * Accepted sort values (o={value}) : caseId, processId, state, type, supervisor\_id, last\_update\_date
  * Accepted filters (f={filter}=value) : caseId, processId, state, type, supervisor\_id, last\_update\_date
  * Accepted deployer (d={deployer}) : processId, caseId, rootContainerId, executedBy, executedBySubstitute
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    JSON representation of an array of tasks
    ```json
    [ 
      { 
        "displayDescription":"", 
        "executedBySubstitute":"0", 
        "processId":"8410739119827826184", 
        "parentCaseId":"9", 
        "state":"ready", 
        "rootContainerId":"9", 
        "type":"USER_TASK", 
        "assigned_id":"", 
        "assigned_date":"", 
        "id":"18", 
        "executedBy":"0", 
        "caseId":"9", 
        "priority":"normal", 
        "actorId":"7", 
        "description":"", 
        "name":"Step1", 
        "reached_state_date":"2014-12-01 16:48:31.189", 
        "rootCaseId":"9", 
        "displayName":"Step1", 
        "dueDate":"2014-12-01 17:48:31.185", 
        "last_update_date":"2014-12-01 16:48:31.189" 
      }, { 
        "displayDescription":"", 
        "executedBySubstitute":"0", 
        "processId":"8410739119827826184", 
        "parentCaseId":"10", 
        "state":"ready", 
        "rootContainerId":"10", 
        "type":"USER_TASK", 
        "assigned_id":"", 
        "assigned_date":"", 
        "id":"20", 
        "executedBy":"0", 
        "caseId":"10", 
        "priority":"normal", 
        "actorId":"7", 
        "description":"", 
        "name":"Step1", 
        "reached_state_date":"2014-12-01 16:48:37.666", 
        "rootCaseId":"10", 
        "displayName":"Step1", 
        "dueDate":"2014-12-01 17:48:37.662", 
        "last_update_date":"2014-12-01 16:48:37.666" 
      } 
    ]
    ```

### UserTask

#### Description

An executable task that is performed by a user.

#### Identifier

Simple, the ID of the object (a long value)

#### Representation

```json
{
  "displayDescription":"_the human readable task description (string)_", 
  "executedBySubstitute":"_the id (long) of the user who really performed this task in case where a substitute did it, or 0 if the task was not performed by a substitute_", 
  "processId":"_the process id (long) that is associated with this task_", 
  "state":"_the current state of the task (string, for example, ready, completed, failed)_", 
  "rootContainerId":"_the root process id (long) of the root case that is associated with this task_", 
  "type":"USER_TASK", 
  "assigned_id":"_the user id (long) that this task is assigned to, or 0 if it is unassigned_", 
  "assigned_date":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was assigned to the assigned user due, for example '2014-10-17 16:05:42.626'_", 
  "id":"_the task id (long)_", 
  "executedBy":"_the id (long) of the user who executed the task, or 0 if the task has not been executed_", 
  "caseId":"_the id (long) of the case_", 
  "priority":"_the priority (string) of the current task_", 
  "actorId":"_the id (long) of the actor that can execute this task, null otherwise_", 
  "description":"_the task description (string)_", 
  "name":"_the task name (string)_", 
  "reached_state_date":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task reached the current state, for example '2014-10-17 16:05:42.626'_", 
  "displayName":"_the display name (string) of this task_", 
  "dueDate":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task is due, for example '2014-10-17 16:05:42.626'_", 
  "last_update_date":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was last updated, for example '2014-10-17 16:05:42.626'_"
} 
```

#### Methods

The methods used for this resource are:

* GET - Retrieve a userTask, search for userTask objects
* POST - Execute a task with contract
* PUT - Update a userTask

### Actions

### Retrieve a userTask

* **URL**  
  `/API/bpm/userTask/:userTaskId`  
* **Method**  
  `GET`
* **Success Response**  
  A userTask object
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

#### Update a userTask

Fields that can be updated are `assignedId` and `state`. The only value that can be set for the state is "skipped". You only need to specify the fields that are to be updated.

* **URL**  
  `/API/bpm/userTask/:userTaskId`  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  {
    "assigned_id" : "id of new user",
    "state":"skipped"
  }
  ```
* **Success Response**  
  * **Code**: 200

#### Retrieve the task contract

Task contract elements can be retrived client side.

* **URL**  
  `/API/bpm/userTask/:userTaskId/contract`  
* **Method**  
  `GET`
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    {  
      "constraints":[  
        {  
          "name":"ticket_comment",
          "expression":"ticket_comment!=null && !ticket_comment.toString().isEmpty()",
          "explanation":"input ticket_comment is mandatory",
          "inputNames":[  
            "ticket_comment"
            ],
          "constraintType":"MANDATORY"
        }
      ],
      "inputs":[  
        {  
           "description":null,
           "name":"ticket_comment",
           "multiple":false,
           "type":"TEXT"
           "inputs":[]
        }
      ]
    }
    ```

#### Execute a task with contract

In order to execute a task, the task contract values have to be provided.

* **URL**  
  `/API/bpm/userTask/:userTaskId/execution`  
* **Method**  
  `POST`
* **Request Payload**  
  A JSON object matching task contract.
  Execute a task providing correct contract values.
  ```json
  {  
    "ticket_comment":"This is a comment"
  }
  ```
* **Success Response**  
  * **Code**: 204
* **Error Response**
  * **Code**: 400 contract violation explanation
  * **Response Payload**
    ```json
    {  
      "exception":"class org.bonitasoft.engine.bpm.contract.ContractViolationException",
      "message":"USERNAME=walter.bates | Contract is not valid: ",
      "explanations":[  
        "Expected input [ticket_comment] is missing"
      ]
    }
    ```

#### Retrieve the userTask context

* **URL**  
  `/API/bpm/userTask/:userTaskId/context`  
  _Example_: ``
* **Method**  
  `GET`
* **Success Response**  
  A context object
  * **Code**: 200
  * **Payload**:  
    ```json
    {  
      "businessData_ref":{  
        "name":"myBusinessDate",
        "type":"com.company.model.BusinessObject1",
        "link":"API/bdm/businessData/com.company.model.BusinessObject1/2",
        "storageId":2,
        "storageId_string":"2"
      },
      "document1_ref":{  
        "id":1,
        "processInstanceId":3,
        "name":"myDocument",
        "author":104,
        "creationDate":1434723950847,
        "fileName":"TestCommunity-1.0.bos",
        "contentMimeType":null,
        "contentStorageId":"1",
        "url":"documentDownload?fileName=TestCommunity-1.0.bos&contentStorageId=1",
        "description":"",
        "version":"1",
        "index":-1,
        "contentFileName":"TestCommunity-1.0.bos"
      }
    }
    ```

### ArchivedHumanTask

#### Description

An Archived Human task is a User task or Manual task that has been archived. 

#### Identifier

Simple, the ID of the object (a long value)

#### Representation

```json
{ 
  "displayDescription": "_the human readable task description (string)_", 
  "executedBySubstitute": "_the id (long) of the user who really performed this task in case where a substitute did it, or 0 if the task was not performed by a substitute_", 
  "processId": "_the process id (long) that is associated with this task_", 
  "state": "_the current state of the task (string,  for example, ready, completed, failed)_", 
  "rootContainerId": "_the root process id (long) of the root case that is associated with this task_", 
  "type": "_the task type (USER_TASK | MANUAL_TASK)_", 
  "assigned_id": "_the user id (long) that this task is assigned to, or 0 if it is unassigned_", 
  "assigned_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current task was assigned, for example '2014-10-17 16:05:42.626'_", 
  "id": "_the task id (long)_", 
  "sourceObjectId":"_id (long) of the original humanTask before archiving_",
  "executedBy": "_the id (long) of the user who executed the task, or 0 if the task has not been executed_",
  "caseId":"_id of case_",
  "priority": "_the priority (string) of the task_", 
  "actorId": "_the id (long) of the actor that can execute this task, null otherwise_", 
  "description": "_the task description (string)_", 
  "name": "_the task name (string)_", 
  "reached_state_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task reached the current state, for example '2014-10-17 16:05:42.626'_", 
  "displayName": "_the display name (string) of this task_", 
  "dueDate": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task is due, for example '2014-10-17 16:05:42.626'_", 
  "last_update_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was last updated, for example '2014-10-17 16:05:42.626'_"
}
```

#### Methods

The methods used for this resource are:

* GET - Read a resource

#### Actions

##### Retrieve an archivedHumanTask

* **URL**  
  `/API/bpm/archivedHumanTask/:archivedHumanTaskId`
* **Method**  
  `GET`
* **Success Response**  
  The JSON representation of an archivedHumanTask
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "displayDescription":"",
      "executedBySubstitute":"0",
      "processId":"5826139717723008213",
      "state":"skipped",
      "rootContainerId":"1002",
      "type":"USER_TASK",
      "assigned_id":"2",
      "id":"240002",
      "executedBy":"0",
      "sourceObjectId":"20004",
      "caseId":"1002",
      "priority":"normal",
      "actorId":"102",
      "description":"",
      "name":"Analyse case",
      "reached_state_date":"2014-09-09 17:21:51.946",
      "displayName":"Analyse case",
      "archivedDate":"2014-09-09 17:21:51.986",
      "dueDate":"2014-09-05 12:11:30.775",
      "last_update_date":"2014-09-09 17:21:51.946"
    }
    ```

##### Search for a archivedHumanTask

Retrieve archivedHumanTask objects that match the specified filters. 

* **URL**  
  `/API/bpm/archivedHumanTask`  
  _Example_: Get the human tasks assigned to the user with id 2. `/API/bpm/archivedHumanTask?p=0&c=10&f=assigned_id%3d2`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  You can filter on:
  * `assigned\_id={user\_id}`: retrieve only the human tasks assigned to the specified ID. For example, retrieve the human tasks assigned to user with id 2: `/API/bpm/archivedHumanTask?p=0&c=10&f=assigned\_id%3d2`
  * `state=`: retrieve only the archived user tasks with the specified state. For example, retrieve the skipped tasks: `/API/bpm/archivedHumanTask?p=0&c=10&f=state=skipped`
  * `name=`: retrieve only the human tasks with the specified name. For example, retrieve the human tasks with the name "Analyse Case": `/API/bpm/archivedHumanTask?p=0&c=10&f=name=Analyse Case`
  * `displayName=`: retrieve only the archived user tasks with the specified displayName. For example, retrieve the human tasks with the displayName "Analyse Case": `/API/bpm/archivedHumanTask?p=0&c=10&f=displayName=Analyse Case`
* **Success Response**  
  An array of archivedHumanTask objects in JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "displayDescription":"Case analysis",
        "executedBySubstitute":"0",
        "processId":"5826139717723008213",
        "state":"failed",
        "rootContainerId":"1002",
        "type":"USER_TASK",
        "assigned_id":"2",
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
      },
      {
        "displayDescription":"Validate case",
        "executedBySubstitute":"0",
        "processId":"5826139717723007999",
        "state":"skipped",
        "rootContainerId":"1010",
        "type":"USER_TASK",
        "assigned_id":"2",
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

### ArchivedManualTask

#### Description

Use the archivedManualTask resource to access archived process subtasks.

#### Identifier

Simple, the ID of the object (a long value)

#### Representation
```json
{ 
  "displayDescription": "_the human readable subtask description (string)_", 
  "executedBySubstitute": "_the id (long) of the user who really performed this subtask in case where a substitute did it, or 0 if the subtask was not performed by a substitute_", 
  "processId": "_the process id (long) that is associated with this subtask_", 
  "state": "_the current state of the subtask (string,  for example, ready, completed, failed)_", 
  "rootContainerId": "_the root process id (long) of the root case that is associated with this subtask_", 
  "type": "MANUAL_TASK", 
  "assigned_id": "_the user id (long) that this subtask is assigned to, or 0 if it is unassigned_", 
  "id": "_the subtask id (long)_", 
  "sourceObjectId":"_id (long) of the original manualTask before archiving_", 
  "executedBy": "_the id (long) of the user who executed the task, or 0 if the task has not been executed_",
  "caseId":"_id (long) of the case that is associated with this subtask_", 
  "priority":"normal", 
  "actorId": "_the id (long) of the actor that can execute this subtask, null otherwise_", 
  "description": "_the subtask description (string)_", 
  "name": "_the subtask name (string)_", 
  "reached_state_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this subtask reached the current state, for example '2014-10-17 16:05:42.626'_", 
  "archivedDate": "_the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this subtask was archived, for example '2014-10-17 16:05:42.626'_",
  "rootCaseId": "_the root case initiator id (long) that is associated with this subtask's case_", 
  "displayName": "_the display name (string) of this subtask_", 
  "parentTaskId":"_id (long) of the parentTask that the subtask is associated with_", 
  "dueDate": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this subtask is due, for example '2014-10-17 16:05:42.626'_", 
  "last_update_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this subtask was last updated, for example '2014-10-17 16:05:42.626')_"
 }
```

#### Methods

The methods used for this resource are:

* GET - Read or search an archived subtask

#### Retrieve a subtask

Use a GET method to retrieve information about a subtask.

* **URL**  
  `/API/bpm/archivedManualTask/:archivedHumanTaskId`  
* **Method**  
  `GET`
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "displayDescription":"this is a test",
      "executedBySubstitute":"1",
      "processId":"8367255255370237633",
      "parentCaseId":"1",
      "state":"completed",
      "rootContainerId":"1",
      "type":"MANUAL_TASK",
      "assigned_id":"1",
      "id":"160007",
      "sourceObjectId":"40003",
      "executedBy":"1",
      "caseId":"1",
      "priority":"highest",
      "actorId":"1",
      "description":"this is a test",
      "name":"myTest",
      "reached_state_date":"2014-12-01 17:20:47.200",
      "rootCaseId":"1",
      "archivedDate":"2014-12-01 17:20:47.217",
      "displayName":"myTest",
      "parentTaskId":"40001",
      "dueDate":"2014-12-17 00:00:00.000",
      "last_update_date":"2014-12-01 17:20:47.200"
    }
    ```

#### Search subtasks

Use a GET method with filters and search terms to search for subtasks.

* **URL**  
  `/API/bpm/archivedManualTask`  
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  You can filter on:
  * `assigned\_id={user\_id}`: retrieve only the manual tasks assigned to the specified user. For example, retrieve the manual tasks assigned to user with id 1: `/API/bpm/archivedManualTask?p=0&c=10&f=assigned_id%3d10`
  * `state=skipped` | completed | failed : retrieve only the manual tasks with the specified state. For example, retrieve the ready tasks: `/API/bpm/archivedManualTask?p=0&c=10&f=state%3dready`
  * `caseId={case\_id}`: retrieve only the manual tasks created in the specified case. For example, retrieve the manual tasks for the case\_id 2: `/API/bpm/archivedManualTask?p=0&c=10&f=caseId%3d2`
  * `parentTaskId={parentTask\_id}`: retrieve only the manual tasks for a specific parentTask\_id. For example, retrieve the manual tasks for the parentTask\_id 40001: `/API/bpm/archivedManualTask?p=0&c=10&f=parentTaskId%3d40001`

  You can search on:
  * `name`: search all manual tasks with a name that starts with the search string. For example, search for all manual tasks that have a name that starts with MySubTask: `/API/bpm/archivedManualTask?p=0&c=10&s=MySubTask`
* **Success Response**  
  An array of manualTask objects
  * **Code**: 200

### ArchivedTask

#### Description

Get informations about archived tasks

#### Identifier

The ID of the archived task (a long value).

#### Representation
```json
{ 
  "displayDescription": "_the human readable task description (string)_", 
  "executedBySubstitute": "_the id (long) of the user who really performed this task in case where a substitute did it, or 0 if the task was not performed by a substitute_", 
  "processId": "_the process id (long) that is associated with this task_", 
  "parentCaseId": "_the parent case id (long) that is associated with this task's case_", 
  "state": "_the current state of the task (string,  for example, ready, completed, failed)_", 
  "rootContainerId": "_the root process id (long) of the root case that is associated with this task_", 
  "type": "_the task type (string)_", 
  "assigned_id": "_the user id (long) that this task is assigned to, or 0 if it is unassigned_", 
  "id": "_the task id (long)_",  
  "executedBy": "_the id (long) of the user who executed the task, or 0 if the task has not been executed_",
  "sourceObjectId": "_the original id of the task before it was archived_",
  "caseId": "_the case id (long) that is associated with this task_", 
  "priority": "_the priority (string) of the current task_", 
  "actorId": "_the id (long) of the actor that can execute this task, null otherwise_", 
  "description": "_the task description (string)_", 
  "name": "_the task name (string)_", 
  "reached_state_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task reached the current state, for example '2014-10-17 16:05:42.626'_", 
  "rootCaseId": "_the root case initiator id (long) that is associated with this task's case_", 
  "displayName": "_the display name (string) of this task_", 
  "archivedDate": "_the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this task was archived, for example '2014-10-17 16:05:42.626'_",
  "dueDate": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task is due, for example '2014-10-17 16:05:42.626'_", 
  "last_update_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was last updated, for example '2014-10-17 16:05:42.626)_", 
}
```

#### Methods

The methods used for this resource are:

* GET - Read a resource or search for a resource

#### Read an archived task

* **URL**  
  `/API/bpm/archivedTask/:taskId`  
* **Method**  
  `GET`
* **Success Response**  
  JSON representation of an archived task
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "displayDescription":"",
      "executedBySubstitute":"4",
      "processId":"9132099022957910959",
      "parentCaseId":"5",
      "state":"completed",
      "rootContainerId":"5",
      "type":"USER_TASK",
      "assigned_id":"4",
      "id":"9",
      "sourceObjectId":"10",
      "executedBy":"4",
      "caseId":"5",
      "priority":"normal",
      "actorId":"6",
      "description":"",
      "name":"Step1",
      "reached_state_date":"2014-12-01 16:24:32.457",
      "rootCaseId":"5",
      "archivedDate":"2014-12-01 16:24:32.460",
      "displayName":"Step1",
      "dueDate":"2014-12-01 17:22:50.809",
      "last_update_date":"2014-12-01 16:24:32.457"
    }
    ```

#### Search archived tasks

* **URL**  
  `/API/bpm/archivedTask`  
  _Example_: Search ten first archived task of process 8410739119827826184 order by name: `/API/bpm/archivedTask?c=10&p=0&f=processId=8410739119827826184&o=name`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  

  * Accepted sort values `o={value}` : caseId, name, displayName, processId, state, type, archivedDate, reached\_state\_date, assigned\_id
  * Accepted filters `f={filter}=value` : caseId, name, displayName, processId, state, type, archivedDate, reached\_state\_date, assigned\_id, isTerminal
  * Accepted deployer `d={deployer}` : processId, caseId, rootContainerId, executedBy, executedBySubstitute
* **Success Response**  
  JSON representation of an array of archived tasks
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "displayDescription":"",
        "executedBySubstitute":"4",
        "processId":"8410739119827826184",
        "parentCaseId":"6",
        "state":"completed",
        "rootContainerId":"6",
        "type":"USER_TASK",
        "assigned_id":"4",
        "id":"12",
        "sourceObjectId":"12",
        "executedBy":"4",
        "caseId":"6",
        "priority":"normal",
        "actorId":"7",
        "description":"",
        "name":"Step1",
        "reached_state_date":"2014-12-01 16:31:46.961",
        "rootCaseId":"6",
        "archivedDate":"2014-12-01 16:31:46.965",
        "displayName":"Step1",
        "dueDate":"2014-12-01 17:31:42.563",
        "last_update_date":"2014-12-01 16:31:46.961"
      },
      {
        "displayDescription":"",
        "executedBySubstitute":"4",
        "processId":"8410739119827826184",
        "parentCaseId":"7",
        "state":"completed",
        "rootContainerId":"7",
        "type":"USER_TASK",
        "assigned_id":"4",
        "id":"15",
        "sourceObjectId":"14",
        "executedBy":"4",
        "caseId":"7",
        "priority":"normal",
        "actorId":"7",
        "description":"",
        "name":"Step1",
        "reached_state_date":"2014-12-01 16:32:13.232",
        "rootCaseId":"7",
        "archivedDate":"2014-12-01 16:32:13.235",
        "displayName":"Step1",
        "dueDate":"2014-12-01 17:32:07.918",
        "last_update_date":"2014-12-01 16:32:13.232"
      }
    ]
    ```

### ArchivedUserTask

#### Description

An executable task that has been performed by a user or skipped and is archived.

#### Identifier

Simple, the ID of the object (a long value)

#### Representation
```json
{
  "displayDescription":"_the human readable task description (string)_", 
  "executedBySubstitute":"_the id (long) of the user who really performed this task in case where a substitute did it, or 0 if the task was not performed by a substitute_", 
  "processId":"_the process id (long) that is associated with this task_", 
  "state":"_the current state of the task (string, for example, ready, completed, failed)_", 
  "rootContainerId":"_the root process id (long) of the root case that is associated with this task_", 
  "type":"USER_TASK", 
  "assigned_id":"_the user id (long) that this task is assigned to, or 0 if it is unassigned_", 
  "assigned_date":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was assigned to the assigned user due, for example '2014-10-17 16:05:42.626'_", 
  "id":"_the task id (long)_", 
  "executedBy":"_the id (long) of the user who executed the task, or 0 if the task has not been executed_", 
  "caseId":"_the id (long) of the case_", 
  "priority":"_the priority (string) of the current task_", 
  "actorId":"_the id (long) of the actor that can execute this task, null otherwise_", 
  "description":"_the task description (string)_", 
  "name":"_the task name (string)_", 
  "reached_state_date":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task reached the current state, for example '2014-10-17 16:05:42.626'_", 
  "displayName":"_the display name (string) of this task_", 
  "archivedDate":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was archived, for example '2014-10-17 16:05:42.626'_", 
  "dueDate":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task is due, for example '2014-10-17 16:05:42.626'_", 
  "last_update_date":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was last updated, for example '2014-10-17 16:05:42.626'_"
} 
```

#### Methods

The methods used for this resource are:

* GET - Retrieve an archivedUserTask, search for archivedUserTask objects

#### Actions

##### Retrieve an archivedUserTask

* **URL**  
  `API/bpm/archivedUserTask/:id`  
* **Method**  
  `GET`
* **Success Response**  
  An archivedUserTask object
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "displayDescription":"",
      "executedBySubstitute":"0",
      "processId":"5826139717723008213",
      "state":"skipped",
      "rootContainerId":"1002",
      "type":"USER_TASK",
      "assigned_id":"2",
      "id":"240002",
      "executedBy":"0",
      "caseId":"1002",
      "priority":"normal",
      "actorId":"102",
      "description":"",
      "name":"Analyse case",
      "reached_state_date":"2014-09-09 17:21:51.946",
      "displayName":"Analyse case",
      "archivedDate":"2014-09-09 17:21:51.986",
      "dueDate":"2014-09-05 12:11:30.775",
      "last_update_date":"2014-09-09 17:21:51.946"
    }
    ```

##### Search for a archivedUserTask

Retrieve archivedHumanTask objects that match the specified filters. 

* **URL**  
  `/API/bpm/archivedUserTask`  
  _Example_: Get the user tasks assigned to the user with id 2:`/API/bpm/archivedUserTask?p=0&c=10&f=assigned\_id%3d2`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  

  You can filter on:
  * `assigned\_id={user\_id}`: retrieve only the user tasks assigned to the specified ID. For example, retrieve the user tasks assigned to user with id 2: `/API/bpm/archivedUserTask?p=0&c=10&f=assigned\_id%3d2`
  * `state=`: retrieve only the archived user tasks with the specified state. For example, retrieve the skipped tasks: `/API/bpm/archivedUserTask?p=0&c=10&f=state=skipped`
  * `name=`: retrieve only the user tasks with the specified name. For example, retrieve the user tasks with the name "Analyse Case": `/API/bpm/archivedUserTask?p=0&c=10&f=name=Analyse Case`
  * `displayName=`: retrieve only the archived user tasks with the specified displayName. For example, retrieve the user tasks with the displayName "Analyse Case": `/API/bpm/archivedUserTask?p=0&c=10&f=displayName=Analyse Case`

* **Success Response**  
  An array of archivedUserTask objects
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "displayDescription":"Case analysis",
        "executedBySubstitute":"0",
        "processId":"5826139717723008213",
        "state":"failed",
        "rootContainerId":"1002",
        "type":"USER_TASK",
        "assigned_id":"2",
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
        "assigned_id":"2",
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
