# Bonita Runtime Monitoring

Discover how to monitor a runtime environment running Bonita 

## Why monitoring ?

Monitoring a Production environment is crucial to ensure the runtime is correctly sized and tuned.

Bonita provides a series of technical and BPM-related metrics to monitor the health of Bonita runtime environment.  
Some metrics are enabled by default and cannot be disabled. Some others are optional and can be enabled according to
your needs.

## Glossary

**Work**: a unit piece of code that executes parts of process instances, tasks, BPM elements... and allows the processes to execute forwards.
It executes in a Java thread.

**Connector work**: a unit piece of code that specifically executes Bonita connectors.

**Work queue**: a queue storing pending works before they are taken by threads for execution.

## Bonita-related metrics
Bonita-related metrics are **enabled by default** and cannot be disabled. Here are the provided metrics:
* The number of currently running works, under the logical key name **org.bonitasoft.engine.work.works.running**
* The number of currently pending works, waiting in the work queue to be treated, under the logical key name **org.bonitasoft.engine.work.works.pending**
* The total number of executed works (since the last start of Bonita runtime), under the logical key name **org.bonitasoft.engine.work.works.executed**
* The number of currently running connector works, under the logical key name **org.bonitasoft.engine.connector.connectors.running**
* The number of currently pending connector works, waiting in the connector work queue to be treated,
under the logical key name **org.bonitasoft.engine.connector.connectors.pending**
* The total number of executed connector works (since the last start of Bonita runtime), under the logical key name **org.bonitasoft.engine.connector.connectors.executed**
* The total number of treated BPM messages (since the last start of Bonita runtime), under the logical key name **org.bonitasoft.engine.message.messages.executed**


## Activating specific monitoring metrics

Retrieve current configuration by running:
```bash
./setup/setup.sh pull
```
and edit file `./setup/platform_conf/current/platform_engine/bonita-platform-community-custom.properties`  
You will see, in the `# Monitoring` section, two series of properties with their default value:

    ## Monitoring
    ## publish metrics to JMX:
    #org.bonitasoft.engine.monitoring.jmx.enable=true
    ## periodically print metrics to logs (bonita-related metrics only):
    #org.bonitasoft.engine.monitoring.logging.enable=false
    ## print to logs every minute by default (in the ISO-8601 duration format):
    #org.bonitasoft.engine.monitoring.logging.step=PT1M
    #
    ## publish metrics related to JVM memory:
    #org.bonitasoft.engine.monitoring.metrics.jvm.memory.enable=false
    ## publish metrics related to JVM Threads:
    #org.bonitasoft.engine.monitoring.metrics.jvm.threads.enable=false
    ## publish metrics related to JVM garbage collection:
    #org.bonitasoft.engine.monitoring.metrics.jvm.gc.enable=false
    ## publish technical metrics related to Worker / Connector thread pools:
    #org.bonitasoft.engine.monitoring.metrics.executors.enable=false

The first series is the list of **publishers** that can be activated.  
In Community edition, 2 publishers are provided:
* JMX (enabled by default), that allows to use any JMX console to monitor your favorite metrics (except JVM metrics,
as they are already published by the JVM itself by default)
* Logging (disabled by default), that regularly prints to standard Bonita log file the Bonita-related metrics. Print interval can
be changed (property `org.bonitasoft.engine.monitoring.logging.step`).

The second series is the list of **metrics** (counters) that can be exposed.  
All configurable metrics are disabled by default and can be enabled separately.  
They provide information about:
* the running JVM memory
* JVM threads
* Garbage collection usage
* Worker / Connector thread pools

Each of these metrics provides many different counters to finely understand what is going on.

To change any value, **uncomment the line by removing the # character**, and change the true / false value.  
Server restart is required for the changes to take effect.


## Subscription-only monitoring publisher

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

Additionally, Bonita Subscription editions can publish to a REST endpoint in the
[Prometheus format](https://prometheus.io/docs/instrumenting/exposition_formats/#text-format-example), that can
easily be consumed by tools like Grafana, etc.

To activate, simply edit file `./setup/platform_conf/current/platform_engine/bonita-platform-sp-custom.properties`
and change:
  
    # Activate publication of metrics to prometheus:
    # com.bonitasoft.engine.plugin.monitoring.prometheus.enable=false

to

    # Activate publication of metrics to prometheus:
    com.bonitasoft.engine.plugin.monitoring.prometheus.enable=true

and restart server.

This exposes all activated metrics (see [above](#activating-specific-monitoring-metrics)) at endpoint:

    http://`<SERVER_URL>`/bonita/metrics  

Use this URL to configure your graphical monitoring tool in order to record and display the metrics.
