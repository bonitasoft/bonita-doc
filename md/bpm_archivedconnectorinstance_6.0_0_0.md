## archivedConnectorInstance

### Description

Retrieve information about archived connector instances attached to an archived process or an archived flow
node.

### Representation

    {
    "containerType":"_the type (string) of the containing activity_",
    "connectorId":"_the connector id (string)_",
    "id":"_the identifier (long) of the connector instance_",
    "name":"_the name (string) of the connector_",
    "activationEvent":"_the name (string) of hte event that activsted the connector instance_",
    "state":"_the state (string) of the connector_",
    "archivedDate": "_the date (('yyyy-MM-dd HH:mm:ss.SSS')) when this connecctor instance was archived, for example '2014-10-17 16:05:42.626'_",
    "containerId":"_the identifier (long) of the containing activity instance_",
    "version":"_the connector version (string)_"
    }
    

### Methods

The methods used for this resource are:

* GET - returns a JSON array of archived connector details

### Retrieve a list of archived connector instances
Request url
http://../API/bpm/archivedConnectorInstance

Request method

GET

Request payload

empty

Response payload

A list of connector details

#### Example

Get information about archived instances sort by containerId DESC Request url
GET |/API/bpm/archivedConnectorInstance?p=0&c=10&o=containerId+DESC

Response payload

    
    [
    {
       "containerType":"flowNode", 
       "connectorId":"scripting-groovy-script", 
       "id":"15", 
       "name":"connector1", 
       "activationEvent":"ON_ENTER", 
       "state":"DONE",
       "archivedDate":"2014-12-01 16:39:19.041",
       "containerId":"34"
       "version":"1.0.0"
    },
    {
       "containerType":"process",
       "connectorId":"scripting-groovy-script",
       "id":"16",
       "name":"processConnector",
       "activationEvent":"ON_FINISH",
       "state":"DONE",
       "archivedDate":"2014-12-01 16:39:19.097"
       "containerId":"33",
       "version":"1.0.0"
    }
    ]