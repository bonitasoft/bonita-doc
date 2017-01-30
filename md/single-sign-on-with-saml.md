# Single sign-on with SAML

:::info 
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::
*
This pages explains how to configure your Bonita BPM Platform system to use SAML to provide single sign-on (SSO). It assumes you already have a working SAML service. All Bonita BPM users must be registered in SAML.

This information applies to a Bonita BPM platform deployed from a bundle, not to the Engine launched from Bonita BPM Studio.

SAML configuration is at tenant level. Each tenant can use a different SAML service.

## SAML overview for Bonita BPM 

This is an overview that relates the steps required to integrate a bonita BPM bundle with an SAML identity provider.

![](images/saml-overview.png)<!--{.img-responsive}-->


Here some details about the Bonita SAML2 module,
it will be composed by: 

- One Java filter that will intercept all the request to bonita portal. 

    Then it will test if the user is already connected to bonita?
    
    - if connected => Allow the access.
        
    - if Not connected => Redirect to IdP (with user info)


- One Java servlet (Assertion Consumer Service) , 

    this servlet will test if we get SAML response in the URL:
    
    - Decode SAMLResponse,
    
    - Check if the answer is valid (certificate, date, origin)
    
    - Get the user name from NameId
    
    - Connect to bonita using UserName 

    - Redirect to the initial requested resource (relayState)

::: warning
 Bonita "username" should match the Active directory "username",
 and if some user needs to use the bonita login page, their "username" should be different than their "password".
:::

## Configure Bonita BPM Bundle for SAML

The following steps needs to be apply on all existing tenants folder.
If you need to apply them on tenant created later, remind to also apply the following configuration to the initial tenant configuration:
“setup/platform_conf/initial/tenant_template_*”

The bundle already contains the files needed to use SAML with Bonita BPM platform.  
To configure Bonita BPM for SAML:

1. If you do not already have it, download a Subscription edition bundle from the customer portal.
2. In the tenant_portal folder of each existing tenant: “$TOMCAT_HOME/setup/platform_conf/current/tenants/<TENANT_ID>/tenant_portal”,
   edit the authenticationManager-config.properties as following:
    ```
            #auth.AuthenticationManager = org.bonitasoft.console.common.server.auth.impl.standard.StandardAuthenticationManagerImpl
       -->  auth.AuthenticationManager = org.bonitasoft.console.common.server.auth.impl.saml.SAML2AuthenticationManagerImpl
       -->  saml.filter.active = true
       -->  auth.tenant.admin.username = install
       -->  auth.passphrase = BonitaBPM
            #auth.AuthenticationManager = org.bonitasoft.console.common.server.auth.impl.oauth.OAuthAuthenticationManagerImpl
            # OAuth.serviceProvider = LinkedIn
            # OAuth.consumerKey = ove2vcdjptar
            # OAuth.consumerSecret = vdaBrCmHvkgJoYz1
            # OAuth.callbackURL = http://127.0.0.1:8888/loginservice
            #auth.AuthenticationManager = org.bonitasoft.console.common.server.auth.impl.jaas.cas.CASRemoteAuthenticationManagerImpl
            # Cas.serverUrlPrefix = http://127.0.1.1:8180/cas
            # Cas.bonitaServiceURL = http://127.0.1.1:8080/bonita/loginservice
       -->  logout.link.hidden=true 
    ```
    
    It is recommended to also edit this file to replace the value of the passphrase (property auth.passphrase)
    
3. In the tenant_engine folder of each existing tenant: “$TOMCAT_HOME/setup/platform_conf/current/tenants/<TENANT_ID>/tenant_engine/
  edit the bonita-tenant-sp-custom.properties as following:
  
   ```
            # Authentication service to use. Some are natively provided:
            # authenticationService
            #   * binded to bonita authentication mode
            #   * impl: org.bonitasoft.engine.authentication.impl.AuthenticationServiceImpl
            # jaasAuthenticationService
            #   * to use JAAS
            #   * impl: com.bonitasoft.engine.authentication.impl.JAASGenericAuthenticationServiceImpl
            #   * this is the one to configure SSO over CAS (CAS properties to be defined hereafter
            # noAuthenticationService
            #   * does no authentication on the engine side
            #   * impl: com.bonitasoft.engine.authentication.impl.NoAuthenticationServiceImpl
            # passphraseOrPasswordAuthenticationService
            #   * Used by SAML2 implementation, login only if a passphrase is valid, or if a username/password is valid.
            #   * Requires PassphraseOrPasswordAuthenticationService bean to be uncommented in bonita-tenant-sp-custom.xml
            #   * impl: com.bonitasoft.engine.authentication.impl.PassphraseOrPasswordAuthenticationService
            # you can provide your own implementation in bonita-tenant-sp-custom.xml and refer to the bean name of your choice
       -->  authentication.service.ref.name=passphraseOrPasswordAuthenticationService
            
            # If authentication.service.ref.name equals "PassphraseOrPasswordAuthenticationService",
            # you need to configure the following passphrase 
       -->  authentication.service.ref.passphrase=BonitaBPM
            
            # CAS authentication delegate : enables the user, providing login/password,
            # to be logged in automatically against CAS web application 
            # To be used in conjunction with the generic authentication service configured with CAS (jaasAuthenticationService)
            #authenticator.delegate=casAuthenticatorDelegate
            #authentication.delegate.cas.server.url.prefix=http://ip_address:port
            #authentication.delegate.cas.service.url=http://ip_address:port/bonita/loginservice
   ```
  
   It is recommended to also edit this file to replace the value of the passphrase with the same value as in the file authenticationManager-config.properties updated previously.

