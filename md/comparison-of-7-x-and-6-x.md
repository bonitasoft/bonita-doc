# 1.2.4 Comparison of 7.x and 6.x

[Packaging comparison](#packingcomparison)  
[Concept comparison](#conceptcomparison)  
[Feature improvements in Bonita BPM Studio](#featureimprovstudio)  
[Feature improvements in Bonita BPM Portal](#featureimprovportal)  
[Feature improvements in Bonita BPM Engine](#featureimprovengine)  




## Packaging comparison
Feature
Bonita BPM 6.x
Bonita BPM 7.x

Packaging

Two versions are available for download:

1. the Bonita BPM Subscription Pack edition version for the Performance, Efficiency, and Teamwork editions
2. and the Bonita BPM Community edition version for the Community edition

For each version, there are several packaging options. Each edition has a specific var\_bonita\_home that must be downloaded and installed.

There is now a single var\_bonita\_home, simplifying download options and installation. The edition is set in a properties file. There are no other differences to packaging. 

See the [Installation overview](/bonita-bpm-installation-overview.md).



## Concept comparison

Feature
Bonita BPM 6.x
Bonita BPM 7.x

Contract

Not in 6.x

A contract defines a clear separation between the process and the forms, making it possible to update the process user interface on the live system. 

See [Contracts](/contracts-and-contexts.md).

Live update

Not in 6.x

A live update is a change that is applied to a process or application on the live system, without needing to pause the platform or take a process out of service.

See [Live update](/live-update). 

Form mapping

Not in 6.x

A form is mapped to process instantiation, to case overview, or to a task. Any form that respects the relevant contract can be 
used. This separation between the process and the forms makes it possible to to the live update feature. 

Business data

A process or application can use business data managed by the Bonita BPM Platform. (Subscription editions only). 

Now available in all editions.

See [BDM](/business-data-model-856)

Actor mapping

Each actor in a process can be mapped to a Group, Role, Membership or User within an organization. The mapping can be refined using an actor filter.

No change.

See [Actor mapping](/actors.md#Mapping_an_actor) and [Actor filtering](/actor-filtering.md).

Environments

An Environment is a set of configuration information for a particular process. It contains the following information:

* Actor Mapping 
* Actor filters
* Parameters
* Connector implementations
* Dependencies for processes and applications

By having these Environments set up in the Studio, the developer can export processes that are ready to be run for a specific target platform. At any point in time, there is only one active Environment in Studio.

No change.

See [Environments](/environments.md).

Parameters

A Parameter is configuration information that can be attached to a process. Parameters are configured for an Environment. Parameter values can be updated at runtime.

Now available in all editions.

See [Parameters](/parameters.md) and [Environments](/environments.md).

Workspace API

The Workspace API is provided to generate `.bar` files from the command line, ready for production.

* .BAR files are for deployment only and cannot be read by the Studio.
* .BOS files are for Studio interchange only and cannot be deployed to production.
* Each file format is optimal in term of content and is optimized for the target use case.

No change. The Workspace API can export pages that are mapped to process instantiation, process overview, or to tasks. It cannot export application pages that are not elements of a process.

See [Automating process builds](/automating-process-builds.md).



## Feature improvements in Bonita BPM Studio

Feature
Bonita BPM 6.x
Bonita BPM 7.x

UI designer

Not in 6.x

A new development environment for creating sophisticated, data-driven pages and forms for process-based applications. 
The UI designer is accessed through the Studio.

See [live update](/live-update).

The 6.x [form tooling](/6x-legacy-forms) is still supported, so that you can continue to run 6.x processes and to ease migration. 

Process migration

A process exported from Bonita Open Solution 5.9 or 5.10 must be modified to run in Bonita BPM. When you import a process from 5.9 or 5.10 into Bonita BPM Studio, you see a report that guides you through the changes that are necessary.

See [Migrate a process from Bonita Open Solution 5.9 or 5.10](/migrate-process-bonita-open-solution-5x.md).

A process created in Bonita BPM 6.x will run in 7.x without any modification. 
However, to take advantage of the new features in Bonita BPM 7.x, you need to add contracts and migrate the forms.

See [Contracts](/contracts-and-contexts.md) and [Migrate a form from 6.x](/migrate-form-6x).

Application theme and layout

Not in 6.x

You can create custom layout and theme for a process-based application constructed from UI designer pages and forms.

See [Appearance](/appearance).

REST API extensions

Not in 6.x

You can create custom REST API extensions, to supplement the standard REST API interfaces or to optimize REST API calls used UI designer pages and forms. 

See [REST API extensions](/rest-api-extensions).

Improved UI

Not in 6.x

Improvements to the Details panel so that tab structure reflects typical worksflow.

Variable definition

Easy variable definition for process data, using the expression editor to set the initial or default values.

Easy variable definition for both business data and process data. 

See [Business data model](/business-data-model-856) and [Process variables](/specify-data-process-definition).

Expression Editor

This expression editor enables a developer to define a constant, an expression, a comparison or a Groovy script. Very often, there is no need to resort to a Groovy script, a constant, a comparison or an expression being enough. A number of predefined expressions are provided.

Convenience Groovy functions are provided to help write scripts more quickly. These functions provide simple access to frequently used information, such as information on the current user and the process initiator. It is now very easy to retrieve the manager or the email of the current user or the process initiator.

No changes to the expression editor. It is not available from the UI designer.

See [Using expressions and scripts](/using-expressions-and-scripts.md).

Validation 

The validation view shows all validation errors in the same location in the Studio. This enables developers to quickly locate validation errors wherever they appear.

The existence of mapped forms is verified, but the form definition is not validated for forms created with the UI designer.

See [Process testing overview](/process-testing-overview.md).

Iteration

Iteration can be by loop or by multi-instantiation. Multi-instantiation no longer requires a specific Bonita connector nor implementation of a specific java class. You can use a variable of type Collection or specify the cardinality using an expression. The completion condition is a simple expression.

No change.

See [Iteration](/iteration.md).

Connectors
A number of standard connector are provided, and it is possible to create your own custom connectors.

No change.

See [Connectivity](/connectivity-overview.md).

Organization for testing

Several organizations can be defined in the Studio, for test purposes. The organization can be then pushed to the Portal (published) for testing, or exported and imported into the Portal for deployment.

No change.

See [Organization overview](/organization-overview.md).

Anonymous user

You can define a process that has an unknown initiator.

See [Start a process as an anonymous user](/actors.md).

Not supported.



## Feature improvements in Bonita BPM Portal

Feature
Bonita BPM 6.x
Bonita BPM 7.x

Dynamic reconfiguration

The process configuration is defined in Bonita BPM Studio. With the Performance Edition, you can modify the configuration in Bonita BPM Portal after the process is deployed. 
You can dynamically update the following configuration items:

* Actor mapping (all editions)
* Parameters (Performance edition)
* Connector implementation (Performance edition)
* Dependencies (Performance edition)
* Actor filter replay by Java call (Performance edition).


New live update feature expands the dynamic reconfiguration to other editions and to other items. The following items can be updated "live":

* Groovy scripts (Efficiency and Performance editions)
* Process forms (Efficiency and Performance editions)
* Actor mapping (all editions)
* Parameters (all editions)
* Connector implementation (all editions)
* Dependencies (all editions)
* Actor filter replay by Java call (Performance edition)

See [Live update](live-update).

User interface
For users, a simple interface for starting cases and performing tasks. For administrators, an interface for managing processes and applications, and the organization, with views for monitoring process and case status.

No change for users. For adminsitrators, the case process and case monitoring views have been improved, new live update features have been added, and the application editor has been improved.

See [Bonita BPM Portal interface overview](/bonita-bpm-portal-interface-overview-855).

Task management

Users can choose how to manage tasks. They can perform one task after another in list order, or select my tasks for themselves then perform them in the order they choose.

No change for users. An administrator or process manager (or a user with an appropriate custom profile) can see at a glance that status of all tasks in a case, and can perform a task for a user.

See [Manage a task](/tasks.md).

Mobile web portal 

A specially designed mobile interface to Bonita BPM Portal enables users to carry out tasks from a browser on mobile devices.

No change. 

See [Mobile overview](/mobile-portal-overview.md).

Subtasks 

A Subtask is a part of a self-assigned existing task. A Subtask must be assigned to a specific person, by name. The assignee can be the creator.

No change.

See [Manage a subtask](/subtasks.md).

Replay tasks and connectors in error

It is now possible for the administrator to replay a task or a connector that is in error. This enables a resolution of failed tasks and better service to end users. and connectors in error

No change.

See [Process configuration overview](/process-configuration-overview.md) and [Mobile overview](/mobile-portal-overview.md).

Anonymous user

You can now complete a task as an [anonymous user](/anonymous-user), that is, without being registered in the organization. 
For example, on an e-commerce site, a new user can browse stock and save items to a basket, then register with the site if they want to save their basket for later or to buy something.

Not supported.



## Feature improvements in Bonita BPM Engine
Feature
Bonita BPM 6.x
Bonita BPM 7.x

var\_bonita\_home

A separate var\_bonita\_home for each edition and for cluster.

A common var\_bonita\_home used for all editions, simplifying download and installation. Improved structure for var\_bonita\_home/server that is easier to maintain and customize.

See [Bonita Home](/bonita-home.md).