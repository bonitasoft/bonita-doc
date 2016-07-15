# Users task list

## Overview

Starting with Bonita BPM 7.3, users benefit from a configurable task list, to manage tasks involving human actors from all processes in a more efficient fashion.
This page is also made available as a custom page in Bonita BPM Portal > Resources, to be used in any [application](applications.md) or [custom profiles](custom-profiles.md), for users types of profiles.

Here are the values of the user task list:

- Default Master/Detail design pattern, to view list and form in the same screen
- _Panel expand_ feature, to display wide forms in a large modal window

![](images/tasklist-elements.png)
![](images/tasklist-popup.png)

- List settings: number of tasks in a page, choice of columns, columns ordering
- Easy access to case information, one tab away from the form. This case information is the case overview page, that the development team can customize
- Easy access to case comments, also one tab away from the form or case information

![](images/tasklist-settings-and-tabs.png)

- Alternate "full width" list, with task information displayed in a large modal window

![](images/tasklist-fullpage.png)

This list also leverages two legacy features (prior to Bonita BPM 7.3.0):
- Dynamic task display name, for efficient task identification (insert case information in task name)
- Word-based search, for efficient task name search (search for any word in the task name)

To know more about how to use both features, go to [Optimize the user task list](optimize-user-tasklist.md).

The task list also contains a **Done tasks** filter, for the user to check if the task has been completed properly.

::: info
**Note:** Subtask creation has not been implemented in the task list. However, subtasks created in open cases that were started in a previous Bonita BPM version are still available to their assignees when cases are migrated to Bonita BPM 7.3.
If your team needs the subtasks feature back in the task list, give us [product feedback](http://www.bonitasoft.com/contact-us).
:::
