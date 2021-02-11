# REST API BPM API 

Easily retrieve human or service tasks, call activities, and subprocesses with BPM APIs. Perform maintenance tasks. 

## Activities and Tasks

<a id="activity"/>

### Activity

#### Description

Use this resource to retrieve activities (human or service tasks), call activities, and subprocesses currently running on the platform. It enables you to perform maintenance tasks like skipping or replaying a failed task and modifying variables.

#### Identifier

The ID of the activity (a long value).

#### Representation
```json
{
  "id": "the activity id (long)",
  "type": "the activity type (string)",
  "name": "the activity technical name (string)",
  "displayName": "the human readable activity name (string)",
  "description": "the activity description (string)",
  "displayDescription": "the human readable activity description (string)",
  "state": "the current state of the activity (string, possible values: ready, completed, failed)",
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity reached the current state, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity was last updated, for example '2014-10-17 16:05:42.626)",
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity is due, for example '2014-10-17 16:05:42.626'",
  "priority": "the priority (string) of the current activity",
  
  "processId": "the process definition id (long) of the case which define this activity",
  "parentCaseId": "the immediate containing case id (long, a.k.a process instance id)",
  "rootCaseId": "the top/root case id (long, a.k.a process instance id). In the case of an event sub process, parentCaseId will the id of the case called while rootCaseId will be the one from the caller case",
  "rootContainerId": "same as rootCaseId",
  
  "executedBy": "the id (long) of the user who performed this activity. The activity has to be a human task otherwise its value will be 0",
  "executedBySubstitute": "the id (long) of the user who did actually performed the activity in the case of has been done in the name of someone else. Value is 0 otherwise",
  "actorId": "the id (long) of the actor that can execute this activity, null otherwise",
  "assigned_id": "the user id (long) that this activity is assigned to, or 0 if it is unassigned",
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current activity was assigned, for example '2014-10-17 16:05:42.626'"
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
* CALL\_ACTIVITY

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

<a id="activity-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * processId
  * caseId
  * rootCaseId
  * parentCaseId
  * rootContainerId
  * executedBy
  * executedBySubstitute (only in Efficiency, Performance and Enterprise editions)
  * actorId
  * assigned\_id
  * parentTaskId

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

::: info
Note: if the task definition includes a connector that is executed on finish and updates the value of a variable, the value set by the REST API call is overwritten.
:::

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

Make this call after all failed connectors have been reset. (only in Performance and Enterprise editions)

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
    * supervisor\_id (only in Efficiency, Performance and Enterprise editions)
  * d: extend resource response parameters of [this resource](#activity-deploy) are available.
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
  "id": "the archived activity id (long)",
  "type": "the archived activity type (string)",
  "name": "the archived activity technical name (string)",
  "displayName": "the human readable archived activity name (string)",
  "description": "the archived activity description (string)",
  "displayDescription": "the human readable archived activity description (string)",
  "state": "the current state of the archived activity (string, possible values: ready, completed, failed)",
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this archived activity reached the current state, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this archived activity was last updated, for example '2014-10-17 16:05:42.626)",
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this archived activity is due, for example '2014-10-17 16:05:42.626'",
  "priority": "the priority (string) of the current archived activity",
  
  "processId": "the process definition id (long) of the case which define this archived activity",
  "parentCaseId": "the immediate containing case id (long, a.k.a process instance id)",
  "rootCaseId": "the top/root case id (long, a.k.a process instance id). In the case of an event sub process, parentCaseId will the id of the case called while rootCaseId will be the one from the caller case",
  "rootContainerId": "same as rootCaseId",
  
  "executedBy": "the id (long) of the user who performed this archived activity. The archived activity has to be a human task otherwise its value will be 0",
  "executedBySubstitute": "the id (long) of the user who did actually performed the archived activity in the case of has been done in the name of someone else. Value is 0 otherwise",
  "actorId": "the id (long) of the actor that can execute this archived activity, null otherwise",
  "assigned_id": "the user id (long) that this archived activity is assigned to, or 0 if it is unassigned",
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current archived activity was assigned, for example '2014-10-17 16:05:42.626'",

  "sourceObjectId": "the original id of the archived activity before it was archived",
  "archivedDate": "the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this archived activity was archived, for example '2014-10-17 16:05:42.626'"
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

<a id="archived-activity-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * processId: the id of the process that is associated with the activity 
  * caseId: the id of the case that is associated with the activity
  * rootCaseId: the root case that is associated with this activity's case
  * parentCaseId: the parent case that is associated with this activity's case
  * rootContainerId: the root process of the root case that is associated with this activity
  * executedBy: the user who executed the activity
  * executedBySubstitute: the user who executed the activity for the executedBy user (only in Effeciency, Performance and Enterprise editions)
  * actorId: the actor that can execute this activity
  * assigned\_id: the user this activity is assigned to
  * parentTaskId: in the case of a subtask, the parent task

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
    * supervisor\_id: retrieve the information the process manager associated to this id has access to (only in Efficiency, Performance and Enterprise editions)
    * f: same as the sort order fields
  * d: extend resource response parameters of [this resource](#archived-activity-deploy) are available.
* **Success Response**  
  An array of JSON representations of the specified activities
  * **Code**: 200

<a id="human-task"/>

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

  "id": "the task id (long)",
  "type": "the task type (string): USER_TASK | MANUAL_TASK",
  "name": "the task technical name (string)",
  "displayName": "the human readable task name (string)",
  "description": "the task description (string)",
  "displayDescription": "the human readable task description (string)",
  "state": "the current state of the task (string, possible values: ready, completed, failed)",
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task reached the current state, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was last updated, for example '2014-10-17 16:05:42.626)",
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task is due, for example '2014-10-17 16:05:42.626'",
  "priority": "the priority (string) of the current task",
  
  "processId": "the process definition id (long) of the case which define this task",
  "parentCaseId": "the immediate containing case id (long, a.k.a process instance id)",
  "rootCaseId": "the top/root case id (long, a.k.a process instance id). In the case of an event sub process, parentCaseId will the id of the case called while rootCaseId will be the one from the caller case",
  "rootContainerId": "same as rootCaseId",
  
  "executedBy": "the id (long) of the user who performed this task. The task has to be a human task otherwise its value will be 0",
  "executedBySubstitute": "the id (long) of the user who did actually performed the task in the case of has been done in the name of someone else. Value is 0 otherwise",
  "actorId": "the id (long) of the actor that can execute this task, null otherwise",
  "assigned_id": "the user id (long) that this task is assigned to, or 0 if it is unassigned",
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current task was assigned, for example '2014-10-17 16:05:42.626'"
}
```

#### Methods

The methods used for this resource are:

* GET - Read a resource
* PUT - Update a resource

