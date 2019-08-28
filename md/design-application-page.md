# Design an application page

So far with a process, data, forms and connectors we build a fully functional software solution to our need of managing claims. But what if we want to have a dashboard with all ongoing claims? Such dashboard is not a process, you should not have to "start" it in order to view it. Bonita applications is the answer to such need. And the first of build an application is to create pages.

Pages in Bonita are a lot like forms: they are created with the UI Designer with the same sets of widgets. The main difference is that they are not bind with a process definition (like instantiation forms and user tasks forms). An application page can display business data values, charts and even let the user start a process or execute a task by displaying the appropriate form.

For this example we will build a basic page that display in a table all the claims submitted. To create a new page:
- click on the UI Designer icon in the Studio tool bar
- you can ignore the information message pop up window
- click on the "create" button
- make sure that "Application page" is selected
- type the name: "claimsList" (without the quotes)
- click on "Create" button

On the new page the first step is to add a variable:
- at the bottom of the UI Designer, in the "Variables" tab, click on "Create a new variable":
	- name: claims
	- type: External API
	- API URL: ../API/bdm/businessData/com.company.model.Claim?q=find&p=0&c=100
- click on "Save" button

Add and configure the table widget:
- from the widget palette on the left drag and drop a "Table" widget to the white board
- in the widget property on the right:
	- set headers name: Description, Answer, Satisfaction level
	- for the content, first click on the "fx" button and then enter "claims" for the value
	- set "Column keys" to: description, answer, satisfactionLevel

You can now click on the UI Designer "Save" button and then on the preview button to get a preview of your page. In order for preview to access the data a user need to be logged in to the Bonita Portal. You can click on the "Portal" button in the Studio tool bar to make sure a user is logged in.

Now you have your first application page, it is time to move to the next chapter and create the application that will include the page.
