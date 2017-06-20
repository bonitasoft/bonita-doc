# REST API authorization

The Bonita BPM Portal, or any application that uses the Web REST API, enables user to access resources.
The set of resources that a user can access is determined by default by the user's profile.
This authorization mechanism ensures that users can only access the appropriate resources.
This means, for example, that a user with only the User profile cannot perform actions intended for the Administrator.

The authorization mechanism is a "white list" implementation.
It has two phases,
a dynamic phase, which uses a script to grant or deny authorization,
and a static phase, which checks in the static configuration to see whether the user is authorized to access a given resource.
The static configuration is fixed when the application server is started.

To access a given resource, a user must have a certain permission.
These permissions are defined as simple permissions, which are the smallest units of permission, or compound permissions, which are groups of simple permissions.
A user is granted set of permissions. These permissions define the set of resources the user is authorized to access.

## Summary

For a new Bonita BPM installation, a basic set of authorization checks is activated by default but you might also want to [deactivate the HTTP API](#activate).
Here are the key points of the authorizations configuration :

* The static checks (activated by default on a fresh installation) create an authorization layer that exactly matches the standard Bonita BPM Portal features and profiles.
If you are using the standard Portal, you do not need to configure anything.
* If you want to add extra authorization restrictions based on business rules, turn on the dynamic checks that you want.
The configuration file defines standard rules for the most frequent cases, so all you need to do is uncomment the rules you want to apply.
* If you add a custom page, include a resources=\[ list \] in your page.properties to specify which resources your custom page requires the users to have access to.
* If the previous points do not meet your security needs, you can still manually customize the configuration and rules as much as you want.

If you have migrated your platform from a version of Bonita BPM earlier than 6.4.0, security is deactivated by default.
You need to [add authorization to your custom pages](#migrate) before you activate authorization.

## Static authorization checking

The static phase uses a set of configuration files:

* `resources-permissions-mapping-*.properties`
* `compound-permissions-mapping-*.properties`
* `custom-permissions-mapping.properties`

These files grant permissions to sets of users based on profile or user name.
You cannot remove permissions in a configuration file, so you must ensure that the default definitions grant the minimum permissions that you want to give to any user.

The default versions of these files are located in `setup/platform_conf/initial/tenant_template_portal`.
In order to change the configuration on an installation whose platform has already been initialized, use the [platform setup tool](BonitaBPM_platform_setup.md) to
retrieve the current configuration and update the files in `setup/platform_conf/current/tenants/[tenantId]/tenant_portal`.
Then use the tool again to save your changes into the database.

#### Resources permissions mapping

The `resources-permissions-mapping-*.properties` files define the mapping of REST resources to simple permissions.
This tells you what permission is needed to access a given resource. 

For example: `GET|identity/user=[organization_visualization,organization_management]`

This specifies that a user with the organization\_visualization, or organization\_management permissions can see information about users.

By default, this file contains a mapping of each Bonita BPM resources to at least one simple permission.
You can modify the file `resources-permissions-mapping-custom.properties` to add your own mappings.
For example: `GET|identity/user/3=[organization_management]`

This specifies that information about the user with id 3 can only be seen by users with the Organization\_management permission.

If there are conflicts between permissions, the more restrictive definition overrides the more general.
You can see this in the example above, where the specific permission for user 3 overrides the general permission for seeing user information.

::: warning
Do **not** modify file `resources-permissions-mapping.properties` directly, as it is reserved for default values.
Custom values should be added manually in file `resources-permissions-mapping-`**`-custom`**`.properties`
:::

#### Compound permissions mapping

The `compound-permissions-mapping-*.properties` files define sets of simple permissions that are grouped together into a compound permission.
You can use a compound permission as "shorthand" for a list of simple permissions.
By default, the file `resources-permissions-mapping.properties` contains a compound permission that corresponds to each page of the Bonita BPM Portal,
including [custom pages](#custom_pages).

For example: `userlistingadmin=[profile_visualization, process_comment, organization_visualization, tenant_platform_visualization, organization_management]`

This specifies the REST API permissions that are granted with the Bonita BPM Portal Administrator page that lists all the users in the tenant.

By default, there is a compound permission defined for each page in the standard Bonita BPM Portal and there is also one for each provided custom page.

When you install a custom page in the portal, if the page declares its resources properly, then a new compound permission will be added in an internal version
of this file (`compound-permissions-mapping-internal.properties`). Then all the users being able to access this page (because it is part of a custom profile or
Living Application they have access to) will also be automatically granted the necessary permissions to call the required REST API resources.

::: warning
Do **not** modify file `compound-permissions-mapping.properties` directly, as it is reserved for default values.
Custom values should be added manually in file `compound-permissions-mapping`**`-custom`**`.properties`
:::


<a id="custom-permissions-mapping"/>

#### Custom permissions mapping

The `custom-permissions-mapping.properties` file contains custom rules that supplement the resource permissions and compound permissions.
By default, this file is empty, because the compound permissions definitions automatically manage the permissions needed for default and custom profiles, and for default and custom pages.

If you want to override the default behavior, you can add a rule to this file. You can add a simple or compound permission to a profile.
For example, to give users with the User profile the ability to manage the Bonita BPM Portal look & feel: `profile|User=[look_and_feel]`

You can also assign a permission to a specific user. This is useful if you want to give a named user access to a resource that is not accessible through the user's profiles.
For example, if the user John.Smith is assigned the User profile, he does not have permission to manage the portal Look & Feel.
You can add this specific permission to `custom-permissions-mapping.properties` by adding this line: `user|John.Smith=[look_and_feel]`

This means that in addition to the permissions given to him by the User profile, John.Smith can also manage the Portal Look & Feel. It does not modify the permissions for any other user.

If you do not use Bonita BPM Portal but still want to manage REST API authorizations, you can do this using the `custom-permissions-mapping.properties` file.
To do this, create a custom profile and configure the relevant permissions.
For example, you could create a profile called CustomProcessManager and assign the permissions needed to monitor and manage processes:
`profile|MyCustomProfile=[process_visualization, process_management, process_manager_management, custom_process_manager_permission]`

In this example, the `custom_process_manager_permission` can be defined in the `compound-permissions-mapping-custom.properties` file.

## Dynamic authorization checking

If the static authorization checks are not suitable for your applications, you can override the rules as you want using dynamic checks.
A user is then granted a permission only if the dynamic check authorizes it.
A dynamic check is implemented as sequence of conditions, including a Groovy script.
This enables you to tailor the permissions needed to access a resource using dynamic information related to processes.

A dynamic authorization check for a resource is specified by a line in the file `dynamic-permissions-checks-custom.properties`.
The line specifies the checks to be made for a request type for a method.
There can be several terms in the line. Checking stops when the system returns success, indicating that the user is authorized.
For example: `POST|bpm/case=[user|william.jobs, user|walter.bates, profile|Administrator, profile|User, check|CasePermissionRule]`

This specifies that a POST action can be done for a case resource if the user is william.jobs or walter.bates,
or any user with the Administrator profile, or any user with the User profile, or if the CasePermissionRule grants authorization.

A `check` term indicates the name of a class to be called. The class must implement `org.bonitasoft.engine.api.permission.PermissionRule`.
This example defines a dynamic check that is made whenever a user makes a GET request for the bpm/process resource. The script must be added to the `setup/platform_conf/current/tenant_template_security_scripts` folder before the platform initialization or using the [plaform setup tool](BonitaBPM_platform_setup.md) to retrieve the current configuration, to the folder `setup/platform_conf/current/tenants/[tenantId]/tenant_security_scripts` (then you need to use the tool again to save the changes into the database).
The `tenant_security_scripts` folder contains some example scripts. If the script returns `true`, the user is authorized. If the script returns `false` or any other result (including an error), the user is not authorized.

The `dynamic-permissions-checks.properties` file contains a placeholder line for each method and resource. For example:
```properties
## CasePermissionRule
    #GET|bpm/case=[profile|Administrator, check|CasePermissionRule]
    #POST|bpm/case=[profile|Administrator, check|CasePermissionRule]
    #DELETE|bpm/case=[profile|Administrator, check|CasePermissionRule]
    #GET|bpm/archivedCase=[profile|Administrator, check|CasePermissionRule]
```

To specify a dynamic check for a method and resource, uncomment the line in the file `dynamic-permissions-checks-custom.properties` and add the conditions.
If you specify a condition that calls a Groovy script, add the script to the `tenant_security_scripts` folder. Then use the [plaform setup tool](BonitaBPM_platform_setup.md) to save the changes.

::: warning
Do **not** modify file `dynamic-permissions-checks.properties` directly, as it is reserved for examples, and may be overwritten during migration to a newer version.
Custom values should be added manually in file `dynamic-permissions-checks`**`-custom`**`.properties`
:::

#### Example dynamic check script

This script is an example of how to write a dynamic check. It checks two conditions, depending on the method called for a case.
If the method is a POST, which would start a case of a process. the user can only start the case if they are eligible to start the process itself.
If the user action triggers a GET, the user can view the case information only if they are involved in the case.
The Engine API Java method `isInvolvedInProcessInstance` is used to check whether the user is involved. For an archived case, the only check possible is whether the user started the case.
```groovy
import org.bonitasoft.engine.api.*
import org.bonitasoft.engine.api.permission.APICallContext
import org.bonitasoft.engine.api.permission.PermissionRule
import org.bonitasoft.engine.bpm.process.ArchivedProcessInstanceNotFoundException
import org.bonitasoft.engine.identity.User
import org.bonitasoft.engine.identity.UserSearchDescriptor
import org.bonitasoft.engine.search.SearchOptionsBuilder
import org.bonitasoft.engine.search.SearchResult
import org.bonitasoft.engine.session.APISession
import org.json.JSONObject

class CasePermissionRule implements PermissionRule {

    @Override
    public boolean check(APISession apiSession, APICallContext apiCallContext, APIAccessor apiAccessor, Logger logger) {
        long currentUserId = apiSession.getUserId()
        if ("GET".equals(apiCallContext.getMethod())) {
            return checkGetMethod(apiCallContext, apiAccessor, currentUserId, logger)
        } else if ("POST".equals(apiCallContext.getMethod())) {
            return checkPostMethod(apiCallContext, apiAccessor, currentUserId, logger)
        }
        return false
    }

    private boolean checkPostMethod(APICallContext apiCallContext, APIAccessor apiAccessor, long currentUserId, Logger logger) {
        def body = apiCallContext.getBodyAsJSON()
        def processDefinitionId = body.optLong("processDefinitionId")
        if (processDefinitionId <= 0) {
            return false;
        }
        def processAPI = apiAccessor.getProcessAPI()
        def identityAPI = apiAccessor.getIdentityAPI()
        User user = identityAPI.getUser(currentUserId)
        SearchOptionsBuilder searchOptionBuilder = new SearchOptionsBuilder(0, 10)
        searchOptionBuilder.filter(UserSearchDescriptor.USER_NAME, user.getUserName())
        SearchResult<User> listUsers = processAPI.searchUsersWhoCanStartProcessDefinition(processDefinitionId, searchOptionBuilder.done())
        logger.debug("RuleCase : nb Result [" + listUsers.getCount() + "] ?")
        def canStart = listUsers.getCount() == 1
        logger.debug("RuleCase : User allowed to start? " + canStart)
        return canStart
    }

    private boolean checkGetMethod(APICallContext apiCallContext, APIAccessor apiAccessor, long currentUserId, Logger logger) {
        def processAPI = apiAccessor.getProcessAPI()
        def filters = apiCallContext.getFilters()
        if (apiCallContext.getResourceId() != null) {
            def processInstanceId = Long.valueOf(apiCallContext.getResourceId())
            if (apiCallContext.getResourceName().startsWith("archived")) {
                //no way to check that the were involved in an archived case, can just show started by
                try {
                    return processAPI.getArchivedProcessInstance(processInstanceId).getStartedBy() == currentUserId
                } catch(ArchivedProcessInstanceNotFoundException e) {
                    logger.debug("archived process not found, "+e.getMessage())
                    return false
                }
            } else {
                def isInvolved = processAPI.isInvolvedInProcessInstance(currentUserId, processInstanceId)
                logger.debug("RuleCase : allowed because get on process that user is involved in")
                return isInvolved
            }
        } else {
            def stringUserId = String.valueOf(currentUserId)
            if (stringUserId.equals(filters.get("started_by")) || stringUserId.equals(filters.get("user_id")) || stringUserId.equals(filters.get("supervisor_id"))) {
                logger.debug("RuleCase : allowed because searching filters contains user id")
                return true
            }
        }
        return false
    }
}
```

## Initialization

After the application server starts, the first time that one of the configuration files is accessed, the information from all the files is cached in memory for fast access.
If you update a file, the changes become active the next time the application server restarts.
In your development environment, you can use the [debug mode](#debug) to makes any changes to the configuration files
and dynamic check scripts available immediately. 

## User login

When a user logs in, after the user is [authenticated](user-authentication-overview.md), a map of `LoggedUserPermissions` is created.
`LoggedUserPermissions` is a combination of the information from `compound-permissions-mapping.properties` and
`CustomUserPermissionsMapping` that is relevant to the user.
It takes into account all the profiles assigned to the user, not only the current profile, so when you change profile the map does not need to be recreated.

## Runtime behavior

At runtime, when a user requests access to a resource, the system checks to see if a dynamic check is defined for this resource. If so, it executes the check, and the result grants or denies the user access to the resource.
If there is no dynamic check for the resource, the system uses the static checks: it uses the information in the `ResourceRequiredPermissions` to see what permissions are
needed to access the resource (or page), and checks the `LoggedUserPermissions` to see whether the user has the necessary permissions.
If so, the user is authorized.
Otherwise, access is refused.
If access is not authorized, a message is written in the log so that the Administrator is aware that an unauthorized user has tried to gain access.
Note that this level of logging is only available if you [set the logging level](logging.md) to `FINEST`.

<a id="custom_pages"/>

## Authorizing access to a custom page

When a new [custom page](pages.md) is added, the permissions defined in the page properties are added to the permissions configuration files and the cache.
It is not necessary to restart the applications server to activate security for the new custom page.
Depending on the permissions that a user of the page already has, it might be necessary to log out and log in again to get access to the new custom page.

::: warning
If the page declares resources provided by a REST API extension (link to the REST API extention page), then the REST API extension must be deployed before the page,
otherwise the compound permissions won't be automatically created when deploying the page.
:::

## Authorization and custom profiles

When a new [custom profile](custom-profiles.md) is created, the permissions mappings are updated in the configuration files and in the cache.
It is not necessary to restart the application server to activate security for the new custom profile.

## Granting permissions to a given resource

If you only develop custom pages and you declare the resources they use properly, you should never have to create custom permissions.
However, you may need to do so if you need to manually grant permissions to a given REST API resource (so that it can be called programatically for example). In order to do that, you need to:
1. Look into the file `resources-permissions-mapping.properties` for the permissions that grant access to the resource.
For example, in order to perform a GET on `bpm/task`, I can see that I need the permission `flownode_visualization` (syntax: `GET|bpm/task=[flownode_visualization]`)
2. Edit the file `custom-permissions-mapping.properties` to give the permission `flownode_visualization` to the required profiles or users.
For example, to add the permission to the user walter.bates (username), add the following line : `user|walter.bates=[flownode_visualization]`

<a id="activate"/>

## Activating and deactivating authorization

`security-config.properties` contains a Boolean property that specifies whether authorization is activated. To activate authorization, set this property to `true`: `security.rest.api.authorizations.check.enabled true`

To activate authorization, edit `security-config.properties` and set the value of the `security.rest.api.authorizations.check.enabled` property to `true`, then restart the application server.

To deactivate authorization, set the property to `false`, then restart the application server.

If you activate authorization, you must also deactivate the HTTP API, so that is cannot be used to bypass the authorization settings.
To do this, you can either filter the HTTP API in the Tomcat configuration (that is, accept only specific IP addresses), or you can
deactivate the `HttpAPIServlet`. To deactivate the servlet, go to the `webapps/bonita/WEB-INF` folder of your web server,
edit `web.xml` and comment out the following definitions:
```xml
    <!-- For engine HTTP API -->
    <!--
    <servlet>
        <servlet-name>HttpAPIServlet</servlet-name>
        <servlet-class>org.bonitasoft.engine.api.internal.servlet.HttpAPIServlet</servlet-class>
    </servlet>
    -->


    <!--
     <servlet-mapping>
         <servlet-name>HttpAPIServlet</servlet-name>
         <url-pattern>/serverAPI/*</url-pattern>
     </servlet-mapping>
     -->
```

<a id="debug"/>

#### Running in debug mode

If debug mode is activated, whenever you update a configuration file or a dynamic check script, the changes take effect immediately.

To activate debug mode, edit `security-config.properties` and set the value of the `security.rest.api.authorizations.check.debug` property to `true`, then restart the application server.

To deactivate authorization, set the property to `false`, then restart the application server. Debug mode should be deactivated in production, so as not to impact performance.

<a id="migrate"/>

#### Migration
When you migrate from a version earlier than 6.4.0, authorization is configured to be off (`security.rest.api.authorizations.check.enabled` is set to `false`).

If you have an existing custom page and want to activate authorization, you need to add permissions to the definition of the custom page.
To add authorization to an existing custom page:

1. Export the [custom page](pages.md).
2. Update the page properties with [permissions](pages.md).
3. Activate authorization, by editing `security-config.properties` and setting the value of the `security.rest.api.authorizations.check.enabled` property to `true`.
4. Restart the application server.
5. Import the [custom page](pages.md).

If you have an existing custom profile, the permissions relating to the profiles is automatically added to the permissions files, so you do not need to update the profile.
However, if a custom profile use a custom page, you must update the custom page definition to add permissions before you activate authorization.

## Permissions and resources

The table below shows the default permissions and the resources to which they grant access.
| Permission | Resources|
|:-|:-|
| activity\_visualization | \[GET\|bpm/processResolutionProblem\]| 
| application\_management | \[POST\|living/application, PUT\|living/application, DELETE\|living/application, POST\|living/application-page, PUT\|living/application-page, DELETE\|living/application-page, POST\|living/application-menu, PUT\|living/application-menu, DELETE\|living/application-menu\]| 
| application\_visualization | \[GET\|living/application, GET\|living/application-page, GET\|living/application-menu\]| 
| bdm\_management | \[POST\|tenant/bdm\]| 
| bdm\_visualization | \[GET\|bdm/businessData, GET\|bdm/businessDataReference\]| 
| bpm\_monitoring\_management | \[POST\|monitoring/report, DELETE\|monitoring/report\]| 
| bpm\_monitoring\_visualization | \[GET\|monitoring/report\]| 
| case\_delete | \[DELETE\|bpm/case, DELETE\|bpm/archivedCase\]| 
| case\_management | \[POST\|bpm/case, PUT\|bpm/caseVariable, PUT\|bpm/caseDocument, POST\|bpm/caseDocument, DELETE\|bpm/caseDocument, DELETE\|bpm/archivedCaseDocument\]| 
| case\_start | \[PUT\|bpm/process, POST\|bpm/case\]| 
| case\_start\_for | \[PUT\|bpm/process\]| 
| case\_visualization | \[GET\|bpm/case, GET\|bpm/archivedCase, GET\|bpm/caseVariable, GET\|bpm/caseDocument, GET\|bpm/archviedCaseDocument\]| 
| command\_management | \[POST\|bpm/command, PUT\|bpm/command, DELETE\|bpm/command\]| 
| command\_visualization | \[GET\|bpm/command\]| 
| connector\_management | \[PUT\|bpm/process, PUT\|bpm/processConnector, PUT\|bpm/connectorInstance\]| 
| connector\_visualization | \[GET\|bpm/process, GET\|bpm/processConnector, GET\|bpm/processConnectorDependency, GET\|bpm/connectorInstance, GET\|bpm/archivedConnectorInstance, GET\|bpm/connectorFailure\]| 
| demo\_permission (since 7.0.0) | \[GET\|extension/demo/getExample, GET\|extension/demo/headerExample, GET\|extension/demo/logExample, GET\|extension/demo/soapExample, GET\|extension/demo/xmlExample, POST\|extension/demo/postExample\]| 
| document\_management | \[PUT\|bpm/caseDocument, POST\|bpm/caseDocument, DELETE\|bpm/caseDocument, PUT\|bpm/archivedCaseDocument, POST\|bpm/archivedCaseDocument, DELETE\|bpm/archivedCaseDocument, POST\|bpm/document, PUT\|bpm/document, DELETE\|bpm/document\]| 
| document\_visualization | \[GET\|bpm/caseDocument, GET\|bpm/document, GET\|bpm/archiveddocument, GET\|bpm/archivedCaseDocument\]| 
| flownode\_management | \[PUT\|bpm/flowNode, PUT\|bpm/activity, PUT\|bpm/task, PUT\|bpm/timerEventTrigger\]| 
| flownode\_visualization | \[GET\|bpm/processResolutionProblem, GET\|bpm/flowNode, GET\|bpm/activity, GET\|bpm/task, GET\|bpm/activityVariable, GET\|bpm/archivedFlowNode, GET\|bpm/archivedActivity, GET\|bpm/archivedTask, GET\|bpm/timerEventTrigger\]| 
| license | \[GET\|system/license\]| 
| look\_and\_feel | \[POST\|portal/theme, PUT\|portal/theme, POST\|userXP/theme, PUT\|userXP/theme\]| 
| organization\_management | \[POST\|identity/user, PUT\|identity/user, DELETE\|identity/user, POST\|identity/personalcontactdata, PUT\|identity/personalcontactdata, POST\|identity/professionalcontactdata, PUT\|identity/professionalcontactdata, POST\|identity/role, PUT\|identity/role, DELETE\|identity/role, POST\|identity/group, PUT\|identity/group, DELETE\|identity/group, POST\|identity/membership, PUT\|identity/membership, DELETE\|identity/membership, POST\|customuserinfo/definition, DELETE\|customuserinfo/definition, PUT\|customuserinfo/value\]| 
| organization\_visualization | \[GET\|identity/user, GET\|identity/personalcontactdata, GET\|identity/professionalcontactdata, GET\|identity/role, GET\|identity/group, GET\|identity/membership, GET\|customuserinfo/user, GET\|customuserinfo/definition, GET\|customuserinfo/value\]| 
| platform\_management (since 7.1.0) | \[GET\|platform/license\]| 
| process\_actor\_mapping\_management | \[PUT\|bpm/process\]| 
| process\_actor\_mapping\_visualization | \[GET\|bpm/process\]| 
| process\_categories | \[GET\|bpm/process, PUT\|bpm/process, POST\|bpm/processCategory, DELETE\|bpm/processCategory, GET\|bpm/category, POST\|bpm/category, PUT\|bpm/category, DELETE\|bpm/category\]| 
| process\_comment | \[GET\|bpm/comment, POST\|bpm/comment, GET\|bpm/archivedComment\]| 
| process\_deploy | \[POST\|bpm/process, DELETE\|bpm/process\]| 
| process\_management | \[PUT\|bpm/process, GET\|bpm/processConnector, PUT\|bpm/processConnector, GET\|bpm/processConnectorDependency, POST\|bpm/processCategory, DELETE\|bpm/processCategory, GET\|bpm/processParameter, PUT\|bpm/processParameter, POST\|bpm/actorMember, PUT\|bpm/actorMember, DELETE\|bpm/actorMember\]| 
| process\_manager\_management | \[POST\|bpm/processSupervisor, DELETE\|bpm/processSupervisor, POST\|bpm/actorMember, PUT\|bpm/actorMember, DELETE\|bpm/actorMember\]| 
| process\_manager\_visualization | \[GET\|bpm/processSupervisor, GET\|bpm/actorMember\]| 
| process\_visualization | \[GET\|bpm/process, GET\|bpm/actor, GET\|bpm/actorMember, GET\|bpm/diagram\]| 
| profile\_management | \[POST\|portal/profile, PUT\|portal/profile, DELETE\|portal/profile, POST\|portal/page, PUT\|portal/page, DELETE\|portal/page, POST\|portal/profileEntry, PUT\|portal/profileEntry, DELETE\|portal/profileEntry, POST\|userXP/profile, PUT\|userXP/profile, DELETE\|userXP/profile, POST\|userXP/profileEntry, PUT\|userXP/profileEntry, DELETE\|userXP/profileEntry\]| 
| profile\_visualization | \[GET\|portal/profile, GET\|portal/bonitaPage, GET\|portal/page, GET\|portal/profileEntry, GET\|userXP/profile, GET\|userXP/profileEntry, GET\|userXP/bonitaPage\]| 
| profile\_member\_visualization | \[GET\|portal/profileMember, GET\|userXP/profileMember\]| 
| profile\_member\_management | \[POST\|portal/profileMember, DELETE\|portal/profileMember, POST\|userXP/profileMember, DELETE\|userXP/profileMember\]| 
| task\_management | \[PUT\|bpm/humanTask, PUT\|bpm/userTask, POST\|bpm/hiddenUserTask, DELETE\|bpm/hiddenUserTask, POST\|bpm/manualTask, PUT\|bpm/manualTask\]| 
| task\_visualization | \[GET\|bpm/humanTask, GET\|bpm/userTask, GET\|bpm/hiddenUserTask, GET\|bpm/manualTask, GET\|bpm/archivedHumanTask, GET\|bpm/archivedUserTask, GET\|bpm/archivedManualTask\]| 
| tenant\_platform\_management | \[PUT\|system/tenant, POST\|platform/platform, PUT\|platform/platform, DELETE\|platform/platform, POST\|platform/tenant, PUT\|platform/tenant, DELETE\|platform/tenant\]| 
| tenant\_platform\_visualization | \[GET\|system/session, GET\|system/log, GET\|system/tenant, GET\|system/feature, GET\|system/monitoring, GET\|system/i18nlocale, GET\|system/i18ntranslation, GET\|platform/platform, GET\|platform/jvmDynamic, GET\|platform/jvmStatic, GET\|platform/systemProperty, GET\|platform/tenant \]
