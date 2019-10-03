# Manage documents with code examples and Java APIs

Code examples that illustrate how the Bonita Engine Java APIs let you create, add a new version and attach documents to a Bonita process.  

## More information

You might want to consult the [document documentation](documents.md) first.

A document is treated in a similar way to a variable in Bonita Engine database. It is defined in Bonita Studio or programmatically, and is stored in the Bonita Engine database. Inside a process instance, a document is a byte stream.

A document is treated in a similar way to a variable in Bonita Engine database. It is defined in Bonita Studio or programmatically, and is stored in the Bonita Engine database.

## Set or update the value of a document in a process operation using a script

In a process operation, you might want to set / update the value of a document data using a groovy script instead of simply use a contract input.  
The script should return a _DocumentValue_ .  
**N.B**: _All the following exemples deal with single document data. For multiple document data, just adapt the scripts to return a list  of DocumentInput instead of a document input._  


#### Create a new document
The following groovy scripts create a new document from an existing contract input / url / file.

```groovy
import java.nio.file.Files

import org.bonitasoft.engine.bpm.contract.FileInputValue
import org.bonitasoft.engine.bpm.document.DocumentValue

// From a contractInput
def DocumentValue createNewDocument(FileInputValue fileFromContract) {
    new DocumentValue(fileFromContract.content, fileFromContract.contentType, fileFromContract.fileName)
}

// From an url
def DocumentValue createNewDocument(String url) {
    new DocumentValue(url);
}

// From an existing file on the fileSystem
def DocumentValue createNewDocument(File file) throws IOException {
    def mimeType = Files.probeContentType(file.toPath())
    new DocumentValue(file.bytes, mimeType, file.name)
}
```  


#### Update the value of an existing document if a new content is provided

This following script is a way to address the use case of an optional update of the value of a document:  
A user might want to change the value of a document, or not. If a new document is uploaded then the value of the data must be updated, if not then the data should be left unchanged.  

```groovy
import java.nio.file.Files

import org.bonitasoft.engine.bpm.contract.FileInputValue
import org.bonitasoft.engine.bpm.document.DocumentValue

// From a contractInput
def DocumentValue optionalUpdateDocument(long documentId, FileInputValue fileFromContract) {
    return fileFromContract 
        ? new DocumentValue(documentId, fileFromContract.content, fileFromContract.contentType, fileFromContract.fileName)
        : new DocumentValue(documentId)
}

// From an url
def DocumentValue optionalUpdateDocument(long documentId, String url) {
    return url
        ? new DocumentValue(documentId, url)
        : new DocumentValue(documentId)
}

// From an existing file on the fileSystem
def DocumentValue optionalUpdateDocument(long documentId, File file) throws IOException {
    return file
        ? new DocumentValue(documentId, file.bytes, Files.probeContentType(file.toPath()), file.name)
        : new DocumentValue(documentId)
}
```  


## Create a case with documents

The following method, `createCaseWithDocument`, creates a case and attaches documents to it.  

```groovy
import java.nio.file.Files

import org.bonitasoft.engine.bpm.document.DocumentValue
import org.bonitasoft.engine.exception.BonitaException
import org.bonitasoft.engine.expression.ExpressionBuilder
import org.bonitasoft.engine.operation.OperationBuilder

import com.bonitasoft.engine.api.ProcessAPI

/**
 * In this example, `documents` is a map which link a document data (key) to a file (value)
 * This map will be converted to operations to set document data with DocumentValue
 * We assume in this example that all documents are initialized with Files (i.e contents), it could be URLs! 
 */
def createCaseWithDocument(String processDefinitionName,
        String processVersion,
        Map<String, File> documents,
        ProcessAPI processAPI) throws BonitaException {

    def processDefinitionId = processAPI.getProcessDefinitionId(processDefinitionName, processVersion)
    def operations = []
    def listExpressionsContext = [:]

    // ----- create setDocument operations -----
    documents.keySet().each { documentName ->
        def file = documents.get(documentName)
        def mimeType = Files.probeContentType(file.toPath())
        def documentValue = new DocumentValue(file.bytes, mimeType, file.name)
        def expressionName = documentName + "Reference"
        def expression = new ExpressionBuilder().createInputExpression(expressionName, DocumentValue.class.getName())
        def operation = new OperationBuilder().createSetDocument(documentName, expression)
        operations.add(operation)
        listExpressionsContext.put(expressionName, documentValue)
    }

    // ----- start process instance -----
    processAPI.startProcess(processDefinitionId, operations, listExpressionsContext);
}
```  


## Attach a document to a case

To attach a first version of a document data to a case, use the `attachDocument` method of the process API.  
To attach a new version of a document data to a case, use the `attachDocumentNewDocumentVersion` method of the process API.  

```groovy
import java.nio.file.Files

import com.bonitasoft.engine.api.ProcessAPI

// Set the first value of the document `documentName` with the file `document`
// throw an exception if `documentName` has already a value
def attachDocumentToCase(ProcessAPI processAPI, long processInstanceId, String documentName, File document) {
    def mimeType = Files.probeContentType(document.toPath())
    processAPI.attachDocument(processInstanceId, documentName, document.name, mimeType, document.bytes)
}

// Update the value of the document `documentName` with the file `document`
// throw an exception if `documentName` doesn't already have a value
def attachNewDocumentVersionToCase(ProcessAPI processAPI, long processInstanceId, String documentName, File document) {
    def mimeType = Files.probeContentType(document.toPath())
    processAPI.attachNewDocumentVersion(processInstanceId, documentName, document.name, mimeType, document.bytes)
}
```
