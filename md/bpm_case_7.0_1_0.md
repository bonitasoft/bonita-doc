## case

### Description

Case is an instance of a process. When you start a process, it creates a case.

### Identifier

ID of the Object: a long value

### Representation

    {
    "id":"_the identifier of the case_",
    "end_date":"_the date set when the case is closed_",
    "failedFlowNodes":"_count of failed flow nodes if parameter n=failedFlowNodes is given_",
    "startedBySubstitute":"_the identifier of the substitute user (as Process manager or Administrator) who started the process. It can be also the substitute user if d=startedBySubstitute is given._",
    "start":"_the starting date of the case_",
    "activeFlowNodes":"_count of active flow nodes if parameter n=activeFlowNodes is given_",
    "state":"_state: an enum that represent the state of the case, it can be INITIALIZING, STARTED, SUSPENDED, CANCELLED, ABORTED, COMPLETING, COMPLETED, ERROR, ABORTING_",
    "rootCaseId":"_the identifier of the container of the case_",
    "started_by":"_the identifier of the user who started the case_",
    "processDefinitionId":"_the identifier of the process related of the case_",
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

* POST - Create a case
* GET - Read a case or search for a case
* DELETE - Remove a case

### Read a case

You can get a case by using its identifier. Request url
http://../API/bpm/case/_id_

Request method

GET

Request payload
empty

Response payload

A JSON representation of the case

#### URL parameters

* id: the identifier of the case.
* d: the list of attributes for which you want to perform a deploy, that is, retrieve the full object instead of just its ID.
Available values: started\_by, startedBySubstitute, processDefinitionId.
* n: count of related resources. Available values: activeFlowNodes, failedFlowNodes.

#### Example
Request url
http://../API/bpm/case/1

Response payload

    {
        "id": "1",
        "end_date": "",
        "failedFlowNodes": "9",
        "startedBySubstitute": {
            "last_connection": "2014-12-01 10:46:03.750",
            "created_by_user_id": "-1",
            "creation_date": "2014-11-27 17:53:46.516",
            "id": "4",
            "icon": "/default/icon_user.png",
            "enabled": "true",
            "title": "Mr",
            "manager_id": "3",
            "job_title": "Human resources benefits",
            "userName": "walter.bates",
            "lastname": "Bates",
            "firstname": "Walter",
            "password": "",
            "last_update_date": "2014-11-27 17:53:46.516"
        },
        "start": "2014-11-27 17:55:00.906",
        "activeFlowNodes": "9",
        "state": "started",
        "rootCaseId": "1",
        "started_by":{
            "last_connection": "",
            "created_by_user_id": "-1",
            "creation_date": "2014-11-27 17:53:46.509",
            "id": "3",
            "icon": "/default/icon_user.png",
            "enabled": "true",
            "title": "Mrs",
            "manager_id": "1",
            "job_title": "Human resource manager",
            "userName": "helen.kelly",
            "lastname": "Kelly",
            "firstname": "Helen",
            "password": "",
            "last_update_date": "2014-11-27 17:53:46.509"
        },
        "processDefinitionId":
            "id": "5777042023671752656",
            "icon": "",
            "displayDescription": "",
            "deploymentDate": "2014-11-27 17:54:37.774",
            "description": "",
            "activationState": "ENABLED",
            "name": "Pool2",
            "deployedBy": "4",
            "displayName": "Pool 2",
            "actorinitiatorid": "1",
            "last_update_date": "2014-11-27 17:54:43.621",
            "configurationState": "RESOLVED",
            "version": "2.0"
        },
        "last_update_date": "2014-11-27 17:55:00.906",
        "searchIndex1Label":"mySearchIndex1Label",
        "searchIndex2Label":"mySearchIndex2Label",
        "searchIndex3Label":"mySearchIndex3Label",
        "searchIndex4Label":"mySearchIndex4Label",
        "searchIndex5Label":"mySearchIndex5Label",
        "searchIndex1Value":"mySearchIndex1Value",
        "searchIndex2Value":"mySearchIndex2Value",
        "searchIndex3Value":"mySearchIndex3Value",
        "searchIndex4Value":"mySearchIndex4Value",
        "searchIndex5Value":"mySearchIndex5Value"
    }

### Search for a case

### URL
_http://localhost:8080/API/bpm/case?p=0&c=10_

