## archivedCase

### Description

A completed instance of a process. 

### Identifier

The ID of the archived case (a long value).

### Representation

    {
    "id":"_the identifier of the archived case_",
    "end_date":"_the date set when the case was archived_",
    "startedBySubstitute":"_the id of the user_",  
    
    "sourceObjectId":"_the id of the case before it was archived_"
    "start":"_the stard date of the initial case_", 
    "state":"_the state of the archived case_", 
    "rootCaseId":"_the id of the case before it was archived_", 
    "started_by":"_id of the user who start the case_", 
    "archivedDate":"_the date set when the case was archived_", 
    "processDefinitionId":"_the id of the process related to this archived case_", 
    "last_update_date":"_the date of the last update done on the case_",
    "searchIndex1Label":"_the 1st search index label (from 6.5, in Subscription editions only)_",
    "searchIndex2Label":"_the 2nd search index label (from 6.5, in Subscription editions only)_",
    "searchIndex3Label":"_the 3rd search index label (from 6.5, in Subscription editions only)_",
    "searchIndex4Label":"_the 4th search index label (from 6.5, in Subscription editions only)_",
    "searchIndex5Label":"_the 5th search index label (from 6.5, in Subscription editions only)_",
    "searchIndex1Value":"_the 1st search index value (from 6.5, in Subscription editions only)_",
    "searchIndex2Value":"_the 2nd search index value (from 6.5, in Subscription editions only)_",
    "searchIndex3Value":"_the 3rd search index value (from 6.5, in Subscription editions only)_",
    "searchIndex4Value":"_the 4th search index value (from 6.5, in Subscription editions only)_",
    "searchIndex5Value":"_the 5th search index value (from 6.5, in Subscription editions only)_"
    }
    

### Methods

The methods used for this resource are:

* GET - Read a resource or search for a resource
* DELETE - Remove a resource

### Read an archived case

You can get an archived case by using its identifier. An archive case is linked to a case with the key. Request url
/API/bpm/archivedCase/id

Request method

GET

Request payload

empty

Response payload

A JSON representation of the archived case resource

#### Response codes

200, 404, 500

#### Example
Request url
/API/bpm/archivedCase/9

Response payload

    
    {
      "id": "9",
      "end_date": "2014-10-22 10:57:00.299",
      "startedBySubstitute": "4",
      "sourceObjectId": "3",
      "start": "2014-10-22 10:56:53.415",
      "state": "completed",
      "rootCaseId": "3",
      "started_by": "4",
      "archivedDate": "2014-10-22 10:57:00.299",
      "processDefinitionId": "6054482369194211518",
      "last_update_date": "2014-10-22 10:57:00.299"
      "searchIndex1Label":"case9SearchIndex1Label",
      "searchIndex2Label":"case9SearchIndex2Label",
      "searchIndex3Label":"case9SearchIndex3Label",
      "searchIndex4Label":"case9SearchIndex4Label",
      "searchIndex5Label":"case9SearchIndex5Label",
      "searchIndex1Value":"case9SearchIndex1Value",
      "searchIndex2Value":"case9SearchIndex2Value",
      "searchIndex3Value":"case9SearchIndex3Value",
      "searchIndex4Value":"case9SearchIndex4Value",
      "searchIndex5Value":"case9SearchIndex5Value"
    }
    

### Search archived cases

You can search cases.
Request url
/API/bpm/archivedCase

Request method

GET

Request payload

empty

Response payload

A JSON representation of an array of archived case resources

#### Response codes

200, 404, 500

#### Example
Request url
/API/bpm/archivedCase?\[search parameters\]

Response payload

    [
      {
        "id": "3002",
        "end_date": "2014-10-22 15:21:10.129",
        "startedBySubstitute": "4",
        "sourceObjectId": "6",
        "start": "2014-10-22 11:47:28.859",
        "state": "completed",
        "rootCaseId": "6",
        "started_by": "4",
        "archivedDate": "2014-10-22 15:21:10.129",
        "processDefinitionId":
          {
            "id": "5652578116304089592",
            "icon": "",
            "displayDescription": "",
            "deploymentDate": "2014-10-22 11:42:26.644",
            "description": "",
            "activationState": "ENABLED",
            "name": "données",
            "deployedBy": "4",
            "displayName": "données",
            "actorinitiatorid": "4",
            "last_update_date": "2014-10-22 11:42:45.672",
            "configurationState": "RESOLVED",
            "version": "2.0"
          },
          "last_update_date": "2014-10-22 15:21:10.129",
          "searchIndex1Label":"case6SearchIndex1Label",
          "searchIndex2Label":"case6SearchIndex2Label",
          "searchIndex3Label":"case6SearchIndex3Label",
          "searchIndex4Label":"case6SearchIndex4Label",
          "searchIndex5Label":"case6SearchIndex5Label",
          "searchIndex1Value":"case6SearchIndex1Value",
          "searchIndex2Value":"case6SearchIndex2Value",
          "searchIndex3Value":"case6SearchIndex3Value",
          "searchIndex4Value":"case6SearchIndex4Value",
          "searchIndex5Value":"case6SearchIndex5Value"
      },
      {
        "id": "9",
        "end_date": "2014-10-22 10:57:00.299",
        "startedBySubstitute": "4",
        "sourceObjectId": "3",
        "start": "2014-10-22 10:56:53.415",
        "state": "completed",
        "rootCaseId": "3",
        "started_by": "4",
        "archivedDate": "2014-10-22 10:57:00.299",
        "processDefinitionId":
          {
            "id": "6054482369194211518",
            "icon": "",
            "displayDescription": "",
            "deploymentDate": "2014-10-22 10:55:24.219",
            "description": "",
            "activationState": "ENABLED",
            "name": "PoolTestEntry",
            "deployedBy": "4",
            "displayName": "PoolTestEntry",
            "actorinitiatorid": "1",
            "last_update_date": "2014-10-22 10:55:31.178",
            "configurationState": "RESOLVED",
            "version": "1.0"
          },
        "last_update_date": "2014-10-22 10:57:00.299",
        "searchIndex1Label":"case9SearchIndex1Label",
        "searchIndex2Label":"case9SearchIndex2Label",
        "searchIndex3Label":"case9SearchIndex3Label",
        "searchIndex4Label":"case9SearchIndex4Label",
        "searchIndex5Label":"case9SearchIndex5Label",
        "searchIndex1Value":"case9SearchIndex1Value",
        "searchIndex2Value":"case9SearchIndex2Value",
        "searchIndex3Value":"case9SearchIndex3Value",
        "searchIndex4Value":"case9SearchIndex4Value",
        "searchIndex5Value":"case9SearchIndex5Value"
      }
    ]
    

### Remove an archived case

You can delete an archived case by using its identifier. An archived case is linked to a case with the key. Request url
/API/bpm/archivedCase/id

Request method

GET

Request payload

empty

Response payload

empty

#### Response codes

200, 500

#### Example
Request url
/API/bpm/archivedCase/9

#### Response codes

200, 500