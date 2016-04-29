## i18nlocale

### Description

List the available locales.

### Identifier

None, can only search on this resource

### Representation

    {
    "name":"_Name of the language_",
    "locale":"_code of the locale_"
    }

### Methods

The methods used for this resource are:

* GET - list available locales

### List available locales
Request url
http://../API/system/i18nlocale

Request method

GET

Request payload

empty

Response payload

The list of locales as JSON

#### Example

List the available locales. In this example, three locales are available: English, Italiano, Deutsch.
Request url
GET|API/system/i18nlocale?p=0&c=10/td\>

Response payload

    [
    {
    	"name":"English",
    	"locale":"en"
    },
    {
    	"name":"Italiano",
    	"locale":"it"
    },
    {
    	"name":"Deutsch",
    	"locale":"de"
    }
    ]