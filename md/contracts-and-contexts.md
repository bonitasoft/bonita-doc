# Contracts and contexts

## Overview

The notion of contract is available at two levels: process instantiation and human task execution. A contract is composed of inputs and constraints. Inputs are pieces of information that must be provided to the process or the human task. The constraints are applied to the input to check that the values of the inputs are valid.

As an example, a Leave Request Process could declare the following contract:

* Inputs:
  * Start Date
  * End Date
  * Leave type
* Constraints:
  * End Date after Start Date
  * Start Date in the future
  * Leave type in ("Annual Leave", "Unpaid Leave")

## Contract purpose and value

A contract specifies the pieces of information the process requires to be started. Without this information the process cannot execute its business logic, and it is not useful to try to start an instance of the process. That is to say, if you try to start an instance of the process without providing the expected input, the system will refuse to start the process. The same is true for a human task: if you try to perform the task without providing the expected input, the system will refuse to execute the task. A contract protects the process from malformed external interaction. After validation, the inputs are used to initialize business data, or process data, or are passed through connectors.

## Contract definition

In Bonita BPM Studio select the pool to create the process instantiation contract, or select a human task to create a task contract.
Go to the **Details** panel, **Execution** tab, **Contract** pane. In the Inputs tab, declare each expected input and its type. You have two options: declare the input manually or from a business variable using the **Add from data** option. Defining an input based on a variable saves you time, and is the preferred option if the aim of the input is to initialize (or update) the business variable. In addition, using **Add from data** on a task contract automatically generates [operations](operations.md) to update the selected business variables with the task inputs. In the Constraints tab, declare expressions that check the validity of the value of each input. A constraint has a name, a content, and a error message. The message is logged if the constraint is not met. Make sure to provide a meaningful name and message to help process users understand why the system rejected the order to start the process or execute a task.

In the Leave Request Process example, the contract inputs and the constraints would be similar to the following:

  ![](images/images-6_0/contractDoc.PNG)


  ![](images/images-6_0/ConstraintsDoc.PNG)


Stacktrace example in case of contract violation:
  ![](images/images-6_0/constraintError.PNG)

Supported input types:

1. **Boolean:** accepts true or false values
2. **complex:** a tree structure that is equivalent to a key-value map where keys are fixed (e.g. if an input named user with children attributes firstname and lastname)
3. **date:** a date respecting the following pattern : yyyy-MM-dd or yyyy-MM-ddTHH:mm:ss or yyyy-MM-ddTHH:mm:ssZ or yyyy-MM-ddTHH:mm:ss.SSSz (ISO\_8601)
4. **decimal:** a decimal value (e.g. 5.128)
5. **file:** a document
6. **integer:** a numeric value (e.g. 4)
7. **text:** a string

Check **_multiple_** to specify that the input is a list of its primary type (for example, a list of integers).

**Constraints**

A constraint is a Groovy expression that returns a Boolean. If the value is false, the constraint is not met, so the contract not fulfilled and the system will not execute the instantiation or task.

**Note:** the constraint scope is limited to contract input and cannot reference external systems (such as connectors, databases or bonita APIs).

When is the contract validated ?

Whatever means is used to submit information to process or human task, the system will validate the contract. If the contract is not satisfied, an exception is thrown and the process or human task is untouched. Information can be submitted by Java API call, REST API call, Bonita BPM form, or an external system including a third-party form.

**Best practice:** Define the contract prior to creating your forms. This will save you time during development phase as auto-generated forms enable you to submit information and validate that your contract definition is stable. After the contract is defined, you can go to UI Designer using top-right pencil icon of the Details panel. It will generate a form with the appropriate widget for each contract input to enable the user to provide the expected value.

## Context

To display contextual information of the task or the process instance in a form, you can leverage the business data and document references made publicly available through the context. The notion of context is available at two levels : process instance and human task. The context is a list of references to the business data and documents manipulated by the process instance during its execution.
Currently, context is the same for a human task and its process instance. All the business data and documents defined are public.

Limitation : there is currently no way to customize which business data or document are public.