<a id="manual-task-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * processId: the id of the process that is associated with the activity 
  * caseId: the id of the case that is associated with the activity
  * rootCaseId: the root case that is associated with this activity's case
  * parentCaseId: the parent case that is associated with this activity's case
  * rootContainerId: the root process of the root case that is associated with this activity
  * executedBy: the user who executed the activity
  * executedBySubstitute: the user who executed the activity for the executedBy user (only in Effeciency, Performance and Enterprise editions)
  * actorId: the actor that can execute this activity
  * assigned\_id: the user this activity is assigned to
  * parentTaskId: in the case of a subtask, the parent task


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
  [Standard search parameters](rest-api-overview.md#resource_search) are available:
  * d: extend resource response parameters of [this resource](#human-task-deploy) are available.
  * o: name, priority, dueDate, state, processDefinitionId, processInstanceId, 
  parentActivityInstanceId, assigneeId, parentContainerId, displayName, reachedStateDate
  * s: search on any field that can be used to order results
  * f: assigned_id, state, name, displayName, processDefinitionId, caseId, parentCaseId, rootCaseId
  
  For instance, you can filter on:
  * `assigned_id={user_id}`: retrieve only the human tasks assigned to the specified ID. For example, retrieve the human tasks assigned to user with id 2: `/API/bpm/humanTask?p=0&c=10&f=assigned_id%3d2`
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
  ```
* **Success Response**  
  * **Code**: 200

### ManualTask

#### Description

Use the manualTask resource to access process subtasks. For archived subtasks use archivedManualTask.

#### Identifier

Simple, the ID of the object (a long value)

#### Representation
```json
{
  "id": "the task id (long)",
  "type": "the task type (string): MANUAL_TASK",
  "name": "the task technical name (string)",
  "displayName": "the human readable task name (string)",
  "description": "the task description (string)",
  "displayDescription": "the human readable task description (string)",
  "state": "the current state of the task (string, possible values: ready, completed, failed)",
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task reached the current state, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was last updated, for example '2014-10-17 16:05:42.626)",
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task is due, for example '2014-10-17 16:05:42.626'",
  "priority": "the priority (string) of the current task",
  
  "processId": "the process definition id (long) of the case which define this task",
  "parentCaseId": "the immediate containing case id (long, a.k.a process instance id)",
  "rootCaseId": "the top/root case id (long, a.k.a process instance id). In the case of an event sub process, parentCaseId will the id of the case called while rootCaseId will be the one from the caller case",
  "rootContainerId": "same as rootCaseId",
  
  "executedBy": "the id (long) of the user who performed this task. The task has to be a human task otherwise its value will be 0",
  "executedBySubstitute": "the id (long) of the user who did actually performed the task in the case of has been done in the name of someone else. Value is 0 otherwise",
  "actorId": "the id (long) of the actor that can execute this task, null otherwise",
  "assigned_id": "the user id (long) that this task is assigned to, or 0 if it is unassigned",
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current task was assigned, for example '2014-10-17 16:05:42.626'"
}
```

#### Methods

The methods used for this resource are:

* POST - Add a new subtask
* GET - Read or search a subtask
* PUT - Execute the subtask

#### Add a new subtask

Use a POST method to create a new subtask. A subtask is attached to a parent task and it needs to be immediately assigned to a user.

Example: 
* **URL**  
  `/API/bpm/manualTask`  
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
  `/API/bpm/manualTask/:manualTaskId`  
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

#### Retrieve a subtask

Use a GET method to retrieve information about a subtask.

* **URL**  
  `/API/bpm/manualTask/:manualTaskId`  
* **Method**  
  `GET`
* **Success Response**  
  * **Code**: 200

#### Search subtasks

Use a GET method with filters and search terms to search for subtasks.

* **URL**  
  `/API/bpm/manualTask`  
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  You can filter on:
  * `assigned_id={user_id}`: retrieve only the manual tasks assigned to the specified user. For example, retrieve the manual tasks assigned to user with id 1: `/API/bpm/manualTask?p=0&c=10&f=assigned_id%3d1`.
  * `state=skipped | ready | completed | failed` : retrieve only the manual tasks with the specified state. For example, retrieve the ready tasks: `/API/bpm/manualTask?p=0&c=10&f=state%3dready`.
  * `caseId={case_id}`: retrieve only the manual tasks created in the specified case. For example, retrieve the manual tasks for the case\_id 2: `/API/bpm/manualTask?p=0&c=10&f=caseId%3d2`.
  * `parentTaskId={parentTask_id}`: retrieve only the manual tasks for a specific parentTask. For example, retrieve the manual tasks for the parentTask\_id 40001: `/API/bpm/manualTask?p=0&c=10&f=parentTaskId%3d40001`.

  You can search on:
  * name: search all manual tasks with a name that starts with the search string. For example, search for all manual tasks that have a name that starts with MySubTask: `/API/bpm/manualTask?p=0&c=10&s=MySubTask`.
* **Success Response**  
  An array of manualTask objects
  * **Code**: 200

### Task

#### Description

Manage process tasks

#### Identifier

The ID of the task (a long value).

#### Representation
```json
{ 
  "id": "the task id (long)",
  "type": "the task type (string)",
  "name": "the task technical name (string)",
  "displayName": "the human readable task name (string)",
  "description": "the task description (string)",
  "displayDescription": "the human readable task description (string)",
  "state": "the current state of the task (string, possible values: ready, completed, failed)",
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task reached the current state, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was last updated, for example '2014-10-17 16:05:42.626)",
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task is due, for example '2014-10-17 16:05:42.626'",
  "priority": "the priority (string) of the current task",
  
  "processId": "the process definition id (long) of the case which define this task",
  "parentCaseId": "the immediate containing case id (long, a.k.a process instance id)",
  "rootCaseId": "the top/root case id (long, a.k.a process instance id). In the case of an event sub process, parentCaseId will the id of the case called while rootCaseId will be the one from the caller case",
  "rootContainerId": "same as rootCaseId",
  
  "executedBy": "the id (long) of the user who performed this task. The task has to be a human task otherwise its value will be 0",
  "executedBySubstitute": "the id (long) of the user who did actually performed the task in the case of has been done in the name of someone else. Value is 0 otherwise",
  "actorId": "the id (long) of the actor that can execute this task, null otherwise",
  "assigned_id": "the user id (long) that this task is assigned to, or 0 if it is unassigned",
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current task was assigned, for example '2014-10-17 16:05:42.626'"
}
```
#### Methods

The methods used for this resource are:

* GET - Read a resource or search for a resource
* PUT - Update a resource

<a id="task-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * processId: the id of the process that is associated with the activity 
  * caseId: the id of the case that is associated with the activity
  * rootCaseId: the root case that is associated with this activity's case
  * parentCaseId: the parent case that is associated with this activity's case
  * rootContainerId: the root process of the root case that is associated with this activity
  * executedBy: the user who executed the activity
  * executedBySubstitute: the user who executed the activity for the executedBy user (only in Effeciency, Performance and Enterprise editions)
  * actorId: the actor that can execute this activity
  * assigned\_id: the user this activity is assigned to
  * parentTaskId: in the case of a subtask, the parent task

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
  * **Code**: 200

#### Search tasks

* **URL**  
  `/API/bpm/task`  
  _Example_: Get ten first tasks for process id 8410739119827826184 order by state `/API/bpm/task?c=10&p=0&f=processId=8410739119827826184&o=state`
* **Method**  
  `GET`
* **Data Params**  
  * Accepted sort values (`o={value}`) : caseId, processId, state, type, supervisor\_id, last\_update\_date
  * Accepted filters (`f={filter}=value`) : caseId, processId, state, type, supervisor\_id, last\_update\_date
  * d: extend resource response parameters of [this resource](#task-deploy) are available.
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
  "id": "the task id (long)",
  "type": "the task type (string): USER_TASK",
  "name": "the task technical name (string)",
  "displayName": "the human readable task name (string)",
  "description": "the task description (string)",
  "displayDescription": "the human readable task description (string)",
  "state": "the current state of the task (string, possible values: ready, completed, failed)",
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task reached the current state, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was last updated, for example '2014-10-17 16:05:42.626)",
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task is due, for example '2014-10-17 16:05:42.626'",
  "priority": "the priority (string) of the current task",
  
  "processId": "the process definition id (long) of the case which define this task",
  "parentCaseId": "the immediate containing case id (long, a.k.a process instance id)",
  "rootCaseId": "the top/root case id (long, a.k.a process instance id). In the case of an event sub process, parentCaseId will the id of the case called while rootCaseId will be the one from the caller case",
  "rootContainerId": "same as rootCaseId",
  
  "executedBy": "the id (long) of the user who performed this task. The task has to be a human task otherwise its value will be 0",
  "executedBySubstitute": "the id (long) of the user who did actually performed the task in the case of has been done in the name of someone else. Value is 0 otherwise",
  "actorId": "the id (long) of the actor that can execute this task, null otherwise",
  "assigned_id": "the user id (long) that this task is assigned to, or 0 if it is unassigned",
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current task was assigned, for example '2014-10-17 16:05:42.626'"
} 
```

#### Methods

The methods used for this resource are:

* GET - Retrieve a userTask, search for userTask objects
* POST - Execute a task with contract
* PUT - Update a userTask

<a id="user-task-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * processId: the id of the process that is associated with the activity 
  * caseId: the id of the case that is associated with the activity
  * rootCaseId: the root case that is associated with this activity's case
  * parentCaseId: the parent case that is associated with this activity's case
  * rootContainerId: the root process of the root case that is associated with this activity
  * executedBy: the user who executed the activity
  * executedBySubstitute: the user who executed the activity for the executedBy user (only in Effeciency, Performance and Enterprise editions)
  * actorId: the actor that can execute this activity
  * assigned\_id: the user this activity is assigned to
  * parentTaskId: in the case of a subtask, the parent task

#### Actions

##### Retrieve a userTask

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

##### Update a userTask

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

##### Retrieve the task contract

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

##### Execute a task with contract

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
* **Optional URL Parameter**  
  `assign=true`, assign the task to the current user and execute the task.
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

<a id="retrieve-the-usertask-context" />

##### Retrieve the userTask context

* **URL**  
  `/API/bpm/userTask/:userTaskId/context`  
* **Method**  
  `GET`
* **Success Response**  
  A context object
  * **Code**: 200
  * **Payload**:  
    ```json
    {  
      "myBusinessData_ref":{  
        "name":"myBusinessData",
        "type":"com.company.model.BusinessObject1",
        "link":"API/bdm/businessData/com.company.model.BusinessObject1/2",
        "storageId":2,
        "storageId_string":"2"
      },
      "myDocument_ref":{  
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
  "id": "the activity id (long)",
  "type": "the activity type (string): USER_TASK | MANUAL_TASK",
  "name": "the activity technical name (string)",
  "displayName": "the human readable activity name (string)",
  "description": "the activity description (string)",
  "displayDescription": "the human readable activity description (string)",
  "state": "the current state of the activity (string, possible values: ready, completed, failed)",
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity reached the current state, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity was last updated, for example '2014-10-17 16:05:42.626)",
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity is due, for example '2014-10-17 16:05:42.626'",
  "priority": "the priority (string) of the current activity",
  "sourceObjectId":"id (long) of the original humanTask before archiving",
  "archivedDate": "the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this humanTask was archived, for example '2014-10-17 16:05:42.626'",
  
  "processId": "the process definition id (long) of the case which define this activity",
  "parentCaseId": "the immediate containing case id (long, a.k.a process instance id)",
  "rootCaseId": "the top/root case id (long, a.k.a process instance id). In the case of an event sub process, parentCaseId will the id of the case called while rootCaseId will be the one from the caller case",
  "rootContainerId": "same as rootCaseId",
  
  "executedBy": "the id (long) of the user who performed this activity. The activity has to be a human task otherwise its value will be 0",
  "executedBySubstitute": "the id (long) of the user who did actually performed the activity in the case of has been done in the name of someone else. Value is 0 otherwise",
  "actorId": "the id (long) of the actor that can execute this activity, null otherwise",
  "assigned_id": "the user id (long) that this activity is assigned to, or 0 if it is unassigned",
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current activity was assigned, for example '2014-10-17 16:05:42.626'"
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
  * `assigned_id={user_id}`: retrieve only the human tasks assigned to the specified ID. For example, retrieve the human tasks assigned to user with id 2: `/API/bpm/archivedHumanTask?p=0&c=10&f=assigned_id%3d2`
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
  "id": "the archived manual task id (long)",
  "type": "the archived manual task type (string): MANUAL_TASK",
  "name": "the archived manual task technical name (string)",
  "displayName": "the human readable archived manual task name (string)",
  "description": "the archived manual task description (string)",
  "displayDescription": "the human readable archived manual task description (string)",
  "state": "the current state of the archived manual task (string, possible values: ready, completed, failed)",
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this archived manual task reached the current state, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this archived manual task was last updated, for example '2014-10-17 16:05:42.626)",
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this archived manual task is due, for example '2014-10-17 16:05:42.626'",
  "priority": "the priority (string) of the current archived manual task",
  "sourceObjectId":"id (long) of the original manualTask before archiving", 
  "archivedDate": "the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this subtask was archived, for example '2014-10-17 16:05:42.626'",
  
  "processId": "the process definition id (long) of the case which define this archived manual task",
  "parentCaseId": "the immediate containing case id (long, a.k.a process instance id)",
  "rootCaseId": "the top/root case id (long, a.k.a process instance id). In the case of an event sub process, parentCaseId will the id of the case called while rootCaseId will be the one from the caller case",
  "rootContainerId": "same as rootCaseId",
  
  "executedBy": "the id (long) of the user who performed this archived manual task. The archived manual task has to be a human task otherwise its value will be 0",
  "executedBySubstitute": "the id (long) of the user who did actually performed the archived manual task in the case of has been done in the name of someone else. Value is 0 otherwise",
  "actorId": "the id (long) of the actor that can execute this archived manual task, null otherwise",
  "assigned_id": "the user id (long) that this archived manual task is assigned to, or 0 if it is unassigned",
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current archived manual task was assigned, for example '2014-10-17 16:05:42.626'"

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
  * `assigned_id={user_id}`: retrieve only the manual tasks assigned to the specified user. For example, retrieve the manual tasks assigned to user with id 1: `/API/bpm/archivedManualTask?p=0&c=10&f=assigned_id%3d10`
  * `state=skipped` | completed | failed : retrieve only the manual tasks with the specified state. For example, retrieve the ready tasks: `/API/bpm/archivedManualTask?p=0&c=10&f=state%3dready`
  * `caseId={case_id}`: retrieve only the manual tasks created in the specified case. For example, retrieve the manual tasks for the case\_id 2: `/API/bpm/archivedManualTask?p=0&c=10&f=caseId%3d2`
  * `parentTaskId={parentTask_id}`: retrieve only the manual tasks for a specific parentTask\_id. For example, retrieve the manual tasks for the parentTask\_id 40001: `/API/bpm/archivedManualTask?p=0&c=10&f=parentTaskId%3d40001`

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
  "id": "the archived task id (long)",
  "type": "the archived task type (string)",
  "name": "the archived task technical name (string)",
  "displayName": "the human readable archived task name (string)",
  "description": "the archived task description (string)",
  "displayDescription": "the human readable archived task description (string)",
  "state": "the current state of the archived task (string, possible values: ready, completed, failed)",
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this archived task reached the current state, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this archived task was last updated, for example '2014-10-17 16:05:42.626)",
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this archived task is due, for example '2014-10-17 16:05:42.626'",
  "priority": "the priority (string) of the current archived task",
  "sourceObjectId": "the original id of the task before it was archived",
  "archivedDate": "the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this task was archived, for example '2014-10-17 16:05:42.626'",
  
  "processId": "the process definition id (long) of the case which define this archived task",
  "parentCaseId": "the immediate containing case id (long, a.k.a process instance id)",
  "rootCaseId": "the top/root case id (long, a.k.a process instance id). In the case of an event sub process, parentCaseId will the id of the case called while rootCaseId will be the one from the caller case",
  "rootContainerId": "same as rootCaseId",
  
  "executedBy": "the id (long) of the user who performed this archived task. The archived task has to be a human task otherwise its value will be 0",
  "executedBySubstitute": "the id (long) of the user who did actually performed the archived task in the case of has been done in the name of someone else. Value is 0 otherwise",
  "actorId": "the id (long) of the actor that can execute this archived task, null otherwise",
  "assigned_id": "the user id (long) that this archived task is assigned to, or 0 if it is unassigned",
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current archived task was assigned, for example '2014-10-17 16:05:42.626'"
}
```

#### Methods

The methods used for this resource are:

* GET - Read a resource or search for a resource

<a id="archived-task-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * processId: the id of the process that is associated with the activity 
  * caseId: the id of the case that is associated with the activity
  * rootCaseId: the root case that is associated with this activity's case
  * parentCaseId: the parent case that is associated with this activity's case
  * rootContainerId: the root process of the root case that is associated with this activity
  * executedBy: the user who executed the activity
  * executedBySubstitute: the user who executed the activity for the executedBy user (only in Effeciency, Performance and Enterprise editions)
  * actorId: the actor that can execute this activity
  * assigned\_id: the user this activity is assigned to
  * parentTaskId: in the case of a subtask, the parent task

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
  * d: extend resource response parameters of [this resource](#archived-task-deploy) are available.
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
  "id": "the user task id (long)",
  "type": "the user task type (string): USER_TASK",
  "name": "the user task technical name (string)",
  "displayName": "the human readable user task name (string)",
  "description": "the user task description (string)",
  "displayDescription": "the human readable user task description (string)",
  "state": "the current state of the user task (string, possible values: ready, completed, failed)",
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this user task reached the current state, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this user task was last updated, for example '2014-10-17 16:05:42.626)",
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this user task is due, for example '2014-10-17 16:05:42.626'",
  "priority": "the priority (string) of the current user task",
  "archivedDate":"the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was archived, for example '2014-10-17 16:05:42.626'", 
  
  "processId": "the process definition id (long) of the case which define this user task",
  "parentCaseId": "the immediate containing case id (long, a.k.a process instance id)",
  "rootCaseId": "the top/root case id (long, a.k.a process instance id). In the case of an event sub process, parentCaseId will the id of the case called while rootCaseId will be the one from the caller case",
  "rootContainerId": "same as rootCaseId",
  
  "executedBy": "the id (long) of the user who performed this user task. The user task has to be a human task otherwise its value will be 0",
  "executedBySubstitute": "the id (long) of the user who did actually performed the user task in the case of has been done in the name of someone else. Value is 0 otherwise",
  "actorId": "the id (long) of the actor that can execute this user task, null otherwise",
  "assigned_id": "the user id (long) that this user task is assigned to, or 0 if it is unassigned",
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current user task was assigned, for example '2014-10-17 16:05:42.626'"
} 
```

#### Methods

The methods used for this resource are:

* GET - Retrieve an archivedUserTask, search for archivedUserTask objects

<a id="archived-user-task-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * processId: the id of the process that is associated with the activity 
  * caseId: the id of the case that is associated with the activity
  * rootCaseId: the root case that is associated with this activity's case
  * parentCaseId: the parent case that is associated with this activity's case
  * rootContainerId: the root process of the root case that is associated with this activity
  * executedBy: the user who executed the activity
  * executedBySubstitute: the user who executed the activity for the executedBy user (only in Effeciency, Performance and Enterprise editions)
  * actorId: the actor that can execute this activity
  * assigned\_id: the user this activity is assigned to
  * parentTaskId: in the case of a subtask, the parent task

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
  _Example_: Get the user tasks assigned to the user with id 2:`/API/bpm/archivedUserTask?p=0&c=10&f=assigned_id%3d2`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  

  You can filter on:
  * `assigned_id={user_id}`: retrieve only the user tasks assigned to the specified ID. For example, retrieve the user tasks assigned to user with id 2: `/API/bpm/archivedUserTask?p=0&c=10&f=assigned_id%3d2`
  * `state=`: retrieve only the archived user tasks with the specified state. For example, retrieve the skipped tasks: `/API/bpm/archivedUserTask?p=0&c=10&f=state=skipped`
  * `name=`: retrieve only the user tasks with the specified name. For example, retrieve the user tasks with the name "Analyse Case": `/API/bpm/archivedUserTask?p=0&c=10&f=name=Analyse Case`
  * `displayName=`: retrieve only the archived user tasks with the specified displayName. For example, retrieve the user tasks with the displayName "Analyse Case": `/API/bpm/archivedUserTask?p=0&c=10&f=displayName=Analyse Case`
  
  * d: extend resource response parameters of [this resource](#archived-user-deploy) are available.

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

### ActivityVariable

#### Description

This resource enables you to retrieve the value of a specific variable name for a specific case (or process instance). Only persistent variables are concerned by this resource, not transient variables.

#### Identifier

The ID of the activity variable (a long value).

#### Representation

```json
{ 
  "tenantId": "The ID of the tenant where the current user is logged in (technical information)",
  "tenantId_string": "number (since 7.0.1)",
  "id":_The identifier of the variable",
  "id_string":"number (since 7.0.1)",
  "name": "The name of the activity variable",
  "description": "The description of the variable, if any",
  "transientData": "FALSE",  //Always false (boolean)
  "className": "The fully qualified class name of the variable type",
  "containerId": "The ID of the activity containing this variable (same as the one passed as parameter) if the variable is defined at activity level, or ID of the process instance if the variable is defined on the process",
  "containerId_string": "number" (since 7.0.1)_,
  "containerType": "ACTIVITY_INSTANCE" | "PROCESS_INSTANCE" _depending on whether the variable is defined at activity or process level.",
  "value": "the value of this variable. The format of the value depends on the type of the variable" 
}
 ```   

The string representation added in 7.0.1 for Long attributes is a workaround for the JavaScript integer spectrum issue.

#### Methods

The methods available for this resource are:

* GET - Read an existing non-finished activity instance variable

#### Retrieving a activity instance variable

* **URL**  
  `/API/bpm/activityVariable/:activityId/:variableName`  
  * activity\_id: the identifier of the activity from which to retrieve the variable
  * variable\_name: the name of the variable to retrieve  
  _Example_: `API/bpm/activityVariable/20004/RequestValidationData`
* **Method**  
  `GET`
* **Success Response**  
  A JSON representation of the retrieved activity variable
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "tenantId":0,
      "tenantId_string":"0",
      "id":5010,
      "id_string":"5010",
      "name":"RequestValidationData",
      "description":null,
      "transientData":false,
      "className":"java.lang.String",
      "containerId":20004,
      "containerId_string":"20004",
      "containerType":"ACTIVITY_INSTANCE",
      "value":"Confirmed"
    }
    ```
    
### CaseVariable 

#### Description

Search, count, find, or update case variable values. A case is an instance of a process.

#### Identifier

The ID of the case variable (a long value).

#### Representation

```json
{
  "description":"Detailed description of the case variable, as set in the definition at design-time",
  "name":"name of the variable in the case",
  "value":"the current value of the case variable",
  "case_id":"ID of the case this variable belongs to",
  "type":_the Java type of the variable"
}
```

#### Methods

The methods used for this resource are:

* GET - Search for case variables from its case ID, or find a single case variable from case ID and variable name
* PUT - Update a case variable value

#### Get a case variable
  
* **URL**  
  `/API/bpm/caseVariable/:caseId/:variableName`  
* **Method**  
  `GET`
* **Success Response**  
  A case variable representation
  * **Code**: 200
  * **Payload**:  
    ```json
    {				
      "description":"",
      "name":"myInvoiceAmount",
      "value":"14.2",
      "case_id":"1",
      "type":"java.lang.Float"
    }
    ```

#### Update a case variable

Warning: only following types are supported for _javaTypeclassname_: java.lang.String, java.lang.Integer, java.lang.Double, java.lang.Long, java.lang.Boolean, java.util.Date

* **URL**  
  `/API/bpm/caseVariable/:caseId/:variableName`  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  {
    type: "javaTypeclassname",
    value: "newValue"
  }
  ```
* **Success Response**  
  * **Code**: 200

#### Search for a list of case variables

* **URL**  
  `/API/bpm/caseVariable`  
  _Example_: `/API/bpm/caseVariable?p=0&c=10&f=case\_id%3d11754`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  `f = case_id%3d[caseId]` to indicate that you want to add a filter on 'case\_id' with value \[caseId\] (%3d is the URL-encoded '=' (equals) sign)
* **Success Response**  
  A representation of a list of case variables
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "description":"",
        "name":"myInvoiceAmount",
        "value":"14.2",
        "case_id":"11754",
        "type":"java.lang.Float"
      }, 
      {
        "description":"invoice reference",
        "name":"myInvoiceReference",
        "value":"1FFL54184KOL",
        "case_id":"11754",
        "type":"java.lang.Long"
      }
    ]
    ```
    
### Document

#### Description

Use the document resource to access a document in an active case. 

::: warning
**:fa-exclamation-triangle: Caution:** This resource is deprecated and may be removed in a future release. Instead, use caseDocument or archivedCaseDocument.
:::

## CaseDocument

#### Description

Use the case document resource to access a document in an active case. For archived cases and previous document versions use archivedCaseDocument.

::: warning
* `author` in the payload is deprecated: use `submittedBy`
:::

#### Identifier

The ID of the document (a long value).

#### Representation

```json
{
  "id":"documentId",
  "creationDate":"date and time",
  "author":"submittorUserId",
  "index":"index in a list of documents, or -1 for a single document",
  "contentMimetype":"MIMEtype",
  "caseId":"caseId", 
  "contentStorageId":"storageId", 
  "isInternal":"true | false", 
  "description":" description", 
  "name":"name", 
  "fileName":"filename", 
  "submittedBy":"submittorUserId", 
  "url":"urlForDownload", 
  "version":"version" 
}
```

#### Methods

The methods used for this resource are:

* POST - Create a resource
* GET - Read a resource
* PUT - Update a resource
* DELETE - Remove a resource

<a id="upload_casedoc"/>

#### Add a document to a case

Use a POST method to add a document to a case. You can upload a document from the local file system or by URL. Specify the case id and the document name in the payload. 
The document description is optional: if you do not specify a description, the description in the response is empty. The response contains a version, which is managed automatically.
You cannot currently retrieve a specific version of a document, only the most recent version. To retrieve earlier versions of a caseDocument, use the archivedCaseDocument resource.

* **URL**  
  `/API/bpm/caseDocument`  
* **Method**  
  `POST`
* **Request Payload**  
  _Example 1_: Upload `doc.jpg` from the tenant temporary upload folder to case 1 with the display name "Doc 1" and renaming the file into "document\_1.jpg":
  ```json
  {
    "caseId": "1",
    "file": "doc.jpg",
    "name": "Doc 1",
    "fileName": "document_1.jpg",
    "description": "draft"
  }
  ```
  _Example 2_: Upload `train_receipt.png` from my cloud drive to case 1 with the name "Train receipt":
  ```json
  {
    "caseId" : "1",
    "url" : "http://cloud.storage.com/sites/chris/expenses/july_2014/train_receipt.png",
    "name" : "Train receipt"
  }
  ```
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    _Example 1_:  
    In this example, `isInternal` is set to `true` because the the document object contains the content directly.  
    ```json
    {
      "id":"3",
      "creationDate":"2014-10-09 16:45:36.658",
      "author":"1",
      "index":"-1",
      "contentMimetype":"application/octet-stream",
      "caseId":"1",
      "contentStorageId":"4",
      "isInternal":"true",
      "description":"draft,
      "name":"Doc 1",
      "fileName":"document_1.jpg",
      "submittedBy":"1",
      "url":"documentDownload?fileName=document_1.jpg&contentStorageId=4",
      "version":"1"
    }
    ```
    _Example 2_:  
    In this example, `isInternal` is set to `false` because the document is specified by URL so the document object contains a reference to the content, not the content itself.  
    ```json
    {
      "id":"4",
      "creationDate":"2014-10-09 16:45:36.658",
      "author":"1",
      "index":"-1",
      "contentMimetype":"image/png",
      "caseId":"1",
      "contentStorageId":"4",
      "isInternal":"false",
      "description":"draft,
      "name":"Train receipt",
      "fileName":"train_receipt.png",
      "submittedBy":"1",
      "url":"http://cloud.storage.com/sites/chris/expenses/july_2014/train_receipt.png",
      "version":"1"
    }
    ```

#### Get a document from a case

Use a GET method to get a document from a case. First you get the document information, then you download the content. 
To get the document information, specify the document id in the URL. The document id is created when you upload a document to a case. There is no payload.

* **URL**  
  `/API/bpm/caseDocument/:documentId``  
* **Method**  
  `GET`
* **Success Response**  
  The response includes the "url" to use to download the content. Call the documentDownload servlet with this URL: 
  `/portal/documentDownload?fileName=doc.jpg&contentStorageId=4`.  
  **Note:** The filename attribute is just a way to indicate to the browser under what name the document should be downloaded. There is no check to make sure that the filename passed matches he original one as the sensitive part is the content of the document not its name and when you develop a process/app you may want the documents to be downloaded under a specific name different from the initial document name. This is the purpose of this parameter.
  _Note_: Since Bonita 7.10, document url fileName is now URL encoded. 
  This will avoid errors when a document to be downloaded contains special characters in its name.  
  In the previous versions, a workaround was necessary client-side using the javascript native function "encodeURI" to generate document download url. You can now remove this workaround.

  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"3",
      "creationDate":"2014-10-09 16:45:36.658",
      "author":"1",
      "index":"-1",
      "contentMimetype":"application/octet-stream",
      "caseId":"1",
      "contentStorageId":"4",
      "isInternal":"true",
      "description":"draft,
      "name":"Doc 1",
      "fileName":"doc.jpg",
      "submittedBy":"1",
      "url":"documentDownload?fileName=doc.jpg&contentStorageId=4",
      "version":"1"
    }
    ```

#### Update a document in a case

You update a document in a case by uploading a new version of the document using a PUT method. 
You can upload a document version from the local file system or by URL. 
The document name will be used in all the cases of the process, but the combination of case id and document name is unique.

In the URL, you specify to supply the document id. This is included in the response when you first [add a document to a case](#upload_casedoc).

The response to PUT methods is the same as for POST methods.

* **URL**  
  `/API/bpm/caseDocument/:documentId`
* **Method**  
  `PUT`
* **Data Params**  
* **Request Payload**  
  Example 1: Update the document ExpensesPolicy in case 1 by uploading `Expense policy rev2.pdf` from the tenant temporary upload folder. The document id, 17 in this example, is specified in the URL. The description is optional. The filename allows to rename the file into "revision2.pdf" Method
  ```json
  {
    "file" : "Expense policy rev2.pdf",
    "description" : "updated version of document"
    "fileName": "revision2.pdf",
  }
  ```
  Example 2: Update the document ExpensesPolicy in case 1 by uploading `Expense policy rev2.pdf` from my cloud drive. The document id is 17\.
  ```json
  {
    "url" : "http://cloud.storage.com/sites/chris/expenses/july_2014/Expense policy rev2.pdf"
  }
  ```
* **Success Response**  
  * **Code**: 200
 
#### Search for a document

* **URL**  
  `/API/bpm/caseDocument`  
  _Example_:   
  Find all documents with a document name equal to doc1: `/API/bpm/caseDocument?p=0&c=10&f=name=doc1`  
  Find all documents with with any of the searchable fields starting with "doc". `/API/bpm/caseDocument?p=0&c=10&s=doc`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  It is possible to filter on three parameters: submittedBy, name and description.
  * `submittedBy="id"`: search for documents that were submitted by the user with the specified identifier.
  * `name="string"`: search for documents with names that contain _string_. 
    Depending on the setting for [word-based search](using-list-and-search-methods.md), the search returns documents with _string_ at the start of the name or the start of a word in the name.
  * `description="string"`: search for documents with descriptions that contain _string_. 
    Depending on the setting for [word-based search](using-list-and-search-methods.md), the search returns documents with _string_ at the start of the description or the start of a word in the description.
* **Success Response**  
  A document object for each matching document
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "id":"3",
        "creationDate":"2014-10-09 16:45:36.658",
        "author":"1",
        "index":"-1",
        "contentMimetype":"application/octet-stream",
        "caseId":"1",
        "contentStorageId":"4",
        "isInternal":"true",
        "description":"draft,
        "name":"doc1",
        "fileName":"doc.jpg",
        "submittedBy":"1",
        "url":"documentDownload?fileName=test.txt&contentStorageId=1",
        "version":"1"
      }, {
        "id":"4",
        "creationDate":"2014-10-09 16:45:36.658",
        "author":"1",
        "index":"-1",
        "contentMimetype":"image/png",
        "caseId":"1",
        "contentStorageId":"4"
        "isInternal":"false",
        "description":"draft,
        "name":"doc2",
        "fileName":"train_receipt.png",
        "submittedBy":"1",
        "url":"http://cloud.storage.com/sites/chris/expenses/july_2014/train_receipt.png",
        "version":"1"
      }
    ]
    ```

#### Delete a document

* **URL**  
  `/API/bpm/caseDocument/:documentId`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200

### ArchivedCaseDocument

#### Description

Use the archived case document resource to access previous document versions for active and archived cases

#### Identifier

The ID of the document (a long value).

#### Representation

```json
{
  "id":"archivedDocumentId", 
  "creationDate":"date and time of the original document creation", 
  "author":"submittorUserId", 
  "index":"index in a list of documents. if -1 it represents a single document", 
  "contentMimetype":"MIMEtype", 
  "caseId":"caseId", 
  "contentStorageId":"storageId", 
  "isInternal":"true | false", 
  "description":" description", 
  "name":"name", 
  "fileName":"filename", 
  "submittedBy":"submittorUserId", 
  "url":"urlForDownload", 
  "version":"version", 
  "sourceObjectId":"originalDocumentId", 
  "archivedDate":"date and time of the archived document creation"
}
```   

#### Methods

The methods used for this resource are:

* GET - Read a resource
* DELETE - Remove the physical file related to the specified id but keep the mapping for audit purposes

#### Search for a document

You can use a single GET method to return all the documents that match the specified filters.

* **URL**  
  `/API/bpm/archivedCaseDocument`  
  _Examples_
  * List all versions of a simple document (knowing its current version Id) `/API/bpm/archivedCaseDocument?c=10&p=0&f=sourceObjectId=1` 
  * List all versions of a list of document (knowing its name) `/API/bpm/archivedCaseDocument?c=10&p=0&f=name=MyDocList`
  * List all versions of all documents of the case of id `1`: `/API/bpm/archivedCaseDocument?c=10&p=0&f=caseId=1`
  * List all versions of all document of the archived case of id `1` `/API/bpm/archivedCaseDocument?c=10&p=0&f=archivedCaseId=1`
  * Combine different filters, for example list all versions of a list declared in a case (knowing list name and case id) `/API/bpm/archivedCaseDocument?c=10&p=0&f=caseId=1&f=name=myDocList&o=index ASC`

Response payload
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  It is possible to filter on the following parameters: sourceObjectId, caseId, archivedCaseId, submittedBy, name, description.

  * `sourceObjectId="id"`: search for documents by specifying the original document id. 
    This is useful if you know the id of a caseDocument and you wish to retrieve all its previous versions..
  * `caseId="id"`: search for documents with the specified open case id.
  * `archivedCaseId="id"`: search for documents with the specified archvied case id.
  * `submittedBy="id"`: search for documents that were submitted by the user with the specified identifier.
  * `name="string"`: search for documents with names that contain _string_. 
    Depending on the setting for [word-based search](using-list-and-search-methods.md), the search returns documents with _string_ at the start of the name or the start of a word in the name.
  * `description="string"`: search for documents with descriptions that contain _string_. 
    Depending on the setting for [word-based search](using-list-and-search-methods.md), the search returns documents with _string_ at the start of the description or the start of a word in the description.
* **Success Response**  
  An archived document object for each matching document
  * **Code**: 200
  * **Payload**:  
    ```json
    [{
       "id":"1",
       "creationDate":"2014-10-09 16:39:52.472", 
       "author":"1",
       "index":"0",
       "contentMimetype":"text/plain",
       "caseId":"1",
       "contentStorageId":"1",
       "isInternal":"true",
       "description":"",
       "name":"myDoc",
       "fileName":"test1.txt",
       "submittedBy":"1",
       "url":"documentDownload?fileName=test1.txt&contentStorageId=1",
       "version":"1",
       "sourceObjectId":"1",
       "archivedDate":"2014-10-09 17:39:52.473"
    }, {
       "id":"2", 
       "creationDate":"2014-10-09 16:39:52.473", 
       "author":"1", 
       "index":"1", 
       "contentMimetype":"text/plain", 
       "caseId":"1", 
       "contentStorageId":"2", 
       "isInternal":"true", 
       "description":"", 
       "name":"myDoc", 
       "fileName":"test2.txt", 
       "submittedBy":"1", 
       "url":"documentDownload?fileName=test2.txt&contentStorageId=2", 
       "version":"2", 
       "sourceObjectId":"1",
       "archivedDate":"2014-10-09 18:39:52.473"
    }, {
       "id":"3", 
       "creationDate":"2014-10-09 16:39:52.473", 
       "author":"1", 
       "index":"2", 
       "contentMimetype":"text/plain", 
       "caseId":"1", 
       "contentStorageId":"3", 
       "isInternal":"true", 
       "description":"", 
       "name":"myDoc", 
       "fileName":"test3.txt", 
       "submittedBy":"1", 
       "url":"documentDownload?fileName=test3.txt&contentStorageId=3", 
       "version":"3",
       "sourceObjectId":"1", 
       "archivedDate":"2014-10-09 19:39:52.473" 
    }]
    ```

#### Delete a document content

Delete the document content with id 3
* **URL**  
  `/API/bpm/archivedCaseDocument/:archivedCaseId``  
* **Method**  
  `DELETE`

## Actors

### Actor

#### Description

Manage process actors.

#### Identifier

Simple, the ID of the object (a long value)

#### Representation

```json
{
  "id":"actor id",
  "process_id":"process definition id",
  "description":"a description of the actor",
  "name":"name of the actor (as specified on human tasks and for the initiator of the process)",
  "displayName":"the display name of the actor",
}
```

#### Methods

The methods used for this resource are:

* GET - Read or search an actor
* PUT - Update an actor

#### Read an actor

Use a GET method to retrieve information about an actor.

* **URL**  
  `/API/bpm/actor/:actorId`  
  _Example_: Get the information about the actor with id=1\: `/API/bpm/actor/1`  
* **Method**  
  `GET`
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"1",
      "process_id":"4717422838168315799",
      "description":"",
      "name":"employee",
      "displayName":"Employee actor"
    }
    ```

#### Search actors for a given process id

Use a GET method to search actors for a given process id.

* **URL**  
  `/API/bpm/actor`  
  _Example_: Count the actor members of actors of the process with id 4758765 `/API/bpm/actor?p=0&c=10&f=process_id=4758765&n=users&n=group&n=roles&n=memberships`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "id":"1",
        "process_id":"4758765",
        "description":"",
        "name":"employee",
        "displayName":"Employee actor"
      }, {
        "id":"2",
        "process_id":"4758765",
        "description":"",
        "name":"customer",
        "displayName":"Customer actor"
      }
    ]
    ```

