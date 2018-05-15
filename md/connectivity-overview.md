# Connectivity overview

## Overview

A connector is an element in a process that accesses an external system to read or write information. By extension, it also accounts for tools that modify data within a process like Office connectors that modify Bonita documents.

Bonita contains a set of standard connectors. You can also create custom connectors using the [connector development toolkit](connector-development-toolkit.md).

A connector consists of a definition, an implementation, and a configuration.

* The definition specifies the external interfaces for input and output, including the configuration wizard.
* The implementation is the Java code that acts on the inputs, interacts with the external system, and returns outputs to the process. There can be any number of implementations for a given definition.
* The configuration is the specification of how the connector is used in a specific process or task. The main part or connector configuration is done at pool and tasks levels, through a wizard. The choice of connector implementation though is done when you [configure the process](configuring-a-process.md).

You can add a connector to a pool or a task, at the start (_connector in_) or at the end (_connector out_).  
A pool connector _in_ is executed when the process is instantiated. A pool connector _out_ is executed when the process instance terminates, regardless of the reason for termination. If a process has more than one terminate end event or flow leading to the end of the process instance, make sure that it is always appropriate for the pool connector out to be executed. If it is not, use task connectors instead.

A task connector _in_ is executed before the task executes. This means it can be used to retrieve information that will be presented in a task form. A task connector _out_ is executed after the task has been executed and after any operation defined on the task. This means that information entered in a form by a user can be an input to the connector.

## Add a connector

To add a connector to a pool or task:

1. Select the pool or task.
2. Go to the **Details** panel, **Execution** tab.
3. Go to the **Connectors in** or **Connectors out** panel, depending on whether you want to add a connector at the start or the end of the pool or task.
4. Click **_Add_**.
5. Choose the category.
6. Choose the connector from the list.
7. Follow the wizard to configure the connector. For details, see the connector-specific documentation pages.

## Connectors and forms

In Bonita 6.x, you could add a connector to a form. This is no longer possible with forms created with the UI Designer. To achieve the same result, create a [REST API extension](rest-api-extensions.md). There is an example showing how to execute SQL queries on a external database.

## Edit a connector

To change the implementation of a connector for a process, update the [process configuration](configuring-a-process.md).  
The implementation can also be changed after deployment:
   - In versions 7.0.x, if you are using the Enterprise or Performance edition
   - In versions 7.1.0 and above, if you are using the Enterprise, Performance or Efficiency edition

To change connector configuration for a pool or task, use the connector wizard:

1. Select the pool or task.
2. Go to the **Details** panel, **Execution** tab.
3. Go to the **Connectors in** panel or the **Connectors out** panel, depending on whether you want to update a connector at the start or the end of the pool or task. A list of the connectors already defined is displayed.
4. Choose the connector you want to edit, and click **_Edit_**.
5. Follow the wizard to modify the configuration. For details, see the connector-specific documentation pages.
