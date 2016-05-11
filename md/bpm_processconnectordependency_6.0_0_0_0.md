## processConnectorDependency

### Description

Use the processConnectorDependency resource to access connector dependencies.

### Identifier

The object itself

### Parameters

None

### Representation

    {
    "connector_version":"_connector version_",
    "connector_process_id":"_process id_>",
    "filename":"_filename representing the connector_>",
    "connector_name":"_connector name_>"
    }
    

### Methods

The methods used for this resource are:

* GET - Search for connector dependencies

### Search for connector dependencies

Use a GET method with filters to search for connector dependencies.

Mandatory filters: connector\_process\_id, connector\_name, connector\_version

Example: Get connector dependencies of the email connector (version 1.0.0) of the process with id = 4971555129176049183
Method
GET

URL
`http://localhost:8080/bonita/API/bpm/processConnectorDependency?c=10&p=0&f=connector_process_id=4971555129176049183&f=connector_name=email&f=connector_version=1.0.0`

Payload
empty

Response

    [
    {
    "connector_version":"1.0.0",
    "connector_process_id":"4971555129176049183",
    "filename":"bonita-connector-email-impl-1.0.12.jar",
    "connector_name":"email"
    },
    {
    "connector_version":"1.0.0",
    "connector_process_id":"4971555129176049183",
    "filename":"mail-1.4.5.jar",
    "connector_name":"email"
    }
    ]