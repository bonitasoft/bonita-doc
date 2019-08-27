# Configure an email connector

In order for a process to interact with external systems such a publishing a document on a CMS, calling a REST API or send an email Bonita provides connectors. Connectors is a piece of code that is executed when starting or finishing a process or a task. It will process input data (for example business variables values) and generate (optionally) some outputs. Connector code might only transform inputs but can as well perform interaction with external systems.

In our example we will use configure an email to notify the manager that a task "Deal with unsatisfied customer" require is attention.

In order to avoid any settings specific to an email provider we will use a tool to have a fake email server "FakeSMTP":
- Download FakeSMTP from this link: d
- Unzip the file and run FakeSMTP by either double-clicking on the JAR file or running this shell command:
java -jar fakeSMTP-2.0.jar
- Once the user interface is displayed, set the listening port to 2525 and click on the "Start server" button.

Now that we have a fake server let's configure the email connector on the "Deal with unsatisfied customer" task:
- select the task "Deal with unsatisfied customer"
- go to *Execution > Connectors in*
- click on "Add..." button
- select the "Email (SMTP)" connector and click on "Next" button
- name the connector configuration "Send notification" and click on "Next" button
- set the following parameters values:
	- SMTP host: localhost
	- SMTP port: 2525 (the port number specified in FakeSMTP)
	- SSL (in the "Security" section):  unchecked
- click on "Next" button
- enter "no-reply@acme.com" in the "From" field
- use the "pencil" icon to edit the expression of the "To" field. Set the "Expression type" to "Script", paste the following in the code edition zone: `BonitaUsers.getProcessInstanceInitiatorProfessionalContactInfo(apiAccessor,processInstanceId).email` and click on "OK" button
- click on "Next" button
- set "You have a pending task" as the subject.
- Click on "Finish".

If you run the process with the connector configure you should see a new incoming email in FakeSMTP user interface when task "Deal with unsatisfied customer" becomes available.
