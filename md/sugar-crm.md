# 1.8.15 SugarCRM (API v4)




Sugar version API v4



Available Sugar connectors are:

* Create Object - Create a Sugar CRM object using API v4
* Delete Object - Delete a Sugar CRM object using API v4
* Delete Several Objects - Delete several Sugar CRM objects by their ids using API v4
* Query Objects - Execute a query on Sugar CRM
* Retrieve Object - Retrieve an object from Sugar CRM using API v4
* Retrieve Several Objects - Retrieve several objects from a Sugar CRM server using API v4
* Update an Object - Update a Sugar CRM object using API v4

Parameters are:

* Type of object you want to retrieve (e.g.: Accounts)
* List of objects identifiers
* List of fields of the object (e.g.: Name, Phone)
* Update object - Update a Sugar object.

Parameters are:

* Type of object you want to update (e.g.: Accounts)
* Object identifier
* Map of fields of the object to update (e.g.: Name = MyNewName, Phone = 1234)

All connectors have these required parameters in common:

* Username
* Password
* Sugar address (url server)