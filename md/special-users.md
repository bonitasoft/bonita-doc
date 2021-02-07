# Special users

This page explains the three other ways to log into Bonita than with a regular profile: Tenant Administrator (Technical user), Platform Administrator, and Guest user.

## Platform administrator. 
The platform is the part of the system that is common to all tenants. The platform administrator can manage [through the API](platform-api.md) the platform level resources (including starting/stopping all services of the platform and managing tenants). He can also access the license information (for Enterprise editions).  
Its username and password are defined in a configuration file and need to be changed for any other usage of a Bonita Tomcat bundle than local development (see
[Bonita Tomcat bundle installation procedure](tomcat-bundle.md#toc3) for more information on how to proceed.
Its default credentials are:
* username: `platformAdmin`
* password: `platform`


## Technical user
Each tenant has an administrator (also known as the **tenant technical user**) with a tenant-specific username and password. The tenant administrator can start and stop the BPM services for the tenant, install a Business Data Model, install the resources and the organization.  
Their username and password are defined in a configuration file and need to be changed for any other usage of a Bonita Tomcat bundle than local development (see
[Tenant admin credentials page](tenant_admin_credentials.md) for more information on how to proceed.
Its default credentials are:
* username: `install`
* password: `install`

## Guest user
With enterprise editions, it is possible to allow public access to some living applications (without the need to sign in to Bonita).
When accessing a public application without any active session on Bonita platform the user will be automatically logged in with a guest user account.  
To know more about this feature, go to the [Guest user access documentation](guest-user.md).
