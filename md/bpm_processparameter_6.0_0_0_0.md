## processParameter

### Description

A process parameter is a variable attached to process. The parameter value is set at deployment, and applies to all cases of the process. This feature is available in Performance, Efficiency, and Teamwork editions. 

### Identifier

A compound identifier constructed from process\_id/name where process\_id is a long value and name is the name of the process parameter.

### Representation

    {
    "process_id":"_the identifier of the process definition_",
    "process_name":"_the name of the related process_", 
    "description":"_the description of the parameter_", 
    "name":"_the name of the parameter_", 
    "value":"_the value of the parameter_", 
    "process_version":"_the version of the process_", 
    "type":"_the type of the parameter_" 
    }

### Methods

The methods used for this resource are:

* GET - Read a resource or search for a resource
* PUT - Update a resource

### Read a processParameter

You can read a process parameter using its compound id (process\_id/name) 
Request url
http://../API/bpm/processParameter/{process\_id}/{name}

Request method

GET

Request payload

empty

Response payload
process parameter resource

#### Response codes

200,404,500

#### Example
Request url
GET |/API/bpm/processParameter/4880205209556178729/myParameterName

Response payload

    {
        "process_id": "4880205209556178729",
        "process_name": "myProcessName",
        "description": "myProcessDescription",
        "name": "myParameterName",
        "value": "myParameterValue",
        "process_version": "1.0",
        "type": "java.lang.String"
    }

### Search for a processParameter

When you search for a processParameter, do not provide the process\_version or process\_name. They are needed only when you read a processParameter.
Request url
http://../API/bpm/processParameter

Request method

GET

Request payload

empty

Response payload

A array of process parameters

#### Response codes

200, 500

#### Example
Request url
GET|/API/bpm/processParameter?p=0&c=10&o=name%20ASC&f=process\_id%3d4880205209556178729

Response payload

    [
        {
            "process_id": "4880205209556178729",
            "process_name": "",
            "description": "",
            "name": "d",
            "value": "n",
            "process_version": "",
            "type": "java.lang.String"
        }
    ]

### Update a processParameter

You can update only a process parameter value using the API. If you specify values for other fields in the update request, they are ignored.
Request url
http://../API/bpm/processParameter/{process\_id}/{name}

Request method

PUT

Request payload

A process parameter resource

Response payload

empty

#### Response codes

200 OK, 500

#### Example
Request url
PUT|http://localhost:8080/bonita/API/bpm/processParameter/4880205209556178729/myProcessParameter

Request payload

    {"value":"myNewValue"}