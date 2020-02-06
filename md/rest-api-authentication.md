# REST API authentication

To call the REST API, you must first log on with a user registered in the Engine database.

## Login to Bonita
To log in, use the following request:
| | |
|:-|:-|
| Request URL | `http://host:port/bonita/loginservice`|
| Request Method | POST|
| Content-Type | application/x-www-form-urlencoded|
| Form Data | username: a username<br/>password: a password <br/>redirect: true or false. false indicates that the service should not redirect to Bonita Portal (after a successful login) or to the login page (after a login failure).<br/>redirectURL: the URL of the page to be displayed after login <br/>tenant: the tenant to log in to (optional for Performance edition, not supported for Community, Teamwork and Efficiency editions)|

The response to this call generates cookies.
The `JSESSIONID` must be transfered with each subsequent calls. If the REST API is used in an application running in a web browser, this is handled automatically by the web browser.
For usage of the `X-Bonita-API-Token` see below.

### X-Bonita-API-Token cookie and HTTP header

The security against CSRF attacks is enabled by default for all fresh installations.

This security relies on `X-Bonita-API-Token` information. The `X-Bonita-API-Token` value can be found in the cookie named: `X-Bonita-API-Token`. All the subsequence REST API calls using DELETE, POST, or PUT HTTP methods must contain the **HTTP header** below:

    X-Bonita-API-Token: example-dummy-not-be-used-value

### Example using Curl
#### Login
    $ curl -v -c saved_cookies.txt -X POST --url 'http://localhost:8080/bonita/loginservice' \
    --header 'Content-Type: application/x-www-form-urlencoded; charset=utf-8' -o /dev/null \
    -d 'username=walter.bates&password=bpm&redirect=false&redirectURL='

The above `curl` command saved the cookies on the disk, in the `saved_cookies.txt` file.
The cookies file must be reused with the REST API calls (HTTP requests) in order to provide session information.
The value of X-Bonita-API-Token cookie must be passed also in the header of the subsequent REST API calls, when any of the POST, PUT or DELETE HTTP method is used.

The content of the cookies file is below:

    $ cat saved_cookies.txt

    localhost	FALSE	/bonita/	FALSE	0	bonita.tenant	1
    #HttpOnly_localhost	FALSE	/bonita/	FALSE	0	JSESSIONID	9F9665280B367259AC421378B69C3244
    localhost	FALSE	/	FALSE	0	X-Bonita-API-Token	2f86dcab-9b54-45e6-8eb1-f82c2a2f8e25


#### Call an API when authenticated

Let's list processes from the API by providing authentication information.

    $ curl -b saved_cookies.txt -X GET --url 'http://localhost:8080/bonita/API/bpm/process?c=100&p=0'

## Logout from Bonita

When processing is complete, you must log out.

To log out, use the following request:
| | |
|:-|:-|
| Request URL | `http://host:port/bonita/logoutservice`|
| Request Method | GET|
| Query parameter | redirect: true or false (default set to true)|

Setting the redirect parameter to false indicates that the service should not redirect to the login page after logging out.

#### Troubleshooting
##### HTTP/1.1 401 Unauthorized
If the HTTP response's status is `401 Unauthorized`:
 - make sure that the cookies have been transfered with the call
 - make sure that the cookies transfered are the ones generated during the last sucessfull login call
 - if one of the PUT, DELETE or POST method is used, make sure that the `X-Bonita-API-Token` header is included
 - if the X-Bonita-API-Token header is included, make sure that the value is the same as the one of the cookie generated during the last login
 - Maybe a logout was issued or the session has expired; try to log in again, and re run the request with the new cookies and the new value for the `X-Bonita-API-Token` header.

