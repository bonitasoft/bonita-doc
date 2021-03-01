# How to implement Adaptive Case Management (ACM) with Bonita

This page explains how to enable Adaptive Case Management capacity in Bonita.  

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

## Enable ACM Engine Plug-in

The ACM engine plug-in registers an [event handler](event-handlers.md) at startup. This handler will be in charge of updating the _acm_ variables of all the active tasks of a case each time a task is completed in this same case. An _acm_ variable is a transient local variable prefixed with the `$` sign. In the credit card dispute resolution example, there is only one _acm_ variable named _$activityState_.

By default the event handler is **not** registered. To enable the event handler you must start the engine with the following argument:  
`-Dcom.bonitasoft.engine.plugin.acm.REGISTER_ACM_HANDLER=true`  
It can be achieved:

- in Bonita Studio, in the Server settings preferences ( Edit > Preferences > Server settings > Check _Enable ACM event handler_ )  
- in a Bundle, using the setup tool, reach for the `bonita-tenant-sp-custom.properties` file (in `platform_conf/current/tenants/<TENAND_ID>/tenant_engine` folder if the server has already been started or `platform_conf/initial/tenant_template_engine` before the first start of the server) and add this line `com.bonitasoft.engine.plugin.acm.REGISTER_ACM_HANDLER=true`.  

## ACM project example to import in Bonita Studio

On Bonita Studio Welcome page, in the "Resources" tile, click on "Import Adaptive Case Management example".   
This opens the "Import .bos" wizard and retrieves the project from the Internet.  
Choose the Bonita project in which the .bos will be imported in the studio, and import.
At the end of the importation, click on _Deploy..._, select all artifacts and _Deploy_. At the end of the deployment open the Credit Card Dispute application, and just start reading the Tutorial.
This will give you the theory as well as a practical example of an application using Bonita Adaptive Case Management capabilities.
You can play with it and customize it to your own needs.

## Caveats

- Potential performance hit depending on user's implementations: groovy scripts that define the tasks state must be pretty simple.
- The Portal Task list and Monitoring become irrelevant with processes using ACM.