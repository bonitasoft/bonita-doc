## actor

### Description

Manage process actors.

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

    {
    "id":"_actor id_",
    "process_id":"_process definition id_",
    "description":"_a description of the actor_",
    "name":"_name of the actor (as specified on human tasks and for the initiator of the process)_",
    "displayName":"_the display name of the actor_",
    }

### Methods

The methods used for this resource are:

* GET - Read or search an actor
* PUT - Update an actor

### Read an actor

Use a GET method to retrieve information about an actor.

Example: Get the information about the actor with id=1\.
Method
GET

URL
`http://localhost:8080/bonita/API/bpm/actor/1`

Payload
empty

Response

    {
    "id":"1",
    "process_id":"4717422838168315799",
    "description":"",
    "name":"employee",
    "displayName":"Employee actor"
    }

### Search actors for a given process id

Use a GET method to search actors for a given process id.

Example: Get the list of actors of the process with id 4758765
Method
GET

URL
`http://localhost:8080/bonita/API/bpm/actor?p=0&c=10&f=process_id=4758765`

Payload
empty

Response

    [
    {
    "id":"1",
    "process_id":"4758765",
    "description":"",
    "name":"employee",
    "displayName":"Employee actor"
    },
    {
    "id":"2",
    "process_id":"4758765",
    "description":"",
    "name":"customer",
    "displayName":"Customer actor"
    }
    ]

Example: Count the actor members of actors of the process with id 4758765
Method
GET

URL
`http://localhost:8080/bonita/API/bpm/actor?p=0&c=10&f=process_id=4758765&n=users&n=group&n=roles&n=memberships`

Payload
empty

Response

    [
    {
    "id":"1",
    "process_id":"4758765",
    "description":"",
    "name":"employee",
    "displayName":"Employee actor",
    "users":"0",
    "roles":"0",
    "memberships":"0",
    "groups":"13"
    },
    {
    "id":"2",
    "process_id":"4758765",
    "description":"",
    "name":"customer",
    "displayName":"Customer actor",
    ,"users":"0",
    "roles":"0",
    "memberships":"0",
    "groups":"13"
    }
    ]

### Update an actor

Use the PUT method to update an actor.
Fields that can be upated are "displayName" and "description"
Method
PUT

URL
`http://localhost:8080/bonita/API/bpm/actor/1`

Payload

    {
    "displayName": "new display name",
    "description": "new description"
    }

Response
N/A