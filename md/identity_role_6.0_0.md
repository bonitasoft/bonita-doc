## role

### Description

The role of a user in a group

### Identifier

The ID of the role (a long value).

### Representation

    {
    "id":"_role ID_",
    "name":"_display name_",
    "displayName":"_name_",
    "description":"_description_",
    "creation_date":"_creation date (format: "2014-12-31 15:17:24.736")_",
    "created_by_user_id":"_Id of the user who created the role (-1 if the role was created by the tenant admin or by an organisation import)_",
    "last_update_date":"_last update date (format: "2014-12-31 15:17:24.736")_",
    "icon":"_icon path_"
    }

### Methods

The methods used for this resource are:

* POST - Create a role
* GET - Read a role or search for a role
* PUT - Update a role
* DELETE - Remove a role

### Create a role
Request url
http://../API/identity/role

Request method

POST

Request payload

A partial representation of a role in JSON with at least the mandatory "name" attribute

Response payload

The full JSON representation of the role that was created

#### Response codes

403 if a role with the same name already exists

#### Example
Request url
/API/identity/role

Request method

POST

Request payload

    {
    "icon":"",
    "name":"manager",
    "displayName":"department manager",
    "description":"manager of the department"
    }

Response payload

    {
    "creation_date":"2014-12-01 18:51:54.791",
    "created_by_user_id":"4",
    "id":"4",
    "icon":"",
    "description":"manager of the department",
    "name":"manager",
    "displayName":"department manager",
    "last_update_date":"2014-12-01 18:51:54.791"
    }

### Read a role
Request url
http://../API/identity/role/<role\_id\>

Request method

GET

Request payload
empty

Response payload

A role in JSON

#### Response codes

404 if no role with this ID is found

#### Example
Request url
/API/identity/role/1

Request method

GET

Response payload

    {
    "creation_date":"2014-12-01 15:17:24.736",
    "created_by_user_id":"-1",
    "id":"1",
    "icon":"",
    "description":"",
    "name":"member",
    "displayName":"Member",
    "last_update_date":"2014-12-01 15:17:24.736"
    }

### Search for a role
Request url
http://../API/identity/role

Request method

GET

Request payload
empty

Response payload

A list of roles in JSON

#### Parameters

It is possible to filter on the following attributes

* name=<role\_name\>
* displayName=<role\_displayName\>

It is possible to order by the value of the following attributes

* id (o=id ASC ou o=id DESC)
* name (o=name ASC ou o=name DESC)
* displayName (o=displayName ASC ou o=displayName DESC)

#### Example
Request url
/API/identity/role?p=0&c=100&o=displayName ASC

Request method

GET

Response payload

    [
    {
    "creation_date":"2014-12-01 18:51:54.791",
    "created_by_user_id":"4",
    "id":"4",
    "icon":"",
    "description":"manager of the department",
    "name":"manager",
    "displayName":"department manager",
    "last_update_date":"2014-12-01 18:51:54.791"
    },
    {
    "creation_date":"2014-12-01 15:17:24.736",
    "created_by_user_id":"-1",
    "id":"1",
    "icon":"",
    "description":"",
    "name":"member",
    "displayName":"Member",
    "last_update_date":"2014-12-01 15:17:24.736"
    }
    ]

### Update a role
Request url
http://../API/identity/role/<role\_id\>

Request method

PUT

Request payload

A partial representation of a role in JSON with at least the mandatory "name" attribute

Response payload

The full JSON representation of the role that was updated

#### Response codes

403 if a role with the same name already exists  
404 if no role with this ID is found

#### Example
Request url
/API/identity/role/4

Request method

PUT

Request payload

    {
    "name":"Manager",
    "displayName":"Department manager"
    }

Response payload

    {
    "creation_date":"2014-12-01 18:51:54.791",
    "created_by_user_id":"4",
    "id":"4",
    "icon":"",
    "description":"manager of the department",
    "name":"Manager",
    "displayName":"Department manager",
    "last_update_date":"2014-12-01 18:59:59.361"
    }

### Delete a role
Request url
http://../API/identity/role/<role\_id\>

Request method

DELETE

Request payload
empty

Response payload
empty

#### Response codes

404 if no role with this ID is found

#### Example
Request url
/API/identity/role/4

Request method

DELETE