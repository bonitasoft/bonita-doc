# Timers execution

## What are timers

Timers are BPMN event that are executed at a **given date** (type **DATE**), after a **periode of time** (type **DURATION**) or following a **CRON expression** (type **CYCLE**)

## Execution mechanism

Their execution is delegated to the **Quartz Job Scheduler**, a popular Java scheduling library.

## Change timers execution data

Execution date for timer of type **DATE** or **DURATION** (not **CYCLE**) can be changed using the [BPM Rest API](bpm-api.md#timers)

## Handle failures on timer execution

### Failure behavior

When a timer fails the following happens:

* a FailJob is registered that contains
  * The id of the `JobDescriptor` that failed
  * The stacktrace of the last failure
  * The date of the failure
  * The number of times it has failed
* If the timer is of type **CYCLE** subsequent executions will still be triggered

### Handling the failure

To check for failure you can call the API method `org.bonitasoft.engine.api.ProcessRuntimeAPI#getFailedJobs(int, int)`

Then you can replay a timer that failed using `org.bonitasoft.engine.api.ProcessRuntimeAPI#replayFailedJob(long)`

If the job failed more than one time, you can restart this job multiple times by calling this api method the number of times you wish.

Once this method is called (at least once) the `FailedJob`s for this timer will be cleared.


## Tune performance of timers execution

If you notice that timers are executed significantly after the date they should be executed, you might suffer Quartz performance issues.
Check [this page](performance-tunning.ms#cron) to fine tune Quartz performance.
