# Events execution

Learn how the engine handles BPMN event.

In the engine, an event is a **flow node**. All are stored in the database in the **flownode_instance** table. Each event is associated with a trigger. A trigger is defined with a type.
Two events category:
* Catch events
* Throw events 

## General execution mechanism 
When an event is executed, we call the **EventHandlerStrategy** associated with the trigger. 

### Event subprocess
Can be started only with a **start event** having a trigger. We handle the trigger event associated with the **event subprocess** when the parent process is started.

## Error Trigger 
### Catch events
There are two cases where we have catch error: 
* boundary events
* event subprocesses ( having start error event).
We handle these cases by creating a **SWaitingErrorEvent**  in the database. 

### Throw events
Throw events can be thrown by either an end event (BPMN norm) or a connector (Bonita specific). It will abort the current process.
There is no throw event created in database. Instead, we look for the associated waiting event and trigger it.

When an error event is thrown, a flag will be set on the process instance specifying what flownode threw the error. It will interrupt all the children flownodes, except the flownode that triggerered the error event.

Once all children have been aborted, we search in the process definition which catch flownode will catch the error event. We search in the following order: boundary events, then event sub-processes. Then, if not found, we go up to the parent call activity, recursively. We then call the triggerCatchEvent() with the SWaitingErrorEvent we just found.

In case of an error event on a connector, we call the same method handlePostThrowEvent(), but we fill in the not normally available fields with fake values.


## Message Trigger
### Catch events
### Throw events
## Signal Trigger
### Catch events
### Throw events
## Timer Trigger
### Catch events
### Throw events


## Events Type

# Remarks

* Error events, signals, messages etc. all go through the same code. It's suboptimal as they don't have much in common in their execution.
* SWaitingErrorEvent (in db) seems redundant as to trigger it we already search in the process definition which elements catch the error.
* Creating fake values to call handlePostThrowEvent() in case of an error event on a connector does not look clean code... 