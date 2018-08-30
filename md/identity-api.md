# identity API

## professionalcontactdata and personalcontactdata

### Description

Additional information about a user (personal and professional). Both resources have the same attributes.

### Identifier

The user ID (a long value).

### Representation
```json
{
  "id":"user ID",
  "fax_number":"fax number",
  "building":"building",
  "phone_number":"phone number",
  "website":"website",
  "zipcode":"zipcode",
  "state":"state",
  "city":"city",
  "country":"country",
  "mobile_number":"mobile phone number",
  "address":"address",
  "room":"room",
  "email":"email"
}
```

### Methods

The methods used for this resource are:

* POST - Create a user's contact information
* GET - Read a user's contact information
* PUT - Update a user's contact information

### Create contact information

* **URL**  
  `/API/identity/professionalcontactdata`  
  or  
  `/API/identity/personalcontactdata`  
* **Method**  
  `POST`
* **Request Payload**  
  A partial representation of a user's contact information in JSON including the user ID (mandatory)
  ```json
  {
    "id":"4",
    "fax_number":"484-302-0766",
    "building":"70",
    "phone_number":"484-302-5766",
    "zipcode":"19108",
    "state":"PA",
    "city":"Philadelphia",
    "country":"United States",
    "address":"Renwick Drive",
    "email":"walter.bates@acme.com"
  }
  ```
* **Success Response**  
  The full JSON representation of the user's contact information that was created
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"4",
      "fax_number":"484-302-0766",
      "building":"70",
      "phone_number":"484-302-5766",
      "website":"",
      "zipcode":"19108",
      "state":"PA",
      "city":"Philadelphia",
      "country":"United States",
      "mobile_number":"",
      "address":"Renwick Drive",
      "email":"walter.bates@acme.com",
      "room":""
    }
    ```
* **Error Response**
  * **Code**: 403 if contact information for this user already exists

### Read a user's contact information

* **URL**  
  `/API/identity/professionalcontactdata/:userId`  
  or  
  `/API/identity/personalcontactdata/:userId`  
* **Method**  
  `GET`
* **Success Response**  
  A user's contact information in JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"4",
      "fax_number":"484-302-0766",
      "building":"70",
      "phone_number":"484-302-5766",
      "website":"",
      "zipcode":"19108",
      "state":"PA",
      "city":"Philadelphia",
      "country":"United States",
      "mobile_number":"",
      "address":"Renwick Drive",
      "email":"walter.bates@acme.com",
      "room":""
    }
    ```
* **Error Response**
  * **Code**: 404 if no user with this ID is found

### Update a user's contact information

* **URL**  
  `/API/identity/professionalcontactdata/:userId`  
  or  
  `/API/identity/personalcontactdata/:userId`  
* **Method**  
  `PUT`
* **Request Payload**  
  A partial representation of a user's contact information in JSON with at least the mandatory "name" attribute
  ```json
  {
    "fax_number":"484-302-0766",
    "building":"70",
    "phone_number":"484-302-5766",
    "zipcode":"19108",
    "state":"PA",
    "city":"Philadelphia",
    "country":"United States",
    "address":"Renwick Drive",
    "email":"walter.bates@acme.com"
  }
  ```
* **Error Response**
  * **Code**: 404 if no user with this ID is found

## Group

### Description

The group a user belongs to. Groups have a hierarchy (subgroups can be created inside a group).

### Identifier

The ID of the group (a long value).

### Representation

```json
{
  "id":"group ID", 
  "name":"display name", 
  "displayName":"name", 
  "parent_path":"the path of the parent group of this group (empty if the group has no parent)", 
  "path":"the full path of the group (including its parent path)", 
  "description":"description", 
  "creation_date":"creation date (format: "2014-12-31 15:17:24.736")", 
  "created_by_user_id":"id of the user who created the group (-1 if the group was created by the tenant admin or by an organisation import)", 
  "last_update_date":"last update date (format: "2014-12-31 15:17:24.736")", 
  "icon":"icon path"
}
```

### Methods

The methods used for this resource are:

* POST - Create a group
* GET - Read a group or search for a group
* PUT - Update a group
* DELETE - Remove a group

### Create a group

* **URL**  
  `/API/identity/group`  
* **Method**  
  `POST`
* **Data Params**  
* **Request Payload**  
  A partial representation of a group in JSON with at least the mandatory "name" attribute
  ```json
  {
    "icon":"","name":"HR",
    "displayName":"Human Resources",
    "parent_group_id":"1",
    "description":"Human resources department"
  }
  ```
