## archivedCaseDocument

### Description

Use the archived case document resource to access previous document versions for active and archived cases

### Identifier

The ID of the document (a long value).

### Representation

    {
    "id":"_archivedDocumentId_", 
    "creationDate":"_date and time of the original document creation_", 
    "author":"_submittorUserId_", 
    "index":"_index in a list of documents. if -1 it represents a single document_", 
    "contentMimetype":"_MIMEtype_", 
    "caseId":"_caseId_", 
    "contentStorageId":"_storageId_", 
    "isInternal":"_true | false_", 
    "description":"_ description_", 
    "name":"_name_", 
    "fileName":"_filename_", 
    "submittedBy":"_submittorUserId_", 
    "url":"_urlForDownload_", 
    "version":"_version_", 
    "sourceObjectId":"_originalDocumentId_", 
    "archivedDate":"_date and time of the archived document creation_"
    }
    

### Methods

The methods used for this resource are:

* GET - Read a resource
* DELETE - Remove the physical file related to the specified id but keep the mapping for audit purposes

### Search for a document

You can use a single GET method to return all the documents that match the specified filters and [search parameters](rest-api-overview.md).
Request url
http://../API/bpm/archivedCaseDocument?parameters

Request method

GET

Request payload

empty

Response payload

an archived document object for each matching document

#### Parameters

It is possible to filter on the following parameters: sourceObjectId, caseId, archivedCaseId, submittedBy, name, description.

* sourceObjectId="id": search for documents by specifying the original document id. 
This is useful if you know the id of a caseDocument and you wish to retrieve all its previous versions..
* caseId="id": search for documents with the specified open case id.
* archivedCaseId="id": search for documents with the specified archvied case id.
* submittedBy="id": search for documents that were submitted by the user with the specified identifier.
* name="string": search for documents with names that contain _`string`_. 
Depending on the setting for [word-based search](using-list-and-search-methods.md), the search returns documents with _`string`_ at the start of the name or the start of a word in the name.
* description="string": search for documents with descriptions that contain _`string`_. 
Depending on the setting for [word-based search](using-list-and-search-methods.md), the search returns documents with _`string`_ at the start of the description or the start of a word in the description.

#### Examples

Example 1: List all versions of a simple document (knowing its current version Id)
Request url
GET |/API/bpm/archivedCaseDocument?c=10&p=0&f=sourceObjectId=1

Response payload
`
    
    [
    {
       "id":"1",
       "creationDate":"2014-10-09 16:39:52.472", 
       "author":"1",
       "index":"0",
       "contentMimetype":"text/plain",
       "caseId":"1",
       "contentStorageId":"1",
       "isInternal":"true",
       "description":"",
       "name":"myDoc",
       "fileName":"test1.txt",
       "submittedBy":"1",
       "url":"documentDownload?fileName=test1.txt&contentStorageId=1",
       "version":"1",
       "sourceObjectId":"1",
       "archivedDate":"2014-10-09 17:39:52.473"
    },
    {
       "id":"2", 
       "creationDate":"2014-10-09 16:39:52.473", 
       "author":"1", 
       "index":"1", 
       "contentMimetype":"text/plain", 
       "caseId":"1", 
       "contentStorageId":"2", 
       "isInternal":"true", 
       "description":"", 
       "name":"myDoc", 
       "fileName":"test2.txt", 
       "submittedBy":"1", 
       "url":"documentDownload?fileName=test2.txt&contentStorageId=2", 
       "version":"2", 
       "sourceObjectId":"1",
       "archivedDate":"2014-10-09 18:39:52.473"
    },
    {
       "id":"3", 
       "creationDate":"2014-10-09 16:39:52.473", 
       "author":"1", 
       "index":"2", 
       "contentMimetype":"text/plain", 
       "caseId":"1", 
       "contentStorageId":"3", 
       "isInternal":"true", 
       "description":"", 
       "name":"myDoc", 
       "fileName":"test3.txt", 
       "submittedBy":"1", 
       "url":"documentDownload?fileName=test3.txt&contentStorageId=3", 
       "version":"3",
       "sourceObjectId":"1", 
       "archivedDate":"2014-10-09 19:39:52.473" 
    }
    ]
    

`

Example 2: List all versions of a list of document (knowing its name)
Request url
GET |/API/bpm/archivedCaseDocument?c=10&p=0&f=name=MyDocList

Response payload
as previous example but for documents with name=MyDocList

Example 3: List all versions of all documents of a given case (knowing its id)
Request url
GET |/API/bpm/archivedCaseDocument?c=10&p=0&f=caseId=1

Response payload
as previous example but for documents with caseId=1

Example 4: List all versions of all document of an archived case (knowing its id)
Request url
GET |/API/bpm/archivedCaseDocument?c=10&p=0&f=archivedCaseId=1

Response payload
as previous example but for documents with archivedCaseId=1

Example 5: Combine different filters, for example list all versions of a list declared in a case (knowing list name and case id)
Request url
GET |/API/bpm/archivedCaseDocument?c=10&p=0&f=caseId=1&f=name=myDocList&o=index ASC

Response payload
The list of documents of MyDocList which is delcared in the caseId=1

### Delete a document content

Delete the document content with id 3
Method
DELETE

URL
`http://localhost:8080/bonita/API/bpm/archivedCaseDocument/3`