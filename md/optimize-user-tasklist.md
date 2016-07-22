# How to optimize the user task list

:::info
**Note**: This howto applies to the legacy task list -Bonita BPM 6.0 to 6.5.x versions- as well as the [new task list - from Bonita BPM 7.3 and above](user-task-list.md).
:::

Goal: Leverage Studio and task list configuration to optimize user comfort and efficiency: 
- Make each task unique by inserting case information in task name and task description.
- Switch search option from "starts by" applied to the string as a whole to "word-based" search ("starts by" for each word in the string).

During process modeling, a task is given a generic definition in the process definition, so its name is generic, such as "Contract validation". This is useful for development.  
Within a process instance (case), this task name must be contextualized with business information specific to the case so that, in the user task list, all tasks don't look the same. This allows users to efficiently identify and pick the right task in the list.

## Create the process example

This howto uses the same process example than in [How to control and validate forms in the UI Designer](manage-control-in-forms.md): a leave request management process.

### Pool 

First, create a new diagram. Then model the process in the first pool: 
1. Rename the pool into "leave request management"
2. Rename the lane into "Manager"
3. Rename the start event into "New request request"
3. Since the instantiation of a new case (new leave request submission) happens at pool level, just rename the default _human task_ into "Request validation"
4. Add a _terminate end event_ that you can rename "Happy end".  

The pool is shown here:

![Process](images/leave_request_management_process.png)

### Data model

Then, define a business object that will hold the leave requests data when the process instances are ongoing, and store it when the instances are archived: 
1. Go to the Development > Business Data Model > Manage option menu
2. Add a business object named _LeaveRequest_, with 4 attributes:
_startDate_: first working day taken as vacation, as a DATE, set it as mandatory
_endDate_: last working day taken as vacation, as a DATE, set it as mandatory
_requesterName_: employee who submits the leave request, as a STRING
_status_: whether the task is "submitted" or "approved", as a STRING
3. Click **Finish**

### Variables 

To allow this business object to be instantiated with each process instance, create a business variable at pool level:
1. In the **Data** pane of the pool, **Pool variables** tab, **Business variables** table, **Add** a business variable named _leaveRequest_
2. For **Business object**, choose **LeaveRequest** (the default value if you only have one object)
3. Click **Finish**

### Process instantiation contract 

To make sure the process gets the information it needs to start a new instance, create a contract:
1. In the **Execution** pane > **Contract** tab, click on **Add from data...** to generate the contract inputs from the business variable
2. Choose the **Business variable** option, and then the **leaveRequest** variable
3. Click **Next**
4. Unselect **requesterName** and **status** as the process doesn't need this information from the form to instantiate  
   Business data attributes mapped to a contract input are automatically instantiated thanks to a script generated along with the contract inputs themselves
5. Click **Preview** to view this script, and then **Finish**, **OK** and **OK**
6. In the **Execution** pane > **Contract** tab, a complex contract input is created, mapped to the selected attributes of the **leaveRequest** business variable, as shown here:

![Contract](images/contract_for_tasklist.png)  

To manually set the default value of the attributes _status_ and _requesterName_ when the leave request is submitted, edit the script:
 
1. Go back to the **Data** pane, **Pool variables** tab, **Business variables** table
2. Click on **leaveRequest** and on the **Edit...** button
3. Close to the **Default value** field, click on the pencil icon
4. In the script, add: `leaveRequestVar.status = "submitted"`, and  
``` groovy
    def initiator = BonitaUsers.getProcessInstanceInitiator(apiAccessor,processInstanceId);
    leaveRequestVar.requesterName = "$initiator.firstName $initiator.lastName"
```
5. Click **OK** and **OK**

### Instantiation form

The Studio generates a form based on the contract requirements, for test purposes only. 
This is the form used in this howto, to save some time.

### "Request validation" task 

For the sake of this howto, do not specify any contract of form on the task, but just create an operation to switch the request status from "submitted" to "validated" when the task is completed. 
1. Go to the **Execution** pane > **Operations** tab
2. Click on **Add**
3. In the left operand, select _leaveRequest_
4. As operator, select **Use a Java method** and then **setStatus(String) - void**
5. Click **OK**
6. In the right operand, write _approved_

