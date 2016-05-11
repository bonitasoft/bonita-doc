## process

### Description

Manage a [process definition](key-concepts.md) (not to be confused with a [case](#case), which is a process instance).

### Identifier

The ID of the process definition (a long value).

### Representation

    {
    "id":"_the identifier of the process definition (long)_",
    "icon":"_icon path (string)_",
    "displayDescription":"_the human readable activity description (string)_",
    "deploymentDate":"_the date when the process definition was deployed (date)_",
    "description":"_the process description (string)_",
    "activationState":"_the state of the process definition (ENABLED or DISABLED)_",
    "name":"_the process name (string)_",
    "deployedBy":"_the id of the user who deployed the process (integer)_",
    "displayName":"_the human readbale process description (string)_",
    "actorinitiatorid":"_the id of the actor that can initiate cases of the process_",
    "last_update_date":"_the date when the process definition was last updated (date)_",
    "configurationState":"_the configuration state of the process (UNRESOLVED or RESOLVED)_",
    "version":"_the version of the process (string)_"
    }

### Methods

The methods used for this resource are:

* POST - Create a process
* GET - Read a process or search for a process
* PUT - Update a process

### Create a process

A process resource is created using the content of a `.bar` file that has previously been [uploaded](manage-files-using-upload-servlet-and-rest-api.md), using the `processUpload` servlet `http://.../bonita/portal/processUpload`,
to get the process archive path.
Request url
API/bpm/process

Request method

POST

Request payload

{"fileupload": "the process archive path."}

Response

A process, in JSON

#### Example
Request url
POST |/API/bpm/process

Request payload

    {
    "fileupload": "D:\bonita-studio\BonitaBPMSubscription-6.6.4\workspace\tomcat\bonita\client\tenants\1\tmp\tmp_4431838172282406107.bar"
    }

Response payload

    {
    "id":"8216934689697197160","icon":"","displayDescription":"",
    "deploymentDate":"2015-01-02, 15:04:30.527"
    "description":"",
    "activationState":"DISABLED",
    "name":"Pool","deployedBy":"4",
    "displayName":"Pool",
    "actorinitiatorid":"3", 
    "last_update_date":"2015-01-02 5:04:30.587",
    "configurationState":"RESOLVED","version":"1.0"
    }

### Read a process

Read a process definition
Request url
/API/bpm/process/{processId}

Request method

GET

Request payload

empty

Response payload

A process in JSON

#### Example
Request url
GET |/API/bpm/process/1

Response payload

    {
    "id":"1",
    "icon":"/default/process.png",
    "displayDescription":"process description",
    "deploymentDate":"2015-01-02 14:21:18.421",
    "description":"another process description",
    "activationState":"ENABLED",
    "name":"Pool1",
    "deployedBy":"2",
    "displayName":"Pool1",
    "actorinitiatorid":"2",
    "last_update_date":"2015-01-02 14:21:18.529",
    "configurationState":"RESOLVED",
    "version":"1.0"
    }

### Update a process

You can update the following fields of a process definition:

* displayDescription
* displayName
* activationState (to toggle between the possible values, DISABLED and ENABLED)
Request url
/API/bpm/process/_processId_

Request method

PUT

Request payload

The fields to be updated, in JSON

Response payload

A process in JSON

#### Example
Request url
PUT |/API/bpm/process/17

Request payload

    {
    "displayName":"Leave booking process"
    }

Response payload

    {
    "id":"1",
    "icon":"/default/process.png",
    "displayDescription":"process description",
    "deploymentDate":"2015-01-02 14:21:18.421",
    "description":"another process description",
    "activationState":"ENABLED",
    "name":"Pool1",
    "deployedBy":"2",
    "displayName":"Leave booking process",
    "actorinitiatorid":"2",
    "last_update_date":"2015-02-23 14:29:02.249",
    "configurationState":"RESOLVED",
    "version":"1.0"
    }

### Search for a process

Search for processes that match the search criteria.
Request url
http://../API/bpm/process?_parameters_

Request method

GET

Request payload

empty

Response payload

Matching processes in JSON

#### Parameters

* [Standard search parameters](web-rest-api-details.md) **p** and **c** must be specified
* s: search on "name", "displayName" or "version"
* o: can order by "name", "version", "deploymentDate", "deployedBy", "activationState", "configurationState", "processId", "displayName", "lastUpdateDate", "categoryId", "label"
* f: can filter on "name", "version", "deploymentDate", "deployedBy", "activationState" with the value DISABLED or ENABLED, "configurationState" with the value UNRESOLVED, or RESOLVED, "processId", "displayName", "lastUpdateDate", "categoryId", "label", "supervisor\_id"
* d: can deploy on "deployedBy" 

### Retrieve the design for a process

Process design can be retrived client side.
Request url
/API/bpm/process/_processId_/design

Request method

GET

Response payload

The process design object. The JSON returned is a representation of the [DesignProcessDefinition](javadoc.md) instance of the given process id.

### Retrieve the instantiation contract for a process

Process instantiation contract elements can be retrived client side.
Request url
/API/bpm/process/_processId_/contract

Request method

GET

Response payload

The task contract elements

#### Example

Retrieve the instantiation contract for the process with id 8902137890939378455\.
Request url
GET |/API/bpm/process/8902137890939378455/contract

Response

    {  
       "constraints":[  
          {  
             "name":"ticket_account",
             "expression":"ticket_account!=null && !ticket_account.toString().isEmpty()",
             "explanation":"input ticket_account is mandatory",
             "inputNames":[  
                "ticket_account"
             ],
             "constraintType":"MANDATORY"
          },
          {  
             "name":"ticket_description",
             "expression":"ticket_description!=null && !ticket_description.toString().isEmpty()",
             "explanation":"input ticket_description is mandatory",
             "inputNames":[  
                "ticket_description"
             ],
             "constraintType":"MANDATORY"
          },
          {  
             "name":"ticket_subject",
             "expression":"ticket_subject!=null && !ticket_subject.toString().isEmpty()",
             "explanation":"input ticket_subject is mandatory",
             "inputNames":[  
                "ticket_subject"
             ],
             "constraintType":"MANDATORY"
          }
       ],
       "inputs":[  
          {  
             "description":null,
             "name":"ticket_account",
             "multiple":false,
             "type":"TEXT"
             "inputs":[]
          },
          {  
             "description":null,
             "name":"ticket_description",
             "multiple":false,
             "type":"TEXT"
             "inputs":[]
          },
          {  
             "description":null,
             "name":"ticket_subject",
             "multiple":false,
             "type":"TEXT"
             "inputs":[]
          }
       ]
    }

### Start a process using an instantiation contract
Request url
/API/bpm/process/_processId_/instantiation

Request method

POST

Request payload

Contract element values

Response payload

the created case ID 201 OK or a contract violation explanation in case of a 400 Bad request

#### Example 1

Start the process with id 8902137890939378455 providing correct contract values
Request url
POST |/API/bpm/process/8902137890939378455/instantiation

Request payload

    
    {  
       "ticket_account":"CustomerA",
       "ticket_description":"issue description",
       "ticket_subject":"Issue 1"
    }
    

Response

    {
    "caseId":"125713789879465465"
    }

#### Example 2

Start the process with id 8902137890939378455 providing incorrect contract values
Request url
POST |/API/bpm/process/8902137890939378455/instantiation

Request payload

    
    {  
       "wrongElement":"This is not the right contract element"
    }
    

Response

    400 Bad request
    {  
       "exception":"class org.bonitasoft.engine.bpm.contract.ContractViolationException",
       "message":"USERNAME=walter.bates | Contract is not valid: ",
       "explanations":[  
          "Expected input [ticket_account] is missing",
          "Expected input [ticket_description] is missing",
          "Expected input [ticket_subject] is missing"
       ]
    }