### URL parameters

* _Long_ p: page index of the result
* _String_ f: filter of the search, beware you cannot use team\_manager\_id and supervisor\_id at the same time
* _String_ o: the sort o
* _Long_ c: the number of result returned
* _String_ d: a string and a resource identifier associated to deploy a resource. available values (started\_by, startedBySubstitute, processDefinitionId)
Request URL
http://../API/bpm/case/

Request Method
GET

Response

JSON representations of matching cases

#### URL parameters

* p: start index of resultset
* d: the list of attributes for which you want to perform a deploy (that is, retrieve the full object instead of just its ID):
  * started\_by
  * startedBySubstitute
  * processDefinitionId)
* n: count of related resource. Available values: activeFlowNodes, failedFlowNodes

#### Response codes

200, 500

#### Example
Request URL
http://../API/bpm/case/

Request Method
GET

Response

    [
        {
            "id": "1",
            "end_date": "",
            "failedFlowNodes": "9",
            "startedBySubstitute":{
                "last_connection": "2014-12-01 10:46:03.750",
                "created_by_user_id": "-1",
                "creation_date": "2014-11-27 17:53:46.516",
                "id": "4",
                "icon": "/default/icon_user.png",
                "enabled": "true",
                "title": "Mr",
                "manager_id": "3",
                "job_title": "Human resources benefits",
                " userName": "walter.bates",
                "lastname": "Bates",
                "firstname": "Walter",
                "password": "",
                "last_update_date": "2014-11-27 17:53:46.516"
            },
            "start": "2014-11-27 17:55:00.906",
            "activeFlowNodes": "9",
            "state": "started",
            "rootCaseId": "1",
            "started_by":{
                "last_connection": "",
                "created_by_user_id": "-1",
                "creation_date": "2014-11-27 17:53:46.509",
                "id": "3",
                "icon": "/default/icon_user.png",
                "enabled": "true",
                "title": "Mrs",
                "manager_id": "1",
                "job_title": "Human resource manager",
                "userName": "helen.kelly",
                "lastname": "Kelly",
                "firstname": "Helen",
                "password": "",
                "last_update_date": "2014-11-27 17:53:46.509"
            },
            "processDefinitionId":{
                "id": "5777042023671752656",
                "icon": "",
                "displayDescription": "",
                "deploymentDate": "2014-11-27 17:54:37.774",
                "description": "",
                "activationState": "ENABLED",
                "name": "Pool2",
                "deployedBy": "4",
                "displayName": "Pool 2",
                "actorinitiatorid": "1",
                "last_update_date": "2014-11-27 17:54:43.621",
                "configurationState": "RESOLVED",
                "version": "2.0"
            },
            "last_update_date": "2014-11-27 17:55:00.906",
            "searchIndex1Label":"case1SearchIndex1Label",
            "searchIndex2Label":"case1SearchIndex2Label",
            "searchIndex3Label":"case1SearchIndex3Label",
            "searchIndex4Label":"case1SearchIndex4Label",
            "searchIndex5Label":"case1SearchIndex5Label",
            "searchIndex1Value":"case1SearchIndex1Value",
            "searchIndex2Value":"case1SearchIndex2Value",
            "searchIndex3Value":"case1SearchIndex3Value",
            "searchIndex4Value":"case1SearchIndex4Value",
            "searchIndex5Value":"case1SearchIndex5Value"
        },
        {
            "id": "2",
            "end_date": "",
            "failedFlowNodes": "0",
            "startedBySubstitute":{
                "last_connection": "2014-12-01 10:46:03.750",
                "created_by_user_id": "-1",
                "creation_date": "2014-11-27 17:53:46.516",
                "id": "4",
                "icon": "/default/icon_user.png",
                "enabled": "true",
                "title": "Mr",
                "manager_id": "3",
                "job_title": "Human resources benefits",
                "userName": "walter.bates",
                "lastname": "Bates",
                "firstname": "Walter",
                "password": "",
                "last_update_date": "2014-11-27 17:53:46.516"
            },
            "start": "2014-11-27 17:56:28.596",
            "activeFlowNodes": "1",
            "state": "started",
            "rootCaseId": "2",
            "started_by":{
                "last_connection": "",
                "created_by_user_id": "-1",
                "creation_date": "2014-11-27 17:53:46.509",
                "id": "3",
                "icon": "/default/icon_user.png",
                "enabled": "true",
                "title": "Mrs",
                "manager_id": "1",
                "job_title": "Human resource manager",
                "userName": "helen.kelly",
                "lastname": "Kelly",
                "firstname": "Helen",
                "password": "",
                "last_update_date": "2014-11-27 17:53:46.509"
            },
            "processDefinitionId":{
                "id": "4948193168427526005",
                "icon": "",
                "displayDescription": "",
                "deploymentDate": "2014-11-27 17:56:10.920",
                "description": "",
                "activationState": "ENABLED",
                "name": "ConnectorFailed",
                "deployedBy": "4",
                "displayName": "ConnectorFailed",
                "actorinitiatorid": "2",
                "last_update_date": "2014-11-27 17:56:12.470",
                "configurationState": "RESOLVED",
                "version": "1.0"
            },
            "last_update_date": "2014-11-27 17:56:28.596",
            "searchIndex1Label":"case2SearchIndex1Label",
            "searchIndex2Label":"case2SearchIndex2Label",
            "searchIndex3Label":"case2SearchIndex3Label",
            "searchIndex4Label":"case2SearchIndex4Label",
            "searchIndex5Label":"case2SearchIndex5Label",
            "searchIndex1Value":"case2SearchIndex1Value",
            "searchIndex2Value":"case2SearchIndex2Value",
            "searchIndex3Value":"case2SearchIndex3Value",
            "searchIndex4Value":"case2SearchIndex4Value",
            "searchIndex5Value":"case2SearchIndex5Value"
        } 
    ]

