# Manage the platform

This example shows how to use Bonita BPM Engine API to manage the platform.

You can create the platform, initialize the platform, start Bonita BPM Engine, and stop Bonita BPM Engine.

Before you can create the platform, you need to log in and get the platformAPI:

```bash
// Get platform login API using the PlatformAPIAccessor
PlatformLoginAPI platformLoginAPI = PlatformAPIAccessor.getPlatformLoginAPI();
// Log in to the platform
PlatformSession platformSession = platformLoginAPI.login("platformAdmin", "platform");

// Get the platform API
PlatformAPI platformAPI = PlatformAPIAccessor.getPlatformAPI(platformSession);    
```

**Create the platform** by calling the createPlatform method. This will create the database structure and put the platform state into persistent storage.

```bash
// create the platform
platformAPI.createPlatform();
```

The next step is to **initialize the platform**, that is, create the default tenant and initialize Bonita BPM Engine environment. 
After this step, the technical user will be able to connect to the engine and create new users or [import the organization](manage-an-organization.md).

```bash
// initialize the platform
platformAPI.initializePlatform();
```

No users are created by default and the default username/password for the technical user to connect to Bonita BPM Engine can be retrieved in the file `setup/platform_conf/current/tenants/[tenant_id]/tenant_engine/bonita-tenant-community-custom.properties` using the [plaform setup tool](BonitaBPM_platform_setup.md) (`[tenant_id]` being the default tenant ID, that is to say `1` when using the default configuration on a fresh installation).

Once you retrieved the default configuration using the [plaform setup tool](BonitaBPM_platform_setup.md), you can change this username/password by editing the file `bonita-tenant-community-custom.properties` and use the tool again to [push the configuration to database](BonitaBPM_platform_setup.md#update_platform_conf).

Next, **start Bonita BPM engine**. Starting the engine on a node starts the Scheduler service and restarts elements that were not finished by the Work service on the previous shutdown. Bonita BPM Engine environment is marked as activated.

```bash
// start the execution engine
platformAPI.startNode();
```

To **stop Bonita BPM engine**, call the stopNode method. Stopping the node stops the Scheduler service. Bonita BPM Engine environment is marked as deactivated.
```bash
// stop the execution engine
platformAPI.stopNode();
```
