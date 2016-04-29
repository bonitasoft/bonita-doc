## archivedHumanTask

### Description

An Archived Human task is a User task or Manual task that has been archived. 

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

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
    "last_update_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was last updated, for example '2014-10-17 16:05:42.626)_"
    }
    

### Methods

The methods used for this resource are:

* GET - Read a resource

### Actions

#### Retrieve an archivedHumanTask

Description
Request url
http://../API/bpm/archivedHumanTask/

Request method

GET

Request payload

empty

Response payload

thge JSON representation of an archivedHumanTask

#### Example
Request url
GET |/API/bpm/archivedHumanTask/20004

Response

     
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
    

#### Search for a archivedHumanTask

Retrieve archivedHumanTask objects that match the specified filters. You can filter on:

* assigned\_id={user\_id}: retrieve only the human tasks assigned to the specified ID. For example, retrieve the human tasks assigned to user with id 2: http://host:8080/bonita/API/bpm/archivedHumanTask?p=0&c=10&f=assigned\_id%3d2
* state=: retrieve only the archived user tasks with the specified state. For example, retrieve the skipped tasks: http://host:8080/bonita/API/bpm/archivedHumanTask?p=0&c=10&f=state=skipped
* name=: retrieve only the human tasks with the specified name. For example, retrieve the human tasks with the name "Analyse Case": http://host:8080/bonita/API/bpm/archivedHumanTask?p=0&c=10&f=name=Analyse Case
* displayName=: retrieve only the archived user tasks with the specified displayName. For example, retrieve the human tasks with the displayName "Analyse Case": http://host:8080/bonita/API/bpm/archivedHumanTask?p=0&c=10&f=displayName=Analyse Case

#### Description
Request url
/API/bpm/archivedHumanTask?p={page}&c={count}&o={orders}&f={filters}&s={search}&d={deploy}

Request method

GET

Request payload

empty

Response

An array of archivedHumanTask objects in JSON

#### Example

Get the human tasks assigned to the user with id 2\. The specified [search parameters](rest-api-overview.md#standard_search_params) request paged results, starting from the firsst page, with a maximum of 10 results returned in each page. In this example, two results are returned.
Request url
GET |http://host:8080/bonita/API/bpm/archivedHumanTask?p=0&c=10&f=assigned\_id%3d2

Response

    
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
    }
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