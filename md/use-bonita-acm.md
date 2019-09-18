# How to implement Adaptive Case Management with Bonita

This page explains how to enable adaptive case management capacity in Bonita.  

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

## Enable ACM Engine Plug-in

The ACM engine plug-in registers an [event handler](event-handlers.md) at startup. This handler will be in charge of updating the _acm_ variables of all the active tasks of a case each time a task is completed in this same case. An _acm_ variable is a transient local variable prefixed with the `$` sign. In the credit card dispute resolution example there is only one _acm_ variable named _$activityState_.

By default the event handler is **not** registered. To enable the event handler you must start the engine with the following argument:  
`-Dcom.bonitasoft.engine.plugin.acm.REGISTER_ACM_HANDLER=true`  
It can be achieved:
* in Bonita Studio, in the Server settings preferences ( Edit > Preferences > Server settings > Tomcat JVM additional arguments )  
* in a Bundle, using the setup tool, reach for the `bonita-tenant-sp-custom.properties` file (in `platform_conf/current/tenants/<TENAND_ID>/tenant_engine` folder in server has already been started or `platform_conf/initial/tenant_template_engine` before the first start of the server) and add this line `com.bonitasoft.engine.plugin.acm.REGISTER_ACM_HANDLER=true`.  

## Caveats

* Potential performance hit depending on user's implementations.
* The Portal Task list and Monitoring become irrelevant with processes using ACM.

