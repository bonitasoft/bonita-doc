## customuserinfo

### Description

Use the customuserinfo API for managing custom user definitions. Three resources are used: customuserinfo/definition, customuserinfo/value, and customuserinfo/user.

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation of customuserinfo/definition

    {
    "id":"_id of definition_",
    "description":"_definition description_",
    "name":"_definition name_"
    }

### Representation of customuserinfo/value

    {
    "userId":"_id of user_",
    "value":"_content of the value_",
    "definitionId":"_id of definition_"
    }

### Representation of customuserinfo/user

    {
    "userId":"_id of user_",
    "value":"_content of the value_",
    "definitionId":{
    	"id" : "_id of definition_",
    	"description" : "_definition description_",
    	"name" : "_definition name_"
        }
    }

### Methods

The methods used for these resources are:

* GET
* POST
* PUT
* DELETE

### Add a new definition

Use the method POST to add a new definition.
Method
POST

URL
`http://localhost:8080/bonita/API/customuserinfo/definition`

Payload
JSON representation of definition, without id

Response
JSON representation of complete definition including id

#### Example

Add a definition called `skill`. The returned id is 101\.
Method
POST

URL
`http://localhost:8080/bonita/API/customuserinfo/definition`

Payload

    {
    "name": "skill",
    "description": "code slayer"
    }

Response

    {
    "id":"101",
    "description":"code slayer",
    "name":"skill"
    }

### Delete a definition

Use the DELETE method to delete an existing definition.
Method
DELETE

URL
`http://localhost:8080/bonita/API/customuserinfo/definition/`

Payload
empty

Response
empty

### Associate definitions to users

Use a PUT method to associate users with custom information.

Example: Associate the user with id = 1 with the definition with id = 2\.
Method
PUT

URL
`http://localhost:8080/bonita/API/customuserinfo/value/1/2`

Payload

    {
    "value":"customUserInfoValue"
    }

Response
empty

### List the custom user information

Use a GET method to search for definitions.

There are no filters, and no search terms. All the definitions are returned.

#### Description
Request url
/API/customuserinfo/definitions?p={page}&c={count}

Request method

GET

Request payload

empty

Response

An array of definition objects

### Search custom user info

Use a GET method to search for custom user information.

A filter is mandatory: f=userId=. Example: http://localhost:8080/bonita/API/customuserinfo/user?c=10&p=0&f=userId=1

#### Description
Request url
/API/customuserinfo/user?p={page}&c={count}&f=userId=id

Request method

GET

Request payload

empty

Response

An array of customuserinfo/user objects