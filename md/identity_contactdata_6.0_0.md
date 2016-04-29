## professionalcontactdata and personalcontactdata

### Description

Additional information about a user (personal and professional). Both resources have the same attributes.

### Identifier

The user ID (a long value).

### Representation

    {
    "id":"_user ID_",
    "fax_number":"_fax number_",
    "building":"_building_",
    "phone_number":"_phone number_",
    "website":"_website_",
    "zipcode":"_zipcode_",
    "state":"_state_",
    "city":"_city_",
    "country":"_country_",
    "mobile_number":"_mobile phone number_",
    "address":"_address_",
    "room":"_room_",
    "email":"_email_"
    }

### Methods

The methods used for this resource are:

* POST - Create a user's contact information
* GET - Read a user's contact information
* PUT - Update a user's contact information

### Create contact information
Request url
http://../API/identity/professionalcontactdata (or personalcontactdata)

Request method

POST

Request payload

A partial representation of a user's contact information in JSON including the user ID (mandatory)

Response payload

The full JSON representation of the user's contact information that was created

#### Response codes

403 if contact information for this user already exists

#### Example
Request url
/API/identity/professionalcontactdata

Request method

POST

Request payload

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

Response payload

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

### Read a user's contact information
Request url
http://../API/identity/professionalcontactdata(or personalcontactdata)/<user\_id\>

Request method

GET

Request payload
empty

Response payload

A user's contact information in JSON

#### Response codes

404 if no user with this ID is found

#### Example
Request url
/API/identity/professionalcontactdata/4

Request method

GET

Response payload

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

### Update a user's contact information
Request url
http://../API/identity/professionalcontactdata(or personalcontactdata)/<user\_id\>

Request method

PUT

Request payload

A partial representation of a user's contact information in JSON with at least the mandatory "name" attribute

Response payload
empty

#### Response codes

404 if no user with this ID is found

#### Example
Request url
/API/identity/professionalcontactdata/4

Request method

PUT

Request payload

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