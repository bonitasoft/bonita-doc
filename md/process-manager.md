# Bonita portal Process manager profile

Users can be assigned as manager for processes. Then, users mapped to the Process manager profile will be able to manage those processes.

::: info
**Note:** For Enterprise, Performance and Efficiency editions only.
:::

## Process manager description

The Process manager shares some management responsibilities with the administrator, for specified processes. 

For the processes they manage, a process manager can:

- Perform actions on tasks:
  - Assign or unassign a task
  - Replay a failed task
  - View tasks
  - Do a task for another user
- Perform actions on cases:
  - Delete a case
  - View cases
  - Edit case variables
  - Add a comment
  - Start a case for another user 
- Performs actions on processes:
  - Enable or disable a process
  - Edit process configuration (update a connector, actor mapping, Process manager mapping, or parameter value)

## Assign a Process manager to a process

There are two stages to assigning a Process manager to a process: assign the Process manager profile to an entity, then map the process to the entity. 
You can assign the PM profile and map a process to a user, groups, role, or membership entity.

#### Assign the Process manager profile to a user

To assign the Process manager profile to a user:

1. Log in to Bonita Portal as Administrator.
2. Go to **Configuration**.
3. Choose **Profiles**.
4. Choose the Process manager profile. This will display the users, groups, roles, and memberships who already have this profile.
5. Click **_More_**.
6. Click **_Add a user_**.
7. Select a user by checking the box next to the user name.
8. Click **_Add_**. The Process manager profile is now assigned to the user.

You can also assign a profile to a group, role, or membership.

#### Assign a process to a Process manager

To assign a process to a user who has the Process manager profile:

1. Log in to Bonita Portal as Administrator or as a Process manager of the process.
2. Go to **BPM** > **Processes** if you use the Administrator profile or **Processes** if you use the Process manager profile.
3. Select the process and click **_More..._**. The number of Process managers currently assigned to the process is shown in the Process manager mapping table.
4. To add a user, click the _**Plus sign or Pencil button**_ in the **_User_** column. A popup shows a list of the users who are currently process managers for this process.
5. Click **_Select users _**. A list of users with the Process manager profile is displayed.
6. Select the user you want to be a Process manager for the process, and click **_Apply_**. The selected user is added as a Process manager for the process.

You can also assign a process to a group, role, or membership that has the Process manager profile.

## Monitor the processes I manage

A Process manager can monitor the activity of the processes they can manage in **Monitoring**.

## List the processes I manage

A Process manager can see a list of the processes they can manage in **Processes**.

## See a list of cases for a process

A Process manager can see a list of cases for the processes they can manage in **Cases**.

## See a list of tasks for cases of a process

A Process manager can see the tasks for cases of a process they can manage in **Tasks**.

## Assign a task

A task can be assigned and reassigned if necessary to another user.

1. Go to **Tasks**
2. Click on a **task in the list of tasks**
3. Click _**Assign**_

## Unassign a task

1. Go to **Tasks**
2. Click on a **task in the list of tasks**
3. Click _**Unassign**_

## How to skip a failed task

If a failed task does not impact subsequent task in a process, the Process manager can skip it. This means that the task does not have to be done successfully for the following tasks to become available.

1. Go to **Tasks**.
2. Go to **Failed**.
3. Click on a Task.
4. Click _**More**_.
5. In **Technical details**, the reason for the failure is displayed
6. Click _**Skip**_.

The task is moved from Failed to Done.

## Start a case for another user

A Process manager can start a case for another user. The user must have the right to start a case of the process.

To start a case for another user:

1. Log in as a Process manager for the process.
2. Go to **Processes**.
3. Select the process and click **_Start for_**.
4. In the popup, specify the user for whom you are starting the case. Only valid users for the case are displayed.
5. Click **_Start_**.

The case is started as though the specified user had started it. 
For example, if a Process manager starts a case for user A and a subsequent task is to be done by the manager of the user, it is assigned to user A's manager, not to the manager of the Process manager.

## Do a task for another user

A Process manager can do a task for another user. The user must have the right to do the task. This is useful for unblocking a case if the assigned user cannot do a task.

To performs a task for another user:

1. Log in as a Process manager for the process.
2. Go to **Tasks** and view the list of pending Human tasks.
3. Select the relevant task in the list and click **Do for**.
4. In the popup, specify the user for whom you are doing the task. Only valid users for the case are displayed. If the task is already assigned, the assigned user is specified automatically.
5. Click **_Do it_**.

The task is done as though the specified user has done it.
