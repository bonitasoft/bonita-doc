## license

### Description

Handle the license information. This requires a platform session. Log in using the
platformloginservice servlet.

This Web REST API is available in Subscription editions only, since version 7.1\.

### Identifier

empty

### Representation

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

### Methods

The methods used for this resource are:

* GET - get subscription license information

### Get subscription license information
Request url
http://../API/platform/licence

Request method

GET

Request payload

empty

Response payload

The license information in JSON

#### Example: a case-counter license for the Performance edition
Request url
GET|../API/platform/license

Response payload

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