# Manage dependencies

A dependency is an external code module, not provided in Bonita, that is used by a process. This page explains how to manage dependencies using
Bonita Studio, so that when you build a process for deployment, all the dependencies are met.

Dependencies are primarily managed through the Development menu of Bonita Studio. This makes the external module available for all processes.
You can also import a dependency when you configure a process, but in this case, it is only available for the process you are configuring.

From the Development menu, you can manage:

* Connectors
* Actor filters
* Data types
* Business data model
* Validators
* Scripts
* Other jar files

To specify the dependencies for a process, click **_Configure_** in the coolbar. You can then define Process dependencies and Application dependencies.

* Process dependencies are modules required by the process when it runs. These are specified in Studio and are managed by the Engine.
* Application dependencies are modules required by clients of the engine, including forms.
If forms (or any client) manipulate objects programmatically, the dependencies must be in the client's classpath.
The classpath is initialized with the application dependencies specified in the Studio. The most common use case for application dependencies is custom datatypes.

Note that certain libraries cannot be included in more than one classpath. To avoid this problem, we recommend that you always check for [duplicate libraries](manage-jar-files.md) when you configure a process.
