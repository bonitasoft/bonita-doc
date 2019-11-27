# Create web user interfaces (forms)

The user usually drives process execution using web interfaces. Bonita provides a solution, the UI Designer, to easily create such interfaces.

::: info
The standard workflow would be to:
- Create the Business Data Model
- Add business variables to the process definition
- Generate contracts based on business variables
- Generate Bonita forms based on contracts

As we have already done the first three steps, it is now time to create the forms.
:::



Start with the process instantiation form:
1. Select the process pool
1. Go to **Execution > Instantiation form**
1. Click on the pencil icon next to "Target form". It will create a new form based on the contract (if the form does not already exist) and open the UI Designer in your web browser
1. Rename the form from _newForm_ to _submitClaimForm_
1. Click on **Save** button to save the form with its new name

   ![Create process instantiation form based on contract definition](images/getting-started-tutorial/create-web-user-interfaces/create-instantiation-form.gif)

You can customize the form appearance. For example, you can switch from a one line text widget to a text area:
1. Select the _Description_ widget by clicking on it
1. In the **Widget properties**, on the right hand side of the window, click on the **...** icon and select **Switch...**
1. In the drop down list select **Text Area**
1. Click on the **Show properties** button
1. Click on the **Switch** button
1. Click on the **Save** button to save your modifications

   ![Switch to a different widget type](images/getting-started-tutorial/create-web-user-interfaces/switch-widget.gif)

You can now go back to Bonita Studio and create the form for the _Review and answer claim_ user task:
1. Select the task
1. Go to **Execution > Form**
1. Click on the pencil icon next to **Target form**. It will create a new form based on the contract (if the form does not already exist) and open the UI Designer in your web browser
1. Answer **yes** to the question. This will include widgets to view all the attributes of the business variable in the form
1. Rename the form from "newForm" to "reviewAndAnswerForm"
1. Select the _Satisfaction Level_ widget and use the delete key to remove it as we don't want it in this form
1. Click on **Save** button to save your modifications

Do the same set of operations with the form for _Read the answer and rate it_ task:
1. Set the form name to _readAnswerAndRateItForm_
1. Don't remove any widgets, as we want to display both the claim description and the answer and allow the user to provide a satisfaction level

You can now execute this new process version and see that the form still offers you the option to capture the data required by the contract, but now also displays the data provided at the process start or in previous steps.

In the next chapter you assure that tasks can only be performed by appropriate users.
