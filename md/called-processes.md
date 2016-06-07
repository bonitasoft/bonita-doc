# Called processes

## Overview

A called process is a complete process that is called from another process.  
There is a parent-child relationship between the calling process and the called process, that is, the flow in the child process is essentially contained within the parent process.

A called process is an independent process that is called from a call activity in a parent process.  
Process flow goes from a call activity in the parent process to the start element in the called process. While the called process is executing, the parent process is paused.  
When the flow reaches an end element of the called process, processing returns to the call activity.

A called process is defined in exactly the same way as any other process. It can call called processes and can contain event subprocesses. A parent process can call more than one called process.

A called process can be called by more than one parent.

A called process can be in a pool in the same diagram as a parent process or can be in a separate diagram. If a process is called from several parent processes, it is usually easier for maintenance and for deployment to define it in a separate diagram.  
If the diagram containing the called process is in the same workspace, the called process is deployed automatically when you build and deploy the parent process.  
If the parent process and called process are not in the same workspace, they need to be deployed separately.

Data in a called process is defined in the same way as for any process. In addition, you can map data from the parent process, making it available in the called process. Specify data mapping when you define a call activity that calls a called process.

You can define a called process in the same way as you define a process. You can also extract a called process from a process diagram.

## Define a called process

There are two parts to defining a called process: defining the called process, and defining the call activity. It is easier to define the call activity if the called process already exists, but not essential.

Define the called process as you would define any other process. When you create the variables in the called process, make a note of those that are related to variables in the parent process.

In the parent process, define a call activity task. Define the normal task characteristics. Note that although a call activity cannot
have forms associated with it, it can have connectors and task-level data.

In the **Details** panel, **General** tab, **General** pane, specify the name of the called process. If you know the process name, you can enter it directly, otherwise use the expression editor.

In the **Details** panel, **General** tab, **Mapping** pane, specify the mapping of data or contract inputs between the parent process and called process. You can only map variables or inputs of the same type.  
It is recommended to set a contract up on the called process. This way, you can map the parent process variable to a contract inputs of the called process.

You can use **Auto map** to automatically map data from the called process to the parent process for a pair variables that have the same name in the parent and called process variables.  
You can also specify the mapping of variables of called process variable to parent process variable explicitly.

## Extract a called process

You can also extract a called process from a process. To do this, open the process diagram, click on the marquee tool in the **BPMN elements** menu, then select the part of the process that you want to extract. There selected part of the process must have a single entry point and a single exit. Then right click on the selected part, and choose Extract called process from the menu. The selected part of process is extracted and put into a new pool, inserted in the diagram below the current pool. The extracted items are replaced in the original diagram by a call activity. The data in the parent process and called process is mapped automatically.
