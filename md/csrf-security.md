# CSRF security

This page explains how Bonita BPM REST API is secured against Cross-Site Request Forgery (CSRF) attacks.

CSRF (also known as XSRF and Sea-Surf), is an example of a malicious attack on a trusted website.
While the user is authenticated, by being logged on to a trusted website, malicious requests are transmitted without the user knowing, or giving their consent. 
For example, by clicking on a link, the user is tricked into performing actions using their ID and privileges, such as giving personal information, bank details, making purchases or payments.
If the targeted end user is an administrator, the entire web application can be compromised.

## Default security setup in Bonita BPM

In Bonita BPM, since version 7.4.0, the CSRF protection is enabled by default.

## How it works

To prevent malicious attacks a token is generated server-side when logging in and added to the HTTP session (server-side as well).
A cookie named `X-Bonita-API-Token` is created (hence, client-side) with the value of the token if the login is successful.
Then for all subsequent REST API calls this token is added to the HTTP request headers.
For each call, the server is checked to verify that the value in the Header is equal to the value stocked in the HTTP session. 
If so, the request proceed. Otherwise, this is considered to be an unauthorized access. (HTTP Status 401).

In addition of the cookie, it is also possible to retrieve the token by performing a call to the resource `/API/system/session/unusedId`. The token is then returned in the headers of the HTTP response.

An attacker cannot retrieve the value of the token unless they can inject some JavaScript (which has been mitigated thanks to our SecurityFilter), to make a call to the resource `/API/system/session/unusedId`,
get the header `X-Bonita-API-Token`, and create their own requests.

## Is there an impact on REST API calls?

If you are using Bonita BPM Portal there is no impact.

If you have developed an external application or some custom pages using the REST API to communicate with bonita BPM, you need to send the `X-Bonita-API-Token` header in all requests other that GET. There are 2 ways of doing this:

* Using the `X-Bonita-API-Token` cookie:
  * Retrieve the `X-Bonita-API-Token` cookie value (you can retrieve it once and store it in a variable if you don't want to read the cookie each time you perform a call).
  * In each API request, add a header named `X-Bonita-API-Token` whose value is the token.

* Using the session API resource
  * Send an initial request to the session API resource (`/API/system/session/unusedId`).
  * Retrieve the `X-Bonita-API-Token` from the response header and store it.
  * In all future API requests, add a header named `X-Bonita-API-Token` containing the stored token.

The `X-Bonita-API-Token` is valid for the whole client session.


## How do I disable it?

Disabling the CSRF protection is not recommended as it will makes Bonita BPM REST API unprotected from malicious attacks.

But if you need to, the deactivation of the CSRF protection can be done in the file `security-config.properties` for the whole platform.
The default version of this file is located in `setup/platform_conf/initial/platform_portal`. In order to change the configuration on an installation whose platform has already been initialized, use the [platform setup tool](BonitaBPM_platform_setup.md) to retrieve the current configuration and update the file in `setup/platform_conf/current/platform_portal`. Then use the tool again to save your changes into to the database.

When CSRF protection is enables, this file contains this line: 
`
security.csrf.enabled true
`

To disable the CSRF protection, edit the configuration file and change the `security.csrf.enabled ` value to **false**.

## How to secure the X-Bonita-API-Token cookie (HTTPS only)?

You can set the secure flag on the `X-Bonita-API-Token` cookie to make sure the browser will only transmit the cookie if the page is HTTPS.

Activating the addition of the secure flag can be done in the file `security-config.properties` for the whole platform.
The default version of this file is located in `setup/platform_conf/initial/platform_portal`. In order to change the configuration on an installation whose platform has already been initialized, use the [platform setup tool](BonitaBPM_platform_setup.md) to retrieve the current configuration and update the file in `setup/platform_conf/current/platform_portal`. Then use the tool again to save your changes into to the database.

When the secure flag is not active, this file contains this line: 
`
security.csrf.cookie.secure false
`

To activate the addition of the secure flag, edit the configuration file and change the `security.csrf.cookie.secure ` value to **true**.

[User authentication overview](user-authentication-overview.md)
[Read more about CSRF attacks](http://www.acunetix.com/websitesecurity/csrf-attacks)


## How to Migrate your pages to 7.4.0 or greater when CSRF security is enabled
To use a UI page or form that was created in lower version than 7.4, you need to re-import this old page in actual UI designer. If you don't update your page, any API call in your outdated version will be failed because `X-Bonita-API-Token` will be absent in the response header. 
Follow this few steps to update your page or form:

In UI designer:
1) [**Import**](create-or-modify-a-page.md#import) the page from 7.3.X or lower version.
1) [**Export**](create-or-modify-a-page.md#export) the page you previously imported.

In the portal as Administrator:
1) Go on Resources entry.
1) [Edit the existing page](resource-management.md#modify) by uploading the new one.