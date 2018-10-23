# Page and form development overview

A page presents information to a user. It can also collect information entered by a user. A page is displayed in a browser.

A form is a page that belongs to a process. In a process, there can be forms for process instantiation and for human tasks, and there can be overview forms.

## Form sources

You are recommended to use the [UI Designer](ui-designer-overview.md) to create forms for Bonita 7.x processes. UI Designer forms enable you to take full advantage of the separation between the process definition and the UI definition, by using contracts. 

You can also use external forms referenced by URL. If an external URL is being used, the information submitted to the Engine by the form must fulfill the contract. You can store external forms wherever you want as long as they are accessible by URL. 

For certain cases, you can specify that there is no form. This is required for a process that is instantiated programmatically (by a call activity or by an API call from an application, for example), or for a process or a task that does not have any contract input.  
A human task with no form and no contract represents a manual task, completed outside Bonita. The user will indicate in the application or Portal that the manual task is complete. A process or a human task with a contract but no form expects the information needed to fulfill the contract to be provided programmatically.

::: warning
**Attention**: Bonita 7.8 does not support 6.x GWT forms and case overview pages, neither for design nor at runtime.
To migrate your processes still using them, follow those [instructions](migrate-a-form-from-6-x.md)
:::

## Form types

A form is a page that belongs to a process. It could be a process instantiation form, a human task form, or an overview form. There are some extra things to consider when you are creating a form compared with an ordinary page, concerning how data is passed between the process instance and the form.

A [context](contracts-and-contexts.md) is the set of data provided by the process instance or task instance to the form. There is no context for a process instantiation form.

A [contract](contracts-and-contexts.md) is the definition of that data that the form returns to the process instance. There is no contract for an overview form.

During process development, some temporary forms are generated if necessary when you run a process from Bonita Studio, for process instantiation, for human task execution, and for the case overview. These forms are generated if the "UI Designer" option is chosen but no form is specified in the process definition.

The process instantiation and step execution temporary forms are based on the relevant contract and they are a useful tool for testing and debugging your application. 

The case overview contains three main sections:

* List of business data: the content of the business variables used by the case
* List of documents: the content of each document used by the case
* Timeline: information in chronological order about all the actions that have been performed in the selected case
