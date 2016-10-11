# Performance tuning

::: info
**Note:** For Performance edition only.
:::

This page contains information that you can use to tune the Bonita BPM Engine to get the best performance in your platform.  
It assumes that you are familiar with Java threads, concurrent execution, XML, DB connection pools, your DB instance, cache policies, scheduling, connectors, network speed, I/O, Java Virtual Machine configuration, JTA and transaction management.  
You need to know how to install and configure Bonita BPM.

This information applies primarily to the Performance edition, though some details also apply to the Teamwork and Efficiency editions.

It is also possible to [use gzip compression](use-gzip-compression.md) on your application server to improve performance.

## Summary

This section is a summary of the key recommandations from the rest of the page. You can use it as a checklist of things to consider when tuning system performance.  
To understand these recommendations in detail, read the sections below.

Two key definitions:

* The maximum possible number of parallel threads that could be required at any given time is the sum of:
     * the number of workers 
     * the number of scheduler threads
     * the number of external API calls

* The processing capacity is the desired number of parallel threads, and is the sum of:
     * the number of workers
     * a percentage of the number of concurrent scheduler threads
     * a percentage of the number of concurrent external API calls

Performance tuning checklist of best practises:

* [Access Engine APIs](#engine_access) in Local mode whenever possible.
* Make sure that the [network](#hardware) between your client and the Bonita BPM Engine server is fast if you [access the APIs remotely](#remote).
* Install your [Database](#db) on a powerful [machine](#hardware) (hardware that meets to your DB vendor requirements: sufficient memory, powerful CPU, and fast I/O).
* Make sure that the [network](#hardware) between your Bonita BPM Engine server and your database server is very fast.
* Set the [Work service](#work_service) threadpool and [Connector service](#connector_service) threadpool to the same size.
* Set the maximum [DB connections](#db_connections) for the bonitaDS [datasource](#datasource_settings) to the desired processing capacity number of parallel threads.
* Configure a suitable [sequence manager](#seq_mgr) range size for your typical process designs and expected volume. 
* Make sure that the maximum [DB connections](#db_connections) for sequenceManagerDS [datasource](#datasource_settings) is more than 1 and is appropriate for the SequenceManager range size configuration.
* Tune the [application cache](#app_cache) to your hardware capabilities (if you have more memory available, increase the cache size).
* Set the basic [JVM options](#jvm) to make it fast and well-sized.
* Optimize your [database configuration](#db) for your most frequent usage (read or write) and the level of robustness that you want.
* Configure your [transaction manager](#tm) for the level of robustness that you want.
* Tune the [log levels](#logs) of Bonita BPM Engine and all its dependencies.
* Design your [processes](#process_design) following the best practises.
* Add a reasonable number of well-developed [event handlers](#event_handlers).
* Tuned the Bonita BPM Engine [cron jobs](#cron) for your needs.

<a id="engine_access"/>

## Engine access

This section deals with performance impact of your choice of [Engine access mode](engine-api-overview.md).

There are various ways to access the Engine APIs provided by Bonita BPM Engine. Choose the most suitable access mode for your deployment, requirements, and preferences.  
The access modes rely on different technologies and have different benefits and drawbacks. In this section, we will describe the performance characteristics of each mode.

<a id="local"/>

#### Local access

This is undoubtedly the fastest way to access this engine, because it means a direct Java call with nothing additional between client and server.  
The deployment constraint is that the client of the engine must be located in the same JVM as the engine server.

<a id="remote"/>

#### Remote access

The remote access modes enable you to have an engine client connected remotely to the engine server.

All remote access modes share a set of common benefits and constraints. There is a loss of performance mainly because of serialization between client and server.  
If your client is not located on the same machine than your server JVM, the [network](#hardware) becomes an additional potential source of performance reductions to monitor.

Tip: In some deployments, it is possible to benefit from the best of both local and remote modes.  
The engine server access mode is defined per client and does not need to be the same for all clients.  
If you have a client located in the same JVM as your server, configure it to use the local access mode.  
You can then configure other clients to use one of the remote modes but you do not penalize the client able to leverage the local access performance.

<a id="ejb3"/>

##### EJB3

EJB3 access is serialized data using RMI protocol.  
This protocol comes with a cost, and this cost is dependent of the implementation in the EJB container you are using.

<a id="http"/>

##### HTTP

The HTTP access mode is available using our natively provided bonita-client library. It can also be used from other technologies like PHP, .Net or Javascript.  
We do not guarantee to keep the protocol between client and server side stable, which why we strongly recommend that when possible you use the standard bonita-client library.  
This mode provides remote connection to the server without requiring a JEE application server with an EJB container.  
This mode can be easily used inside a web container like Tomcat or Jetty.

The bonita-client library sends data over the network using the HTTP protocol.  
It is implemented on the `org.apache.httpcomponents:httpmime:4.2.5` open source library.  
The connection manager used is `org.apache.http.impl.conn.PoolingClientConnectionManager`.  
Currently, there is no configuration for this pool though this might be added in the future.  
See the [Apache documentation](http://hc.apache.org/httpcomponents-client-ga/tutorial/html/connmgmt.html) for more information.

Data sent is serialized using a Java library called XStream. This serialization also has a cost.

<a id="rest"/>

##### REST

This method of accessing the Bonita BPM capabilities is not yet integrated as an engine service but exists as a web application service accessed using the [Web REST API](rest-api-overview.md).  
No details are provided here as it is currently out of scope.  
In general, the constraints are almost the same as for the HTTP mode, but we do not provide any Java client for this access mode.

## Concurrent execution

This section describes some aspects of engine configuration that have a performance impact if there is a high level of concurrent execution.  
Before you read this, make sure you are familiar with the engine [execution sequence, states, and transactions](execution-sequence-states-and-transactions.md).

There are two main entry points for load on the engine:

* **API calls** coming from outside the engine
* **Engine-generated calls** for internal processing, specifically the **Work service** and the **Scheduler service**

The Bonita BPM Engine is an asynchronous BPM process engine.  
This means that every thread that deals with process execution applies the following rule: do the minimum that makes sense in the current transaction to get to a stable state, and then continue in another transaction inside another thread.  
The great benefit of this is that the caller is not locked while the engine processes something that might be long (such as a long sequence of tasks with connectors.).

<a id="client_threads"/>

#### Client Threads

Client threads are responsible for a large part of the load generated inside the engine.  
The number of client threads is related to the number of parallel users.

If you are running your own application, you have one thread if your applicaiton is not multi-threaded, or you have the number of threads you decided to create explicitly in the application or using your own threadpool.

If you are running Bonita BPM Engine inside a container, the maximum number of client threads is defined by a parameter of the container. For example:

* **Apache Tomcat** `maxThreads` set in _`Tomcat_folder`_`/conf/server.xml`.    
     Default value 200\. 
     See the [Tomcat documentation](http://tomcat.apache.org/tomcat-7.0-doc/) for information about the `maxThreads` parameter.
* **Red Hat WildFly** : add the attributes `io-threads="10"` and `task-max-threads="200"` in the _default_ *worker* element in the io subdomain in `<WILDFLY_HOME>/standalone/configuration/standalone.xml`.
     The Wildlfy administrator guide lacks some information about advanced worker configuration. Undertow (WildFly web service handler) relies on the [XNIO API](http://docs.jboss.org/xnio/3.0/api/org/xnio/Options.html) for creating Worker threads. See [IO Worker configuration for Undertow](https://developer.jboss.org/thread/241230?start=0&tstart=0) for information about worker configuration.

<a id="work_service"/>

#### Work service

The work service is responsible for asynchronously processing execution of process instances. The work service has its own thread pool, which can be configured for each tenant.  
This is one of the key configurations to optimize, because even though there are many client threads, client threads are held only for a short time before being released, and then execution flow continues using work service threads.  
A thread from the pool of the work service is known as a worker.

The work service is configured in [`bonita-tenant-community-custom.properties`](BonitaBPM_platform_setup.md).
```
bonita.tenant.work.terminationTimeout=30
bonita.tenant.work.corePoolSize=25
bonita.tenant.work.maximumPoolSize=25
bonita.tenant.work.keepAliveTimeSeconds=60
bonita.tenant.work.queueCapacity=10000
```

It is very similar to the constructor provided in the [default JDK ThreadPoolExecutor](http://docs.oracle.com/javase/7/docs/api/java/util/concurrent/ThreadPoolExecutor.html#ThreadPoolExecutor(int,%20int,%20long,%20java.util.concurrent.TimeUnit,%20java.util.concurrent.BlockingQueue))).  
For a reminder of how the threadpool behaves, see the Queuing section of the 
[ThreadPoolExecutor documentation](http://docs.oracle.com/javase/7/docs/api/java/util/concurrent/ThreadPoolExecutor.html).

In the default Bonita BPM configuration, `corePoolSize` is equal to `maximumPoolSize` because we have observed that the default implementation of the threadpool executor allocates work to available threads using a round robin algorithm.  
Therefore, if the maximum is reached, the thread pool size is unlikely ever to reduce to `corePoolSize`, because work is always allocated to available threads.  
The current implementation of the RejectedExecutionHandler queues the work, and reduces the system load because it does not release the caller (normal behaviour for a BlockingQueue).

After a lot of profiling, we have concluded that having an arbitrarily high number of threads in the work service does not positively impact the performance of the whole system, because it leads to a lot of contentions, mostly on the database (see [Database connections](#db_connections)).

The size of the threadpool (`corePoolSize` in the default configuration) is key, and correlates to the number of process instances the engine can handle in parallel.  
In other words, if you want the engine to be capable of handling X process instances concurrently, you should set the `corePoolSize` value of the work service to X.  
You then need to ensure that your platform infrastructure can handle X concurrent instances, checking that all other engine dependencies including the [network](#hardware) and the [database](#db) are able to process all incoming requests without loss of performance.

Setting a high `queueCapacity` limit means that more work can be queued, but can reduce throughput as work is queued rather than causing a new thread to be created.  
It is essential to ensure that the queue never becomes full (`queueCapacity` is never reached).  
If the queue becomes full, the application restarts in order to force the engine to generate all work from the database. This means that work is lost.

<a id="connector_service"/>

#### Connector service

The connector service executes connectors. To improve tenant isolation (and to protect against denial-of-service attacks), the default implementation of the connector service has its own threadpool and requires executes connectors in a separate thread from the worker.   
The configuration of the threadpool of this service must be correlated to the configuration of the work service.  
This mapping between the configurations of the two threadpools depends on your processes. If you have processes that use a lot of connectors, then you need as many connector threads as work threads.  
If you are unsure, our recommendation is to configure the two threadpools with the same values.

The Connector service is configured in `cfg-bonita-connector-timedout.xml`, `bonita-tenant-community-custom.properties` and `bonita-tenant-sp-custom.properties` (cf [platform setup](BonitaBPM_platform_setup))

```
Community:
bonita.tenant.connector.queueCapacity=10
bonita.tenant.connector.corePoolSize=5
bonita.tenant.connector.maximumPoolSize=100
bonita.tenant.connector.keepAliveTimeSeconds=100
Subscription only:
bonita.tenant.connector.timeout=300
```
For details of these parameters, see [Work service](#work_service).

<a id="scheduler_service"/>

#### Scheduler service

The Scheduler service is responsible for executing jobs.  
A job is executed inside a thread of the scheduler service.  
There are various kinds of jobs, some resulting from internal requirements such as API session cleaning, or batch deletion of a table row, and some related to process design such as BPMN2 events.  
The Bonita BPM Engine Scheduler service uses the Quartz Scheduler. Quartz takes the size of the threadpool as an input parameter.   Quartz uses threads to execute jobs concurrently.

The Scheduler service configuration is in `bonita-platform-community-custom.properties`.
You can configure:
```
bonita.platform.scheduler.quartz.threadpool.size=5
bonita.platform.scheduler.batchsize=1000
```

<a id="db_connections"/>

#### Database connections

Two datasources are defined:

* bonitaSequenceManagerDS is used for distributing ID requests
* bonitaDS is used for everything else

Note that the sum of the maximum values configured for bonitaDS and bonitaSequenceManagerDS should be less than or equal to the maximum number of simultaneous connections allowed to your database.

##### bonitaSequenceManagerDS

This datasource needs only a few connections: between 5 or 10% of bonitaDS number should be sufficient. However, this is closely correlated to the [range size](#volume).

##### bonitaDS

This datasource requires a higher value, because Bonita BPM Engine stores almost everything in the database.  
This means that every single thread from any of the entry points requires a database connection through bonitaDS.  
To make sure that this datasource is not a bottleneck, define the maximum number of database connections to be equivalent to the desired number of parallel processing threads.  
The desired number of parallel processing threads is the sum of the number of workers (see [Work service](#work_service)) plus a percentage of the number of scheduler threads 
(see [Scheduler Service](#scheduler_service)) plus a percentage of the number of concurrently external API calls (see [Client threads](#client_threads)).

<a id="datasource_settings"/>

#### Datasources settings

You need to configure the maximum pool size for datasources (the following paths are for bundle users):

For Tomcat:

* For bonitaSequenceManagerDS, edit `conf/Catalina/localhost/bonita.xml` and set `maxActive=”yourvalue”`.
* For bonitaDS, edit `conf/bitronix-resources.properties` and set `resource.ds1.maxPoolSize=”yourvalue”`.

For WildFly:

* For both bonitaDS and bonitaSequenceManagerDS, edit `server/default/deploy/bonita-ds.xml` and set `<max-pool-size>yourvalue</max-pool-size>`.

<a id="volume"/>

## Volume

This section deals with some aspects of engine configurations that have a performance impact in the case of high volume.

<a id="seq_mgr"/>

#### Sequence manager

Bonita BPM Engine manages a dedicated sequence for each table for ID generation.  
This implementation allows fast delivery of IDs and a single point of usage inside the application: the persistence service.

The sequence manager keeps in memory a range of reserved IDs by table.  
This range size is configurable by sequence so that it can be adapted to the volume you have.  
The bigger a range is, the less frequently the sequence manager will have to query the database for a new range, because it is managed in memory for as long as possible.  
However, all the IDs that are reserved in memory are lost when the JVM is shut down, so the number should not be too big or you might reach Long.MAX\_VALUE too quickly.

The sequence manager allows you to set the range size for each sequence and a default range size value, which is applied to any sequence that does not have a specific range defined. If you want to tune these values, you have to understand the correlation between them.  
For example, if you have an average of 20 steps in your process, then it would be reasonable to set the ActivityInstance range size 
to be 20 times bigger than the ProcessInstance range.

The sequence manager configuration is in `bonita-platform-community-custom.properties`.

The sequence manager has its own database connection.  
This should be appropriately sized for the number of times the sequence manager will query the database, which is a consequence of the range size values. See [Database connections](#db_connections).

#### Persistence cache

For the Teamwork, Efficiency, and Performance editions, Bonita BPM Engine has a cache providing a persistence layer using Hibernate caching. 

EhCache configuration for this persistence layer is defined in a file named `bonita-platform-hibernate-cache.xml.notused` and `bonita-tenant-hibernate-cache.xml.notused`.  
To apply the configuration of those files, remove the '.notused' suffix.  
It is possible to modify the cache settings in those files for each kind of object.

Before going into production, we encourage to finely tune the "Level-2" object cache in a pre-prod environment:

* activate Hibernate cache statistics by setting at **true** the parameter **hibernate.generate\_statistics** in file **bonita-platform-community-custom.properties**
* activate logs at INFO level:
```
<logger name="org.bonitasoft.engine.persistence" level="INFO"/>
<logger name="com.bonitasoft.engine.persistence" level="INFO"/>
```
* run load tests to simulate a production environment
* analyse the "2nd Level Cache Ratio" log messages generated, combined with the "soft-locked cache entry was expired" **warnings messages** to change the configuration in file **hibernate-cache-tenant.xml**.  
For instance, if on entity **org.bonitasoft.engine.core.document.model.impl.SDocumentImpl**, the "soft-locked cache entry was expired" warnings message occurs, it means the size of the **maxElementsInMemory** parameter must be increased, provided it is a reasonable memory size and provided the "2nd Level Cache Ratio" is not low for this element. If the "2nd Level Cache Ratio" is low or even 0, it means the cache is never used to read several times the same entity, which means the **timeToLiveSeconds** parameter should be increased, or that the cache should be completely deactivated for this entity.

Below is an example of a "soft-locked cache entry was expired" warning message:
```
WARNING: Cache org.bonitasoft.engine.core.process.instance.model.impl.SFlowNodeInstanceImpl Key org.bonitasoft.engine.core.process.instance.model.impl.SFlowNodeInstanceImpl#org.bonitasoft.engine.persistence.PersistentObjectId@25505ff 
Lockable : null
A soft-locked cache entry was expired by the underlying Ehcache. If this happens regularly you should consider increasing the cache timeouts and/or capacity limits   
```

<a id="app_cache"/>

#### Application cache

Bonita BPM Engine uses an application cache to store specific objects. The default implementation of this service relies on EhCache. It is configured in these files:

* `bonita-platform-community-custom.properties`
* `bonita-tenant-community-custom.properties`
* `bonita-platform-sp-cluster-custom.properties`
* `bonita-tenant-sp-cluster-custom.properties`

The following cache configurations can be defined:
| Configuration | Purpose| 
|:-|:-|
| connectorCacheConfig | stores connector implementations for a given connector definition| 
| processDefCacheConfig | stores process definition objects| 
| userFilterCacheConfig | stores user filter implementations for a given user filter definition| 
| migrationPlanCacheConfig | not yet used| 
| breakpointCacheConfig | not yet used| 
| groovyScriptCacheConfig | stores compiled versions of Groovy scripts| 
| synchroServiceCacheConfig | used by the benchmark test infrastructure (and has no meaning outside of it)| 
| transientDataCacheConfig | stores transient data| 
| platformCacheConfig | used to store platform object, which contains general platform information such as the version, or start date| 
| parameterCacheConfig | stores process parameters| 

<a id="jvm"/>

#### Java Virtual Machine

You can configure the JVM settings for the engine to tune performance.  
Check the [JVM documentation](http://docs.oracle.com/javase/7/docs/technotes/tools/windows/java.html) for details of the available settings.

Notably, we recommend you to set the initial (`-Xms`) and maximum (`-Xmx`) heap sizes to the same value.  
This reduces the likelihood of the JVM garbage collector starting.  
While the garbage collector is running, it prevents creation of new objects, which slows down the application server.

<a id="network"/>
<a id="hardware"/>

## Hardware and network

This section deals with performance impact of hardware elements.

Bonita BPM performance is very correlated to the database connectivity and its behavior.  
Almost everything (API call, internal processing using workers, jobs scheduling, and so on) requires a database access.  
Two elements are critical: network latency, as in most cases your database is located on another server, and the I/O of your hard drives.  
In case of issues, you should monitor these two elements and consider improvements. For example:

* locate your database in the same datacenter as the Bonita BPM Engine, using gigabit network connections
* use SSD hard drives, and RAID configuration with striping

Network connectivity also impacts access to the engine APIs when you are not using local access, that is, 
if you are using [EJB3](#ejb3), [HTTP](#http), [REST](#rest).

## Database, Transaction Manager, and logs

This section is a reminder about some of the main dependencies Bonita BPM Engine has that have a strong impact on the performance of the whole system.

Bonita BPM Engine relies on several other components that each have their own performance tuning options.  
Some of them are key for the system and you should pay a lot of attention to them.  
In most cases, the key things to consider are the [database](#db), [transaction manager](#tm), and [logs](#logs).

<a id="db"/>

#### Database

Bonita BPM Engine uses the database heavily, so in consequence a slow database makes the engine slow.

It is essential that the hardware configuration of the server hosting the DB is powerful, considering resources like CPU, memory or others depending on your database instance.

In addition to this, make sure that your database instance is well configured.  
Most database software provides many options for tuning, and some of them are easy to set up.  
Others may be more difficult and present choices between robustness and performance, fast read or fast write, etc.  
Your database configuration must be correlated with the Bonita BPM Engine usage pattern.  
To find the right characteristic to optimize, one good starting point is to consider whether you are creating a lot of process instances (in which case optimize database writes) or you are executing a lot of read queries like `getTaskList` (in which case optimize database reads).

<a id="tm"/>

#### Transaction manager

Bonita BPM Engine is natively compatible with the Java Transaction API. This means transaction management relies on a transaction manager.  
If you are using a JEE Application server, then you only have to configure Bonita BPM Engine to use the transaction manager that is provided.  
Otherwise, you have to embed a transaction manager (for example, we embed Bitronix by default in the Tomcat bundle).

A transaction manager manages a transaction log and also frequently has notions of internal pooling.  
For example, in [Bitronix](https://github.com/bitronix/btm/wiki/JDBC-pools-configuration) you can configure some options for the transaction journal. 

<a id="logs"/>

#### Logs

In general, increasing the log level is useful for debugging but has a performance cost.  
With this in mind, [define the log level for technical logs, queriable logs and archives](set-log-and-archive-levels.md).

Remember that Bonita BPM Engine dependencies also have their own log and debug options that may impact strongly the system performance. 
Be sure to configure these appropriately.

## Connector time tracker

It is now possible to track the duration of actions in a connector using a new time tracker. The tracker service tracks several connector lifecycle operations, and produces a CSV file.  
This service can impact performance so is disabled by default.  
It is configured by editing `bonita-tenant-community-custom.properties` and `bonita-tenants-custom.xml`.  
To activate connector time tracking: 

1. Change the value of `startFlushThread` from `false` to `true`.
2. Uncomment 'flushEventListeners' and 'activatedRecords' beans.

## Process design, event handlers, and cron jobs

<a id="process_design"/>

#### Process design

There are several things you can do during the process design to reduce performance overheads.  
This is mostly related to reducing usage of extension points when possible.  
Consider carefully your usage of connectors, groovy scripts, XML and serializable data.

<a id="event_handlers"/>

#### Event handlers

Events handlers are extensions of the engine configuration.  
You can add event handlers for several purposes and you can configure which events you want to catch.  
We strongly recommend that you add only appropriate handlers and carefully code the handler filters to handle only those events that you are interested in.

<a id="cron"/>

#### Cron jobs

Bonita BPM Engine uses the [Scheduler service](engine-architecture-overview.md) to trigger jobs in a recurrent manner.

The Bonita BPM Scheduler service implementation uses the Quartz Scheduler.  
A cron job in Quartz can run at maximum every second (you cannot set a lower value than 1 second).  
Three cron jobs are defined: 

* Event handling. This job processes BPMN2 messages. It runs every 5 seconds by default. 
     If you want your process instances to react faster, you can reduce this value.  
     Property name: `org.bonitasoft.engine.cron`
* Delete dirty objects. This job cleans objects that have been tagged as _dirty_. 
     To increase performance, during process instance execution, Bonita BPM Engine tags some frequently used objects as _dirty_ instead of deleting them.  
     This is done like this to reduce contention on database.   
     Those dirty objects have to be cleaned periodically and this is done by default every 5 minutes.   
     Property name: `delete.job.frequency`
* Delete invalid sessions. This job cleans Bonita BPM Engine sessions kept in memory. 
     It iterates over engine sessions and removes any that are invalid. By default this is done every 2 hours.  
     If you are creating a lot of new sessions in a short time, increase this frequency to avoid allocating too much memory to those 
invalid sessions and to avoid out-of-memory errors.  
     Property name: `org.bonitasoft.engine.clean.invalid.sessions.cron`

These property values are configured in `bonita-platform.properties` and are used to initialize the Quartz trigger tables the first time that the Engine starts.  
They are not read subsequently, so changing the values in `bonita-platform.properties` after the Engine has been started has no effect on Quartz.  
For value definition, and information about how to update the Quartz trigger tables, see the [Quartz documentation](http://www.quartz-scheduler.org/documentation/) about Cron Triggers.
