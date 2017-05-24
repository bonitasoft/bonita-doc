# Key concepts

This page introduces some of the key concepts related to designing an application or process with Bonita, and the terminology used in Bonita Studio.

## Applications and processes

An application is a collection of processes, user interfaces (called pages) and shared data. A page that is a user interface to a process is called a form. 

You can use Bonita to create a process-based application or a process that is accessed only through Bonita Portal. A process that is in an application is also visible in the Portal.

## Process definition

A process is a sequence of tasks performed by people (human tasks) or automatically (service tasks). The sequence has a start and an end, and can contain decision points, known as gateways. A process definition is constructed in Bonita Studio as a flow diagram. You add data, gateways, connectors, scripts and expressions to control the process flow, and configure the process components and dependencies. The diagram uses the Business Process Model and Notation, which is the standard for defining a business process. Version 2.0, BPMN 2.0, was published in January 2011\.

If a process is visible to users, you can use the UI designer to design forms to input data and forms to display information.  
The result is a process that can be deployed to Bonita Portal.

## Business data

A business application exists to support a business goal, either a specific goal related to your business, such as parts reordering in a manufacturing plant, or a generic goal, such as improving efficiency through an automated expense reporting system.  
The key data in any application or process is business data. Because this data is probably used by more than one process, it needs to be stored at a global level, with two options:
   - If business data is not used by other applications than Bonita,  you can store it in Bonita Business Data database, that provides fast access and easy exchange between process and User Interfaces.
   - If it is global company data, Bonita can access it in your data source, so you do not need to copy or duplicate the data.  
Some processes also manipulate data that is only useful within the process itself. In this case, Bonita stores it in its local database or in memory.

## Business Data Modelling

Bonita supports modelling and persistence of business objects that applications and processes interact with.   
Such data can either be automatically stored in a database dedicated to business data, or can reside in existing information system databases, in which case the interaction is by connector.

## Connectors

A connector is a link between a process and an external information system such as a database or information service. A number of standard connectors are provided, and you can create additional connectors if required.   
Separating the connector configuration and implementation from the process means it is easier to update or replace the connector without having to modify the process. You can use the same connector in more than one process.  
See the [Connectivity overview](connectivity-overview.md) for details.

## Organization

Your organization is the set of all the users who play a part in all the applications and processes that your business uses. The organization is stored in Bonita Engine and can be managed in Bonita Portal.   
Typically, the organization corresponds to the hierarchy of teams within your business.  
If your clients and suppliers have access to your processes, those users must also be included in the organization.   
You can also feed Bonita Portal by synchronizing with an external LDAP directory.   
During process modelling, you need to create a draft organization in Bonita Studio with the main entities (groups, roles) to map it to process actors.  
See the [Organization overview](organization-overview.md) for details.

## Actors

An actor is a placeholder specified in the process definition for the users. Using an actor instead of specifying real people directly makes the process definition more flexible: when the list of users changes, you change only the process configuration, which can be done while the process is running. You can also use the same process definition with completely different sets of users, for example, if a service business sells a process to several clients.   
Making the connection between the actor definition and the set of users is called actor mapping.  
See [Configure a test organization](organization-management-in-bonita-bpm-studio.md) and [actors](actors.md) for details.

## Environments and parameters

An environment (available in the Bonita Performance, Efficiency, and Teamwork editions) is the context in which a process will run.  
There are three standard environments: Local, Qualification, and Production. You can define additional environments that are useful when designing and deploying a process for your business.  
A parameter is a piece of information in a process that has a value specific to the environment. See [Environments](environments.md) and [Parameters](parameters.md) for more details.
