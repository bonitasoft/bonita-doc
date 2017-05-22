# Data handling overview

In a BPM-based application, use:

* [Business variables](define-and-deploy-the-bdm.md) for information that:
  * is mostly used by Bonita
  * has meaning after a process instance is archived
  * is used at several places in the process
  * is read by a process to orientate its flow
  * is shared across several process instances
  * is displayed in an application page

* Task-level [process variables](specify-data-in-a-process-definition.md) for:
  * intermediate computation results (for example a connector result to be used as input of the next connector)
  * information that is private to the process, not used elsewhere in the application

* Pool-level [process variables](specify-data-in-a-process-definition.md) for information that:
  * can be read by the process to orientate its flow
  * can be used at several places in the process
  * is private to the process, not used elsewhere in the application

* External databases, with [connectors](connectivity-overview.md) and [custom data types](create-a-complex-data-type.md), for information that:
  * is used by multiple applications besides Bonita

Key benefits of using business data:

* Control of indexing strategy
* Definition of custom queries to efficiently read the data
* Full control of lifecycle of the data through the set of processes that handle it (add, update and delete)
* Improved performance compared with process variables or external databases
* Easier application maintenance

An application page accesses business data using the [bdm REST API](bdm-api.md). A page also contains page [variables](variables.md), which have no meaning outside the page.

The data that is passed from a form to a process is defined using a [contract](contracts-and-contexts.md). Define a contract for process instantiation and for each human task. 
These contracts are part of the process definition. 
A form has access to business data and documents using the [context](contracts-and-contexts.md) and the [REST API](_rest-api.md). 
A form also contains form [variables](variables.md), which have no meaning outside the form.
