# Documents

Many business processes require documents, or exist because of documents. For example:

* A process to claim travel expenses includes scanned copies of receipts, a company credit card statement, and a list of currency exchange rates.
* A process for considering candidates for a position includes CVs and a job description.
* A process for approving a document for publication includes the document itself and a quality checklist.

Documents can also be attached to processes to provide supplementary information. For example, a travel expense claim process could have an attached document detailing the expense policy of the company.   
Users have the option to download the document if required.

## Document definition

A document is a self-contained structured set of information that is attached to a process instance. It is created and updated by a tool that is not part of the process. It can have a lifecycle that begins before the process instance is created and continues after the process instance is completed and archived.

* **Create**: The lifecycle of a document begins before the process instance is created. A document is created in an external system.
* **Add to process instance**: When a process instance is created, the document instances defined for the process are initialized, in the form of document objects.
At this point, the documents have the content specified in the document definition (which might be no content).
* **Update in process instance**: A document in a process instance is updated by an automatic action in the process definition or following information specified by a user in a form. Updating a document creates a new object.
* **Delete from process instance**: A document object can be deleted from an active process instance but not from an archived process instance.

A document in a process instance is a Java object. When you update a document in a process instance, you create a new object. A document has the following:

* **Name**: the name of the document, defined in the process definition
* **Description**: a description of the document, defined in the process definition (optional)
* **Content**: the content of the document, set from a file or URL. The initial content source is specified in the process definition.   
The content does not have to be initialized when the process instance is created. The content can be initialized or updated in a process task by the system or as a result of user action.
* **MIME type**: the type of content of the document. This is defined for the initial content in the process definition. A browser (or your computer) uses the MIME type to select the best application to use to display the document content. If you do not specify the MIME type, the browser reads the beginning of the file to discover the MIME type.
* **Submitter**: the name of the user who uploaded the content.
* **Creation date**: the date and time when the content was uploaded.

#### Document lists

A document list is a collection of related documents attached to a process. Each component of the list is itself a document object, but it is not necessary to define each one separately. The number of components in the list does not have to be fixed. For example, a process to claim travel expenses includes a document list for the scanned copies of receipts. When the process instance is created, the number of receipts is unknown and the receipts can be in any image format.

In a process definition, you can specify multiple documents or document lists. Use a document list if you have several documents that you need to handle as a set as well as individually. Use multiple documents if you have documents that have independent lifecycles. For example, a process to claim travel expenses could have a document list for expenses receipts and a document with the expenses policy.

To initialize a document list, use a script that returns a list of DocumentValue objects. For example:

```java
import org.bonitasoft.engine.bpm.document.DocumentValue

[
  new DocumentValue("http://url.to.my.cms.document"),//External
  new DocumentValue("exampleContentType".getBytes(), "text/plain", "example.txt")//Internal
]  
```

To update a document list, you need to specify the whole list again using a script,. You cannot just add or replace one component of the list.

## Documents storage

The decision about where to store a document is critical to your process definition. There are three options:

