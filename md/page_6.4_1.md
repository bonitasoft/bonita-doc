## page

### Description

Use the page resource to access custom pages.

### Identifier

Simple, the ID of the object (a long value)

### Parameters

None

### Representation

    {
    "id":"_page_id_",
    "creationDate":"_date and time_",
    "createdBy":"_created_by_user_id_",
    "isProvided":"_true|false_",
    "description":"_description_",
    "contentName":"_custom_page_name_",
    "displayName":"_custom_page_display_name_",
    "updatedBy":"_updatedBy_user_id_",
    "lastUpdateDate":"_date_and_time_",
    "urlToken":"_custom_page_urlToken_"
    }

### Methods

The methods used for this resource are:

* POST - Add a new custom page
* GET - Read or search a custom page
* PUT - Update a custom page
* DELETE - Remove a custom page

### Retrieve a Custom Page

Use a GET method to retrieve information about a custom page.

Example: Get the information about the custom page with id=1\.
Method
GET

URL
`http://localhost:8080/bonita/API/portal/page/1`

Payload
empty

Response

    {
                "id":"1",
                "creationDate":"2014-12-02 15:54:45.249",
                "createdBy":"",
                "isProvided":"true",
                "description":"HTML and Javascript example of custom page source structure (in English).",
                "contentName":"bonita-html-page-example.zip",
                "displayName":"HTML example page",
                "updatedBy":"-1",
                "lastUpdateDate":"2014-12-02 15:54:45.249",
                "urlToken":"custompage_htmlexample"
                }

### Add a new custom page

Use the POST method to create a new custom page. To add a new custom page, there are two steps:

1. Upload the page content using the pageUpload servlet. This returns a temporary file name.
2. Call this API with the temporary file name, as in the example below.

Example: Add the custom page that was given the temporary name `tmp_2181700538398444744.zip`. The original name was `bonita-angular-dashboard.zip`.
Method
POST

URL
`http://localhost:8080/bonita/API/portal/page`

Payload

    {
                "pageZip":"tmp_113096560980259488.zip:bonita-angular-dashboard.zip"
                }

Response

    {
                "id":"103",
                "creationDate":"2014-12-04 14:54:06.967",
                "createdBy":"1",
                "isProvided":"false",
                "description":"AngularJS dashboard using ngBonita",
                "contentName":"bonita-angular-dashboard.zip",
                "displayName":"AngularJS dashboard",
                "updatedBy":"1",
                "lastUpdateDate":"2014-12-04 14:54:06.967",
                "urlToken":"custompage_angulardashboard"
                }

### Update a custom page

Use the PUT method to update an existing custom page.
To update a custom page, upload the new page content using the pageUpload servlet, which returns a temporary file name, and then call this API with the temporary file name.

Example: Update the custom page with id = 103\. The new uploaded file was given the temporary name `tmp_4338264789005487499.zip`. The original name was `new-bonita-angular-dashboard.zip`.
Method
PUT

URL
`http://localhost:8080/bonita/API/portal/page/103`

Payload

    {
                "pageZip":"tmp_4338264789005487499.zip:new-bonita-angular-dashboard.zip"
                }

Response
empty

### Search custom pages

Use a GET method with filters and search terms to search for custom pages.

You can filter on:

* createdBy={user\_id}: retrieve only the pages created by the specified user ID.
For example, to retrieve the custom pages created by the user with id 1: `http://localhost:8080/bonita/API/portal/page?p=0&c=10&f=createdBy%3d1`.
* contentType={contentType}: retrieve only the resources of requested type. This filter is available since v7.0\.
For example, to retrieve the theme resources: `http://localhost:8080/bonita/API/portal/page?p=0&c=10&f=contentType%3Dtheme`.

You can search on:

* displayName or description: search for custom pages with a displayName or description that starts with the specified string.
For example, to find the pages with displayName starting with New: http://localhost:8080/bonita/API/portal/page?p=0&c=10&s=New
Request url
/API/portal/page?p={page}&c={count}&o={orders}&f={filters}&s={search}&d={deploy}

Request method

GET

Request payload

empty

Response

An array of custom page objects

### Delete a custom page

Use the DELETE method to delete an existing custom page

Example: Delete a custom page with id = 103
Method
DELETE

URL
`http://localhost:8080/bonita/API/portal/page/103`

Payload
empty

Response
empty