## tenant

### Description

Handle the tenants (Performance edition only). This requires a platform session. Log in using the platformloginservice servlet.

### Identifier

The id of the tenant

### Representation

    {
    "id":"_id of the tenant_",
    "creation":"_the creation date_",
    "icon":"_the path of the icon_",
    "description":"_the description_",
    "name":"_the name of the tenant_",
    "state":"_ACTIVATED or DEACTIVATED_"
    }

### Methods

The methods used for this resource are:

* GET - get or search tenants
* POST - create a tenant
* PUT - update the tenant and activate or deactivate it
* DELETE - delete a tenant

### Get a tenant
Request url
http://../API/platform/tenant/id

Request method

GET

Request payload

empty

Response payload

The platform in JSON

#### Example
Request url
GET|API/platform/tenant/1

Response payload

    {
    "id":"1",
    "creation":"2014-12-04 15:46:46.256",
    "icon":"/default.png",
    "username":"",
    "description":"Default tenant",
    "name":"default",
    "state":"ACTIVATED",
    "password":""
    }

### Create a tenant

Create a new tenant on the platform.
Request url
http://../API/platform/tenant

Request method

POST

Request payload

tenant parameters as JSON

Response payload

the created tenant as JSON

#### Example
Request url
POST|/API/platform/tenant

Request payload

    {
    "name":"MyTenant",
    "description":"My tenant",
    "username":"john",
    "password":"bpm"
    }

Response payload

    {
    "password":"",
    "name":"MyTenant",
    "icon":"/default.png",
    "description":"My tenant",
    "id":"102",
    "state":"DEACTIVATED",
    "creation":"2014-12-04 15:30:19.930",
    "username":""
    }

### Update a tenant

Attributes of the tenant can be changed, and it can be activated or deactivated at the same time.
Request url
http://../API/platform/tenant

Request method

PUT

Request payload

attributes to change as JSON

Response payload

the updated tenant as JSON

#### Example
Request url
PUT|/API/platform/tenant/102

Request payload

    {
    "description":"modified description for the tenant",
    "state":"DEACTIVATED"
    }

Response payload

    {
    "password":"",
    "name":"MyTenant",
    "icon":"/default.png",
    "description":"modified description for the tenant",
    "id":"102",
    "state":"DEACTIVATED",
    "creation":"2014-12-04 15:30:19.930",
    "username":""
    }

### Delete a tenant

A tenant can only be deleted if it is in DEACTIVATED state.
Request url
http://../API/platform/tenant/id

Request method

DELETE

Request payload

empty

Response payload

empty