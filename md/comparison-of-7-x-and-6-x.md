# Comparison of Bonita 7.x and Bonita 6.x

Find out the main differences between versions 7 and 6 and learn about feature improvements in Bonita Studio, Portal, and Engine.

## Packaging comparison

In Bonita, two versions are available for download:

1. the Bonita Subscription Pack edition version for the Enterprise, Performance, Efficiency, and Teamwork editions
2. and the Bonita Community edition version for the Community edition 

For each version, there are several packaging options.
See the [Installation overview](bonita-bpm-installation-overview.md). 

## Concept comparison

| Feature  | Bonita 6.x  | Bonita 7.x  |
| -------- | --------------- | --------------- |
| Contract  | Not in 6.x  | A contract defines a clear separation between the process and the forms, making it possible to update the process user interface on the live system. See [Contracts](contracts-and-contexts.md)  |
| Live update  | Not in 6.x  | A live update is a change that is applied to a process or application on the live system, without needing to pause the platform or take a process out of service. See [Live update](live-update.md)  |
| Form mapping  | Not in 6.x  | A form is mapped to process instantiation, to case overview, or to a task. Any form that respects the relevant contract can be used. This separation between the process and the forms makes it possible to to the live update feature  |
| Business data  | A process or application can use business data managed by the Bonita Platform. (Subscription editions only)  | Now available in all editions. See [BDM](define-and-deploy-the-bdm.md)  |
| Actor mapping  | Each actor in a process can be mapped to a Group, Role, Membership or User within an organization. The mapping can be refined using an actor filter.  | No change. Anonymous users are not supported anymore. See [Actor mapping](actors.md) and [Actor filtering](actor-filtering.md)  |
| Environments  | An Environment is a set of configuration information for a particular process. It contains the following information:  actor mapping, actor filters, parameters, connector implementations, dependencies for processes and applications. By having these Environments set up in the Studio, the developer can export processes that are ready to be run for a specific target platform. At any point in time, there is only one active Environment in Studio  | No change. See [Environments](environments.md)  |
| Parameters  | A Parameter is configuration information that can be attached to a process. Parameters are configured for an Environment. Parameter values can be updated at runtime. | Now available in all editions. See [Parameters](parameters.md) and [Environments](environments.md)  |
| Workspace API | The Workspace API is provided to generate `.bar` files from the command line, ready for production. .bar files are for deployment only and cannot be read by the studio. .bos files are for Studio interchange only and cannot be deployed to production. Each file format is optimal in term of content and is optimized for the target use case | The Workspace API retains its 6.x capabilities. Moreover, it can export forms that are mapped to process instantiations or tasks, and pages that are mapped to a case overview. It cannot export application pages that are not elements of a process. For this reason the Workspace API has been deprecated in 7.7.0, and is replaced by the *LA builder* included in the tooling suite of [*Bonita Continuous Delivery* add-on](https://documentation.bonitasoft.com/bcd/latest/). See [Automating builds](automating-builds.md) |

## Feature improvements in Bonita Studio

| Feature  | Bonita  6.x  | Bonita 7.x  |
| -------- | --------------- | --------------- |
| UI Designer | Not in 6.x | A new development environment for creating sophisticated, data-driven pages and forms for process-based applications. The UI Designer is accessed through the studio. See [live update](live-update.md). The 6.x forms were supported up to the 7.7.x, so you could continue to run 6.x processes and ease migration. |
| Process migration | N/A| A process created in Bonita 6.x could run in 7.x (up to 7.7.x) without any modification. Starting with Bonita 7.8, you must use contracts created from outside of the studio, or migrate the forms. See [Contracts](contracts-and-contexts.md) and [Migrate a form from 6.x](migrate-a-form-from-6-x.md) |
| Application theme and layout  | Not in 6.x  | You can create custom layout and theme for a process-based application constructed from UI designer pages and forms. See [Appearance](appearance.md)  |
| REST API extensions  | Not in 6.x  | You can create custom REST API extensions, to supplement the standard REST API interfaces or to optimize REST API calls used UI designer pages and forms. See [REST API extensions](rest-api-extensions.md)  |
| Improved UI  | Not in 6.x  | Improvements to the Details panel so that tab structure reflects typical worksflow  |
| Variable definition  | Easy variable definition for process data, using the expression editor to set the initial or default values   | Easy variable definition for both business data and process data. See [Business data model](define-and-deploy-the-bdm.md) and [Process variables](specify-data-in-a-process-definition.md).  |
| Expression Editor  | This expression editor enables a developer to define a constant, an expression, a comparison or a Groovy script. Very often, there is no need to resort to a Groovy script, a constant, a comparison or an expression being enough. A number of predefined expressions are provided.  Convenience Groovy functions are provided to help write scripts more quickly. These functions provide simple access to frequently used information, such as information on the current user and the process initiator. It is now very easy to retrieve the manager or the email of the current user or the process initiator  | No changes to the expression editor. It is not available from the UI designer. See [Using expressions and scripts](expressions-and-scripts.md)  |
| Validation   | The validation view shows all validation errors in the same location in the Studio. This enables developers to quickly locate validation errors wherever they appear  | The existence of mapped forms is verified, but the form definition is not validated for forms created with the UI designer. See [Process testing overview](process-testing-overview.md)  |
| Iteration  | Iteration can be by loop or by multi-instantiation. Multi-instantiation no longer requires a specific Bonita connector nor implementation of a specific java class. You can use a variable of type Collection or specify the cardinality using an expression. The completion condition is a simple expression  | No change. See [Iteration](iteration.md)  |
| Connectors  | A number of standard connector are provided, and it is possible to create your own custom connectors  | No change. See [Connectivity](connectivity-overview.md)  |
| Organization for testing  | Several organizations can be defined in the Studio, for test purposes. The organization can be then pushed to the Portal (published) for testing, or exported and imported into the Portal for deployment  | No change. See [Organization overview](organization-overview.md)  |
| Anonymous user  | You can define a process that has an unknown initiator.  | Not supported  |

## Feature improvements in Bonita Portal
| Feature  | Bonita 6.x  | Bonita 7.x  | 
| -------- | --------------- | --------------- | 
| Dynamic reconfiguration  | The process configuration is defined in Bonita Studio. With the Enterprise or the Performance Edition, you can modify the configuration in Bonita Portal after the process is deployed. You can dynamically update the following configuration items: actor mapping (all editions), parameters (Enterprise or Performance edition), connector implementation (Enterprise or Performance edition), dependencies (Enterprise or Performance edition), actor filter replay by Java call (Enterprise or Performance edition) | New live update feature expands the dynamic reconfiguration to other editions and to other items. The following items can be updated "live": Groovy scripts (Efficiency, Performance and Enterprise editions), process forms (Efficiency, Performance and Enterprise editions), actor mapping (all editions), parameters (all editions), connector implementation (all editions), dependencies (all editions), actor filter replay by Java call (Enterprise or Performance edition). See [Live update](live-update.md)  |
| User interface  | For users, a simple interface for starting cases and performing tasks. For administrators, an interface for managing processes and applications, and the organization, with views for monitoring process and case status  | No change for users. For adminsitrators, the case process and case monitoring views have been improved, new live update features have been added, and the application editor has been improved. See [Bonita Portal interface overview](bonita-bpm-portal-interface-overview.md)  |
| Task management  | Users can choose how to manage tasks. They can perform one task after another in list order, or select my tasks for themselves then perform them in the order they choose.  | No change for users. An administrator or process manager (or a user with an appropriate custom profile) can see at a glance that status of all tasks in a case, and can perform a task for a user. See [Manage a task](tasks.md)  |
| Mobile web portal  | A specially designed mobile interface to Bonita Portal enables users to carry out tasks from a browser on mobile devices  | No change. See [Mobile overview](mobile-portal.md)  |
| Subtasks | A subtask is a part of an existing task. The assignee can create a subtask (to request a missing information for example) and must assign it to a specific person, by name. The assignee can be the creator | Supported up to 7.2.4. No more substasks can be created starting from 7.3.0, but open process instances execute them correctly. See [Manage a subtask](subtasks.md) |
| Replay tasks and connectors in error  | It is now possible for the administrator to replay a task or a connector that is in error. This enables a resolution of failed tasks and better service to end users. and connectors in error  | No change. See [Process configuration overview](process-configuration-overview.md) and [Mobile overview](mobile-portal.md)  |
| Anonymous user  | You can now complete a task as an [anonymous user](http://documentation.bonitasoft.com/anonymous-user), that is, without being registered in the organization. For example, on an e-commerce site, a new user can browse stock and save items to a basket, then register with the site if they want to save their basket for later or to buy something  | Not supported  |

## Feature improvements in Bonita Engine
| Feature  | Bonita 6.x  | Bonita 7.0/1/2  | Bonita 7.3 | 
| -------- | --------------- | ------------------- | -------------- | 
| bonita_home | A separate bonita_home for each edition and for cluster | A common bonita_home used for all editions, simplifying download and installation. Improved structure for bonita_home/server that is easier to maintain and customize. | No more bonita_home. Relevant information is stored in the database, increasing performance and easing future migrations. See [platform setup](BonitaBPM_platform_setup.md)|
