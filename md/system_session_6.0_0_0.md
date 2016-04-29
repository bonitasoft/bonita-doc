## session

### Description

Get the current session.

### Identifier

_unusedid_, the id is not used, the current session is always returned

### Representation

    {
    "user_id":"_id of the user_",
    "user_name":"_name of the user_",
    "session_id":"_id of the session_",
    "conf":"_session configuration_",
    "is_technical_user":"_true if the user is the technical user, false otherwise_",
    "version":"_product version_"
    }

### Methods

The methods used for this resource are:

* GET - get the current session

### Get the current session
Request url
http://../API/system/session/unusedid

Request method

GET

Request payload

empty

Response payload

The session in JSON

#### Example
Request url
GET|API/system/session/unusedid

Response payload

    {
    "user_id":"12",
    "user_name":"william.jobs",
    "session_id":"2885803778329414975",
    "conf":"[\"D7A27EA0483FBAF903BD61BD16D70EF610DBE6D4\"]",
    "is_technical_user":"false",
    "version":"6.4.0"
    }