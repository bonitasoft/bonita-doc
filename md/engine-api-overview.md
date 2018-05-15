# Engine API overview

You can use the Bonita Engine APIs to customize or add to the Bonita software. Typical developments are adding a connector, adding an actor filter, and replacing or supplementing a service.

## Concepts

### Session

This version of Bonita introduces the concept of a _session_. A session is the context in which processing occurs, and is created when a user logs in to the Engine. 

The APIs remain available for the duration of a session. 

### User validation

This version of Bonita introduces user validation: when a user name and password are sent to the Engine, it checks that the user exists in the current organization. If the user is not known, an error is thrown and processing stops.

## APIs

Bonita Engine has the following Java APIs:
| | |
|:-|:-|
| Identity API | Manages information about an organization, that is, the set of users who can act in processes. Handles creation, modification, and deletion of organizations, groups, roles, memberships, and users.|  
| Organization API | Import or export an organization.|  
| Process API | Handles actions related to processes (deploy, enable, start, disable, delete), executes activities, updates process data, search for a retrieve process entities.|  
| Login API | Logs in to the engine in a platform and creates a session.|  
| Monitoring API | Retrieves information about current activity, such as the number of users logged in, or the number of processes currently being executed.|  
| Log API | provides access to business logs, for searching and to retrieve information about current or archived processes.|  
| Platform command API | Creates, starts, stops platform.|  
| Document API | Manages documents that are attached to a process instance.|  
| Theme API | Manages the Look & Feel of the Bonita Portal web and mobile interfaces and forms.|  
| Tenant Management API | Used to pause service in a tenant for maintenance, to resume service, and to check whether a tenant is paused. Available in Teamwork, Efficiency, Performance and Enterprise editions.|  

There is also a Web API, which is for internal use only, and a Command API,
which is primarily for internal use.

For details of the Engine APIs, the methods and related objects, see the 
[Javadoc](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/index.html). 
Note that the APIs are the same for the Teamwork, Efficiency, Performance and Enterprise editions, but some features are only active if the appropriate license is installed. 
If you try to access a feature for which you do not have a license, a _Feature not active_ error message is returned.

There is also a high-level [Web REST API](rest-api-overview.md), intended for customers developing portal applications.

## API access

The Bonita Engine APIs can be accessed locally or remotely, in the following modes:

* Local: the client accesses the server directly in local mode
* EJB3: the client accesses a remote server using EJB3 mode
* HTTP: the client accesses a remote server via HTTP

![Diagram of API access options](images/images-6_0/dev_overview_api_access.png)

The mode you use must be specified in the bonita-client-custom.properties file. By default, the access mode is local. This can be used when the client and engine are using the same JVM. The file contains commented out configurations for remote access modes. To change the mode, simply comment out the configuration for local and uncomment the relevant remote configuration.

There is a slight overhead in using the remote access methods, so you are recommended to use local access whenever it is possible.

## Getting started with the Bonita Engine APIs

Before you run a Bonita application, configure how the application (client) accesses the Bonita Engine (server). For a HTTP access it can be done using following code:

```java
 final Map<String, String> parameters = new HashMap<>();
 if(HTTP.equals(apiType)){
   parameters.put("server.url", "http://localhost:8080");
   //application name is the name of context, default is bonita
   parameters.put("application.name", "bonita");
 }
 APITypeManager.setAPITypeAndParams(ApiAccessType.valueOf(apiType), parameters);
```

All sequences of API calls start with logging in to create a session then using the AccessorUtil to retrieve the APIs that will be used in the application.

The APIs are retrieved using an accessor. To retrieve the PlatformLoginAPI and the PlatformAPI, use the PlatformAPIAccessor. 
After the platform has been created and initialized, use the TenantAPIAccessor to retrieve the other APIs. The TenantAPIAccessor is used even though there is a single tenant.

The following example shows how to retrieve the LoginAPI, then use it to log in and create a session, then retrieve for API for that session. 
The platform has already been created and initialized and the Engine is started.
```java
final LoginAPI loginAPI = TenantAPIAccessor.getLoginAPI();
APISession session = loginAPI.login(userName, password);
ProcessAPI processAPI = TenantAPIAccessor.getProcessAPI(session);
```

When the application has finished processing, log out to delete the session:
```java
loginAPI.logout(session);
```
