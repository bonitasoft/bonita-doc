# Form API

## Form mapping resource

### Description

This resource specifies the mapping of a form to a process or a task. The mapping indicates the technology used to create the form, in the "target" attribute. Possible values are:

* `URL` - an external URL
* `INTERNAL` - a custom page ID
* `LEGACY` - means that the old form application is used for old processes
* `UNDEFINED` - when the form is not present in the definition but is required
* `NONE` - when there is no form needed for the process instantiation or task execution

Having any UNDEFINED mapping prevents the process from being resolved.

### Identifier

The ID of the form mapping (a long value).

### Representation

```json
{
  "id": "_the form mapping identifier (long)_",
  "processDefinitionId": "_the process identifier (long) related to this form mapping_",
  "type": "_the form mapping type (string) - possible value in [PROCESS_START, PROCESS_OVERVIEW, TASK]_",
  "target": "_the target (string) - possible value in [URL, INTERNAL, LEGACY, UNDEFINED, NONE]_",
  "task": "_the task name (string) when type is TASK - null otherwise_",
  "pageId": "_the custom page identifier (long) when type is INTERNAL - null otherwise_",
  "pageMappingKey": "_the page mapping key part (string) used to generate the form URL_",
  "lastUpdateBy": "_the identifier (long) of the user who last updated this form mapping - 0 if no update has been done yet_",
  "lastUpdateDate": "_the last update date in milliseconds (long) - null if no update has been done yet_",
  "url": "_the external URL (string) when type is URL - null otherwise_"
}
```

### Methods

The methods used for this resource are:

* GET - Search for a form mapping
* PUT - Update a form mapping

### Search a form mapping

Request URL
* **URL**  
  `/API/form/mapping`  
  _Example_: `/API/form/mapping?p=0&c=10&f=processDefinitionId=7281286536417002543&f=type=TASK`
* **Method**  
  `GET`
* **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available to search form mappings.  
  The following filters can be applied while searching form mappings:
  * `f=processDefinitionId={long}` - get form mappings of a specific process definition
  * `f=type=PROCESS_START` - get the process start form mapping. Example: `http://localhost:8080/bonita/API/form/mapping?c=1&p=0&f=processDefinitionId=123456&f=type=PROCESS_START`
  * `f=type=PROCESS_OVERVIEW` - get the process overview form mapping. Example: `http://localhost:8080/bonita/API/form/mapping?c=10&p=0&f=processDefinitionId=123456&f=type=PROCESS_OVERVIEW`
  * `f=type=TASK` - get the task form mapping. Example: `http://localhost:8080/bonita/API/form/mapping?c=10&p=0&f=processDefinitionId=123456&f=type=TASK`
* **Success Response**  
  JSON representation of an array of form mappings
  * **Code**: 200
  * **Payload**:  
    ```json
    [
      {
        "id": 4,
        "processDefinitionId": 7281286536417002543,
        "type": "TASK",
        "target": "INTERNAL",
        "task": "Give Feedback",
        "pageId": 101,
        "pageMappingKey": "taskInstance/myProcess/1.0/Give Feedback"
        "lastUpdatedBy": 4,
        "lastUpdateDate": 1425466666191,
        "url": null
      },
      {
        "id": 5,
        "processDefinitionId": 7281286536417002543,
        "type": "TASK",
        "target": "URL",
        "task": "Validate Feedback",
        "pageId": null,
        "pageMappingKey": "taskInstance/myProcess/1.0/Validate Feedback",
        "lastUpdatedBy": 4,
        "lastUpdateDate": 1425295012666,
        "url": "http://customerportal.bonitasoft.com"
      }
    ]
    ```

### Update a form mapping (Efficiency, Performance and Entreprise Editions)

* **URL**  
  `/API/form/mapping/:id`  
* **Method**  
  `PUT`
* **Request Payload**  
  JSON representation of the form mapping attribute to update - `{"pageId": (long)}` or `{"url": (string)}` or `{}` to set the mapping type to NONE
  ```json
  {
    "url": "http://myformapp.com/form"
  }
  ```
* **Success Response**  
  * **Code**: 200