* **Success Response**  
  The full JSON representation of the group that was created
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"14",
      "creation_date":"2014-12-02 16:19:28.925",
      "created_by_user_id":"4",
      "icon":"","parent_path":"/acme"
      ,"description":"Human resources department",
      "name":"HR",
      "path":"/acme/HR",
      "displayName":"Human Resources",
      "last_update_date":"2014-12-02 16:19:28.925"
    }
    ```
* **Error Response**
  * **Code**: 403 if a group with the same name and parent already exists

### Read a group

* **URL**  
  `/API/identity/group/:groupId`  
* **Method**  
  `GET`
* **Success Response**  
  A group in JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"14",
      "creation_date":"2014-12-02 16:19:28.925",
      "created_by_user_id":"4",
      "icon":"","parent_path":"/acme",
      "description":"Human resources department",
      "name":"HR",
      "path":"/acme/HR",
      "displayName":"Human Resources",
      "last_update_date":"2014-12-02 16:19:28.925"
    }
    ```
* **Error Response**
  * **Code**: 404 if no group with this ID is found

### Search for a group

* **URL**  
  `/API/identity/group`  
  _Example_: `/API/identity/group?p=0&c=100&f=parent_path%3d/acme&d=parent_group_id&o=name%20ASC`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available to search form mappings.  
  It is possible to filter on the following attributes:
  * `name=<group_name>`
  * `displayName=<group_displayName>`
  * `parent\_path=<path_of_parent_group>`

  It is possible to order by the value of the following attributes:
  * `o=id ASC` ou `o=id DESC`)
  * `o=name ASC` ou `o=name DESC`
  * `o=displayName ASC` ou `o=displayName DESC`

  It is also possible to retrieve the parent group ID.
  * `d=<parent_group_id>`
* **Success Response**  
  A list of groups in JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "id":"3",
        "creation_date":"2014-12-02 11:33:48.501",
        "created_by_user_id":"-1",
        "icon":"",
        "parent_path":"/acme",
        "description":"This group represents the finance department of the ACME organization",
        "name":"finance",
        "path":"/acme/finance",
        "parent_group_id":"1",
        "displayName":"Finance",
        "last_update_date":"2014-12-02 11:33:48.501"
      }, {
        "id":"14",
        "creation_date":"2014-12-02 16:19:28.925",
        "created_by_user_id":"4",
        "icon":"",
        "parent_path":"/acme",
        "description":"Human resources department",
        "name":"HR",
        "path":"/acme/HR",
        "parent_group_id":"1",
        "displayName":"Human Resources",
        "last_update_date":"2014-12-02 16:19:28.925"
      }
    ]
    ```

### Update a group

* **URL**  
  `/API/identity/group/:groupId`  
* **Method**  
  `PUT`
* **Request Payload**  
  A partial representation of a group in JSON with at least the mandatory "name" attribute
  ```json
  {
    "name":"HR",
    "displayName":"Humman resources"
  }
  ```
* **Success Response**  
  The full JSON representation of the group that was updated
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"14",
      "creation_date":"2014-12-02 16:19:28.925",
      "created_by_user_id":"4",
      "icon":"",
      "parent_path":"/acme",
      "description":"Human resources department",
      "name":"HR",
      "path":"/acme/HR",
      "displayName":"Human resources",
      "last_update_date":"2014-12-03 17:18:27.542"
    }
    ```
* **Error Response**
  * **Code**: 
    403 if another group with the same name and parent already exists  
    404 if no group with this ID is found

### Delete a group

* **URL**  
  `/API/identity/group/:groupId`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200
* **Error Response**
  * **Code**: 404 if no group with this ID is found

## Membership

### Description

Manage membership of users. There is a membership when a user belongs to a group and a role. Use this resource to add, search, and delete memberships.

### Identifier

A compound identifier constructed from user\_id/group\_id/role\_id where each id is a long value.

### Representation

```json
{
  "assigned_date":"creation date (format: "2014-12-31 15:17:24.736")",
  "role_id":"id of the role of this membership",
  "assigned_by_user_id":"id of the user who created the membership (-1 if the role was created by the tenant admin or by an organisation import)",
  "group_id":"id of the group of this membership",
  "user_id":"id of the user in this membership"
}
```

### Methods

The methods used for this resource are:

