## connectorInstance

### Description

Retrieve information about connector instances attached to a process or a flow node.

### Representation

Returns a JSON array of connector details:

    {
    "containerType":"_string_",
    "connectorId":"_string_",
    "id":"_number_",
    "name":"_string_",
    "activationEvent":"_string_",
    "state":"_string_",
    "containerId":"_number_",
    "version":"_string_"
    }
    

### Methods

The methods used for this resource are:

* GET - returns a JSON array of connector details

### Retrieve a list of connector instances attached to a process or a flow node

Request url
http://../API/bpm/connectorInstance

Request method

GET

Request payload

empty

Response payload

A list of connector details

#### Parameters

* f=containerId%3d_long_. The container ID of the process or flow node.

#### Example

### Retrieve information about connectors attached to a flow node

Get information about flow node with instanceId 15\.
Request url
GET |/API/bpm/connectorInstance?p=0&c=10&f=containerId%3d15

Request payload
empty

Response payload

    
    [
    {
    	"containerType":"flowNode",
        "connectorId":"scripting-groovy-script",
        "id":"3",  
    "name":"hello world",
        "activationEvent":"ON_FINISH",
        "state":"TO_BE_EXECUTED",
        "containerId":"15",
        "version":"1.0.0"
    },
    {
    	"containerType":"flowNode",
        "connectorId":"webservice",
        "id":"4",
        "name":"webService",
        "activationEvent":"ON_FINISH",
        "state":"TO_BE_EXECUTED",
        "containerId":"15",
        "version":"1.0.0"
    }
    ]
    

### Retrieve information about connectors attached to a process instance

Get information about process instance with instanceId 4781948523999597477\.
Request url
GET |/API/bpm/connectorInstance?p=0&c=10&f=id%3d4781948523999597477

Request payload
empty

Response payload

    
    [
    {
    "containerType":"process",
    "connectorId":"database-access",
    "id":"8",
    "name":"my connector",
    "activationEvent":"ON_FINISH",
    "state":"TO_BE_EXECUTED",
    "containerId":"4781948523999597477",
    "version":"1.0.0"
    }
    ]