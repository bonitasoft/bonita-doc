# API glossary

## Definition

**Definition**: in Bonita Studio you create definition of processes. A definition of a process includes name, version, definition of actors name...  
A process definition includes definition of tasks.  
The definition of tasks includes connectors, contract inputs declaration (for user task)...

**Instance** : when you start a process (using Portal or API) what actually happen is a creation of a new process instance based on the selected process definition.  
Starting a process instance will actually start a new instance of the start event and usually start a new instance of the first task.

::: info
**Note**: if a process loops on a task, multiple instances of a same task definition will be created.
:::

**Case**: A case is a process instance.

## ProcessInstance (REST: case)

* **id**: id of the process instance
* **callerId (not in REST)**: id of the call activity use to create this process instance. `null/0` if process instance was not created using a call activity.
* **processDefinitionId**: the id of process definition use to create this process instance.
* **rootProcessInstanceId (rootCaseId for REST)**: the id of the top parent process instance. Parents exist for event sub-processes and when instance was created using a call activity. If there is no parent it is his own id.
* **endDate**: the date on which the process instance is marked as _completed_.
  ::: info
  **Note**: the _completed_ state is a transitionnary state. Right after a process instance is _completed_, it is archived.
  :::

## FlowNodeInstance (REST: flowNode)

Use to represent an instance of a none start event, user task, call activity, multi instance activity (the container instance and also included instances), gateways...

* **id**: id of the FlowNodeInstance
* **displayDescription**: dynamically generated human readable flow node description. Only apply to `UserTaskInstance`, empty in REST API and null in Engine API otherwise.
* **displayName**: same as for `displayDescription` but for the name. Only apply to `UserTaskInstance`, empty in REST API and null in Engine API otherwise.
* **executedBy**: the id (long) of the user who performed this flow node. If performed by a substitute id is set to 0 and the performer id is stored in `executedBySubstitute`.
* **executedBySubstitute**: the id (long) of the user who performed this flow node in case where a substitute did it. If flow node was not performed by a substitute the value is set to 0 and the performer is stored in `executedBy`. It applies only to flow nodes that are user tasks
* **flownodeDefinitionId (not in REST)**: the id of the flow node definition who lead to this flow node instance creation. In the case of a multi-activity task instance, each instance points to the original flow node multi instance definition.
* **parentContainerId (parentCaseId for REST)**:
  * Id is not always an id of a process instance:
    * For `UserTask` or `ManualTaskInstance` (i.e. subtask in portal), `AutomaticTaskInstance` (BPMN service task), `BoundaryEventInstance`, `CallActivityInstance`: id of the process instance that include directly the instance of the element. Behavior is the same in case of a process instance created by a call activity: id returned is the id of the child process that includes the flow node.
    * For a flow node that is created by a mutli-instantiated task definition: parent flow node instance id.
    * For `BoundaryEventInstance`: id of the parent of the attached task instance
    * For tasks in event sub process: event sub process id
* **parentProcessInstanceId (parentCaseId for REST)**:
  * Always returns the immediate containing process instance ID. Don't escalate to parent process.
  * For event sub-process: id of the process instance that initiate the sub-process event.
* **processDefinitionId (processId for REST)**: Returns the ID of the process definition where this `FlowNodeInstance` is defined
* **rootContainerId (rootCaseId for REST)**: Always return the top (root) process instance id. Compare to `parentContainerId` escalate to the root process instance when called on a `FlowNodeInstance` that is part of a process instance created by a call activity execution.
* **parentTaskId for REST**: Only apply to sub task (task dynamically added by user at runtime). Represent the id of the task from which the subtask was created.

For a complete description of the different elements, check out the following pages:
* on the engine side, the [Javadoc](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/index.html) page
* on the web site, the [REST API page](_rest-api.md) page
