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
2. Go to **Execution > Instantiation form**
3. Click on the pencil icon next to **Target form**. It will create a new form based on the contract (if the form does not already exist) and open the UI Designer in your web browser
4. Rename the form from _newForm_ to _submitClaimForm_
5. Click on **Save** button to save the form with its new name

   ![Create process instantiation form based on contract definition](images/getting-started-tutorial/create-web-user-interfaces/create-instantiation-form.gif)<!--{.img-responsive .img-thumbnail}-->

You can customize the form appearance. For example, you can switch from a one line text widget to a text area:

1. Select the _Description_ widget by clicking on it
2. In the **Widget properties**, on the right hand side of the window, click on the **...** icon and select **Switch...**
3. In the drop down list select **Text Area**
4. Click on the **Show properties** button
5. Click on the **Switch** button
6. Click on the **Save** button to save your modifications

   ![Switch to a different widget type](images/getting-started-tutorial/create-web-user-interfaces/switch-widget.gif)<!--{.img-responsive .img-thumbnail}-->

You can now go back to Bonita Studio and create the form for the _Review and answer claim_ user task:

1. Select the task
2. Go to **Execution > Form**
3. Click on the pencil icon next to **Target form**. It will create a new form based on the contract (if the form does not already exist) and open the UI Designer in your web browser
4. Answer **Yes** to the question. This will include widgets to view all the attributes of the business variable in the form
5. Rename the form from _newForm_ to _reviewAndAnswerForm_
6. Select the _Satisfaction Level_ widget and use the delete key to remove it as we don't want it in this form
7. Click on **Save** button to save your modifications

Do the same set of operations with the form for _Read the answer and rate it_ task:

1. Set the form name to _readAnswerAndRateItForm_
2. Don't remove any widgets, as we want to display both the claim description and the answer and allow the user to provide a satisfaction level

You can now execute this new process version and see that the form still offers you the option to capture the data required by the contract, but now also displays the data provided at the process start or in previous steps.

In the [next chapter](define-who-can-do-what.md) you assure that tasks can only be performed by appropriate users.
