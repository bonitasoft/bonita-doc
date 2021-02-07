# Administrator Task list in Bonita Portal

This page explains what a user with the _Administrator_ or _Process Manager_ profile in Bonita Portal can see and do about tasks and more generally, flow nodes.  
A flow node is an element of a process. It defines an action to be performed (automatic or human). A taks is a flow node done by a person. 

Those users can view the list of flow nodes in error, pending tasks, done tasks, assign and unassign a task, do task for someone else, skip a failed flow node, replay a failed flow node, and write a comment about the case.

Here is a view of the task list:
![Administrator Task list Portal](images/UI2021.1/admin-task-list-portal.png)<!--{.img-responsive}-->

## View tasks
Tasks are showns in three menu options on the left: _Pending_, _Failed_, and _Done_.
For each task, the priority and due date are shown in the list.

## Assign a task
A task can be assigned and reassigned if necessary to another user.
1. Go to _BPM_>_Tasks_
2. Click on the _Tick_ close to the task name
3. Click on _Assign_
4. In the popup, start typing the name of the user to assign the task to.
5. Select the right suggestion
6. Click on _Assign_

## Unassign a task
1. Go to _BPM_>_Tasks_
2. Click on the _Tick_ close to the task name
3. Click on _Unassign_

## Do a task for another user
With the Efficiency, Performance and Enterprise editions, an Administrator can do a task for another user.  
This is useful for unblocking a case if the assigned user cannot perform a task.

1. Go to _BPM_>_Tasks_ and view the list of pending human tasks.
2. Select the relevant task in the list and click on _Do for_.
3. In the popup, start typing the name of the user to the task for.
4. Select the user for whom you want to do the task.
5. Click on _Do it_.

The task is done and traced in the BPM database as though you have done the task on behalf of the selected user.

## Skip a failed task
If a failed task does not impact subsequent tasks in a process, it can be skipped. This means that the task does not have to be done successfully for the following steps to become available.

1. Go to _BPM_>_Tasks_.
2. Go to the _Failed_ menu option on the left.
3. Click on a task.
4. Click on the _More_ button.
5. In "Technical details", the reason for the failure is displayed
6. Click on the _Skip_ button.

The task is moved from "Failed" to "Done".

## Replay a failed task

This feature is available with the Enterprise or the Performance edition.
You will need to fix any parameter causing the failure **BEFORE** clicking on Replay.
1. Go to _BPM_>_Tasks_.
2. Go to the _Failed_ menu option on the left.
3. Click on a task
4. In _Technical details_, the details of the failure are displayed
5. Click on _More_.
6. Click on _Replay_.
7. In the popup window _Replay task_, tick the task which failed.
8. Click on _Replay_.

## View the failure stack-trace message on a failed task

Normally, a user will start a case of a process. The case might not start as expected. This is a called a failure.

In this case it is possible to check the failure on a connector:

1. Go to _BPM_>_Tasks_
2. Go to the _Failed_ menu option on the left. In _Technical details_, this shows the Connector has failed.
3. Click on the _More_ button

![failed](images/images-6_0/connector_failed.png)

4. There can be a list of connectors in different states. Here we can see the connector that has failed.

![failed](images/images-6_0/connector_failed_details.png)

5. Click on the _Failed_ link. A pop-up window _Failure details_ displays the error message and the details of the message.

![failed](images/images-6_0/connector_failed_stack.png)

There are 2 options:
* Either click on the _Skip_ button, to skip over the task where the connector failed. This will make the "Failed" message disappear on the Connector, and display "Resolved" instead.
* Fix the problem then click on _Replay_.
