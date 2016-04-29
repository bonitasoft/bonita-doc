# 4.5.5.8 Manage the platform

This example shows how to use the Bonita BPM Engine API to manage the platform.


You can create the platform, initialize the platform, start the Engine, and stop the Engine.


Before you can create the platform, you need to log in and get the platformAPI:
`
// Get platform login API using the PlatformAPIAccessor
PlatformLoginAPI platformLoginAPI = PlatformAPIAccessor.getPlatformLoginAPI();
// Log in to the platform
PlatformSession platformSession = platformLoginAPI.login("platformAdmin", "platform");

// Get the platform API
PlatformAPI platformAPI = PlatformAPIAccessor.getPlatformAPI(platformSession);    
`



**Create the platform** by calling the createPlatform method. This will create the database structure and put the platform state into persistent storage.
`
// create the platform
platformAPI.createPlatform();
`

The next step is to **initialize the platform**, that is, create the default tenant and initialize the Bonita BPM Engine environment. 
After this step the technical user will be able to connect to the engine and to create new users or [import the organization](/manage-organization#org). No users are created by 
default and the default username/password for the technical user to connect to the Bonita BPM Engine are stored in the file bonita-server.properties that is in the _BONITA\_HOME_ directory.
`
// initialize the platform
platformAPI.initializePlatform();
`

Next, **start the Engine**. Starting the Engine on a node starts the Scheduler 
service and restarts elements that were not finished by the Work service on the previous shutdown. The Bonita BPM Engine environment 
is marked as activated.
`
// start the execution engine
platformAPI.startNode();
`

To **stop the Bonita BPM Engine**, call the stopNode method. Stopping the node stops the Scheduler service. The Bonita BPM Engine environment is marked as deactivated.
`
// stop the execution engine
platformAPI.stopNode();
`