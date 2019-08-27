# Start building your application: draw a BPMN process diagram

Now that you have your development environment (i.e. Bonita Studio) up and running you are ready to start building your first Bonita living application.

In this tutorial we will build a claims management solution. Making sure that claims are handle and answer in a timely manner by the appropriate employee(s) can be key to customers satisfaction. It is also a perfect fit for application based on processes and requiring automation. We will of course drastically simplify such application in this getting started tutorial to make sure you can focus on learning about Bonita and not about claims management!


Create a new diagram by clicking *File > New diagram*. The new diagram includes:
- one pool, i.e. one process definition
- one lane inside the pool, more about lanes in a next chapter
- a start event, i.e. the starting point of process execution
- a user task, i.e. a task that need to be performed by a user

and it should look like that:

![Default diagram content](images/getting-started-tutorial/draw-bpmn-diagram/new-default-diagram.png)

Before we continue lets rename our diagram and pool. In the "Project explorer" on the left hand side of the Studio window, select the diagram, do a right click and select *Rename...*. Then enter the new name for the diagram: _ClaimsManagementDiagram_ and for the pool: _ClaimsManagement_.

Now let's rename the start element (i.e. the green disc on the left hand side of the process): select the element in the diagram and at the bottom of the screen in *General > General* tab edit the *Name* attribute and set the value: "Submit claim".

Do the same to rename the default user task "Step1" into "Review and answer claim".

Now we will add an extra task in our process. The easiest way to do that is to select the "Review and answer claim" task, at the border click on the little task icon and drag and drop it on the diagram. This will create a service task with a transition connecting it from the "Review and answer claim" user task. We don't want this task to be automated but rather performed by a user so we need to change the type from service task to user task. To do so, select the task, click on the toolbox icon and select the little user icon. And finally rename the task to: "Read the answer and rate it".

In order to define different path in our process execution we will include an exclusive gateway. This gateway will direct the process execution to a different path based on conditions. Adding an exclusive gateway is done quite the same as adding a task: select the user task "Read the answer and rate it", drag and drop the little diamond shaped gateway icon, and change the gateway type from parallel (the one with the "+" sign) to exclusive (the one with the "x" sign). Finally rename the gateway to: "Satisfaction level".

From the gateway we will have two possibles paths. The first one, if customer satisfaction level is good, is to finish the process. End of a process is identified by an end event, a red disc. Process to add the end event is similar to adding tasks and gateways, select the gateway, drag and drop the event icon and select the event type. You can rename the event to: "End client satisfied".

The second path from the gateway will lead to a user task. Select the "Satisfaction level" gateway and add a new user task as you did previously and name it "Deal with unsatisfied customer".

At this stage you can see a validation error on the gateway. The error is displayed because we didn't define conditions for process execution when it will reach the gateway. So trying to execute such process will failed because process execution engine cannot determine the path to follow. To fix that we will need to define conditions. Conditions are defined on the gateway outgoing transitions (i.e. the arrows going out of the gateway). First select the transition going to the end event, rename it to "Good" and in *General > General* tab check the checkbox "Default flow". This means that if all other conditions we will define are "false" we will follow the one marked as "default". Select the second transition going to the task "Deal with unsatisfied customer", name the transition "Bad", go in *General > General* and type the "Condition" value `true`. In order to make the error goes away you need to refresh the diagram validation: at the bottom of the screen select *Validation status* tab and click on the *Refresh* button. You should have only warnings left.

Congratulations you have now your first valid BPMN process diagram!

You can now easily build, package, deploy and start the execution of this process definition in the Bonita Studio embedded test environment. Just click on the run (i.e. the "play" icon) button in toolbar at the top of the Studio window. It should automatically open the process auto-generated start form in your web browser. A user is logged in by default (username: walter.bates, password: bpm). If you submit the instantiation form it will start a new process instance (or case) and load the user tasks list in Bonita Portal. In the task list you should see the first task of the process. You can do it because, by default, all tests users are candidates to perform the user tasks of a process. In order to perform the task you need first to "claim" it in order to be the only one who can do it among all the candidates. Move your mouse over the task form and click on the "take" button to "claim" it. Now you should be able to click on the "Execute" button. You can click on the "refresh" icon at the top of the task list and you should see the task "Read the answer and rate it" in the list. You can continue the process execution until the end by performing all the tasks. You can also see process execution progress from the overview form tab. Finally you can view process instances information in the "Cases" section of the Bonita Portal. You can switch between "Open cases" and "Archived cases" to either view the ongoing processes instances or the finished ones. Note that if you want to start a second case (i.e. a process instance), you should go into Bonita Portal "Cases" menu and click on the "play" button next to the process definition name. If you click on the "Run" button from the Studio it will clean all information related to process with same name and version including previous cases.

You successfully build and execute your first process. So far it is not very useful as it does not deal with any data and web forms only includes a single submit button. In the next chapter we will define a data model and bind it to our process to save information related to the claim submitted by the user.
