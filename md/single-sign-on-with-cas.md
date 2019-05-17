# Single sign-on with CAS
::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

This pages explains how to configure your Bonita Platform system to use CAS to provide single sign-on (SSO). It assumes you already have a working CAS service. All Bonita users must be registered in CAS.

This information applies to a Bonita platform deployed from a bundle, not to the Engine launched from Bonita Studio.

CAS configuration is at tenant level. Each tenant can use a different CAS service.

Note: On a system using CAS to manage logins, if a user who is not already logged in tries to access a page in the Portal by clicking on a URL link, they are re-directed to the login page. 
After logging in, the requested page is not displayed automatically. The user must click the link again. 


## Configure Bonita Engine and Tomcat for CAS


1. The CAS implementation relies on JAAS, and is defined in the BonitaAuthentication module of the JAAS configuration file.  
   Set the Java system property `java.security.auth.login.config` in the Tomcat startup script to point to the JAAS configuration file, [`TOMCAT_HOME/server/conf/jaas-standard.cfg`](BonitaBPM_platform_setup.md). 

   For example, on Linux, edit `TOMCAT_HOME/setup/tomcat-templates/setenv.sh`, uncomment the line that defines `SECURITY_OPTS`, and insert the variable `SECURITY_OPTS` in the line `CATALINA_OPTS=..`. 
 
   The `TOMCAT_HOME/server/conf/jaas-standard.cfg` file contains the following (replace `ip_address:port` with the relevant IP addresses and port numbers, in two places): 
   ```
   BonitaAuthentication-1 {
     org.jasig.cas.client.jaas.CasLoginModule required
       ticketValidatorClass="org.jasig.cas.client.validation.Cas20ServiceTicketValidator"
       casServerUrlPrefix="http://ip_address:port/cas"
       tolerance="20000"
       service="http://ip_address:port/bonita/loginservice"
       defaultRoles="admin,operator"
       roleAttributeNames="memberOf,eduPersonAffiliation"
       principalGroupName="CallerPrincipal"
       roleGroupName="Roles"
       cacheAssertions="true"
       cacheTimeout="480";
   };
   ```
   ::: warning
   **Warning**: module names must be unique (from the example above, BonitaAuthentication-1 is the module name). Therefore, remove the unecessary ones
   :::
 
   The JAAS configuration file, `jaas-standard.cfg`, is sorted by sets of authentication modules. For Bonita, each set matches a tenant configuration and the name is prefixed with _BonitaAuthentication-`<tenant-id>`_. Make sure there is a set of authentication modules for each tenant in your platform. For each tenant, set the CAS service to point to the application login page and set `casServerUrlPrefix` to point to the CAS server.

