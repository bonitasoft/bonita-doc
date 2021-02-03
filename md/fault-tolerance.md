# Fault tolerance mechanisms

Learn which mechanism allows the platform to be fault tolerant. 

## Global fault tolerance strategy

Multiple incidents can happen in a given system. We can have the database not responding anymore either because of a crash or 
a network issue, we can have the JVM on which Bonita Platform runs failing, or we can have external services not available. Each category of incident has a mechanism to recover from it.

* When dealing with a failure on the host machine, like the JVM or hardware crashing, Bonita platform can be installed in a
[clustered architecture](overview-of-bonita-bpm-in-a-cluster.md) to ensure the High availability of the service. 
It means that if one node of the cluster fails, another one is available to continue executing [works](work-execution.md).
* When dealing with external services' outage called by [connectors](connectors-overview.md), they can be [replayed](tasks.md). 
* When dealing with incident like unresponsive database, we have two mechanisms to handle these errors the Retry mechanism and 
the Recovery mechanism 

## Retry mechanism

It is a reactive system, when an incident happens during the execution of a work, an exception is thrown. This mechanism
analyses the exception and determine if the work should be retried automatically or not.

When the exception is retryable, the platform queues the work again, with a delay. That can be done up to 10 times
with the delay increasing gradually from 1 second to more than 1 hour by default.
 
See [Work execution](work-execution.md) and [Work executiuon audit](work-execution-audit.md) for more details.
 

### Configuration

Configuration for the retry is available in the `bonita-tenant-community-custom.properties` and can be updated using the
[setup tool](BonitaBPM_platform_setup.md)

```properties
# number of times the works will be retried in case of issues that can be retried
bonita.tenant.work.maxRetry=10
bonita.tenant.work.retry.delay=1000
bonita.tenant.work.retry.factor=2
```

Above is the default configuration. With it, each work can be retried up to **10 times**, starting with a delay of **1 second** 
multiplied at each retry **by 2**.


### Monitoring

The [Work execution audit](work-execution-audit.md) allows to be informed when the work is retried to many times.

## Recovery mechanism

Starting from 2021.1 version, a specific mechanism is responsible to recover from incidents like database or network outage.

This mechanism will periodically scan the database to retrieve elements that were not executed and re-execute them.

Only elements that were **not updated during the last hour** are recovered. By default, the recovery runs every 2 hours.
Also, in cluster environment, only one node is responsible to run the recovery at any given time.

### Configuration


Configuration for the recovery is available in the `bonita-tenant-community-custom.properties` and can be updated using the
[setup tool](BonitaBPM_platform_setup.md)

```properties

# configuration of the recovery mechanism (how works are recreated if lost)
# Avoid verifying elements recently modified, by default no elements updated during the last hour is considered (ISO-8601 duration format).
bonita.tenant.recover.consider_elements_older_than=PT1H
# Duration after the end of the previous execution before a new one is started. By default recovery runs every 2 hours (ISO-8601 duration format)
bonita.tenant.recover.delay_between_recovery=PT2H

```

## Advanced

### SQLServer

**Before 2021.1**, sometimes,  in case of a lot of concurrence ( work triggered in same ms ), the data commits in a database was not visible by the next transaction. 

It happens when the previous transaction has used  **XAMultipleResource (Bonita + BDM )** and when the **transaction isolation level** is configured  **ALLOW_SNAPSHOT_ISOLATION** and **READ_COMMITTED_SNAPSHOT** are configured. Those isolations level are mandatory to avoid a deadlock.

To avoid the issue describe above, we decide to add a **work execution delay** (100 ms by default)  only in case of the database is **SQL Server** and if **the previous transaction has used a XAMultipleResource ( Bonita + BDM )**.

#### Configuration

Configuration for the **work execution delay** is available in the `bonita-tenant-community-custom.properties` and can be updated using the
[setup tool](BonitaBPM_platform_setup.md)

```properties

# configuration of the work execution delay only used when the db vendor is SQL SERVER
# Avoid the data commits, by a transaction using XAMultipleResource (Bonita + BDM ),  was not visible by the next transaction.
bonita.tenant.work.sqlserver.delayOnMultipleXAResource=100


```

### Monitoring

There are two ways to monitor the recovery mechanism : 
  * `bonita.xxx.log` file
  * Metrics

#### Log File 

The recovery mechanism produce `INFO` and`DEBUG` logs each time the recovery is trigger, it's looks like :

 
```
 INFO (internalTasksScheduler-1) org.bonitasoft.engine.tenant.restart.RecoveryMonitor Start detecting flow nodes to restart...
 INFO (internalTasksScheduler-1) org.bonitasoft.engine.tenant.restart.RecoveryMonitor Recovery of elements executed, 12006 elements recovered.
 INFO (internalTasksScheduler-1) org.bonitasoft.engine.tenant.restart.RecoveryMonitor Restarting elements...Handled 1000 of 12006 elements candidates to be recovered in PT0.025S
[...]
 INFO (internalTasksScheduler-1) org.bonitasoft.engine.tenant.restart.RecoveryMonitor Restarting elements...Handled 12000 of 12006 elements candidates to be recovered in PT0.452S
 INFO (internalTasksScheduler-1) org.bonitasoft.engine.tenant.restart.RecoveryMonitor Recovery of elements executed, 12006 elements recovered.
```

#### Metrics

New metrics are available to monitor when the recovery runs and how many elements it recovers. It can help to identify 
period of times when there are incidents like database outage.


Here is an example of metrics published using the Prometheus publisher, more info on how to activate this publisher
 in [Bonita Runtime Monitoring](runtime-monitoring.md)
 
```
# HELP bonita_bpmengine_recovery_duration_seconds_max duration of recovery task
# TYPE bonita_bpmengine_recovery_duration_seconds_max gauge
bonita_bpmengine_recovery_duration_seconds_max{tenant="1",} 0.0
# HELP bonita_bpmengine_recovery_duration_seconds duration of recovery task
# TYPE bonita_bpmengine_recovery_duration_seconds summary
bonita_bpmengine_recovery_duration_seconds_active_count{tenant="1",} 0.0
bonita_bpmengine_recovery_duration_seconds_duration_sum{tenant="1",} 0.0
# HELP bonita_bpmengine_recovery_recovered_last_elements number of elements recovered
# TYPE bonita_bpmengine_recovery_recovered_last_elements gauge
bonita_bpmengine_recovery_recovered_last_elements{tenant="1",} 0.0
# HELP bonita_bpmengine_recovery_recovered_total_elements_total Total number of elements recovered
# TYPE bonita_bpmengine_recovery_recovered_total_elements_total counter
bonita_bpmengine_recovery_recovered_total_elements_total{tenant="1",} 39768.0
# HELP bonita_bpmengine_recovery_execution_executions_total Number of recovery executed
# TYPE bonita_bpmengine_recovery_execution_executions_total counter
bonita_bpmengine_recovery_execution_executions_total{tenant="1",} 818.0
```
