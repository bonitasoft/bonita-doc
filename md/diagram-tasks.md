# Tasks

A task is an activity in a process. There are several different kinds of task:

* A human task is carried out by a person using a form to enter data or to receive information.
* A service task is carried out automatically by the Bonita Engine and is invisible to users during normal operation.
* A call activity calls a subprocess. The sequence flow of the process passes from the call activity
to the subprocess. When the subprocess is complete, the flow returns to the call activity.
* A script task executes a script in the Bonita Engine.
* An abstract is a generic activity, usually used during diagram creation as a placeholder for a more specific type of task. 
An abstract task is treated as a service task when a process executes.
* A send task sends a message to another process in the same diagram. The message is caught by a catch message event or a receive task.
* A receive task receives a message from another process in the same diagram. The message was sent by a throw message event or a send task.

The items configured for a task depend on the task type, as shown in the following table:

| To configure... | Go to... | Applies to task types... |
|:-|:-|:-|
| Task name in diagram | Details panel, General tab, General pane | All |
| [Task name in Portal](#displayName) | Details panel, General tab, Portal pane | All |
| Task description in Studio | Details panel, General tab, General pane | All |
| [Task description in Portal](#displayName) | Details panel, General tab, Portal pane | All |
| [Task description after completion in Portal](#displayName) | Details panel, General tab, Portal pane | All |
| Task type | Details panel, General tab, General pane | All |
| Priority | Details panel, General tab, Portal pane | Human, abstract, call activity, service, script |
| Estimated duration | Details panel, General tab, General pane | Human, abstract, call activity, service, script |
| Actor | Details panel, General tab, Actors pane | Human |
| Variables | Details panel, Data tab, Local variable pane | Human, abstract, call activity, service, script |
| Iteration | Details panel, General tab, Iteration pane | All |
| Contract | Details panel, Execution tab, Contract pane | Human |
| Form | Details panel, Execution tab, Form pane | Human |
| Connectors | Details panel, Execution tab, Connectors in/out pane | Human, abstract, call activity, receive, service, script |
| Operations | Details panel, Execution tab, Operations pane | All |
| KPIs (Enterprise, Performance, Efficiency, and Teamwork editions only) | Details panel, Execution tab, KPIs pane | All |
| Appearance in diagram | Details panel, Appearance tab, color & font pane | All |
| Subprocess to execute | Details panel, General tab, General pane | Call activity |
| Message content handling | Details panel, General tab, Message content pane | Receive |
| Messages | Details panel, General tab, Messages pane | Send |
| Correlation keys | Details panel, General tab, Correlation pane | Receive |

To create a new task, select the relevant icon from the **BPMN elements** menu or from the context 
menu of the preceding element in the diagram, and drop it on the whiteboard. You can change the task type
of an task in the diagram.

Setting the task name seen in the Portal <!--{.h2}-->

When you define a task in Bonita Studio, by default the task name and description in Bonita Portal are the same as the task name and description on the diagram. 
You can override this by setting the _Display name_, _Display description_, and _Description after completion_ in the Details panel, General tab, Portal pane.

* _Display name_: used in the message displayed at the end of a task indicating the name of the new task that is available, and used in the task To Do list.
* _Display description_: displayed in the portal Details panel when a task in the To Do list is selected.
* _Description after completion_: displayed in the portal Details panel when a task in the Done list is selected.

We recommend that you set these values with a script that uses some data that is specific to the case. This avoids the problem of having several tasks in your Portal To Do list all with the same name. 
For instance, for a leave request approval task, you could include the name of the employee making the request in the Display name.