#### Update an actor

Use the PUT method to update an actor.
Fields that can be upated are "displayName" and "description"

* **URL**  
  `/API/bpm/actor/:actorId`  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  {
    "displayName": "new display name",
    "description": "new description"
  }
  ```
* **Success Response**  
  * **Code**: 200

### ActorMember

#### Description

An actor member represents the association between the organization and the actor af a process. In an organization we have four member\_types = USER, GROUP, ROLE and MEMBERSHIP (role in a group). You can assign a actor to a user by specifying a role and or a group, or specific user. 

#### Identifier

Simple, the ID of the object (a long value)

#### Representation
```json
{
  "id":"actor member id",
  "actor_id":"id of the actor for this mapping",
  "role_id":"id of role, or -1 if the member type is not role",
  "group_id":"id of group, or -1 if the member type is not group",
  "user_id":"id of user, or -1 if the member type is not user"
}
```
#### Methods

The methods used for this resource are:

* POST - Add a new actorMember
* GET - Search actorMembers
* DELETE - Remove an actorMember

#### Add a new actorMember

Use the POST method to create a new actorMember.

* **URL**  
  `/API/bpm/actorMember`  
* **Method**  
  `POST`
* **Request Payload**  
  Add a member\_type = USER to the actor with id = 2\.
  ```json
  {
    "actor_id":"2",
    "member_type":"USER",
    "user_id":"101"
  }
  ```
  Add a member\_type = MEMBERSHIP to the actor with id = 2\.
  ```json
  {
    "id":"204",
    "actor_id":"2",
    "role_id":"-1",
    "group_id":"-1",
    "user_id":"101"
  }
  ```
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"206",
      "actor_id":"2",
      "role_id":"4",
      "group_id":"8",
      "user_id":"-1"
    }
    ```

