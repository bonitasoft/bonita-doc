# BDM API

Access to the bdm REST API depends on the [REST API authorization](rest-api-authorization.md) settings.

## BusinessData

#### Description

Retrieve business data value. Depending on the object attribute loading policy, the API returns either the full object in JSON representation or the HATEOAS links to the object attributes.

#### Identifier

The fully qualified name (businessDataType) and the persistenceId of the business data (a long value).

#### Representation

Representation of object attributes with an _always load_ policy:

```json
{
  "persistenceId": _number_,
  "persistenceId_string": "_number_" 
  "persistenceVersion": _number_,
  "persistenceVersion_string": "_number_"
  "attributeName":_attributeType_
  ...
}
```

The string representation added in 7.0.1 for Long attributes is a workaround for the JavaScript integer spectrum issue.

HATEOAS representation of object attribute with a _load when needed_ policy:
```json
"links":[
   {
   "rel":_string_
   "href":_uri_
   }
]
```

#### Methods

The methods used for this resource are:

* GET

#### Get the business data

Get the business data specified by its identifier.

* **URL**  
  `/API/bdm/businessData/:businessDataType/:persistenceId`  
  _Example_: `/API/bdm/businessData/com.company.model.Contract/1`
* **Method**  
  `GET`
* **Success Response**  
  A business data (in JSON format)
  * **Code**: 200
  * **Payload**:  
    With business data containing always-loaded object attributes:  
    ```json
    {
      "persistenceId": 1,
      "persistenceId_string": "1",
      "persistenceVersion": 0,
      "persistenceVersion_string": "0",
      "contractName": "contract for Netcom3",
      "terms": [{
        "persistenceId": 1,
        "persistenceId_string": "1",
        "persistenceVersion": 0,
        "persistenceVersion_string": "0",
        "termName": "term Name"
        },
        {
          "persistenceId": 2,
          "persistenceId_string": "2",
          "persistenceVersion": 0,
          "persistenceVersion_string": "0",
          "termName": "term Name"
        }
      ],
      "client": {
        "persistenceId": 13,
        "persistenceId_string": "13",
        "persistenceVersion": 0,
        "persistenceVersion_string": "0",
        "clientName": "client name",
        "description": "n/a",
        "industry": [{
            "persistenceId": 2,
            "persistenceId_string": "2",
            "persistenceVersion": 0,
            "persistenceVersion_string": "0",
            "industryName": "Services"
          }, {
            "persistenceId": 3,
            "persistenceId_string": "3",
            "persistenceVersion": 0,
            "persistenceVersion_string": "0",
            "industryName": "Software"
          }
        ]
      }
    }
    ```
    With business data containing loaded-when-needed object attributes
    ```json
    {
      "persistenceId": 2,
      "persistenceId_string": "2",
      "persistenceVersion": 0,
      "persistenceVersion_string": "0",
      "clientName": "Affectiva",
      "description": "n/a",
      "links": [{
        "rel": "industry",
        "href": "/API/bdm/businessData/com.company.model.Client/2/industry"
      }]
    }
    ```
* **Error Response**  
  When business data identifier is not valid  
  * **Code**: 500



#### Get the business data attribute of business data

Gets the business data attribute of business data according to its identifier and attribute name.
Request url

* **URL**  
  `http://../API/bdm/businessData/:businessDataType/:persistenceId/:attributeName`  
  _Example_: `/API/bdm/businessData/com.company.model.Client/2/industry`
* **Method**  
  `GET`
* **Success Response**  
  A business data (in JSON format)
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "persistenceId": 2,
      "persistenceId_string": "2",
      "persistenceVersion": 0,
      "persistenceVersion_string": "0",
      "industryName": "Services"
    }
    ```
* **Error Response**  
  When business data identifier or attribute name is not valid  
  * **Code**: 500

#### Get several business data

Get the business data specified by their identifiers.

* **URL**  
  `http://../API/bdm/businessData/:businessDataType/findByIds`  
  _Example_: `/API/bdm/businessData/com.company.model.Contract/findByIds?ids=1,83`
* **Method**  
  `GET`
* **Data Params**  
  * ids - list of persistenceIds (comma separated)
* **Success Response**  
  An array of business data (in JSON format). It can be an empty array if no identifiers refer to existing data.
  * **Code**: 200
  * **Payload**:  
    With business data containing always loaded object attributes
    ```json
    [{
      "persistenceId": 1,
      "persistenceId_string": "1",
      "persistenceVersion": 0,
      "persistenceVersion_string": "0",
      "contractName": "contract for Netcom3",
      "terms": [{
          "persistenceId": 1,
          "persistenceId_string": "1",
          "persistenceVersion": 0,
          "persistenceVersion_string": "0",
          "termName": "term Name"
        },
        {
          "persistenceId": 2,
          "persistenceId_string": "2",
          "persistenceVersion": 0,
          "persistenceVersion_string": "0",
          "termName": "term Name"
        }
      ],
      "client": {
        "persistenceId": 13,
        "persistenceId_string": "13",
        "persistenceVersion": 0,
        "persistenceVersion_string": "0",
        "clientName": "client name",
        "description": "n/a",
        "industry": [{
          "persistenceId": 2,
          "persistenceId_string": "2",
          "persistenceVersion": 0,
          "persistenceVersion_string": "0",
          "industryName": "Services"
          }, {
            "persistenceId": 3,
            "persistenceId_string": "3",
            "persistenceVersion": 0,
            "persistenceVersion_string": "0",
            "industryName": "Software"
        }]
      }
    }]
    ```

