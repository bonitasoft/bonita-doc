# Forms for Process instantiation or Human Tasks

How to add a form resource to the Bonita Portal and make it available to users. Forms are intended to be used with one or several processes.

## Form definition <!--{.h2}-->

A form is a [page](pages.md) that belongs to a process. It could be a process instantiation form, a human task form, or an overview form. There are some extra things to consider when you are creating a form compared with an ordinary page, concerning how data is passed between the process instance and the form.

Pages are [exported. imported, modified, and deleted](resource-management.md) as resources in the Portal. 

A [context](contracts-and-contexts.md) is the set of data provided by the process instance or task instance to the form. 
There is no context for a process instantiation form.

A [contract](contracts-and-contexts.md) is the definition of that data that the form returns to the process instance. There is no contract for an overview form.

Three auto-generated forms are provided by default, for process instantiation, for human task execution, and for the case overview. 

The process instantiation and step execution auto-generated forms are based on the relevant contract and they are a useful tool for testing and debugging your application. 

The overview consists of three main sections:

- List of business data: it shows the content of the business variables used by the case.
- List of documents: it shows the content of each document used by the case.
- Timeline: it shows in chronological order information about all the actions that have been performed in the selected case.

To learn how to manage the link between process and forms, go to the [live update](live-update.md) page.

### Application Theme access

If your forms is viewed in an application, you will have access facilities for [the application theme](applications.md).

The `Theme.css` is directly accessible by adding the following link in `index.html`: `<link href="../theme/theme.css" rel="stylesheet" />`
This link is already inserted in the forms you design with the UI Designer.

::: info 
The `app` URL parameter is used to retrieve the current application related Theme.  
The living application layout inject this `app` URL parameter in the targeted page/form URL, and the value is the application token.  
If you create your own navigation link, you will need to include this `app` URL parameter in the forged form URL, in order to be able to benefit from the application theme. 
:::

::: info
In the portal, the link `../theme/theme.css` will point the file `theme.css` from the portal theme. This portal forms theme is empty, and customizable to fit to the current portal theme. 
::: 

::: info
To view the form in the graphical context of an application, use the “View in application” dropdown menu of the UI Designer Preview window.  
This requires that the theme has already been mapped to one or several applications, and you are loggued as a user with the profile mapped with the application.
:::
