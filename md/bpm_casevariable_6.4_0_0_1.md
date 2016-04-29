## caseVariable 

### Description

Search, count, find, or update case variable values. A case is an instance of a process.

### Identifier

The ID of the case variable (a long value).

### Representation

    {
    "description":"_Detailed description of the case variable, as set in the definition at design-time_",
    "name":"_name of the variable in the case_",
    "value":"_the current value of the case variable_",
    "case_id":"_ID of the case this variable belongs to_",
    "type":_the Java type of the variable_"
    }
    

### Methods

The methods used for this resource are:

* GET - Search for case variables from its case ID, or find a single case variable from case ID and variable name
* PUT - Update a case variable value

### Get a case variable
  
Request url
http://../API/bpm/caseVariable/\[caseId\]/\[variableName\]

Request method

GET

Request payload

empty

Response payload

A case variable representation

#### Parameters

None

#### Response codes

500: if an exception occurs during the find.

#### Example
Request url
GET |/API/bpm/caseVariable/1/myInvoiceAmount

Request payload
empty

Response payload

    
    {				
    "description":"",
    "name":"myInvoiceAmount",
    "value":"14.2",
    "case_id":"1",
    "type":"java.lang.Float"
    }
    

### Update a case variable

Request url
http://../API/bpm/caseVariable/\[caseId\]/\[variableName\]

Request method

PUT

Request payload

{type:\[javaTypeclassname\],value:\[newValue\]}

Response payload

empty

Warning: only following types are supported for _javaTypeclassname_: java.lang.String, java.lang.Integer, java.lang.Double, java.lang.Long, java.lang.Boolean, java.util.Date

#### Parameters

None

#### Response codes

200: Ok.

500: if an exception occurs during the find.

#### Example
Request url
GET |/API/bpm/caseVariable/1/myInvoiceAmount

Request payload
{"type":"java.lang.Double", "value": 22.98}

Response payload
N/A

### Search for a list of case variables

Request url
http://../API/bpm/caseVariable?p=\[firstPageNumber\]&c=\[pageSize\]&f=case\_id%3d\[caseId\]

Request method

GET

Request payload

empty

Response payload

A representation of a list of case variables

#### Parameters

* standard search **p** parameter is required
* standard search **c** parameter is required
* f = case\_id%3d\[caseId\] to indicate that you want to add a filter on 'case\_id' with value \[caseId\] (%3d is the URL-encoded '=' (equals) sign)

#### Response codes

500: if an exception occurs during the find.

#### Example
Request url
GET |/API/bpm/caseVariable?p=0&c=10&f=case\_id%3d11754

Request payload
empty

Response payload

    
    [
    {
    "description":"",
    "name":"myInvoiceAmount",
    "value":"14.2",
    "case_id":"11754",
    "type":"java.lang.Float"
    }, 
    {
    "description":"invoice reference",
    "name":"myInvoiceReference",
    "value":"1FFL54184KOL",
    "case_id":"11754",
    "type":"java.lang.Long"
    }
    ]