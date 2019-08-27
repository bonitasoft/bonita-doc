# Create web user interfaces (forms)

User usually drive process execution using web user interfaces. Bonita provide a solution, the UI Designer, to easily create such interfaces.

The standard workflow would be to:
- create the Business Data Model
- add business variables to your process definition
- generate contracts based on business variables
- generate Bonita forms based on contracts

As we already did the first three steps, it is now time to create the forms.

Let start with the process instantiation form:
- select the process pool
- go in *Execution > Instantiation form*
- click on the pencil icon next to "Target form". It will create a new form based on the contract (if form does not exist) and open the UI Designer in your web browser
- you can rename the form from "newForm" to "submitClaimForm"
- click on "Save" button to save the form with its new name

You can customize the form appearance. For example you can switch from a one line text widget to a text area:
- select the "Description" widget by clicking on it
- in the widget properties on the right hand side of the window click on "..." icon and select "Switch..."
- in the drop down list select "Text Area"
- click on "Show properties" button
- click on "Switch" button
- click on "Save" button to save your modifications

You can now get back to the Studio and create the form for the "Review and answer claim" user task:
- select the task
- go in *Execution > Form*
- click on the pencil icon next to "Target form". It will create a new form based on the contract (if form does not exist) and open the UI Designer in your web browser
- answer yes to the question. This will include in the form widgets to view all the attributes of the business variable
- you can rename the form from "newForm" to "reviewAndAnswerForm"
- select the "Satisfaction Level" widget and use delete key to remove it as we don't want it in this form
- click on "Save" button to save your modifications

Do the same set of operations with the form for "Read the answer and rate it" task:
- set the form name to "readAnswerAndRateItForm"
- don't remove any widget as we want to display both the claim description and the answer and allow the user to provide a satisfaction level.

You can now execute this new process version and see that the form still offer you the option to capture the data required by the contract but also display the data provided at process start or in previous steps.

In the next chapter you will make sure that task can only be performed by appropriate users.
