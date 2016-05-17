# application API

* [application-layout](application-layout_0.md)
* [application-theme](application-theme_0.md)
* [application-menu](living_application-menu_6.4_2_0_1_0.md)
* [application-page](living_application-page_6.4_1_0_0.md)

## Application

## Living application

### Description

Manage applications. This enables you to build to build a consistent functional applicative environment for users to interact with business processes and business data from one place.

### Identifier

The ID of the application (a long value).

### Representation
```json
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
```

### Methods

The methods used for this resource are:

* POST - Create an application
* GET - Get the application information
* PUT - Update an application
* DELETE - Remove an application

### Create an application

* **URL:**  
  `/API/living/application`  
* **Method**  
  `POST`  
* **Data params**:  
  A partial representation of an application in JSON  
    ```json
    {
      "version":"1.0",
      "profileId":"2",
      "token":"myapp",
      "displayName":"My app",
      "description":"My application description"
    }
    ```
* **Success Response**  
  * **Code:** 200  
  * **Payload**:  
  The full JSON representation of the application that was created
    ```json
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
    ```

### Get an application

* **URL:**  
  `/API/living/application/:applicationId`
* **Method:**  
  GET
* **Success Response**
  * **Code**: 200
  * **Payload** 
  The full JSON representation of the application that was created with id="applicationId"
    ```json
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
    ```
### Delete an application

* **URL**  
  `/API/living/application/:applicationId`
* **Method:**  
  `DELETE`
* **Success Response**
  * **Code:** 200

### Update an Application

You can update the following parameters:

* token
* displayName
* version
* profileId
* description

* **URL**  
  `/API/living/application/:applicationId`
* **Method**  
  `PUT`
* **Data Params**  
  A partial representation of an application with parameters to update
  ```json
  {
    "version":"2.0",
    "profileId":"3",
    "token":"myappToUpDate",
    "displayName":"My app To Up Date",
    "description":"My application description To Up Date"
  }
  ```
* **Success Response**
  * **Code**: 200

### Search for an application

* **URL**  
  `/API/living/application?p={page}&c={count}&o={order}&s={query}&f={filter\_name}={filter\_value}&d={field\_to\_deploy}`
  **Example**: /API/living/application?f=token%3dmyapp&d=createdBy
* **Method**  
  `GET`
* **URL Params**  
  **Required**
  * c: number of result per page to retrieve
  * p: page number to retrieve

  **Optional**:
  * o: can order on "id","creationDate", "createdBy", "profileId", "token", "displayName", "updatedBy", "lastUpdateDate", "version" 
  * s: can search on "token", "displayName", "version" 
  * f: can filter on "token", "displayName", "version", "profileId", "creationDate", "createdBy", "updatedBy" , "lastUpdateDate"
  * d: can directly access the details by of the "createdBy" or "updatedBy" user, or of the "profileId"

* **Success Response**
  * **Code**: 
  * **Payload**:


Response payload

A JSON array of application

#### Parameters

#### Example
Request url

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
