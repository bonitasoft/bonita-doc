## connectorFailure

### Description

Error message and stackTrace recorded when a connector fails during a process execution. Performance edition only.

### Identifier

The ID of the connector failure (a long value).

### Representation

    {
    "errorMessage":"_the message of the connector failure_",
    "connectorInstanceId":"_the ID of the connector instance (see connectorInstance resource documentation)_",
    "errorStackTrace":"_the stack trace of the error_"
    }
    

### Methods

The methods used for this resource are:

* GET - Read a connector failure

### Read a connector failure

Retrieve the information regarding the failure of the connector execution.
Request url
http://../API/bpm/connectorFailure/<connectorFailure\_id\>

Request method

GET

Request payload
empty

Response payload

A connectorFailure resource as JSON

#### Example
Request url
/API/bpm/connectorFailure/5

Request method

GET

Request payload
empty

Response payload

    
    {
    "errorMessage":"Error while executing the groovy script",
    "connectorInstanceId":"5",
    "errorStackTrace":"org.bonitasoft.engine.core.connector.exception.SConnectorException: PROCESS_DEFINITION_ID=8030057793979348308 | PROCESS_NAME=Pool1 | PROCESS_VERSION=1.0 | PROCESS_INSTANCE_ID=5 | ROOT_PROCESS_INSTANCE_ID=5 | FLOW_NODE_DEFINITION_ID=-6089366458284481881 | FLOW_NODE_INSTANCE_ID=12 | FLOW_NODE_NAME=Étape1 | CONNECTOR_DEFINITION_IMPLEMENTATION_CLASS_NAME=expression execution connector | CONNECTOR_INSTANCE_ID=5 | org.bonitasoft.engine.connector.exception.SConnectorException: java.util.concurrent.ExecutionException: java.lang.Exception: Error while executing the groovy script\n\tat org.bonitasoft.engine.core.connector.impl.ConnectorServiceImpl.executeConnectorInClassloader(ConnectorServiceImpl.java:332)"
    }