4. if required by your Identity provider, Generate a Private key, Using the command ssh-keygen, then go to “cd ~/.ssh” to retrieve the key from the file id_rsa (more id_rsa, then copy the key)

5. In the tenant_portal folder of each existing tenant: “$TOMCAT_HOME/setup/platform_conf/current/tenants/<TENANT_ID>/tenant_portal”,
   edit the keycloak-saml.xml, by replacing the following string:  
        - put your private key here  
        - put your certificate here  
        - bindingUrl="http://idp.saml.binding.url.to.change"  
        - postBindingUrl="http://idp.saml.binding.url.to.change"  
        - redirectBindingUrl="http://idp.saml.binding.url.to.change"  

   ```
       <keycloak-saml-adapter>
           <SP entityID="bonita"
               sslPolicy="EXTERNAL"
               logoutPage="http://localhost:8080/bonita/logoutservice"
               forceAuthentication="false"
               isPassive="false"
               turnOffChangeSessionIdOnLogin="true">
               <Keys>
                   <Key signing="true">
        -->            <PrivateKeyPem>put your private key here</PrivateKeyPem>
        -->            <CertificatePem>put your certificate here</CertificatePem>
                   </Key>
               </Keys>
               <PrincipalNameMapping policy="FROM_ATTRIBUTE" attribute="username"/>
               <IDP entityID="idp">
                   <SingleSignOnService signRequest="true"
                      validateResponseSignature="true"
                      requestBinding="POST"
                      responseBinding="POST"
        -->           bindingUrl="http://idp.saml.binding.url.to.change"/>
                   <SingleLogoutService signRequest="false"
                      signResponse="false"
                      validateRequestSignature="false"
                      validateResponseSignature="false"
                      requestBinding="POST"
                      responseBinding="POST"
        -->           postBindingUrl="http://idp.saml.binding.url.to.change"
        -->           redirectBindingUrl="http://idp.saml.binding.url.to.change"/>
                   <Keys>
                       <Key signing="true">
        -->            <CertificatePem>put your certificate here</CertificatePem>
                       </Key>
                   </Keys>
               </IDP>
            </SP>
       </keycloak-saml-adapter>
   ```


#### SAML SSO and Java client application

To enable a Java client application to access the engine using SAML autentication,  
the simplest way is to use the [`LoginAPI`](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/org/bonitasoft/engine/api/LoginAPI.html#login(java.util.Map)).

### Troubleshoot

To troubleshoote SSO login issues, you need to increase the [log level](logging.md) to `ALL` in order for errors to be displayed in the log files (by default, they are not).

## Configure logout behaviour

#### Bonita BPM Portal

If you are using SAML, when users log out of Bonita BPM Portal, they do not log out of SAML. Therefore they are not logged out of all applications that are using the SAML service.  
To avoid this, you can hide the logout option of the portal. 
To do this, set the `logout.link.hidden=true` option in `authenticationManager-config.properties` located in `platform_conf/initial/tenant_template_portal` 
for not initialized platform or `platform_conf/current/tenant_template_portal` and `platform_conf/current/tenants/[TENANT_ID]/tenant_portal/`.

## Manage passwords

When you are using SAML, the password for a user is managed in your SAML system. However, when you create a user in Bonita BPM Portal, specifying a password is mandatory. This password is ignored. 

## LDAP synchronizer and SAML

If you are using an LDAP service and the [LDAP synchronizer](ldap-synchronizer.md) to manage your user data, you can continue to do this and use SAML. The LDAP synchronizer user must be registered in SAML. 
Alternatively, the LDAP synchronizer could be run with the tenant technical user, because this bypasses the SSO login. 

We recommend that you use LDAP as your master source for information, synchronizing the relevant information with your SAML server. 

## Single sign-on with SAML using the REST API

SAML is a browser-oriented protocol (based on http automatic redirection, cookies, forms, etc...), therefore, we only have securized browser-oriented resources. 
This is why only a subset of pages are handled to be automatically SSO SAML-verified but not the whole web application.

The default AuthenticationFilter that manages SAML authentication applies only to the following pages: 

* /saml
* /samlLogout
* /portal/homepage
* /portal/resource/\*
* /portal/form/\*
* /mobile/\*
* /apps/\*

REST API are not part of them, but if an http session already exists thanks to cookies, REST API can be used.

The recommended way to authenticate to Bonita BPM Portal to use the REST API is to use the SAML login.
