# Call activity execution

Lean how the engine executes and aborts call activities.

## Completion
The execution flow to complete a call activity consist of two successive steps:
* Target process instance completion. Sequence flow:
    * the target process instance is completed
    * it registers a work to execute the parent call activity
    * the target process stays in Completed state
* Call activity execution:
    * Input data are mapped from the target process outputs (data mapping)
    * Target process is archived and deleted
    * Call activity completes

## Abortion (~ same as Cancellation)
The execution flow to abort a call activity is as follows. The cancellation of a call activity is identical, except for the state and method names (`CANCELLING` instead of `ABORTING`,`CancelledState[...]State` instead of `AbortedState[...]State`, etc.:
* Call activity is interrupted
    * State category is put to `ABORTING`
    * A work is registered to execute the call activity

If a work was already queued to execute the call activity, this work should fail (causing a PreconditionException) because the call activity changed in the meantime (stateCategory field of FlownodeInstance changed from `NORMAL`->`ABORTING`)

* Call activity abortion:
    * The method `should execute state` is called
    * If the target process is still present, it interrupts the target process and put the call activity in state `Aborting[...]State`
    * If there is no target process, the activity is put in `AbortedState[...]State` and a work is register to execute this state.
* Call activity waits for its target process to complete
    * Same as [Completion](#completion) without the data mapping