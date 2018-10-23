# Manage Tasks

Logged on with the Administrator or Process Manager profile, you have rights to manage a task as follows.

## Assign a task

A task can be assigned and reassigned if necessary to another user.

1. Go to **BPM** \> **Tasks**
2. Click on a **task in the list of tasks**
3. Click _**Assign**_

## Unassign a task

1. Go to **BPM** \> **Tasks**
2. Click on a **task in the list of tasks**
3. Click _**Unassign**_

## Do a task for another user

With the Efficiency, Performance and Enterprise editions, an Administrator can do a task for another user. This is useful for unblocking a case if the assigned user cannot perform a task.

1. Go to **BPM** \> **Tasks** and view the list of pending Human tasks.
2. Select the relevant task in the list and click **Do for**.
3. In the popup, a list of users elligible to do the task is displayed.
4. Select the user for whom you want to do the task, and click **_Do it_**.

The task is done as though the selected user has done it.

## Skip a failed task

If a failed task does not impact subsequent task in a process, the Administrator can skip it. This means that the task does not have to be done successfully for the following steps to become available.

1. Go to **BPM** \> **Tasks**.
2. Go to **Failed**.
3. Click on a Task.
4. Click _**More**_.
5. In **Technical details**, the reason for the failure is displayed
6. Click _**Skip**_.

The task is moved from Failed to Done.

## Replay a failed task

This feature is available with the Enterprise or the Performance edition.

1. Go to **BPM** \> **Tasks**.
2. Go to **Failed**.
3. Click on a _**Task**_
4. In **technical details**, the details of the failure are displayed
5. Correct the reason for the error e.g. Connector parameters.
6. Click _**More**_.
7. Click _**Replay**_.
8. In the popup window **Replay task **, tick the task which failed.
9. Click _**Replay**_.

Note: You will need to fix any parameter causing the failure, **BEFORE** clicking on Replay.

See [Modify a parameter](processes.md)

## View the failure stack-trace message on a failed task

Normally, a user will start a case of a process. The case might not start as expected. This is a called a faliure.

In this case the Admin can check the failure on a connector:

1. Logged in as Admin, go to **BPM** \> **Tasks** \> **Failed**
2. On the Failed page, in the section Technical details, this shows the Connector has failed.
3. Click on **More**

![failed](images/images-6_0/connector_failed.png)

4. There can be a list of connectors in different states. Here we can see the connector that has failed.

![failed](images/images-6_0/connector_failed_details.png)

5. Click on the **Failed** link.
6. A pop-up window **Failure details** displays the error message and the details of the message.

![failed](images/images-6_0/connector_failed_stack.png)

There are 2 options:

* Either click the **Skip** button, to skip over the task where the connector failed. This will make the Failed message disappear on the Connector, and display Resolved instead.
* Fix the problem then click **Replay**.
