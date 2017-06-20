# Enable CORS in Tomcat bundle

If you try to call the REST API from a page hosted on another domain than the one of the tomcat bundle,
you will face some issues due to the 'same-origin policy' enforced by web browsers.
For instance you may see in your browser a message such as:

>Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at XXX.
>This can be fixed by moving the resource to the same domain or enabling CORS.

By configuring the CORS filter on the tomcat bundle, you will be able to access the Bonita REST API from a page
 hosted on a different domain from the one of the tomcat bundle.


## Tomcat configuration

Edit the web.xml of the bonita.war to add the CORS filter:

```code
<filter>
  <filter-name>CorsFilter</filter-name>
  <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
  <init-param>
    <param-name>cors.allowed.origins</param-name>
    <param-value>*</param-value>
  </init-param>

  <init-param>
    <param-name>cors.allowed.methods</param-name>
   <param-value>GET, HEAD, POST, PUT, DELETE, OPTIONS</param-value>
  </init-param>

  <!-- List of the response headers other than simple response headers that the browser should expose to
    the author of the cross-domain request through the XMLHttpRequest.getResponseHeader() method.
    The CORS filter supplies this information through the Access-Control-Expose-Headers header. -->
  <init-param>
      <param-name>cors.exposed.headers</param-name>
      <param-value>Access-Control-Allow-Origin,Access-Control-Allow-Credentials,X-Bonita-API-Token</param-value>
  </init-param>

  <!-- The names of the supported author request headers. These are advertised through the Access-Control-Allow-Headers header.
    The CORS Filter implements this by simply echoing the requested value back to the browser.
  -->
  <init-param>
      <param-name>cors.allowed.headers</param-name>
      <param-value>Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-Bonita-API-Token</param-value>
  </init-param>

</filter>
...
<filter-mapping>
  <filter-name>CorsFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```
_**Important Note 1:** The filter must be inserted in the file webapps/bonita/WEB-INF/web.xml (not in the Tomcat conf/web.xml)_

_**Important Note 2:** It must be the first filter, inserted right after the </error-page> tag_

for more information:
[https://tomcat.apache.org/tomcat-7.0-doc/config/filter.html#CORS_Filter](https://tomcat.apache.org/tomcat-7.0-doc/config/filter.html#CORS_Filter)

## HTML Example test page

Here is an example of html page that:
- logs in using the loginservice,
- get the current session, via the REST api resource system/session
- edit a user using the REST api resource identity/user

This page can be hosted on a different domain, and thanks to the CORS filter, the requests will be successfully processed.

_**Important Note 1:** this example works on a bundle where the [CSRF security filter is activated](csrf-security). As the header "X-Bonita-API-Token" is set with the "session apiToken"._

_**Important Note 2:** to use this page you will need to replace the `BONITA_ACCESS_URL` by your own tomcat bundle URL._

```html

<!doctype html>
<html>
<head>
 <meta charset="utf-8">
 <title>Demo</title>
</head>
<body>
<h1>CORS INDEX</h1>
 <script src="http://code.jquery.com/jquery-2.1.4.js"></script>
 <script>
   var formData = {
     username: "walter.bates",
     password: "bpm",
     redirect: false
   };
   $.ajax({
     url: "BONITA_ACCESS_URL/bonita/loginservice",
     type: "POST",
     data: formData,
     xhrFields: {withCredentials: true},
     success: function(data, textStatus, jqXHR) {
           $.ajax({
             url: "BONITA_ACCESS_URL/bonita/API/system/session/1",
             type: "GET",
             xhrFields: {withCredentials: true},
             success: function(data, textStatus, jqXHR) {
                   console.log('success getting session');
                   var apiToken = jqXHR.getResponseHeader('X-Bonita-API-Token');
                   console.log('X-Bonita-API-Token: ' + apiToken);
                   var formData = {"title":"Mr","manager_id":"0","job_title":"Chief Executive Officer","lastname":"Jobs","firstname":"Will"};
                   $.ajax({
                         url: "BONITA_ACCESS_URL/bonita/API/identity/user/1",
                         type: "PUT",
                         contentType: "application/json",
                         /*passing the X-Bonita-API-Token for the CSRF security filter*/
                         headers: {'X-Bonita-API-Token': apiToken},
                         data: JSON.stringify(formData),
                         xhrFields: {withCredentials: true},
                         success: function(data, textStatus, jqXHR) {
                           console.log('success updating user info');
                           console.log(data);
                         },
                         error: function(jqXHR, textStatus, errorThrown) {
                           console.log('error updating user info');
                         }
                   });
             },
             error: function(jqXHR, textStatus, errorThrown) {
               console.log('error getting session');
             }
           });
     },
     error: function(jqXHR, textStatus, errorThrown) {
       console.log('error login');
     }
   });
 </script>
</body>
</html>


```

