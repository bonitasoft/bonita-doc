# Bonita BPM Portal URLs

This page explains how to use a URL to access Bonita BPM Portal or the form for a specific task. In these URLs, the process names, versions and the task names must be URL encoded.

## URL of Bonita BPM Portal

You can connect to Bonita BPM Portal from other tools using a URL of the form `http://`_`host`_`:`_`port`_`/bonita#?....`. Other forms of URL are liable to change in future versions. For example, use `http://localhost:8081/bonita#?process=myProcessId&locale=fr`, and do not use `http://localhost:8081/bonita/console/homepage#?process=myProcessId&locale=fr`.

## Process instantiation URL

The following code samples show how to generate a link to a process instantiation form.

### Complete URL

This sample shows how to construct the complete URL. Prefer the short format for backward compatibility.
```java
    return new StringBuffer("URL: <a href=\"")
    .append("http://");
    .append(host)
    .append(":")
    .append(port)
    .append("/bonita/portal/resource/process/")
    .append(processName)
    .append("/")
    .append(processVersion)
    .append("/content/?id=")
    .append(processDefinitionId)
    .append("\">here</a>")
    .toString();
```

Example:  
`http://localhost:8080/bonita/portal/resource/process/Task%20link%20via%20email/1.0/content/?id=34951576542454`

### Short URL

This sample shows how to construct the short URL. Prefer this format for backward compatibility. You will automatically be redirected to the complete format.
```java
 return new StringBuffer("URL: <a href=\"")
    .append("http://");
    .append(host)
    .append(":")
    .append(port)
    .append("/bonita/portal/form/process/")
    .append(processName)
    .append("/")
    .append(processVersion)
    .append("\">here</a>")
    .toString();
```

Example:  
`http://localhost:8080/bonita/portal/form/process/Task%20link%20via%20email/1.0`

## Process overview URL

The following code samples show how to generate a link to a process overview form.

### Complete URL

This sample shows how to construct the complete URL. Prefer the short format for backward compatibility.
```java
return new StringBuffer("URL: <a href=\"")
    .append("http://")
    .append(host)
    .append(":")
    .append(port)
    .append("/bonita/portal/resource/processInstance/")
    .append(processName)
    .append("/")
    .append(processVersion)
    .append("/content/?id=")
    .append(processInstanceId)
    .append("\">here</a>")
    .toString();
```

Example:  
`http://localhost:8080/bonita/portal/resource/processInstance/Task%20link%20via%20email/1.0/content/?id=8`

### Short URL

This sample shows how to construct the short URL. Prefer this format for backward compatibility. You will automatically be redirected to the complete format.
```java
 return new StringBuffer("URL: <a href=\"")
    .append("http://")
    .append(host)
    .append(":")
    .append(port)
    .append("/bonita/portal/form/processInstance/")
    .append(processInstanceId)
    .append("\">here</a>")
    .toString();
```

Example:  
`http://localhost:8080/bonita/portal/form/processInstance/8`

## Task URL

::: danger
:fa-exclamation-triangle: **Important:** A task is not automatically assigned to the user who accesses the task form. If a user is using Bonita BPM Portal, the assignment is automatic. However, if a user is accessing a form directly from an application, there must first be a [REST API call to assign the task to the user](bpm-api.md). Otherwise, the user will not be able to execute the task.
:::

The following code samples show how to generate a link to a human task.

### Complete URL

This sample shows how to construct the complete URL. Prefer the short format for backward compatibility.
```java
 return new StringBuffer("URL: <a href=\"")
    .append("http://")
    .append(host)
    .append(":")
    .append(port)
    .append("/bonita/portal/resource/taskInstance/")
    .append(processName)
    .append("/")
    .append(processVersion)
    .append("/")
    .append(activityName)
    .append("/content/?id=")
    .append(activityInstanceId)
    .append("\">here</a>")
    .toString();
```

Example:  
`http://localhost:8080/bonita/portal/resource/taskInstance/Task%20link%20via%20email/1.0/Task/content/?id=3`

### Short URL

This sample shows how to construct the short URL. Prefer this format for backward compatibility. You will automatically be redirected to the complete format.
```java
return new StringBuffer("URL: <a href=\"")
    .append("http://")
    .append(host)
    .append(":")
    .append(port)
    .append("/bonita/portal/form/taskInstance/")
    .append(activityInstanceId)
    .append("\">here</a>")
    .toString();
```

Example:  
`http://localhost:8080/bonita/portal/form/taskInstance/3`

Or if you only have the process instance ID and the task name:
```java
  return new StringBuffer("URL: <a href=\"")
    .append("http://")
    .append(host)
    .append(":")
    .append(port)
    .append("/bonita/portal/form/processInstance/")
    .append(processInstanceId)
    .append("/task/")
    .append(taskName)
    .append("\">here</a>")
    .toString();
```

Example:  
`http://localhost:8080/bonita/portal/form/processInstance/8/task/request%20approval`

With the above format, the first task with the name "request approval" available for the user found in the process instance with id 8 will be displayed.

## Using autologin
Bonita BPM 6.x URL syntax is supported in 7.x. Thus, 6.x autologin feature is supported in 7.0 version with 6.x URL syntax.
Go to [Accessing Bonita BPM Portal and forms by URL 6.5 documentation](bonita-bpm-portal-urls.md) for more information about this.

## URL parameter summary

| | | |
|:-|:-|:-|
| Parameter | Description | Example |
| `locale=<string>` | Optional. Identifies the language to be used. | `locale=en`  |
| `id=<id>` | <ul><li>For process instantiation URL, identifies the process definition id.</li><li>For process overview URL, identifies the process instance id.</li><li>For task URL, identifies the activity instance of the task.</li> | `id=6972973247608922361` |
| `user=<userId>` | Optional. Identifies the user you perform the task for (for administrators and process managers). | `user=201`  |
| `tenant=<tenantId>` | Optional. Identifies the tenant on which the process is deployed for multiple tenants environments (Multi-tenancy is available with the Performance edition only). | `tenant=2` |
