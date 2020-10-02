# How a flownode is completed

A flownode completion can come:
* from a specific work triggered by the Engine internally when the flownode arrive in the terminal state.

## Completion of a Flownode

### Flow Node is contained in a parent flownode

This can happen in case :
* Loop
* Multi instance
* Sub Tasks
(Boundary events are at the "same level" as normal flownodes, their parent being the process and not the flownode they are attached to.)

When a child finishes, the childFinished() method is called. It :  
* Archives & deletes the child flownode
* decrements the token count of the parent
* calls notifyChildFlowNodeHasFinished on parent activity state that returns whether the parent should continue (ie. that all its children have finished. Exception to this are manual tasks).
* calls stepforward() on the parent if the parent should continue. This is done in the same transaction (ie. we don't create a separate work for that).


### Flow Node is directly contained in a process instance

This is the nominal case. The childFinished() method (of the processExecutor) is called:
* The method executeValidOutgoingTransitionsAndUpdateTokens() is called on the process defintion.
* If it returns false, nothing more is done and the method returns. Potentially, works have been registered to execute the next flownodes.
* If it returns true, the flownode that finished was the last flownode of the process, and we terminate the process.
