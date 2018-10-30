# Naming conventions

Every element in a process definition has a name. The only rules about naming are that you cannot use [Java language keywords](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html) and that you cannot use the same name for more than one element within the same diagram.  
For example, you cannot have two variables called `beanCounter` in a diagram, even if they are in different pools.  
You could, however, have a variable called `beanCounter` and an actor called `beanCounter`.

Note: Variables are not shared between Studio and UI Designer. Furthermore, in the UI Designer, variables are not shared between pages. 
For information about to use variables in the UI Designer, go to [Variables](variables.md).

Even in a relatively simple process, the number of names quickly becomes large. Adopting a naming strategy improves the readability and maintainability of your processes, and makes it easier to reuse elements. We propose the following best practises.

* Make names meaningful. The goal is to make it obvious what something does without needing to open it. It is better to have a long, meaningful name than a short name. In most cases, a name only has to be typed once and then is selected from a list, so there is no advantage to using short names. For example, it is better name a Boolean variable `hasRequestedReceipt` rather than just `receipt`.
* Names can indicate either what something is or what it does. For a variable, it is more useful to indicate what it is, that is, what it stores. For any other element, indicate what it does.
* Be consistent within a process and also between processes, to facilitate reuse or copying. Reuse is more likely if it is easy to find the element you want to reuse or copy.
* Name a pool with the high-level business process name. If you have several pools in a business process, use names that convey how the pools are related. For example, if you have a business process for reviewing and approving leave requests that has a main process, a called process for reviewing requests, and a called process for escalations, you could call the pools `Leave Request`, `Leave Request Review`, and `Leave Request Escalation`.
* Name a lane to indicate who is acting in the process. In general, you should use the actor name and group activities by the same actor into the same lane. The additional benefit of this is that it makes actors visible in the process diagram.
* Name a task according to what is being done. This is important for all types of task, not just human tasks.
* Name a form according to what is being done prefixed with the process name. It will be easier to understand where and why forms are used inside the UI designer home page.
* For usability as well as maintainability, use the same structure in all task names. In a leave request process, for example, do not call the tasks `Manager reviews request` and `HR review`.
* Name a gateway for the decision that is being made.
* Name all the transitions out of a gateway.
* The name of an end events should indicate what is being ended, possibly with the reason. In a process with several flows, you need to know which flow has ended. For example: `leaveApproval_ManagerReview`, or `leaveApproval_RejectionFlow`.
* For variables, differentiate between process data and task data. You could prefix all process data names with `p_` and all task data with `t_`, or you could append the name with `_in_p_ProcessName` or `in_t_TaskName`.
* For variables and parameters, indicate the datatype in the name. This can be done implicitly, with terms like _is_ or _has_ (for Booleans), _date_, _price_, _number_, etc. For example:  
`p_hasRequestedReceipt` instead of `p_RecieptRequested`, `p_dateOfFirstLeaveDay` instead of `p_FirstLeaveDay`,`p_numberOfDaysRequested` instead of `p_DaysRequested`, or `p_pricePerDayOfTraining` instead of `p_TrainingFee`. You could also indicate the data type explicitly. For example, `p_int_numberOfDaysRequested` or `p_date_StartOfLeave`.
* Name a connector instance with a descriptive name to indicate what it is doing, not just the connector type. This is particularly important if a process uses the same connector at several points to handle different data. For example, in a process to update an employee's contact details, you could use the PostgreSQL connector to get the existing data and to write the updated values, so you could name the connector instances `posrgresqlGetEmployeeContactInfo` and `postgresqlUpdateEmployeeContactInfo`.
* Name an expression (such as a Groovy script) with a descriptive name that indicates the purpose. Use a name that is unique within the business process.
* If you have a library of reusable elements (for example Groovy scripts, or data type definitions), give each element a name that is obvious and descriptive, for maximum reuse. For example, `createOperationsListFromVariablesMap`, not `createOperations`. If you import a reusable element but modify it in a process, save it with a new name that is unique in the project and identifies the process where it is used. This avoids the risk of the amended element overwriting the standard one, which would cause problems for processes using the standard one.

**Note:** There are forbidden keywords which cannot be used in an application name, task name, or process name. 
The forbidden keywords, which are not case sensitive, are: 
* content
* theme
* api

In addition to using a predictable naming scheme, you can improve the maintainability of a process by specifying a description for every element. It is also possible to use text annotations on the diagram itself. However, a large number of text annotations can make a diagram difficult to read. You are recommended to use a text annotation primarily for a temporary note, as a reminder to complete or correct something, or for communication between business analyst and application designer.
