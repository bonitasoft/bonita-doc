# 4.7.3 Execution sequence, states, and transactions

This page describes the sequence of actions performed when a process instance is created and when a step is performed by a user.


It shows the interactions between the Bonita BPM Portal and Bonita BPM Engine.

In the sequences described in this page, some of the actions apply only to **Teamwork**, **Efficiency**, or **Performance** editions, and are marked SP only.

For the **Community** edition, these actions are not relevant, but the order of the other actions is the same.



[Initialization](#initialization)  
[Process instantiation form interaction ](#form)  
[Step action sequence](#step)  
[Flow node states and transitions](#flownode_states)  
[Execution of a step](#execute_step)  
[Example: User task](#example)  
[Short transactions and asynchronism](#async)  
[Summary of state types](#state_types)  
[State behaviors](#states)



## Process instantiation action sequence

### Initialization

1. The Engine initializes transient data in the case start form by executing the expressions defined to set default values.
2. **SP only** The Engine launches connectors to initialize transient data in the case start form. The result overrides existing default values.
3. For each widget, the Engine evaluates the expression to determine whether the widget needs to be displayed. This expression is only evaluated once. 
4. **SP only** The Engine evaluates the contingency condition to determine whether a widget should be displayed immediately. 
5. For a widget in the case start form that is to be displayed, the Engine sets the initial value. Note that a case start form cannot display any process data but can use parameters, constants and form transient data.

### Process instantiation form interaction 

1. The Portal displays the form to the user. 
2. The user enters data in the form. 
3. **SP only** If the form definition contains contingencies, they are evaluated by the Engine, taking account of values entered by the user: The Engine updates the widget value based on contingency definition.
4. The Engine determines whether a widget should be displayed or hidden based on contingency processing.
5. Note that if more than one element is contingent on a single value, execution order is not guaranteed.
6. Form submission Form submission is triggered when the user clicks a **_Submit_** button. 
7. A process instantiation form can also contain a **_Next_** button, which is processed in the same way as a **_Next_** button on a step form (see [Step action sequence](#step)).
8. When **_Submit_** button is clicked: The Engine executes the validators for the widgets.
9. If all individual validators return a positive result, page validators are triggered. Validation always happens only on current page.
10. The Portal calls the Engine to create process instance.
11. The Engine checks that process is enabled.
12. The Engine gets process definition.
13. The Engine creates the process instance, with state Initializing.
14. For each process variable, the Engine sets the value based on information provided by Portal (form submission) or using default value. The default value is not processed if a value is provided by Portal.
15. The Engine creates and initializes search indexes.
16. The Engine initializes process instance Documents with default value coming from the definition or with submitted files.
17. The Engine launches form connectors and executes actions.
18. Connectors are executed synchronously, in the following order: form pages connectors (based on page order), Submit button connectors, last page connectors.
19. Actions are executed in the same order. 
20. **_Submit_** button processing is complete.
21. The Engine informs the Portal. 
22. Completing the instantiation The Engine instantiates and executes the "on enter" connectors (evaluate input expression, execute, evaluate output operation). This an asynchronous operation. Execution duration of a connector is limited to a maximum of 5 minutes by default. 
23. For a subprocess, the Engine executes specific initialization actions (for example, to inherit data from the parent process).
24. The Engine evaluates the case start form confirmation message. 
25. The Portal displays the case start confirmation message.
26. The process is instantiated, and the Engine executes the process flow.




## Step action sequence

For a process step, the sequence of actions is as follows:

1. The Engine initializes step variables with their default values.
2. The Engine executes actor filters.
3. The Engine launches connectors on step enter.
4. The Engine evaluates the Step dynamic name and description.
5. They will be evaluated only once.
6. The Portal displays the form to the user, who enters data.
7. **SP only** If the form contains contingencies, they are evaluated by the Engine, taking account of values entered by the user: The Engine updates the widget value based on contingency definition.
8. The Engine determines whether a widget should be displayed or hidden based on contingency processing. Note that if more than one element is contingent on a single value, execution order is not guaranteed.
9. When a **_Next_** or **_Submit_** button is clicked:
  * **SP only** The Engine executes the validators for the widgets (Next or Submit).
  * **SP only** If all individual validators return a positive result, page validators are triggered. Validation always happens only on current page. 
There is no validation when the Previous button is clicked.
  * For a Next button, the Engine evaluates the condition to determine the next page to be displayed.

10. The Engine executes the Operations defined for the step.
11. The Engine launches connectors on step finish. 
12. The Engine processes the Description after step completion.
13. The Engine evaluates the Step confirmation message.
14. The Portal displays the step confirmation message.
15. The step is complete.




## Flow node states and transitions


A state is either stable or terminal:

* stable: the flow node is not yet finished, but paused as it waits for input, typically from the user. The transaction is committed.
* terminal: This is the last state of the flow node. A flow node in this state is considered to be finished and we trigger the asynchronous execution of the following elements of the process.

Each state has a specific behaviour and is bounded by a transaction.
A flow node is defined by a set of states.





### Execution of a step


1. Get the current state of the step.
2. Execute the state's behavior.
3. Find the next state of the flow node and set it as the current state.
  1. If the state is stable, the transaction is committed, and the API call is returned.
  2. If the state is terminal, the transaction is committed, the Engine triggers the asynchronous execution of the followings elements of the process and the API call is returned.
  3. If the state is neither stable nor terminal, the transition to the next state is scheduled asynchronously.

If there is a connector to execute in the state's behavior, then the transaction is committed and the connector is executed. The flow node stays in the current state while the connector is executed. 
When execution of the last connector is completed, the state's behaviour is completed. If you are using a Bonita BPM Subscription Pack edition, a timeout can be set for connector execution.





### Example: User task 


The diagrams below show the transactions and states when a user task is executed. 
The vertical line represents the condition necessary to execute the current state.
The first state is initializing: it is automatically executed and the flow node goes to next state (Ready) but is executed only after an API call.


In the first diagram, the task contains connectors.


![Diagram of the states and transactions when a user task with connectors is executed](images/images-6_0/user_task_execution_with_connector.png)

User task execution with connectors

  
  

In the second diagram, there are no connectors in the task.
  

![Diagram of the states and transactions when a user task with connectors is executed](images/images-6_0/user_task_execution_without_connector.png)

User task execution with connectors

  
  

As you can see in these illustrations, there is a non-negligible cost when adding some connectors to an activity: if there is no connector to execute then the state executes in one transaction, but if there is a connector to execute in the state this requires at least three transactions: 

* The first transaction is committed just before the execution of the connectors. There is one transaction for this whatever the number of connectors.
* The connectors are not transactionnal. Nevertheless, a transaction is needed to save the output data of the connector execution. There will be a transaction for each connector that is executed.
* The last connection is used to continue to execute the current state's behavior, and to set the state to the next reachable one (but not execute it).

The diagram below shows the states in execution of a user task.


![Diagram of the details of user task execution](images/images-6_0/user_task_details.png)

User task details


1. The Engine commits the transaction and then submits a work to execute the connectors asynchronously. The connectors are executed outside any transaction and thus are not a problem for the data integrity if the execution takes too long.
2. As soon as there is a free slot in the WorkService, it executes the work, which is in fact the connector execution.
3. When a connector execution is finished, if there are other connectors, they are executed in the same way. If there are no other connectors, the Engine continues to execute the state's behavior by triggering a new work.
4. When the Engine executes a state's behavior, it updates the display name, and then sets the activity to the state "Ready". As this is a stable state, the Engine commits the transaction and stops.
5. The state "Ready" will then be executed through an API call.

## Short transactions and asynchronism


Transactions in the Engine are as small as possible, and each transaction is committed as soon as possible.
Each unit of work uses a non-blocking queued executor mechanism and is thus asynchronous. There is a dedicated queue for asynchronous executions. (Connector execution is handled in a separate execution queue.)


As a consequence of the design, when an asynchronous work unit originates from an API call (which might be a result of a human action), then the call returns and ends the transaction. 
The work unit is then executed as soon as possible, asynchronously, in a separate transaction.
For this reason, a task that is being initialized might not yet be ready for execution, but will be executable after a short wait while the transactions are managed.
A client application therefore needs to poll regularly, or write an [event handler](/event-handlers.md), to check when the asynchronous work unit is finished.


### Comparison with 5.x


In Bonita Open Solution 5.x, all automatic treatment that can be executed sequentially is included in one transaction. 
This applies to automatic tasks that are not flagged as asynchronous, transitions, gateways, and call activities (called processes). 
For example, a fully automatic process without asynchronous tasks is entirely executed in a single transaction.
In constrast, a human task or an asynchronous automatic task forces the ending of the transaction that leads to it. 
A new transaction is started when the human task or asynchronous automatic task is executed. 
This transaction continues until the next human task or the next asynchronous automatic task is reached.
Connectors configured to execute at the start of a task are always executed in a separate transaction.


## Summary of state types


* 
**Initializing** indicates that an activity is being initialized.
* 
**Ready** indicates that a human tasks and manual tasks has been initialized but is not yet being executed.
* 
**Waiting** indicates that a RECEIVE\_TASK, BOUNDARY\_EVENT or INTERMEDIATE\_CATCH\_EVENT activities is waiting for some external trigger.
* 
**Executing** indicates that an activity is being executed.
* 
**Failed** indicates that a task has failed because of a problem in execution, for example because of an exception that was not anticipated, a connector that fails, or bad expression design).
* 
**Skipped** indicates that a task that failed because of connector execution failure is being skipped instead of re-executed. Skipping a task skips the execution of any connectors not already executed and proceeds to task completion.

* 
**Cancelled** indicates that an activity is cancelled by a user.
* 
**Aborting** indicates that an activity is cancelled by the system. For example, an interrupting event sub-process can trigger ABORTS for all other active paths.
* 
**Completed** indicates an activity that is complete.
* 
**Error** - not currently used.


## State behaviors


The following table shows the states and behaviors for each flow node type in normal (no error) operation.

Flow node type
State
State type
Behavior

AutomaticTask
executingAutomaticActivity

create data

create boundary

execute connectors ON\_ENTER

update display name

execute operations

execute connectors ON\_FINISH

map data of multi instance

update display name

completingActivityWithBoundary
Conditional: activity has boundary events
interrupt boundary

completed



BoundaryEvents
initializingBoundaryEvent

handle boundary event: register the event

update display name

waiting
stable: wait for the event
do nothing

initializingBoundaryEvent

abort related activity is interrupting

create a token for the new branch

completed



CallActivity
initializingActivityWithBoundary

create data

create boundary

execute connectors ON\_ENTER

update display name

start the called process

executingCallActivity
stable: wait for the called process to finish
map data of multi instance

update display name

completingActivityWithBoundary
Conditional: activity has boundary event
interrupt boundary

completingCallActivity

map data of called process to call activity

execute operations

execute connectors ON\_FINISH

map data of multi instance

completed

update display name

EndEvent
executingThrowEvent

update display name

throw the event

completed



Gateways
initializingAndExecuting



completed



IntermediateCatchEvent
initializing

handle catch event: register the waiting event

update display name

waiting
stable: wait for the event


executing



completed



IntermediateThrowEvent
executingThrowEvent
-
update display name

throw the event

completed



LoopActivity
initializingLoop

create boundary

create the looped activity

add a token on the loop activity

start the looped activity

executingLoop
stable: wait for the loop activity to finish
when loop activity finish: recreate activity and execute it or finish

completingActivityWithBoundary
Conditional: activity has boundary event
interrupt boundary

completed



ManualTask
initializing

create data

map actors

execute connectors ON\_ENTER

update display name

ready
stable
operations

execute connectors ON\_FINISH

map data of multi instance

update display name

completingSubTaskState
Conditional: activity has subtask
interrupt sub tasks

completed



MultiInstanceActivity
initializingMultiInstance

create boundary

create the multi instantiated activities

add a token for each instance

start the multi instantiated activities

executingMultiInstance
stable: wait for an instance finish
when an instance finish: evaluate finish condition and can create new instance also or finish

completingActivityWithBoundary
Conditional: activity has boundary event
interrupt boundary

completed



ReceiveTask
initializingActivityWithBoundary

register the waiting event

create data

create boundary

execute connectors ON\_ENTER

update display name

waiting
stable: wait for the message event
do nothing

executing

execute connectors ON\_FINISH

completingActivityWithBoundary
Conditional: activity has boundary event
interrupt boundary

completed



SendTask
executingAutomaticActivity

create data

create boundary

execute connectors ON\_ENTER

update display name

execute operations

Throw the event

execute connectors ON\_FINISH

map data of multi instance

update display name

completingActivityWithBoundary
Conditional: activity has boundary event
interrupt boundary

completed



StartEvent
initializingAndExecuting

update display name

completed



SubProcessActivity
executingCallActivity
stable: wait for subprocess to finish
map data of multi instance

update display name

completed



UserTask
initializingActivityWithBoundary

create data

create boundary

map actors

execute connectors ON\_ENTER

update display name

start the called process

ready
stable
operations

execute connectors ON\_FINISH

map data of multi instance

update display name

completingActivityWithBoundary
Conditional: activity has boundary event
interrupt boundary

completingSubTaskState
Conditional: activity has subtask
interrupt sub tasks

completed