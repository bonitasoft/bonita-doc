## caseInfo

### Description

Introduced in 6.5\. Retrieves information about a case. It returns counters for each flow node in the case, showing the number of flow node instances that are in completed, ready, or failed state. If there are no flow node instances in a given state, no counter is returned for that state for the flow node.

### Identifier

The ID of the case (a long value).

### Representation

    {
        "id": "_case identifier_",
        "flowNodeStatesCounters": {
            "_Flow Node name from Studio_": {
                "completed": "_number of instance of the given Flow Node in completed state_",
                "ready": "_number of instance of the given Flow Node in ready state_",
                "failed": "_number of instance of the given Flow Node in failed state_",
            }
        }
    }

### Methods

The method used for this resource is:

* GET - Read a resource

### Retrieve counters for case flow nodes

Retrieve information about the flow nodes of the case identified by the given ID.
Request url
http://../API/bpm/caseInfo/{id}

Request method

GET

Request payload

empty

Response payload

The JSON representation of the case information

#### Example

In this example, counters are returned for two flow nodes in the case, Step1 and Step3\. For Step3, there are no flow nodes in ready state, so no counter is returned for this.
Request url
|/API/bpm/caseInfo/123

Response payload

    {
        "id": "123",
        "flowNodeStatesCounters": {
            "Step1": {
                "completed": "2",
                "ready": "1",
                "executing": "5"
            },
            "Step3": {
                "completed": "10",
                "failed": "2"
            }
        }
    }