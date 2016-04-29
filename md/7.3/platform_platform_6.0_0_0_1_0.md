## platform

### Description

Handle the platform. This requires a platform session. Log in using the platformloginservice servlet.

### Identifier

_unusedid_, the id is not used because there is only one platform

### Representation

    {
    "createdBy":"_the user name of the platform administrator_",
    "created":"_the creation date_",
    "initialVersion":"_the version in which the platform was created_",
    "state":"_can be STARTED or STOPPED_",
    "previousVersion":"_the previous version the platform was in or empty if there is none_",
    "version":"_the current version of the platform_"
    }

### Methods

The methods used for this resource are:

* GET - get the current platform
* POST - create the platform
* PUT - start or stop the platform
* DELETE - destroy the platform

### Get the platform
Request url
http://../API/platform/platform/unusedid

Request method

GET

Request payload

empty

Response payload

The platform in JSON

#### Example
Request url
GET|API/platform/platform/unusedid

Response payload

    {
    "createdBy":"platformAdmin",
    "created":"2014-12-04 15:46:46.065",
    "initialVersion":"6.4.0",
    "state":"STARTED",
    "previousVersion":"",
    "version":"6.4.0"
    }

### Start or stop the platform

Start or stop the current node, that is, start or stop all services of the current JVM.
Request url
http://../API/platform/platform/unusedid

Request method

PUT

Request payload

    {
    "state":"<_start_ or _stop_>"
    }

Response payload

empty

#### Example

Stop the platform.
Request url
PUT|API/platform/platform/unusedid

Request payload

    {
    "state":"stop"
    }