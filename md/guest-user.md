# Guest user access

It is possible to allow public access to some living applications (without the need to sign in to Bonita).  

When accessing a public application without any active session on Bonita platform the user will be automatically logged in with a guest user account.

:::info 
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

::: warning  
 This feature is different from the auto-login feature that was available in the 6.x versions of Bonita BPM as it do gives directly access to a process form publicly. It is intended for living applications access.
:::

## Guest profile and dedicated user account

+ In order to use this feature, you need to create a new user account in Bonita organisation. This account will be the one used to log in automatically a user that tries to access a public living application if he is not logged in to Bonita platform yet.

+ You also need to create a new custom profile and add the user account created in the previous step as a member of this profile. This profile will be the one to use as the profile of the living applications that require public access. If an application should also be accessible by users already logged in with their own bonita account, then they should also be members of this profile. 

:::info 
**Note:** Since the applications will be public, it is recommended to have a group or a role containing all the users of Bonita platform organisation and add this group or role as a member of the profile used for public application (otherwise users already logged in with their account will get a 403 error when trying to access the public applications).
:::

## Configure Bonita to allow guest user access to some applications

The bundle already contains the files needed to setup guest user access with Bonita platform.
To activate it:

1.  Use the [platform setup tool](BonitaBPM_platform_setup) to retrieve the current configuration. You need to execute the following actions in the folder of the tenant in which the applications which requires public access are deployed.

2. In the tenant_portal folder of the target tenant: `<BUNDLE_HOME>/setup/platform_conf/current/tenants/<TENANT_ID>/tenant_portal`,
   edit the authenticationManager-config.properties as follows:
    ```
            [...]
            # logout.link.hidden=true
       -->  auth.tenant.guest.active=true
       -->  auth.tenant.guest.username=guest
       -->  auth.tenant.guest.password=guest
       -->  auth.tenant.guest.apps=[public,guest] 
    ```
    
    Make sure to set the username and password of the guest user account created in the section "Guest profile and dedicated user account".
    The property "auth.tenant.guest.apps" contains the list of URL tokens of the applications that require public access (in this example, "public" and "guest"). Replace it with your applications tokens

3. Use the [platform setup tool](BonitaBPM_platform_setup) again to save your changes into the database.  
   Restart Bonita server.

4. If your configuration is correct you should be able to access your public application directly with the URL `http://<host>:<port>/bonita/apps/<app token>` without being logged in first.  
   You are done.

## Starting a process as guest user

You may require your living application to provide a link to start a process. In order for the process instantiation form to be displayed to a guest in the application, all you need to do is add the guest user account in the actor mapping of the actor initiator of the process.

## Login behaviour

The default Bonita layout handles the guest user account by providing a "Sign in" link instead of the user modal link in the header.

