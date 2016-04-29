## userTask

### Description

An executable task that is performed by a user.

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

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

### Methods

The methods used for this resource are:

* GET - Retrieve a userTask, search for userTask objects
* POST - Execute a task with contract
* PUT - Update a userTask

## Actions

### Retrieve a userTask
Request url
http://../API/bpm/userTask/_userTaskId_

Request method

GET

Request payload

empty

Response payload 

A userTask object

#### Example

Get the userTask with id 20004\.
Request url
GET |/API/bpm/userTask/20004

Response

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

### Update a userTask

Fields that can be updated are `assignedId` and `state`. The only value that can be set for the state is "skipped". You only need to specify the fields that are to be updated.
Request url
/API/bpm/userTask/_userTaskId_

Request method

PUT

Request payload

{"assigned\_id" : "id of new user", "state":"skipped"}

Response payload

empty

#### Example

Assign userTask with id 20004 to the user with id 21\.
Request url
PUT |/API/bpm/userTask/20004

Request payload

    {"assigned_id" : "21"}

### Retrieve the task contract

Task contract elements can be retrived client side.
Request url
/API/bpm/userTask/_userTaskId_/contract

Request method

GET

Response payload

The task contract elements

#### Example

Retrieve the contract for the task 20004\.
Request url
GET |/API/bpm/userTask/20004/contract

Response

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

### Execute a task with contract

In order to execute a task, the task contract values have to be provided.
Request url
/API/bpm/userTask/_userTaskId_/execution

Request method

POST

Response payload

Empty if 204 OK, or a contract violation explanation in case of a 400 Bad request

#### Example 1

Execute the task 20004 providing correct contract values.
Request url
POST |/API/bpm/userTask/20004/execution

Request payload

    
    {  
       "ticket_comment":"This is a comment"
    }
    

Response

    204 OK no content

#### Example 2

Execute the task 20004 providing incorrect contract values.
Request url
POST |/API/bpm/userTask/20004/execution

Request payload

    
    {  
       "wrongElement":"This is not the right contract element"
    }
    

Response

    400 Bad request
    {  
       "exception":"class org.bonitasoft.engine.bpm.contract.ContractViolationException",
       "message":"USERNAME=walter.bates | Contract is not valid: ",
       "explanations":[  
          "Expected input [ticket_comment] is missing"
       ]
    }
    

### Retrieve the userTask context
Request url
http://../API/bpm/userTask/_userTaskId_/context

Request method

GET

Request payload

empty

Response payload 

A context object

#### Example

Get the context of the userTask with id 20004\.
Request url
GET |/API/bpm/userTask/20004/context

Response

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