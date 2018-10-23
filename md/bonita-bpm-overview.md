# Bonita overview

Bonita 7 is a powerful BPM-based application platform for building highly engaging, personalized, process-based business applications to get things done, take full advantage of BPM, and adapt to business changes in real time. 

Bonita has two parts: the development environment, Bonita Studio, and the runtime environment, Bonita Platform.

## Bonita Studio

Bonita Studio is a graphical environment for creating processes, applications, data models, and users views (pages and forms). It contains three major design tools: 

* the whiteboard, for drawing a process flow diagram and defining the detail of steps, transitions, decision points and other process elements
* the Development menu, to extend the Studio capabilities and create your data models
* the UI Designer, which is used to create application pages and process forms

Bonita Studio is the development tool for the Business Analyst and Application Developer. Back-end java developers work in Bonita Studio and collaborate with front-end developers working in the UI Designer.

You can [install Bonita Studio](bonita-bpm-installation-overview.md) on your computer, then create and test processes, create data models, applications and application views (pages and forms). 

Bonita Studio contains a **Bonita Platform** (Tomcat, UI Designer, Bonita Portal, Bonita Engine, and an h2 database), suitable for testing an application that is in development. When you run a process, it is automatically deployed onto the development platform.

Process forms, used to complete the human tasks, are created in the UI Designer, and use the data models created in the Studio.

Users can use Bonita Portal (_User_ profile) to view and complete the process tasks for all processes. You can also build personalized process-based applications. To do so, use the UI Designer to create application pages that display business data from the data models, link the pages to processes thanks to action buttons, then use the Bonita Portal application builder to construct the application piece by piece.

<a id="platform"/>

## Bonita Platform

[Bonita Engine](engine-architecture-overview.md) is the execution engine of Bonita.

As mentioned before, [Bonita Portal](bonita-bpm-portal-interface-overview.md) is the part of Bonita that is visible to process users, who use it to view tasks and take actions thanks to a generic task list for all processes they are involved in.

But Bonita Portal is also the tool used by the tenant administrator to [install, deploy and manage processes](processes.md) and to [build applications](applications.md). We use the word "tenant" here, in case the platform would be made of [several tenants](multi-tenancy-and-tenant-configuration.md).

To install Bonita Engine and Bonita Portal in a qualification or production environment, [install Bonita Platform](bonita-bpm-installation-overview.md#platform).

In Bonita Studio, once a process is ready, you can [build](build-a-process-for-deployment.md) it and deploy it on your Bonita qualification or production platform. 

## Editions

Bonita is provided in five different editions: Community, Teamwork, Efficiency, Performance and Enterprise.

## Getting started

**I'm currently using Bonita 6.x. Will 7.x be a big change?**

Bonita 7.x provides new and improved features, including the [UI Designer](ui-designer-overview.md) for creating application pages and forms, as well as [contracts and context](contracts-and-contexts.md) to create a clear split between the process logic, the data, and the user views.   

::: warning Attention: Starting with Bonita 7.8, 6.x forms and case overview pages are not available for modeling or execution. Before migrating to Bonita 7.8, you need to create all forms with Bonita UI Designer to benefit from technologies like html/AngularJS and use contracts in tasks and process instantiation. For more information, read the [migrate a form from 6.x](migrate-a-form-from-6-x.md) page. :::

You will also find lots of familiar features, which continue to work as they did in 6.x.

**Tell me about the documentation.**

We're continually updating the documentation.   
There are four main information categories: Application and process design, Installation, Portal administration, and Development. 

**Tell me about using Bonita.** 

See [Lifecycle and profiles](lifecycle-and-profiles.md).

**Can I migrate an existing process into Bonita 7.x?**

You can [import a process](import-and-export-a-process.md) from any earlier Bonita release if  they don't contain Legacy v6 forms or case overview pages. If they do, you need to rework your process and [migrate those froms or pages](migrate-a-form-from-6-x.md).

**Tell me about creating an application.** 

An application is a collection of related processes, user interfaces, and shared data. See [design methodology](design-methodology.md).

**Tell me about creating a process.** 

A process can be included in an application or can be accessed through Bonita Portal. See [design methodology](design-methodology.md).

**Tell me about creating a diagram.**

See [diagrams](diagram-overview.md).

**How can I get started?** 

Download and install Bonita 7.x: see the [installation instructions](bonita-bpm-installation-overview.md).
