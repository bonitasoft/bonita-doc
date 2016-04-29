## application-menu

### Description

Manage the set of menus in an application. This set of menus enables a user to navigate to the application pages.

There are two types of menu item: 

* A top-level item appears in the navigation bar of the application. A top-level item can be clickable, leading to a page, or can be a parent for a menu of clickable items.
* A child menu item becomes visible in a menu when the parent is selected. A child menu item is clickable and leads to a page.

Each menu item has an index that defines the position in the menu. For a top-level menu item, this is the position in the the navigation bar counting from the left. For a child menu item, this is the position in the menu counting from the top.

### Identifier

The ID of the application menu item (a long value).

### Representation

    {
    "id":"_id of the application menu item_",
    "parentMenuId":"_id of the parent menu of this menu item, or -1 for a top-level item_",
    "applicationPageId":"_id of the application page targeted by this menu item, or -1 if there is no targeted page (that is, the item is a parent menu)_",
    "applicationId":"_id of the application related to this menu item_",
    "menuIndex":"_index of the menu item_",
    "displayName":"_label to display for this menu in the application navigation bar or menu_"
    }

### Methods

The methods used for this resource are:

* POST - Create a menu item
* GET - Read a menu item or search for a menu item
* PUT - Update a menu item
* DELETE - Remove a menu item

### Create an application menu item
Request url
http://../API/living/application-menu

Request method

POST

Request payload

A partial representation of an application menu in JSON

Response payload

The full JSON representation of the created application menu item

#### Example
Request url
http://../API/living/application-menu

Request method

POST

Request payload

    {
    "displayName":"menuLabel",
    "applicationId":1,
    "applicationPageId":5,
    "menuIndex":1,
    "parentMenuId":"-1"
    }

Response payload

    {
    "id":"1",
    "displayName":"menuLabel",
    "applicationId":"1",
    "applicationPageId":"5",
    "menuIndex":"1",
    "parentMenuId":"-1"
    }

### Get an application menu item
Request url
http://../API/living/application-menu/{applicationMenuId}

Request method

GET

Request payload

empty

Response payload

The full JSON representation of the application menu with id="applicationMenuId"

#### Example
Request url
http://../API/living/application-menu/1

Request method

GET

Response payload

    {
    "id":"1",
    "displayName":"menuLabel",
    "applicationId":"1",
    "applicationPageId":"5",
    "menuIndex":"1",
    "parentMenuId":"-1"
    }

### Delete an application menu item
Request url
http://../API/living/application-menu/{applicationMenuId}

Request method

DELETE

Request payload

empty

Response payload

empty

#### Example
Request url
|/API/living/application-menu/1

Request method

DELETE

### Update an application menu item
Request url
http://../API/living/application-menu/{applicationMenuId}

Request method

PUT

Request payload

A partial representation of an application menu with parameters to update

Response payload

empty

#### Parameters to update

* displayName
* applicationPageId
* menuIndex
* parentMenuId

#### Example
Request url
http://../API/living/application-menu/1

Request method

PUT

Request payload

    {
    "displayName":"updatedMenuLabel",
    "applicationPageId":"6",
    "menuIndex":"2"
    }

Response payload
empty

### Search the application menu items
Request url
http://../API/living/application-menu?p={page}&c={count}&o={order}&s={query}&f={filter\_name}={filter\_value}&d={field\_to\_deploy}

Request method

GET

Request payload

empty

Response payload

A JSON array of application menu

#### Parameters

* o: can order on "id", "displayName", "applicationId", "applicationPageId", "index", "parentId"
* s: search on "displayName" 
* f: can filter on "id", "displayName", "applicationId", "applicationPageId", "index", "parentId"
* d: can deploy on "applicationPageId"

#### Example
Request url
http://../API/living/application-menu?p=0&c=2&f=applicationId%3d1

Request method

GET

Response payload

    [
    {
    	"id":"1",
    	"parentMenuId":"-1",
    	"applicationPageId":"5",
    	"applicationId":"1",
    	"menuIndex":"1",
    	"displayName":"menu1"
    },
    {
    	"id":"2",
    	"parentMenuId":"-1",
    	"applicationPageId":"1",
    	"applicationId":"1",
    	"menuIndex":"2",
    	"displayName":"menu2"
    }
    ]