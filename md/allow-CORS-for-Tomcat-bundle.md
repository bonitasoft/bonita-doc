# Allow CORS in Tomcat bundle

When you call the REST API from another source than the original Tomcat where Bonita is installed,
you will face Cross-Origin Resource Sharing (CORS) issues. For instance you may see in your browser a message such as:

>Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at XXX.
>This can be fixed by moving the resource to the same domain or enabling CORS.

By configuring CORS filter on the bonitasoft tomcat bundle, you will be able to access the Bonita REST API from a page
 deploy on a different machine than the one where your bonita war is deployed.

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

here is an example of html page that:
- login on the loginservice, for a remote bonita application,
- get the current session, via the REST api system/session
- edit a user using the REST api identity/user

_**Important Note 1:** this example works on a bundle where the CSRF is activated. As the header "X-Bonita-API-Token" is set with the "session apiToken"._

_**Important Note 2:** to use this page you will need to replace the BONITA_ACCESS_URL by you own bonita URL._

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
             url: "http://BONITA_ACCESS_URL/bonita/loginservice",
             type: "POST",
             data: formData,
             xhrFields: {withCredentials: true},
             success: function(data, textStatus, jqXHR) {
                          $.ajax({
                                     url: "http://BONITA_ACCESS_URL/bonita/API/system/session/1",
                                     type: "GET",
                                     xhrFields: {withCredentials: true},
                                     success: function(data, textStatus, jqXHR) {
                                                   console.log('success updating user info');
                                                   var apiToken = jqXHR.getResponseHeader('X-Bonita-API-Token');
                                                   console.log('X-Bonita-API-Token: ' + apiToken);
                                                   var formData = {"title":"Mr","manager_id":"0","job_title":"Chief Executive Officer","lastname":"Jobs","firstname":"Will"};
                                                   $.ajax({
                                                            url: "http://BONITA_ACCESS_URL/bonita/API/identity/user/1",
                                                            type: "PUT",
                                                            contentType: "application/json",
                                                            headers: {'X-Bonita-API-Token': apiToken},
                                                            data: JSON.stringify(formData),
                                                            xhrFields: {withCredentials: true},
                                                            success: function(data, textStatus, jqXHR) {
                                                                        console.log('success get user info');
                                                                        console.log(data);
                                                            },
                                                            error: function(jqXHR, textStatus, errorThrown) {
                                                                        console.log('error updating user info');
                                                            }
                                                   });
                                     },
                                     error: function(jqXHR, textStatus, errorThrown) {
                                           console.log('error user session');
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

