# Configure an email connector

In order for a process to interact with external systems such as publishing a document on a CMS, calling a REST API, or sending an email, Bonita provides connectors. In our example we will configure an email connector to notify the manager that a task _Deal with unsatisfied customer_ requires their attention.

::: info
A [connector](connectors-overview.md) is a piece of code that is executed when starting or finishing a process or a task. It will process input data (for example business variable values) and generate (optionally) some outputs. Connector code might only transform inputs but can also perform interaction with external systems.
:::

In order to avoid settings that are specific to real email provider, we will use a tool for a fake email server "FakeSMTP":
1. Download FakeSMTP from this link: [http://nilhcem.github.com/FakeSMTP/downloads/fakeSMTP-latest.zip](http://nilhcem.github.com/FakeSMTP/downloads/fakeSMTP-latest.zip)
1. Unzip the file
1. Run FakeSMTP by double-clicking on the JAR file, or by running this shell command: `java -jar fakeSMTP-2.0.jar`
1. When the user interface is displayed, set the **listening port** to _2525_
1. Click on the **Start server** button.

   ![FakeSMTP configured and listening](images/getting-started-tutorial/configure-email-connector/fakesmtp-configured-and-listening.png)<!--{.img-responsive .img-thumbnail}-->

Now that we have a fake server running, let's configure the email connector on the _Deal with unsatisfied customer_ task:
1. Select the task _Deal with unsatisfied customer_
1. Go to **Execution > Connectors in**
1. Click on the **Add...** button
1. Select the _Email (SMTP)_ connector
1. Click on the **Next** button
1. Name the connector configuration _Send notification_
1. Click on the **Next** button
1. Set the following parameter values:
   - SMTP host: _localhost_
   - SMTP port: _2525_ (the port number specified in FakeSMTP)
   - SSL (in the **Security** section): _unchecked_
1. Click on the **Next** button
1. Enter _no-reply@acme.com_ in the **From** field
1. Use the ![pencil icon](images/getting-started-tutorial/configure-email-connector/pencil.png) icon to edit the expression of the **To** field
1. Set the **Expression type** to **Script**
1. Paste the following Groovy script into the code editing zone: `apiAccessor.getIdentityAPI().getUserContactData(taskAssigneeId, false).email`
1. Click on the **OK** button
1. Click on the **Next** button
1. Set _You have a pending task_ as the subject
1. Click on **Finish**

   ![Email connector configuration](images/getting-started-tutorial/configure-email-connector/configure-email-connector.gif)<!--{.img-responsive .img-thumbnail}-->

If you run the process with the connector configured, you should see a new incoming email in the FakeSMTP user interface when task _Deal with unsatisfied customer_ becomes available.

You have now a process definition that uses a wide range of Bonita features. In the [next chapters](design-application-page.md), we will create an application on top of this process.
