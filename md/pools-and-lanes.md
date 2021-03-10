# Pools and lanes

This page defines pools and lanes and how they can be configured.

A pool is a container for a process in a diagram.  
A lane is a division of a pool (think of swimlanes in a swimming pool).  
You can use lanes to group elements of a pool that are functionally related.  
Typically, a lane contains all the tasks assigned to an actor.

When you create a new diagram it contains one pool, which contains one lane. You can add other lanes to the pool, and you can add other pools.

For a pool, you can configure the following:

- Name, description, and version number: This information identifies the pool. The name must be unique withing a project. The pool version number is really the process version number. Update the version number when you make major changes to the process. There is no link between the pool version number and the diagram version number.
- Actors: An actor represents the user who will carry out tasks in the pool. [Configure the actors](actors.md) that participate in the process. An actor must be defined at pool level before it can be assigned to a lane or task.
- Data: A variable is a container for data used in the process. [Create the variables](specify-data-in-a-process-definition.md) that will be used in your process. You can also create variables at task or form level.
- Connectors: A connector links a process to an external information source. [Specify the connectors](connectivity-overview.md) used in the process. You can also specify a connector at lane or task level, but if a connector is used more than once it is better to define it at pool level.
- Parameters: A parameter is like a variable but has a value that is fixed for a deployment of a process. [Define the parameters](parameters.md) of your process. 
- Documents: You can attach [documents](documents.md) to a process. List the documents that attached to the process.
- Search: A search key is used in the Portal to find a specific instance of a process. [Specify the search keys](search-index.md) associated with the process.

The items configured for a lane supplement or override those defined for the pool. You only need to configure something at lane level if is not already defined at pool level, or if you want to override the definition. Note that nested lanes are not supported.  

For a lane, you can configure the following:

- Name and description
- Actors: From the actors defined for the pool, [specify the actors](actors.md) assigned to this lane. You can also [configure an actor filter](actors.md) to make the actor assignment more specific.
- Data: [Define the variables](specify-data-in-a-process-definition.md) needed in the lane. You can also define variables as task level.
- Connectors: [Specify the connectors](connectivity-overview.md) used in the lane. You can also specify a connector at task level, but if a connector is used more than once it is better to define it at pool or lane level.
- Parameters (Enterprise, Performance, Efficiency, and Teamwork editions): [Define the parameters](parameters.md) of the lane. A parameter is like a variable but has a value that is fixed for a deployment of a process.
- Documents: List the [documents](documents.md) that are attached to the process.
