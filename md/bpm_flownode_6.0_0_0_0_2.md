## flowNode

### Description

A flow node (gateway, event, or task) in an open instance of a process. 

### Identifier

The ID of the flowNode (a long).

### Representation

    
    {
        "id": "_the flow node id (long)_",
        "displayDescription": "_the human readable flow node description (string)_",
        "executedBySubstitute": "_the id (long) of the user who really performed this flow node in case where a substitute did it, or 0 if the flow node was not performed by a substitute_",
        "caseId": "_the case id (long) that is associated with this flow node_",
        "parentCaseId": "_the parent case id (long) that is associated with this flow node's case_",
        "rootCaseId": "_the root case initiator id (long) that is associated with this flow node's case_",
        "processId": "_the process id (long) that is associated with this flow node_","
        "rootContainerId": "_the root process id (long) of the root case that is associated with this flow node_",
        "state": "_the current state of the flow node (string,  for example, ready, completed, failed)_",
        "type": "_the flow node type (string)_",
        "assigned_id": "_the user id (long) that this flow node is assigned to, or 0 if it is unassigned_",
        "assigned_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current flow node was assigned, for example '2014-10-17 16:05:42.626'_",
        "executedBy": "_the id (long) of the user who executed the flow node, or 0 if the flow node has not been executed_",
        "priority": "_the priority (string) of the current flow node_",
        "actorId": "_the id (long) of the actor that can execute this flow node, null otherwise_",
        "description": "_the flow node description (string)_",
        "name": "_the flow node name (string)_",
        "reached_state_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flow node reached the current state, for example '2014-10-17 16:05:42.626'_",
        "displayName": "_the display name (string) of this flow node_",
        "dueDate": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flow node is due, for example '2014-10-17 16:05:42.626'_",
        "last_update_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flow node was last updated, for example '2014-10-17 16:05:42.626)_",
        "parentTaskId" : "_in the case of a subtask, the parent task id (long)_"
    }
    
    

### Methods

The methods used for this resource are:

* GET - Read a flow node or search for a flow node
* PUT - Replay a flow node (only in Performance edition)

### Get a Flow Node

Retrieve the flow node information of the given id.
Request url
http://../API/bpm/flowNode/{id}

Request method

GET

Request payload

empty

Response payload

The JSON representation of the specified flownode

#### Parameters

The following parameters are available:

* d:
  * processId
  * caseId
  * rootCaseId
  * parentCaseId
  * rootContainerId
  * executedBy
  * executedBySubstitute
  * actorId
  * assigned\_id
  * parentTaskId

#### Example

Get the details of flow node 77456\.
Request url
http://../API/bpm/flowNode/77456

Request method

GET

Request payload

Response payload

    
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
    			

### Search among Flow Nodes

Search for flow nodes using given parameters. Flow nodes in states completed, cancelled, or aborted are not retrieved. The search returns an array of flow nodes.
Request url
http://../API/bpm/flowNode/?_search\_options_

Request method

GET

Request payload

Response payload

An array of JSON representations of flow nodes

#### Parameters

The following parameters are available:

* o: 
  * name
  * displayName
  * state
  * processDefinitionId
  * parentProcessInstanceIdo
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
* d:
  * processId
  * caseId
  * rootCaseId
  * parentCaseId
  * rootContainerId
  * executedBy
  * executedBySubstitute
  * actorId
  * assigned\_id
  * parentTaskId
* The [standard search parameters](rest-api-overview.md#standard_search_params).

#### Example

Get all the active flow nodes named "Escalate", ordering the results by state.
Request url
http://../API/bpm/flowNode/?p=0&c=10&f=name%3dEscalate&o%3dstate

Request method

GET

Request payload

empty

Response payload

An array of JSON representations of flow nodes

### Change a Flow Node state

Replay the flow node. (only in Performance edition)
Request url
http://../API/bpm/flowNode/{id}

Request method

PUT

Request payload

{"state" : "replay"}

Response payload

empty