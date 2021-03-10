# What is Bonita?

Bonita is an open-source and extensible platform for business process automation and optimization. Bonita Platform accelerates the development and production of business applications, with clear separation between capabilities for visual programming and for coding.  
BPMN (Business Process Modeling Notation), full extensibility, and reusable components allow smooth collaboration among the different profiles on the IT team, and with the business teams.  
Bonita integrates with existing information systems, orchestrates heterogeneous systems, and provides deep visibility into processes across the organization.

Bonita Platform has two components: the development environment, Bonita Studio, and the runtime environment, Bonita Runtime.

## What can I do with Bonita?

Bonita is a Digital Process Automation (DPA) platform that allows you to create applications based on processes. Processes can be partially automated (if involving users) or fully automated.

DPA, available with all Bonita editions, is applicable to a wide range of use cases: applications can go from loan request management, to student application processes, to analytical processes in drug discovery - and more! You can find the various industries where Bonita is used as well as use cases from our [website dedicated page](https://www.bonitasoft.com/industries).

Starting with Bonita 7.10, you can also handle Adaptive Case Management (ACM) with Bonita. 
ACM is like DPA in the sense that it allows to handle cases with some automation. But it also relies on strong principles that make it different from DPA: 
  - Empower the actors: 
    Actors in charge of the case have some autonomy to lead the case to its closure: not all process paths are pre-determined. Some tasks are optional, some are discretionnary. 
    Actors' specific knowledge make them fully able to choose the right next action for a case. 
  - Expect the unexpected: 
    A case can be stopped, resumed and can even change its state at any time without a path being predefined. New tasks may need to be created on the fly to reflect the specificity of a case while still benefiting from traceability.
  - Adapt to the context: case type and state define the availability of tasks following a set of business rules. Those rules must be editable on the fly.
  - Center on data: Case execution is not centered around a strict process, but around case data to create and update.

To learn more about how to use ACM capabilities in Bonita, check the dedicated [documentation](use-bonita-acm.md).

## Overview of the Bonita solution architecture

### Bonita Studio

![Bonita Studio architecture](images/getting-started-tutorial/what-is-bonita/architecture-bonita-studio.png)<!--{.img-responsive .img-thumbnail}-->

Bonita Studio contains all the elements needed to develop and compile a Bonita application. It is a graphical environment for creating processes, applications, data models, and users views (pages and forms). It contains three major design tools: 

* the whiteboard, for drawing a process flow diagram and defining the detail of steps, transitions, decision points and other process elements
* the Development menu, to create your data models and extend the Studio capabilities
* the UI Designer, which is used to create application pages and process forms

It provides:

- capabilities to model BPMN processes
- capabilities to model data (Business Data Model)
- capabilities to model user interfaces (UI Designer)
- capabilities to model applications
- an embedded Bonita stack (defined below), exclusively dedicated to local application testing performed by the application developer.

Bonita Studio is the development tool for the Business Analyst and Application Developer. Back-end java developers work in Bonita Studio and collaborate with front-end developers working in the UI Designer.

You can [install Bonita Studio](bonita-bpm-installation-overview.md) on your computer, then create and test processes, create data models, applications and application views (pages and forms). 

Bonita Studio is not intended for any use other than development. As a consequence, the Bonita stack embedded into the Bonita Studio can not be used for production purposes.

Bonita Studio contains a **Bonita Runtime** (Tomcat, UI Designer, Bonita Portal, Bonita Engine, and an h2 database), suitable for testing an application that is in development. When you run a process, it is automatically deployed onto the development platform.

Process forms, used to complete the human tasks, are created in the UI Designer, and use the data models created in the Studio.

Users can use Bonita Portal (_User_ profile) to view and complete the process tasks for all processes. You can also build personalized process-based applications. To do so, use the UI Designer to create application pages that display business data from the data models, display external data through REST API extensions, and move processes forward thanks to action buttons. Then use Bonita Studio to construct the application piece by piece.

<a id="platform"/>

### Bonita stack, runtime and server

![Bonita stack architecture](images/getting-started-tutorial/what-is-bonita/architecture-bonita-stack.png)<!--{.img-responsive .img-thumbnail}-->

The "Bonita stack" refers to all the components you need to deploy in order to make applications available to end users in production. It includes the Bonita runtime and the two database schemas (one for the Bonita Engine and one for business data).

The Bonita runtime includes a single Bonita server in the Bonita Community Edition. In the Bonita Enterprise Edition, the Bonita runtime can include several Bonita servers to create a cluster for high performance and availability.

The Bonita server is a standalone Java application running in a Java application server installed on a host (a machine, a virtual machine, a cloud instance, a container like Docker, etc).

The Bonita server has two components:
* [Bonita Engine](engine-architecture-overview.md) is the execution engine of Bonita.
* [Bonita Portal](bonita-bpm-portal-interface-overview.md) is the part of Bonita that is visible to process users, who use it to view tasks and take actions thanks to a generic task list for all processes they are involved in.

But Bonita Portal is also the tool used by the tenant administrator to [install, deploy and manage processes](processes.md). We use the word "tenant" here, in case the platform would be made of [several tenants](multi-tenancy-and-tenant-configuration.md).

To install Bonita Engine and Bonita Portal in a qualification or production environment, read the dedicated [install Bonita Platform](bonita-bpm-installation-overview.md#platform) documentation page.

## Editions

Until 2019 Bonita was provided in four different editions: Community, Teamwork, Efficiency and Performance. Since 2019 Bonita is only provided in two editions: Community and Enterprise.
