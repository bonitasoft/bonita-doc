# Work execution audit

Sometimes it is useful to understand what is currently happening in the platform, in particular for work execution, see [Work service mechanism](execution-sequence-states-and-transactions.md).

This can be achieved using a specific logger called _Work execution audit_

## What can be tracked

### Abnormal work execution

The logger produce a _Warning_ each time a work takes too much time to be executed or it was _rescheduled_ too much times.

For theses cases, it also produces an _Info_ log when the work was finally executed.


A _reschedule_ happens when a work can't be executed right now because some other work already locked the same process instance.

### Activate and configure the work execution audit

The audit is activated by default, it can be deactivated or reactivated here:

In `bonita-tenant-community-custom.properties` set flag `bonita.tenant.work.audit.activated` to `true` or `false`

Some properties can be configured, these can be found in the default configuration file `bonita-tenant-community.properties` under the `Work execution audit` section

See [the file on Github](https://github.com/bonitasoft/bonita-engine/blob/7.9.0/bpm/bonita-core/bonita-process-engine/src/main/resources/bonita-tenant-community.properties)

There is a dedicated logger called `BONITA_WORK_AUDIT.EXECUTION`, its level can be changed to DEBUG for more information, in file `logging.properties`.