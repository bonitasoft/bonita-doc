# Bonita Runtime Monitoring

Discover how to monitor a runtime environment running Bonita

In Community edition, monitoring metrics can be published via 2 channels: JMX and / or Logging file.  
In Subscription editions, monitoring metrics can be published via 3 channels: JMX and / or Logging file and / or
a Prometheus endpoint.  


## Why monitoring ?

Monitoring a Production environment is crucial to ensure the runtime is correctly sized and tuned.

Bonita provides a series of technical and Bonita-related metrics to monitor the health of Bonita runtime environment.  
Some metrics are enabled by default and cannot be disabled. Some others are optional and can be enabled according to
your needs.

## Glossary

**Work**: a unit piece of code that executes parts of process instances, tasks, BPM elements... and allows the processes to execute forwards.
It executes in a Java thread.

**Connector work**: a unit piece of code that specifically executes Bonita connectors.

**Work queue**: a queue storing pending works before they are taken by threads for execution.

**Metric**: an indicator (generally a numeric value) giving information on the system. They can be technical (number
of running threads on the JVM), or more Bonita-oriented (total number of connectors executed).

**Metric Publisher**: a publisher is responsible for exposing the activated metrics. It is a channel on which metrics are published.
Provided metric publishers are JMX (all editions), Log files (all editions), Prometheus (Subscription editions only).

## Which metrics are available?

### Bonita-related metrics
Bonita-related metrics are **enabled by default** and cannot be disabled. Here are the provided metrics:
* The number of currently running works, under the logical key name **org.bonitasoft.engine.work.works.running**
* The number of currently pending works, waiting in the work queue to be treated, under the logical key name **org.bonitasoft.engine.work.works.pending**
* The total number of executed works (since the last start of Bonita runtime), under the logical key name **org.bonitasoft.engine.work.works.executed**
* The number of currently running connector works, under the logical key name **org.bonitasoft.engine.connector.connectors.running**
* The number of currently pending connector works, waiting in the connector work queue to be treated,
under the logical key name **org.bonitasoft.engine.connector.connectors.pending**
* The total number of executed connector works (since the last start of Bonita runtime), under the logical key name **org.bonitasoft.engine.connector.connectors.executed**
* The total number of treated BPM messages (since the last start of Bonita runtime), under the logical key name **org.bonitasoft.engine.message.messages.executed**

### Technical metrics
The following available metrics are **disabled by default** and can be enabled.
* Several metrics related to JVM memory, under the logical key names **jvm.memory.*** and **jvm.buffer.***
* Several metrics related to JVM threads, under the logical key name **jvm.threads.***
* Several metrics related to JVM garbage collection, under the logical key name **jvm.gc.***
* Several metrics related to Worker / Connector thread pools, under the logical key name **executor.***
* Several metrics related to Hibernate statistics, under the logical key name **hibernate.***
* Several metrics related to Tomcat, under the logical key name **tomcat.***


## Activating specific monitoring metrics

