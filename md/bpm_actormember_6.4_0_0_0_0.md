## actorMember

### Description

An actor member represents the association between the organization and the actor af a process. In an organization we have four member\_types = USER, GROUP, ROLE and MEMBERSHIP (role in a group). You can assign a actor to a user by specifying a role and or a group, or specific user. 

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

    {
    "id":"_actor member id_",
    "actor_id":"_id of the actor for this mapping_",
    "role_id":"_id of role, or -1 if the member type is not role_",
    "group_id":"_id of group, or -1 if the member type is not group_",
    "user_id":"_id of user, or -1 if the member type is not user_"
    }

### Methods

The methods used for this resource are:

* POST - Add a new actorMember
* GET - Search actorMembers
* DELETE - Remove an actorMember

### Add a new actorMember

Use the POST method to create a new actorMember.

Example 1: Add a member\_type = USER to the actor with id = 2\.
Method
POST

URL
`http://localhost:8080/bonita/API/bpm/actorMember`

Payload

    {
    "actor_id":"2",
    "member_type":"USER",
    "user_id":"101"
    }

Response

    {
    "id":"204",
    "actor_id":"2",
    "role_id":"-1",
    "group_id":"-1",
    "user_id":"101"
    }

Example 2: Add a member\_type = MEMBERSHIP to the actor with id = 2\.
Method
POST

URL
`http://localhost:8080/bonita/API/bpm/actorMember`

Payload

    {
    "actor_id":"2",
    "role_id":"4",
    "group_id":"8"
    }

Response

    {
    "id":"206",
    "actor_id":"2",
    "role_id":"4",
    "group_id":"8",
    "user_id":"-1"
    }

### Search actorMembers

Use a GET method with filters and search terms to search for actorMembers.

There is a mandatory filter on:

* actor\_id For example, retrieve the actorMembers related to the specified actor\_id. http://localhost:8080/bonita/API/bpm/actorMember?p=0&c=10&f=actor\_id%3d1

You can also filter also on: 

* member\_type=user|role|group|roleAndGroup retrieve only the actorMembers of type user. http://localhost:8080/bonita/API/bpm/actorMember?p=0&c=10&f=actor\_id%3d1&f=member\_type%3duser
* user\_id={user\_id}: retrieve only the actorMembers related to the specified user\_id. http://localhost:8080/bonita/API/bpm/actorMember?p=0&c=10&f=actor\_id%3d1&f=user\_id%3d101
* role\_id={role\_id}: retrieve only the actorMembers related to the specified role\_id. http://localhost:8080/bonita/API/bpm/actorMember?p=0&c=10&f=actor\_id%3d1&f=role\_id%3d101
* group\_id={group\_id}: retrieve only the actorMembers related to the specified group\_id. http://localhost:8080/bonita/API/bpm/actorMember?p=0&c=10&f=actor\_id%3d1&f=group\_id%3d101

#### Description
Request url
/API/bpm/actorMemberEntry?p={page}&c={count}&o={orders}&f={filters}&d={deploy}

Request method

GET

Request payload

empty

Response

An array of actorMember objects

### Delete an actorMember

Use the DELETE method to delete an existing actorMember.

Example: Delete the actorMember with id = 206\.
Method
DELETE

URL
`http://localhost:8080/bonita/API/bpm/actorMember/206`

Payload
empty

Response
empty