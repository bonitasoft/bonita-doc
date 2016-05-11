## membership

### Description

Manage membership of users. There is a membership when a user belongs to a group and a role. Use this resource to add, search, and delete memberships.

### Identifier

A compound identifier constructed from user\_id/group\_id/role\_id where each id is a long value.

### Representation

    {
    "assigned_date":"_creation date (format: "2014-12-31 15:17:24.736")_",
    "role_id":"_id of the role of this membership_",
    "assigned_by_user_id":"_id of the user who created the membership (-1 if the role was created by the tenant admin or by an organisation import)_",
    "group_id":"_id of the group of this membership_",
    "user_id":"_id of the user in this membership_"
    }

### Methods

The methods used for this resource are:

* POST - Create a membership
* GET - Search for memberships of a user
* DELETE - Remove a membership
* DELETE - Remove a membership

### Create a membership

This action creates (assigns) a membership to a user.
Request url
http://../API/identity/membership

Request method

POST

Request payload

A partial representation of a membership object with the mandatory "user\_id", "group\_id" and "role\_id" attributes

Response payload

The full JSON representation of the membership that was created

#### Response codes

403 if a membership already exists

#### Example
Request url
POST|/API/identity/membership

Request payload

    {
    "user_id":"4",
    "group_id":"5",
    "role_id":"1"
    }

Response payload

    {
    "assigned_date":"2014-12-02 17:57:09.315",
    "role_id":"1",
    "assigned_by_user_id":"-1",
    "group_id":"5",
    "user_id":"4"
    }

### Search memberships of a user

This action search memberships of a user.
Request url
http://../API/identity/membership?p=0&c=10&f=user\_id%3d<the id of the user\>

Request method

POST

Request payload

empty

Response payload

The full JSON representation of the memberships of the user

#### Parameters

The following filter is mandatory:

* user\_id=<id of the user\>

It is possible to use the deploy option to retrieve the value of elements specified by an attribute value. For example, if you specify `d=group_id`, the result will contain the group details in place of the group id.

* group (d=group\_id)
* role (d=role\_id)
* user (d=user\_id)
* user that created the membership (d=assigned\_by\_user\_id)

It is possible to order by the value of the following attributes:

* role name (o=ROLE\_NAME\_ASC or o=ROLE\_NAME\_DESC)
* group name (o=GROUP\_NAME\_ASC ASC ru o=GROUP\_NAME\_DESC)
* assigned date (o=ASSIGNED\_DATE\_ASC or o=ASSIGNED\_DATE\_DESC)

#### Example

Get the memberships for the user with id 125, and return the role details associated with each membership.
Request url
GET|/API/identity/membership?p=0&c=10&f=user\_id%3d125&d=role\_id

Response payload

    [{
    	"assigned_date":"2014-12-02 17:57:09.315",
    	"role_id":
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
    	"assigned_by_user_id":"12",
    	"group_id":"5",
    	"user_id":"125"
    }]

### Delete a membership

Delete a membership of a user using the group id and role id.
Request url
http://../API/identity/membership/<the id of the user\>/<the id of the group\>/<the id of the role\>

Request method

DELETE

Request payload

empty

Response payload

empty