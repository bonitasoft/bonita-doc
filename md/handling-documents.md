# Handle documents

This page shows an example of how to manipulate documents in a Bonita process using the Java APIs. 

A document is treated in a similar way to a variable in Bonita Engine database. It is defined in Bonita Studio or programmatically, and is stored in the Bonita Engine database. Inside a process instance, a document is a byte stream.

## Configure a process document

To configure a document in a process definition, go to the **Details** panel, **General** view, **Documents** pane.
An external document is specified by URI. An internal document is specified by path and file name, by clicking the **_Browse..._** button.

![Configure documents](images/images-6_0/documents_declarations.png)

## Convert a file to a document

The following example shows how to convert the content of a document to a byte stream that can then be used to create or update the content of a document.
```java
/**
 * load the file give in parameters and return a byteArray or a null value
 * 
 * @param fileName
 * @return
 */
public static ByteArrayOutputStream loadFile(String fileName) {
	FileInputStream file = null;
	int read;
	try {
		file = new FileInputStream(fileName);

		ByteArrayOutputStream byteArray = new ByteArrayOutputStream();
		byte[] content = new byte[2048 * 16 * 16];

		while ((read = file.read(content)) > 0) {
				byteArray.write(content, 0, read);
		}

		return byteArray;
	} catch (FileNotFoundException e) {
			e.printStackTrace();
	} catch (IOException e) {
			e.printStackTrace();
	} finally {
		if (file != null)
			try {
				file.close();
			} catch (IOException e) {
		}
	}
	return null;
}
```

## Create a case with a document

The following method, `createCaseWithDocument`, creates a case and attaches a document to it.
```java
public static void createCaseWithDocument(String processDefinitionName, String processVersion, Map<String, Object> variables, Map<String, Object> documents, ProcessAPI processAPI)
    throws ProcessDefinitionNotFoundException, InvalidExpressionException, ProcessActivationException, ProcessExecutionException {

    long processDefinitionId = processAPI.getProcessDefinitionId(processDefinitionName, processVersion);
                
                
        // ----- create list of operations -----                
        List<Operations> listOperations = new ArrayList<Operation>();
                
        // variables
        Map<String, Serializable> ListExpressionsContext = new HashMap<String, Serializable>();

        for (String variableName : variables.keySet()) {

            if (variables.get(variableName) == null || (!(variables.get(variableName) instanceof Serializable)))
                continue;
            Object value = variables.get(variableName);
            Serializable valueSerializable = (Serializable) value;

            variableName = variableName.toLowerCase();
            Expression expr = new ExpressionBuilder().createExpression(variableName, variableName, value.getClass().getName(), ExpressionType.TYPE_INPUT);
            Operation op = new OperationBuilder().createSetDataOperation(variableName, expr);
            listOperations.add(op);
            ListExpressionsContext.put(variableName, valueSerializable);
            }
                
        // update document
        for (String documentName : documents.keySet()) {

            if (documents.get(documentName) == null)
                continue;

            DocumentValue documentValue = null;

            if (documents.get(documentName) instanceof String)
                {
                    documentValue = new DocumentValue( ((String) documents.get(documentName)));
                }
                else if (documents.get(documentName) instanceof byte[])
                {
                    // byte
                    documentValue = new DocumentValue(((byte[])documents.get(documentName)), "plain/text", "myfilename");        
                }
                else if (documents.get(documentName) instanceof ByteArrayOutputStream)
                    {
                        documentValue = new DocumentValue(((ByteArrayOutputStream) documents.get(documentName)).toByteArray(), "plain/text", "myfilename");         // url
                    }
                Operation docRefOperation = new OperationBuilder().createSetDocument(documentName,
                    new ExpressionBuilder().createInputExpression(documentName+"Reference", DocumentValue.class.getName()));
                        
                listOperations.add(docRefOperation);
                ListExpressionsContext.put(documentName+"Reference", documentValue);
            }
                
        // ----- start process instance -----
        processAPI.startProcess(processDefinitionId, listOperations, ListExpressionsContext);
    }
```

In this example, we construct two maps, one containing case data and one containing an invoice document and reference. 
The invoice documented is created by converting a local file to a byte stream using the `loadFile` method defined above. 
The two maps are then used to create a case of the process using the `createCaseWithDocument` method defined above.
```java
// ---------- create a case with the value
Map<String, Object> firstInvoice = new HashMap<String, Object>();
firstInvoice.put("emailAddress", "jan.Fisher@bonitasoft.com");
firstInvoice.put("invoiceId", Long.valueOf(45));
firstInvoice.put("dateOfInvoice", new Date());
Map<String, Object> firstInvoiceDocument = new HashMap<String, Object>();
firstInvoiceDocument.put("invoiceReference", "http://documentation.bonitasoft.com");
firstInvoiceDocument.put("invoiceLetter", loadFile("c:/tmp/firstinvoice.pdf"));
createCaseWithDocument("IntegrateMyApplication", "1.0", firstInvoice, firstInvoiceDocument, processAPI);
```

## Attach a document to a case

To attach a document to a case, use the `attachDocument` method of the process API. 
This method is used to create a document and to update it: you update a document by replacing it is replaced with the new version. 
You can provide either a URL pointing to an external document or a byte stream, as shown in the example below:
```java
// update the document
for (String documentName : documentsToUpdate.keySet()) {
    if (documentsToUpdate.get(documentName) instanceof String)
	// document provided by pointer URL
       processAPI.attachDocument(pendingTask.getId(), documentName, "TheFileName", "application/pdf", (String) documentsToUpdate.get(documentName));

    else if (documentsToUpdate.get(documentName) instanceof ByteArrayOutputStream)
	// document provided as byte stream
       processAPI.attachDocument(pendingTask.getId(), documentName, "TheFileName", "application/pdf", ((ByteArrayOutputStream) documentsToUpdate.get(documentName)).toByteArray());
    }
```
