# Access control API

 ::: info
 **Note:** This API is only available in Enterprise, Efficiency and Performance editions.
 :::

## BDM

#### Description

Access control is available to protect the tenant BDM. You can use this API to get the access control status (lastUpdatedBy, lastUpdateDate...).

#### Methods
 * GET - Read access control status.
 * DELETE - Remove access control
 
 ::: info
 **Note:** A servlet to import access control file exists. You can use it with this url  `services/bdmAccessControl/install?bdmAccessControlUpload=accessControlFileToUpload.xml`. 
 The file upload needs to be performed before (POST portal/bdmAccessControlUpload). Use the file name returned in the response of the upload request to perform the import request (bdmAccessControlUpload parameter). 
 :::



#### Get access Control status

Make this call to get the access control status.

* **URL**  
  `/API/accessControl/bdm`  
* **Method**  
  `Get`
* **Success Response**
    * Code: 200
    * Payload:      
  ```json
  {
    "id": "4090",
    "name": "bdm_access_control.xml",
    "type": "BDM_ACCESS_CONTROL",
    "state": "INSTALLED",
    "lastUpdatedBy": "4",
    "lastUpdateDate": "2018-01-17T17:05:36.671Z"
  }
  ``` 
 ::: info
 **Note:** If `"lastUpdatedBy": "-1"` it means that the access control were last installed or updated by tenant_technical_user.
 :::  
    
   

#### Delete an access control

Delete the access control which are installed on the current tenant.
 
* **URL**  
  `/API/accessControl/bdm`  
* **Method**  
  `Delete`
* **Success Response**
    * Code: 204    
  
