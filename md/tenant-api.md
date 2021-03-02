# Tenant API

## BDM

#### Description

Show status or install or update the Business Data Model.

#### Methods

- GET - Read BDM status.
- POST - Add or update Business Data Model

#### Get BDM status

Make this call to get the status the BDM.

- **URL**  
  `/API/tenant/bdm`  
- **Method**  
  `Get`
- **Success Response**
  - Code: 200
  - Payload:      
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

Install or update a BDM on your tenant.
Need to be done in two successive steps:  
1 - Upload a BDM file  
2 - Install/Update the previously uploaded file    

 ::: warning
 **Note:** To do this, your tenant services need to be paused.
 :::

##### Upload a BDM file

- **URL**  
  `/portal/fileUpload`  
- **Method**  
  `POST` 
- **Required headers**  
  `Content-Type: multipart/form-data`
- **Success Response**
  - Code: 200    
  - Request Payload
    ```
    tmp_uploaded_bdm.zip
    ```

##### Install/Update a file previously uploaded

- **URL**  
  `/API/tenant/bdm`  
- **Method**  
  `POST`
- **Success Response**

  - Code: 200    
  - Request Payload
    ```json
    {
         fileUpload: "tmp_uploaded_bdm.zip"
    }   
    ```
    ::: info
    **Note:** Use the file name returned in the first step to perform the second step.
    :::

  ::: warning
  **Note:** In Efficiency, Performance and Enterprise editions, if you have an access control file installed on your tenant, you need to delete    it before installing or updating your BDM.
  :::
