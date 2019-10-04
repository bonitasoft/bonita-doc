# Application API

Bonita application API allows you to retrieve the current deployed application definitions

## Living application

#### Description

Manage applications. This enables you to build a consistent functional applicative environment for users to interact with business processes and business data from one place.

#### Identifier

The ID of the application (a long value).

#### Representation
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

#### Methods

The methods used for this resource are:

* POST - Create an application
* GET - Get the application information
* PUT - Update an application
* DELETE - Remove an application

#### Create an application

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

#### Get an application

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
#### Delete an application

* **URL**  
  `/API/living/application/:applicationId`
* **Method:**  
  `DELETE`
* **Success Response**
  * **Code:** 200

#### Update an Application

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
* **Request Payload**  
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

#### Search for an application

* **URL**  
  `/API/living/application`
  _Example_: /API/living/application?f=token%3dmyapp&d=createdBy
* **Method**  
  `GET`
* **URL Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available to search form mappings.  
  **Required**
  * c: number of result per page to retrieve
  * p: page number to retrieve

  **Optional**:
  * o: can order on "id","creationDate", "createdBy", "profileId", "token", "displayName", "updatedBy", "lastUpdateDate", "version" 
  * s: can search on "token", "displayName", "version" 
  * f: can filter on "token", "displayName", "version", "profileId", "creationDate", "createdBy", "updatedBy" , "lastUpdateDate" with the format `f={filter\_name}={filter\_value}`
  * d: can directly access the details by of the "createdBy" or "updatedBy" user, or of the "profileId"

* **Success Response**
  * **Code**: 200 
  * **Payload**:
    A JSON array of application
    ```json
    [{
      "id":"305",
      "creationDate":"1411548289900",
      "iconPath":"",
      "createdBy": {
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
    }]
    ```
## Application Theme

#### Description

This API is available in Subscription editions only

Manage applications theme. This enables you to modify your application theme.

#### Identifier

The ID of the application (a long value).

#### Representation

```json
{
  "themeId":"id of theme resource"
}
```   

#### Methods

The methods used for this resource are:

* PUT - Update an application theme

#### Update an application theme

* **URL**  
  `/API/living/application/:applicationId`  
* **Method**  
  `PUT`
* **Request Payload**  
  A partial representation of an theme resource in JSON  
  _Example_:
  ```json
  {"themeId":"2"}
  ```
* **Success Response**
  * **Code**: 200

## Application Menu

#### Description

Manage the set of menus in an application. This set of menus enables a user to navigate to the application pages.

There are two types of menu item: 

* A top-level item appears in the navigation bar of the application. A top-level item can be clickable, leading to a page, or can be a parent for a menu of clickable items.
* A child menu item becomes visible in a menu when the parent is selected. A child menu item is clickable and leads to a page.

Each menu item has an index that defines the position in the menu. For a top-level menu item, this is the position in the the navigation bar counting from the left. For a child menu item, this is the position in the menu counting from the top.

#### Identifier

The ID of the application menu item (a long value).

#### Representation

```json
{
  "id":"_id of the application menu item_",
  "parentMenuId":"_id of the parent menu of this menu item, or -1 for a top-level item_",
  "applicationPageId":"_id of the application page targeted by this menu item, or -1 if there is no targeted page (that is, the item is a parent menu)_",
  "applicationId":"_id of the application related to this menu item_",
  "menuIndex":"_index of the menu item_",
  "displayName":"_label to display for this menu in the application navigation bar or menu_"
}
```

#### Methods

The methods used for this resource are:

* POST - Create a menu item
* GET - Read a menu item or search for a menu item
* PUT - Update a menu item
* DELETE - Remove a menu item

#### Create an application menu item

* **URL**  
  `http://../API/living/application-menu`
* **Method**  
  POST
* **Request Payload**  
  A partial representation of an application menu in JSON
  ```json
  {
    "displayName":"menuLabel",
    "applicationId":1,
    "applicationPageId":5,
    "menuIndex":1,
    "parentMenuId":"-1"
  }
  ```
* **Success Response**
  * **Code**: 200  
  * **Payload**:  
  The full JSON representation of the created application menu item
  ```json
  {
    "id":"1",
    "displayName":"menuLabel",
    "applicationId":"1",
    "applicationPageId":"5",
    "menuIndex":"1",
    "parentMenuId":"-1"
  }
  ```

#### Get an application menu item

* **URL**  
  `http://../API/living/application-menu/:applicationMenuId`  
  _Example_: `http://../API/living/application-menu/1`
* **Method**  
  `GET`
* **Success Response**
  * **Code**: 200
  * **Payload**:
    The full JSON representation of the application menu with id="applicationMenuId"
    ```json
    {
      "id":"1",
      "displayName":"menuLabel",
      "applicationId":"1",
      "applicationPageId":"5",
      "menuIndex":"1",
      "parentMenuId":"-1"
    }
    ```

#### Delete an application menu item

