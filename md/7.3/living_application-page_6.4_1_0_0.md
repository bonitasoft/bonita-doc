## application-page

### Description

An application page is a custom page that has been associated with an application. Use this resource to manage application pages and define the paths used to access them. This list of pages will be used to build the application menus.

### Identifier

The ID of the application page (a long value).

### Representation

    {
    "id":"_id of the application page_",
    "token":"_token use to access the page using a URL : ../appName/pageToken/_",
    "applicationId":"_id of the application related to this page_",
    "pageId":"_id of the custom page to display_"
    }

### Methods

The methods used for this resource are:

* POST - Create an application page
* GET - Read an application page or search for an application page
* DELETE - Remove an application page

### Create an application page
Request url
http://../API/living/application-page

Request method

POST

Request payload

A partial representation of an application page in JSON

Response payload

The full JSON representation of the application page that was created

#### Example
Request url
http://../API/living/application-page

Request method

POST

Request payload

    {
    "pageId":"2",
    "token":"myPage",
    "applicationId":"1"
    }

Response payload

    {
    "id":"3",
    "token":"myPage",
    "pageId":"2",
    "applicationId":"1"
    }

### Get an application page
Request url
http://../API/living/application-page/{applicationPageId}

Request method

GET

Request payload

empty

Response payload

The full JSON representation of the application page that was created with id="applicationPageId"

#### Example
Request url
http://../API/living/application-page/3

Request method

GET

Response payload

    {
    "id":"3",
    "token":"myPage",
    "pageId":"2",
    "applicationId":"1"
    }

### Delete an application page
Request url
http://../API/living/application-page/{applicationPageId}

Request method

DELETE

Request payload

empty

Response payload

empty

#### Example
Request url
http://../API/living/application-page/3

Request method

DELETE

### Search for an application page
Request url
http://../API/living/application-page?p={page}&c={count}&o={order}&s={query}&f={filter\_name}={filter\_value}&d={field\_to\_deploy}

Request method

GET

Request payload

empty

Response payload

A JSON array of application page

#### Parameters

* o: can order on "id", "token", "applicationId", "pageId"
* s: search on "token" 
* f: can filter on "id", "token", "applicationId", "pageId"
* d: can deploy the "applicationId", "pageId"

#### Example
Request url
http://../API/living/application-page?p=0&c=2&d=pageId&f=applicationId%3d1

Request method

GET

Response payload

    [
    {
    	"id":"5",
    	"token":"groovyPage",
    	"pageId":
    	{
    		"id":"2",
    		"creationDate":"2014-11-18 14:38:56.700",
    		"createdBy":"",
    		"isProvided":"true",
    		"description":"Groovy class example of custom page source structure (in English).",
    		"contentName":"bonita-groovy-page-example.zip",
    		"displayName":"Groovy example page",
    		"updatedBy":"-1",
    		"lastUpdateDate":"2014-11-18 14:38:56.700",
    		"urlToken":"custompage_groovyexample"
    	},
    	"applicationId":"1"
    },
    {
    	"id":"1",
    	"token":"home",
    	"pageId":
    	{
    		"id":"3",
    		"creationDate":"2014-11-18 14:38:56.717",
    		"createdBy":"",
    		"isProvided":"true",
    		"description":"This is a home page dedicated to new born living applications",
    		"contentName":"bonita-home-page.zip",
    		"displayName":"Application home page",
    		"updatedBy":"-1",
    		"lastUpdateDate":"2014-11-18 14:38:56.717",
    		"urlToken":"custompage_home"
    	},
    	"applicationId":"1"
    }
    ]