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

In Bonita Studio select the pool to create the process instantiation contract, or select a human task to create a task contract.
Go to the **Details** panel, **Execution** tab, **Contract** pane. In the Inputs tab, declare each expected input and its type. You have two options: declare the input manually or from a business variable using the **Add from data** option. 

Defining an input based on a variable saves you time, and is the preferred option if the aim of the input is to initialize (or update) the business variable. In addition, using **Add from data** on a contract automatically generates [operations](operations.md) or expressions to instantiate or edit the selected business variables with the task contract inputs. It also generates **constraints** for each mandatory field and all aggregation relations to validate their integrity.  

In the **Constraints** tab, declare expressions that check the validity of the value of each input. A constraint has a name, a content, and an error message. The message is logged if the constraint is not met. Make sure to provide a meaningful name and message to help process users understand why the system rejected the command to instantiate the process or execute a task.

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
7. **long:** a long value (e.g. 3 000 000 000). Can be used at pool-level only (not at task-level). In called processes, this is helpful to receive IDs from call activities.
7. **text:** a string

Check **_multiple_** to specify that the input is a list of its primary type (for example, a list of integers).

::: info
**:fa-info-circle:**  The type `long` can be used in a POST with JSON without precision lost. However, it is important to keep in mind that while manipulating numbers in javascript the max `integer` is 2^53-1 which is a smaller subset of Java max `long` type (2^63-1). Example:

 * If your value is in JavaScript safe integer range: Text widget (number) > JavaScript number > JSON number > Contract java.lang.Long
 * If value is out of JavaScript safe integer range: Text widget (text) > JavaScript String > JSON String > Contract java.lang.Long
:::

**Constraints**

A constraint is a Groovy expression that returns a Boolean. If the value is false, the constraint is not met, so the contract not fulfilled and the system will not execute the instantiation or task.

**Note:** the constraint scope is limited to contract input and cannot reference external systems (such as connectors, databases or bonita APIs).

When is the contract validated ?

Whatever means is used to submit information to process or human task, the system will validate the contract. If the contract is not satisfied, an exception is thrown and the process or human task is untouched. Information can be submitted by Java API call, REST API call, Bonita form, or an external system including a third-party form.

Example of a stacktrace when a constraint fails:
```
2019-03-19 11:28:09.088 +0100 AVERTISSEMENT: org.bonitasoft.engine.bpm.contract.validation.ContractConstraintsValidator THREAD_ID=64 | HOSTNAME=*** | TENANT_ID=1 | Constraint [mandatory_invoiceInput_customer] on input(s) [invoiceInput] is not valid
2019-03-19 11:28:09.200 +0100 INFOS: org.restlet.Component.BonitaSPRestletApplication Error while validating constraints
Explanations:
Customer is mandatory for Invoice
```
Example of HTTP response when a constraint fails:
```
status: 400
{
	"exception":"class org.bonitasoft.engine.bpm.contract.ContractViolationException",
	"message":"Error while validating constraints",
	"explanations":["Customer is mandatory for Invoice"]
}
```

When generating a Form from a contract, a Text widget is created to display errors on submit.


**Best practice:** Define the contract prior to creating your forms. This will save you time during development phase as auto-generated forms enable you to submit information and validate that your contract definition is stable. After the contract is defined, you can go to UI Designer using top-right pencil icon of the Details panel. It will generate a form with the appropriate widget for each contract input to enable the user to provide the expected value.

## Context

To display contextual information of the task or the process instance in a form, you can leverage the business data and document references made publicly available through the context. The notion of context is available at two levels : process instance and human task. The context is a list of references to the business data and documents manipulated by the process instance during its execution.
Currently, context is the same for a human task and its process instance. All the business data and documents defined are public.

Limitation : there is currently no way to customize which business data or document are public in Community edition. When using an Enterprise edition, you may want to use the [BDM Access Control](bdm-access-control.md) to protect data access.


## <a name="form-generation"/> Form generation

When creating a contract input from a Data (Add from Data...) you can select the edition mode.  
In `Create` mode, the generated contract input is meant to instantiate new Data instance.  
In `Edit` mode, additional `persistenceId_string` input are generated to ensure edition of existing data instances. When generating a Form, additional variables are created in the UID page to retrieve existing data from the Task context and bind create a proper databinding. There is some known limitations if the data has _lazy_ relations:  
* If the _lazy_ field is not contained in a repeatable container (no multiple parent in the object hierarchy): Another UID variable (External API) is generated to retrieve the _lazy_ relation.
* If the _lazy_ field is contained in a repeatable container (there is a multiple parent in the object hierarchy or the data is multiple): This kind of fields are unselected by default when generating the contract. We cannot retrieve the values from the context for those relations and a consistent _edition_ form generation is not possible. The current workarounds to handle this use case are:
	* Change the relation loading mode to _eager_ (Always load related objects option) instead of _lazy_ (Only load related objects when needed)
	* Use UID [fragments](fragments.md) (Enterprise edition only). Keep in mind that it may lead to performance issues as each lazy instance will generate an HTTP request.
	* Use a [Rest API Extension](api-extensions.md). Instead of reusing the Task context, create your own endpoint that will serve all the needed data in one HTTP request.

In `Edit` mode, you have the possibility to generate read only widgets for attributes related to the contract but not in the contract.  
The following exemple describes the logic: 

![Read only exemple](images/formGenerationReadOnly.svg)

Elements in green are the contract inputs, i.e a subpart of the business model that will be edited.  
Elements in orange are the attributes considered as _related to a contract input_. We will propose you to generate read only widgets to display the values of those attributes.  

The rules are the following:  
An attribute is considerated as _related to a contract input_ if: 

* This attribute is not used as a contract input
* The parent of this attribute has at least one child used as a contract input

If a simple attribute is considerated as _related to a contract input_, then a read only widget can be generated for this attribute.  
If a complex attribute is considerated as _related to a contract input_, then a read only widget can be generated for all the simple children of this attribute.  

⚠️ We do not generate read only widgets for lazy fields contained in a repeatable container (the limitation is explained above)
