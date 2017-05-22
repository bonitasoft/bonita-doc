# Expressions and scripts

Expressions and scripts are used in Bonita Studio for many purposes, including setting the initial or default value of a variable.  
An expression is a simple statement; a script is a sequence of expressions, and has a program-like structure. 

This page explains the features of Bonita Studio that enable you to use expressions and scripts.

Note that the expression editor cannot be used in the UI Designer, which has a different concept model for [data](variables.md).

## Start the expression editor

The expression editor is used throughout Bonita Studio to create and modify expressions or scripts.  
To start the expression editor, click the crayon icon next to the field where you want to enter an expression. 

There are different types of expression:

* _Comparison_: compares the value of a variable, parameter, or constant using the operators !, ==, !=, <, >:, <:= or >=.
* _Constant_: sets the expression to a constant (fixed) value.
* _Parameter_: sets the expression to the value of the parameter at the time the expression is evaluated.
* _Script_: the result of the script sets the value of the expression.
* _Variable_: sets the expression to the value of the variable at the time the expression is evaluated.

The types available differ depending on the context of the expression. For example, comparison expressions are available only for transitions.

## Manage Groovy scripts

You can create a Groovy function and store it in Bonita Studio separate from the definition of a process. You can then use the function in any process definitions. This feature is available if you are using Bonita Studio with the Application Developer profile.

To create a function, choose **Manage Groovy scripts...** from the **Development** menu, and click _**Create...**_. Enter a name for the new function. 

To edit the content of a function (or to create it), select the function name and click **_Open_**. This opens the expression editor.  
Enter the function details in the pop-up window. For a function to be included in the Expression editor list of user-defined functions, it must be declared as static and it must have suitable visibility. To validate the function, click _**Evaluate**_. To save the function, click _**OK**_. 

Note that you can use this feature to save any Groovy script, not just a function. However, only a predefined script that defines a function can be used in an expression. You can declare a method in a Groovy script, but must not declare a class.

In addition to any user-defined functions, there are a number of standard functions, in the **Bonita**, **Collection**, **Number**, **String**, and **Others** categories. Click a function name to see a description in the **Documentation** box of the Expression editor.

To add a user-defined or standard function to an expression:

1. In the Expression editor, **Expression type** list, select **Script**.
2. Enter your script, and position the cursor where you want to include the function.
3. In the **Categories** list, select **User defined**. The function list will show the user-defined functions that are available.
4. In the **Function** list, double-click the function you want to include in your expression. The function is inserted in the script at the point where the cursor was positioned.

At concatenation points in the script, the expression editor displays a popup with a list of possible terms. In the popup, you can toggle between Groovy terms and process variables. For example, if you select `activityInstanceId` from the list of provided variables then type a period, the expression editor displays a list of terms available. This is known as _autocompletion_.

## Use variables in a script expression

You can use a variable in an expression. When the expression is evaluated during process execution, the current value of the variable is used in the expression.

### Process variables

When you define an expression in the context of a step, the expression can contain a variable that is defined at process level in the pool containing the step. The expression cannot contain a variable that was defined for this step or in another step in the process. To add a process variable to an expression, select the variable from the **Select a process variable...** drop-down list. 

### Provided variables

You can also use a variable that is provided by Bonita Engine that is executing the process. For example, an expression can include the id of the user performing a task in the process. To add a provided variable to an expression, select the variable from the **Select a provided variable...** drop-down list.

The provided variables are:

* `activityInstanceId`: the identifier of the activity instance (not available for a process-level expression)
* `loggedUserId`: the identifier of the user who is performing an activity at the time when the expression is evaluated
* `processDefinitionId`: the identifier of the process
* `processInstanceId`: the identifier of the process instance
* `rootProcessInstanceId`: for a called process or an event subprocess, the identifier of the root process (note that if there are multiple layers of called processes or subprocesses, this is the root of the hierarchy, not the parent called process or subprocesses)

The provided variables list also contains a special variable, apiAccessor. This enables you to construct API calls in a script using autocompletion. For example, to get the number of overdue open tasks, choose `apiAccessor` from the list of provided variable, then add the `processAPI`, and then add `getNumberOfOverdueOpenTasks`.

## Log messages in a Groovy script

You can [add logging](logging.md) to Groovy scripts or Java code that you develop.
