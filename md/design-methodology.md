# Design methodology

This page presents a summary of the phases in creating a process-based application using Bonita:

## Setting objectives

Objectives are a vital part of any project to implement or improve a business application or process. If you set measurable objectives, you can set performance indicators in a process to monitor how well it meets objectives.

Objectives can be qualitative or quantitative, and should cover the expected lifecycle of the process. For example, if you want to create an automated process to replace an existing process that uses paper forms, you could define objectives for how long it takes to fill out a form in the initial roll-out period, and after 6 months when users have become familiar with the new system. You could also define an objective for the savings achieved by no longer storing paper documents, or quality objectives that the process must
meet before deployment. 

Bonita will not help you to define the objectives for a project, but it will help you create metrics to check that your objectives are met.

## Defining application scope

Defining the application scope means defining the people who use it and their usage patterns, the information concerned, the level of security needed, and connections to external systems.

* Application or process: Is the process completely automatic with no human users? Does the process interact with other processes that have human users?   
If there is no human interaction, there is no need to create an application.
* People: Who owns the application? Who owns the processes in the application? Who uses the application and processes? Who are the key
users? Who just needs to know the application exists? When and how is it used? Is it used frequently, on a schedule, in emergencies? Is
it used by just one person or by many people at the same time?
* Information: What business information does the application need, and what information does it deliver? What are the expected results of the processes, and of the application?
* Security: What kind of controls are needed for people using the application? Is a simple login sufficient?
* Connections: What connections to external systems are needed? Does the application need to access information in a database, to send email, or to use some other business application? Do these external systems have APIs accessible by Java?

## Drawing the process diagram

Using Bonita Studio, you can quickly sketch out the process flow, and create a diagram of the starting points, main steps, branches, decision points, and end points. Do this for each process in the application. At this stage, get agreement from the process owner and the key users before going further. 

Things to think about:

* Most business processes have a single start and a single end, but it is possible to have multiple starts and ends.
* If there are activities that happen in parallel, use symmetric gates to map out the beginning and end of the parallel phases of the process.

There is no requirement to create a diagram for an application, because it is not executable in the same way as a process.  
However, you should create a specification so that you can get agreement from the application owner and key users. One option is to use the Bonita Studio to create a diagram showing the usage patterns.  
This diagram would not be executable, and should not be exported as a /bar file, nor deployed. 

## Defining the process details

In the development phase of each process in an application, there are several aspects to define:

* Data. Define the inputs and outputs of each step. Define the data model, sourcing and storage, and data types. 
* Step details. Make sure each step is the correct type, and has a descriptive name. 
* Transition and flow details. Make sure all transitions have a descriptive label. Make sure there is always a default path at each branch in the process. If the process contains a loop on a step, make sure there is a maximum number of iterations defined.
* Connectors. Attach connectors to the relevant steps. Note that it can be more efficient to split steps with both user activity and connector activity into two steps, a human task for the user and a system task for the connector. Configure each connector. 
* Actors. Define the actor for each step, applying an actor filter where necessary.
* Monitoring: Specify the key performance indicators (KPIs) to be collected. These will enable you to monitor the application using a business activity monitoring (BAM) application. Make sure that the KPIs will provide the data required to monitor the objectives you defined for the process.
* Exception handling: Plan for how errors and unexpected events will be handled. Consider whether it is necessary to stop the case or process, or whether the case can take an alternate path. Decide whether to use event sub-processes.
* Process maintainability. Add annotations to explain the process. Make sure all elements have descriptive labels. Generate the process document and check it.

## Designing the application

When the application definition and process definitions are complete, you will have defined what interaction users have with application pages and with each process task. Create the pages and forms needed. 

Use the Bonita Studio UI designer to create pages and forms by manipulating widgets.  
You can add, remove, and reorder widgets, and you can change the appearance of a form.

## Testing

Test each process individually before testing the application as a whole.

You can validate a process definition in Bonita Studio, in teh **Details** panel, **Validation status** tab. The validation status 
indicates any errors or omissions in the definition. Correct any errors flagged in validation before testing the process.

Bonita Studio includes an environment for testing a process locally, before deployment. You can test the process without connectors by clicking **_Debug_**, test each connector independently using teh connector wizard **_Test_** button, then run the process by clicking **_Debug_** to test it with connectors. You need to [configure](process-configuration-overview.md) the process before testing it locally.

Bonita Studio contains an example organization, ACME, which you can use for testing a process or application.

When local testing is complete, depending on the environment where the application will run, you might also need to test the processes in a realistic system before putting the application into production, or perhaps to put it into production but for a limited number of users or cases.

## Deployment

When testing is complete, the processes are ready to be deployed in Bonita Portal and the application is ready to be put into production. You need to [configure](process-configuration-overview.md) each process for deployment before putting it into production.

## Specifying the organization

Before you can run a process in production, you need to define your organization with entries for all process users, groups, and roles. You also need to map the process actors to the real people who will carry out process steps.   
You can [manage your organization in Bonita Portal](organization-in-bonita-bpm-portal-overview.md) for a production system.   
While you are in the testing phase, you can [manage the organization in Bonita Studio](organization-management-in-bonita-bpm-studio.md).

## Monitoring and improvement

After deployment, you can monitor usage and collect key performance indicators, to assess how well the process is meeting the objectives you defined.
