## businessDataReference

### Description

A business data reference is a link between the business data and the case. The reference can be either single or
multiple depending on the process.

### Identifier

The reference name (a string value).

### Representation

Single reference:

    {
    "name":"_string_",
    "type":"_string_",
    "storageId":_number_
    "storageId_string":"_number_" (since 7.0.1)
    }

Multiple reference:

    {
    "name":"_string_",
    "type":"_string_",
    "storageIds":_[number]_
    "storageIds":_["number"]_ (since 7.0.1)
     }

### Methods

The methods used for this resource are:

* GET

### Get the named business data reference defined in the case

Get the named business data reference ({businessDataName} string) defined in the case ({caseId} long).
Request url
http://../API/bdm/businessDataReference/{caseId}/{businessDataName}

Request method

GET

Request payload

empty

Response payload

A business data reference (in JSON format)

#### Parameters

No parameter

#### Response codes

400 - when caseId is not a number (long)

404 - when the businessDataName does not match an existing reference of the case or the caseId is not found

#### Example
Request url
GET |/API/bdm/businessDataReference/1/Contracts

Response payload

    {
                "name": "contracts",
                "type": "com.company.model.Contract",
                "storageIds": [
                1,2,3,4,5,6,7
                ]
                },
                "storageIds_string": [
                "1","2","3","4","5","6","7"
                ]
                }

### Get the business data references defined in the case
Request url
http://../API/bdm/businessDataReference?f=caseId={caseId}&p={pageNumber}&c={pageCount}

Request method

GET

Request payload

empty

Response payload

An array of business data references (in JSON format)

#### Parameters

No parameter

#### Response codes

400 - when caseId or p or c is not a number (long)

200 - when caseId is not found, an empty array is returned

#### Example
Request url
GET |/API/bdm/businessDataReference?f=caseId=1&p=0&c=10

Request payload
empty

Response payload

    [
                {
                "name": "clients",
                "type": "com.company.model.Client",
                "storageIds": [
                25,
                26,
                33,
                34,
                35,
                36
                ],
                "storageIds_string": [
                "25",
                "26",
                "33",
                "34",
                "35",
                "36"
                ]
                },
                {
                "name": "contracts",
                "type": "com.company.model.Contract",
                "storageIds": [
                1,
                2,
                3,
                4,
                11,
                12
                ],
                "storageIds_string": [
                "1",
                "2",
                "3",
                "4",
                "11",
                "12"
                ]
                },
                {
                "name": "industry",
                "type": "com.company.model.Industry",
                "storageId": 1
                "storageId_string": "1"
                }
                ]