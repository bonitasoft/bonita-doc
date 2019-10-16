# Manage the platform

With Bonita Engine API, you can create and initialize the platform, start and stop the Bonita Engine.

1. **Log on the platform**

Before you can create the platform, you need to log in and get the platformAPI:

```bash
// Get platform login API using the PlatformAPIAccessor
PlatformLoginAPI platformLoginAPI = PlatformAPIAccessor.getPlatformLoginAPI();

// Log on the platform
PlatformSession platformSession = platformLoginAPI.login("platformAdmin", "platform");

// Get the platform API
PlatformAPI platformAPI = PlatformAPIAccessor.getPlatformAPI(platformSession);    
```

2. **Create the platform**

This will create the database structure and put the platform state into persistent storage.

```bash
// Create the platform
platformAPI.createPlatform();
```

3. **Initialize the platform**

This will create the default tenant and initialize Bonita Engine environment. 
After this step, the technical user will be able to connect to the engine and create new users or [import the organization](manage-an-organization.md).

```bash
// Initialize the platform
platformAPI.initializePlatform();
```

No users are created by default and the default username/password for the technical user to connect to Bonita Engine can be retrieved in the file `setup/platform_conf/current/tenants/[tenant_id]/tenant_engine/bonita-tenant-community-custom.properties` using the [plaform setup tool](BonitaBPM_platform_setup.md) (`[tenant_id]` being the default tenant ID, that is to say `1` when using the default configuration on a fresh installation).

Once you retrieved the default configuration using the [plaform setup tool](BonitaBPM_platform_setup.md), you can change this username/password by editing the file `bonita-tenant-community-custom.properties` and use the tool again to [push the configuration to database](BonitaBPM_platform_setup.md#update_platform_conf).

4. **Start Bonita engine**

Starting the engine on a node starts the Scheduler service and restarts elements that were not finished by the Work service on the previous shutdown. Bonita Engine environment is marked as activated.

```bash
// Start the execution engine
platformAPI.startNode();
```

5. **Stop Bonita engine** 

Stopping the node stops the Scheduler service. Bonita Engine environment is marked as deactivated.

```bash
// Stop the execution engine
platformAPI.stopNode();
```