The operation is shown here:

![Operation on status](images/operation_on_status.png)

## Configure the display options

For each case (request), the task should display the requester's name, the request start date, end date, and status. After the task is submitted, the status will change and the task can also display the validator's name.  

As a good practice, we advise to display static information that defines the task in the **Display name** field, and dynamic information that appear, disappear or changes over the life of the case in the **Display description** and **Description after completion** fields. Therefore: 
- Start date, end date, and requester's name will be managed in the task name
- Status and validator's name will be managed in the description

To configure the display options:
1. Select the **Request validation** task
2. Go to **General** pane > **Portal** tab.

### Display name

The task display name will be made of the requester's first name, last name, and the leave start date and end date.
1. Next to the **Display name** field, click the **pencil** icon to display the expression editor.
2. Select the **Script** expression
3. Give it a name: **Validation display name**
4. Type the script. Make sure the result of your script will not exceed 255 characters.

```groovy
return "Leave validation for ${leaveRequest.requesterName}: ${leaveRequest.startDate.format('yyyy-M-d')} - ${leaveRequest.endDate.format('yyyy-M-d')}".toString()
```

5. Click **OK**.

### Display description 

As a dynamic information, status is addressed here:
1. Next to the **Display description** field, click the **pencil** icon to display the expression editor.
2. Select the **Script** expression type
3. Give it a name: **Validation display description**
4. Type the script. Make sure the result of your script will not exceed 255 characters.

```groovy
return "A leave request has been ${leaveRequest.status}".toString()
```

5. Click **OK**.

### Description after completion

To display the new status once the request is approved as well as the validator's name in the **Done tasks** field:
1. Next to the **Description after completion** field, click the **pencil** icon to display the expression editor.
2. Select the **Script** expression type
3. Give it a name: **Validation desc after completion**
4. Type the script. Again, make sure the result of your script will not exceed 255 characters.

```groovy
import com.bonitasoft.engine.api.APIAccessor;

def executedBy = BonitaUsers.getUser(apiAccessor, apiAccessor.processAPI.getHumanTaskInstance(activityInstanceId).executedBy);
return "The leave request has been ${leaveRequest.status} by ${executedBy.firstName} ${executedBy.lastName}".toString()
```

5. Click **OK**

## View it in the task list

1. Save the diagram
2. Run the pool
3. Fill out the default instantiation form with two dates
4. Click on **Start**
Once you are sent to the task list, you can see that the task name is contextualized.  
It is computed once, when the task becomes ready. 

:::info
**Note:** The following set of instructions only applies to the task list in Bonita BPM 7.3.0 and above. In earlier versions, the **Description** field is displayed by default.
:::

To display the **Description** column and view the _submitted_ status:
1. Click on the **settings wheel** icon on the top right of the list
2. Select **Description**
3. Click outside the settings box
The table settings have changed to display the **Description** column. It will be stored in the local storage of the browser
4. Click on the **Done tasks** filter
5. Configure your list to display the **Description** field
6. Come back to the **To do** filter. 

You can see the description field, showing the status: "submitted".
1. Perform the task.
2. Go to the **Done tasks** filter
The **Description** column now shows the description after completion, with an edited status as well as the name of who performed the task.

If you don't use the description after completion field, the **Description** column will still show the "display description" information.

Unlike the "technical" name and description of a task in the Studio, which are useful for development, information for each task as _display name_, _display description_ and _description after completion_ will be unique for each case in the task list, to make the task list more efficient for the users.

## Search a task name based on word-based search

To allow users to efficiently search by task name, you can configure the search option: from _starts by_ (the beginning of the whole task name string), you can switch to _word-based search_ (the beginning of every word in the task name).

To do so, go to [word-based search](using-list-and-search-methods.md#word_based_search).

:::info
**Note:** Setting the word-based search may result in lesser performance, with some delay experienced by users on the display of search results. Turning this feature on requires some testing on your environment.
:::
