# Logs

This page contains information about logging in Bonita BPM.

## How components produce log messages

The components of Bonita BPM have their own ways to produce logs, which are described below.

### Bonita BPM Engine

All the Engine services call the [technical logger service](technical-logging.md) in order to write log messages. There is no direct access to any logging framework such as log4j, JUL or SLF4J.

### Bonita BPM Portal

The Portal uses the [Java Util Logging](http://docs.oracle.com/javase/6/docs/api/java/util/logging/package-summary.html) (JUL) directly to log messages.

### Bonita BPM Studio

The Studio uses a logging service provided by the Eclipse platform. Modification of the Studio logging configuration is not very common except for debugging the Studio itself.

The Bonita BPM Studio provides direct access to the log written by the embedded Portal and Engine. You can access this log from the Bonita BPM Studio **Help** menu **Show Engine log** option (**Engine log** also contains UI designer logs).

## Logging configuration

### Bonita BPM Engine and Bonita BPM Portal

The [technical logger service](technical-logging.md) uses SLF4J (version 1.6.1) to create the log. SLF4J is also used directly by Bonita dependencies such as Hibernate, Quartz and Ehcache.

SLF4J is a facade for various logging frameworks, and a logging framework must be available as the back-end. By default, Bonita BPM uses JUL (Java Util Logging) as a the back-end to SLF4J. This is defined by including the `slf4j-jdk14-1.6.1.jar` in the `bonita.war WEB-INF/lib` folder.

By default in Bonita BPM Engine and Bonita BPM Portal, all logs are sent to the JUL framework. To configure what is logged and where it is stored, modify the JUL configuration. The method of configuring JUL depends on the application server you use:

* Apache Tomcat: edit the logging.properties file located in conf folder (see the [Apache Tomcat logging documentation](http://tomcat.apache.org/tomcat-7.0-doc/logging.html)).
* WildFly Application Server: some documentation is available in the WildFly 9.0 [Admin guide](https://docs.jboss.org/author/display/WFLY9/Logging+Configuration).
* Other application server: refer to your application server documentation on Java Util Logging configuration.

For the Tomcat embedded in Bonita BPM Studio, the JUL configuration file is located in the Studio installation folder under
`workspace/tomcat/conf`. After editing this file, restart Tomcat by going to the **Server** menu and selecting the **Restart web server** option.

Here is an example of the JUL configuration for the logger used in the [example below](#your_log):
```
# Reuse Bonita BPM log handler (file bonita.log) for org.mycompany.connector loggers
org.mycompany.connector.handlers = 5bonita.org.apache.juli.FileHandler
# Set log level to "finest" for newly created connector
org.mycompany.connector.level = FINEST
# Set log level to "finest" for Groovy script
org.bonitasoft.groovy.script.level = FINEST
```

### Bonita BPM Studio

To change the Bonita BPM Studio log level (usually to debug Studio), go to the Studio installation folder, configuration directory, and edit the `config.ini` file. You need to set the property `eclipse.log.level` to one of the following values: INFO, WARNING or ERROR.

## How to include logging in your development on Bonita BPM

When you write Groovy scripts or Java code to be included in a process (for example, to create a new connector implementation), logging is usually required. The recommended option is to use [SLF4J](http://www.slf4j.org/) in order to log messages. SLF4J is included in the Bonita dependencies so you can use it without adding extra dependencies. However, to get completion for SLF4J classes during development you need to add the slf4j-api jar file temporarily to your process dependencies (click **_Configure_** then choose **Application dependencies**).

This is an example of how to log debug information in a Groovy script. Note that we recommend that you use a logger name that starts with "org.bonitasoft", so that the default Bonita logging configuration is applied to your logger. Also, ending your logger name with a name similar to the Groovy script will be helpful to identify source of the message.
```groovy
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
Logger logger = LoggerFactory.getLogger("org.bonitasoft.groovy.script.my_int_init_script");
logger.debug("Set initial value of process variable using Groovy script");
return Integer.valueOf(3 + 5);
```

This is an example of how to use logging in a connector:
```groovy
private static final Logger LOGGER = LoggerFactory.getLogger(SumImpl.class); 

@Override 
protected void executeBusinessLogic() throws ConnectorException {
LOGGER.debug("Trying to sum {} and {}.", getIntegerA(), getIntegerB());
int sum = getIntegerA() + getIntegerB(); 
LOGGER.debug("The sum is: {}", sum);
setSum(sum);
}
```

## View log content

### Bonita BPM Studio

In Bonita BPM Studio you have access to two log files:

* The Studio log file includes information about Studio execution. Look at this file if you see incorrect behavior of the Studio. To view the file, go to the **Help** menu and choose **Show Studio log**. The file is located in the `workspace/.metadata` folder and is named `.log`. 
* The Engine and Portal log file receives all log messages produced by the Bonita Platform embedded in the Studio. When you test your processes by running them from the Studio you will find valuable debugging information in this file. To view the file, go to the **Help** menu and choose **Show Engine log**. The file is located in `workspace/tomcat/log` and is named `bonita-yyyy-mm-dd.log`.

### Bonita Platform

The log file location depends on your application server. 

#### Packages

Logs are configured via the class package names and the main packages are `org.bonitasoft` and `com.bonitasoft` for subscription edition.  
Change these packages value to change the BonitaBPM global log level.

#### Tomcat

On a Tomcat bundle, you can configure the log level and you can access the log files directly, in `$TOMCAT_HOME/logs`. 
Each file name includes the date when the file was created. There are several log files:

* _bonita.date_.log is the Bonita BPM log file.
* _catalina.date_.log is the log file for the Tomcat application server used by Bonita BPM Studio.
* _host-manager.date_.log, _localhost.date_.log, and _manager.date_.log are internal Tomcat log files.

#### WildFly

On a WildFly bundle, logs can be configured in the `$WILDFLY_HOME/standalone/configuration/standalone.xml` in the `urn:jboss:domain:logging:3.0` _domain_ of the **subsystem** tag.

Edit the **logger** tags which category matches BonitaBPM main package: change the **level** _name_ attribute of each **logger** section you want to change the log level.

Log files are located in the `log` folder of the launched configuration.  
Usually, the standalone configuration is run so the log files are located in the `$WILDFLY_HOME/standalone/log` folder.

* _boot.log_ : contains WildFly boot logs.
* _server.**date**.log_: is the global log file of the WildFly server.
* _bonita.**date**.log_: is Bonita BPM log file.

