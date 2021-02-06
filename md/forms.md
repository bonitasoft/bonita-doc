# Forms

Forms are critical to process execution. They are linked to both process instantiation and task execution.  

Most of the time, they are used in only one process; in this case, they are packaged with the process and deployed in the _Processes_ section of Bonita Portal. They can be viewed in the process details section.
Alternatively, they can be used in several processes. In this case, they can be managed as [_Resources_](resource-management.md) in Bonita Portal.

## Instantiation form
When it is submitted, a case (process instance) is created.  
At develoment time, an auto-generated form is provided by default, to ease process logic testing and debugging.  
It is based on the relevant contract.  
A custom form must be developed for user testing and production environments.


## Human Task execution form
When it is submitted, the human task is executed.  
At development time, an auto-generated form is provided by default, to ease process logic testing and debugging.  
It is based on the relevant contract.  
A custom form must be developed for user testing and production environments.


## Case overview form
It gives the chronological evolution of the case, the current values for Business data as well as documents.  
At development time, an auto-generated form is provided by default. It can also be used in Non-Production or Production environments.  

## Use in processes
Most of the time, processes imbed their forms in the .bar generated from Bonita Studio and deployed to a Bonita Runtime.
Rarely, when a form is used by multiple processes, it can be deployed as a "Resource" in Bonita Portal.

## Live update
[Live update](live-update.md) allows the Administrator to update one element of the application in a situation of emergency.  
You can [update the form in the list](live-update.md#form-list) and [modify the mapping with the process](live-update.md#form-mapping).  
You can also [edit](resource-management.md#modify) a global form as a resource in Bonita Portal. 

To know more about the development of forms, go to the [page and form development overview](page-and-form-development-overview.md) page.