* POST - Create a membership
* GET - Search for memberships of a user
* DELETE - Remove a membership
* DELETE - Remove a membership

### Create a membership

This action creates (assigns) a membership to a user.

* **URL**  
  `/API/identity/membership`  
* **Method**  
  `POST`
* **Request Payload**  
  A partial representation of a membership object with the mandatory "user\_id", "group\_id" and "role\_id" attributes
  ```json
  {
    "user_id":"4",
    "group_id":"5",
    "role_id":"1"
  }
  ```
* **Success Response**  
  The full JSON representation of the membership that was created
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "assigned_date":"2014-12-02 17:57:09.315",
      "role_id":"1",
      "assigned_by_user_id":"-1",
      "group_id":"5",
      "user_id":"4"
    }
    ```
* **Error Response**
  * **Code**: 403 if a membership already exists

### Search memberships of a user

This action search memberships of a user.

* **URL**  
  `/API/identity/membership`  
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  **Required** 
  * filter is mandatory: `user_id=<id of the user>`

  It is possible to use the deploy option to retrieve the value of elements specified by an attribute value. For example, if you specify `d=group_id`, the result will contain the group details in place of the group id.
  * group `d=group_id`
  * role `d=role_id`
  * user `d=user_id`
  * user that created the membership `d=assigned_by_user_id`

  It is possible to order by the value of the following attributes:
  * `o=ROLE_NAME_ASC` or `o=ROLE_NAME_DESC`
  * `o=GROUP_NAME_ASC` or `o=GROUP_NAME_DESC`
  * `o=ASSIGNED_DATE_ASC` or `o=ASSIGNED_DATE_DESC`

  _Example_: Get the memberships for the user with id 125, and return the role details associated with each membership: `/API/identity/membership?p=0&c=10&f=user\_id%3d125&d=role\_id`
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "assigned_date":"2014-12-02 17:57:09.315",
        "role_id": {
          "creation_date":"2014-12-01 18:51:54.791",
          "created_by_user_id":"4",
          "id":"4",
          "icon":"",
          "description":"manager of the department",
          "name":"manager",
          "displayName":"department manager",
          "last_update_date":"2014-12-01 18:51:54.791"
        },
        "assigned_by_user_id":"12",
        "group_id":"5",
        "user_id":"125"
      }
    ]
    ```

### Delete a membership

Delete a membership of a user using the group id and role id.

* **URL**  
  `/API/identity/membership/:userId/:groupId/:roleId`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200

## Role

### Description

The role of a user in a group

### Identifier

The ID of the role (a long value).

### Representation
```json
{
  "id":"role ID",
  "name":"display name",
  "displayName":"name",
  "description":"description",
  "creation_date":"creation date (format: "2014-12-31 15:17:24.736")",
  "created_by_user_id":"Id of the user who created the role (-1 if the role was created by the tenant admin or by an organisation import)",
  "last_update_date":"last update date (format: "2014-12-31 15:17:24.736")",
  "icon":"icon path"
}
```

### Methods

The methods used for this resource are:

* POST - Create a role
* GET - Read a role or search for a role
* PUT - Update a role
* DELETE - Remove a role

### Create a role

* **URL**  
  `/API/identity/role`  
* **Method**  
  `POST`
* **Request Payload**  
  A partial representation of a role in JSON with at least the mandatory "name" attribute
  ```json
  {
    "icon":"",
    "name":"manager",
    "displayName":"department manager",
    "description":"manager of the department"
  }
  ```
* **Success Response**  
  The full JSON representation of the role that was created
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "creation_date":"2014-12-01 18:51:54.791",
      "created_by_user_id":"4",
      "id":"4",
      "icon":"",
      "description":"manager of the department",
      "name":"manager",
      "displayName":"department manager",
      "last_update_date":"2014-12-01 18:51:54.791"
    }
    ```
* **Error Response**
  * **Code**: 403 if a role with the same name already exists

### Read a role

* **URL**  
  `/API/identity/role/:roleId`  
* **Method**  
  `GET`
* **Success Response**  
  A role in JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "creation_date":"2014-12-01 15:17:24.736",
      "created_by_user_id":"-1",
      "id":"1",
      "icon":"",
      "description":"",
      "name":"member",
      "displayName":"Member",
      "last_update_date":"2014-12-01 15:17:24.736"
    }
    ```
* **Error Response**
  * **Code**: 404 if no role with this ID is found

### Search for a role