#### Search actorMembers

Use a GET method with filters and search terms to search for actorMembers.

* **URL**  
  `/API/bpm/actorMemberEntry`  
  _Example_: ``
* **Method**  
  ``
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  There is a mandatory filter on:

  * `actor\_id` For example, retrieve the actorMembers related to the specified actor\_id. http://localhost:8080/bonita/API/bpm/actorMember?p=0&c=10&f=actor\_id%3d1

  You can also filter also on: 

  * `member\_type=user|role|group|roleAndGroup` retrieve only the actorMembers of type user. `/API/bpm/actorMember?p=0&c=10&f=actor\_id%3d1&f=member\_type%3duser`
  * `user\_id=:userId}`: retrieve only the actorMembers related to the specified user\_id. `/API/bpm/actorMember?p=0&c=10&f=actor\_id%3d1&f=user\_id%3d101`
  * `role\_id=:roleId`: retrieve only the actorMembers related to the specified role\_id. `/API/bpm/actorMember?p=0&c=10&f=actor\_id%3d1&f=role\_id%3d101`
  * `group\_id=:groupId`: retrieve only the actorMembers related to the specified group\_id. `/API/bpm/actorMember?p=0&c=10&f=actor\_id%3d1&f=group\_id%3d101`
* **Success Response**  
  An array of actorMember objects
  * **Code**: 200

#### Delete an actorMember

Use the DELETE method to delete an existing actorMember.

* **URL**  
  `/API/bpm/actorMember/:id`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200

## Cases (Process Instances)

<a id="case"/>

### Case

#### Description

Case is an instance of a process. When you start a process, it creates a case.

#### Identifier

ID of the Object: a long value

#### Representation
```json
{
  "id":"the identifier of the case",
  "end_date":"the date set when the case is closed",
  "failedFlowNodes":"count of failed flow nodes if parameter n=failedFlowNodes is given",
  "startedBySubstitute":"the identifier of the substitute user (as Process manager or Administrator) who started the process. It can be also the substitute user if d=startedBySubstitute is given.",
  "start":"the starting date of the case",
  "activeFlowNodes":"count of active flow nodes if parameter n=activeFlowNodes is given",
  "state":"state: an enum that represent the state of the case, it can be INITIALIZING, STARTED, SUSPENDED, CANCELLED, ABORTED, COMPLETING, COMPLETED, ERROR, ABORTING",
  "rootCaseId":"the identifier of the container of the case",
  "started_by":"the identifier of the user who started the case",
  "processDefinitionId":"the identifier of the process related of the case",
  "last_update_date":"the date of the last update done on the case",
  "searchIndex1Label":"the 1st search index label (from 6.5, in Subscription editions only)",
  "searchIndex2Label":"the 2nd search index label (from 6.5, in Subscription editions only)",
  "searchIndex3Label":"the 3rd search index label (from 6.5, in Subscription editions only)",
  "searchIndex4Label":"the 4th search index label (from 6.5, in Subscription editions only)",
  "searchIndex5Label":"the 5th search index label (from 6.5, in Subscription editions only)",
  "searchIndex1Value":"the 1st search index value (from 6.5, in Subscription editions only)",
  "searchIndex2Value":"the 2nd search index value (from 6.5, in Subscription editions only)",
  "searchIndex3Value":"the 3rd search index value (from 6.5, in Subscription editions only)",
  "searchIndex4Value":"the 4th search index value (from 6.5, in Subscription editions only)",
  "searchIndex5Value":"the 5th search index value (from 6.5, in Subscription editions only)"
}
```
#### Methods

* POST - Create a case
* GET - Read a case or search for a case
* DELETE - Remove a case

<a id="case-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * `started_by`
  * `startedBySubstitute`
  * `processDefinitionId`

#### Read a case

You can get a case by using its identifier. Request url

* **URL**  
  `/API/bpm/case/:id`  
* **Method**  
  `GET`
* **Data Params**  
  * d: extend resource response parameters of [this resource](#case-deploy) are available.
  Available values: started\_by, startedBySubstitute, processDefinitionId.
  * n: count of related resources. Available values: activeFlowNodes, failedFlowNodes.
* **Success Response**  
  A JSON representation of the case
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id": "1",
      "end_date": "",
      "failedFlowNodes": "9",
      "startedBySubstitute": {
        "last_connection": "2014-12-01 10:46:03.750",
        "created_by_user_id": "-1",
        "creation_date": "2014-11-27 17:53:46.516",
        "id": "4",
        "icon": "/default/icon_user.png",
        "enabled": "true",
        "title": "Mr",
        "manager_id": "3",
        "job_title": "Human resources benefits",
        "userName": "walter.bates",
        "lastname": "Bates",
        "firstname": "Walter",
        "password": "",
        "last_update_date": "2014-11-27 17:53:46.516"
      },
      "start": "2014-11-27 17:55:00.906",
      "activeFlowNodes": "9",
      "state": "started",
      "rootCaseId": "1",
      "started_by":{
        "last_connection": "",
        "created_by_user_id": "-1",
        "creation_date": "2014-11-27 17:53:46.509",
        "id": "3",
        "icon": "/default/icon_user.png",
        "enabled": "true",
        "title": "Mrs",
        "manager_id": "1",
        "job_title": "Human resource manager",
        "userName": "helen.kelly",
        "lastname": "Kelly",
        "firstname": "Helen",
        "password": "",
        "last_update_date": "2014-11-27 17:53:46.509"
      },
      "processDefinitionId": {
        "id": "5777042023671752656",
        "icon": "",
        "displayDescription": "",
        "deploymentDate": "2014-11-27 17:54:37.774",
        "description": "",
        "activationState": "ENABLED",
        "name": "Pool2",
        "deployedBy": "4",
        "displayName": "Pool 2",
        "actorinitiatorid": "1",
        "last_update_date": "2014-11-27 17:54:43.621",
        "configurationState": "RESOLVED",
        "version": "2.0"
      },
      "last_update_date": "2014-11-27 17:55:00.906",
      "searchIndex1Label":"mySearchIndex1Label",
      "searchIndex2Label":"mySearchIndex2Label",
      "searchIndex3Label":"mySearchIndex3Label",
      "searchIndex4Label":"mySearchIndex4Label",
      "searchIndex5Label":"mySearchIndex5Label",
      "searchIndex1Value":"mySearchIndex1Value",
      "searchIndex2Value":"mySearchIndex2Value",
      "searchIndex3Value":"mySearchIndex3Value",
      "searchIndex4Value":"mySearchIndex4Value",
      "searchIndex5Value":"mySearchIndex5Value"
    }
    ```

#### Search for a case

* **URL**  
  `/API/bpm/case`  
  _Example_:  list active cases for process definition with ID 1234 `/API/bpm/case?p=0&c=10&f=processDefinitionId=1234`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  * f: filter of the search. Available filters are : 
    * `processDefinitionId`: The process derfinition ID 
    * `name`: the process name
    * `started_by`: the ID of the user who started the process
    * `team_manager_id`: allow to retrieve the cases in which all users with this manager ID ar involved)
    * `supervisor_id`: allow the retrived the cases of all processes the user with this ID is supervisor of)
  beware you cannot use team\_manager\_id and supervisor\_id at the same time
  * n: count of related resource. Available values: `activeFlowNodes`, `failedFlowNodes`
  * d: extend resource response parameters of [this resource](#case-deploy) are available.
* **Success Response**  
  JSON representations of matching cases
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "id": "1",
        "end_date": "",
        "failedFlowNodes": "9",
        "startedBySubstitute":{
          "last_connection": "2014-12-01 10:46:03.750",
          "created_by_user_id": "-1",
          "creation_date": "2014-11-27 17:53:46.516",
          "id": "4",
          "icon": "/default/icon_user.png",
          "enabled": "true",
          "title": "Mr",
          "manager_id": "3",
          "job_title": "Human resources benefits",
          " userName": "walter.bates",
          "lastname": "Bates",
          "firstname": "Walter",
          "password": "",
          "last_update_date": "2014-11-27 17:53:46.516"
        },
        "start": "2014-11-27 17:55:00.906",
        "activeFlowNodes": "9",
        "state": "started",
        "rootCaseId": "1",
        "started_by":{
          "last_connection": "",
          "created_by_user_id": "-1",
          "creation_date": "2014-11-27 17:53:46.509",
          "id": "3",
          "icon": "/default/icon_user.png",
          "enabled": "true",
          "title": "Mrs",
          "manager_id": "1",
          "job_title": "Human resource manager",
          "userName": "helen.kelly",
          "lastname": "Kelly",
          "firstname": "Helen",
          "password": "",
          "last_update_date": "2014-11-27 17:53:46.509"
        },
        "processDefinitionId":{
          "id": "5777042023671752656",
          "icon": "",
          "displayDescription": "",
          "deploymentDate": "2014-11-27 17:54:37.774",
          "description": "",
          "activationState": "ENABLED",
          "name": "Pool2",
          "deployedBy": "4",
          "displayName": "Pool 2",
          "actorinitiatorid": "1",
          "last_update_date": "2014-11-27 17:54:43.621",
          "configurationState": "RESOLVED",
          "version": "2.0"
        },
        "last_update_date": "2014-11-27 17:55:00.906",
        "searchIndex1Label":"case1SearchIndex1Label",
        "searchIndex2Label":"case1SearchIndex2Label",
        "searchIndex3Label":"case1SearchIndex3Label",
        "searchIndex4Label":"case1SearchIndex4Label",
        "searchIndex5Label":"case1SearchIndex5Label",
        "searchIndex1Value":"case1SearchIndex1Value",
        "searchIndex2Value":"case1SearchIndex2Value",
        "searchIndex3Value":"case1SearchIndex3Value",
        "searchIndex4Value":"case1SearchIndex4Value",
        "searchIndex5Value":"case1SearchIndex5Value"
      },
      {
        "id": "2",
        "end_date": "",
        "failedFlowNodes": "0",
        "startedBySubstitute":{
          "last_connection": "2014-12-01 10:46:03.750",
          "created_by_user_id": "-1",
          "creation_date": "2014-11-27 17:53:46.516",
          "id": "4",
          "icon": "/default/icon_user.png",
          "enabled": "true",
          "title": "Mr",
          "manager_id": "3",
          "job_title": "Human resources benefits",
          "userName": "walter.bates",
          "lastname": "Bates",
          "firstname": "Walter",
          "password": "",
          "last_update_date": "2014-11-27 17:53:46.516"
        },
        "start": "2014-11-27 17:56:28.596",
        "activeFlowNodes": "1",
        "state": "started",
        "rootCaseId": "2",
        "started_by":{
          "last_connection": "",
          "created_by_user_id": "-1",
          "creation_date": "2014-11-27 17:53:46.509",
          "id": "3",
          "icon": "/default/icon_user.png",
          "enabled": "true",
          "title": "Mrs",
          "manager_id": "1",
          "job_title": "Human resource manager",
          "userName": "helen.kelly",
          "lastname": "Kelly",
          "firstname": "Helen",
          "password": "",
          "last_update_date": "2014-11-27 17:53:46.509"
        },
        "processDefinitionId":{
          "id": "4948193168427526005",
          "icon": "",
          "displayDescription": "",
          "deploymentDate": "2014-11-27 17:56:10.920",
          "description": "",
          "activationState": "ENABLED",
          "name": "ConnectorFailed",
          "deployedBy": "4",
          "displayName": "ConnectorFailed",
          "actorinitiatorid": "2",
          "last_update_date": "2014-11-27 17:56:12.470",
          "configurationState": "RESOLVED",
          "version": "1.0"
        },
        "last_update_date": "2014-11-27 17:56:28.596",
        "searchIndex1Label":"case2SearchIndex1Label",
        "searchIndex2Label":"case2SearchIndex2Label",
        "searchIndex3Label":"case2SearchIndex3Label",
        "searchIndex4Label":"case2SearchIndex4Label",
        "searchIndex5Label":"case2SearchIndex5Label",
        "searchIndex1Value":"case2SearchIndex1Value",
        "searchIndex2Value":"case2SearchIndex2Value",
        "searchIndex3Value":"case2SearchIndex3Value",
        "searchIndex4Value":"case2SearchIndex4Value",
        "searchIndex5Value":"case2SearchIndex5Value"
      } 
    ]
    ```

