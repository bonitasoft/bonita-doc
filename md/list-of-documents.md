# How to manage a list of documents

A list of documents is represented by several documents having the same name (attribute "name"). 
It is possible to add/remove elements to a list using the same methods as for a simple document.

## Get the documents of the list

In a case with `myDocList` as a list of documents, use the following request to sort the result by ascending index value:

Request URL:
|Method | Path + Query|
|:-|:-|
| GET |`/API/bpm/caseDocument?p=0&c=10&f=name=myDocList&o=index ASC`|

Response payload :

```json
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
    "name":"myDocList", 
    "fileName":"test1.txt", 
    "submittedBy":"1", 
    "url":"documentDownload?fileName=test1.txt&contentStorageId=1", 
    "version":"1" 
  }, {
    "id":"2", 
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
  }, {
    "id":"3", 
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
  }
]
```

## Add a new document

To add a new document to the list `myDocList` at the end of the list, do a POST call without specifying the _index_ attribute in the request payload.

|Method | Path + Query|
|:-|:-|
| POST |`/API/bpm/caseDocument` |

Request payload:

```json
{ 
  "caseId" : "1", 
  "file" : "doc.jpg", 
  "name" : "myDocList", 
  "description" : "this is an element of the list" 
}
```   

Response payload

```json
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
```
    

_Note_: that this new document has got index=3\. 
If you now rerun the first GET request, you will now get a list containing four documents with the new document as last element of the list.

## Add a new document to the list at a given index

To add a new document to the list `myDocList` at index 1\, do a POST call specifying the _index_ attribute in the request payload.

|Method | Path + Query|
|:-|:-|
| POST |`/API/bpm/caseDocument` |

Request payload

```json 
{ 
  "caseId" : "1", 
  "file" : "doc.jpg", 
  "name" : "myDocList", 
  "description" : "this is an element of the list at index 1", 
  "index" : "1"
}
```

Response payload

```json 
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
```

_Note_: that this new document has index=1\. 

If you now rerun the request in Example 1, you will see that the indexes of the documents in myDocList have been 
recalculated with respect to the newly added document index.

Knowing the document Id of a document list, it is possible to update it (PUT) and remove it(DELETE) as for a simple document.
