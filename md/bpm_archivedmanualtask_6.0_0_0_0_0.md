## archivedManualTask

### Description

Use the archivedManualTask resource to access archived process subtasks.

### Identifier

Simple, the ID of the object (a long value)

### Representation

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
    

### Methods

The methods used for this resource are:

* GET - Read or search an archived subtask

### Retrieve a subtask

Use a GET method to retrieve information about a subtask.

Example: Get the information about the subtask with id=160007\.
Method
GET

URL
`http://localhost:8080/bonita/API/bpm/archivedManualTask/40001`

Payload
empty

Response

    
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
    
    

### Search subtasks

Use a GET method with filters and search terms to search for subtasks.

You can filter on:

* assigned\_id={user\_id}: retrieve only the manual tasks assigned to the specified user. For example, retrieve the manual tasks assigned to user with id 1: `http://localhost:8080/bonita/API/bpm/archivedManualTask?p=0&c=10&f=assigned_id%3d1`.
* state=skipped | completed | failed : retrieve only the manual tasks with the specified state. For example, retrieve the ready tasks: `http://localhost:8080/bonita/API/bpm/archivedManualTask?p=0&c=10&f=state%3dready`.
* caseId={case\_id}: retrieve only the manual tasks created in the specified case. For example, retrieve the manual tasks for the case\_id 2: `http://localhost:8080/bonita/API/bpm/archivedManualTask?p=0&c=10&f=caseId%3d2`.
* parentTaskId={parentTask\_id}: retrieve only the manual tasks for a specific parentTask\_id. For example, retrieve the manual tasks for the parentTask\_id 40001: `http://localhost:8080/bonita/API/bpm/archivedManualTask?p=0&c=10&f=parentTaskId%3d40001`.

You can search on:

* name: search all manual tasks with a name that starts with the search string. For example, search for all manual tasks that have a name that starts with MySubTask: ` http://localhost:8080/bonita/API/bpm/archivedManualTask?p=0&c=10&s=MySubTask`.

#### Description
Request url
/API/bpm/archivedManualTask?p={page}&c={count}&o={orders}&f={filters}&s={search}&d={deploy}

Request method

GET

Request payload

empty

Response

An array of manualTask objects