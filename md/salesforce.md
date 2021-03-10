# Using SaleForce with Bonita

SaleForce connectors allow you to interact with Saleforce through Bonita.

## Overview

Salesforce version 24.0.0

Available Salesforce connectors are:

- Create Object - Create a Salesforce object (e.g.: Account, Contact)
- Delete Object(s) - Delete one or several Salesforce object with list of objects identifiers in parameters
- Query Object - Execute query on Salesforce objects (e.g.: SELECT Name FROM Account)
- Retrieve Object(s) - Retrieve one or several Salesforce objects
- Update Object(s) - Updates one Salesforce object with a list of objects identifiers in parameters

Parameters are:

- Type of object you want to retrieve (e.g.: Account)
- List of objects identifiers
- List of fields of the object (e.g.: Name, Phone)
- Update object - Update a Salesforce object.

Parameters are:

- Type of object you want to update (e.g.: Account)
- Object identifier
- Map of fields of the object to update (e.g.: Name = MyNewName, Phone = 1234)

A Salesforce account is necessary. See the [Salesforce web site](https://www.salesforce.com) for details.

All connectors have these required parameters in common:

- Username
- Password
- Security Token (it could be obtained via the Salesforce user interface)

There are also optional parameters:

- Endpoint: Endpoint URL
- Authentication endpoint: Endpoint configuration
- Service endpoint: Service endpoint URL
- REST endpoint: REST endpoint URL
- Proxy (if you use a proxy)
- Proxy port
- Proxy name
- Proxy password
- Timeout: timeout
- Read timeout
