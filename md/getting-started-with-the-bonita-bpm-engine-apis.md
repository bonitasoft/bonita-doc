# 4.5 Getting started with the Bonita BPM Engine APIs

Before you run a Bonita BPM application, [configure bonita\_home](/configuring-bonita-home-for-a-client.md) to specify how the application accesses the Bonita BPM Engine, and set the `bonita.home` system property.

All sequences of API calls start with logging in to create a session then using the AccessorUtil to retrieve the APIs that will be used in the application.

The APIs are retrieved using an accessor. To retrieve the PlatformLoginAPI and the PlatformAPI, use the PlatformAPIAccessor. 
After the platform has been created and initialized, use the TenantAPIAccessor to retrieve the other APIs. The TenantAPIAccessor is used even though there is a single tenant.

The following example shows how to retrieve the LoginAPI, then use it to log in and create a session, then retrieve for API for that session. 
The platform has already been created and initialized and the Engine is started.
`
final LoginAPI loginAPI = TenantAPIAccessor.getLoginAPI();
APISession session = loginAPI.login(userName, password);
ProcessAPI processAPI = TenantAPIAccessor.getProcessAPI(session);
`

When the application has finished processing, log out to delete the session:
`
loginAPI.logout(session);
`