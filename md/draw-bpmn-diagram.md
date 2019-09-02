# Start building your application: draw a BPMN process diagram

Now that you have your development environment (i.e. Bonita Studio) up and running you are ready to start building your first Bonita living application.

In this tutorial we will build a claims management solution. Making sure that claims are handled and answered in a timely manner by the appropriate employee(s) can be key to customers satisfaction. It is also a perfect fit for an application based on processes and requiring automation. We will of course drastically simplify such an application in this getting started tutorial to make sure you can focus on learning about Bonita and not about claims management!

Here is an overview of process execution:
- The process will be started by a customer who submit a claim, a simple text description in our example.
- Next an employee will review the claim description and provide an answer.
- The customer will be able to review the answer and provide a satisfaction rating.
- If the rating is equal or above 3 the process will finish after customer read the answer.
- If the rating is lower than 3 an extra task will be assigned to the manager of the employee in order to deal with this customer who is not really satisfied. Once this task if done process will finish.

::: warning
We will have an iterative approach in the process development. Meaning that in first iteration we will have a few limitations:
- a single user will perform all the tasks
- we won't collect data from user
- process will follow a single path: the one for unsatisfied customer

As we introduce data in our process definition and configure actors, user will be able to input data in web forms, process will follow paths depending on data value and different users will be involved.
:::

## Create the process diagram

Create a new diagram:
1. In Bonita Studio menu click on **File > New diagram**.


The new diagram includes:
- One pool: one process definition
- One lane inside the pool: lane default name is _Employee lane_ (more about lanes in a next chapter)
- A start event: the starting point of process execution
- A user task: a task (or step) that needs to be performed by a user

and it should look like that:

![Default diagram content](images/getting-started-tutorial/draw-bpmn-diagram/new-default-diagram.png)

Before we continue lets rename our diagram and pool:
1. In the **Project explorer** on the left hand side of the Studio window, select the diagram _MyDiagram-1.0.proc_
1. Do a right click and select **Rename...**

   ![Rename contextual menu](images/getting-started-tutorial/draw-bpmn-diagram/rename.png)

1. In the pop-up window enter the new name for the diagram: _ClaimsManagementDiagram_ and for the pool: _ClaimsManagement_

   ![Choose a new name and version pop-up window](images/getting-started-tutorial/draw-bpmn-diagram/choose-new-name-version.png)

Now let's rename the start event (i.e. the green disc on the left hand side of the process):
1. Select the start event in the diagram
1. At the bottom of the Studio screen go in **General > General** tab
1. Edit the **Name** attribute and set the value: _Submit claim_

   ![Rename start event](images/getting-started-tutorial/draw-bpmn-diagram/rename-start-event.png)

Also rename the default user task:
1. Select the user task _Step1_
1. At the bottom of the Studio screen go in **General > General** tab
1. Edit the **Name** attribute and set the value: _Review and answer claim_

Now we will add an extra task in our process:
1. Select the _Review and answer claim_ task
1. At the border of the selected task, click on the task icon and drag and drop it on the diagram
1. Make sure that newly added task is selected
1. Click on the toolbox icon
1. Select the user icon
1. Rename the task to: _Read the answer and rate it_

   ![Add user task](images/getting-started-tutorial/draw-bpmn-diagram/add-task.gif)

In order to define different path in our process execution we will include an exclusive gateway. This gateway will direct the process execution to a different path based on conditions. Adding an exclusive gateway is done quite the same as adding a task:
1. Select the user task _Read the answer and rate it_
1. Drag and drop the diamond shaped gateway icon
1. Click on the toolbox icon
1. Change the gateway type from parallel (the one with the **+** sign) to exclusive (the one with the **x** sign)

   ![Switch from parallel to inclusive gateway](images/getting-started-tutorial/draw-bpmn-diagram/switch-from-parallel-to-exclusive-gateway.png)

1. Rename the gateway to: _Satisfaction level_

From the gateway we will have two possibles paths. The first one, if customer satisfaction level is good, is to finish the process. End of a process is identified by an end event, a red disc. Process to add the end event is similar to adding tasks and gateways:
1. Select the gateway
1. Drag and drop the event icon (the disc icon)
1. Select the end event type (red disc icon)

   ![Event type selection: end event](images/getting-started-tutorial/draw-bpmn-diagram/event-type-selection.png)

1. Rename the event to: _End client satisfied_

The second path from the gateway will lead to a user task:
1. Select the _Satisfaction level_ gateway
1. Drag and drop the task icon
1. Click on the toolbox icon
1. Select the user icon
1. Rename the task _Deal with unsatisfied customer_

