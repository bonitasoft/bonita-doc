# 2.4 User authentication


[Overview](#overview)  
[Bonita BPM Portal authentication scenario](#user)  
[Information about sessions](#moreinfo)  
[How does the Bonita BPM Portal know if a user is authenticated](#isauthenticated)  



## Overview

This page describes how user authentication is achieved in Bonita BPM (running with default configuration). 
The links in this page to the source code repository are to the 7.0.0 code, but ther are only minor differences for 7.1.0 and the maintenance releases.


If you want to find out how to customize authentication refer to the dedicated documentation pages:

* [LDAP server / Active Directory](/active-directory-or-ldap-authentication-0)
* [CAS single sign-on (SSO)](/single-sign-cas-1)

## Bonita BPM Portal authentication scenario


To help understand how user authentication is performed, let's take a typical case where a user accesses the Bonita BPM Portal for the first time. This scenario is the default (no LDAP authentication, nor CAS).
![user authentication](images/images-6_0/user_auth_schema_70.png)

1. In a web browser, the user types the URL of Bonita BPM Portal
(e.g. `http://localhost:8080/bonita`) that will initiate a
HTTP request handled by the application server that delegates
processing to the Bonita web application.

2. When asked for the Bonita root, the URL server will 
provide a `index.html` file (you can find the `index.html`
in the `bonita.war` file). This is defined by the `welcome-file`
property in the Bonita web application deployment descriptor (a `web.xml`
file located in `bonita.war/WEB-INF`).

3. Javascript in `index.html` will redirect the user to `/portal/homepage`
(e.g. `http://localhost:8080/bonita/portal/homepage`).

4. [AuthenticationFilter](https://github.com/bonitasoft/bonita-web/blob/7.0.0/server/src/main/java/org/bonitasoft/console/common/server/login/filter/AuthenticationFilter.java)
applied to the HTTP request send to `/portal/homepage`.
The filter will check if the user is already authenticated. To do so, it will look in the HTTP session for an `apiSession` attribute (see [AlreadyLoggedInRule](https://github.com/bonitasoft/bonita-web/blob/7.0.0/server/src/main/java/org/bonitasoft/console/common/server/login/filter/AlreadyLoggedInRule.java)).
If an `apiSession` attribute exists, this means a user is already authenticated.
5. If the attribute `apiSession` is not set, the user will be redirected to the login page. 
**Note:** Information about the original page the user tried to reach is included in a URL parameter named `redirectURL`.
The login page URL is determined by the [AuthenticationManager](https://github.com/bonitasoft/bonita-web/blob/7.0.0/common/src/main/java/org/bonitasoft/console/common/server/auth/AuthenticationManager.java)
implementation. The implementation to use for the current tenant is configured in a file `authenticationManager-config.properties`
(located in `bonita.home` under `client/tenants/[tenantid]/conf`). The default [AuthenticationManager](https://github.com/bonitasoft/bonita-web/blob/7.0.0/common/src/main/java/org/bonitasoft/console/common/server/auth/AuthenticationManager.java)
is [StandardAuthenticationManagerImpl](https://github.com/bonitasoft/bonita-web/blob/7.0.0/common/src/main/java/org/bonitasoft/console/common/server/auth/impl/standard/StandardAuthenticationManagerImpl.java).
Its behavior is to redirect to the `login.jsp` page embedded in the webapp.
Supporting different implementations enables authentication on an external application (useful for SSO deployement for example).

6. `login.jsp` page will ask the user for the username
and password (HTML form). When submitting the form, a `POST`
request is sent to `/loginservice`. The request includes the
username, password, tenant id (if provided in the URL, only applied to
subscription editions), locale (optional, by priority order: provided
in the URL, stored in HTTP cookie) and the `redirectURL`
information.
7. URL `/loginservice` is handled by [LoginServlet](https://github.com/bonitasoft/bonita-web/blob/7.0.0/server/src/main/java/org/bonitasoft/console/common/server/login/servlet/LoginServlet.java).

8. [LoginServlet](https://github.com/bonitasoft/bonita-web/blob/7.0.0/server/src/main/java/org/bonitasoft/console/common/server/login/servlet/LoginServlet.java)
calls `login` method of [LoginManager](https://github.com/bonitasoft/bonita-web/blob/7.0.0/server/src/main/java/org/bonitasoft/console/common/server/login/LoginManager.java)

9. [LoginManager](https://github.com/bonitasoft/bonita-web/blob/7.0.0/common/src/main/java/org/bonitasoft/console/common/server/login/LoginManager.java)
searches for an [AuthenticationManager](https://github.com/bonitasoft/bonita-web/blob/7.0.0/common/src/main/java/org/bonitasoft/console/common/server/auth/AuthenticationManager.java)
implementation based on configuration file for current tenant (see `authenticationManager-config.properties`
in `bonita.home` under `client/tenants/[tenantid]/conf`). The default [AuthenticationManager](https://github.com/bonitasoft/bonita-web/blob/7.0.0/common/src/main/java/org/bonitasoft/console/common/server/auth/AuthenticationManager.java)
is [StandardAuthenticationManagerImpl](https://github.com/bonitasoft/bonita-web/blob/7.0.0/common/src/main/java/org/bonitasoft/console/common/server/auth/impl/standard/StandardAuthenticationManagerImpl.java).

10. 
`authenticate` method is called on the [AuthenticationManager](https://github.com/bonitasoft/bonita-web/blob/7.0.0/common/src/main/java/org/bonitasoft/console/common/server/auth/AuthenticationManager.java).
`authenticate` method of [StandardAuthenticationManagerImpl](https://github.com/bonitasoft/bonita-web/blob/7.0.0/common/src/main/java/org/bonitasoft/console/common/server/auth/impl/standard/StandardAuthenticationManagerImpl.java)
implementation of this method does nothing (the subsequent engine login is enough to authenticate the user)

11. 
The authentication is considered successful if no Exception is thrown by the `authenticate` method.

12. [LoginManager](https://github.com/bonitasoft/bonita-web/blob/7.0.0/common/src/main/java/org/bonitasoft/console/common/server/login/LoginManager.java)
will then call engine API [LoginAPI.login()](http://documentation.bonitasoft.com/javadoc/api/7.0/sp/common/org/bonitasoft/engine/api/LoginAPI.html#login(java.lang.String,%20java.lang.String))

13. At this point, operations are processed on Bonita Engine side. Engine (see [LoginAPIImpl](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-core/bonita-process-engine/src/main/java/org/bonitasoft/engine/api/impl/LoginAPIImpl.java)
class) verifies that the username and password are not empty. A verification is also done to validate that the tenant is enabled (use provided tenant id or default one if not provided). Then [LoginAPIImpl](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-core/bonita-process-engine/src/main/java/org/bonitasoft/engine/api/impl/LoginAPIImpl.java)
will call [LoginService](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-core/bonita-login/bonita-login-api/src/main/java/org/bonitasoft/engine/core/login/LoginService.java)
(one implementation available: [SecuredLoginService](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-core/bonita-login/bonita-login-api-impl/src/main/java/org/bonitasoft/engine/core/login/SecuredLoginServiceImpl.java)).

14. SecuredLoginService calls [AuthenticationService](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/services/bonita-authentication/bonita-authentication-api/src/main/java/org/bonitasoft/engine/authentication/AuthenticationService.java).
The default implementation is: [AuthenticationServiceImpl](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/services/bonita-authentication/bonita-authentication-api-impl/src/main/java/org/bonitasoft/engine/authentication/impl/AuthenticationServiceImpl.java).

15. The [AuthenticationServiceImpl](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/services/bonita-authentication/bonita-authentication-api-impl/src/main/java/org/bonitasoft/engine/authentication/impl/AuthenticationServiceImpl.java)
verifies that your username and password are valid.
16. After call of the [AuthenticationService](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/services/bonita-authentication/bonita-authentication-api/src/main/java/org/bonitasoft/engine/authentication/AuthenticationService.java),
[SecuredLoginServiceImpl](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-core/bonita-login/bonita-login-api-impl/src/main/java/org/bonitasoft/engine/core/login/SecuredLoginServiceImpl.java)
performs an extra check to verify that the provided username exists in the Bonita database ([SecuredLoginServiceImpl](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-core/bonita-login/bonita-login-api-impl/src/main/java/org/bonitasoft/engine/core/login/SecuredLoginServiceImpl.java)
does not trust [AuthenticationServiceImpl](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/services/bonita-authentication/bonita-authentication-api-impl/src/main/java/org/bonitasoft/engine/authentication/impl/AuthenticationServiceImpl.java)).
**Note:** A specific behavior applies for the tenant technical user.

17. [SecuredLoginServiceImpl](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-core/bonita-login/bonita-login-api-impl/src/main/java/org/bonitasoft/engine/core/login/SecuredLoginServiceImpl.java)
returns an object that represents the session. This is a server side only object ([SSession](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/services/bonita-session/bonita-session-api/src/main/java/org/bonitasoft/engine/session/model/SSession.java))

18. Call get back to [LoginAPIImpl](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-core/bonita-process-engine/src/main/java/org/bonitasoft/engine/api/impl/LoginAPIImpl.java)
that converts [SSession](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/services/bonita-session/bonita-session-api/src/main/java/org/bonitasoft/engine/session/model/SSession.java)
to [APISession](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-api/bonita-common-api/src/main/java/org/bonitasoft/engine/session/APISession.java).

19. [APISession](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-api/bonita-common-api/src/main/java/org/bonitasoft/engine/session/APISession.java)
is provided back up to the [LoginManager](https://github.com/bonitasoft/bonita-web/blob/7.0.0/common/src/main/java/org/bonitasoft/console/common/server/login/LoginManager.java)
that will add session information as HTTP session attribute.

20. Call get back to [LoginServlet](https://github.com/bonitasoft/bonita-web/blob/7.0.0/server/src/main/java/org/bonitasoft/console/common/server/login/servlet/LoginServlet.java)
that will redirect the user to the requested page.


**Note:** If you [configure your Bonita BPM platform to use CAS](/single-sign-cas-1), the logical flow of authentication is the same as above. 
The difference is that at step 7 the CASRemoteLoginManager is used instead of the default loginManager and at step 12 the `JAASGenericAuthenticationServiceImpl` is called instead of the default authentication service, `AuthenticationServiceImpl`. 
The `loginManager-config.properties` file for a tenant controls which login manager and authentication service (`cfg-bonita-authentication-impl.xml`) are used.



## Information about sessions


Two type of session are involved when using Bonita BPM Portal: 

* The HTTP session
* The Bonita BPM Engine session

The sessoin timeout values for these two sessions should be set to the same value.


**The HTTP session.**

This session is created by the application server
and corresponds to one user.


**The Bonita BPM Engine session** 

See [APISession](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-api/bonita-common-api/src/main/java/org/bonitasoft/engine/session/APISession.java)
class. This session is created by Bonita BPM Engine on the Bonita BPM Portal request, when the user submits a login page.


**Session expiration** 


If the Engine session has expired and the user tries to reach one of the Bonita BPM Portal pages,
an exception will be raised. Bonita BPM Portal will catch this exception,
invalidate the HTTP session and redirect the user to the login page.

**Note:** The Bonita BPM Engine default session duration is one hour (default value
defined in [SessionServiceImpl](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/services/bonita-session/bonita-session-impl/src/main/java/org/bonitasoft/engine/session/impl/SessionServiceImpl.java)). 
You can configure a different session duration by editing the `bonita.tenant.session.duration` property in `bonita-tenant-community-custom.properties`. Specify the duration in milliseconds.


If the HTTP session has expired, Bonita BPM Portal will redirect the user to the
authentication page. The Bonita BPM Engine session associated with the HTTP
session that has just expired will remain active until it reaches the
inactivity timeout. A **cron job** takes care of cleaning up inactive
Engine sessions. 

**Note:** The HTTP session default duration depends on your application server (for example, 30 minutes for Tomcat, 1 hour for WebLogic).


**Logout** 


In Bonita BPM Portal, if a user clicks on the logout button, both the
Engine session and HTTP session will be invalidated.



## How does the Bonita BPM Portal know if a user is authenticated?


The Bonita BPM Portal checks if a valid Bonita BPM Engine session ([APISession](https://github.com/bonitasoft/bonita-engine/blob/7.0.0/bpm/bonita-api/bonita-common-api/src/main/java/org/bonitasoft/engine/session/APISession.java)
object) is found in the
`apiSession`
attribute inside the HttpRequest. If the engine session is still valid, the user will have access to the required resource.