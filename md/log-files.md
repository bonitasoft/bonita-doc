# Log files

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

During development, the Studio log file contains messages about development activities, including any errors.
When you run a process for testing, messages are written to the Engine log file.

From the Bonita BPM Studio Help menu you can access the Studio log file 
and the Engine log file.

See the [Logging overview](logging.md) for details of how logging is implemented in Bonita BPM and how to add logging to Groovy scripts or Java code that you add to a process

## Studio log file

To access the Studio log file, choose **Bonita BPM Studio log** from the **Help** menu.

For Bonita BPM Studio, you can set the level of logging. Edit the `config.ini` in the Studio root configuration directory and set the value of `eclipse.log.level` to ERROR, WARNING, INFO, or ALL.

| | |
|:-|:-|
| ERROR | Only error messages are logged| 
| WARNING | Only error and warning messages are logged| 
| INFO | Error, warning, and Info message are logged (this is the default)| 
| ALL | All messages are logged, including debug information| 

## Engine log file

When you run a process locally from Bonita BPM Studio for testing, you can access the Engine log file by choosing **Bonita BPM Engine log** from the **Help** menu. 
The logging level for Engine when it is started from Studio is always `INFO`. 

On a deployed system, you can configure the log level and you can access the log files directly, in `<TOMCAT_HOME>/server/logs`. 
Each file name includes the date when the file was created. There are several log files:

* _bonita.date_.log is the Bonita BPM Engine log file.
* _catalina.date_.log is the log file for the Tomcat application server used by Bonita BPM Studio.
* _host-manager.date_.log, _localhost.date_.log, and _manager.date_.log are internal Tomcat log files.
