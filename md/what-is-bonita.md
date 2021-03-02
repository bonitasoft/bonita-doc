# What is Bonita?

Welcome to this Bonita getting started tutorial. On this page you will find a quick overview of what you can do with Bonita and an introduction to the Bonita architecture.

If you can't wait to start creating your first application with Bonita, you can safely skip this page and move to the [download and installation](bonita-studio-download-installation.md) of Bonita Studio.

## What can I do with Bonita?

Bonita is a Digital Process Automation platform that allows you to create applications based on processes. Processes can be  partially automated (if involving users) or fully automated.

Bonita is applicable to a wide range of use cases: applications can go from loan request management, to student application processes,to analytical processes in drug discovery - and more! You can find the various industries where Bonita is  used as well as use cases from our [website dedicated page](https://www.bonitasoft.com/industries).

## How do I create a Bonita application?

Thanks to the low-code Bonita platform you won't need to write a lot of code to create an application. Creation of Bonita applications relies heavily on models: a process model (using BPMN standard), a data model for business data management, a WYSIWYG tool for user interface design, and more.

Creating an application in Bonita Studio (the Bonita development environment) requires the following steps:

- graphically design one or several processes using BPMN notation
- define the data model using the Bonita Business Data Management feature (you can of course use your own database if needed)
- create web user interfaces using the Bonita UI Designer (or your preferred web framework)
- define users involved in the process
- configure connectors to integrate Bonita with the information system (e.g. to send an email, call a web service, and more.)

We will cover these steps in this getting started tutorial so you can get familiar with the concepts behind a Bonita application.

## Overview of the Bonita solution architecture

### Bonita Studio

![Bonita Studio architecture](images/getting-started-tutorial/what-is-bonita/architecture-bonita-studio.png)

Bonita Studio provides everything you need to develop and build a Bonita application. Bonita Studio is a desktop application built on Eclipse.

It provides:

- capabilities to model BPMN (Business Process Modeling Notation) processes
- capabilities to model BDM (Business Data Model)
- capabilities to model user interfaces (UI Designer)
- capabilities to model applications
- an embedded Bonita stack (defined below), exclusively dedicated to local application testing performed by the application developer.

Bonita Studio is not intended for any use other than development. As a consequence, the Bonita stack embedded into the Bonita Studio can not be used for production purposes.

### Bonita stack, runtime and server

![Bonita stack architecture](images/getting-started-tutorial/what-is-bonita/architecture-bonita-stack.png)

The "Bonita stack" refers to all the components you need to deploy in order to make applications available to end users in production. It includes the Bonita runtime and the two database schemas (one for the Bonita Engine and one for business data).

The Bonita runtime includes a single Bonita server in the Bonita Community Edition. In the Bonita Enterprise Edition, the Bonita runtime can include several Bonita servers to create a cluster for high performance and availability.

The Bonita server has two components: the Bonita Engine that manages process execution, and the web portal which provides the end user's and administration user's web interfaces.

The Bonita server is a standalone Java application running in a Java application server installed on a host (a machine, a virtual machine, a cloud instance, a container like Docker, etc).

Now that you have the global picture of Bonita, you are ready to move on to the next step: [download and install Bonita Studio](bonita-studio-download-installation.md).
