## group

### Description

The group a user belongs to. Groups have a hierarchy (subgroups can be created inside a group).

### Identifier

The ID of the group (a long value).

### Representation

    {
    "id":"_group ID_", 
    "name":"_display name_", 
    "displayName":"_name_", 
    "parent_path":"_the path of the parent group of this group (empty if the group has no parent)_", 
    "path":"_the full path of the group (including its parent path)_", 
    "description":"_description_", 
    "creation_date":"_creation date (format: "2014-12-31 15:17:24.736")_", 
    "created_by_user_id":"_id of the user who created the group (-1 if the group was created by the tenant admin or by an organisation import)_", 
    "last_update_date":"_last update date (format: "2014-12-31 15:17:24.736")_", 
    "icon":"_icon path_"
    }

### Methods

The methods used for this resource are:

* POST - Create a group
* GET - Read a group or search for a group
* PUT - Update a group
* DELETE - Remove a group

### Create a group
Request url
http://../API/identity/group

Request method

POST

Request payload

A partial representation of a group in JSON with at least the mandatory "name" attribute

Response payload

The full JSON representation of the group that was created

#### Response codes

403 if a group with the same name and parent already exists

#### Example
Request url
/API/identity/group

Request method

POST

Request payload

    {
    "icon":"","name":"HR",
    "displayName":"Human Resources",
    "parent_group_id":"1",
    "description":"Human resources department"
    }

Response payload

    {
    "id":"14",
    "creation_date":"2014-12-02 16:19:28.925",
    "created_by_user_id":"4",
    "icon":"","parent_path":"/acme"
    ,"description":"Human resources department",
    "name":"HR",
    "path":"/acme/HR",
    "displayName":"Human Resources",
    "last_update_date":"2014-12-02 16:19:28.925"
    }

### Read a group
Request url
http://../API/identity/group/<group\_id\>

Request method

GET

Request payload

empty

Response payload

A group in JSON

#### Response codes

404 if no group with this ID is found

#### Example
Request url
/API/identity/group/14

Request method

GET

Response payload

    {
    "id":"14",
    "creation_date":"2014-12-02 16:19:28.925",
    "created_by_user_id":"4",
    "icon":"","parent_path":"/acme",
    "description":"Human resources department",
    "name":"HR",
    "path":"/acme/HR",
    "displayName":"Human Resources",
    "last_update_date":"2014-12-02 16:19:28.925"
    }

### Search for a group
Request url
http://../API/identity/group

Request method

GET

Request payload

empty

Response payload

A list of groups in JSON

#### Parameters

It is possible to filter on the following attributes:

* name=<group\_name\>
* displayName=<group\_displayName\>
* parent\_path=<path\_of\_parent\_group\>

It is possible to order by the value of the following attributes:

* id (o=id ASC ou o=id DESC)
* name (o=name ASC ou o=name DESC)
* displayName (o=displayName ASC ou o=displayName DESC)

It is also possible to retrieve the parent group ID.

* d=parent\_group\_id

#### Example
Request url
/API/identity/group?p=0&c=100&f=parent\_path%3d/acme&d=parent\_group\_id&o=name%20ASC

Request method

GET

Response payload

    [
    {
    "id":"3",
    "creation_date":"2014-12-02 11:33:48.501",
    "created_by_user_id":"-1",
    "icon":"",
    "parent_path":"/acme",
    "description":"This group represents the finance department of the ACME organization",
    "name":"finance",
    "path":"/acme/finance",
    "parent_group_id":"1",
    "displayName":"Finance",
    "last_update_date":"2014-12-02 11:33:48.501"
    },
    {
    "id":"14",
    "creation_date":"2014-12-02 16:19:28.925",
    "created_by_user_id":"4",
    "icon":"",
    "parent_path":"/acme",
    "description":"Human resources department",
    "name":"HR",
    "path":"/acme/HR",
    "parent_group_id":"1",
    "displayName":"Human Resources",
    "last_update_date":"2014-12-02 16:19:28.925"
    }
    ]

### Update a group
Request url
http://../API/identity/group/<group\_id\>

Request method

PUT

Request payload

A partial representation of a group in JSON with at least the mandatory "name" attribute

Response payload

The full JSON representation of the group that was updated

#### Response codes

403 if another group with the same name and parent already exists  
404 if no group with this ID is found

#### Example
Request url
/API/identity/group/14

Request method

PUT

Request payload

    {
    "name":"HR",
    "displayName":"Humman resources"
    }

Response payload

    {
    "id":"14",
    "creation_date":"2014-12-02 16:19:28.925",
    "created_by_user_id":"4",
    "icon":"",
    "parent_path":"/acme",
    "description":"Human resources department",
    "name":"HR",
    "path":"/acme/HR",
    "displayName":"Human resources",
    "last_update_date":"2014-12-03 17:18:27.542"
    }

### Delete a group
Request url
http://../API/identity/group/<group\_id\>

Request method

DELETE

Request payload

empty

Response payload

empty

#### Response codes

404 if no group with this ID is found

#### Example
Request url
/API/identity/group/14

Request method

DELETE