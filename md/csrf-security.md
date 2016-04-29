# 2.4.6 CSRF

This page explains how to secure your application against Cross-Site Request Forgery (CSRF) attacks.

## Default security setup in Bonita BPM

In Bonita BPM, the security feature is optional and disabled by default. This leaves Bonita BPM unprotected from malicious attacks.
By default (with the security feature disabled), the behavior of the application remains the same but no check is done regarding Tokens in HTTP Requests.

CSRF (also known as XSRF and Sea-Surf), is an example of a malicious attack on a trusted website.
While the user is authenticated, by being logged on to a trusted website, malicious requests are transmitted without the user knowing, or giving their consent. 
For example, by clicking on a link, the user is tricked into performing actions using their ID and privileges, such as giving personal information, bank details, making purchases or payments.
If the targeted end user is an administrator, the entire web application can be compromised.

## How do I protect my application?

A file called `security-config.properties` is located in the platform var\_bonita\_home (`/bonita/client/platform/conf`).

When CSRF protection is disabled, this file contains this line: 
`
security.csrf.enabled false
`

To enable the CSRF protection, edit the configuration file and change the `security.csrf.enabled ` value to **true**.

## How it works

To prevent malicious attacks, an X-Bonita-API-Token header in the HTTP response is added each time a call to the resource `/API/session/* ` is made. 
All HTTP Calls add this header in the HTTP Request.

An attacker cannot retrieve this value unless they can inject some JavaScript (which has been mitigated thanks to our SecurityFilter), to make a call to the resource `/API/session/*`,
get the `Header X-Bonita-API-Token`, and create their own requests.

The value is a UUID, generated server-side, and added to the HTTP Session (server-side as well). 
For each call, the server is checked to verify that the value in the Header is equal to the value stocked in the HTTP session. 
If so, we proceed the request. Otherwise, this is considered to be an unauthorized access. (HTTP Status 401).

## Do I have to update my application?

Yes, if you have developed your own client to communicate with the `REST API`.

When accessing the resource `/API/session/*` for the first time to get the user\_id, etc. extract the `X-Bonita-API-Token HTTP `header,
store it and use it for each API call by adding a new header X-Bonita-API-Token in your calls.

## Is there an impact on REST API

If you are using Bonita BPM Portal there is no impact.

If you have developed an external portal using the rest API to communicate with the Engine, you need to:

* Send an initial request to the session API.
* Retrieve the `X-Bonita-API-Token` from the response header and store it.
* In future API requests, add a header called `X-Bonita-API-Token `containing the stored token. The `X-Bonita-API-Token` is valid for the whole client session.

_Note:_ in the UI Designer preview page, calls to Bonita REST API will not work if CSRF security is activated (in the Studio's Tomcat). It is due to the fact that UI Designer and Bonita REST API are not in the same web application. 
The `X-Bonita-API-Token` cookie is therefore not visible to the UI Designer.
[User authentication overview](/user-authentication-overview.md)
[Read more about CSRF attacks](http://www.acunetix.com/what-are-csrf-attacks/)