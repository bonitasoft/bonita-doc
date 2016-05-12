# application API

* [application](api_resources/living_application_6.4_0_0_0_0.md)
## Living application

### Description

Manage applications. This enables you to build to build a consistent functional applicative environment for users to interact with business processes and business data from one place.

### Identifier

The ID of the application (a long value).

### Representation
```json
{
  "id":"id of the application",
  "token":"token of the application used to build the application URL",
  "displayName":"display name of the application",
  "version":"version of the application",
  "description":"description of the application",
  "profileId":"profile authorized to access this application",
  "creationDate":"creation date of the application",
  "createdBy":"user that created the application",
  "updatedBy":"user that that updated the application",
  "lastUpdateDate":"last update date of the application"},
  "homePageId":"id of the application page used as the home page"
}
```

### Methods

The methods used for this resource are:

* POST - Create an application
* GET - Get the application information
* PUT - Update an application
* DELETE - Remove an application

### Create an application

* **URL:**  
  `/API/living/application`  
* **Method**  
  `POST`  
* **Data params**:  
  A partial representation of an application in JSON  
    ```json
    {
      "version":"1.0",
      "profileId":"2",
      "token":"myapp",
      "displayName":"My app",
      "description":"My application description"
    }
    ```
* **Success Response**  
  * **Code:** 200  
  * **Payload**:  
  The full JSON representation of the application that was created
    ```json
    {
      "id":"305",
      "creationDate":"1411548289900",
      "iconPath":"",
      "createdBy":"1",
      "profileId":"2",
      "description":"My application description",
      "token":"myapp",
      "state":"DEACTIVATED",
      "displayName":"My app",
      "updatedBy":"1",
      "lastUpdateDate":"1411548289900",
      "version":"1.0",
      "homePageId":"-1"
    }
    ```

### Get an application

* **URL:**  
  /API/living/application/:applicationId
* **Method:**</td><td>GET</td><td>empty</td><td>The full JSON representation of the application that was created with id="applicationId"</td></tr>
<tr><td>`../API/living/application/305`</td><td>`GET` </td><td> </td><td>
<pre><code class="language-json">
{
  "id":"305",
  "creationDate":"1411548289900",
  "iconPath":"",
  "createdBy":"1",
  "profileId":"2",
  "description":"My application description",
  "token":"myapp",
  "state":"DEACTIVATED",
  "displayName":"My app",
  "updatedBy":"1",
  "lastUpdateDate":"1411548289900",
  "version":"1.0",
  "homePageId":"-1"
}
</code></pre></td></tr>
</tbody></table>

### Delete an application

* **URL**

`/API/living/application/:applicationId`

* **Method:**

`DELETE`

* **Success Response**
  * **Code:** 200

* [application-layout](api_resources/application-layout_0.md)
* [application-theme](api_resources/application-theme_0.md)
* [application-menu](api_resources/living_application-menu_6.4_2_0_1_0.md)
* [application-page](api_resources/living_application-page_6.4_1_0_0.md)


<ng-include src="'html/' + productVersion + '/application-layout_0.md'" onload="contentCtrl.highlight()"/>