* **URL**  
  `/API/identity/role`  
  _Example_: `/API/identity/role?p=0&c=100&o=displayName ASC`
* **Method**  
  `GET`
* **Data Params**  
  It is possible to filter on the following attributes
  * `name=<role_name>`
  * `displayName=<role_displayName>`

  It is possible to order by the value of the following attributes
  * id: `o=id ASC` or `o=id DESC`
  * name: `o=name ASC` or `o=name DESC`
  * displayName: `o=displayName ASC` or `o=displayName DESC`
* **Success Response**  
  A list of roles in JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "creation_date":"2014-12-01 18:51:54.791",
        "created_by_user_id":"4",
        "id":"4",
        "icon":"",
        "description":"manager of the department",
        "name":"manager",
        "displayName":"department manager",
        "last_update_date":"2014-12-01 18:51:54.791"
      },
      {
        "creation_date":"2014-12-01 15:17:24.736",
        "created_by_user_id":"-1",
        "id":"1",
        "icon":"",
        "description":"",
        "name":"member",
        "displayName":"Member",
        "last_update_date":"2014-12-01 15:17:24.736"
      }
    ]
    ```

### Update a role

* **URL**  
  `/API/identity/role/:roleId`  
* **Method**  
  `PUT`
* **Request Payload**  
  A partial representation of a role in JSON with at least the mandatory "name" attribute
  ```json
  {
    "name":"Manager",
    "displayName":"Department manager"
  }
  ```
* **Success Response**  
  The full JSON representation of the role that was updated
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "creation_date":"2014-12-01 18:51:54.791",
      "created_by_user_id":"4",
      "id":"4",
      "icon":"",
      "description":"manager of the department",
      "name":"Manager",
      "displayName":"Department manager",
      "last_update_date":"2014-12-01 18:59:59.361"
    }
    ```
* **Error Response**
  * **Code**: 
    403 : if a role with the same name already exists  
    404 : if no role with this ID is found

### Delete a role

* **URL**  
  `/API/identity/role/:roleId`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200
* **Error Response**
  * **Code**: 404 if no role with this ID is found

## User

### Description

Used to manage information about users.

### Representation

Returns a JSON representation of user details. The "manager\_id" and "professional\_data" are omitted unless they are
requested in the payload.

```json
{
  "last_connection":"date",
  "created_by_user_id":"number",
  "creation_date":"date",
  "id":"number",
  "icon":"string",
  "enabled":"true | false",
  "title":"string",
  "professional_data": {
    "fax_number":"string",
    "building":"string",
    "phone_number":"string",
    "website":"string",
    "zipcode":"string",
    "state":"string",
    "city":"string",
    "country":"string",
    "id":"number",
    "mobile_number":"string",
    "address":"string",
    "email":"string",
    "room":"string"
  },
  "manager_id":{
    "last_connection":"date",
    "created_by_user_id":"number",
    "creation_date":"date",
    "id":"number",
    "icon":"string",
    "enabled":"true | false",
    "title":"string",
    "manager_id":"number",
    "job_title":"string",
    "userName":"string",
    "lastname":"string",
    "firstname":"string",
    "password":"",
    "last_update_date":"date"
  },
  "job_title":"string",
  "userName":"string",
  "lastname":"string",
  "firstname":"string",
  "password":"",
  "last_update_date":"date"
}
```

### Methods

The methods used for this resource are:

* POST - Create a user
* GET - Read a user details or search for a group of users
* PUT - Update a user
* DELETE - Remove a user

### Create a user

* **URL**  
  `/API/identity/user`  
* **Method**  
  `POST`
* **Request Payload**  
A partial representation of a user in JSON
  ```json
  {
    "userName":"New.User",
    "password":"bpm",
    "password_confirm":"bpm",
    "icon":"",
    "firstname":"New",
    "lastname":"User",
    "title":"Mr",
    "job_title":"Human resources benefits",
    "manager_id":"3"
  }
  ```
