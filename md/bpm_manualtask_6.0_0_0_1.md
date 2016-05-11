## manualTask

### Description

Use the manualTask resource to access process subtasks. For archived subtasks use archivedManualTask.

### Identifier

Simple, the ID of the object (a long value)

### Representation

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

### Methods

The methods used for this resource are:

* POST - Add a new subtask
* GET - Read or search a subtask
* PUT - Execute the subtask

### Add a new subtask

Use a POST method to create a new subtask. A subtask is attached to a parent task and it needs to be immediately assigned to a user.

Example: Add a new subtask to the parent task with id 1\. The subtask has displayName "My subtask" , is assigned to user 1, and contains other important information
Method
POST

URL
`http://localhost:8080/bonita/API/bpm/manualTask`

Payload

    { 
    "parentTaskId":"40001", 
    "state":"ready", 
    "name":"My subtask", 
    "description":"This is my subtask", 
    "priority":"above_normal", 
    "dueDate":"2014-12-25 00:00:00.000", 
    "assigned_id":"1" 
    }

Response

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

### Execute a subtask

Use a PUT method to execute a subtask. Executing a subtask basically means changing its state to completed and providing an executedBy value.

Example: Execute the subtask with id 40006
Method
PUT

URL
`http://localhost:8080/bonita/API/bpm/manualTask`

Payload

    { 
    "state":"completed", 
    "executedBy":"1" 
    }

### Retrieve a subtask

Use a GET method to retrieve information about a subtask.

Example: Get the information about the subtask with id=40001\.
Method
GET

URL
`http://localhost:8080/bonita/API/bpm/manualTask/40001`

Response

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

### Search subtasks

Use a GET method with filters and search terms to search for subtasks.

You can filter on:

* assigned\_id={user\_id}: retrieve only the manual tasks assigned to the specified user. For example, retrieve the manual tasks assigned to user with id 1: `http://localhost:8080/bonita/API/bpm/manualTask?p=0&c=10&f=assigned_id%3d1`.
* state=skipped | ready | completed | failed : retrieve only the manual tasks with the specified state. For example, retrieve the ready tasks: `http://localhost:8080/bonita/API/bpm/manualTask?p=0&c=10&f=state%3dready`.
* caseId={case\_id}: retrieve only the manual tasks created in the specified case. For example, retrieve the manual tasks for the case\_id 2: `http://localhost:8080/bonita/API/bpm/manualTask?p=0&c=10&f=caseId%3d2`.
* parentTaskId={parentTask\_id}: retrieve only the manual tasks for a specific parentTask. For example, retrieve the manual tasks for the parentTask\_id 40001: `http://localhost:8080/bonita/API/bpm/manualTask?p=0&c=10&f=parentTaskId%3d40001`.

You can search on:

* name: search all manual tasks with a name that starts with the search string. For example, search for all manual tasks that have a name that starts with MySubTask: `http://localhost:8080/bonita/API/bpm/manualTask?p=0&c=10&s=MySubTask`.

#### Description
Request url
/API/bpm/manualTask?p={page}&c={count}&o={orders}&f={filters}&s={search}&d={deploy}

Request method

GET

Request payload

empty

Response

An array of manualTask objects