Retrieve [current configuration](BonitaBPM_platform_setup.md#update_platform_conf) by running:
```bash
./setup/setup.sh pull
```

### Activating Metrics Publishers

Edit file `./setup/platform_conf/current/platform_engine/bonita-platform-community-custom.properties`  
You will see, in the `# MONITORING` section, a series of properties with their default value:

    ## MONITORING
    ## PUBLISHERS = where to publish?
    ## publish metrics to JMX:
    #org.bonitasoft.engine.monitoring.publisher.jmx.enable=true
    ## periodically print metrics to logs (bonita-related metrics only):
    #org.bonitasoft.engine.monitoring.publisher.logging.enable=false
    ## print to logs every minute by default (in the ISO-8601 duration format):
    #org.bonitasoft.engine.monitoring.publisher.logging.step=PT1M

These are the **metric publishers** that can be activated.  
In Community edition, 2 metric publishers are provided:
* JMX (enabled by default), that allows to use any JMX console to monitor your favorite metrics (except JVM metrics,
as they are already published by the JVM itself by default)
* Logging (disabled by default), that regularly prints to standard Bonita log file the Bonita-related metrics. Print interval can
be changed (property `org.bonitasoft.engine.monitoring.logging.step`).

::: info
To change any value, **uncomment the line by removing the # character**, and change the true / false value.  
Then [push your configuration changes](BonitaBPM_platform_setup.md#update_platform_conf) to database:
```bash
./setup/setup.sh push
```
Then restart the Tomcat server for the changes to take effect.
:::

### Activating specific metric indicators

Edit the same file `./setup/platform_conf/current/platform_engine/bonita-platform-community-custom.properties`  

    ## METRICS = what to publish?
    ##
    ## Note: Bonita-related metrics are automatically published.
    ## They are active by default and cannot be disabled.
    ##
    ## publish metrics related to JVM memory:
    #org.bonitasoft.engine.monitoring.metrics.jvm.memory.enable=false
    ## publish metrics related to JVM Threads:
    #org.bonitasoft.engine.monitoring.metrics.jvm.threads.enable=false
    ## publish metrics related to JVM garbage collection:
    #org.bonitasoft.engine.monitoring.metrics.jvm.gc.enable=false
    ## publish technical metrics related to Worker / Connector thread pools:
    #org.bonitasoft.engine.monitoring.metrics.executors.enable=false
    ## publish technical metrics related to HIBERNATE statistics
    ## To activate, simply set property (a few lines above) 'bonita.platform.persistence.generate_statistics=true'
    ## publish technical metrics related to Tomcat (if in a Tomcat context):
    #org.bonitasoft.engine.monitoring.metrics.tomcat.enable=false

These are the **metrics** (counters) that can be exposed.  
All configurable metrics are disabled by default and can be enabled separately.  
They provide information about:
* the running JVM memory
* JVM threads
* Garbage collection usage
* Worker / Connector thread pools
* Hibernate statistics
* Tomcat counters on sessions, threads, requests, connections...

Each of these metrics provides many different counters to finely understand what is going on.

::: info
To change any value, **uncomment the line by removing the # character**, and change the true / false value.  
Then [push your configuration changes](BonitaBPM_platform_setup.md#update_platform_conf) to database:
```bash
./setup/setup.sh push
```
Then restart the Tomcat server for the changes to take effect.

:::

## Subscription-only monitoring

### Prometheus publisher

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

Prometheus 

In addition to these metric publishers, Bonita Subscription editions can also publish to a REST endpoint in the
[Prometheus format](https://prometheus.io/docs/instrumenting/exposition_formats/#text-format-example), that can
easily be consumed by Time Series databases like Prometheus, and displayed by graphical tools like Grafana, etc.

To activate Prometheus endpoint in Bonita, simply edit file `./setup/platform_conf/current/platform_engine/bonita-platform-sp-custom.properties`
and change:
  
    # Activate publication of metrics to prometheus:
    # com.bonitasoft.engine.plugin.monitoring.prometheus.enable=false

to

    # Activate publication of metrics to prometheus:
    com.bonitasoft.engine.plugin.monitoring.prometheus.enable=true

Then [push your configuration changes](BonitaBPM_platform_setup.md#update_platform_conf) to database:
```bash
./setup/setup.sh push
```
Then restart the Tomcat server for the changes to take effect.


This exposes all activated metrics (see [above](#activating-specific-metric-indicators)) at endpoint:

    http://<SERVER_URL>/bonita/metrics

Use this URL to configure your installed Prometheus configuration in order to record and display the metrics.

Sample extract of exposed Prometheus data:

    # HELP jvm_buffer_memory_used_bytes An estimate of the memory that the Java virtual machine is using for this buffer pool
    # TYPE jvm_buffer_memory_used_bytes gauge
    jvm_buffer_memory_used_bytes{id="direct",} 565248.0
    jvm_buffer_memory_used_bytes{id="mapped",} 0.0
    # HELP org_bonitasoft_engine_connector_connectors_pending  
    # TYPE org_bonitasoft_engine_connector_connectors_pending gauge
    org_bonitasoft_engine_connector_connectors_pending{tenant="1",} 0.0
    # HELP org_bonitasoft_engine_connector_connectors_executed_total  
    # TYPE org_bonitasoft_engine_connector_connectors_executed_total counter
    org_bonitasoft_engine_connector_connectors_executed_total{tenant="1",} 0.0
    # HELP org_bonitasoft_engine_work_works_running  
    # TYPE org_bonitasoft_engine_work_works_running gauge
    org_bonitasoft_engine_work_works_running{tenant="1",} 0.0
    # HELP jvm_gc_max_data_size_bytes Max size of old generation memory pool
    # TYPE jvm_gc_max_data_size_bytes gauge
    jvm_gc_max_data_size_bytes 7.16177408E8
    # HELP org_bonitasoft_engine_work_works_pending  
    # TYPE org_bonitasoft_engine_work_works_pending gauge
    org_bonitasoft_engine_work_works_pending{tenant="1",} 0.0
    # HELP tomcat_servlet_request_max_seconds 
    # TYPE tomcat_servlet_request_max_seconds gauge
    tomcat_servlet_request_max_seconds{name="default",} 0.0
    tomcat_servlet_request_max_seconds{name="dispatcherServlet",} 0.104
    # HELP tomcat_threads_config_max_threads 
    # TYPE tomcat_threads_config_max_threads gauge
    tomcat_threads_config_max_threads{name="http-nio-8080",} 200.0
    # HELP tomcat_sessions_expired_sessions_total 
    # TYPE tomcat_sessions_expired_sessions_total counter
    tomcat_sessions_expired_sessions_total 0.0
    # HELP tomcat_sessions_active_max_sessions 
    # TYPE tomcat_sessions_active_max_sessions gauge
    tomcat_sessions_active_max_sessions 0.0
    ...


### Cluster-specific metrics

::: info
**Note:** For Enterprise, Performance editions only, with cluster mode activated.
:::

A Bonita 7.10+ cluster has monitoring on distributed cluster locks ACTIVE by default.

To DISABLE those metrics, simply edit the file
`./setup/platform_conf/current/platform_engine/bonita-platform-sp-cluster-custom.properties`
and change:
  
    ## Monitor locks on cluster
    #org.bonitasoft.engine.monitoring.metrics.cluster.locks.enable=true

to

    ## Monitor locks on cluster
    org.bonitasoft.engine.monitoring.metrics.cluster.locks.enable=false

Then [push your configuration changes](BonitaBPM_platform_setup.md#update_platform_conf) to database:
```bash
./setup/setup.sh push
```
Then restart the Tomcat server for the changes to take effect.

