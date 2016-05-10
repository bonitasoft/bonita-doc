## archivedFlowNode

### Description

A flow node (gateway or event or task) in an archived instance of a process.

### Identifier

The ID of the flowNode (a long).

### Representation

    {
    "id": "_the flowNode id (long)_",  
    "sourceObjectId": "_the original id of the flowNode before it was archived_",
    "displayDescription": "_the human readable flowNode description (string)_", 
    "executedBySubstitute": "_the id (long) of the user who really performed this flowNode in case where a substitute did it, or 0 if the flowNode was not performed by a substitute_", 
    "caseId": "_the case id (long) that is associated with this flowNode_", 
    "parentCaseId": "_the parent case id (long) that is associated with this flowNode's case_", 
    "rootCaseId": "_the root case initiator id (long) that is associated with this flowNode's case_", 
    "processId": "_the process id (long) that is associated with this flowNode_", 
    "rootContainerId": "_the root process id (long) of the root case that is associated with this flowNode_", 
    "state": "_the current state of the flowNode (string,  for example, ready, completed, failed)_", 
    "type": "_the flowNode type (string)_", 
    "assigned_id": "_the user id (long) that this flowNode is assigned to, or 0 if it is unassigned_", 
    "assigned_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current flowNode was assigned, for example '2014-10-17 16:05:42.626'_", 
    "executedBy": "_the id (long) of the user who executed the flowNode, or 0 if the flowNode has not been executed_",
    "priority": "_the priority (string) of the current flowNode_", 
    "actorId": "_the id (long) of the actor that can execute this flowNode, null otherwise_", 
    "description": "_the flowNode description (string)_", 
    "name": "_the flowNode name (string)_", 
    "reached_state_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flowNode reached the current state, for example '2014-10-17 16:05:42.626'_", 
    "displayName": "_the display name (string) of this flowNode_", 
    "dueDate": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flowNode is due, for example '2014-10-17 16:05:42.626'_", 
    "archivedDate": "_the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this flowNode was archived, for example '2014-10-17 16:05:42.626'_",
    "last_update_date": "_the date ('yyyy-MM-dd HH:mm:ss.SSS') when this flowNode was last updated, for example '2014-10-17 16:05:42.626)_", 
    "parentTaskId": "_in the case of a subtask, the parent task id (long)_" 
    }
    

### Methods

The methods used for this resource are:

* GET - Read a flow node or search for a flow node

### Get a Flow Node

Retrieve the flow node information of the given id.
Request url
http://../API/bpm/archivedFlowNode/{id}

Request method

GET

Request payload

empty

Response payload

The JSON representation of the specified flownode

### Search among flow nodes

Search for flow nodes using given parameters. Flow nodes in state completed, cancelled, aborted are not retrieved. It returns an array of flow nodes.
Request url
http://../API/bpm/archivedFlowNode

Request method

GET

Request payload

empty

Response payload

The JSON representation of the specified flownode

#### Parameters

The following parameters are available:

* o: 
  * name
  * displayName
  * state
  * type
  * isTerminal
  * processId
  * caseId
  * archiveDate
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
* The [standard search parameters](rest-api-overview.md).