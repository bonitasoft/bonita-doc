## application

### Description

Manage applications. This enables you to build to build a consistent functional applicative environment for users to interact with business processes and business data from one place.

### Identifier

The ID of the application (a long value).

### Representation

    {
    "id":"id of the application",
    "token":"token of the application used to build the application URL",
    "displayName":"display name of the application",
    "version":"version of the application",
    "description":"description of the application",
    "profileId":"profile authorized to access this application",
    "creationDate":"creation date of the application",
    "createdBy":"user that created the application",
    "updatedBy":"user that that updated the application",
    "lastUpdateDate":"last update date of the application"},
    "homePageId":"id of the application page used as the home page"
    }
    

### Methods

The methods used for this resource are:

* POST - Create an application
* GET - Get the application information
* PUT - Update an application
* DELETE - Remove an application

### Create an application
Request url
http://../API/living/application

Request method

POST

Request payload

A partial representation of an application in JSON

Response payload

The full JSON representation of the application that was created

#### Example
Request url
http://../API/living/application

Request method

POST

Request payload

    {
    "version":"1.0",
    "profileId":"2",
    "token":"myapp",
    "displayName":"My app",
    "description":"My application description"
    }

Response payload

    {
    "id":"305",
    "creationDate":"1411548289900",
    "iconPath":"",
    "createdBy":"1",
    "profileId":"2",
    "description":"My application description",
    "token":"myapp",
    "state":"DEACTIVATED",
    "displayName":"My app",
    "updatedBy":"1",
    "lastUpdateDate":"1411548289900",
    "version":"1.0",
    "homePageId":"-1"
    }

### Get an application
Request url
http://../API/living/application/{applicationId}

Request method

GET

Request payload

empty

Response payload

The full JSON representation of the application that was created with id="applicationId"

#### Example
Request url
http://../API/living/application/305

Request method

GET

Response payload

    {
    "id":"305",
    "creationDate":"1411548289900",
    "iconPath":"",
    "createdBy":"1",
    "profileId":"2",
    "description":"My application description",
    "token":"myapp",
    "state":"DEACTIVATED",
    "displayName":"My app",
    "updatedBy":"1",
    "lastUpdateDate":"1411548289900",
    "version":"1.0",
    "homePageId":"-1"
    }

### Delete an application
Request url
http://../API/living/application/{applicationId}

Request method

DELETE

Request payload

empty

Response payload

empty

#### Example
Request url
http://../API/living/application/305

Request method

DELETE

### Update an Application

You can update the following parameters:

* token
* displayName
* version
* profileId
* description
Request url
http://../API/living/application/{applicationId}

Request method

PUT

Request payload

A partial representation of an application with parameters to update

Response payload

empty

#### Example
Request url
http://../API/living/application/305

Request method

PUT

Request payload

    {
    "version":"2.0",
    "profileId":"3",
    "token":"myappToUpDate",
    "displayName":"My app To Up Date",
    "description":"My application description To Up Date"
    }

### Search for an application
Request url
http://../API/living/application?p={page}&c={count}&o={order}&s={query}&f={filter\_name}={filter\_value}&d={field\_to\_deploy}

Request method

GET

Request payload

empty

Response payload

A JSON array of application

#### Parameters

* o: can order on "id","creationDate", "createdBy", "profileId", "token", "displayName", "updatedBy", "lastUpdateDate", "version" 
* s: can search on "token", "displayName", "version" 
* f: can filter on "token", "displayName", "version":"1.0", "profileId", "creationDate", "createdBy", "updatedBy" , "lastUpdateDate"
* d: can directly access the details by of the "createdBy" or "updatedBy" user, or of the "profileId"

#### Example
Request url
http://../API/living/application?f=token%3dmyapp&d=createdBy

Request method

GET

Response payload

    [
    {"id":"305",
    "creationDate":"1411548289900",
    "iconPath":"",
    "createdBy":
    	{
    	"last_connection":"2014-09-24 14:57:26.146",
    	"created_by_user_id":"-1",
    	"creation_date":"2014-09-15 17:25:22.678",
    	"id":"1",
    	"icon":"/default/icon_user.png",
    	"enabled":"true",
    	"title":"",
    	"manager_id":"0",
    	"job_title":"",
    	"userName":"user1",
    	"lastname":"user1",
    	"firstname":"user1",
    	"password":"",
    	"last_update_date":"2014-09-15 17:25:22.678"
    	},
    "profileId":"2",
    "description":"My application description",
    "token":"myapp",
    "state":"DEACTIVATED",
    "displayName":"My app",
    "updatedBy":"1",
    "lastUpdateDate":"1411548289900",
    "version":"1.0",
    "homePageId":"-1"
    }
    ]