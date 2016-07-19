# Forms

This page explains how to add a form resource to the Portal and make it available to users. Form resources are intended for use in applications.

Pages are [exported. imported, modified, and deleted](resource-management.md) as resources in Bonita BPM Portal.

Form definition <!--{.h2}-->

A form is a UI artifact used in the context of a process to gather inputs from somebody (company employee or external actor). It can be a process instantiation form or a human task form. There are some extra things to consider when creating a form compared to a page, concerning how data is passed between the process instance and the form.

A [context](contracts-and-contexts.md) is the set of data provided by the process instance or task instance to the form.
There is no context for a process instantiation form.

A [contract](contracts-and-contexts.md) is the definition of that data that the form returns to the process instance.

You can also customize authorization rule mapping for each form to decide whether the user logged in can view a form or not.   
To do so, go to [How to map authorization rules](custom-authorization-rule-mapping.md).

By default, auto-generated forms are provided for process instantiation and human task execution, based on the contract. They are a useful tool for testing and debugging your application.

You can see how to manage the mapping between process and forms at run time in the documentation about [live update](live-update.md).
