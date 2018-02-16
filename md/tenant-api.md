# Tenant API

## BDM

#### Description

Show status or install or update the Business Data Model.

#### Methods
 * GET - Read BDM status.
 * POST - Add or update Business Data Model


#### Get BDM status

Make this call to get the status the BDM.

* **URL**  
  `/API/tenant/bdm`  
* **Method**  
  `Get`
* **Success Response**
    * Code: 200
    * Payload:      
  ```json
  {
        "id": "309",
        "name": "client_bdm.zip",
        "type": "BDM",
        "state": "INSTALLED",
        "lastUpdatedBy": "-1 ",
        "lastUpdateDate": "2018-01-17T17:05:36.671Z"
  }
  ```   
 ::: info
 **Note:** `lastUpdatedBy"` value is always -1 because only the tenant_technical_user can install BDM.
 :::   

#### Install or update a BDM

Install or update a BDM on your tenant. Your tenant services need to be paused.

 ::: info
 **Note:** The upload needs to be performed before (POST portal/bdmAccessControlUpload).
 :::
 
* **URL**  
  `/API/tenant/bdm`  
* **Method**  
  `POST`
* **Success Response**
    * Code: 200    
    * Request Payload
   ```
   {
        fileUpload: "bdm_to_upload.zip"
   }   
   ``` 
 ::: info
 **Note:** Use the file name returned in the response of the upload request to perform the import request (fileUpload parameter).
 :::

 ::: warning
 **Note:** In Efficiency and Performance edition, if you have an access control file installed on your tenant, you need to delete    it before installing or updating your BDM.
 :::
