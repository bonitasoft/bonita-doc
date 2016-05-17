# Application Layout API

### Description

This API is available in Subscription editions only

Manage applications layout. This enables you to modify your application layout.

### Identifier

The ID of the application (a long value).

### Representation

    {
    "layoutId":"id of layout resource"
    }
    

### Methods

The methods used for this resource are:

* PUT - Update an application layout

### Update an application layout
Request url
http://../API/living/application/{applicationId}

Request method

PUT

Request payload

A partial representation of an layout resource in JSON

Response payload

empty

#### Example
Request url
http://../API/living/application/305

Request method

PUT

Request payload

    {"layoutId":"2"}

Response payload
empty
