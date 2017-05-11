# Platform API

## Platform

#### Description

Handle the platform. This requires a platform session. Log in using the platformloginservice servlet.

#### Identifier

_unusedid_, the id is not used because there is only one platform

#### Representation
```json
{
  "createdBy":"_the user name of the platform administrator_",
  "created":"_the creation date_",
  "initialVersion":"_the version in which the platform was created_",
  "state":"_can be STARTED or STOPPED_",
  "previousVersion":"_the previous version the platform was in or empty if there is none_",
  "version":"_the current version of the platform_"
}
```
#### Methods

The methods used for this resource are:

* GET - get the current platform
* POST - create the platform
* PUT - start or stop the platform
* DELETE - destroy the platform

#### Get the platform

* **URL**  
  `/API/platform/platform/unusedid`  
* **Method**  
  `GET`
* **Success Response**  
  The platform in JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "createdBy":"platformAdmin",
      "created":"2014-12-04 15:46:46.065",
      "initialVersion":"6.4.0",
      "state":"STARTED",
      "previousVersion":"",
      "version":"6.4.0"
    }
    ```

#### Start or stop the platform

Start or stop the current node, that is, start or stop all services of the current JVM.

* **URL**  
  `/API/platform/platform/unusedid`  
* **Method**  
  `PUT`
* **Request Payload**  
  Start current node :
  ```json
  {
    "state":"stop"
  }
  ```
  Stop current node :
  ```json
  {
    "state":"start"
  }
  ```
* **Success Response**  
  * **Code**: 200

## Tenant

#### Description

Handle the tenants (Performance edition only). This requires a platform session. Log in using the platformloginservice servlet.

#### Identifier

The id of the tenant

#### Representation
```json
{
  "id":"_id of the tenant_",
  "creation":"_the creation date_",
  "icon":"_the path of the icon_",
  "description":"_the description_",
  "name":"_the name of the tenant_",
  "state":"_ACTIVATED or DEACTIVATED_"
}
```

#### Methods

The methods used for this resource are:

* GET - get or search tenants
* POST - create a tenant
* PUT - update the tenant and activate or deactivate it
* DELETE - delete a tenant

#### Get a tenant

* **URL**  
  `/API/platform/tenant/:id`  
* **Method**  
  `GET`
* **Success Response**  
  The platform in JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "id":"1",
      "creation":"2014-12-04 15:46:46.256",
      "icon":"/default.png",
      "username":"",
      "description":"Default tenant",
      "name":"default",
      "state":"ACTIVATED",
      "password":""
    }
    ```

#### Create a tenant

Create a new tenant on the platform.

* **URL**  
  `/API/platform/tenant`  
* **Method**  
  `POST`
* **Request Payload**  
  tenant parameters as JSON
  ```json
  {
    "name":"MyTenant",
    "description":"My tenant",
    "username":"john",
    "password":"bpm"
  }
  ```
* **Success Response**  
  the created tenant as JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "password":"",
      "name":"MyTenant",
      "icon":"/default.png",
      "description":"My tenant",
      "id":"102",
      "state":"DEACTIVATED",
      "creation":"2014-12-04 15:30:19.930",
      "username":""
    }
    ```

#### Update a tenant

Attributes of the tenant can be changed, and it can be activated or deactivated at the same time.

* **URL**  
  `/API/platform/tenant/id`  
* **Method**  
  `PUT`
* **Request Payload**  
  Attributes to change as JSON
  ```json
  {
    "description":"modified description for the tenant",
    "state":"DEACTIVATED"
  }
  ```
* **Success Response**  
  The updated tenant as JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "password":"",
      "name":"MyTenant",
      "icon":"/default.png",
      "description":"modified description for the tenant",
      "id":"102",
      "state":"DEACTIVATED",
      "creation":"2014-12-04 15:30:19.930",
      "username":""
    }
    ```

#### Delete a tenant

A tenant can only be deleted if it is in DEACTIVATED state.

* **URL**  
  `/API/platform/tenant/id`  
* **Method**  
  `DELETE`
* **Success Response**  
  * **Code**: 200

<a id="license"/>

## License

#### Description

Handle the license information. This requires a platform session. Log in using the
platformloginservice servlet.

This Web REST API is available in Subscription editions only, since version 7.1\.

#### Identifier

empty

#### Representation

```json
{
  "licenseStartDate": date with format "yyyy-MM-dd" - first day (included) of license file validity,
  "duration": integer - number of days for license file validity,
  "licenseExpirationDate": date with format "yyyy-MM-dd" - last day (included) of license file validity,
  "numberOfCPUCores": integer - number of CPUs
  "edition": name of the BonitaBPM edition enabled by the license
  "licenseMode": available mode enabled by the license
  "requestKey": request key to use to generate a new license on the customer portal

  If you have a subscription that specifies case-counter licensing, additional fields are present:

  "subscriptionStartPeriod": date with format "yyyy-MM-dd" - first day (included) of current period for number of cases provisioned,
  "subscriptionEndPeriod": date with format "yyyy-MM-dd" - last day (included) of current period for number of cases provisioned,
  "caseCounterLimit": integer - number of cases provisioned for period between "subscriptionStartPeriod" and "subscriptionEndPeriod",
  "caseCounter": integer - number of consumed cases for period between "subscriptionStartPeriod" and "subscriptionEndPeriod"
}
```

#### Methods

The methods used for this resource are:

* GET - get subscription license information

#### Get subscription license information

* **URL**  
  `/API/platform/license`  
* **Method**  
  `GET`
* **Success Response**  
  The license information in JSON
  * **Code**: 200
  * **Payload**:  
    ```json
    {
      "licenseStartDate": "2015-08-31",
      "duration": 30,
      "licenseExpirationDate": "2015-09-30",
      "edition": "Performance",
      "licenseMode": "development",
      "requestKey": "(WkrNiwnog4M+qGKUdl8D4yU6l2LyIlqNm3SEZJgenU/c=)",
      "subscriptionStartPeriod": "2015-08-30",
      "subscriptionEndPeriod": "2016-08-29",
      "caseCounterLimit": 100000,
      "caseCounter": 0,
      "numberOfCPUCores": 4
    }
    ```
