# Operations

An operation is an action that updates the value of a variable (using an expression) when a task is performed.   
You can specify any number of operations on a task. Operations are executed in the order they are listed.

## Define operations at task level

An operation at task level updates the value of a variable defined for the task or at process level. You can also use an operation at a task to update the value of a search index.

To define an operation at task level:

1. Select the relevant task and go to the **Details** panel, **General** tab, **Operations** pane.
2. Click **_Add_** to add an operation.
3. From the drop-down list, choose the variable to be updated.
4. Launch the Expression Editor, by clicking the crayon icon.
5. Using the Expression Editor, enter the expression to define the new value of the variable. 
If you define the expression with a script, you can use the current value of the variable being updated in the script, so, for example, you can increment a counter. Make sure that the return type matches the type of the variable being updated.

You can define a sequence of operations at a task. The operations are performed in the order in which they are listed, at the end of the task. You cannot re-order operations after they are defined, so you need to define the operations in the order they are to be performed.

## Operation types

### Business object (BO)

* _**takes value of**_ : the value of the right operand variable is used to update the value of the left operand (the BO) using the "=" operator
* _**Java method**_: the left BO is updated with the value from the right operand using an invoked Java method
* _**instantiate with**_: at runtime, when the operator is called, the business data variable points to the selected BO instance if it uses a _Query expression type_.  
   The BO instance must exist in the business data database; otherwise the operator throws an exception.   
   The BO instance is not modified during the operation but from that point onward, any expression or operation in the process can reference this object instance to make changes.    
   If it uses a _Script expression type_, you can use the contract inputs to fill in the BO attributes.   
   Go to [Initialize BDM attributes from contract inputs in task operations](define-and-deploy-the-bdm.md) for more information.  
* _**isDeleted**_: an operator 'Is Deleted' can be called on a business data variable. The BO instance that the business data references is deleted from the database, at runtime, after the task is completed.

**Warning:** Calling other operations (including _**instantiate with**_) after calling _**isDeleted**_ on the same Business Object, in the same task, is not supported. If you want to re instantiate your Business Object, and perform operations on it, you should do it in a separate task.


**Warning:** Operations on business objects can be done only at task level.

### Simple data and List of options

* _**takes value of**_: the value of the right operand variable is used to update the value of the left operand using the "=" operator

### Java Object

* _**takes value of**_: the value of the right operand variable is used to update the value of the left operand using the "=" operator
* _**Java method**_: the left object is updated with the value from the right operand using an invoked Java method

### XML Object

* _**takes value of**_: the value of the right operand variable is used to update the value of the left operand using the "=" operator
* _**XPath update **_: the left object is updated with the value from the right operand using an XPath expression

### Document

* _**set document**_: the value of the right operand document is used to create a new version of the document
