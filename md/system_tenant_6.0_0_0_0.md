## tenant

### Description

Pause and resume tenant services in order to do maintenance on a tenant.

### Identifier

_unusedid_, the id is not used, the current tenant is always returned

### Representation

    {
    "paused":"_true if the tenant is paused, false otherwise_",
    "id":"_id of the tenant_"
    }

### Methods

The methods used for this resource are:

* GET - get the current tenant
* PUT - pause or resume the tenant

### Get the current tenant
Request url
http://../API/system/tenant/unusedid

Request method

GET

Request payload

empty

Response payload

The tenant id with its status in JSON

#### Example
Request url
GET|API/system/session/unusedid

Response payload

    {
    "paused":"false",
    "id":"1"
    }

### Pause or resume the current tenant
Request url
http://../API/system/tenant/unusedid

Request method

PUT

Request payload

    {
    "paused":"true"} OR {"paused":"false"
    }

Response payload

empty

#### Example
Request url
GET|API/system/session/unusedid

Request payload

    {
    "paused":"true"
    }