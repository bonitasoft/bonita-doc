# Special users

This page explains the three other ways to log into Bonita than with a regular profile: Tenant Administrator (Technical user), Platform Administrator, and Guest user.

## Sytem administrator
Quick definition, rights and duties.
Default username password. Where to change it.

## Platform administrator. 
Quick definition, rights and duties. 
Default username password. Where to change it.

## Technical user
Quick definition, rights and duties. 
Each tenant has an administrator (also known as the **tenant technical user**) with a tenant-specific username and password. The tenant administrator can start and stop the BPM services for the tenant, install a Business Data Model, install the resources and the organization.  
Their username and password are defined in a configuration file and need to be changed for any other usage of a Bonita Tomcat bundle than local development (see
[Tenant admin credentials page](tenant_admin_credentials.md) for more information on how to proceed.
Its default credentials are:
* username: `install`
* password: `install`

If you modify these values before the first start of the platform, the new values will be the default values for all tenants that will be
created in the future, including the default tenant.

## Guest user
Quick definition and rights.
Link to guest user for how it works.
