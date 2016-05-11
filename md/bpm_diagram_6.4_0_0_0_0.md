## diagram

### Description

Use the diagram resource to access the process diagram xml representation. This is necessary for drawing the diagram.

### Identifier

Simple, the ID of the process for which you want download the diagram

### Parameters

None

### Representation

The XML encoding of the diagram.

### Methods

The methods used for this resource are:

* GET - Retrieve the XML definition of the diagram

### Retrieve a process diagram xml file 

Example: Retrieve the xml file of the diagram of the process with the id 5690914473452389591
Method
GET

URL
`http://localhost:8080/bonita/API/bpm/diagram/5690914473452389591`

Payload
empty

Response
Raw XML file containing the diagram definition