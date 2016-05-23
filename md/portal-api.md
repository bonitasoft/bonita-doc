# portal API

## Page

### Description

Use the page resource to access custom pages.

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

```json
    {
    "id":"_page_id_",
    "creationDate":"_date and time_",
    "createdBy":"_created_by_user_id_",
    "isProvided":"_true|false_",
    "description":"_description_",
    "contentName":"_custom_page_name_",
    "displayName":"_custom_page_display_name_",
    "updatedBy":"_updatedBy_user_id_",
    "lastUpdateDate":"_date_and_time_",
    "urlToken":"_custom_page_urlToken_"
    }
```

### Methods

The methods used for this resource are:

* POST - Add a new custom page
* GET - Read or search a custom page
* PUT - Update a custom page
* DELETE - Remove a custom page

### Retrieve a Custom Page

Use a GET method to retrieve information about a custom page.

* **URL**  
  `/API/portal/page/:pageId`  
* **Method**  
  `GET`
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"1",
      "creationDate":"2014-12-02 15:54:45.249",
      "createdBy":"",
      "isProvided":"true",
      "description":"HTML and Javascript example of custom page source structure (in English).",
      "contentName":"bonita-html-page-example.zip",
      "displayName":"HTML example page",
      "updatedBy":"-1",
      "lastUpdateDate":"2014-12-02 15:54:45.249",
      "urlToken":"custompage_htmlexample"
    }
    ```

### Add a new custom page

Use the POST method to create a new custom page. To add a new custom page, there are two steps:

1. Upload the page content using the pageUpload servlet. This returns a temporary file name.
2. Call this API with the temporary file name, as in the example below.


* **URL**  
  `/API/portal/page`
  Example: Add the custom page that was given the temporary name `tmp_2181700538398444744.zip`. The original name was `bonita-angular-dashboard.zip`.
* **Method**  
  `POST`  
* **Request Payload**  
  ```json
  {
    "pageZip":"tmp_113096560980259488.zip:bonita-angular-dashboard.zip"
  }
  ```
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"103",
      "creationDate":"2014-12-04 14:54:06.967",
      "createdBy":"1",
      "isProvided":"false",
      "description":"AngularJS dashboard using ngBonita",
      "contentName":"bonita-angular-dashboard.zip",
      "displayName":"AngularJS dashboard",
      "updatedBy":"1",
      "lastUpdateDate":"2014-12-04 14:54:06.967",
      "urlToken":"custompage_angulardashboard"
    }
    ```

### Update a custom page

Use the PUT method to update an existing custom page.
To update a custom page, upload the new page content using the pageUpload servlet, which returns a temporary file name, and then call this API with the temporary file name.


* **URL**  
  `/API/portal/page/:pageId`  
  _Example_: Update the custom page with id = 103\. The new uploaded file was given the temporary name `tmp_4338264789005487499.zip`. The original name was `new-bonita-angular-dashboard.zip`.
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  {
    "pageZip":"tmp_4338264789005487499.zip:new-bonita-angular-dashboard.zip"
  }
  ```
* **Success Response**  
  * **Code**: 200

### Search custom pages

Use a GET method with filters and search terms to search for custom pages.

* **URL**  
  `/API/portal/page?p={page}&c={count}&o={orders}&f={filters}&s={search}&d={deploy}`  
  _Example_: ``
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  You can filter on:
  * `createdBy={user\_id}`: retrieve only the pages created by the specified user ID.
  For example, to retrieve the custom pages created by the user with id 1: `http://localhost:8080/bonita/API/portal/page?p=0&c=10&f=createdBy%3d1`.
  * `contentType={contentType}`: retrieve only the resources of requested type. This filter is available since v7.0\.
  For example, to retrieve the theme resources: `http://localhost:8080/bonita/API/portal/page?p=0&c=10&f=contentType%3Dtheme`.

  You can search on:
  * `displayName` or `description`: search for custom pages with a `displayName` or `description` that starts with the specified string.
  For example, to find the pages with `displayName` starting with `New`: `http://localhost:8080/bonita/API/portal/page?p=0&c=10&s=New`
  
* **Success Response**  
  An array of custom page objects
  * **Code**: 200

### Delete a custom page

Use the DELETE method to delete an existing custom page

* **URL**  
  `/API/portal/page/:pageId`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200

## Profile

### Description

Use the profile resource to access profiles.

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

```json
    {
    "id":"_profile id_",
    "creationDate":"_date and time of profile creation_",
    "icon":"_icon used in the portal to represent the profile_",
    "createdBy":"_id of the uer who created the profile_",
    "description":"_a description of the profile_",
    "name":"_profile name_",
    "is_default":"_true | false _",
    "lastUpdateDate":"_date and time of the last update to the profile_",
    "updatedBy":"_the id of the user who last updated the profile_"
    }
```

### Methods

The methods used for this resource are:

* POST - Add a new profile
* GET - Read or search a profile
* PUT - Update a profile
* DELETE - Remove a profile

### Retrieve a Profile

Use a GET method to retrieve information about a profile.

* **URL**  
  `/API/portal/profile/:profileId`  