2. In the `CasLoginModule` configuration, check that the `principalGroupName` property is set to `CallerPrincipal`.  
   This is required to retrieve the username from the Bonita application.
   Bonita uses the CAS LoginModule in the JASIG implementation, so see the CAS LoginModule section of the [Jasig documentation](https://wiki.jasig.org/display/CASC/JAAS+Integration) for more information.
3. Copy `cas-client-core-x.x.x.jar` from `BonitaSubscription-x.x.x-tomcat/tools/cas-x.x.x-module/org/jasig/cas/main` into the `TOMCAT_HOME/server/lib` directory.
4. Copy `commons-logging-x.x.x.jar` from `BonitaSubscription-x.x.x-tomcat/tools//BonitaSubscription-x.x.x-LDAP-Synchronizer/BonitaSubscription-x.x.x-LDAP-Synchronizer/lib` into the `TOMCAT_HOME/server/lib` directory.
5. Update `bonita-tenant-sp-custom.properties` from `setup/platform_conf/initial/tenant_template_engine/` if platform has not been initialized yet or `setup/platform_conf/current/tenants/[TENANT_ID]/tenant_engine/` and `setup/platform_conf/current/tenant_template_engine/`.
::: info
If the platform has already been initialized, every update to the configuration files under `setup/platform_conf/current` must be done using the `setup` tool:  
- `setup pull`  
- edit configuration file(s)  
- `setup push`
:::
   1. Remove the comment flags from these lines:
      `authentication.service.ref.name=jaasAuthenticationService`
   2. **Optionally**, to enable anonymous user to access a process, uncomment this lines:
      ```
      authenticator.delegate=casAuthenticatorDelegate
      authentication.delegate.cas.server.url.prefix=http://ip_address:port
      authentication.delegate.cas.service.url=http://ip_address:port/bonita/loginservice
      ```
      Specify the relevant IP address and port number.

#### Configure the Bonita Portal for CAS SSO

1. For each tenant, edit `authenticationManager-config.properties` to enable the CASRemoteAuthenticationManager and its properties.
Edit the `authenticationManager-config.properties` located in `platform_conf/initial/tenant_template_portal` for not initialized platform or `platform_conf/current/tenant_template_portal` and `platform_conf/current/tenants/[TENANT_ID]/tenant_portal/`.
::: info
If the platform has already been initialized, every update to the configuration files under `setup/platform_conf/current` must be done using the `setup` tool:  
- `setup pull`
- edit configuration file(s)  
- `setup push`
:::

Make sure that `auth.AuthenticationManager` property is set to `org.bonitasoft.console.common.server.auth.impl.jaas.cas.CASRemoteAuthenticationManagerImpl`
Uncomment `Cas.serverUrlPrefix` and `Cas.bonitaServiceURL` properties as shown below (specify the relevant IP addresses and ports):

```
#auth.AuthenticationManager = org.bonitasoft.console.common.server.auth.impl.standard.StandardAuthenticationManagerImplExt
#auth.AuthenticationManager = org.bonitasoft.console.common.server.auth.impl.oauth.OAuthAuthenticationManagerImplExt
# OAuth.serviceProvider = LinkedIn
# OAuth.consumerKey = ove2vcdjptar
# OAuth.consumerSecret = vdaBrCmHvkgJoYz1
# OAuth.callbackURL = http://ip_address:port/loginservice
auth.AuthenticationManager = org.bonitasoft.console.common.server.auth.impl.jaas.cas.CASRemoteAuthenticationManagerImpl
Cas.serverUrlPrefix = http://ip_address:port/cas
Cas.bonitaServiceURL = http://ip_address:port/bonita/portal/homepage
logout.link.hidden=true
```

#### CAS SSO and Java client application

To enable a Java client application to access the engine using CAS autentication, the simplest way is to enable [REST authentication on CAS server](https://apereo.github.io/cas/4.0.x/protocol/REST-Protocol.html) and have the Java client [retrieve the `ticket` for the bonita `service` URL](#cas-rest-api).  
Then, use the [`LoginAPI`](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/org/bonitasoft/engine/api/LoginAPI.html#login(java.util.Map)) with the `java.util.Map` having the `ticket` and `service`.

#### Cluster considerations and bonita webapp for Tomcat

If you are configuring Bonita and Tomcat in a cluster environment for CAS, there are some extra steps to do:

1. Copy `commons-logging-x.x.x.jar` from `BonitaSubscription-x.x.x-tomcat/tools/BonitaSubscription-x.x.x-LDAP-Synchronizer/BonitaSubscription-x.x.x-LDAP-Synchronizer/lib` into the `TOMCAT_HOME/server/lib` directory.
2. Remove the `WEB-INF/lib/commons-logging-x.x.x.jar` file from the `TOMCAT_HOME/server/webapps/bonita.war`.
3. Remove the `TOMCAT_HOME/server/webapps/bonita/WEB-INF/lib/commons-logging-x.x.x.jar` file (if it is present).

### Troubleshoot

To troubleshoote SSO login issues, you need to increase the [log level](logging.md) to `ALL` in order for errors to be displayed in the log files (by default, they are not).

## Configure Bonita Engine and WildFly for CAS

::: warning
**WARNING:** Starting from Bonita 7.9.0 the Wildfly bundle is deprecated. It will be removed in a future release. Check the [Release Note](release-notes.md) for more details.
:::

The deploy bundle contains the files needed to use CAS with Bonita platform and a WildFly 10 application server.  
They are contained in `cas-3.3.1-module`. 

You can use this folder to configure CAS for a platform deployed from the WildFly bundle.  
The `cas-3.3.1-module` folder contains some jar files that are required. 

It also contains a configuration file for the module, `module.xml`, which defines the jar files to be loaded from the module itself and the dependencies of the module. For example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<module xmlns="urn:jboss:module:1.0" name="org.jasig.cas">
    <resources>
        <resource-root path="cas-client-core-3.3.1.jar" />
        <resource-root path="slf4j-api-1.7.1.jar" />
        <resource-root path="slf4j-log4j12-1.7.1.jar" />
        <resource-root path="log4j-1.2.15.jar" />
    </resources>
    <dependencies>
        <system>
            <paths>
                <path name="org/xml/sax"/>
                <path name="org/xml/sax/helpers"/>
                <path name="javax/net/ssl"/>
                <path name="javax/xml/parsers"/>
                <path name="javax/security/auth/spi"/>
                <path name="javax/security/auth/login"/>
                <path name="javax/security/auth/callback"/>
                <path name="javax/security/auth"/>
            </paths>
        </system>
    </dependencies>
</module>
```

For a standard installation, it is not necessary to modify this file.

To configure Bonita Engine for CAS:

1. If you do not already have it, download the Subscription edition Wildfly bundle from the customer portal.
2. Add the CAS module. To do this, copy `BonitaSubscription-x.x.x-wildfly/tools/cas-x.x.x-module/org` to `WILDFLY_HOME/server/modules` to merge the CAS module with the existing modules.
3. Make the CAS module global so that it can be used by any application. To do this, edit `WILDFLY_HOME/setup/wildfly-templates/standalone.xml` and change the definition of the `ee` subsystem to the following:

```xml
 <subsystem xmlns="urn:jboss:domain:ee:1.0">
    <global-modules>
        <module name="org.jasig.cas" slot="main"/>
     </global-modules>
</subsystem>
```

4. Edit `WILDFLY_HOME/setup/wildfly-templates/standalone.xml` and add the BonitaAuthentication module. 
Right after the opening `<security-domains>` tag, insert these lines (specifying the relevant IP addresses and port numbers):

```xml
<security-domain name="BonitaAuthentication-1">
    <authentication>
        <login-module code="org.jasig.cas.client.jaas.CasLoginModule" flag="required">
            <module-option name="ticketValidatorClass" value="org.jasig.cas.client.validation.Cas20ServiceTicketValidator"/>
            <module-option name="casServerUrlPrefix" value="http://cas_ip_address:cas_port/cas"/>
            <module-option name="tolerance" value="20000"/>
            <module-option name="service" value="http://cas_ip_address:cas_port/bonita/loginservice"/>
            <module-option name="defaultRoles" value="admin,operator"/>
            <module-option name="roleAttributeNames" value="memberOf,eduPersonAffiliation"/>
            <module-option name="principalGroupName" value="CallerPrincipal"/>
            <module-option name="roleGroupName" value="Roles"/>
            <module-option name="cacheAssertions" value="true"/>
            <module-option name="cacheTimeout" value="480"/>
        </login-module>
    </authentication>
</security-domain>
```
::: warning
**Warning**: module names must be unique (from the example above, BonitaAuthentication-1 is the module name). Therefore, remove the unecessary ones
:::

5. In the `CasLoginModule` configuration, check that the `principalGroupName` property is set to `CallerPrincipal`. This is required to retrieve the username from the Bonita application. 
Bonita uses the CAS LoginModule in the JASIG implementation, so see the CAS LoginModule section of the [Jasig documentation](https://wiki.jasig.org/display/CASC/JAAS+Integration) for more information.
6. Update [`bonita-tenant-sp-custom.properties`](BonitaBPM_platform_setup.md) from `setup/platform_conf/initial/tenant_template_engine/` if platform has not been initialized yet or `setup/platform_conf/current/tenants/[TENANT_ID]/tenant_engine/` and `setup/platform_conf/current/tenant_template_engine/`.
::: info
If the platform has already been initialized, every update to the configuration files under `setup/platform_conf/current` must be done using the `setup` tool:  
- `setup pull`  
- edit configuration file(s)  
- `setup push`
:::

   1. Remove the comment flags from these lines:
      `authentication.service.ref.name=jaasAuthenticationService`
   2. Specify the relevant IP address and port number.
   3. **Optionally**, to enable anonymous user to access a process, uncomment this lines:
      ```
      authenticator.delegate=casAuthenticatorDelegate
      authentication.delegate.cas.server.url.prefix=http://ip_address:port
      authentication.delegate.cas.service.url=http://ip_address:port/bonita/loginservice
      ```
      
## Configure logout behaviour

#### Bonita Portal

If you are using CAS, when users log out of Bonita Portal, they log out of CAS. Therefore they are logged out of all applications that are using the CAS service. To avoid this, you can hide the logout option of the portal. 
To do this, set the `logout.link.hidden=true` option in `authenticationManager-config.properties` located in `platform_conf/initial/tenant_template_portal` for not initialized platform or `platform_conf/current/tenant_template_portal` and `platform_conf/current/tenants/[TENANT_ID]/tenant_portal/`.
::: info
If the platform has already been initialized, every update to the configuration files under `setup/platform_conf/current` must be done using the `setup` tool:
- `setup pull`
- edit configuration file(s)
- `setup push`
:::

If this option is set, when users navigate away from the Portal, they are still logged in to CAS.

#### Bonita Engine

By default, logging out from Bonita Engine logs the user out of CAS. You can change this behavior by implementing your own Authentication Service.

## Tenant administrator login

The [Tenant administrator](tenant_admin_credentials.md) (also kwown as the _tenant technical user_) will always be able to log in whitout a CAS account. To log with the tenant administrator, use the standard Bonita Portal login page accessible on `http://<bundle host>:<port>/bonita/login.jsp`.

## Manage passwords

When you are using CAS, the password for a user is managed in your CAS system. However, when you create a user in Bonita Portal, specifying a password is mandatory. This password is ignored. 

## LDAP synchronizer and CAS

If you are using an LDAP service and the [LDAP synchronizer](ldap-synchronizer.md) to manage your user data, you can continue to do this and use CAS. The LDAP synchronizer user must be registered in CAS. 
Alternatively, the LDAP synchronizer could be run with the tenant technical user, because this bypasses the SSO login. 

We recommend that you use LDAP as your master source for information, synchronizing the relevant information with your CAS server. 

<a id="cas-rest-api"/>

## Single sign-on with CAS using the REST API

CAS is a browser-oriented protocol (based on http automatic redirection, cookies, forms, etc...), therefore, we only have securized browser-oriented resources. This is why only a subset of pages are handled to be automatically SSO CAS-verified but not the whole web application.

<a id="restricted_cas_urls"/>
The default `AuthenticationFilter` that manages CAS authentication applies only to the following pages: 

* /portal
* /mobile/\*
* /portal.js/\*
* /apps/\*
* /services/\*

REST API are not part of them, but if an http session already exists thanks to cookies, REST API can be used.

The recommended way to authenticate to **Bonita Portal** to use the REST API is to use the CAS server REST API.  
It allows to retrieve authentication tickets to authenticate to **Bonita Portal**.

For detailed information about the procedure to install Restful access on your CAS SSO server, see the following links:

* [CAS SSO RESTful API](http://apereo.github.io/cas/4.2.x/index.html)
* [Bonita REST API](rest-api-overview.md)

::: info
**Note:** All calls issued to get the TGT or ST are made to the CAS SSO server.
:::

#### Getting the Ticket Granting Ticket (TGT)

The Ticket Granting Ticket is an exposed resource. It has a unique URL.

##### **Request for a Ticket Granting Ticket Resource**
| | |
|:-|:-|
| Request URL | `http://www.your_cas_server_url/cas/v1/tickets` |
| Request Method | POST |
| Form Data | Username: walter.bates  <br/> Password: bpm |

##### **Response for a Ticket Granting Ticket Resource**

| | |
|:-|:-|
| Response |201 created <br/> <br/>`Location: http://www.your_cas_server_url/cas/v1/tickets/{TGT}` |

Take the TGT response and paste it in the url of the ST request, below

#### Getting the Service Ticket (ST)

##### **Request for a Service Ticket**

| | |
|:-|:-|
| Request URL | `http://www.your_cas_server_url/cas/v1/tickets/{TGT}`| 
| Request Method | POST| 
| Form Data | service={form encoded parameter for the service url}| 

For instance, in a **Bonita Portal** deployed on Tomcat bundle on a server with IP `192.168.1.9`, `service url` can be `http://192.168.1.9:8080/bonita/portal/homepage`. Its form encoded value would be `http%3A%2F%2F192.168.1.9%3A8080%2Fbonita%2Fportal%2Fhomepage`.

##### **Response for a Service (ST)**

| | |
|:-|:-|
| Response |200 OK <br/> <br/> {ST}|

Take the ST response and paste it in the url of the Bonita Engine login request, below

#### Logging into Bonita Engine with Rest API using the service ticket

Use a **Bonita Portal** URL where the [CAS AuthenticationFilter applies](#restricted_cas_urls) for authentication to work.

::: warning
Prefer GET over POST to authenticate because experience has shown that in some server configuration, POST parameters cannot be retrieved in the CAS authentication web filter.
:::

##### **Authentication to Bonita Engine** with GET

The form encoded parameter URL used as service in the previous step must be used as access point because it will be sent to the CAS server to check ticket validation. 

| | |
|:-|:-|
| Request URL | `{service url}` | 
| Request Method | GET | 
| HTTP Params | ticket={ST} | 

##### **Authentication to Bonita Engine** with POST

Use a Bonita Portal SSO protected URL for this action.

| | |
|:-|:-|
| Request URL | `<bonita portal url>` | 
| Request Method | POST | 
| Form Data | service={form encoded parameter for the service url}&ticket={ST} | 

##### **Response for a Service (ST)**

| | |
|:-|:-|
| Response | 200 OK|

You are now logged into Bonita Portal and REST API calls will succeed.

::: warning
Cookies must be enabled in REST client side for authentication to persist across REST API calls.  
Therefore, calling web application root context may not work (e.g. `/bonita` by default) because session cookie seems not to be set on all web server configurations.
**Use a protected URL to authenticate to Bonita Portal when using the ticket parameter with POST method.**
:::

