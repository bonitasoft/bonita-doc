# Technical logger

This page describes the technical logger service.

## Purpose

The purpose of this service is to provide an abstraction to the logging framework to all Bonita Engine services, to facilitate debugging of other services.

The logged messages are not intended to be accessible through the Engine API (see [Queriable logger service](queriable-logging.md)).

## Usage

If you are creating a custom implementation of a service, you might be interested in using the technical logging
service. Refer to the implementations of existing services for examples of technical logging service usage (for example the [AuthenticationServiceImpl](https://github.com/bonitasoft/bonita-engine/blob/master/services/bonita-authentication/bonita-authentication-api-impl/src/main/java/org/bonitasoft/engine/authentication/impl/AuthenticationServiceImpl.java)).

Basically, the technical logging service exposes a method that receives the following parameters: 

* class name (the source of the log message)
* message
* throwable (when message is associated with an exception)
* severity

See the [service
interface](https://github.com/bonitasoft/bonita-engine/blob/master/services/bonita-log/bonita-log-technical-api/src/main/java/org/bonitasoft/engine/log/technical/TechnicalLoggerService.java) for details.

## Implementation details

The technical logger 
[implementation](https://github.com/bonitasoft/bonita-engine/blob/master/services/bonita-log/bonita-log-technical-slf4j/src/main/java/org/bonitasoft/engine/log/technical/TechnicalLoggerSLF4JImpl.java)
uses SLF4J version 1.6.1 to handle the log. SLF4J itself uses a back-end logging framework to write log messages. See the [logging
overview](logging.md) for more details.

Logged messages are passed to SLF4J with appropriate logger information so the source of the message remains
meaningful.

## Example

The following example, `DelayedRetry`, shows how to write messages to the technical log. `DelayedRetry` can be called from an [event handler](event-handlers.md) that detects failed tasks.
```groovy
package com.bonitasoft.handlers;

import org.bonitasoft.engine.api.LoginAPI;
import org.bonitasoft.engine.api.ProcessRuntimeAPI;
import org.bonitasoft.engine.api.TenantAPIAccessor;
import org.bonitasoft.engine.log.technical.TechnicalLogSeverity;
import org.bonitasoft.engine.log.technical.TechnicalLoggerService;
import org.bonitasoft.engine.session.APISession;

public class DelayedRetry implements Runnable {

    /** Id of the task to run again. */
    private long taskId;

    /** Bonita technical logger. */
    private TechnicalLoggerService technicalLog;

    public void setTaskId(long id) {
        taskId = id;
    }

    public void setTechnicalLog(TechnicalLoggerService technicalLog) {
        this.technicalLog = technicalLog;
    }

    @Override
    public void run() {
        try {
//          if (technicalLog
//                  .isLoggable(this.getClass(), TechnicalLogSeverity.TRACE)) {
                StringBuilder message = new StringBuilder();
                message.append("Starting to wait before trying again task execution ");
                message.append(taskId);
                technicalLog.log(this.getClass(), TechnicalLogSeverity.TRACE,
                        message.toString());
//          }
            
            // Wait for 2 minutes before retry
            Thread.sleep(2*60*1000);
            
//          if (technicalLog
//                  .isLoggable(this.getClass(), TechnicalLogSeverity.TRACE)) {
                StringBuilder message2 = new StringBuilder();
                message2.append("Will now try task execution ");
                message2.append(taskId);
                technicalLog.log(this.getClass(), TechnicalLogSeverity.TRACE,
                        message2.toString());
//          }
            
            // Get the LoginAPI using the TenantAPIAccessor
            LoginAPI loginAPI = TenantAPIAccessor.getLoginAPI();

            // Log in to the tenant to create a session
            final APISession session = loginAPI.login("admin", "bpm");

            // Get the ProcessRuntimeAPI using the TenantAPIAccessor and the
            // previously created session
            ProcessRuntimeAPI processAPI = TenantAPIAccessor
                    .getProcessAPI(session);

            processAPI.retryTask(taskId);
        } catch (Exception e) {
//          if (technicalLog.isLoggable(this.getClass(),
//                  TechnicalLogSeverity.ERROR)) {
                technicalLog.log(this.getClass(), TechnicalLogSeverity.ERROR,
                        "Error while retyring task execution. Task id: "
                                + taskId, e);
//          }
        }
    }

}
```
