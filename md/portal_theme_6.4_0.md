## theme

### Description

Use the theme resource for managing the portal and mobile app theme (look & feel).

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

None

### Methods

The methods used for this resource are:

* POST - Change the theme
* PUT - Restore the default theme

### Change a theme

Use the method POST for applying a new theme. Two types are permitted: portal and mobile.

Example 1: Change the portal theme by applying the definition in an already uploaded zip file.
Method
POST

URL
`http://localhost:8080/bonita/API/portal/theme`

Payload

    {
    "type":"portal",
    "zipFilePathportal":"tmp_1939634566964075173.zip"
    }

Response
empty

Example 2: Change the mobile app theme by applying the definition in an already uploaded zip file.
Method
POST

URL
`http://localhost:8080/bonita/API/portal/theme`

Payload

    {
    "type":"mobile",
    "zipFilePathmobile":"tmp_5691887787551776477.zip"
    }

Response
empty

### Restore a default theme

Use the method PUT method for restoring the default theme. Two types are permitted: portal and mobile

Example 1: Restore the default portal theme.
Method
PUT

URL
`http://localhost:8080/bonita/API/portal/theme/unusedId`

Payload

    {
    "type":"portal"
    }

Response
empty

Example 2: Restore the default mobile theme.
Method
PUT

URL
`http://localhost:8080/bonita/API/portal/theme/unusedId`

Payload

    {
    "type":"mobile"
    }

Response
empty