## application-theme

### Description

This API is available in Subscription editions only

Manage applications theme. This enables you to modify your application theme.

### Identifier

The ID of the application (a long value).

### Representation

    {
    "themeId":"id of theme resource"
    }
    

### Methods

The methods used for this resource are:

* PUT - Update an application theme

### Update an application theme
Request url
http://../API/living/application/{applicationId}

Request method

PUT

Request payload

A partial representation of an theme resource in JSON

Response payload

empty

#### Example
Request url
http://../API/living/application/305

Request method

PUT

Request payload
`{"themeId":"2"}`

Response payload
empty