#### Create a case

This way of creating a case using this method will only work for processes in which no contract is defined. To instantiate a process with a contract, check the [process instantiation resource documentation](#instantiate_process). 

* **URL**  
  `/API/bpm/case`  
* **Method**  
  `POST`
* **Request Payload**  
  The process definition id, in JSON

##### Create a case without variables
  ```json
  {
    "processDefinitionId":"5777042023671752656"
  }
  ```
##### Create a case with variables

::: danger
:fa-exclamation-triangle: **Warning:** The attribute "variables" on the request payload is used to initialize the process variables (not BDM variables).
If you want to initialize BDM variables at process instantiation, add a contract on the process and map BDM variables to the contract data.
See [Start a process using an instantiation contract](#start-a-process-using-an-instantiation-contract) for usage.
:::

  ```json
  {  
    "processDefinitionId":"5777042023671752656",
    "variables":[  
      {  
        "name":"stringVariable",
        "value":"aValue"
      },
      {  
        "name":"dateVariable",
        "value":349246800000
      },
      {  
        "name":"numericVariable",
        "value":5
      }
    ]
  }
  ```
* **Success Response**  
  The JSON representation of a case resource
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id": "1001",
      "end_date": "",
      "startedBySubstitute": "4",
      "start": "2014-12-01 14:36:23.732",
      "state": "started",
      "rootCaseId": "1001",
      "started_by": "4",
      "processDefinitionId": "5777042023671752656",
      "last_update_date": "2014-12-01 14:36:23.732"
    }
    ```

#### Delete a case

* **URL**  
  `/API/bpm/case/:caseId`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200
  
#### Delete cases in bulk

* **URL**  
  `/API/bpm/case/`  
* **Method**  
  `DELETE`
* **Request Payload**
  List of case ids to delete
   ```json
  ["1", "2" , ...]
  ```
* **Success Response**  
  * **Code**: 200  

<a id="retrieve-the-case-context" />

#### Retrieve the case context

* **URL**  
  `/API/bpm/case/:caseId/context`  
* **Method**  
  `GET`
* **Success Response**  
  A context object
  * **Code**: 200
  * **Payload**:  
    ```json
    {  
      "myBusinessData_ref":{  
        "name":"myBusinessData",
        "type":"com.company.model.BusinessObject1",
        "link":"API/bdm/businessData/com.company.model.BusinessObject1/2",
        "storageId":2,
        "storageId_string":"2"
      },
      "myDocument_ref":{  
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
### ArchivedCase

#### Description

A completed instance of a process. 

#### Identifier

The ID of the archived case (a long value).

#### Representation
```json
{
  "id":"the identifier of the archived case",
  "end_date":"the date set when the case was archived",
  "startedBySubstitute":"the id of the user",  
  
  "sourceObjectId":"the id of the case before it was archived"
  "start":"the stard date of the initial case", 
  "state":"the state of the archived case", 
  "rootCaseId":"the id of the case before it was archived", 
  "started_by":"id of the user who start the case", 
  "archivedDate":"the date set when the case was archived", 
  "processDefinitionId":"the id of the process related to this archived case", 
  "last_update_date":"the date of the last update done on the case",
  "searchIndex1Label":"the 1st search index label (from 6.5, in Subscription editions only)",
  "searchIndex2Label":"the 2nd search index label (from 6.5, in Subscription editions only)",
  "searchIndex3Label":"the 3rd search index label (from 6.5, in Subscription editions only)",
  "searchIndex4Label":"the 4th search index label (from 6.5, in Subscription editions only)",
  "searchIndex5Label":"the 5th search index label (from 6.5, in Subscription editions only)",
  "searchIndex1Value":"the 1st search index value (from 6.5, in Subscription editions only)",
  "searchIndex2Value":"the 2nd search index value (from 6.5, in Subscription editions only)",
  "searchIndex3Value":"the 3rd search index value (from 6.5, in Subscription editions only)",
  "searchIndex4Value":"the 4th search index value (from 6.5, in Subscription editions only)",
  "searchIndex5Value":"the 5th search index value (from 6.5, in Subscription editions only)"
}
```   

#### Methods

The methods used for this resource are:

* GET - Read a resource or search for a resource
* DELETE - Remove a resource

<a id="archived-case-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * `started_by`
  * `startedBySubstitute`
  * `processDefinitionId`

#### Read an archived case

You can get an archived case by using its identifier. An archive case is linked to a case with the key. 

* **URL**  
  `/API/bpm/archivedCase/:archivedCaseId`  
* **Method**  
  `GET`
* **Success Response**  
  A JSON representation of the archived case resource
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id": "9",
      "end_date": "2014-10-22 10:57:00.299",
      "startedBySubstitute": "4",
      "sourceObjectId": "3",
      "start": "2014-10-22 10:56:53.415",
      "state": "completed",
      "rootCaseId": "3",
      "started_by": "4",
      "archivedDate": "2014-10-22 10:57:00.299",
      "processDefinitionId": "6054482369194211518",
      "last_update_date": "2014-10-22 10:57:00.299"
      "searchIndex1Label":"case9SearchIndex1Label",
      "searchIndex2Label":"case9SearchIndex2Label",
      "searchIndex3Label":"case9SearchIndex3Label",
      "searchIndex4Label":"case9SearchIndex4Label",
      "searchIndex5Label":"case9SearchIndex5Label",
      "searchIndex1Value":"case9SearchIndex1Value",
      "searchIndex2Value":"case9SearchIndex2Value",
      "searchIndex3Value":"case9SearchIndex3Value",
      "searchIndex4Value":"case9SearchIndex4Value",
      "searchIndex5Value":"case9SearchIndex5Value"
    }
    ```

#### Search archived cases

You can search cases.

* **URL**  
  `/API/bpm/archivedCase`  
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  * o (order): available values are `id`, `processDefinitionId`, `startedBy`, `startedBySubstitute`, `startDate`, 
  `endDate`, `lastUpdate`, `archivedDate`, `sourceObjectId`
  * f: filter of the search. Available filters are : 
    * `sourceObjectId`: The original case ID before the case was archived
    * `processDefinitionId`: The process derfinition ID 
    * `name`: the process name
    * `started\_by`: the ID of the user who started the process
    * `team\_manager\_id`: allow to retrieve the cases in which all users with this manager ID ar involved)
    * `supervisor\_id`: allow the retrived the cases of all processes the user with this ID is supervisor of)
  beware you cannot use team\_manager\_id and supervisor\_id at the same time
  * d: extend resource response parameters of [this resource](#archived-case-deploy) are available.
* **Success Response**  
  A JSON representation of an array of archived case resources
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "id": "3002",
        "end_date": "2014-10-22 15:21:10.129",
        "startedBySubstitute": "4",
        "sourceObjectId": "6",
        "start": "2014-10-22 11:47:28.859",
        "state": "completed",
        "rootCaseId": "6",
        "started_by": "4",
        "archivedDate": "2014-10-22 15:21:10.129",
        "processDefinitionId": {
          "id": "5652578116304089592",
          "icon": "",
          "displayDescription": "",
          "deploymentDate": "2014-10-22 11:42:26.644",
          "description": "",
          "activationState": "ENABLED",
          "name": "données",
          "deployedBy": "4",
          "displayName": "données",
          "actorinitiatorid": "4",
          "last_update_date": "2014-10-22 11:42:45.672",
          "configurationState": "RESOLVED",
          "version": "2.0"
        },
        "last_update_date": "2014-10-22 15:21:10.129",
        "searchIndex1Label":"case6SearchIndex1Label",
        "searchIndex2Label":"case6SearchIndex2Label",
        "searchIndex3Label":"case6SearchIndex3Label",
        "searchIndex4Label":"case6SearchIndex4Label",
        "searchIndex5Label":"case6SearchIndex5Label",
        "searchIndex1Value":"case6SearchIndex1Value",
        "searchIndex2Value":"case6SearchIndex2Value",
        "searchIndex3Value":"case6SearchIndex3Value",
        "searchIndex4Value":"case6SearchIndex4Value",
        "searchIndex5Value":"case6SearchIndex5Value"
      }, {
        "id": "9",
        "end_date": "2014-10-22 10:57:00.299",
        "startedBySubstitute": "4",
        "sourceObjectId": "3",
        "start": "2014-10-22 10:56:53.415",
        "state": "completed",
        "rootCaseId": "3",
        "started_by": "4",
        "archivedDate": "2014-10-22 10:57:00.299",
        "processDefinitionId": {
          "id": "6054482369194211518",
          "icon": "",
          "displayDescription": "",
          "deploymentDate": "2014-10-22 10:55:24.219",
          "description": "",
          "activationState": "ENABLED",
          "name": "PoolTestEntry",
          "deployedBy": "4",
          "displayName": "PoolTestEntry",
          "actorinitiatorid": "1",
          "last_update_date": "2014-10-22 10:55:31.178",
          "configurationState": "RESOLVED",
          "version": "1.0"
        },
        "last_update_date": "2014-10-22 10:57:00.299",
        "searchIndex1Label":"case9SearchIndex1Label",
        "searchIndex2Label":"case9SearchIndex2Label",
        "searchIndex3Label":"case9SearchIndex3Label",
        "searchIndex4Label":"case9SearchIndex4Label",
        "searchIndex5Label":"case9SearchIndex5Label",
        "searchIndex1Value":"case9SearchIndex1Value",
        "searchIndex2Value":"case9SearchIndex2Value",
        "searchIndex3Value":"case9SearchIndex3Value",
        "searchIndex4Value":"case9SearchIndex4Value",
        "searchIndex5Value":"case9SearchIndex5Value"
      }
    ]
    ```

#### Retrieve an archived case context

* **URL**  
  `/API/bpm/archivedCase/:archivedCaseId/context`  
* **Method**  
  `GET`
* **Success Response**  
  A context object
  * **Code**: 200
  * **Payload**:  
    ```json
    {  
      "myBusinessData_ref":{  
        "name":"myBusinessData",
        "type":"com.company.model.BusinessObject1",
        "link":"API/bdm/businessData/com.company.model.BusinessObject1/2",
        "storageId":2,
        "storageId_string":"2"
      },
      "myDocument_ref":{  
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


#### Remove an archived case

You can delete an archived case by using its identifier. An archived case is linked to a case with the key. 

* **URL**  
  `/API/bpm/archivedCase/:archivedCaseId`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200

### CaseInfo

#### Description

Retrieves information about a case. It returns counters for each flow node in the case, showing the number of flow node instances that are in completed, ready, or failed state. If there are no flow node instances in a given state, no counter is returned for that state for the flow node.

#### Identifier

The ID of the case (a long value).

#### Representation
```json
{
  "id": "case identifier",
  "flowNodeStatesCounters": {
    "Flow Node name from Studio": {
      "completed": "number of instance of the given Flow Node in completed state",
      "ready": "number of instance of the given Flow Node in ready state",
      "failed": "number of instance of the given Flow Node in failed state",
    }
  }
}
```
#### Methods

The method used for this resource is:

* GET - Read a resource

#### Retrieve counters for case flow nodes

Retrieve information about the flow nodes of the case identified by the given ID.

* **URL**  
  `/API/bpm/caseInfo/:id`  
* **Method**  
  `GET`
* **Success Response**  
  The JSON representation of the case information
  * **Code**: 200
  * **Payload**:  
    In this example, counters are returned for two flow nodes in the case, Step1 and Step3\. For Step3, there are no flow nodes in ready state, so no counter is returned for this.
    ```json
    {
      "id": "123",
      "flowNodeStatesCounters": {
        "Step1": {
          "completed": "2",
          "ready": "1",
          "executing": "5"
        },
        "Step3": {
          "completed": "10",
          "failed": "2"
        }
      }
    }
    ```

### CaseComment

#### Description

Retrieves information about a case comment.

#### Representation
```json
{
  "id": "1",
  "content": "the comment content",
  "tenantId": "the id of the tenant the comment is associated to",
  "processInstanceId": "the process instance(case) the comment is associated to",
  "postDate": "the comment creation date",
  "userId": "the user that created the comment"
}
```
#### Methods

The method used for this resource is:

* GET - Search for comments
* POST - Add a comment

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * `userId`

::: info
Note: if the `userId` is not provided as a deploy parameter, the `userId` property of a comment is filled with the system user :
```json
{
  "icon": "/default/icon_user.png",
  "userName": "System"
}
```
:::

#### Create a comment

* **URL**  
  `/API/bpm/comment`  
* **Method**  
  `POST`
* **Request Payload**  
  The process instance (case) id and the comment content, in JSON

  ```json
  {
    "processInstanceId":"5777042023671752656",
    "content": "The case has been started"
  }
  ```
* **Success Response**  
  The JSON representation of a case comment
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "content": "test",
      "tenantId": "1",
      "id": "20005",
      "processInstanceId": "1",
      "postDate": "2016-06-16 14:51:33.053",
      "userId": "30"
    }
    ```

#### Search for comments

* **URL**  
  `/API/bpm/comment`  
  _Example_: `/API/bpm/comment?p=0&c=10&o=postDate%20DESC&f=processInstanceId%3d1&d=userId`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  * o: you can sort on the `postDate`
  * f: filter of the search. Available filters are : 
    * `supervisor_id`
    * `user_id`
    * `processInstanceId`
    You cannot use `supervisor_id` and `user_id` filter at the same time.
* **Success Response**  
  JSON representations of matching comments
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "content": "Need to review the last inputs of this case",
        "tenantId": "1",
        "id": "20005",
        "processInstanceId": "1",
        "postDate": "2016-06-16 14:51:33.053",
        "userId": {
          "last_connection": "2016-06-16 14:49:37.067",
          "created_by_user_id": "-1",
          "creation_date": "2016-06-15 11:37:22.709",
          "id": "30",
          "icon": "/default/icon_user.png",
          "enabled": "true",
          "title": "Mr",
          "manager_id": "0",
          "job_title": "Chief Executive Officer",
          "userName": "william.jobs",
          "lastname": "Jobs",
          "firstname": "William",
          "password": "",
          "last_update_date": "2016-06-15 11:37:22.709"
        }
      }, {
        "content": "The task \"Etape1\" is now assigned to walter.bates",
        "tenantId": "1",
        "id": "20003",
        "processInstanceId": "1",
        "postDate": "2016-06-15 12:36:18.541",
        "userId": {
          "icon": "/default/icon_user.png",
          "userName": "System"
        }
      }
    ]
    ```

### ArchivedCaseComment

#### Description

Retrieves information about the comment of an archived case.

#### Representation
```json
{
  "id": "1",
  "content": "the comment content",
  "processInstanceId": "the process instance(case) the comment is associated to",
  "postDate": "the comment creation date",
  "archivedDate": "the date set when the case was archived"
  "userId": "the user that created the comment"
}
```
#### Methods

The method used for this resource is:

* GET - Search for archived comments

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * `userId`

::: info
Note: if the `userId` is not provided as a deploy parameter, the `userId` property of a comment is filled with the system user :
```json
{
  "icon": "/default/icon_user.png",
  "userName": "System"
}
```
:::

#### Search for archived comments

* **URL**  
  `/API/bpm/archivedComment`  
  _Example_: `/API/bpm/archivedComment?p=0&c=10&o=postDate%20DESC&f=processInstanceId%3d1&d=userId`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  * o: you can sort on the `postDate` and `archivedDate`
  * f: filter of the search. Available filters are : 
    * `supervisor_id`
    * `user_id`
    * `processInstanceId`
    You cannot use `supervisor_id` and `user_id` filter at the same time.
* **Success Response**  
  JSON representations of matching comments
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "content": "Need to review the last inputs of this case",
        "id": "20005",
        "processInstanceId": "1",
        "postDate": "2016-06-16 14:51:33.053",
        "archivedDate": "2016-06-17 10:18:24.723",
        "userId": {
          "last_connection": "2016-06-16 14:49:37.067",
          "created_by_user_id": "-1",
          "creation_date": "2016-06-15 11:37:22.709",
          "id": "30",
          "icon": "/default/icon_user.png",
          "enabled": "true",
          "title": "Mr",
          "manager_id": "0",
          "job_title": "Chief Executive Officer",
          "userName": "william.jobs",
          "lastname": "Jobs",
          "firstname": "William",
          "password": "",
          "last_update_date": "2016-06-15 11:37:22.709"
        }
      }, {
        "content": "The task \"Etape1\" is now assigned to walter.bates",
        "id": "20003",
        "processInstanceId": "1",
        "postDate": "2016-06-15 12:36:18.541",
        "archivedDate": "2016-06-17 10:18:24.723",
        "userId": {
          "icon": "/default/icon_user.png",
          "userName": "System"
        }
      }
    ]
    ```
