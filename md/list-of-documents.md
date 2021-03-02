# Manage a list of documents

Bonita allows you to group documents with lists.

## How to

Manage a list of documents through a process means add / edit / remove documents from a multiple data of type _document_.

## Exemple: Document validation process

::: warning
This tutorial assume that you are already familiar with Bonita. If not you might want to read the [Getting started](getting-started-tutorial.md) first.
:::

This exemple shows how to easily create a document validation process using Bonita Studio.  
A document validation process is a process where a User should be able to first submit a list fo documents. Then, an other user can perform a review on the list submitted, and ask for some changes on the list. If the reviewer asks for it, then the submitter has to edit the list of documents by adding / editing / removing some documents of the list, according to the review.  

Here is a preview of the process we are going to build:  
![Validation process](images/documentValidationProcess.png)

1. Create a process _documentValidation_, with two lanes: _Submitter lane_ and _Reviewer lane_. 
2. Create also two actors: _Submitter actor_ and _Reviewer actor_. Each actor should be mapped to a different part of the organization (two different groups for exemple). Set the _Submitter actor_ as initiator, and map each lane to its actor.
3. Create a multiple document variable named _documents_, and a process variable of type boolean named _submissionValid_.
4. Select the pool and create a contract for the data _documents_.  ⚠️ Make sure to use the button **Add from data** to create your contract, the contract input will be bounded to the data, it will save you a lot of development time (operation & form generation).
5. Create the instantiation form using the Studio shortcut. Rename the form into _initDocuments_, and then go back to the Studio.
6. Select the task _Review_. The objective of this task is to display the documents submitted to the reviewer. He should then be able to validate or not the submission, depending on the documents.
   - Create a contract input (using the button _add_) of type BOOLEAN, named _review_.
   - Create the form using the Studio shortcut, and rename this form _review_. It should only contain a title, a checkbox _review_ and a submit button. We are going to add some widgets to display the documents:  
     - Above the checkbox, add a container with the following collection: _context.documents_ref_
     - In the container, add a File Viewer widget, with the following properties: 
       - **File source**: Process document
       - **Process document**: $item
       - **Show preview**: no (it is actually up to you, but display the preview often reduce the visibility of the form)
   - Save the form and go back to the Studio. 
   - On the operations panel, add an operation to assign the value of the contract input _review_ to the process data _submitionValid_. 
7. Select the output transition _No_ (of the gateway _Is submission validated?_), and set it as the default flow. Select the other transition _Yes_, and use the process data _submissionValid_ as expression. So, the transition _Yes_ is used if the reviewer validate the submission.
8. Select the task _modification_, add a contract input for the data _documents_ (using the button _Add from data_). Create the form for this task using the Studio shortcut, rename it into _editSubmission_ and go back to the Studio. 

And that's all, the document validation process is ready to be used. Start it from the Studio, and submit a couple of documents. Disconnect and then reconnect with a user mapped to the reviewer actor. '_Check_' the documents and refuse the submission. Reconnect with the first user, and try to delete a document, add a new one and edit an existing one. Reconnect with the reviewer, verify that the documents have been updated and then validate the submission.

## REST APIs

A list of documents is represented by several documents having the same name (attribute "name"). 
It is possible to add/remove/edits elements to a list using the same methods as for a simple document.

### Get the documents of the list

In a case with `myDocList` as a list of documents, use the following request to sort the result by ascending index value:

Request URL:

| Method | Path + Query                                                    |
| :----- | :-------------------------------------------------------------- |
| GET    | `/API/bpm/caseDocument?p=0&c=10&f=name=myDocList&o=index ASC`\| |

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

### Add a new document

To add a new document to the list `myDocList` at the end of the list, do a POST call without specifying the _index_ attribute in the request payload.

| Method | Path + Query            |
| :----- | :---------------------- |
| POST   | `/API/bpm/caseDocument` |

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

_Note_: that this new document has got index=3. 
If you now rerun the first GET request, you will now get a list containing four documents with the new document as last element of the list.

### Add a new document to the list at a given index

To add a new document to the list `myDocList` at index 1\\, do a POST call specifying the _index_ attribute in the request payload.

| Method | Path + Query            |
| :----- | :---------------------- |
| POST   | `/API/bpm/caseDocument` |

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

_Note_: that this new document has index=1. 

If you now rerun the request in Example 1, you will see that the indexes of the documents in myDocList have been 
recalculated with respect to the newly added document index.

Knowing the document Id of a document list, it is possible to update it (PUT) and remove it(DELETE) as for a simple document.
