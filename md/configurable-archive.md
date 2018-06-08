# Configurable Archive

::: info
**Note:** For Performance edition only.
:::

The Configurable Archive feature is provided by the `com.bonitasoft.engine.archive.impl.ListArchivingStrategy `service implementation, which only works with a **Performance license**. 
It enables you to specify for each FlowNode type whether or not to archive values when the flow node is changed. This determines what information 
(for example archived instances of processes and executed tasks) is available to an administrator in Bonita BPM Portal.

Deactivating archives has a positive effect on overall performance of the system as it reduces the number of entries inserted in the database. It has also the benefit of reducing the disk space used by the database. 
However, it prevents users from keeping a history of past activity. The most visible impact of this loss of information is through the Bonita BPM Portal. Completed tasks will not be visible.

In general we recommended that you set all attributes to **true** or all to **false**. However, here are some details on some settings that you can change if users have a specific use case:

* To archive the ProcessInstance comments when the process instance completes, set `org.bonitasoft.engine.core.process.comment.model.SComment` to true. Comments entered in a task during execution are archived in executed tasks in archived cases.
* To archive a process instance each time its state changes, set `org.bonitasoft.engine.core.process.instance.model.SProcessInstance` to true.
* To archive transition instances, set `org.bonitasoft.engine.core.process.instance.model.STransitionInstance` to true. This information is not available in Bonita BPM Portal.
* To archive an automatic (service) task each time it changes state, set `org.bonitasoft.engine.core.process.instance.model.SAutomaticTaskInstance` to true. 
* To archive a manual task (e.g. sub-tasks) each time it changes state, set `org.bonitasoft.engine.core.process.instance.model.SManualTaskInstance` to true.
* To archive a user (human) task each time it changes state, set `org.bonitasoft.engine.core.process.instance.model.SUserTaskInstance` to true. 
* To archive a receive task each time it changes state, set `org.bonitasoft.engine.core.process.instance.model.SReceiveTaskInstance` to true. This information is not available in Bonita BPM Portal.
* To archive a loop activity each time it changes state, set `org.bonitasoft.engine.core.process.instance.model.SLoopActivityInstance` to true.
* To archive a multi-instances activity each time it changes state, set `org.bonitasoft.engine.core.process.instance.model.SMultiInstanceActivityInstance` to true. 
* To archive a call activity each time it changes state, set `org.bonitasoft.engine.core.process.instance.model.SCallActivityInstance` to true. 
* To archive a gateway each time it changes state, set `org.bonitasoft.engine.core.process.instance.model.SGatewayInstance` to true. This information is not available in Bonita BPM Portal.
* To archive a sub-process activity each time it changes state, set `org.bonitasoft.engine.core.process.instance.model.SSubProcessActivityInstance` to true. 
* To archive a connector instance each time it changes state, set `org.bonitasoft.engine.core.process.instance.model.SConnectorInstance` to true. 

To configure the archiving strategy, edit the file [`bonita-tenant-sp-custom.properties`](BonitaBPM_platform_setup.md) and specify the items that you want archived. 
By default, the archiving strategy is that everything is archived, so the value for each type of information is set to `true`. Change this setting to `false` for the items that you do not want to archive.
