# Single sign-on with CAS

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

This pages explains how to configure your Bonita BPM Platform system to use CAS to provide single sign-on (SSO). It assumes you already have a working CAS service. All Bonita BPM users must be registered in CAS.

This information applies to a Bonita BPM platform deployed from a bundle, not to the Engine launched from Bonita BPM Studio.

CAS configuration is at tenant level. Each tenant can use a different CAS service.

Note: On a system using CAS to manage logins, if a user who is not already logged in tries to access a page in the Portal by clicking on a URL link, they are re-directed to the login page. 
After logging in, the requested page is not displayed automatically. The user must click the link again. 

## Configure Bonita BPM Engine and Wildfly for CAS

The deploy bundle contains the files needed to use CAS with Bonita BPM platform and a Wildfly 9 application server.  
They are contained in `cas-3.3.1-module`. 

You can use this folder to configure CAS for a platform deployed from the Wildfly bundle or from the deploy bundle.  
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

To configure Bonita BPM Engine for CAS:

1. If you do not already have it, download the Subscription edition deploy zip from the customer portal.
2. Add the CAS module. To do this, copy cas-3.3.1-module/org to WILDFLY_HOME/modules to merge the CAS module with the existing modules.
3. Make the CAS module global so that it can be used by any application. To do this, edit `WILDFLY_HOME/standalone/configuration/standalone.xml` and change the definition of the `ee` subsystem to the following:

```xml
 <subsystem xmlns="urn:jboss:domain:ee:1.0">
    <global-modules>
        <module name="org.jasig.cas" slot="main"/>
     </global-modules>
</subsystem>
```

