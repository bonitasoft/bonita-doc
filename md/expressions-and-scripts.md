# Process Expressions and scripts

Learn how to define Expressions and script in Bonita Studio that will be executed in your processes.

Expressions and scripts are used in Bonita Studio for many purposes, including setting the initial or default value of a variable.
An expression is a simple statement; a script is a sequence of expressions, and has a program-like structure. 

This page explains the features of Bonita Studio that enable you to use expressions and scripts.

Note that the expression editor cannot be used in the UI Designer, which has a different concept model for [data](variables.md).

## Expression types

The expression editor is used throughout Bonita Studio to create and modify expressions or scripts.  
To start the expression editor, click the crayon icon next to the field where you want to enter an expression. 

There are different types of expression:

* _Comparison_: compares the value of a variable, parameter, or constant using the operators !, ==, !=, <, >:, <:= or >=.
* _Constant_: sets the expression to a constant (fixed) value.
* _Java_: Select Java methods to set the value of your expression
* _Contract Input_: Select a element of your contract.
* _Query_: Use a query from your BDM.
* _Parameter_: sets the expression to the value of the parameter at the time the expression is evaluated.
* _Script_: the result of the script sets the value of the expression.
* _Variable_: sets the expression to the value of the variable at the time the expression is evaluated.

The types available differ depending on the context of the expression. For example, comparison expressions are available only for transitions.


### Comparison
Comparison are only available for transitions and can only use parameters, constants and variable. A comparison either return true or false.

::: info
You can press on Ctrl + Space to access the auto-complete feature.
:::

![comparisonExpression](images/expressionEditor/comparisonExpression.png)

### Constant
![constantExpression](images/expressionEditor/constantExpression.png)

### Java
![javaExpression](images/expressionEditor/javaExpression.png)

### Contract Input
![contractExpression](images/expressionEditor/contractExpression.png)

### Query
![queryExpression](images/expressionEditor/queryExpression.png)

### Variable
![variableExpression](images/expressionEditor/variableExpression.png)

### Parameters
![parametersExpression](images/expressionEditor/parametersExpression.png)

### Scripts

Scripts provide the most flexible to define business rules. Bonita uses Groovy scripts.

::: info
You can press on Ctrl + Space to access the auto-complete feature. It can be pressed several time to access all auto-complete proposals and templates
:::

#### Basic Operations

Example 1:
Do transition only if the change cost of my BDM object "Change request" is lower than 300.

```
if (itemChangeRequest.changeCost > 300) {
	return false	
}
else {
	return true
}
	
```

#### Groovy classes

If a same piece of Groovy code is needed in different locations you might want to define it once and reused it in order to avoid duplication.

In order to reuse some Groovy code you need to:
* Create a Groovy class that will be stored as part of your project in Bonita Studio
* Declare in the Groovy class one or several methods to store your code
* Configure your process(es) dependencies to include the required Groovy script file(s)
* In the expression editor, select the **Script** type and as part of your code call the method(s) declared previously

##### Create Groovy class

To create a groovy class:
* Right click on **My Project** from the **Project explorer** tree view, then **New** > **Groovy class...**.
* Enter a name for the new Groovy class (e.g. `MyClass`) and optionally for the package name (e.g. `com.mypackage`).
* Click on **Finish** button. This will open the Groovy script editor. 

Note that the newly created Groovy script file is stored as part of your project.

##### Declares methods

In the previously created Groovy class you can declares methods (static or not). For example:
```groovy
package com.mypackage

class MyClass {
	
	static def myMethod(String input) {
		return "Hello ${input}"
	}

}
```

##### Configure process dependencies

If you plan to use a Groovy method, for example to process the output of a connector, you first need to add the Groovy script file as a dependency of your process:
* Select your process pool
* In **Server** menu select **Configure**
* Select **Java dependencies**
* In the tree view, under **Groovy scripts**, select the file(s) that define the method(s) you want to use (e.g. `com/mypackage/MyClass.groovy`)
* Click on **Finish** button

##### Use a Groovy method

In order to call a Groovy method from a script defined using the expression editor you need to:
* Add the import statement at the beginning of the script. E.g.: `import com.mypackage.MyClass`
* Call the method (optionally instantiate the class if method is not static): `MyClass.myMethod("test")`

Update of process dependencies and package import can be automatically done when using code completion (this is trigger by default with the shortcut ctrl+space).

Note that the Groovy script will be embedded in the process deployment file (*.bar). If you update the Groovy script content you will need to redeploy the process in order to benefit from the modification.

#### Predefined Groovy methods

In addition to any user-defined methods, there are a number of standard methods, in the **Bonita**, **Collection**, **Number**, **String**, and **Others** categories (in the expression editor - type: Script). Click a function name to see a description in the **Documentation** box of the Expression editor.

To add a standard function to an expression:

1. In the Expression editor, **Expression type** list, select **Script**.
2. Enter your script, and position the cursor where you want to include the function.
3. In the **Categories** list, select one of the category available. The function list will show the methods that are available.
4. In the **Function** list, double-click the function you want to include in your expression. The function is inserted in the script at the point where the cursor was positioned.

At concatenation points in the script, the expression editor displays a popup with a list of possible terms. In the popup, you can toggle between Groovy terms and process variables. For example, if you select `activityInstanceId` from the list of provided variables then type a period, the expression editor displays a list of terms available. This is known as _autocompletion_.

#### Use variables in a script expression

You can use a variable in an expression. When the expression is evaluated during process execution, the current value of the variable is used in the expression.

##### Process variables

When you define an expression in the context of a step, the expression can contain a variable that is defined at process level in the pool containing the step. The expression cannot contain a variable that was defined for this step or in another step in the process. To add a process variable to an expression, select the variable from the **Select a process variable...** drop-down list. 

##### Provided variables

You can also use a variable that is provided by Bonita Engine that is executing the process. For example, an expression can include the id of the user performing a task in the process. To add a provided variable to an expression, select the variable from the **Select a provided variable...** drop-down list.

The provided variables are:

* `activityInstanceId`: the identifier of the activity instance (not available for a process-level expression)
* `processDefinitionId`: the identifier of the process
* `processInstanceId`: the identifier of the process instance
* `rootProcessInstanceId`: for a called process or an event subprocess, the identifier of the root process (note that if there are multiple layers of called processes or subprocesses, this is the root of the hierarchy, not the parent called process or subprocesses)

The provided variables list also contains a special variable, apiAccessor. This enables you to construct API calls in a script using autocompletion. For example, to get the number of overdue open tasks, choose `apiAccessor` from the list of provided variable, then add the `processAPI`, and then add `getNumberOfOverdueOpenTasks`.

#### Log messages in a Groovy script

You can [add logging](logging.md) to Groovy scripts or Java code that you develop.

#### Scripts in right operands of operations at task level

Scripts can be used to define the result of the right operand of an [operation](operations.md). Those scripts are created in the same editor as the others, and can also call external methods and resources, but are designed as read-only scripts in the product. 
::: warning
It means that trying to directly write data to the database in those scripts (using java API methods), while it _might_ work, is considered as a bad practice, and the behaviour of those scripts is not guaranteed across versions of the product.
Data in this case, refers to documents, business objects, pages, process commentaries.
:::

For documents, you should use the [document type](documents.md) provided in the Studio and the associated [operations](operations.md) related to this document type. 
For business objects, you should use the [BDM type](define-and-deploy-the-bdm.md) provided in the Studio and the associated [operations](operations.md) related to this BDM type. 
For other use case you may want to use a [connector](connectors-overview.md) to perform those write operations. 