## Process

### Process

#### Description
 
Deploy and manage [process definitions](key-concepts.md). In addition, you can instantiate a process, which will create a new process instance ([case](#case)).

#### Identifier

The ID of the process definition (a long value).

#### Representation
```json
{
  "id":"the identifier of the process definition (long)",
  "icon":"icon path (string)",
  "displayDescription":"the human readable activity description (string)",
  "deploymentDate":"the date when the process definition was deployed (date)",
  "description":"the process description (string)",
  "activationState":"the state of the process definition (ENABLED or DISABLED)",
  "name":"the process name (string)",
  "deployedBy":"the id of the user who deployed the process (integer)",
  "displayName":"the human readable process description (string)",
  "actorinitiatorid":"the id of the actor that can initiate cases of the process",
  "last_update_date":"the date when the process definition was last updated (date)",
  "configurationState":"the configuration state of the process (UNRESOLVED or RESOLVED)",
  "version":"the version of the process (string)"
}
```

#### Methods

The methods used for this resource are:

* POST - Create a process
* GET - Read a process or search for a process
* PUT - Update a process
* DELETE - Delete a process and all its cases

<a id="process-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * `deployedBy`

#### Deploy a process definition

A process resource is created using the content of a `.bar` file that has previously been [uploaded](manage-files-using-upload-servlet-and-rest-api.md), using the `processUpload` servlet `http://.../bonita/portal/processUpload`,
to get the process archive path.

* **URL**  
  `/API/bpm/process`  
* **Method**  
  `POST`
* **Request Payload**  
  ```javascript
  {
    "fileupload": "D:\bonita-studio\BonitaSubscription-7.6.3\workspace\tomcat\bonita\client\tenants\1\tmp\tmp_4431838172282406107.bar" // the process archive path
  }
  ```
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"8216934689697197160","icon":"","displayDescription":"",
      "deploymentDate":"2015-01-02, 15:04:30.527"
      "description":"",
      "activationState":"DISABLED",
      "name":"Pool","deployedBy":"4",
      "displayName":"Pool",
      "actorinitiatorid":"3", 
      "last_update_date":"2015-01-02 5:04:30.587",
      "configurationState":"RESOLVED","version":"1.0"
    }
    ```

#### Read a process

Read a process definition

* **URL**  
  `/API/bpm/process/:processId`  
* **Method**  
  `GET`
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"1",
      "icon":"/default/process.png",
      "displayDescription":"process description",
      "deploymentDate":"2015-01-02 14:21:18.421",
      "description":"another process description",
      "activationState":"ENABLED",
      "name":"Pool1",
      "deployedBy":"2",
      "displayName":"Pool1",
      "actorinitiatorid":"2",
      "last_update_date":"2015-01-02 14:21:18.529",
      "configurationState":"RESOLVED",
      "version":"1.0"
    }
    ```

#### Update a process

You can update the following fields of a process definition:

* displayDescription
* displayName
* activationState (to toggle between the possible values, DISABLED and ENABLED)

* **URL**  
  `/API/bpm/process/:processId`  
* **Method**  
  `PUT`
* **Request Payload**  
  The fields to be updated, in JSON
  ```json
  {
    "displayName":"Leave booking process"
  }
  ```
* **Success Response**  
  * **Code**: 200
 
#### Delete a process

You can delete a process based on its ID.

  ::: warning
**Warning:** **Beware! Data loss risk!**
Deleting a process will automatically delete all its cases (on-going and archived alike). Thus, the operation may take a long time, and fail if the transaction timeout is not large enough.
This feature should only be used on non-production environments.
**Please proceed at your own risk.**
:::

* **URL**  
  `/API/bpm/process/:processId`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200
  
#### Delete processes in bulk

You can also delete several processes.

  ::: warning
**Warning:** **Beware! Data loss risk!**
Deleting a process will automatically delete all its cases (on-going and archived alike). Thus, the operation may take a long time, and fail if the transaction timeout is not large enough.
This feature should only be used on non-production environments.
**Please proceed at your own risk.**
:::

* **URL**  
  `/API/bpm/process`  
* **Method**  
  `DELETE`
* **Request Payload**
  List of processes ids to delete
   ```json
  ["1", "2" , ...]
  ```
* **Success Response**  
  * **Code**: 200  

#### Search for a process

Search for processes that match the search criteria.

* **URL**  
  `/API/bpm/process`  
  _Example_:
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  * s: search on "name", "displayName" or "version"
  * o: can order by "name", "version", "deploymentDate", "deployedBy", "activationState", "configurationState", "processId", "displayName", "lastUpdateDate", "categoryId", "label". By default sort order is ASC (`%20asc` added to order). You can sort in reverse order by adding `%20desc` to order. Example: `/API/bpm/process?f=name=MyProcess&p=0&c=1&o=version%20desc&f=activationState=ENABLED`
  * f: can filter on "name", "version", "deploymentDate", "deployedBy", "activationState" with the value DISABLED or ENABLED, "configurationState" with the value UNRESOLVED, or RESOLVED, "processId", "displayName", "lastUpdateDate", "categoryId", "label", "supervisor\_id"
  * d: extend resource response parameters of [this resource](#process-deploy) are available.
* **Success Response**  
  A JSON representation of the matched processes.
  * **Code**: 200

#### Retrieve the design for a process

Process design can be retrived client side.

* **URL**  
  `/API/bpm/process/:processId/design`  
* **Method**  
  `GET`
* **Success Response**  
  The process design object. The JSON returned is a representation of the [DesignProcessDefinition](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/index.html) instance of the given process id.
  * **Code**: 200

<a id="instantiate_process"/>

#### Instantiate a process

##### Retrieve the instantiation contract for a process

Process instantiation contract elements can be retrived client side.

* **URL**  
  `/API/bpm/process/:processId/contract`  
* **Method**  
  `GET`
* **Success Response**  
  The task contract elements
  * **Code**: 200
  * **Payload**:  
    ```json
    {  
      "constraints":[  
        {  
          "name":"ticket_account",
          "expression":"ticket_account!=null && !ticket_account.toString().isEmpty()",
          "explanation":"input ticket_account is mandatory",
          "inputNames":[  
            "ticket_account"
          ],
          "constraintType":"MANDATORY"
        },
        {  
          "name":"ticket_description",
          "expression":"ticket_description!=null && !ticket_description.toString().isEmpty()",
          "explanation":"input ticket_description is mandatory",
          "inputNames":[  
            "ticket_description"
          ],
          "constraintType":"MANDATORY"
        },
        {  
          "name":"ticket_subject",
          "expression":"ticket_subject!=null && !ticket_subject.toString().isEmpty()",
          "explanation":"input ticket_subject is mandatory",
          "inputNames":[  
            "ticket_subject"
          ],
          "constraintType":"MANDATORY"
        }
      ],
      "inputs":[  
        {  
          "description":null,
          "name":"ticket_account",
          "multiple":false,
          "type":"TEXT"
          "inputs":[]
        },
        {  
          "description":null,
          "name":"ticket_description",
          "multiple":false,
          "type":"TEXT"
          "inputs":[]
        },
        {  
          "description":null,
          "name":"ticket_subject",
          "multiple":false,
          "type":"TEXT"
          "inputs":[]
        }
      ]
    }
    ```

<a id="start-a-process-using-an-instantiation-contract" />

##### Start a process using an instantiation contract

This method will create a new process instance ([case](#case))

* **URL**  
  `/API/bpm/process/:processId/instantiation`  
* **Method**  
  `POST`
* **Request Payload**  
  Contract element values
  ```json
  {  
    "ticket_account":"CustomerA",
    "ticket_description":"issue description",
    "ticket_subject":"Issue 1"
  }
  ```
* **Success Response**  
  The created case ID 201 OK or a contract violation explanation in case of a 400 Bad request
  * **Code**: 201
  * **Payload**:  
    ```json
    {
    "caseId":"125713789879465465"
    }
    ```
* **Error Response**
  * **Code**: 400
  * **Payload**:
    ```json
    {  
      "exception":"class org.bonitasoft.engine.bpm.contract.ContractViolationException",
      "message":"USERNAME=walter.bates | Contract is not valid: ",
      "explanations":[  
        "Expected input [ticket_account] is missing",
        "Expected input [ticket_description] is missing",
        "Expected input [ticket_subject] is missing"
      ]
    }
    ```
### Diagram (Subscription editions only)

#### Description

Use the diagram resource to access the process diagram xml representation. This is necessary for drawing the diagram.

#### Identifier

Simple, the ID of the process for which you want download the diagram

#### Representation

The XML encoding of the diagram.

#### Methods

The methods used for this resource are:

* GET - Retrieve the XML definition of the diagram

#### Retrieve a process diagram xml file 

* **URL**  
  `/API/bpm/diagram/:processId`  
* **Method**  
  `GET`
* **Success Response**  
  Raw XML file containing the diagram definition
  * **Code**: 200

### ProcessParameter

#### Description

A process parameter is a variable attached to process. The parameter value is set at deployment, and applies to all cases of the process. This feature is available in Enterprise, Performance, Efficiency, and Teamwork editions. 

#### Identifier

A compound identifier constructed from process\_id/name where process\_id is a long value and name is the name of the process parameter.

#### Representation
```json
{
  "process_id":"the identifier of the process definition",
  "process_name":"the name of the related process", 
  "description":"the description of the parameter", 
  "name":"the name of the parameter", 
  "value":"the value of the parameter", 
  "process_version":"the version of the process", 
  "type":"the type of the parameter" 
}
```

#### Methods

The methods used for this resource are:

* GET - Read a resource or search for a resource
* PUT - Update a resource

#### Read a processParameter

You can read a process parameter using its compound id (process\_id/name) 

* **URL**  
  `/API/bpm/processParameter/:processId/:name`  
* **Method**  
  `GET`
* **Request Payload**  
  ```json
  ```
* **Success Response**  
  Process parameter resource
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "process_id": "4880205209556178729",
      "process_name": "myProcessName",
      "description": "myProcessDescription",
      "name": "myParameterName",
      "value": "myParameterValue",
      "process_version": "1.0",
      "type": "java.lang.String"
    }
    ```

#### Search for a processParameter

When you search for a processParameter, do not provide the process\_version or process\_name. They are needed only when you read a processParameter.

* **URL**  
  `/API/bpm/processParameter`  
  _Example_: `/API/bpm/processParameter?p=0&c=10&o=name%20ASC&f=process\_id%3d4880205209556178729`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
* **Success Response**  
  A array of process parameters
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "process_id": "4880205209556178729",
        "process_name": "",
        "description": "",
        "name": "d",
        "value": "n",
        "process_version": "",
        "type": "java.lang.String"
      }
    ]
    ```

#### Update a processParameter (Subscription edition only)

You can update only a process parameter value using the API. If you specify values for other fields in the update request, they are ignored.

* **URL**  
  `/API/bpm/processParameter/:processId/:name`  
* **Method**  
  `PUT`
* **Request Payload**  
  A process parameter resource
  ```json
  {
    "value":"myNewValue"
  }
  ```
* **Success Response**  
  * **Code**: 200

### ProcessResolutionProblem

#### Description

This resource represents a problem in a process that needs to be resolved for the process to run. It can be an actor, a connector implementation, or a parameter (in the Enterprise, Performance, Efficiency, or Teamwork edition).

#### Representation
```json
{
  "message":"resolution problem",
  "resource_id":"id of the unresolved resource",
  "target_type":"the type of the unresolved resource (parameter, actor, or connector)"
}
```

#### Methods

The methods used for this resource are:

* GET - search for process resolution problems

#### Search for process resolution problems

This is the only method supported by this resource. It should be used to list the problems that need to be solved before a process can be used.


* **URL**  
  `/API/bpm/processResolutionProblem`  
  _Example_: `/API/bpm/processResolutionProblem?p=0&c=100&f=process\_id%3d8802838415753448432`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  Filtering on the process definition ID is mandatory.

  * `f=process_id=<process_definition_id>`: this filter is used to indicate the target process
* **Success Response**  
  A list of process resolution problems in JSON or an empty response body if there is no problem for the process
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "message":"Actor 'Employee actor' does not contain any members",
        "resource_id":"3","target_type":"actor"
      },
      {
        "message":"Parameter 'username' is not set.",
        "resource_id":"",
        "target_type":"parameter"
      }
    ]
    ```
* **Error Response**
  * **Code**: 404 if the process does not exist

### ProcessSupervisor

#### Description

The process supervisor has management rights over a process. He can configure and monitor it.
You can give the ProcessSupervisor rights to some users by specifying a role and or a group, or a specific user.
In order to be able to manage the processes he supervises in the portal, a user should also have the profile "Process Manager".

#### Identifier

A compound identifier constructed from process\_id/user\_id/role\_id/group\_id where all Ids are long values.

#### Representation
```json
{
  "process_id":"Id of the process",
  "role_id":"Id of role, or -1 if the supervisor type is not role or membership",
  "group_id":"Id of group, or -1 if the supervisor type is not group or membership",
  "user_id":"Id of user, or -1 if the supervisor type is not user"
}

```
#### Methods

* POST - Add a process supervisor
* GET - Search for process supervisors
* DELETE - Remove a process supervisor

<a id="process-supervisor-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * `role_id`
  * `group_id`
  * `user_id`

#### Search for process supervisors of a given type (user, group, role or membership)

* **URL**  
  `/API/bpm/processSupervisor`  
_Example_: Get the supervisors of type `User` for the process 8040901857674754544: `API/bpm/processSupervisor?c=5&d=user_id&f=process_id%3D8040901857674754544&f=user_id%3D>0&f=group_id%3D-1&f=role_id%3D-1&p=0`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  * f: filter of the search, you need to specify the process_id, and then the user\_id, group\_id and role\_id with one of them (two if you want to filter on group and role) set to `>0` and the other ones set to `-1`. E.g.: `f=process_id%3D8040901857674754544&f=user_id%3D>0&f=group_id%3D-1&f=role_id%3D-1`
  * d: extend resource response parameters of [this resource](#process-supervisor-deploy) are available.
* **Success Response**  
  JSON representations of matching process supervisors
  * **Code**: 200
  * **Payload**:  
```json
[
   {
     "process_id":"8040901857674754544",
     "user_id":{  
       "firstname":"April",
       "icon":"icons/default/icon_user.png",
       "creation_date":"2017-09-07 16:44:38.321",
       "userName":"april.sanchez",
       "title":"Mrs",
       "created_by_user_id":"-1",
       "enabled":"true",
       "lastname":"Sanchez",
       "last_connection":"",
       "manager_id":"3",
       "id":"2",
       "job_title":"Compensation specialist",
       "last_update_date":"2017-09-07 16:44:38.321"
     },
     "role_id":"-1",
     "group_id":"-1"
   },
   {
     "process_id":"8040901857674754544",
     "user_id":{  
       "firstname":"Anthony",
       "icon":"icons/default/icon_user.png",
       "creation_date":"2017-09-07 16:44:38.456",
       "userName":"anthony.nichols",
       "title":"Mr",
       "created_by_user_id":"-1",
       "enabled":"true",
       "lastname":"Nichols",
       "last_connection":"",
       "manager_id":"17",
       "id":"18",
       "job_title":"Account manager",
       "last_update_date":"2017-09-07 16:44:38.456"
     },
     "role_id":"-1",
     "group_id":"-1"
   }
 ]
```

#### Add a process Supervisor

You can assign a process to a user, a group, a role, or a membership (role and group). Note that in order to be able to manage the processes he supervises in the portal, a user should also have the profile "Process Manager". 

* **URL**  
  `/API/bpm/processSupervisor`  
* **Method**  
  `POST`
* **Request Payload**  
  The process definition id and either the user, role and/or group id.

##### Add a process supervisor of type `User`
  ```json
  {
    "process_id":"5777042023671752656",
    "user_id":"11"
  }
  ```
##### Add a process supervisor of type `Group`
  ```json
  {
    "process_id":"5777042023671752656",
    "group_id":"2"
  }
  ```
##### Add a process supervisor of type `Role`
  ```json
  {
    "process_id":"5777042023671752656",
    "role_id":"114"
  }
  ```
##### Add a process supervisor of type `Membership`
  ```json
  {
    "process_id":"5777042023671752656",
    "role_id":"11",
    "group_id":"2"
  }
  ```

* **Success Response**  
  The JSON representation of a process supervisor resource
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "process_id":"5777042023671752656",
      "user_id":"11",
      "role_id":"-1",
      "group_id":"-1"
    }
    ```

#### Delete a process supervisor

You can delete a process supervisor by specifying its compound Id in the body of the request (process\_id/user\_id/role\_id/group\_id)

* **URL**  
  `/API/bpm/processSupervisor`  
* **Method**  
  `DELETE`
* **Request Payload**  
  ```json
    ["8040901857674754544/11/-1/-1"]
  ```
* **Success Response**  
  * **Code**: 200
  
#### Delete process supervisors in bulk

* **URL**  
  `/API/bpm/processSupervisor`  
* **Method**  
  `DELETE`
* **Request Payload**  
  List of process supervisors Ids to delete
  ```json
    ["8040901857674754544/11/-1/-1","8040901857674754544/12/-1/-1"]
  ```
* **Success Response**  
  * **Code**: 200  
  
  
## Connectors

### ProcessConnectorDependency

#### Description

Use the processConnectorDependency resource to access connector dependencies.

#### Identifier

The object itself

#### Representation
```json
{
  "connector_version":"<connector version>",
  "connector_process_id":"<process id>",
  "filename":"<filename representing the connector>",
  "connector_name":"<connector name>"
}
```

#### Methods

The methods used for this resource are:

* GET - Search for connector dependencies

#### Search for connector dependencies

Use a GET method with filters to search for connector dependencies.

* **URL**  
  `/API/bpm/processConnectorDependency`  
  _Example_: Get connector dependencies of the email connector (version 1.0.0) of the process with id = 4971555129176049183: `/API/bpm/processConnectorDependency?c=10&p=0&f=connector_process_id=4971555129176049183&f=connector_name=email&f=connector_version=1.0.0`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  Mandatory filters: connector\_process\_id, connector\_name, connector\_version
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "connector_version":"1.0.0",
        "connector_process_id":"4971555129176049183",
        "filename":"bonita-connector-email-impl-1.0.12.jar",
        "connector_name":"email"
      }, {
        "connector_version":"1.0.0",
        "connector_process_id":"4971555129176049183",
        "filename":"mail-1.4.5.jar",
        "connector_name":"email"
      }
    ]
    ```

### ConnectorFailure

#### Description

Error message and stackTrace recorded when a connector fails during a process execution. Enterprise and Performance editions only.

#### Identifier

The ID of the connector failure (a long value).

#### Representation
```json
{
  "errorMessage":"the message of the connector failure",
  "connectorInstanceId":"the ID of the connector instance (see connectorInstance resource documentation)",
  "errorStackTrace":"the stack trace of the error"
}
```
    

#### Methods

The methods used for this resource are:

* GET - Read a connector failure

#### Read a connector failure

Retrieve the information regarding the failure of the connector execution.

* **URL**  
  `/API/bpm/connectorFailure/:connectorFailureId`  
* **Method**  
  `GET`
* **Success Response**  
  A connectorFailure resource as JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "errorMessage":"Error while executing the groovy script",
      "connectorInstanceId":"5",
      "errorStackTrace":"org.bonitasoft.engine.core.connector.exception.SConnectorException: PROCESS_DEFINITION_ID=8030057793979348308 | PROCESS_NAME=Pool1 | PROCESS_VERSION=1.0 | PROCESS_INSTANCE_ID=5 | ROOT_PROCESS_INSTANCE_ID=5 | FLOW_NODE_DEFINITION_ID=-6089366458284481881 | FLOW_NODE_INSTANCE_ID=12 | FLOW_NODE_NAME=Étape1 | CONNECTOR_DEFINITION_IMPLEMENTATION_CLASS_NAME=expression execution connector | CONNECTOR_INSTANCE_ID=5 | org.bonitasoft.engine.connector.exception.SConnectorException: java.util.concurrent.ExecutionException: java.lang.Exception: Error while executing the groovy script\n\tat org.bonitasoft.engine.core.connector.impl.ConnectorServiceImpl.executeConnectorInClassloader(ConnectorServiceImpl.java:332)"
    }
    ```
    