4. Edit `WILDFLY_HOME/standalone/configuration/standalone.xml` and add the BonitaAuthentication module. 
before the `<security-domains>` tag, insert these lines (specifying the relevant IP addresses and port numbers):

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
Bonita BPM uses the CAS LoginModule in the JASIG implementation, so see the CAS LoginModule section of the [Jasig documentation](https://wiki.jasig.org/display/CASC/JAAS+Integration) for more information.
6. Update [`bonita-tenant-sp-custom.properties`](BonitaBPM_platform_setup.md) from `setup/platform_conf/initial/tenant_template_engine/` if platform has not been initialized yet or `setup/platform_conf/current/tenants/[TENANT_ID]/tenant_engine/` and `setup/platform_conf/current/tenant_template_engine/`.
   1. Remove the comment flags from these lines:
      `authentication.service.ref.name=jaasAuthenticationService`
   2. Specify the relevant IP address and port number.
   3. **Optionally**, to enable anonymous user to access a process, uncomment this lines:
      ```
      authenticator.delegate=casAuthenticatorDelegate
      authentication.delegate.cas.server.url.prefix=http://ip_address:port
      authentication.delegate.cas.service.url=http://ip_address:port/bonita/loginservice
      ```

## Configure Bonita BPM Engine and Tomcat for CAS

::: warning
From 7.3.0, this configuration requires not to have initialized the platform or that the [configuration from database has been retrieved and be pushed to database when finished](BonitaBPM_platform_setup.md#update_platform_conf).
:::

1. The CAS implementation relies on JAAS, and is defined in the BonitaAuthentication module of the JAAS configuration file.  
   Set the Java system property `java.security.auth.login.config` in the Tomcat startup script to point to the JAAS configuration file, [`jaas-standard.cfg`](BonitaBPM_platform_setup.md). 

   For example, on Linux, edit `setenv.sh`, uncomment the line that defines `SECURITY_OPTS`, and insert the variable `SECURITY_OPTS` in the line `CATALINA_OPTS=..`. 
 
   The `jaas-standard.cfg` file contains the following (replace `ip_address:port` with the relevant IP addresses and port numbers, in two places): 
   ```
   BonitaAuthentication-1 {
     org.jasig.cas.client.jaas.CasLoginModule required
       ticketValidatorClass="org.jasig.cas.client.validation.Cas20ServiceTicketValidator"
       casServerUrlPrefix="http://ip_address:port/cas"
       tolerance="20000"
       service="http://ip_address:port/loginservice"
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
 
   The JAAS configuration file, `jaas-standard.cfg`, is sorted by sets of authentication modules. For Bonita BPM, each set matches a tenant configuration and the name is prefixed with _BonitaAuthentication-`<tenant-id>`_. Make sure there is a set of authentication modules for each tenant in your platform. For each tenant, set the CAS service to point to the application login page and set `casServerUrlPrefix` to point to the CAS server.

2. In the `CasLoginModule` configuration, check that the `principalGroupName` property is set to `CallerPrincipal`.  
   This is required to retrieve the username from the Bonita application.  
   Bonita BPM uses the CAS LoginModule in the JASIG implementation, so see the CAS LoginModule section of the [Jasig documentation](https://wiki.jasig.org/display/CASC/JAAS+Integration) for more information.
3. Put the CAS client core jar (currently `cas-client-core-3.2.1.jar`) in the `/lib` folder.
4. Put `commons-logging-1.1.jar` in the `/lib` folder.
5. Update `bonita-tenant-sp-custom.properties` from `setup/platform_conf/initial/tenant_template_engine/` if platform has not been initialized yet or `setup/platform_conf/current/tenants/[TENANT_ID]/tenant_engine/` and `setup/platform_conf/current/tenant_template_engine/`.
   1. Remove the comment flags from these lines:
      `authentication.service.ref.name=jaasAuthenticationService`
   2. **Optionally**, to enable anonymous user to access a process, uncomment this lines:
      ```
      authenticator.delegate=casAuthenticatorDelegate
      authentication.delegate.cas.server.url.prefix=http://ip_address:port
      authentication.delegate.cas.service.url=http://ip_address:port/bonita/loginservice
      ```
   3. Specify the relevant IP address and port number.

#### CAS SSO and Java client application

To enable a Java client application to access the engine using CAS autentication, the simplest way is to enable [REST authentication on CAS server](https://apereo.github.io/cas/4.0.x/protocol/REST-Protocol.html) and have the Java client [retrieve the `ticket` for the bonita `service` URL](#cas-rest-api).  
Then, use the [`LoginAPI`](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/org/bonitasoft/engine/api/LoginAPI.html#login(java.util.Map)) with the `java.util.Map` having the `ticket` and `service`.

#### Cluster considerations

If you are configuring Bonita BPM and Tomcat in a cluster environment for CAS, there are some extra steps to do:

1. Copy `commons-logging-1.1.1.jar` from the `bonita.war` to `tomcat/lib`.
2. Remove the `WEB-INF/lib/commons-logging-1.1.1.jar` file from the `bonita.war`.
3. Remove the `tomcat/webapps/bonita/WEB-INF/lib/commons-logging-1.1.1.jar` file (if it is present).

#### Configure Bonita client for CAS

1. For each tenant, edit `authenticationManager-config.properties` to enable the CASRemoteAuthenticationManager and its properties.
The service URL in the properties file must be the same as that in the JAAS file. Edit the `authenticationManager-config.properties` located in `platform_conf/initial/tenant_template_portal` for not initialized platform or `platform_conf/current/tenant_template_portal` and `platform_conf/current/tenants/[TENANT_ID]/tenant_portal/` to have them have the following content (specify the relevant IP address and ports):

```
#auth.AuthenticationManager = org.bonitasoft.console.common.server.auth.impl.standard.StandardAuthenticationManagerImplExt
#auth.AuthenticationManager = org.bonitasoft.console.common.server.auth.impl.oauth.OAuthAuthenticationManagerImplExt
# OAuth.serviceProvider = LinkedIn
# OAuth.consumerKey = ove2vcdjptar
# OAuth.consumerSecret = vdaBrCmHvkgJoYz1
# OAuth.callbackURL = http://ip_address:port/loginservice
auth.AuthenticationManager = org.bonitasoft.console.common.server.auth.impl.jaas.cas.CASRemoteAuthenticationManagerImpl
Cas.serverUrlPrefix = http://ip_address:port/cas
Cas.bonitaServiceURL = http://ip_address:port/bonita/loginservice
logout.link.hidden=true
```

2. Make sure that the default tenant id is the same on both the client side and server side. 
To do this, you can set the `platform.tenant.default.id` property in `platform-tenant-config.properties` in `platform_conf/initial/platform_portal/` or `platform_conf/current/platform_portal/` if platform has already been initialized.

### Troubleshoot

To troubleshoote SSO login issues, you need to increase the [log level](logging.md) to `ALL` in order for errors to be displayed in the log files (by default, they are not).

## Configure logout behaviour

#### Bonita BPM Portal

If you are using CAS, when users log out of Bonita BPM Portal, they log out of CAS. Therefore they are logged out of all applications that are using the CAS service. To avoid this, you can hide the logout option of the portal. 
To do this, set the `logout.link.hidden=true` option in `authenticationManager-config.properties` located in `platform_conf/initial/tenant_template_portal` for not initialized platform or `platform_conf/current/tenant_template_portal` and `platform_conf/current/tenants/[TENANT_ID]/tenant_portal/`.

If this option is set, when users navigate away from the Portal, they are still logged in to CAS.

#### Bonita BPM Engine

By default, logging out from Bonita BPM Engine logs the user out of CAS. You can change this behavior by implementing your own Authentication Service.

## Manage passwords

When you are using CAS, the password for a user is managed in your CAS system. However, when you create a user in Bonita BPM Portal, specifying a password is mandatory. This password is ignored. 

## LDAP synchronizer and CAS

If you are using an LDAP service and the [LDAP synchronizer](ldap-synchronizer.md) to manage your user data, you can continue to do this and use CAS. The LDAP synchronizer user must be registered in CAS. 
Alternatively, the LDAP synchronizer could be run with the tenant technical user, because this bypasses the SSO login. 

We recommend that you use LDAP as your master source for information, synchronizing the relevant information with your CAS server. 

<a id="cas-rest-api"/>
## Single sign-on with CAS using the REST API

For detailed information about the procedure to install Restful access on your CAS SSO server, see the following links:
[CAS SSO RESTful API](http://apereo.github.io/cas/4.2.x/index.html)
[Bonita BPM REST API](rest-api-overview.md)

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

##### **Response for a Service (ST)**

| | |
|:-|:-|
| Response |200 OK <br/> <br/> {ST}|

Take the ST response and paste it in the url of the Bonita BPM Engine login request, below

#### Logging into Bonita BPM Engine with Rest API using the service ticket

**Authentication to Bonita BPM Engine**

| | |
|:-|:-|
| Request URL | `bonita_server_url/loginservice?ticket={ST} `| 
| Request Method | GET| 
| Form Data | service={form encoded parameter for the service url}| 

Limitation: The default AuthenticationFilter that manages CAS authentication applies only to the following pages: 

* /portal
* /mobile/\*
* /portal.js/\*
* /apps/\*
* /services/\*

If you require direct calls to the REST API to authenticate the user. you need to provide a custom Filter.

##### **Response for a Service (ST)**

| | |
|:-|:-|
| Response | 200 OK|
