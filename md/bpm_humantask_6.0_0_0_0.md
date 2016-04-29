## humanTask

### Description

A Human task is Manual task or a User task. 
A User task is a task that can be done by a user.
A Manual task is a subtask of a user task, and is also done by a user. 

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

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
    

### Methods

The methods used for this resource are:

* GET - Read a resource
* PUT - Update a resource

### Actions

#### Retrieve a humanTask

Description
Request url
http://../API/bpm/humanTask/

Request method

GET

Request payload

empty

Response payload

A humanTask

#### Example
Request url
GET |/API/bpm/humanTask/20004

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

#### Search for a humanTask

Retrieve humanTask objects that match the specified filters. You can filter on:

* assigned\_id={user\_id}: retrieve only the human tasks assigned to the specified ID. For example, retrieve the human tasks assigned to user with id 2: http://host:8080/bonita/API/bpm/humanTask?p=0&c=10&f=assigned\_id%3d2
* state=: retrieve only the archived user tasks with the specified state. For example, retrieve the skipped tasks: http://host:8080/bonita/API/bpm/humanTask?p=0&c=10&f=state=skipped
* name=: retrieve only the human tasks with the specified name. For example, retrieve the human tasks with the name "Analyse Case": http://host:8080/bonita/API/bpm/humanTask?p=0&c=10&f=name=Analyse Case
* displayName=: retrieve only the archived user tasks with the specified displayName. For example, retrieve the human tasks with the displayName "Analyse Case": http://host:8080/bonita/API/bpm/humanTask?p=0&c=10&f=displayName=Analyse Case

#### Description
Request url
/API/bpm/humanTask?p={page}&c={count}&o={orders}&f={filters}&s={search}&d={deploy}

Request method

GET

Request payload

empty

Response

An array of humanTask objects

#### Example

Get the human tasks that have been skipped. The results are paged using the [standard search parameters](/rest-api-overview.md#standard_search_params), with a maximum of 10 results returned in each page. The first set of results are returned. In this example, two results are returned.
Request url
GET |http://host:8080/bonita/API/bpm/humanTask?p=0&c=10&f=state=skipped

Response

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
    }
    {
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

### Update a humanTask

#### Description

Fields that can be updated are `assignedId` and `state`. Specify only those fields that you want to change.
Request url
/API/bpm/humanTask/\[taskId\]

Request method

PUT

Request payload

    { 
    "assigned_id" : "_new_user_id_", 
    "state":"_new_state_"
    }

#### Example

Skip the human task with id 20004\.
Request url
PUT |/API/bpm/humanTask/20004

Request payload

    {
    "state":"skipped"
    }