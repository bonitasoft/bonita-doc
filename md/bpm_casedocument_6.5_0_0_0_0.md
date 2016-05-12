## caseDocument

### Description

Use the case document resource to access a document in an active case. For archived cases and previous document versions use archivedCaseDocument.

Note: The REST methods for handling documents have been updated in {{ var\_product }} 6.4 and an item is deprecated:

* `author` in the payload is deprecated: use `submittedBy`

### Identifier

The ID of the document (a long value).

### Representation

    {
    "id":"_documentId_",
    "creationDate":"_date and time_",
    "author":"_submittorUserId_",
    "index":"_index in a list of documents, or -1 for a single document_",
    "contentMimetype":"_MIMEtype_",
    "caseId":"_caseId_", 
    "contentStorageId":"_storageId_", 
    "isInternal":"_true | false_", 
    "description":"_ description_", 
    "name":"_name_", 
    "fileName":"_filename_", 
    "submittedBy":"_submittorUserId_", 
    "url":"_urlForDownload_", 
    "version":"_version_" 
    }
    

### Methods

The methods used for this resource are:

* POST - Create a resource
* GET - Read a resource
* PUT - Update a resource
* DELETE - Remove a resource

### Add a document to a case

Use a POST method to add a document to a case. You can upload a document from the local file system or by URL. Specify the case id and the document name in the payload. 
The document description is optional: if you do not specify a description, the description in the response is empty. The response contains a version, which is managed automatically.
You cannot currently retrieve a specific version of a document, only the most recent version. To retrieve earlier versions of a caseDocument, use the archivedCaseDocument resource.

Example 1: Upload `doc.jpg` from the tenant temporary folder of the bonita home to case 1 with the display name "Doc 1" and renaming the file into "document\_1.jpg":
Method
POST

URL
`http://localhost:8080/bonita/API/bpm/caseDocument`

Payload

    
    {
    "caseId": "1",
    "file": "doc.jpg",
    "name": "Doc 1",
    "fileName": "document_1.jpg",
    "description": "draft"
    }
    

Response

    
    {
    "id":"3",
    "creationDate":"2014-10-09 16:45:36.658",
    "author":"1",
    "index":"-1",
    "contentMimetype":"application/octet-stream",
    "caseId":"1",
    "contentStorageId":"4",
    "isInternal":"true",
    "description":"draft,
    "name":"Doc 1",
    "fileName":"document_1.jpg",
    "submittedBy":"1",
    "url":"documentDownload?fileName=document_1.jpg&contentStorageId=4",
    "version":"1"
    }
    

In this example, `isInternal` is set to `true` because the the document object contains the content directly. 
In Example 2, `isInternal` is set to `false` because the document is specified by URL so the document object contains a reference to the content, not the content itself.

Example 2: Upload `train_receipt.png` from my cloud drive to case 1 with the name "Train receipt":
Method
POST

URL
`http://localhost:8080/bonita/API/bpm/caseDocument`

Payload

    
    {
    "caseId" : "1",
    "url" : "http://cloud.storage.com/sites/chris/expenses/july_2014/train_receipt.png",
    "name" : "Train receipt"
    }
    

Response

    
    {
    "id":"4",
    "creationDate":"2014-10-09 16:45:36.658",
    "author":"1",
    "index":"-1",
    "contentMimetype":"image/png",
    "caseId":"1",
    "contentStorageId":"4",
    "isInternal":"false",
    "description":"draft,
    "name":"Train receipt",
    "fileName":"train_receipt.png",
    "submittedBy":"1",
    "url":"http://cloud.storage.com/sites/chris/expenses/july_2014/train_receipt.png",
    "version":"1"
    }
    

### Get a document from a case

Use a GET method to get a document from a case. First you get the document information, then you download the content. 
To get the document information, specify the document id in the URL. The document id is created when you upload a document to a case. There is no payload.

Get information about the document with id 3:
Method
GET

URL
`http://localhost:8080/bonita/API/bpm/caseDocument/3`

Response

    
    {
    "id":"3",
    "creationDate":"2014-10-09 16:45:36.658",
    "author":"1",
    "index":"-1",
    "contentMimetype":"application/octet-stream",
    "caseId":"1",
    "contentStorageId":"4",
    "isInternal":"true",
    "description":"draft,
    "name":"Doc 1",
    "fileName":"doc.jpg",
    "submittedBy":"1",
    "url":"documentDownload?fileName=doc.jpg&contentStorageId=4",
    "version":"1"
    }
    