* **Method**  
  `GET`
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"1",
      "creationDate":"2014-12-02 15:54:44.395",
      "icon":"/profiles/profileUser.png",
      "createdBy":"-1",
      "description":"The user can view and perform tasks and can start a new case of a process.",
      "name":"User",
      "is_default":"true",
      "lastUpdateDate":"2014-12-04 11:05:14.490",
      "updatedBy":"1"
    }
    ```

### Add a new profile

Use the POST method to create a new profile.

* **URL**  
  `/API/portal/profile`  
* **Method**  
  `POST`
* **Request Payload**  
  ```json
    {
      "name":"MyCustomProfile",
      "description":"This is my custom profile"
    }
  ```
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"101",
      "creationDate":"2014-12-04 16:29:23.434",
      "icon":"/profiles/profileDefault.png",
      "createdBy":"1",
      "description":"This is my custom profile",
      "name":"MyCustomProfile",
      "is_default":"false",
      "lastUpdateDate":"2014-12-04 16:29:23.434",
      "updatedBy":"1"
    }
    ```

### Update a profile

Use the PUT method to update an existing profile.

* **URL**  
  `/API/portal/profile/:profileId`  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  {
    "id":"101",
    "name":"MyUpdatedCustomProfile",
    "description":"This is my updated custom profile"
  }
  ```
* **Success Response**  
  * **Code**: 200

### Search profiles

Use a GET method with filters and search terms to search for profiles.

* **URL**  
  `/API/portal/profile?p={page}&c={count}&o={orders}&f={filters}&s={search}&d={deploy}`  
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  You can filter on:
  * `name={exact\_profile\_name}`: retrieve only the profiles with the specified name. For example, retrieve the profile with name = Administrator: http://localhost:8080/bonita/API/portal/profile?p=0&c=10&f=name%3dAdministrator

  You can search on:
  * name: search all profiles which name starts with the search string. For example, name starting with Adm: `http://localhost:8080/bonita/API/portal/profile?p=0&c=10&s=Adm`
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
  An array of profile objects

### Delete a profile

Use the DELETE method to delete an existing profile

* **URL**  
  `API/portal/profile/`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200

## ProfileEntry

### Description

A profileEntry represents the association between pages and profiles. A profile is associated with a set of profileEntry items. This defines the pages that a user with this profile can access, and the menu structure that the user sees.

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

```json
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
```

### Methods

The methods used for this resource are:

* POST - Add a new profileEntry
* GET - Read or search a profileEntry
* PUT - Update a profileEntry
* DELETE - Remove a profileEntry

### Retrieve a profileEntry

Use a GET method to retrieve information about a profileEntry

* **URL**  
  `/API/portal/profileEntry/:profileEntryId`  
* **Method**  
  `GET`
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
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
    ```

### Add a new profileEntry

Use the POST method to create a new profileEntry.

* **URL**  
  `API/portal/profileEntry`  
* **Method**  
  `POST`
* **Request Payload**  
  Example: Add the profileEntry with page token = tasklistingadmin with a display name = "Test menu" and associate it with the profile = 102\.
  ```json
  {
    "page":"tasklistingadmin",
    "parent_id":"0",
    "name":"Test menu",
    "profile_id":"102",
    "type":"link",
    "isCustom":"false"
  }
  ```
  Example 2: Create a menu called Folder containing two items, Child1 and Child2, and associate it with profile = 102 with three POST requests.
  ```json
  {
    "page":"Null",
    "parent_id":"0",
    "name":"Folder",
    "profile_id":"102",
    "type":"folder",
    "isCustom":"false"
  }
  ```
  ```json
  {
    "page":"custompage_groovyexample",
    "parent_id":"106",
    "name":"",
    "profile_id":"102",
    "type":"link",
    "isCustom":"true"
  }
  ```
  ```json
  {
    "page":"tasklistingadmin",
    "parent_id":"106",
    "name":"",
    "profile_id":"102",
    "type":"link",
    "isCustom":"false"
  }
  ```
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
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
    ```

### Update a profileEntry

Use the PUT method to update an existing profileEntry.

* **URL**  
  `API/portal/profileEntry/:profileEntryId`  
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  {
    "name":"Test menu updated"
  }
  ```
* **Success Response**  
  * **Code**: 200

### Search profileEntry items

Use a GET method with filters and search terms to search for profileEntry items.

* **URL**  
  `/API/portal/profileEntryEntry?p={page}&c={count}&o={orders}&f={filters}&s={search}&d={deploy}`  
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  You can filter on:
  * `page={exact\_pageToken}`: retrieve only the profileEntry items with the specified tokenName. For example, retrieve the profileEntry with page name = tasklistinguser: `/API/portal/profileEntry?p=0&c=10&f=page%3dtasklistinguser`.
  * `name={exact\_page\_name}`: retrieve only the profileEntry items with the specified pageName. For example, retrieve the profileEntry with page name = Tasks: `/API/portal/profileEntry?p=0&c=10&f=name%3dTasks`.
  * `parentId={parent\_id}`: retrieve only the profileEntry items with the specified parent\_id. For example, retrieve the profileEntry with parent\_id = 1: `/API/portal/profileEntry?p=0&c=10&f=parent_id%3d1`.

  You can search on:
  * `name`: search all profileEntry definitions with name starting with the search string. 
  For example, to find entries with name starting with Manage: `/API/portal/profileEntry?p=0&c=10&s=Manage`.
* **Success Response**  
  An array of profileEntry objects
  * **Code**: 200
  * **Payload**:  

### Delete a profileEntry

Use the DELETE method to delete an existing profileEntry

* **URL**  
  `/API/portal/profileEntry/:profileEntryId`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200

* [profileMember](api_resources/portal_profilemember_6.4_0.md)
* [theme](api_resources/portal_theme_6.4_0.md)
