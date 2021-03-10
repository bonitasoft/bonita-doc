# REST API System API

Get informations on the current session and on localisation/translation.

## i18nlocale

#### Description

List the available locales.

#### Representation

```json
{
  "name":"_Name of the language_",
  "locale":"_code of the locale_"
}
```

#### Methods

The methods used for this resource are:

- GET - list available locales

#### List available locales

- **URL**  
  `/API/system/i18nlocale`  
- **Method**  
  `GET`
- **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
- **Success Response**  
  The list of locales as JSON
  - **Code**: 200
  - **Payload**:  
    ```json
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
    ```

## i18ntranslation

#### Description

Get the translations for the specified locale.

#### Representation

```json
{
  "value":"_the translation_",
  "key":"_the key of the translation_"
}
```

#### Methods

The methods used for this resource are:

- GET - the translations for the specified locale

#### List available translations

Returns all translations of the product. If a locale is specified in the filter, that translation for that locale are returned. if no locale is specified, the translations in English are returned.

- **URL**  
  `/API/system/i18ntranslation`  
- **Method**  
  `GET`
- **Data Params**  
  [Standard search parameters](rest-api-overview.md#resource_search) are available.  
  _Example_: `/API/system/i18ntranslation?p=0&c=2&f=locale%3dde` 
- **Success Response**  
  The list of translations as JSON
  - **Code**: 200
  - **Payload**:  
    ```json
    [
      {
        "value":" Um dies zu tun, gehen Sie zu %entitymappingprofilelink%.",
        "key":" To do so, go to %entitymappingprofilelink%."
      }, {
        "value":" Um dies zu tun, gehen Sie zu %profilelink%.",
        "key":" To do so, go to %profilelink%."
      }
    ]
    ```

## Session

#### Description

Get the current session.

#### Identifier

_unusedid_, the id is not used, the current session is always returned

#### Representation

```json
{
  "user_id":"_id of the user_",
  "user_name":"_name of the user_",
  "session_id":"_id of the session_",
  "conf":"_session configuration_",
  "is_technical_user":"_true if the user is the technical user, false otherwise_",
  "version":"_product version_"
}
```

#### Methods

The methods used for this resource are:

- GET - get the current session

#### Get the current session

- **URL**  
  `/API/system/session/unusedid`  
- **Method**  
  `GET`
- **Success Response**  
  The session in JSON
  - **Code**: 200
  - **Payload**:  
    ```json
    {
      "user_id":"12",
      "user_name":"william.jobs",
      "session_id":"2885803778329414975",
      "conf":"[\"D7A27EA0483FBAF903BD61BD16D70EF610DBE6D4\"]",
      "is_technical_user":"false",
      "version":"6.4.0"
    }
    ```

## Tenant

#### Description

Pause and resume tenant services in order to do maintenance on a tenant.

#### Identifier

_unusedid_, the id is not used, the current tenant is always returned

#### Representation

```json
{
  "paused":"_true if the tenant is paused, false otherwise_",
  "id":"_id of the tenant_"
}
```

#### Methods

The methods used for this resource are:

- GET - get the current tenant
- PUT - pause or resume the tenant

#### Get the current tenant

- **URL**  
  `/API/system/tenant/unusedid`  
- **Method**  
  `GET`
- **Success Response**  
  The tenant id with its status in JSON
  - **Code**: 200
  - **Payload**:  
    ```json
    {
      "paused":"false",
      "id":"1"
    }
    ```

#### Pause or resume the current tenant

- **URL**  
  `/API/system/tenant/:tenantId`  
- **Method**  
  `PUT`
- **Request Payload**  
  ```json
  {
    "paused":"true"
  }
  ```
  or
  ```json
  {
    "paused":"false"
  }
  ```
- **Success Response**  
  - **Code**: 200 
