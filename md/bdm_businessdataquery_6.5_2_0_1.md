## businessDataQuery

### Description

The business data query REST API resource is used to call a default or custom business data query.
It is available from version 6.5\.

### Identifier

../API/bdm/businessData/_businessDataType_?q=_queryName_

### Representation

A JSON representation of the query result.

### Methods

The methods used for this resource are:

* GET - Call a named query

### Call a business data named query

The query can be either a default or a custom query.
Request url
http://../API/bdm/businessData/_businessDataType_?q=_queryName_&p=0&c=10&f=param=value

Request method

GET

Request payload

empty

Response payload

JSON representation of query result

#### Parameters

* businessDataType - the fully-qualified business data type name
* q=queryName - the query name
* p=0 - the page number
* c=10 - the maximum number of results in the page
* f=parameter=value - sets the parameter value according to business data query parameters defined in var\_studio

For a Boolean parameter, the accepted values are `true` or `false`.

By default, for a Date parameter can use the following formats:

* yyyy-MM-dd
* HH:mm:ss
* yyyy-MM-dd HH:mm:ss
* yyyy-MM-dd'T'HH:mm:ss
* yyyy-MM-dd'T'HH:mm:ss.SSS

#### Example

Call the findEmployeeByFirstNameAndLastName query
Request url
GET
|/API/bdm/businessData/com.company.model.Employee?q=findEmployeeByFirstNameAndLastName&p=0&c=10&f=firstName=John&f=lastName=Doe

Request payload
empty

Response payload

    [
        {
        "persistenceId": 1,
        "persistenceId_string": "1",
        "persistenceVersion": 0,
        "persistenceVersion_string": "0",
        "firstName": "John",
        "lastName": "Doe",
        "phoneNumbers": ["123456789"],
        "addresses": [{}],
        "links":
            [
                {
                "rel": "address",
                "href": "/businessdata/com.company.model.Employee/1/address"
                }
            ]
        }
    ]