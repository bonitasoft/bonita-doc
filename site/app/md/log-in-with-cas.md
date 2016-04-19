# 4.5.7 Log in with CAS

Depending on your underlying authentication service, you may need to provide other information with the API in order to log in. A login method with a map enables you to provide the set of credentials that the authentication service requires. 
The following example can be used if you are [using Bonita BPM with CAS](/single-sign-cas.md):

`
final LoginAPI loginAPI = TenantAPIAccessor.getLoginAPI();
final Map credentials = new HashMap();
credentials.put(AuthenticationConstants.CAS_TICKET, ticket);
APISession session = loginAPI.login(credentials);
ProcessAPI processAPI = TenantAPIAccessor.getProcessAPI(session);
`