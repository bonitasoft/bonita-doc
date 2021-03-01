# SSO Log in with CAS

Use CAS as your Single Sign On (SSO) authentication server to log into Bonita Portal or REST APIs.

::: info
**Note:** For Enterprise, Performance and Efficiency editions only.
:::

Depending on your underlying authentication service, you may need to provide other information with the API in order to log in. A login method with a map enables you to provide the set of credentials that the authentication service requires. 
The following example can be used if you are [using Bonita with CAS](single-sign-on-with-cas.md):

```java
final LoginAPI loginAPI = TenantAPIAccessor.getLoginAPI();
final Map<String, Serializable> credentials = new HashMap<String, Serializable>();
credentials.put(AuthenticationConstants.CAS_TICKET, ticket);
APISession session = loginAPI.login(credentials);
ProcessAPI processAPI = TenantAPIAccessor.getProcessAPI(session);
```
