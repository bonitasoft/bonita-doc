# Execution sequence, states, and transactions

This page describes the sequence of actions performed when a process instance is created and when a step is performed by a user.

It shows the interactions between the Bonita BPM Portal and Bonita BPM Engine.

In the sequences described in this page, some of the actions apply only to **Teamwork**, **Efficiency**, or **Performance** editions, and are marked "Subscription only".

For the **Community** edition, these actions are not relevant, but the order of the other actions is the same.

## Instantiation of a process through a user entry form

1. The Portal displays the process instantiation form to the user
1. The user enters data in the form
1. The button of the form having the **Start process** action in the **UI designer** sends a POST request with the form data to start the process
1. The submitted data are validated against the **process instantiation contract**
1. If the contract is valid the process instance is created and input values are persisted in database
6. Process data instances are created and initialized in the order of declaration using:
    * An **operation** declared on the process that saves its value to the process data
    * The **initial value expression** if no operation is declared
    * **null** if no expression or operation is defined
7. The Engine creates and initializes business data
1. **Subscription only**: The Engine creates and initializes search indexes
1. The Engine initializes process instance Documents with default value coming from the definition or with submitted files
1. Operations (that does not initialize data) are executed. Operations at process instantiation level can either come from V6 forms or from calling process instances (for processes stared by call-activities)
1. The Engine instantiates and executes the "on enter" connectors (evaluate input expression, execute, evaluate output operation). Connectors are executed in the order of declaration  
   **Community**: Execution duration is not limited. If the connector never finishes, the process instantiation will never finish  
   **Subscription**: Execution duration of a connector is limited to a maximum of 5 minutes by default. This timeout value can be changed by configuration. Above this limit,
   the connector execution is aborted and the process instantiation is considered failed.
1. The process is instantiated, the API call finish and the Engine executes the process flow asynchronously


## User Step action sequence

For a user step, the sequence of actions is as follows:

1. The Engine initializes task variables with their default values
1. The Engine executes actor filters and then potentially assigns the task to a user
1. The Engine launches the "on enter" connectors
1. The Engine evaluates the task dynamic name and description. This will be evaluated only once

The user task is now in **ready** state and is waiting for a user to submit it.

## User Step submission sequence

1. The Portal displays the form to the user
1. The user enters data in the form
1. The button of the form having the **Submit task** action in the **UI designer** sends a POST request with the form data to start the step
1. The submitted data are validated against the **step contract**
1. If the contract is valid input values are persisted in database and the execution continues asynchronously. Otherwise an exception is thrown and the step stays in the same state.
1. The Engine executes the Operations defined for the step
1. The Engine launches the "on finish" connectors
1. The Engine processes the Description after step completion
1. The step is complete.


## Flow node states and transitions

A state is either stable or terminal:

* stable: the flow node is not yet finished, but paused as it waits for input, typically from the user. The transaction is committed.
* terminal: This is the last state of the flow node. A flow node in this state is considered to be finished and the engine triggers the asynchronous execution of the following elements of the process.

Each state has a specific behaviour and its execution is wrapped into an [ACID](https://en.wikipedia.org/wiki/ACID) transaction.
A flow node is defined by a set of states.


## Execution of a step

1. Get the current state of the step.
1. Execute the state's behavior.
1. Find the next state of the flow node and set it as the current state.
  1. If the state is stable, the transaction is committed, and the API call is returned.
  1. If the state is terminal, the transaction is committed, the Engine triggers the asynchronous execution of the followings elements of the process and the API call is returned.
  1. If the state is neither stable nor terminal, the transition to the next state is scheduled asynchronously.

If there is a connector to execute in the state's behavior, then the transaction is committed and the connector is executed outside of any transaction.
The flow node stays in the current state while the connector is being executed.
When the execution of the last connector is complete, the state's behaviour is completed. If you are using a Bonita BPM Subscription edition, a timeout limit can be set for connector execution.


## Example: User task

The diagrams below show the transactions and states when a user task is executed.
The vertical line represents the condition necessary to execute the current state.
The first state is initializing: it is automatically executed and the flow node goes to next state (Ready) but is executed only after an API call.

### In the first diagram, the task contains connectors.

![Diagram of the states and transactions when a user task with connectors is executed](images/images-6_0/user_task_execution_with_connector.png)

### In the second diagram, there are no connectors in the task.

![Diagram of the states and transactions when a user task with connectors is executed](images/images-6_0/user_task_execution_without_connector.png)

As you can see in these illustrations, there is a non-negligible cost when adding some connectors on an activity:  
If there is no connector to execute then the state executes in one transaction.  
If there is at least one connector to execute in the state, the state execution requires at least three transactions:

* The first transaction is committed just before the execution of the connectors. There is one transaction for this whatever the number of connectors.
* The connectors are not transactional. Nevertheless, a transaction is needed to save the output data of the connector execution. There will be a transaction for each connector that is executed.
* The last transaction is used to continue to execute the current state's behavior, and to set the state to the next reachable one (but not execute it).



### Work service mechanism

![Diagram of the details of user task execution](images/images-6_0/user_task_details.png)



1. The Engine commits the transaction and then submits a work to execute the connectors asynchronously. The connectors are executed outside any transaction and thus are not a problem for the data integrity if the execution takes too long.
1. As soon as there is a free slot in the Work Service, it executes the work, which is in fact the connector execution.
1. When a connector execution is finished, if there are other connectors, they are executed in the same way. If there are no more connectors, the Engine continues to execute the state's behavior by triggering a new work.
1. When the Engine executes a state's behavior, it updates the display name, and then sets the activity to the state "Ready". As this is a stable state, the Engine commits the transaction and stops.
1. The state "Ready" will then be executed through an API call.


## Short transactions and asynchronism

Transactions in the Engine are as small as possible, and each transaction is committed as soon as possible.  
Each unit of work uses a non-blocking queued executor mechanism and is thus asynchronous. There is a dedicated queue for asynchronous executions. (Connector execution is handled in a separate execution queue.)

As a consequence of the design, when an asynchronous work unit originates from an API call (which might be a result of a human action), then the call returns and ends the transaction.
The work unit is then executed as soon as possible, asynchronously, in a separate transaction.  
For this reason, a task that is being initialized might not yet be ready for execution, but will be executable after a short while, depending on the work executor availability.  
A client application therefore needs to poll regularly to check when the asynchronous work unit is finished, or write an [event handler](event-handlers.md) in order to be notified.

## Summary of state types

* **Initializing**: indicates that an activity is being initialized.
* **Ready**: indicates that a human or manual task has been initialized but is not yet being executed.
* **Waiting**: indicates that a RECEIVE\_TASK, BOUNDARY\_EVENT or INTERMEDIATE\_CATCH\_EVENT activity is waiting for some external trigger.
* **Executing**: indicates that an activity is being executed.
* **Failed**: indicates that a task has failed because of a problem in execution, for example because of an exception that was not anticipated, a connector that fails, or bad expression design.
* **Skipped**: indicates that a task that failed because of connector execution failure is being skipped instead of re-executed. Skipping a task skips the execution of any connectors not already executed and proceeds to task completion.
* **Cancelled**: indicates that an activity is cancelled by a user.
* **Aborting**: indicates that an activity is cancelled by the system. For example, an interrupting event sub-process can trigger ABORTS for all other active paths.
* **Completed**: indicates an activity that is complete.
* **Error**: not currently used.