The response includes the "url" to use to download the content. Call the documentDownload servlet with this URL: 
`http://localhost:8080/bonita/portal/documentDownload?fileName=doc.jpg&contentStorageId=4`.

### Update a document in a case

You update a document in a case by uploading a new version of the document. Use a PUT method to update a document in a case. 
You can upload a document version from the local file system or by URL. 
The document name will be used in all the cases of the process, but the combination of case id and document name is unique.

In the URL, you specify to supply the document id. This is included in the response when you first [add a document to a case](#upload_casedoc).

The response to PUT methods is the same as for POST methods.

Example 1: Update the document ExpensesPolicy in case 1 by uploading `Expense policy rev2.pdf` from the tenant temporary folder of the bonita home. The document id, 17 in this example, is specified in the URL. The description is optional. The filename allows to rename the file into "revision2.pdf" Method
PUT

URL
`http://localhost:8080/bonita/API/bpm/caseDocument/17`

Payload

    
    {
    "file" : "Expense policy rev2.pdf",
    "description" : "updated version of document"
    "fileName": "revision2.pdf",
    }
    

Example 2: Update the document ExpensesPolicy in case 1 by uploading `Expense policy rev2.pdf` from my cloud drive. The document id is 17\.
Method
PUT

URL
`http://localhost:8080/bonita/API/bpm/caseDocument/17`

Payload

    
    {
    "url" : "http://cloud.storage.com/sites/chris/expenses/july_2014/Expense policy rev2.pdf"
    }
    

  
### Search for a document

You can use a single GET method to return all the documents that match the specified filters and [search parameters](rest-api-overview.md).
Request url
http://../API/bpm/caseDocument?parameters

Request method

GET

Request payload

empty

Response payload

a document object for each matching document

#### Parameters

It is possible to filter on three parameters: submittedBy, name and description.

* submittedBy="id": search for documents that were submitted by the user with the specified identifier.
* name="string": search for documents with names that contain _`string`_. 
Depending on the setting for [word-based search](using-list-and-search-methods.md), the search returns documents with _`string`_ at the start of the name or the start of a word in the name.
* description="string": search for documents with descriptions that contain _`string`_. 
Depending on the setting for [word-based search](using-list-and-search-methods.md), the search returns documents with _`string`_ at the start of the description or the start of a word in the description.

#### Example with filter parameter

Find all documents with a document name equal to doc1:
Request url
GET |/API/bpm/caseDocument?p=0&c=10&f=name=doc1

Response payload

    
    {
    "id":"3",
    "creationDate":"2014-10-09 16:45:36.658",
    "author":"1",
    "index":"-1",
    "contentMimetype":"application/octet-stream",
    "caseId":"1",
    "contentStorageId":"4",
    "isInternal":"true",
    "description":"draft,
    "name":"doc1",
    "fileName":"doc.jpg",
    "submittedBy":"1",
    "url":"documentDownload?fileName=doc.jpg&contentStorageId=4",
    "version":"1"
    }
    

#### Example with search parameter

Find all documents with with any of the searchable fields starting with "doc". Two results are returned:
Request url
GET |/API/bpm/caseDocument?p=0&c=10&s=doc

Response payload

    
    {
    "id":"3",
    "creationDate":"2014-10-09 16:45:36.658",
    "author":"1",
    "index":"-1",
    "contentMimetype":"application/octet-stream",
    "caseId":"1",
    "contentStorageId":"4",
    "isInternal":"true",
    "description":"draft,
    "name":"doc1",
    "fileName":"doc.jpg",
    "submittedBy":"1",
    "url":"documentDownload?fileName=test.txt&contentStorageId=1",
    "version":"1"
    },
     {
    "id":"4",
    "creationDate":"2014-10-09 16:45:36.658",
    "author":"1",
    "index":"-1",
    "contentMimetype":"image/png",
    "caseId":"1",
    "contentStorageId":"4"
    "isInternal":"false",
    "description":"draft,
    "name":"doc2",
    "fileName":"train_receipt.png",
    "submittedBy":"1",
    "url":"http://cloud.storage.com/sites/chris/expenses/july_2014/train_receipt.png",
    "version":"1"
    }
    

### Delete a document

Delete the document with id 3
Method
DELETE

URL
`http://localhost:8080/bonita/API/bpm/caseDocument/3`

Response
empty

### List of documents

A list of documents is represented by several documents having the same name (attribute "name"). 
It is possible to add/remove elements to a list using the same methods as for a for simple document.

Example 1: Get the documents of the list `myDocList` of the case1, sorting the result by ascending index value
Request url
GET |/API/bpm/caseDocument?p=0&c=10&f=name=myDocList&o=index ASC

Response payload

    
    [{ 
    "id":"1", 
    "creationDate":"2014-10-09 16:39:52.472", 
    "author":"1", 
    "index":"0", 
    "contentMimetype":"text/plain", 
    "caseId":"1", 
    "contentStorageId":"1", 
    "isInternal":"true", 
    "description":"", 
    "name":"myDocList", 
    "fileName":"test1.txt", 
    "submittedBy":"1", 
    "url":"documentDownload?fileName=test1.txt&contentStorageId=1", 
    "version":"1" 
    }, 
    {"id":"2", 
    "creationDate":"2014-10-09 16:39:52.473", 
    "author":"1", 
    "index":"1", 
    "contentMimetype":"text/plain", 
    "caseId":"1", 
    "contentStorageId":"2", 
    "isInternal":"true", 
    "description":"", 
    "name":"myDocList", 
    "fileName":"test2.txt", 
    "submittedBy":"1", 
    "url":"documentDownload?fileName=test2.txt&contentStorageId=2", 
    "version":"1" 
    }, 
    {"id":"3", 
    "creationDate":"2014-10-09 16:39:52.473", 
    "author":"1", 
    "index":"2", 
    "contentMimetype":"text/plain", 
    "caseId":"1", 
    "contentStorageId":"3", 
    "isInternal":"true", 
    "description":"", 
    "name":"myDocList", 
    "fileName":"test3.txt", 
    "submittedBy":"1", 
    "url":"documentDownload?fileName=test3.txt&contentStorageId=3",
    "version":"1"
    }]
    

Example 2: Add a new document to the list `myDocList`. 
The "index" attribute is not specified, so the document will be added at the end of the list.
Request url
POST |/API/bpm/caseDocument

Request payload

    
    { 
    "caseId" : "1", 
    "file" : "doc.jpg", 
    "name" : "myDocList", 
    "description" : "this is an element of the list" 
    }
    

Response payload

    
    {
    "id":"4", 
    "creationDate":"2014-10-09 16:45:36.658", 
    "author":"1", 
    "index":"3", 
    "contentMimetype":"application/octet-stream", 
    "caseId":"1", 
    "contentStorageId":"4", 
    "isInternal":"true", 
    "description":"this is a simple doc", 
    "name":"myDocList", 
    "fileName":"doc.jpg", 
    "submittedBy":"1", 
    "url":"documentDownload?fileName=doc.jpg&contentStorageId=4", 
    "version":"1" 
    }
    

Note that this new document has got index=3\. 
If you now rerun the request in Example 1, you will now get a list containing four documents with the new document as last element of the list.

Example 3: Add a new document to the list `myDocList` at index 1\.
Request url
POST |/API/bpm/caseDocument

Request payload

    
    { 
    "caseId" : "1", 
    "file" : "doc.jpg", 
    "name" : "myDocList", 
    "description" : "this is an element of the list at index 1", 
    "index" : "1"
    }
    

Response payload

    
    {
    "id":"5", 
    "creationDate":"2014-10-09 16:45:36.658", 
    "author":"1", 
    "index":"1", 
    "contentMimetype":"application/octet-stream", 
    "caseId":"1", 
    "contentStorageId":"4", 
    "isInternal":"true", 
    "description":"this is a simple doc", 
    "name":"myDocList", 
    "fileName":"doc.jpg", 
    "submittedBy":"1", 
    "url":"documentDownload?fileName=doc.jpg&contentStorageId=4", 
    "version":"1" 
    }
    

Note that this new document has index=1\. 
If you now rerun the request in Example 1, you will see that the indexes of the documents in myDocList have been 
recalculated with respect to the newly added document index.

Knowing the document Id of a document list, it is possible to update it (PUT) and remove it(DELETE) as for a simple document.