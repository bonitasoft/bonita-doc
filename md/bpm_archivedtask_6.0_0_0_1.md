## archivedTask

### Description

Get informations about archived tasks

### Identifier

The ID of the archived task (a long value).

### Representation

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
    

### Methods

The methods used for this resource are:

* GET - Read a resource or search for a resource

### Read an archived task
Request url
http://../API/bpm/archivedTask/{taskId}

Request method

GET

Request payload

empty

Response payload

JSON representation of an archived task

#### Example

Get the archived task with id 9
Request url
/API/bpm/archivedTask/9

Request method

GET

Response payload

    
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
    

### Search archived tasks
Request url
http://../API/bpm/archivedTask

Request method

GET

Request payload

empty

Response payload

JSON representation of an array of archived tasks

#### Parameters

* Accepted sort values (o={value}) : caseId, name, displayName, processId, state, type, archivedDate, reached\_state\_date, assigned\_id
* Accepted filters (f={filter}=value) : caseId, name, displayName, processId, state, type, archivedDate, reached\_state\_date, assigned\_id, isTerminal
* Accepted deployer (d={deployer}) : processId, caseId, rootContainerId, executedBy, executedBySubstitute

#### Example

Search ten first archived task of process 8410739119827826184 order by name
Request url
/API/bpm/archivedTask?c=10&p=0&f=processId=8410739119827826184&o=name

Request method

GET

Response payload

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
    }
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