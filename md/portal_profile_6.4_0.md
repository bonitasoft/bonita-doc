## profile

### Description

Use the profile resource to access profiles.

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

    {
    "id":"_profile id_",
    "creationDate":"_date and time of profile creation_",
    "icon":"_icon used in the portal to represent the profile_",
    "createdBy":"_id of the uer who created the profile_",
    "description":"_a description of the profile_",
    "name":"_profile name_",
    "is_default":"_true | false _",
    "lastUpdateDate":"_date and time of the last update to the profile_",
    "updatedBy":"_the id of the user who last updated the profile_"
    }

### Methods

The methods used for this resource are:

* POST - Add a new profile
* GET - Read or search a profile
* PUT - Update a profile
* DELETE - Remove a profile

### Retrieve a Profile

Use a GET method to retrieve information about a profile.

Example: Get the information about the profile with id=1\.
Method
GET

URL
`http://localhost:8080/bonita/API/portal/profile/1`

Payload
empty

Response

    {
    "id":"1",
    "creationDate":"2014-12-02 15:54:44.395",
    "icon":"/profiles/profileUser.png",
    "createdBy":"-1",
    "description":"The user can view and perform tasks and can start a new case of a process.",
    "name":"User",
    "is_default":"true",
    "lastUpdateDate":"2014-12-04 11:05:14.490",
    "updatedBy":"1"
    }

### Add a new profile

Use the POST method to create a new profile.
Method
POST

URL
`http://localhost:8080/bonita/API/portal/profile`

Payload

    {
    "name":"MyCustomProfile","description":"This is my custom profile"
    }

Response

    {
    "id":"101",
    "creationDate":"2014-12-04 16:29:23.434",
    "icon":"/profiles/profileDefault.png",
    "createdBy":"1",
    "description":"This is my custom profile",
    "name":"MyCustomProfile",
    "is_default":"false",
    "lastUpdateDate":"2014-12-04 16:29:23.434",
    "updatedBy":"1"
    }

### Update a profile

Use the PUT method to update an existing profile.

Example: Update a profile with id = 101
Method
PUT

URL
`http://localhost:8080/bonita/API/portal/profile/101>`

Payload

    {
    "id":"101","name":"MyUpdatedCustomProfile","description":"This is my updated custom profile"
    }

Response
empty

### Search profiles

Use a GET method with filters and search terms to search for profiles.

You can filter on:

* name={exact\_profile\_name}: retrieve only the profiles with the specified name. For example, retrieve the profile with name = Administrator: http://localhost:8080/bonita/API/portal/profile?p=0&c=10&f=name%3dAdministrator

You can search on:

* name: search all profiles which name starts with the search string. For example, name starting with Adm: http://localhost:8080/bonita/API/portal/profile?p=0&c=10&s=Adm

#### Description
Request url
/API/portal/profile?p={page}&c={count}&o={orders}&f={filters}&s={search}&d={deploy}

Request method

GET

Request payload

empty

Response

An array of profile objects

### Delete a profile

Use the DELETE method to delete an existing profile

Example: Delete a profile with id = 101
Method
DELETE

URL
`http://localhost:8080/bonita/API/portal/profile/101`

Payload
empty

Response
empty