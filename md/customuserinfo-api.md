# Customuserinfo API

## Description

Use the customuserinfo API for managing custom user definitions. Three resources are used: customuserinfo/definition, customuserinfo/value, and customuserinfo/user.

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation of customuserinfo/definition

```json
{
  "id":"_id of definition_",
  "description":"_definition description_",
  "name":"_definition name_"
}
```

### Representation of customuserinfo/value

```json
{
  "userId":"_id of user_",
  "value":"_content of the value_",
  "definitionId":"_id of definition_"
}
```

### Representation of customuserinfo/user

```json
{
  "userId":"_id of user_",
  "value":"_content of the value_",
  "definitionId":{
    "id" : "_id of definition_",
    "description" : "_definition description_",
    "name" : "_definition name_"
  }
}
```

## Methods

The methods used for these resources are:

* GET
* POST
* PUT
* DELETE

### Add a new definition

Use the method POST to add a new definition.

* **URL**  
  `http://localhost:8080/bonita/API/customuserinfo/definition`  
  _Example_: Add a definition called `skill`.
* **Method**  
  `POST`
* **Data Params**  
* **Request Payload**  
  JSON representation of definition, without id
  ```json
  {
    "name": "skill",
    "description": "code slayer"
  }
  ```
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    JSON representation of complete definition including generated id  
    ```json
    {
      "id":"101",
      "description":"code slayer",
      "name":"skill"
    }
    ```

### Delete a definition

Use the DELETE method to delete an existing definition.

* **URL**  
  `http://localhost:8080/bonita/API/customuserinfo/definition/`  
* **Method**  
  `DELETE`

### Associate definitions to users

Use a PUT method to associate users with custom information.

* **URL**  
  `http://localhost:8080/bonita/API/customuserinfo/value/:userId/:definitionId`  
  _Example_: Associate the user with id = 1 with the definition with id = 2\. `http://localhost:8080/bonita/API/customuserinfo/value/1/2`
* **Method**  
  `PUT`
* **Request Payload**  
  ```json
  {
    "value":"customUserInfoValue"
  }
  ```
* **Success Response**  
  * **Code**: 200

### List the custom user information

Use a GET method to search for definitions.

There are no filters, and no search terms. All the definitions are returned.

* **URL**  
  `/API/customuserinfo/definition`  
* **Method**  
  `GET`
* **Data Params**  
  * c: number of result per page
  * p: page number
* **Success Response**  
  * **Code**: 200
  * **Payload**:  
    An array of definition objects

### Search custom user info

Use a GET method to search for custom user information.

* **URL**  
  `/API/customuserinfo/user`  
  _Example_: http://localhost:8080/bonita/API/customuserinfo/user?c=10&p=0&f=userId=1
* **Method**  
  `GET`
* **Data Params** (Required)   
  * c: number of result per page
  * p: page number
  * f : filter to apply on results with the format `f={filter\_name}={filter\_value}`  
    _Example_: `f=userId=id`
* **Success Response**  
  An array of customuserinfo/user objects
  * **Code**: 200

