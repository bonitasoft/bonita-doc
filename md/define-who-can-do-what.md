# Define who can do what

So far when you execute the process you were using a single user (username: _walter.bates_, password: _bpm_) that can perform all the user tasks. In a scenario closer to a real life use case, customers (who can submit claims), employees (who answer claims) and manager of the user who provide the answer (that need to deal with unsatisfied customers) are all different groups of users.

First step in the configuration of who can do what is to create lanes with in our pool. A lane is used to group together user tasks that should be done by a same set of users. We already have one default lane for the employees, let's add one for the customer and one for the manager:
1. In the Studio, in the palette on the left hand side of the diagram select the **lane** icon
1. Click inside the diagram to add the lane. Do this twice to have a total of three lane
1. Select the employee lane and click on the down arrow icon to move it as the central lane
1. Select the _Lane1_, go to **General > Lane** tab and rename it _Customer lane_
1. Select the _Lane2_, go to **General > Lane** and rename it _Manager lane_
1. Select the start event _Submit claim_ and move it (with a drag and drop) to the _Customer lane_. Do the same for the task "Read the answer and rate it"
- select the "Deal with unsatisfied customer" task and move it to the "Manager lane". Do the same with the end event "End client unsatisfied"

Now we need to define "actors", one for each lane and map them to the lane they belong to:
- select the pool
- go in *General > Actors*
- click on "Add" button
- click on the default name of the actor ("Actor1") and change it to: "Customer actor"
- do it again to create "Manager actor"
- select the "Customer actor" and click on "Set as initiator" button. This will add a flag on this actor to mark it as the one who defined who can start the process
- select the "Customer lane" (click on the lane name), go in *General > Actors* and in the drop down list select "Customer actor"
- do the same for the "Manager lane" with the "Manager actor"

Actor are just identifier, in order to define the actual user we need to configure the actors and map them with groups, roles , users... of the organization. We will use Bonita Acme test organization for this example:
- in the Studio tool bar, click on the wrench icon
- select the "Employee actor"
- click on the "Groups..." button
- unselect /acme
- select /acme/production/services. We will use this group of users to act as support team in charge of answering to claims. In the test organization two users belong to this group: mauro.zetticci and thomas.wallis. Manager of both user is: michael.morrison.
- click on "Finish" button
- select "Customer actor"
- click on the "Groups..." button
- select /acme/hr. We will use this group of users to act as customers who can submit claims. In the test organization three users belong to this group: walter.bates, helen.kelly and april.sanchez.
- click on "Finish" button
- select "Manager actor"
- click on "Roles..." button
- select the "member". All users in the test organization have this role. But this does not really mater as this actor mapping will be override later in our configuration.
- click on "Finish" button

At this stage if you try to run the process you will see that walter.bates can no longer perform the task "Review and answer claim". You need to logout from Bonita Portal (click on "Walter Bates" in top right corner and select "Logout") and login with for example thomas.wallis (password: bpm) to be able to view the task. And you need to login back with walter.bates account to be able to view the task that let you read the provided answer.

Currently the task "Read the answer and rate it" is available to all users in the group /acme/hr whereas it should only be available to the user who start the process (walter.bates). In the same way, the task "Deal with unsatisfied customer" will be available to every one when it should only be available to the manager of the user who did the task "Review and answer claim". To address that we will configure actor filters:
- select the "Customer lane"
- go in *General > Actors*
- click on the "Set..." button next to actor filter
- in the list select "Initiator"
- click on "Next" button
- set the name: "User who submit the claim"
- click on "Finish" button
- now select the manager lane
- follow the same step but select the "user-manager" actor filter
- set the name: "Manager of the user who provided answer"
- click on "Next" button
- click on the pencil icon
- select "Script" and paste the following script (it will search for the id of the user who performed the task "Review and answer claim"):
``` groovy
import org.bonitasoft.engine.bpm.flownode.ArchivedHumanTaskInstance
import org.bonitasoft.engine.bpm.flownode.ArchivedHumanTaskInstanceSearchDescriptor
import org.bonitasoft.engine.search.SearchOptionsBuilder
import org.bonitasoft.engine.search.SearchResult

def taskName = 'Review and answer claim'

final SearchOptionsBuilder searchOptionsBuilder = new SearchOptionsBuilder(0, 1)
.filter(ArchivedHumanTaskInstanceSearchDescriptor.PARENT_PROCESS_INSTANCE_ID, processInstanceId)
.filter(ArchivedHumanTaskInstanceSearchDescriptor.NAME, taskName).filter(ArchivedHumanTaskInstanceSearchDescriptor.TERMINAL, true)

SearchResult<ArchivedHumanTaskInstance> searchResult = apiAccessor.processAPI.searchArchivedHumanTasks(searchOptionsBuilder.done())

final List<ArchivedHumanTaskInstance> tasks = searchResult.result

tasks.first().executedBy`
```
- click on "OK"
- click on "Finish"


Now if you run the process again, only walter.bates should have access to "Read the answer and rate it" and only michael.morrison should have access to "Deal with unsatisfied customer" (as he is the manager of both user who can do the task "Review and answer claim").

Now we have a fully customize process that process data and dispatch tasks to appropriate users. The next step will be to make it interact with the outside world.
