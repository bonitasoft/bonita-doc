# Flownode States

Each flownode has a Type. The flownode type determines which states the flownode can be in, and the sequence of the states it will follow during its lifecycle.
Each flownode object has a state (_FlowNodeState_) at a given time. The state of the Flownode determines how it will be handled by the Bonita Engine.
"Executing" a flownode is a misnomer. A flownode cannot be executed, a flownode _state_ is executed. 

## Flownode Types

Flownode types are different objects in a inheritance hierarchy. Examples:
UserTask, AutomaticTask, Gateway, EndEvent....

## Flownode States
### Stable
A stable State is waiting for either:
* a Human interaction to change (Ready/Failed).
* A BPMN event (Waiting).
   * intermediateCatch
   * receive
   * boundary
* Children to finish (Execution/Cancelling/Aborting/CompletingSubTaskOfManualTask....).
   * Loop
   * MultiInstance
   * CallActivity...
A flownode will stay in a stable state until the event it is waiting for occurs. No work is generated in the meantime.

### Terminal
A terminal state is a stable state. It is the last state reached by a flownode. Executing the flownode in terminal state will archive the flownode, delete it and trigger the next process step.
You can not "come back" from a terminal step. The one exception is the transition Completed -> Failed.

### Unstable
All other states are unstable.
When a flownode reaches an unstable state, a work will be generated to change to another state.
Examples: ExecutingAutomaticActivity, InitializingAndExecutingFlownode, EndingIntermediateCatchEvent...

## Transitioning from state to state

Executing a state of a flownode is running the code of the `execute()` method on the **current** state, and then moving the flownode to the next state (determined by the transitions).  
When executing the state of a flownode, a return code indicates if the execution of the state is finished, meaning we can move on to the next state, or not finished, meaning we stay on the same state, some background task will trigger the move to the next state later (Eg. connector execution).

If the state is finished, the State Machine determines the next state:  
Each flownode type has an ordered list of states.  
We take the next state in the list, and ask the state to determine whether we should execute the state or not.  
If not, the next state is "skipped" and the second next state is checked the same way, until a state determines it should be executed.  
If so, the next state is executed, in another background task (if terminal or not stable).  


## Example
A UserTask is...

## Abort/Cancel procedure

Aborting is the action of changing the flow of transitions from the normal flow to the **aborting** sequence of states. It is triggered by the Bonita Engine itself.  
Cancelling is the same notion, but triggered by a human interaction. The flow is the **cancelling** sequence of states.

Aborting / cancelling a flownode is only setting its flag **stateCategory** to ABORTING / CANCELLING + registering works to execute the flownodes.

### Aborting a flownode

When the execution of a flownode sees that the state category of the flownode is **not the same** as the state category of the state (determined by the State Machine), then the current state is **not** executed (to the contrary of a normal case).

Then the next state is the first state of the aborting flow sequence for that type of flownode.  
Then the state is executed in a background task, as usual, and then follows the aborting flow sequence of states, until it reaches the last state in that sequence.

### Cancelling a flownode

Cancelling a flownode is exactly the same as cancelling a flownode, but the flow sequence of states is the **cancelling** sequence.


## Special States


### Non executing states

To determine the next state, we execute the `shouldExecuteState()` code. If this method returns false, the `execute()` method is not run.
We then execute the `shouldExecuteState()` code of the next state (determined by the state transition manager), etc. until the method returns true.
In 

### States that are waiting for children

## Remarks

* Failed should not be a state?
* Stable is badly defined/used. It looks as it should be 3 different characteristics...
* State executing boolean is badly defined, should be different states.
* Unstable/stable states is a problematic definition as the decision to transition from state to state should not come from a flag on the state.
* It seems weird to have a method determining whether a state should be executed or not. A state machine should not hold that much logic.
* `shouldExecuteState()` should not update anything in database, and only return true / false.
* there is a confusion between the state (situation where nothing moves) itself and the action of transitioning a flownode from one state to another (transition logic that DO execute stuffs).