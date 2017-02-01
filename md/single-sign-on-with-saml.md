# Single sign-on with SAML

:::info 
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::
*
This pages explains how to configure your Bonita BPM Platform system to use SAML to provide single sign-on (SSO). It assumes you already have a working SAML service. All Bonita BPM users must be registered in SAML.

This information applies to a Bonita BPM platform deployed from a bundle, not to the Engine launched from Bonita BPM Studio.

SAML configuration is at tenant level. Each tenant can use a different authentication method (over SAML or not)

## SAML overview for Bonita BPM 

This is an overview that relates the steps required to integrate a bonita BPM bundle with an SAML identity provider.

![Authentication over SAML](images/saml-overview.png)<!--{.img-responsive}-->


Here some details about the Bonita SAML2 module,
it will be composed by: 

- One Servlet filter that will intercept all the request to bonita portal. 

    Then it will test if the user is already logged in to bonita?
    
    - if already logged in => Allow the access.
        
    - if Not connected => Redirect to IdP (with user info)


- One Assertion Consumer Service (technically this is also handled by the servlet filter through a different URL maping (/saml)), 

    this service will validate and process the SAML response :
    
    - Decode SAMLResponse,
    
    - Check if the answer is valid (certificate, date, origin)
    
    - Get the user name from NameId
    
    - Connect to bonita using UserName 

    - Redirect to the initial requested resource (relayState)

::: warning  
 Bonita "username" should match the IDP "username".  
 If some users need to be able to log in without having an account on the IDP, they can use the portal login page (/loging.jsp)  
 provided they have a bonita account and their password is different from their username.
:::

## Configure Bonita BPM Bundle for SAML

You need to execute the following actions in the folder of each tenant for which you wan to authenticate over SAML.
If you want this configuration to also apply to each tenant created later, make sure to also perform those actions in the initial tenant configuration folder:
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
    
    Make sure to set the right tenant admin username (link to the doc page that explains how to change it). It is recommended to also replace the value of the passphrase (property auth.passphrase).
    
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
  
    It is recommended to also replace the value of the passphrase (property auth.passphrase) with the same value as in the file authenticationManager-config.properties updated previously.

4. If your Identity provider (IdP) requires requests to be signed, generate a private key.
For example on linux, you can use the command ssh-keygen, then go to “cd ~/.ssh” to retrieve the key from the file id_rsa (more id_rsa, then copy the key).

5. In the tenant_portal folder of each existing tenant: “$TOMCAT_HOME/setup/platform_conf/current/tenants/<TENANT_ID>/tenant_portal”,  
   edit the file keycloak-saml.xml to setup Bonita webapp as a Service provider working with your IdP.  
   The entityID is the Service Provider given to your bonita installation. You can change it if you want but you need to provide to your IdP.  
   If your IdP requires the SSO requests to be signed replace the following strings in the Keys section of the SP:  
        - put your private key here  
        - put your certificate here  
   with you current server's private key and with the certificate provided by the IdP.  
   If your IdP doesn't requires the SSO requests to be signed, you can remove the Keys node from the SP and set the attribute signRequest to false.  
   If your IdP responses are signed, replace the following strings in the Keys section of the IDP:  
        - put your certificate here  
   If your IdP doesn't requires the SSO requests to be signed, you can remove the Keys node from the IDP and set the attribute validateResponseSignature to false.  
   You may also need to change the requestBinding and/or responseBinding from POST to REDIRECT depending on your IdP configuration.  
   Note that the single logout SAML profile is not supported by bonita as it doesn't work the same way for each IdP.  
   So the SingleLogoutService is not used (but still needs to be present anyway in order for the filter to work...).  
   More configuration options can be found in [Keycloak official documentation](https://keycloak.gitbooks.io/securing-client-applications-guide/content/topics/saml/java/general-config.html)
   
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

### Troubleshoot

To troubleshoote SSO login issues, you need to increase the [log level](logging.md) to `ALL` in order for errors to be displayed in the log files (by default, they are not).

## Configure logout behaviour

#### Bonita BPM Portal

When your Bonita BPM platform is configured to manage authentication over SAML, when users log out of Bonita BPM Portal, They do not log out of the SAML Identity Provider (IdP).  
Therefore they are not logged out of all applications that are using the IdP.  
To avoid this, you can hide the logout option of the portal. 
To do this, set the `logout.link.hidden=true` option in `authenticationManager-config.properties` located in `platform_conf/initial/tenant_template_portal` 
for not initialized platform or `platform_conf/current/tenant_template_portal` and `platform_conf/current/tenants/[TENANT_ID]/tenant_portal/`.

## Manage passwords

When your Bonita BPM platform is configured to manage authentication over SAML, the user password are managed in your SAML Identity provider (IdP).  
However, when you create a user in Bonita BPM Portal, specifying a password is mandatory. This password is ignored.

## LDAP synchronizer and SAML

If you are using an LDAP service and the [LDAP synchronizer](ldap-synchronizer.md) to manage your user data,   
you can continue to do this and manage authentication over SAML.  
The LDAP synchronizer user must be registered in Bonita BPM (no need for an SAML IdP account). It is recommended though to use the tenant admin account.   
We recommend that you use LDAP as your master source for information, synchronizing the relevant information with your Bonita BPM platform. 

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

The recommended way to authenticate to Bonita BPM Portal to use the REST API is to use the [login service](rest-api-overview.md#bonita-authentication)..