And from this _Deal with unsatisfied customer_ we need to go to second end event:
1. Select the _Deal with unsatisfied customer_ user task
1. Drag and drop the event icon (the disc icon)
1. Select the end event type (red disc icon)
1. Rename the event to: _End client unsatisfied_

Your process diagram should be like this:
![Process diagram](images/getting-started-tutorial/draw-bpmn-diagram/process-diagram-before-transitions-configuration.png)

::: info
At this stage you can see a validation error on the gateway. The error is displayed because we didn't define conditions for process execution when it will reach the gateway. So trying to execute such process will failed because process execution engine cannot determine the path to follow.
:::

We need to configure the conditions required to define the path to follow when executing the process. Conditions are defined on the gateway outgoing transitions (i.e. the arrows going out of the gateway):
1. Select the transition going to the end event
1. Name it to _Good_
1. Go in **General > General** tab
1. Check the checkbox **Default flow**
   
   ![Transitions names and conditions configuration](images/getting-started-tutorial/draw-bpmn-diagram/transitions-name-and-condition.gif)

::: info
**Default flow** means that the transition will be activated only if all other conditions configured on gateway outgoing transitions are _false_ (boolean value).
:::

We need to configure the condition on the transition from the gateway to the _Deal with unsatisfied customer_ task:
1. Select the transition going to the task _Deal with unsatisfied customer_
1. Name the transition _Bad_
1. Go in **General > General** tab
1. In **Condition** type the value _true_

::: warning
Due to the static value _true_, when running this process version we will always go through the _Deal with unsatisfied customer_ task.
:::

::: info
In order to make the error goes away you need to refresh the diagram validation: at the bottom of the screen select **Validation status** tab and click on the **Refresh** button. You should have only five warnings left.
:::

Congratulations you have now your first valid BPMN process diagram!

## Run your process

You can now easily build, package, deploy and start the execution of this process definition in the Bonita Studio embedded test environment:
1. Click on the **Run** button ![Run button](images/getting-started-tutorial/draw-bpmn-diagram/run.png) in toolbar at the top of the Studio window
1. On the instantiation form click on the **Start** button, the process instance is started and you are redirected to the Bonita Portal tasks list
1. Move your mouse over the _Review and answer claim_ form on the right hand side of the Portal and click on the **Take** button to "claim" the task
1. Click on the **Execute** button to actually perform the task and move the process execution forward
1. Click on the **Refresh** button ![Refresh button](images/getting-started-tutorial/draw-bpmn-diagram/refresh.png) at the top of the task list to update it
1. Click on the **Overview** tab on the right hand side to see the process execution overview form with information about process execution
1. Click on the **Form** tab to get back to the _Read the answer and rate it_ user task form
1. You can click on **Take** and execute for both _Read the answer and rate it_ and _Deal with unsatisfied customer_ to finish the process execution
1. In Portal top menu, click on **Cases** ![Cases button](images/getting-started-tutorial/draw-bpmn-diagram/cases.png)
1. Click on **Archived cases** tab
1. Click on the **View case overview** action (i.e. the "eye" icon) to display the overview form with information about process execution


::: info
 When you click on the **Run** button the process definition and its dependencies are built, packaged and deployed in the Bonita Studio test environment. A user is logged in by default (username: _walter.bates_, password: _bpm_) and the process auto-generated start form is opened in your web browser. If you submit the instantiation form it will start a new process instance (or case) and load the user tasks list in Bonita Portal. In the task list, you can't immediately submit a user task because, by default, all users (of the test organization) are candidates to perform the tasks of the process. In order to perform the task you need first to "claim" it in order to be the only one who can do it among all the candidates.
 :::
 
::: info
You can view process instances information in the [**Cases**](cases.md) section of the Bonita Portal. You can switch between **Open cases** and **Archived cases** to either view the ongoing processes instances or the finished ones. Note that if you want to start a second case (i.e. a process instance), you should go into Bonita Portal **Processes** menu and click on the **Start a new case** button (i.e. the "play" icon in **Action** column) next to the process definition name. If you click on the **Run** button from the Studio it will clean all information related to process with same name and version including previous cases. Note that if you did any modifications to your project your probably want to click on the **Run** button to make sure that the latest version is deployed.
:::

You successfully build and execute your first process. So far it is not very useful as it does not deal with any data and web forms only include a single submit button. In the next chapters we will [define a business data model](define-business-data-model.md) and bind it to our process to save information related to the claim submitted by the user.
