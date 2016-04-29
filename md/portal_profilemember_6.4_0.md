## profileMember

### Description

A profileMember represents the association between the organization and profiles. In an organization we have three member\_types = USER, GROUP and ROLE. You can assign a profile to a user by specifying a role, group, or specific user. 

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

    {
    "id":"_profileMemberid_",
    "profile_id":"_id of the profile for this mapping_",
    "role_id":"_id of role, or -1 if the member type is not role_",
    "group_id":"_id of group, or -1 if the member type is not group_",
    "user_id":"_id of user, or -1 if the member type is not user_"
    }

### Methods

The methods used for this resource are:

* POST - Add a new profileMember
* GET - Search a profileMember
* DELETE - Remove a profileMember

### Add a new profileMember

Use the POST method to create a new profileMember.

Example 1: Add a member\_type = USER to the profile with id = 2\.
Method
POST

URL
`http://localhost:8080/bonita/API/portal/profileMember`

Payload

    {
    "profile_id":"2",
    "member_type":"USER",
    "user_id":"101"
    }

Response

    {
    "id":"204",
    "profile_id":"2",
    "role_id":"-1",
    "group_id":"-1",
    "user_id":"101"
    }

Example 2: Add a member\_type = GROUP to the profile with id = 2\.
Method
POST

URL
`http://localhost:8080/bonita/API/portal/profileMember`

Payload

    {
    "profile_id":"2",
    "member_type":"GROUP",
    "group_id":"8"
    }

Response

    {
    "id":"206",
    "profile_id":"2",
    "role_id":"-1",
    "group_id":"8",
    "user_id":"-1"
    }

### Search profileMembers

Use a GET method with filters and search terms to search for profileMembers.

There is a mandatory filter on:

* member\_type=. For example, retrieve the profileMembers of type user: http://localhost:8080/bonita/API/portal/profileMember?p=0&c=10&f=member\_type%3duser

You can also filter also on: 

* profile\_id={profile\_id}: retrieve only the profileMembers related to the specified profile\_id. http://localhost:8080/bonita/API/portal/profileMember?p=0&c=10&f=member\_type%3duser&f=profile\_id%3d1
* user\_id={user\_id}: retrieve only the profileMembers related to the specified user\_id. http://localhost:8080/bonita/API/portal/profileMember?p=0&c=10&f=member\_type%3duser&f=profile\_id%3d1&f=user\_id%3d101
* role\_id={role\_id}: retrieve only the profileMembers related to the specified role\_id. http://localhost:8080/bonita/API/portal/profileMember?p=0&c=10&f=member\_type%3drole&f=profile\_id%3d1&f=role\_id%3d101
* group\_id={group\_id}: retrieve only the profileMembers related to the specified group\_id. http://localhost:8080/bonita/API/portal/profileMember?p=0&c=10&f=member\_type%3dgroup&f=profile\_id%3d1&f=group\_id%3d101

#### Description
Request url
/API/portal/profileMemberEntry?p={page}&c={count}&o={orders}&f={filters}&d={deploy}

Request method

GET

Request payload

empty

Response

An array of profileMember objects

### Delete a profileMember

Use the DELETE method to delete an existing profileMember.

Example: Delete the profileMember with id = 206\.
Method
DELETE

URL
`http://localhost:8080/bonita/API/portal/profileMember/206`

Payload
empty

Response
empty