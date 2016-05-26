# Getting started with the Bonita BPM Engine APIs

Before you run a Bonita BPM application, configure how the application (client) accesses the Bonita BPM Engine (server). For a HTTP access it can be done using following code:

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