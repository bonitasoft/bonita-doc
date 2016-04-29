## archivedUserTask

### Description

An executable task that has been performed by a user or skipped and is archived.

### Identifier

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
    "archivedDate":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was archived, for example '2014-10-17 16:05:42.626'_", 
    "dueDate":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task is due, for example '2014-10-17 16:05:42.626'_", 
    "last_update_date":"_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this task was last updated, for example '2014-10-17 16:05:42.626'_"
    } 

### Methods

The methods used for this resource are:

* GET - Retrieve an archivedUserTask, search for archivedUserTask objects

### Actions

#### Retrieve an archivedUserTask
Request url
http://../API/bpm/archivedUserTask/_id_

Request method

GET

Request payload

empty

Response payload 

An archivedUserTask object

#### Example

Get the archivedUserTask with id 240002\.
Request url
GET |/API/bpm/archivedUserTask/240002

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

#### Search for a archivedUserTask

Retrieve archivedHumanTask objects that match the specified filters. You can filter on:

* assigned\_id={user\_id}: retrieve only the user tasks assigned to the specified ID. For example, retrieve the user tasks assigned to user with id 2: http://host:8080/bonita/API/bpm/archivedUserTask?p=0&c=10&f=assigned\_id%3d2
* state=: retrieve only the archived user tasks with the specified state. For example, retrieve the skipped tasks: http://host:8080/bonita/API/bpm/archivedUserTask?p=0&c=10&f=state=skipped
* name=: retrieve only the user tasks with the specified name. For example, retrieve the user tasks with the name "Analyse Case": http://host:8080/bonita/API/bpm/archivedUserTask?p=0&c=10&f=name=Analyse Case
* displayName=: retrieve only the archived user tasks with the specified displayName. For example, retrieve the user tasks with the displayName "Analyse Case": http://host:8080/bonita/API/bpm/archivedUserTask?p=0&c=10&f=displayName=Analyse Case

#### Description
Request url
/API/bpm/archivedUserTask?p={page}&c={count}&o={orders}&f={filters}&s={search}&d={deploy}

Request method

GET

Request payload

empty

Response

An array of archivedUserTask objects

#### Example

Get the user tasks assigned to the user with id 2\. The results are paged, with a maximum of 10 results returned in each page. The fist set of results are returned. In this example, two results are returned.
Request url
GET |http://host:8080/bonita/API/bpm/archivedUserTask?p=0&c=10&f=assigned\_id%3d2

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