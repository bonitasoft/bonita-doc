# Pause and resume BPM services

For certain maintenance tasks that require a change to database tables or to information used by several processes (for example to update the business data model), it is necessary to pause your Bonita service temporarily while it is updated. This is done by pausing the tenant. 
While a tenant is paused, only the technical user has access to Bonita Portal.

When you pause a tenant, this has the following consequences:

* Only the technical user can log in to the Portal.
* Users who are currently logged in, including Administrator users, are automatically logged out.
* Users who are filling in forms when the service is paused will lose any information that has not been submitted.
* All processes are automatically paused.

The following sections explain how to pause and resume service in a tenant using Bonita Portal. You can also use the [Engine API](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/index.html) or the [Web REST API](rest-api-overview.md).

## Pause a tenant

To pause a tenant:

1. Log in to Bonita Portal as the tenant technical user.
2. Go to **Configuration** \> **BPM services**
3. Click the **_Pause_** button.
4. In the popup, click **_Pause_** to confirmation that the tenant is to be paused.
5. The tenant is immediately paused.

## Resume a tenant

1. Log in to Bonita Portal as the tenant technical user.
2. Go to **Configuration** \> **BPM services**
3. Click the **_Resume_** button.
4. In the popup, click **_Resume_** to confirm that you want the tenant to resume service.
5. The tenant resumes activity.

After the service is resumed, inform users that they can now log in to the Portal.