## BusinessDataQuery

#### Description

The business data query REST API resource is used to call a default or custom business data query.
It is available from version 6.5\.

#### Identifier

../API/bdm/businessData/_businessDataType_?q=_queryName_

#### Representation

A JSON representation of the query result.

#### Methods

The methods used for this resource are:

* GET - Call a named query

#### Call a business data named query

The query can be either a default or a custom query.

* **URL**  
  `http://../API/bdm/businessData/_businessDataType_?q=_queryName_&p=0&c=10&f=param=value`  
  _Example_: Call the findEmployeeByFirstNameAndLastName query : 
  ```
  /API/bdm/businessData/com.company.model.Employee?q=findEmployeeByFirstNameAndLastName&p=0&c=10&f=firstName=John&f=lastName=Doe
  ```
* **Method**  
  `GET`
* **Data parameters**:
  * businessDataType - the fully-qualified business data type name
  * q=queryName - the query name
  * p=0 - the page number
  * c=10 - the maximum number of results in the page
  * f=parameter=value - sets the parameter value according to business data query parameters defined in Bonita Studio
  For a Boolean parameter, the accepted values are `true` or `false`.

  By default, for a Date parameter can use the following formats:

  * yyyy-MM-dd
  * HH:mm:ss
  * yyyy-MM-dd HH:mm:ss
  * yyyy-MM-dd'T'HH:mm:ss
  * yyyy-MM-dd'T'HH:mm:ss.SSS
  
* **Success Response**  
  JSON representation of query result 
  * **Code**: 200
  * **Payload**:  
    ```json
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
        "links": [{
          "rel": "address",
          "href": "/businessdata/com.company.model.Employee/1/address"
          }
        ]
      }
    ]
    ```

## BusinessDataReference

::: warning
Deprecated (since 7.0.0)
 
Use [case context API](bpm-api#retrieve-the-case-context) to get business data references for a case
and [task context API](bpm-api#retrieve-the-usertask-context) to get business data references for a task.
:::

#### Description

A business data reference is a link between the business data and the case. The reference can be either single or
multiple depending on the process.

#### Identifier

The reference name (a string value).

#### Representation

Single reference:

```json
{
  "name":"_string_",
  "type":"_string_",
  "storageId":_number_
  "storageId_string":"number"
}
```

Multiple reference:

```json
{
  "name":"_string_",
  "type":"_string_",
  "storageIds":[number]
  "storageIds_string":["number"]
}
```

#### Methods

The methods used for this resource are:

* GET

#### Get the named business data reference defined in the case

Get the named business data reference ({businessDataName} string) defined in the case ({caseId} long).
* **URL**  
  `http://../API/bdm/businessDataReference/:caseId/:businessDataName`  
  _Example_: `/API/bdm/businessDataReference/1/Contracts`
* **Method**  
  `GET`
* **Success Response**  
  A business data reference (in JSON format)
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "name": "contracts",
      "type": "com.company.model.Contract",
      "storageIds": [
        1,2,3,4,5,6,7
      ],
      "storageIds_string": [
        "1","2","3","4","5","6","7"
      ]
    }
    ```
* **Error Response**  
  * **Code**:  
    400 - when caseId is not a number (long)  
    404 - when the businessDataName does not match an existing reference of the case or the caseId is not found

#### Get the business data references defined in the case

* **URL**  
  `/API/bdm/businessDataReference?f=caseId={caseId}&p={pageNumber}&c={pageCount}`  
  _Example_: `/API/bdm/businessDataReference?f=caseId=1&p=0&c=10`
* **Method**  
  `GET`
* **Success Response**  
  An array of business data references (in JSON format)
  * **Code**: 
  * **Payload**:  
    ```json
    [
      {
        "name": "clients",
        "type": "com.company.model.Client",
        "storageIds": [ 25, 26, 33, 34, 35, 36 ],
        "storageIds_string": [ "25", "26", "33", "34", "35", "36" ]
      }, {
        "name": "contracts",
        "type": "com.company.model.Contract",
        "storageIds": [ 1, 2, 3, 4, 11, 12 ],
        "storageIds_string": [ "1", "2", "3", "4", "11", "12" ]
      },
      {
        "name": "industry",
        "type": "com.company.model.Industry",
        "storageId": 1
        "storageId_string": "1"
      }
    ]
    ```
* **Error Response**  
  * **Code**:  
    400 - when caseId or p or c is not a number (long)  
    200 - when caseId is not found, an empty array is returned

