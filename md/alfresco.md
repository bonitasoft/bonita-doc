# Using Alfresco with Bonita

Bonita allows you to connect Alfresco ECM content platform.

## Connecting to Alfresco

Bonita Studio contains connectors for Alfresco 3.4 and Alfresco 4.2. For each version, there are the following connectors:

- Delete an item by ID (folder, file, etc)
- Delete folder by path (delete a folder and its contents)
- Create a folder by path
- Upload a file to a destination folder

Notes for using these connectors:

- **Warning:**
  There is a conflict between libraries provided with the Alfresco connector and libraries provided by other connectors or the platform itself if you use a data of type Object.  
  When you configure a process that uses the Alfresco connector, you must [manage the jar files](manage-jar-files.md).  
- To delete a folder, it must be empty.
- In the path, all parameters have to be [URL Encoded](http://www.w3schools.com/tags/ref_urlencode.asp). Spaces are not allowed. For example: `/User Homes/user` has to be written `/User%20Homes/user`.
