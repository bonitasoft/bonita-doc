## i18ntranslation

### Description

Get the translations for the specified locale.

### Identifier

None, can only search on this resource

### Representation

    {
    "value":"_the translation_",
    "key":"_the key of the translation_"
    }

### Methods

The methods used for this resource are:

* GET - the translations for the specified locale

### List available translations

Returns all translations of the product. If a locale is specified in the filter, that translation for that locale are returned. if no locale is specified, the translations in English are returned.
Request url
http://../API/system/i18ntranslation

Request method

GET

Request payload

empty

Response payload

The list of translations as JSON

#### Example

get the translations in German.
Request url
GET|API/system/i18ntranslation?p=0&c=2&f=locale%3dde

Response payload

    [
    	{
    		"value":" Um dies zu tun, gehen Sie zu %entitymappingprofilelink%.",
    		"key":" To do so, go to %entitymappingprofilelink%."
    	},
    	{
    		"value":" Um dies zu tun, gehen Sie zu %profilelink%.",
    		"key":" To do so, go to %profilelink%."
    	}
    ]