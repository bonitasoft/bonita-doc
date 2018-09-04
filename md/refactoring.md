# Refactoring

Refactoring a process definition means changing the name of a process element without changing the external behaviour. Typically, this is done when a process definition is almost complete, to improve readability and maintainability, or to adopt a new set of [naming conventions](naming-conventions.md). In Bonita Studio, when you change the name of an element, the change is propagated to all the places that reference this element. If the change is simple (for example, you rename a variable used in transitions), the change is made automatically. If the change is more complex, such as renaming a variable used in a Groovy script, Bonita Studio displays the update for you to validate before it is implemented.Refactoring is also used when you delete a process element. Expressions using the element directly will be cleared and expressions having dependency on it will clear the dependency and replace it by a blank placeholder in Groovy scripts.

## Elements and scope

Refactoring applies to the following types of element:

* variable
* form field
* actor
* parameter
* document
* contract input
* business variable
* page
* search index (in Bonita Subscription Pack editions Efficiency, Performance and Enterprise)

When you change the name of an element of one of these types, the name is changed throughout the process definition, including inside scripts and connector instance definitions.

## Scope

The scope of refactoring is the process. If you rename one of the items above in a process, Bonita Studio detects and updates all the places in the same process where it is used. The refactoring does not extend outside the process.

If your business process includes a call activity subprocess with mapped data, you need to modify the data mapping manually, checking both the parent process and the subprocess. If you also plan to refactor the subprocess, you should refactor it first, before making any manual changes to data mapping. 

## Limitations

Refactoring is not available for the following process definition elements:

* 7.x pages do not reflect modifications of business data, documents and contract inputs.
* "List of options" elements are not managed by refactoring. If you rename an option, you need to manually update any widgets that use this option as initial value.
* Refactoring cannot be used to modify the type of an element, It is limited to renaming.
* Expression dependencies are not recomputed in the Groovy script comparison editor. This means that you need to manually go back to each expression dependency and uncheck/check the "automatic dependency resolution" if you added a new element in the Groovy script comparison editor.

## Example

Suppose you have a process that loops to collect feedback on a new product feature, and has an process variable called _count_ that is used to count the number of people who complete the survey form. The variable is used in the following places in the process definition:

* It is set to zero when a process instance is created.
* It is incremented using an operation when a user submits a survey form, that is, it is used as the loop counter.
* It is used in script that creates the content for a daily report sent by email to the feature owner, reporting how many survey forms have been submitted. This report is sent using the email connector, and the script is part of the connector definition.

For clarity, it would be better to have a more meaningful name for this variable, so you want to change the name from _count_ to _numberOfSurveyFormsReturned_:

1. Select the pool and go to the **Details** panel, **General** pane, **Data** panel.
2. In the list of process-level variables, select _count_ and click **_Edit_**.
3. In the Edit popup, enter the new name, and click **_OK_**.
4. The variable name is automatically updated in the operation to increment the value when a survey form is submitted.
5. A popup displays the connector definition content script that uses _count_ and shows the script with the new name. Click **_Finish_** to confirm that you want the script to be changed.

**Note**: If you click **_Cancel_** to refuse the proposed change to the script or code displayed, the changes that were made automatically are cancelled. Modification that you saved in previous scripts for the same name change are also cancelled, even if you have saved them. If you use Ctrl+Z to cancel the change, you need to enter it twice: the first Ctrl+Z cancels the change in the widget, and the second one cancels the change in the related scripts and code.