* **Success Response**  
  The full JSON representation of the user that was created  
  After creation, the user is in inactive state.
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "last_connection":"",
      "created_by_user_id":"4",
      "creation_date":"2014-12-09 17:43:28.291",
      "id":"101",
      "icon":"/default/icon_user.png",
      "enabled":"false",
      "title":"Mr",
      "manager_id":"3",
      "job_title":"Human resources benefits",
      "userName":"New.User",
      "lastname":"New",
      "firstname":"User",
      "password":"",
      "last_update_date":"2014-12-09 17:43:28.291"
    }
    ```

### Read a user details

* **URL**  
  `/API/identity/user/:userId`  
  _Example_:  Get details of a specified user including professional and manager information : `/API/identity/user/21?d=professional\_data&d=manager\_id`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  * `d=professional_data` - include professionnal data in response
  * `d=manager_id` - include details of user's manager in response
* **Success Response**  
  The full JSON representation of the user
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "last_connection":"",
      "created_by_user_id":"-1",
      "creation_date":"2014-12-01 10:39:55.177",
      "id":"21",
      "icon":"/default/icon_user.png",
      "enabled":"true",
      "title":"Mrs",
      "professional_data":{
        "fax_number":"484-302-0430",
        "building":"70",
        "phone_number":"484-302-5430",
        "website":"",
        "zipcode":"19108",
        "state":"PA",
        "city":"Philadelphia",
        "country":"United States",
        "id":"21",
        "mobile_number":"",
        "address":"Renwick Drive",
        "email":"giovanna.almeida@acme.com",
        "room":""
      },
      "manager_id":{
        "last_connection":"",
        "created_by_user_id":"-1",
        "creation_date":"2014-12-01 10:39:55.136",
        "id":"17",
        "icon":"/default/icon_user.png",
        "enabled":"true",
        "title":"Mrs",
        "manager_id":"1",
        "job_title":"Vice President of Sales",
        "userName":"daniela.angelo",
        "lastname":"Angelo",
        "firstname":"Daniela",
        "password":"",
        "last_update_date":"2014-12-01 10:39:55.136"
      },
      "job_title":"Account manager",
      "userName":"giovanna.almeida",
      "lastname":"Almeida",
      "firstname":"Giovanna",
      "password":"",
      "last_update_date":"2014-12-01 10:39:55.177"
    }
    ```

### Search for a group of users

* **URL**  
  `/API/identity/user`  
  _Example_:  Search for users with names that contain "will", filter to keep only enabled users, and order the result by last name.:  `/API/identity/user?p=0&c=10&o=lastname%20ASC&s=will&f=enabled%3dtrue`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  * `d=professional\_data - include professionnal data in response
  * `d=manager\_id - include details of user's manager in response
* **Success Response**  
  A JSON array of users
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "last_connection":"2014-12-09 14:52:06.092",
        "created_by_user_id":"-1",
        "creation_date":"2014-12-08 17:16:40.984",
        "id":"1","icon":"/default/icon_user.png",
        "enabled":"true",
        "title":"Mr",
        "manager_id":"0",
        "job_title":"Chief Executive Officer",
        "userName":"william.jobs",
        "lastname":"Jobs",
        "firstname":"William",
        "password":"",
        "last_update_date":"2014-12-08 17:16:40.984"
      },
      {
        "last_connection":"",
        "created_by_user_id":"-1",
        "creation_date":"2014-12-08 17:16:41.030",
        "id":"5",
        "icon":"/default/icon_user.png",
        "enabled":"true",
        "title":"Mr",
        "manager_id":"1",
        "job_title":"Chief Financial Officer",
        "userName":"zachary.williamson",
        "lastname":"Williamson",
        "firstname":"Zachary",
        "password":"",
        "last_update_date":"2014-12-08 17:16:41.030"
      }
    ]
    ```

### Update a user

* **URL**  
  `API/identity/user/:userId`  
* **Method**  
  `PUT`
* **Request Payload**  
  A JSON representation of the user, with the new information.  
  _Example_:  Update user details including professional and manager information: `/API/identity/user/4` 
  ```json
  {
    "id"="4",
    "userName":"walter.bates",
    "password":"bpm",
    "password_confirm":"bpm",
    "icon":"",
    "firstname":"Walter",
    "lastname":"Bates",
    "title":"Mr",
    "job_title":"Human resources benefits",
    "manager_id":"3"
  }
  ```
  Deactivate the user identified by id 9 : `/API/identity/user/9` 
  ```json
  {
    "enabled":"false"
  }
  ```
* **Success Response**  
  * **Code**: 200

### Remove a user

::: warning 
Use this method with caution: some artifacts like applications, cases or users may present display problems in the Bonita Portal if the referenced user was deleted.  
Note that you can disable a user instead of deleting it. To do so, use the `UPDATE` method and set the attribute 'enabled' to false
:::
* **URL**  
  `/API/identity/user/:userId`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200
