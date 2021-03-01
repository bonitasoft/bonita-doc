# Event subprocesses

An Event Subprocess can be called by a parent process to handle exceptions or a case.

## Definition

A event subprocess is embedded within the parent process, used to handle exceptions. It can be started with a timer event, a signal, or an error event from the parent process, or with a signal or message event from another pool. When the event subprocess starts, the parent process is aborted. If the parent process is a called process, flow returns to its parent process, which continues to execute in parallel with the event subprocess. An event subprocess has access to all the process variables of the parent process in which it is embedded. No data mapping is required.

### Define an event subprocess

To define an event subprocess:

1. Select the event subprocess icon in the **BPMN elements** menu and drag it into the process pool (in the same lane as part of the process or in a separate lane).
2. Configure the name of the event subprocess. 
3. Select the + symbol in the event subprocess element to expand the process drawing space. You can expand it further if necessary, by dragging the lower right corner of the event subprocess outline.
4. Add a start event. This must be a start message, start timer, or start error.
5. Configure the start event with the condition that triggers the event subprocess. 
   For example, to handle an error case, configure a start error event that is triggered by a error thrown by an end error event on a task.
6. Add the steps needed in the subprocess.
7. Add an end event.

When the event subprocess diagram is complete, you can hide it by clicking the - symbol. This collapses the event subprocess to a single element in the process diagram. The element shows the name of the event subprocess and the type of its start event.
