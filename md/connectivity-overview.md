# 1.8 Connectivity overview

A connector is an element in a process that accesses an external system to read or write information. Bonita BPM contains a set of standard connectors. You can also [create a custom connector](/creating-connector). 


A connector consists of a definition, implementation, and configuration.

* The definition specified the external interfaces for input and output, including the configuration wizard.
* The implementation is the Java code that acts on the inputs, interacts with the external system, and returns outputs to the process. There can be any number of implementations for a given definition.
* The configuration is the specification of how the connector is used in a specific process or task, including the implementation to be used. The implementation is specified when you [configure the process](/configuring-process-bonita-bpm-studio). The other information is specified in the wizard when you [add the connector](#add).

You can add a connector a pool or to a task, at the start (_connector in_) or at the end (_connector out_). 
A pool connector in is executed when the process is instantiated. A pool connector out is executed when the process instance terminates, regardless of the reason for termination. If a process has more than one terminate end event or flow leading to the end of the process instance, make sure that it is always appropriate for the pool connector out to be executed. If it not, use task connectors instead.


A task connector in is executed before the task. This means it can be used to retrieve information that will be presented in a task form. 
A task connector out is executed after the task and after any operations defined on the task. This means that information entered in a form by a user can be input to the connector.



## Add a connector


To add a connector to a pool or task:


1. Select the pool or task.
2. Go to the **Details** panel, **Execution** tab.
3. Go to the **Connectors in** panel or the **Connectors out** panel, depending on whether you want to add a connector at the start or the end of the pool or task.
4. Click **_Add_**.
5. Choose the category.
6. Choose the connector from the list.
7. Follow the wizard to configure the connector. For details, see the connector-specific documentation pages.

## Connectors and forms


In Bonita BPM 6.x, you could add a connector to a form. This is no longer possible with forms created with the UI designer. To achieve the same result, create a [REST API extension](/rest-api-extensions).

There is an example showing how to execute SQL queries on a external database.






## Edit a connector


To change the implementation of a connector for a process, update the [process configuration](/configuring-process-bonita-bpm-studio).


To change connector configuration for a pool or task, use the connector wizard:


1. Select the pool or task.
2. Go to the **Details** panel, **Execution** tab.
3. Go to the **Connectors in** panel or the **Connectors out** panel, depending on whether you want to update a connector at the start or the end of the pool or task. A list of the connectors already defined is displayed.
4. Choose the connector you want to edit, and click **_Edit_**.
5. Follow the wizard to modify the configuration. For details, see the connector-specific documentation pages.