<a id="connector-instance"/>
    
### ConnectorInstance

#### Description

Retrieve information about connector instances attached to a process or a flow node.

#### Representation

Returns a JSON array of connector details:
```json
{
  "containerType":"string",
  "connectorId":"string",
  "id":"number",
  "name":"string",
  "activationEvent":"string",
  "state":"string",
  "containerId":"number",
  "version":"string"
}
```

#### Methods

The methods used for this resource are:

* GET - returns a JSON array of connector details

#### Retrieve a list of connector instances attached to a process or a flow node

* **URL**  
  `/API/bpm/connectorInstance`  
  _Example_: 
   * Get information about connectors attached to a flow node with instanceId 15 :`/API/bpm/connectorInstance?p=0&c=10&f=containerId%3d15`
   * Get information about connectors attached to a process instance with instanceId 4781948523999597477: `/API/bpm/connectorInstance?p=0&c=10&f=containerId%3d4781948523999597477`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  * `f=containerId%3d{id}`. The container ID of the process or flow node.
* **Success Response**  
  A list of connector details
  * **Code**: 200
  * **Payload**:  
    Retrieve information about connectors attached to a flow node
    ```json
    [
      {
        "containerType":"flowNode",
        "connectorId":"scripting-groovy-script",
        "id":"3",  
        "name":"hello world",
        "activationEvent":"ON_FINISH",
        "state":"TO_BE_EXECUTED",
        "containerId":"15",
        "version":"1.0.0"
      },
      {
        "containerType":"flowNode",
        "connectorId":"webservice",
        "id":"4",
        "name":"webService",
        "activationEvent":"ON_FINISH",
        "state":"TO_BE_EXECUTED",
        "containerId":"15",
        "version":"1.0.0"
      }
    ]
    ```
    Retrieve information about connectors attached to a process instance
    ```json
    [
      {
        "containerType":"process",
        "connectorId":"database-access",
        "id":"8",
        "name":"my connector",
        "activationEvent":"ON_FINISH",
        "state":"TO_BE_EXECUTED",
        "containerId":"4781948523999597477",
        "version":"1.0.0"
      }
    ]
    ```
    
### ArchivedConnectorInstance

#### Description

Retrieve information about archived connector instances attached to an archived process or an archived flow
node.

