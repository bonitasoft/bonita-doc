# CMIS

## Overview

Content Management Interoperability Services (CMIS) is an open standard that allows different content management systems to inter-operate over the Internet.

CMIS provides a common data model covering typed files and folders with generic properties that can be set or read. There is a set of services for adding and retrieving documents ('objects'). There may be an access control system, a checkout and version control facility, and the ability to define generic relations.

Two protocol bindings are defined, one using WSDL and SOAP and another using REST, using the AtomPub convention. The model is based on common architectures of document management systems.

Bonita BPM Studio contains the following CMIS connectors:

* Upload a new version
* Upload a document
* Create a folder
* Delete a document version
* Delete a folder
* Delete a document

Note: If you have processes that use CMIS connectors from previous versions, these connectors will no longer work. You need to update the configuration of each connector, including any scripts that construct the URLs used.

## Alfresco specific configuration for document versioning

Document versioning is disabled by default in Alfresco.

If you wish to use the "Upload a new version" connector to upload a new document version, you will have to enable document versioning following the [official Alfresco documentation](http://docs.alfresco.com/community/concepts/versioning.html).

If this configuration is not set, new versions of documents will overwrite previous ones.

## Example: How to upload a document

1. In the Connector list window:
  * Select the CMS/CMIS connector category.
  * Select the _**Upload a document**_ connector.
  * Click _**Next**_.
2. In the General window:
  * Enter a name.
  * Click _**Next**_.
3. In the Server window, enter the information necessary to connect to the repository:
  * Username and password
  * Repository name (for example _Main Repository_)
  * Binding type: webservices (or atompub)
  * The URL (server address) for the atompub binding if it is used
  * If using webservices, there are four new URLs:
    * RepositoryService, for example _https://localhost:12345/alfresco/cmis/RepositoryService?wsdl_
    * RepositoryService endpoint
    * ObjectService, for example _https://localhost:12345/alfresco/cmis/ObjectService?wsdl_
    * ObjectService endpoint
  * Click _**Next**_.
4. In the Document window:
  * Enter the Document name of the document to upload.
  * Enter the relative or absolute path to the **Parent folder** that contains the document.
  * Enter the **Destination name** to be assigned to the document after it is uploaded.
  * Click _**Next**_.
5. In the Output operations window:
  * You can store the returned `document_id` in a variable.
  * Click _**Finish**_.

## Example: Creating a folder on Alfresco

This example presents the creation of a folder on a local installation of Alfresco 5.0 with a CMIS connector configured with AtomPub.

1. In the Connector list window:
  * Select the CMS/CMIS connector category.
  * Select the _**Create a folder**_ connector.
  * Click _**Next**_.
2. In the General window:
  * Enter a name.
  * Click _**Next**_.
3. In the Server window, enter the information necessary to connect to the repository:
  * Username and password
  * Repository name: -default-
  * Binding type: atompub
  * URL: http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/
  * Click _**Next**_.
4. In the Folder window, enter the location and name of the folder you wish to create:
  * Parent folder: / (root folder)
  * Folder name: bonita
  * Click _**Next**_.
5. In the Output operations window:
  * You can store the returned `folder_id` in a variable.
  * Click _**Finish**_.
