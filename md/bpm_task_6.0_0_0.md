## task

### Description

Manage process tasks

### Identifier

The ID of the task (a long value).

### Representation

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

### Methods

The methods used for this resource are:

* GET - Read a resource or search for a resource
* PUT - Update a resource

### Read a task
Request url
http://../API/bpm/task/{taskId}

Request method

GET

Request payload

empty

Response payload

JSON representation of a task

#### Example

Get the task of id 10
Request url
/API/bpm/task/10

Request method

GET

Request payload

empty

Response payload

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

### Update a task
Request url
http://../API/bpm/task/{taskId}

Request method

PUT

Request payload

Task fields to update (forbidden fields are : caseId, processId, name, executedBy, type, id, reached\_state\_date, last\_update\_date)

Response payload

empty

#### Example

Update task state to completed
Request url
/API/bpm/task/16

Request method

PUT

Request payload

{ "state": "completed" }

Response payload

empty

### Search tasks
Request url
http://../API/bpm/task

Request method

GET

Request payload

empty

Response payload

JSON representation of an array of tasks

#### Parameters

* Accepted sort values (o={value}) : caseId, processId, state, type, supervisor\_id, last\_update\_date
* Accepted filters (f={filter}=value) : caseId, processId, state, type, supervisor\_id, last\_update\_date
* Accepted deployer (d={deployer}) : processId, caseId, rootContainerId, executedBy, executedBySubstitute

#### Example

Get ten first tasks for process id 8410739119827826184 order by state
Request url
/API/bpm/task?c=10&p=0&f=processId=8410739119827826184&o=state

Request method

GET

Request payload

empty

Response payload

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
    }, 
    { 
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