#### Representation
```json
{
  "containerType":"the type (string) of the containing activity",
  "connectorId":"the connector id (string)",
  "id":"the identifier (long) of the connector instance",
  "name":"the name (string) of the connector",
  "activationEvent":"the name (string) of the event that activsted the connector instance",
  "state":"the state (string) of the connector",
  "archivedDate": "the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this connecctor instance was archived, for example '2014-10-17 16:05:42.626'",
  "containerId":"the identifier (long) of the containing activity instance",
  "version":"the connector version (string)"
}
```
    

#### Methods

The methods used for this resource are:

* GET - returns a JSON array of archived connector details

#### Retrieve a list of archived connector instances

* **URL**  
  `/API/bpm/archivedConnectorInstance`  
  _Example_: Get information about archived instances sort by containerId DESC Request url: `/API/bpm/archivedConnectorInstance?p=0&c=10&o=containerId+DESC`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
* **Success Response**  
  A list of connector details
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "containerType":"flowNode", 
        "connectorId":"scripting-groovy-script", 
        "id":"15", 
        "name":"connector1", 
        "activationEvent":"ON_ENTER", 
        "state":"DONE",
        "archivedDate":"2014-12-01 16:39:19.041",
        "containerId":"34"
        "version":"1.0.0"
      },
      {
        "containerType":"process",
        "connectorId":"scripting-groovy-script",
        "id":"16",
        "name":"processConnector",
        "activationEvent":"ON_FINISH",
        "state":"DONE",
        "archivedDate":"2014-12-01 16:39:19.097"
        "containerId":"33",
        "version":"1.0.0"
      }
    ]
    ```

## Flow Nodes

### Flow Node

#### Description

A flow node (gateway, event, or task) in an open instance of a process. 

#### Identifier

The ID of the flowNode (a long).

#### Representation

 ```   json
{
  "id": "the flow node id (long)",
  "displayDescription": "the human readable flow node description (string)",
  "executedBySubstitute": "the id (long) of the user who really performed this flow node in case where a substitute did it, or 0 if the flow node was not performed by a substitute",
  "caseId": "the case id (long) that is associated with this flow node",
  "parentCaseId": "the parent case id (long) that is associated with this flow node's case",
  "rootCaseId": "the root case initiator id (long) that is associated with this flow node's case",
  "processId": "the process id (long) that is associated with this flow node","
  "rootContainerId": "the root process id (long) of the root case that is associated with this flow node",
  "state": "the current state of the flow node (string,  for example, ready, completed, failed)",
  "type": "the flow node type (string)",
  "assigned_id": "the user id (long) that this flow node is assigned to, or 0 if it is unassigned",
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current flow node was assigned, for example '2014-10-17 16:05:42.626'",
  "executedBy": "the id (long) of the user who executed the flow node, or 0 if the flow node has not been executed",
  "priority": "the priority (string) of the current flow node",
  "actorId": "the id (long) of the actor that can execute this flow node, null otherwise",
  "description": "the flow node description (string)",
  "name": "the flow node name (string)",
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flow node reached the current state, for example '2014-10-17 16:05:42.626'",
  "displayName": "the display name (string) of this flow node",
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flow node is due, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flow node was last updated, for example '2014-10-17 16:05:42.626)",
  "parentTaskId" : "in the case of a subtask, the parent task id (long)"
}
```

#### Methods

The methods used for this resource are:

* GET - Read a flow node or search for a flow node
* PUT - Replay a flow node (only in Enterprise and Performance editions)

<a id="flownode-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * processId: the id of the process that is associated with the activity 
  * caseId: the id of the case that is associated with the activity
  * rootCaseId: the root case that is associated with this activity's case
  * parentCaseId: the parent case that is associated with this activity's case
  * rootContainerId: the root process of the root case that is associated with this activity
  * executedBy: the user who executed the activity
  * executedBySubstitute: the user who executed the activity for the executedBy user (only in Effeciency, Performance and Enterprise editions)
  * actorId: the actor that can execute this activity
  * assigned\_id: the user this activity is assigned to
  * parentTaskId: in the case of a subtask, the parent task

#### Get a Flow Node

Retrieve the flow node information of the given id.

* **URL**  
  `/API/bpm/flowNode/:id`  
* **Method**  
  `GET`
* **Data Params**  
  The deploy query parameter can be used.
* **Success Response**  
  The JSON representation of the specified flownode
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "displayDescription": "",
      "executedBySubstitute": "0",
      "processId": "7596769292810273901",
      "parentCaseId": "1",
      "state": "failed",
      "rootContainerId": "1",
      "type": "USER_TASK",
      "assigned_id": "",
      "assigned_date": "",
      "id": "77456",
      "executedBy": "0",
      "caseId": "1",
      "priority": "normal",
      "actorId": "4",
      "description": "",
      "name": "Step1",
      "reached_state_date": "2014-12-10 08:59:47.884",
      "rootCaseId": "1",
      "displayName": "Step1",
      "dueDate": "2014-12-10 09:59:47.855",
      "last_update_date": "2014-12-10 08:59:47.884"
    }
    ```

#### Search among Flow Nodes

Search for flow nodes using given parameters. Flow nodes in states completed, cancelled, or aborted are not retrieved. The search returns an array of flow nodes.

* **URL**  
  `/API/bpm/flowNode`  
  _Example_: Get all the active flow nodes named "Escalate", ordering the results by state: `/API/bpm/flowNode/?p=0&c=10&f=name%3dEscalate&o%3dstate`
* **Method**  
  `GET`
  <a id="flownode-search-data-params"/>
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  The following parameters are available:
  * o: 
    * name
    * displayName
    * state
    * processDefinitionId
    * parentProcessInstanceId
    * parentActivityInstanceId (if the retrieved flow nodes are activities, order by parent activity id)
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
  * d: extend resource response parameters of [this resource](#flownode-deploy) are available.
* **Success Response**  
  An array of JSON representations of flow nodes
  * **Code**: 200

#### Change a Flow Node state

Replay the flow node. (only in Enterprise and Performance editions)

* **URL**  
  `/API/bpm/flowNode/:id`  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  {
    "state" : "replay"
  }
  ```
* **Success Response**  
  * **Code**: 200

### ArchivedFlowNode

#### Description

A flow node (gateway or event or task) in an archived instance of a process.

#### Identifier

The ID of the flowNode (a long).

#### Representation
```json
{
  "id": "the flowNode id (long)",  
  "sourceObjectId": "the original id of the flowNode before it was archived",
  "displayDescription": "the human readable flowNode description (string)", 
  "executedBySubstitute": "the id (long) of the user who really performed this flowNode in case where a substitute did it, or 0 if the flowNode was not performed by a substitute", 
  "caseId": "the case id (long) that is associated with this flowNode", 
  "parentCaseId": "the parent case id (long) that is associated with this flowNode's case", 
  "rootCaseId": "the root case initiator id (long) that is associated with this flowNode's case", 
  "processId": "the process id (long) that is associated with this flowNode", 
  "rootContainerId": "the root process id (long) of the root case that is associated with this flowNode", 
  "state": "the current state of the flowNode (string,  for example, ready, completed, failed)", 
  "type": "the flowNode type (string)", 
  "assigned_id": "the user id (long) that this flowNode is assigned to, or 0 if it is unassigned", 
  "assigned_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current flowNode was assigned, for example '2014-10-17 16:05:42.626'", 
  "executedBy": "the id (long) of the user who executed the flowNode, or 0 if the flowNode has not been executed",
  "priority": "the priority (string) of the current flowNode", 
  "actorId": "the id (long) of the actor that can execute this flowNode, null otherwise", 
  "description": "the flowNode description (string)", 
  "name": "the flowNode name (string)", 
  "reached_state_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flowNode reached the current state, for example '2014-10-17 16:05:42.626'", 
  "displayName": "the display name (string) of this flowNode", 
  "dueDate": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flowNode is due, for example '2014-10-17 16:05:42.626'", 
  "archivedDate": "the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this flowNode was archived, for example '2014-10-17 16:05:42.626'",
  "last_update_date": "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flowNode was last updated, for example '2014-10-17 16:05:42.626)", 
  "parentTaskId": "in the case of a subtask, the parent task id (long)" 
}
```
    
#### Methods

The methods used for this resource are:

* GET - Read a flow node or search for a flow node

<a id="archived-flow-node-deploy"/>

#### Response object extension (deploy query parameter)

The `d` (deploy) used to [extend response object](rest-api-overview.md#extend-resource) can be used with : 
  * processId: the id of the process that is associated with the activity 
  * caseId: the id of the case that is associated with the activity
  * rootCaseId: the root case that is associated with this activity's case
  * parentCaseId: the parent case that is associated with this activity's case
  * rootContainerId: the root process of the root case that is associated with this activity
  * executedBy: the user who executed the activity
  * executedBySubstitute: the user who executed the activity for the executedBy user (only in Effeciency, Performance and Enterprise editions)
  * actorId: the actor that can execute this activity
  * assigned\_id: the user this activity is assigned to
  * parentTaskId: in the case of a subtask, the parent task


#### Get a Flow Node

Retrieve the flow node information of the given id.

* **URL**  
  `/API/bpm/archivedFlowNode/:id`  
* **Method**  
  `GET`
* **Success Response**  
  The JSON representation of the specified flownode
  * **Code**: 200

#### Search among flow nodes

Search for flow nodes using given parameters. Flow nodes in state completed, cancelled, aborted are not retrieved. It returns an array of flow nodes.

* **URL**  
  `/API/bpm/archivedFlowNode`  
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  The following parameters are available:

  * o: 
    * name
    * displayName
    * state
    * type
    * isTerminal
    * processId
    * caseId
    * archivedDate
  * s: search on any field that can be used to order results
  * f: 
    * name
    * displayName
    * state
    * stateId
    * kind
    * terminal
    * processDefinitionId
    * parentProcessInstanceId
    * rootProcessInstanceId
    * parentActivityInstanceId
    * archivedDate
    * reachedStateDate
    * sourceObjectId
  * d: extend resource response parameters of [this resource](#archived-flow-node-deploy) are available.
* **Success Response**  
  The JSON representation of the specified flownode
  * **Code**: 200

<a id="timers"/>

### TimerEventTrigger

#### Description

Use this resource to search for BPM timer event triggers. 
The result enables you to to update the date and time at which the trigger should next execute.

#### Identifier

The ID of the timer event trigger (a long value), retrieved through search (GET method).

#### Representation
```json
{
  "id": "the ID of the timer returned",
  "id_string": "number" (since 7.0.1)_,
  "eventInstanceId": "the ID of the event instance to which this trigger is related",
  "eventInstanceId_string": "number" (since 7.0.1),
  "executionDate": "the long value of the next execution date (number of milliseconds from January 1st, 1970 00:00:00)",
  "eventInstanceName": "the name of the event instance to which this trigger is related"
}
```

The string representation added in 7.0.1 for Long attributes is a workaround for the JavaScript integer spectrum issue.

#### Methods

The methods used for this resource are:

* GET - Search for timer event triggers related to a case, with optional search options
* PUT - Update a timer event trigger next execution date

#### Search for timer event triggers related to a case

Search for BPM timer event triggers.

* **URL**  
  `/API/bpm/timerEventTrigger`  
  _Example_: `/API/bpm/timerEventTrigger?caseId=4025&p=0&c=10&`
* **Method**  
  `GET`
* **Data Params**  
  * `caseId`: ID of the case (Process instance)
* **Success Response**  
  A JSON representation of a list of timer event triggers, as described above
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "id":4015,
        "id_string":"4015",
        "eventInstanceId":2,
        "eventInstanceId_string":"2",
        "executionDate":1413980484194,
        "eventInstanceName":"Minuterie1"
      }
    ]
    ```

#### Update a timer event trigger next execution date

Specify the next execution date of a timer event trigger.

* **URL**  
  `/API/bpm/timerEventTrigger/:timerEventTriggerID`  
* **Method**  
  `PUT`
* **Request Payload**  
  A JSON representation of a long value with attribute name "executionDate"
  ```json
  {
    "executionDate": 1433980484194
  }
  ```
* **Success Response**  
  The actual long value corresponding to the next execution date of the timer event trigger, as a long value
  * **Code**: 200
  * **Payload**:  
    ```json
    {
        "executionDate": 1433980484194
    }
    ```
<a id="message"/>

### Message

#### Description

Use this resource to send BPM message events.
Message events are caught by processes using `catch message event` flow nodes (Start, intermediate, boundary or receive tasks).


#### Methods

The methods used for this resource is:

* POST - Send a message

#### Send a message event

* **Header**  
  `Content-Type : application/json`
* **URL**  
  `/API/bpm/message`
* **Method**  
  `POST`
* **Request Payload**  
  ```json
  {
    "messageName" : "myMessage" ,
    "targetProcess": "processName",
    "targetFlowNode": "catchMessageFlowNodeName", //Optional
    "messageContent" : {
        "data1" : {
            "value" : "aValue" //Cannot be null
         },
        "data2" : {
            "value" : 42, //Cannot be null or empty
            "type" : "java.lang.Long" //Optional
        },
        ...
    },
    "correlations" : {
        "key1" : {
            "value" : "aValue" //Cannot be null
        },
        "key2" : {
            "value" : 123, //Cannot be null or empty
            "type" : "java.lang.Integer" //Optional
        },
        ... // 5 keys max
    }
  }
  ```
  _Supported value types in message content and correlations_ :  
  * java.lang.String
  * java.lang.Boolean
  * java.lang.Integer
  * java.lang.Double
  * java.lang.Float
  * java.lang.Long
  * java.util.Date (Supports **ISO-8601** format, eg: `2013-01-02T02:42:12.17+02:00`)
  * java.time.LocalDate (Supports **ISO-8601** format, eg: `2018-02-04`)
  * java.time.LocalDateTime (Supports **ISO-8601** format, eg: `2018-02-04T10:30:15`)
  * java.time.OffsetDateTime (Supports **ISO-8601** format, eg: `2018-02-04T10:30:15+01:00`)  
  When not set, the type is guessed using the value. Be careful as it can lead to type inconsistency in the target process (eg: a java.lang.Long is expected and the guessed type is a java.lang.Integer)
* **Success Response**  
  * **Code**: 204
