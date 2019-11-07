# Guest user access

It is possible to allow public access to some living applications (without the need to sign in to Bonita).  

When accessing a public application without any active session on Bonita platform the user will be automatically logged in with a guest user account.

:::info 
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

::: warning  
 This feature is deactivated by default. When you activate it, make sure you give limited access rights to the guest user account (Eg.: use a [dedicated profile](#prerequisite) instead of the default provided ones and make sure the pages you put in the application don't grant more access rights to the REST API than what you accept to grant).  
 For better security it is recommended when using this feature, to have a reverse proxy or a load balancer configured to prevent too many requests to the REST API to be performed, consuming all the platform resources (Distributed denial of service attacks, etc...).
:::

::: warning  
 This feature is different from the auto-login feature that was available in the 6.x versions of Bonita BPM as it do gives directly access to a process form publicly. It is intended for living applications access.
:::

<a id="prerequisite"/>

## Guest profile and dedicated user account

+ In order to use this feature, you need to create a new user account in Bonita organisation. This account will be the one used to log in automatically a user that tries to access a public living application if he is not logged in to Bonita platform yet.

+ You also need to create a new custom profile and add the user account created in the previous step as a member of this profile. This profile will be the one to use as the profile of the living applications that require public access. If an application should also be accessible by users already logged in with their own bonita account, then they should also be members of this profile.  

::: warning  
 You should not use any of the default profiles of Bonita portal as profiles for your public living applications because, by doing that, you would give access to the guest user account to those portal profiles (and their priviledges).
:::

:::info 
**Note:** Since the applications will be public, it is recommended to have a group or a role containing all the users of Bonita platform organisation and add this group or role as a member of the profile used for public application (otherwise users already logged in with their account will get a 403 error when trying to access the public applications).
:::

## Configure Bonita to allow guest user access to some applications

The bundle already contains the files needed to setup guest user access with Bonita platform.
To activate it:

1.  Use the [platform setup tool](BonitaBPM_platform_setup) to retrieve the current configuration (Eg. setup.sh/.bat pull). You need to execute the following actions in the folder of the tenant in which the applications which requires public access are deployed.

2. In the tenant_portal folder of the target tenant: `<BUNDLE_HOME>/setup/platform_conf/current/tenants/<TENANT_ID>/tenant_portal`,
   update the file `authenticationManager-config.properties` as follows:
    ```
            [...]
            # logout.link.hidden=true
       -->  auth.tenant.guest.active=true
       -->  auth.tenant.guest.username=guest
       -->  auth.tenant.guest.password=guest
       -->  auth.tenant.guest.apps=[public,guest] 
    ```
    
    Make sure to set the username and password of the guest user account created in the section [Guest profile and dedicated user account](#prerequisite).
    The property "auth.tenant.guest.apps" contains the list of URL tokens of the applications that require public access (in this example, "public" and "guest"). Replace it with your applications tokens

3. Use the [platform setup tool](BonitaBPM_platform_setup) again to save your changes into the database (Eg. setup.sh/.bat push).  
   Restart Bonita server.

4. If your configuration is correct you should be able to access your public application directly with the URL `http://<host>:<port>/bonita/apps/<app token>` without being logged in first.  
   You are done.

## Starting a process as guest user

You may require your public living application to provide a link to start a process. In order for the process instantiation form to be displayed to a guest in an application, what you need to do is :
- add the guest user account in the actor mapping of the actor which is defined as [initiator of the process](actors#toc1)
- give the "case_start" REST API permission to the guest user or the guest profile created in the section [Guest profile and dedicated user account](#prerequisite).  

In order to give the "case_start" permission:  

1.  Use the [platform setup tool](BonitaBPM_platform_setup) to retrieve the current configuration (Eg. setup.sh/.bat pull). You need to execute the following actions in the folder of the tenant in which the applications which requires public access are deployed.

2. In the tenant_portal folder of the target tenant: `<BUNDLE_HOME>/setup/platform_conf/current/tenants/<TENANT_ID>/tenant_portal`,
   update the file `custom-permissions-mapping.properties` to add the following line:
    ```
            profile|<guest_profile_name>=[case_start] 
    ```
    or
    ```
            user|<guest_username>=[case_start] 
    ```
    Make sure to replace <guest_profile_name> or <guest_username> by the name of the guest profile or guest user account created in the section [Guest profile and dedicated user account](#prerequisite).
    
:::info 
**Note:** If you use the [dynamic authorisation checking](rest-api-authorization#dynamic_authorization) instead of the default static authorization checking, this modification is not necessary as the rule `ProcessInstantiationPermissionRule` should already grant the access to the guest account when it is mapped to the actor initiator of the process.
:::

3. Use the [platform setup tool](BonitaBPM_platform_setup) again to save your changes into the database (Eg. setup.sh/.bat push).  
   Restart Bonita server.

4. If your configuration is correct a guest user should be able to start a case without being logged in first.  
   You are done.

## Login behaviour

The default Bonita layout handles the guest user account by providing a "Sign in" link instead of the user modal link in the header.

