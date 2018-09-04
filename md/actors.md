# Actors

There are two stages to specify who performs a step in a process:

* When the process is designed, the business analyst designates an actor for the step. An actor is a placeholder that defines the theoretical user who will perform the step.
* Before a process is deployed, the actors are mapped to the real users in an organization.

## Define an actor

When you define a process, you define who will carry out a step in the process by specifying an actor. For example, if a step can be done by any member of the HR team, you could call the actor hr, or if a step can only be done by the sales team manager in Europe, you
could call the actor sales\_mgr\_europe.

Typically, an actor is defined for each step in a process, but you can also specify an actor for all steps in a pool or lane. You can
also use an actor filter to specify the logical relationships between actors. For example, in a process to request vacation days, the request step can be carried out by any user, but the approval step must be carried out by the manager of the requesting user.

You can define an actor at pool, lane, or step, and the definitions are related. You must define actors in the order pool, lane, step.

To define actors for a process:

1. Define the actors for the pool:
     1. Select the  pool and go to the **Details** panel, **General** tab, **Actors** pane. If you have already defined any actors, they are shown in the table. 
     2. Click **_Add_**. A new row is added to the table, with a temporary name for the new actor (for example, Actor1). To change the
name, select it and type the name you want to use. You can also add a description.
     3. Repeat step 2 to add all the actors required for the process. You can also remove an actor, by selecting it and clicking **_Remove_**.
     4. Select the actor that will be the initiator of the process cases, and click **_Set as initiator_**. If you do not define an initiator for the pool, the process cannot be started in Bonita Portal. Instead, it will have to be started programmatically.
2. For each lane, define the actor. You can either select an actor that was defined for the pool, by selecting the actor from the drop-down list, or you can use an actor filter.
3. For each step, define the actor. You can use the actor defined for the lane, or specify an actor for the step. To specify an actor for the step, you can either select an actor that was defined for the pool, by selecting the actor from the drop-down list, or you can use an actor filter.

See [Custom User Information in Bonita Studio](custom-user-information-in-bonita-bpm-studio.md)

See [Custom User Information in Bonita Portal](custom-user-information-in-bonita-bpm-portal.md)

## Allowing anonymous users (6.x forms)

If you use 6.x forms, you can configure a process to be started by an anonymous user. For example, on an e-commerce site,
a new user can browse stock and save items to a cart, then register with the site if they want to save
their cart for later or to buy something. This is known as supporting anonymous users. Anonymous users are always process initiators.

To support anonymous users in a process report to the [6.x documentation page](http://documentation.bonitasoft.com/actors-859#Allowing%20anonymous%20users).

## Set the initiator

The initiator is the user who starts a process instance. For a process that is started by a person, you must specify at least one actor to be the initiator. Any user who maps to this actor can then start a process instance. If a process is started automatically (for example on a schedule), it is not necessary to designate an initiator.

## Use an actor filter

To specify an actor filter, click **_Set..._**, choose one of the predefined actor filters from the list, and follow the instructions in the wizard to configure the actor selector. 

To change the configuration of an actor filter, select the actor filter, click **_Edit..._** and modify the information using the wizard.

To delete an actor filter, select the actor filter and click the Erase icon. Note that this does not remove the actor filter from the list of predefined actor filters, just from the process definition.

For information about creating a new actor filter, see [Creating an actor filter](creating-an-actor-filter.md).

## Map an actor

Before a process can be tested, you must map the actors in the process to users in the organization. Before you can do this, you must
[define your organization Bonita Studio](organization-management-in-bonita-bpm-studio.md) and upload it to Bonita Portal.

To map the process actors:

1. Open the process diagram in Bonita Studio, and click **Configure** in the cool bar. The actor mapping dialog is displayed, and
indicates any actors in the process that are not yet mapped.
2. For each unmapped actor, click the actor name to select it. You can then map it to a group, role, membership (that is, a role within a group), or specific user.

When you deploy a process, if you have the same organization definition in Bonita Studio and Bonita Portal, you can map the actors first in Bonita Studio then include the mappings when you build the process for deployment. Otherwise, you can configure the actor mappings in Bonita Portal after the process is deployed, when you resolve the process.

## Update task assignment dynamically

The Bonita Engine API contains a method to re-evaluate the assignment of a task by reapplying the actor mapping any actor filters. 
This means that if there are changes in your organization, you can update any active process instances to assign tasks to the correct people. This is known as [dynamic task assignment](manage-users.md).

## Export or import actor mapping

When you have mapped the actors for a process, you can export the mapping as a file. The exported file is in XML. To export the mapping as a file, open the process diagram in Bonita Studio, click **_Configure_** in the cool bar, and select **Actor mapping**. The actor mapping dialog is displayed. Click **_Export actor mapping as file..._** and specify the name and location of the file to be
created.

You can also import an actor mapping file that was exported from Bonita Studio. To import a mapping file, open the process diagram
in Bonita Studio, click **_Configure_** in the cool bar, and select **Actor mapping**. The actor mapping dialog is displayed. Click **_Import actor mapping file..._** and specify the name and location of the file to be imported. _Warning_: When the actor mapping information is imported, it overrides the existing mappings defined for the process.
