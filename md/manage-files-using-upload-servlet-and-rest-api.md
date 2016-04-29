# 4.4.12 Manage files using upload servlet and Rest API

In the Community, Teamwork, Efficiency, and Performance editions

you can upload files by doing a multipart post request on any of the available servlets.
It returns the name of the temporary uploaded file.
This file name can be used to link those files with any REST resource.



Available servlet list:


* `/portal/fileUpload`, supports any type of file
* `/portal/processUpload`, supports only `.bar` files
* `/portal/organizationUpload`, supports only `.xml` files
* `/portal/actorsUpload`, supports only `.xml` files
* `/portal/imageUpload`, supports only `.png`, `.jpg`, `.gif`, `.jpeg`, `.bmp`, `.wbmp` or `.tga` files
* `/portal/connectorImplementation`, supports only `.zip` files (not available in Community edition)
* `/portal/pageUpload`, supports only `.zip` files (not available in Community edition)
* `/portal/reportUpload`, supports any type of file (not available in Community edition) 
* `/portal/resourceUpload`, supports only `.jar` files (not available in Community edition)
* `/portal/profilesUpload`, supports only `.xml` files (not available in Community edition)
* `/portal/applicationsUpload`, supports only `.xml` files (not available in Community edition)

### Example: link an icon to a new organisation group


1. Upload an image by using a multipart post request on the image upload servlet, `http://localhost:8080/bonita/portal/imageUpload`.
2. The image is stored temporarily in var\_bonita\_home, in `/client/tenants/`_`tenantId`_`/tmp`.
3. The servlet returns the name of the temporary file.
4. When you create the new group, link this image to the group by specifying this temporary file name

#### Example

Request url
/API/identity/group

Request method

POST

Request payload

    {
    "icon":"tmp_7501171996762091204.jpg","name":"HR",
    "displayName":"Human Resources",
    "parent_group_id":"1",
    "description":"Human resources department"
    }



Response payload

    {
    "id":"14",
    "creation_date":"2014-12-02 16:19:28.925",
    "created_by_user_id":"4",
    "icon":"tmp_7501171996762091204.jpg","parent_path":"/acme"
    ,"description":"Human resources department",
    "name":"HR",
    "path":"/acme/HR",
    "displayName":"Human Resources",
    "last_update_date":"2014-12-02 16:19:28.925"
    }