* [CMS](#cms)
* [File](#file)
* [Resource](#resource)

  ![Document lifecycle](images/images-6_0/document_lifecycle.png)

The table below shows the possible interactions between each storage option and a process.

| Storage option  | Update process instance from storage  | Update storage from process instance  |
| --------------- | ------------------------------------- | ------------------------------------- |
| CMS  | URL (in process definition or form widget), connector (in process definition) | Connector (in process definition) |
| File  | URL (in process definition or form), file (in process definition or form widget)  | File (in form widget)  |
| Resource  | Resource name (in process definition)  | Cannot update resource from process instance  |

For most use cases, we recommend storing documents in a CMS.

<a id="cms"/>

#### CMS

Typically, business documents are stored in an external system such as a CMS, and accessed by other applications in addition to Bonita. Bonita is not iteself a CMS, and it is more efficient for performance to store documents in an external system and store only links in the process instance. This is particularly true if you have many documents attached to a process instance.

You can initialize a document object in a process instance by specifying a URL that identifies the document. The document object stores a reference to the URL, not the content itself. The document can be updated in the process instance when the user specifies a URL in a form, or using a connector. You can also use a connector to push an update to the CMS.

If the document is stored in a CMS, you need to consider the lifecycle of the content in the CMS when you are designing your process.  
For example, the content might be updated by some other applications after you have initialized the document object in the process instance, so you need to be sure that the content that is referenced in the CMS is the relevant version. If your process requires the latest version of the content, you should minimize the time between getting the content from the CMS and making it available in the process instance. Also, if your process updates a document and sends new content to the CMS, consider whether you need to handle multiple concurrent updates to the CMS. This might be handled automatically by the CMS itself, or might need to be managed by the connector.

For example, in a process to approve a document for publication, the document exists in an external file store or CMS before the process is instantiated. At a step in the process, the document is approved for external publication, and a new revision of the file is created with a "Confidential" watermark removed. This new revision is uploaded to the CMS by connector, and continues to exist after the process instance is completed and archived.

<a id="file"/>

#### File

A document that is stored as a file can be used to initialize or update the document object in a process instance. This is done when the user specifies the file in a form. Typically, this is useful for information that does not have to be stored outside the process, where the file can be deleted after the document object is created. For example, a file containing a scanned copy of a travel receipt does not need to be kept after the receipt object has been added to a travel expense claim process instance.

<a id="resource"/>

#### Resource

The Bonita Studio Document Repository contains documents that have been imported from the file system. After a document is imported, it is called a resource. When you [build a process bar file for deployment](build-a-process-for-deployment.md), the resources used in the process are automatically included. A resource is available to all processes in an installation of Studio. A resource cannot be updated directly in Studio, but is updated by uploading a new file. Typically, resources are used for information that is stable and common to all instances of a process, or is used in several processes. The resource is used to initialize the document object in the process instance. You cannot use a resource to update a document object.

When you [export a process in a bos file for import into another Studio](import-and-export-a-process.md), you must select the resources that are used so that they are included.

The dialog for adding a resource to the document repository is inside the dialog for adding a resource to a process definition.   However, you can add a resource without updating the process definition, as follows:

1. Open any process diagram and select the pool. This definition will not be updated.
2. Go to the **Details** panel, **Data** tab, **Documents** pane.
3. Select any document, and check **From local file**. If there are no documents defined for the process, click **_Add_** and specify a name for the document.
4. Click **_Browse..._**. A popup shows the list of resources in the repository.
5. Click **_Import..._**. A file selector popup is displayed.
6. Select the file that you want to import. The filename is added to the list of resources.
7. Click **_Cancel_** to close the list of resources in the repository.
8. Click **_Cancel_** to close the document editor or creator. The process diagram and document definition are not updated.

When you deploy a process, the documents included in the bar file are stored in the local Bonita database. They are used to initialize document objects when a process instance is created or when a form is initialized.

#### Document maximum size setting

By default, the maximum size of a document is 25Mb. You can reduce or increase this in your production environment by modifying the value of the `form.attachment.max.size` property in the `console-config.properties` file of your tenant.
For the V6 forms, you also need to change the `form.attachment.max.size` property of the `forms-config.properties` file. Those modifications will be applied after a server restart.
The maximum document size cannot exceed the capacity of the database column. This value depends on your database. This setting applies to all processes in the tenant.
This maximum document size will also depend on your web server configuration, it can't be more than the maximum post size of the web server.

#### Document versioning in a process instance

In a process instance, there is no specific versioning. When a document is updated, a new object is created. These objects are archived with the associated activity instance, and can be retrieved using Bonita Engine API.

#### Document archives

When a process element is archived the associated documents are also archived. It is possible to delete the archived documents using the Engine API or REST API when they are no longer needed, to save space. You can delete an archived document from a live process instance or from an archived process instance. When you delete an archived document, only the content is deleted. The metadata, such as the name, last updated date, and uploader, is kept so that it can be retrieved if needed for audit.

## Define a document in a process definition

This section explains how to specify a document or document list in a process definition.

#### Add a document

A document is added to a process definition at pool level. It is similar to defining a pool-level process variable. You must define at pool level all the documents that will be used in the process.

To define a document in Bonita Studio:

1. In your process diagram, select the pool.
2. Go to the **Details** panel, **Data** tab, **Documents** pane.
3. Click **_Add_**. A popup for defining a document is displayed.
4. In the popup, specify the following:
  * The **name** of the document, used to identify it in the Studio. This must be a valid Java identifier.
  * A **description** of the document. This is optional, but we recommend that you add a description stating the document purpose in the process, for collaboration and maintenance.
  * Whether the document is **single** or **multiple**. Specify **multiple** to define a document list.
  * The source of the **initial content** of the document. For a document, there are the following options:
    * Choose **None** if there is no initial content for the document when the process instance is created.
    * Choose **From contract** if the document content is to be retrieved from the contract input.
    * Choose **From local file** if the document content is to be retrieved from a resource.
    * Choose **From an external system** if the document content is to be retrieved from an external system by URL
   For a document list, initial content is defined using a script. The script must return a `java.util.List`.
  * Optionally, for a local file, you can specify the media type of the content, by setting the MIME type of the document.
5. If you want to specify the MIME type, click **Manage MIME type...**, and then specify the MIME type in the field that is displayed.
6. When you have provided all the information for the document, click either **_Finish & Add_** to define another document or **_Finish_** if you have no more documents to define for this pool.

#### Edit a document in the process definition

1. In your process diagram, select the pool.
2. Go to the **Details** panel, **Data** tab, **Documents** pane. The list of documents defined for the pool is displayed.
3. Click the name of the document that you want to edit, and click **_Edit_**.
4. Update the document information in the popup.
5. Click **_OK_** to save your changes.

#### Remove a document from a process definition

1. In your process diagram, select the pool.
2. Go to the **Details** panel, **Data** tab, **Documents** pane. The list of documents defined for the pool is displayed.
3. Click the name of the document that you want to edit, and click **_Remove_**.

## Documents and called processes

A document is defined in a pool. You can map documents to other pools similarly to how you map variables.

To map a document when using a call activity:

1. Define a document in the main process, for example "mainDoc".  
2. Define a document in the called process, for example "subDoc".  
3. In the call activity of the main process, add a task variable of type long (for example called "docId") that will contain the id of the instance of mainDoc.   
   Set the default value of docId with the following code: `apiAccessor.getProcessAPI().getLastDocument(processInstanceId, "mainDoc").getId();`
4. In the called process, add a pool-level variable of type long (for example called docId).  
5. Define the [variable mapping in the call activity](called-processes.md) so that docId in the call activity is mapped to docId in the called process.  
6. In the called process, as the first task add an automatic task that will get the mainDoc, create a DocumentValue object with the content of mainDoc, and use it to update the content of subDoc.  
To do this, define an operation in the automatic task as follows:
     1. In the first field, select subDoc.
     2. Set the operator type to Set document.
     3. Open the expression editor for the second field and create a script expression with the following content:

       ```java
       import org.bonitasoft.engine.bpm.document.Document;
       import org.bonitasoft.engine.bpm.document.DocumentValue;

       Document doc=apiAccessor.getProcessAPI().getDocument(sub_docId);
       DocumentValue docValue=new DocumentValue(apiAccessor.getProcessAPI().getDocumentContent(doc.getContentStorageId()), doc.getContentMimeType(), doc.getContentFileName());
       return docValue;
       ```

## Specify a document in a process form

When you have specified the documents in the process definition, you need to define how they are handled in the process tasks.

A document is represented in a form definition by the [upload widget](widgets.md).

## Connectors and documents

During a process instance, you can use [connectors](connectivity-overview.md) to manipulate documents.   
In addition to the connectors that interact with content management systems (such as the Alfrecso and CMIS connectors), some other connectors can also manipulate documents. For example:

   * A task that uses the Email connector to send a message can attach a document to the message.
   * A task that uses the Google Calendar connector to create a calendar event can attach a document as content.

Note that connectors handle single documents. If your process contains a document list, you can manipulate component documents using connectors.

The standard connectors provided with Bonita (CMIS, Alfresco) take a document as input. They cannot handle document lists.   
The email connector can handle a document list that specifies the attachments to be added to a message. The standard connectors do not provide a documentValue as output. This means that you cannot use a connector to get a document. Instead, specify the URL of the document, as you would for initialization.