### Create a case
Request url
http://../API/bpm/case

Request method

POST

Request payload

The process definition id, in JSON

Response payload

The JSON representation of a case resource

#### Response codes

200, 500

#### Example 1: Create a case without variables
Request url
http://../API/bpm/case

Request method

POST

Request payload

    {
    "processDefinitionId":"5777042023671752656"
    }

Response payload

    {
    "id": "1001",
    "end_date": "",
    "startedBySubstitute": "4",
    "start": "2014-12-01 14:36:23.732",
    "state": "started",
    "rootCaseId": "1001",
    "started_by": "4",
    "processDefinitionId": "5777042023671752656",
    "last_update_date": "2014-12-01 14:36:23.732"
    }

#### Example 2: Create a case with variables
Request url
http://../API/bpm/case

Request method

POST

Request payload

    {  
       "processDefinitionId":"5777042023671752656",
       "variables":[  
          {  
             "name":"stringVariable",
             "value":"aValue"
          },
          {  
             "name":"dateVariable",
             "value":349246800000
          },
          {  
             "name":"numericVariable",
             "value":5
          }
       ]
    }

Response payload

    {  
       "id":"1",
       "end_date":"",
       "startedBySubstitute": "1",
       "start":"2013-10-14 12:10:24.996",
       "state":"started",
       "rootCaseId": "1",
       "started_by":"1",
       "processDefinitionId":"5777042023671752656",
       "last_update_date":"2013-10-14 12:10:24.996"
    }

### Delete a case
Request url
http://../API/bpm/case

Request method

DELETE

Request payload

The case id, in JSON

Response payload
empty

#### Response code

200

### Retrieve the case context
Request url
http://../API/bpm/case/_caseId_/context

Request method

GET

Request payload

empty

Response payload 

A context object

#### Example

Get the context of the case with id 2\.
Request url
GET |/API/bpm/case/2/context

Response

    {  
       "businessData_ref":{  
          "name":"myBusinessDate",
          "type":"com.company.model.BusinessObject1",
          "link":"API/bdm/businessData/com.company.model.BusinessObject1/2",
          "storageId":2,
          "storageId_string":"2"
       },
       "document1_ref":{  
          "id":1,
          "processInstanceId":3,
          "name":"myDocument",
          "author":104,
          "creationDate":1434723950847,
          "fileName":"TestCommunity-1.0.bos",
          "contentMimeType":null,
          "contentStorageId":"1",
          "url":"documentDownload?fileName=TestCommunity-1.0.bos&contentStorageId=1",
          "description":"",
          "version":"1",
          "index":-1,
          "contentFileName":"TestCommunity-1.0.bos"
       }
    }