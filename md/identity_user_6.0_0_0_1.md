## user

### Description

Used to manage information about users.

### Identifier

../API/identity/user

### Representation

Returns a JSON representation of user details. The "manager\_id" and "professional\_data" are omitted unless they are
requested in the payload.

    {
        "last_connection":"_date_",
        "created_by_user_id":"_number_",
        "creation_date":"_date_",
        "id":"_number_",
        "icon":"_string_",
        "enabled":"true | false",
        "title":"_string_",
    
        "professional_data":{
    
        "fax_number":"_string_",
        "building":"_string_",
        "phone_number":"_string_",
        "website":"_string_",
        "zipcode":"_string_",
        "state":"_string_",
        "city":"_string_",
        "country":"_string_",
        "id":"_number_",
        "mobile_number":"_string_",
        "address":"_string_",
        "email":"_string_",
        "room":"_string_"
        },
    
        
        "manager_id":{
    
        "last_connection":"_date_",
        "created_by_user_id":"_number_",
        "creation_date":"_date_",
        "id":"_number_",
        "icon":"_string_",
        "enabled":"true | false",
        "title":"_string_",
        "manager_id":"_number_",
        "job_title":"_string_",
        "userName":"_string_",
        "lastname":"_string_",
        "firstname":"_string_",
        "password":"",
        "last_update_date":"_date_"
        },
        "job_title":"_string_",
        "userName":"_string_",
        "lastname":"_string_",
        "firstname":"_string_",
        "password":"",
        "last_update_date":"_date_"
    }

{"user\_id":_long_, "task\_id":_long_}

### Methods

The methods used for this resource are:

* POST - Create a user
* GET - Read a user details or search for a group of users
* PUT - Update a user
* DELETE - Remove a user

### Create a user
Request url
http://../API/identity/user

Request method

POST

Request payload

A partial representation of a user in JSON

Response payload

The full JSON representation of the user that was created

After creation, the user is in inactive state.

#### Example

### Create a new user Request url
POST |/API/identity/user

Request payload

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

Response payload

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
    "last_update_date":"2014-12-09 17:43:28.291"}
    
    
            

### Read a user details
Request url
http://../API/identity/user/_userId_

Request method

GET

Request payload

empty

Response payload

The full JSON representation of the user

#### Parameters

* d=professional\_data - include professionnal data in response
* d=manager\_id - include details of user's manager in response

#### Example

Get details of a specified user including professional and manager information
Request url
GET |/API/identity/user/21?d=professional\_data&d=manager\_id

Response payload

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

### Search for a group of users
Request url
http://../API/identity/user

Request method

GET

Request payload

empty

Response payload

A JSON array of users

#### Parameters

* d=professional\_data - include professionnal data in response
* d=manager\_id - include details of user's manager in response

#### Example

Search for users with names that contain "will", filter to keep only enabled users, and order the result by last name.
Request url
GET |/API/identity/user?p=0&c=10&o=lastname%20ASC&s=will&f=enabled%3dtrue

Response payload

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

### Update a user
Request url
http://../API/identity/user/_userId_

Request method

PUT

Request payload

A JSON representation of the user, with the new information.

Response payload

empty

#### Examples

Update user details including professional and manager information.
Request url
PUT |/API/identity/user/4

Request payload

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

Deactivate the user identified by id 9
Request url
PUT |/API/identity/user/9

Request payload

    {"enabled":"false"}

Response payload
empty

### Remove a user
Request url
http://../API/identity/user/_userId_

Request method

DELETE

Request payload

empty

Response payload

empty

#### Example

Remove the user identified by id 9\.
Request url
DELTE |/API/identity/user/9