* **URL**  
  `http://../API/living/application-menu/:applicationMenuId`
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200

#### Update an application menu item

* **URL**  
  `http://../API/living/application-menu/:applicationMenuId`  
  _Example_: `http://../API/living/application-menu/1`
* **Method**  
  `PUT`
* **Request Payload**  
  A partial representation of an application menu with parameters to update.  
  _Available parameters to update_: 
  * displayName
  * applicationPageId
  * menuIndex
  * parentMenuId
  ```json
  {
    "displayName":"updatedMenuLabel",
    "applicationPageId":"6",
    "menuIndex":"2"
  }
  ```
* **Success Response**  
  * **Code**: 200

#### Search the application menu items

* **URL**  
  `http://../API/living/application-menu`  
  _Example_: `http://../API/living/application-menu?p=0&c=2&f=applicationId%3d1`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available to search form mappings.
  * c: number of result per page
  * p: page number
  * o: can order on "id", "displayName", "applicationId", "applicationPageId", "index", "parentId"
  * s: search on "displayName" 
  * f: can filter on "id", "displayName", "applicationId", "applicationPageId", "index", "parentId" with the format `f={filter\_name}={filter\_value}`
  * d: can deploy on "applicationPageId"
* **Success Response**  
  A JSON array of application menu
  * **Code**: 200
  * **Payload**:  
    ```json
    [{
      "id":"1",
      "parentMenuId":"-1",
      "applicationPageId":"5",
      "applicationId":"1",
      "menuIndex":"1",
      "displayName":"menu1"
    }, {
      "id":"2",
      "parentMenuId":"-1",
      "applicationPageId":"1",
      "applicationId":"1",
      "menuIndex":"2",
      "displayName":"menu2"
    }]
    ```

## Application Page

#### Description

An application page is a custom page that has been associated with an application. Use this resource to manage application pages and define the paths used to access them. This list of pages will be used to build the application menus.

#### Identifier

The ID of the application page (a long value).

#### Representation

```json
{
  "id":"_id of the application page_",
  "token":"_token use to access the page using a URL : ../appName/pageToken/_",
  "applicationId":"_id of the application related to this page_",
  "pageId":"_id of the custom page to display_"
}
```
#### Methods

The methods used for this resource are:

* POST - Create an application page
* GET - Read an application page or search for an application page
* DELETE - Remove an application page

#### Create an application page

* **URL**  
  `http://../API/living/application-page`  
* **Method**  
  `POST`
* **Request Payload**  
  A partial representation of an application page in JSON
  ```json
  {
    "pageId":"2",
    "token":"myPage",
    "applicationId":"1"
  }
  ```
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
  The full JSON representation of the application page that was created
    ```json
    {
      "id":"3",
      "token":"myPage",
      "pageId":"2",
      "applicationId":"1"
    }
    ```

#### Get an application page

* **URL**  
  `http://../API/living/application-page/:applicationPageId`  
* **Method**  
  `GET`
* **Request Payload**  
  The full JSON representation of the application page that was created with id="applicationPageId"
  ```json
  {
    "id":"3",
    "token":"myPage",
    "pageId":"2",
    "applicationId":"1"
  }
  ```
* **Success Response**  
  * **Code**: 200

#### Delete an application page

* **URL**  
  `http://../API/living/application-page/{applicationPageId}`  
* **Method**  
  `DELETE`

#### Search for an application page

* **URL**  
  `http://../API/living/application-page`  
  _Example_: `http://../API/living/application-page?p=0&c=2&d=pageId&f=applicationId%3d1`
* **Method**  
  `GET`
* **Data Params**  
  * o: can order on "id", "token", "applicationId", "pageId"
  * s: search on "token" 
  * f: can filter on "id", "token", "applicationId", "pageId" with the format `f={filter\_name}={filter\_value}`
  * d: can deploy the "applicationId", "pageId"
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    A JSON array of application page  
    ```json
    [{
      "id":"5",
      "token":"groovyPage",
      "pageId": {
        "id":"2",
        "creationDate":"2014-11-18 14:38:56.700",
        "createdBy":"",
        "isProvided":"true",
        "description":"Groovy class example of custom page source structure (in English).",
        "contentName":"bonita-groovy-page-example.zip",
        "displayName":"Groovy example page",
        "updatedBy":"-1",
        "lastUpdateDate":"2014-11-18 14:38:56.700",
        "urlToken":"custompage_groovyexample"
      },
      "applicationId":"1"
    }, {
      "id":"1",
      "token":"home",
      "pageId": {
        "id":"3",
        "creationDate":"2014-11-18 14:38:56.717",
        "createdBy":"",
        "isProvided":"true",
        "description":"This is a home page dedicated to new born living applications",
        "contentName":"bonita-home-page.zip",
        "displayName":"Application home page",
        "updatedBy":"-1",
        "lastUpdateDate":"2014-11-18 14:38:56.717",
        "urlToken":"custompage_home"
      },
      "applicationId":"1"
    }]
    ```

