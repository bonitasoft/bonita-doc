## profileEntry

### Description

A profileEntry represents the association between pages and profiles. A profile is associated with a set of profileEntry items. This defines the pages that a user with this profile can access, and the menu structure that the user sees.

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

    {
    "id":"_profileEntry id_",
    "icon":"_icon used in the portal to represent a profileEntry_",
    "index":"_position in a menu_",
    "profile_id":"_id of the profile that contains this profileEntry_",
    "page":"_pageToken (menu name or menu item name) used in a portal menu to identify the page associated with the profileEntry_",
    "description":"_description_",
    "name":"_name of the profileEntry_",
    "type":"_link (if menu item) | folder (if menu)_",
    "isCustom":"_ true | false _",
    "parent_id":"_id or parent profileEntry if in a folder_"
    }

### Methods

The methods used for this resource are:

* POST - Add a new profileEntry
* GET - Read or search a profileEntry
* PUT - Update a profileEntry
* DELETE - Remove a profileEntry

### Retrieve a profileEntry

Use a GET method to retrieve information about a profileEntry

Example: Get the information about the profileEntry with id=1\.
Method
GET

URL
`http://localhost:8080/bonita/API/portal/profileEntry/1`

Payload
empty

Response

    {
    "id":"1",
    "icon":"",
    "index":"0",
    "profile_id":"1",
    "page":"tasklistinguser",
    "description":"Manage tasks",
    "name":"Tasks",
    "type":"link",
    "isCustom":"false",
    "parent_id":"0"
    }

### Add a new profileEntry

Use the POST method to create a new profileEntry.

Example: Add the profileEntry with page token = tasklistingadmin with a display name = "Test menu" and associate it with the profile = 102\.
Method
POST

URL
`http://localhost:8080/bonita/API/portal/profileEntry`

Payload

    {
    "page":"tasklistingadmin",
    "parent_id":"0",
    "name":"Test menu",
    "profile_id":"102",
    "type":"link",
    "isCustom":"false"
    }

Response

    {
    "id":"101",
    "icon":"",
    "index":"0",
    "profile_id":"102",
    "page":"tasklistingadmin",
    "description":"manage tasks",
    "name":"Test menu",
    "type":"link",
    "isCustom":"false",
    "parent_id":"0"
    }

Example 2: Create a menu called Folder containing two items, Child1 and Child2, and associate it with profile = 102\.
Method
POST

URL
`http://localhost:8080/bonita/API/portal/profileEntry`

Payload

    {
    "page":"Null",
    "parent_id":"0",
    "name":"Folder",
    "profile_id":"102",
    "type":"folder",
    "isCustom":"false"
    }

Method
POST

URL
`http://localhost:8080/bonita/API/portal/profileEntry`

Payload

    {
    "page":"custompage_groovyexample",
    "parent_id":"106",
    "name":"",
    "profile_id":"102",
    "type":"link",
    "isCustom":"true"
    }

Method
POST

URL
`http://localhost:8080/bonita/API/portal/profileEntry`

Payload

    {
    "page":"tasklistingadmin",
    "parent_id":"106",
    "name":"",
    "profile_id":"102",
    "type":"link",
    "isCustom":"false"
    }

### Update a profileEntry

Use the PUT method to update an existing profileEntry.

Example: Update a profileEntry with id = 101\.
Method
PUT

URL
`http://localhost:8080/bonita/API/portal/profileEntry/101>`

Payload

    {
    "name":"Test menu updated"
    }

Response
empty

### Search profileEntry items

Use a GET method with filters and search terms to search for profileEntry items.

You can filter on:

* page={exact\_pageToken}: retrieve only the profileEntry items with the specified tokenName. For example, retrieve the profileEntry with page name = tasklistinguser: `http://localhost:8080/bonita/API/portal/profileEntry?p=0&c=10&f=page%3dtasklistinguser`.
* name={exact\_page\_name}: retrieve only the profileEntry items with the specified pageName. For example, retrieve the profileEntry with page name = Tasks: `http://localhost:8080/bonita/API/portal/profileEntry?p=0&c=10&f=name%3dTasks`.
* parentId={parent\_id}: retrieve only the profileEntry items with the specified parent\_id. For example, retrieve the profileEntry with parent\_id = 1: `http://localhost:8080/bonita/API/portal/profileEntry?p=0&c=10&f=parent_id%3d1`.

You can search on:

* name: search all profileEntry definitions with name starting with the search string. 
For example, to find entries with name starting with Manage: `http://localhost:8080/bonita/API/portal/profileEntry?p=0&c=10&s=Manage`.

#### Description
Request url
/API/portal/profileEntryEntry?p={page}&c={count}&o={orders}&f={filters}&s={search}&d={deploy}

Request method

GET

Request payload

empty

Response

An array of profileEntry objects

### Delete a profileEntry

Use the DELETE method to delete an existing profileEntry

Example: Delete a profileEntry with id = 101
Method
DELETE

URL
`http://localhost:8080/bonita/API/portal/profileEntry/101`

Payload
empty

Response
empty