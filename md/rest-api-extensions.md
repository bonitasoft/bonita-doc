# 4.4.11 Creating a REST API extension

REST API extensions provide data sources for forms and pages. They can be used to query [business data](/business-data-model-856) or an external information system (such as a database, web service, or LDAP directory).
They also help to keep a clean separation between the front-end (forms, pages, and interfaces visible to users) and the back-end (processes).
In the Bonita BPM Studio, a REST API Extension is a [Maven artifact](http://maven.apache.org/).


Prerequisites for developing a REST API extension:

* Basic knowledge of Maven
* Groovy/Java development expertise

The following sections show how to create and deploy a REST API extension. As an example, they show a REST API extension that queries the corporate LDAP directory to get the list of all users.


## Create a new REST API Extension


1. In the **Development** menu, choose **REST API Extension** then **New...**.

A REST API should be resource oriented. Here the resource name could be LDAPUser.

2. Enter a **Display name**, for example _LDAPUser REST API Extension_.
3. Enter a **Description**, for example _Query the company LDAP directory to retrieve ldap users_.
4. Enter a package name, use to set the artifact **Group id**, by example: com.company.rest.api
5. Enter a **Project name**, for example _ldapUserRestAPIExension_, also used as **Artifact id**
6. Click **Next**.
7. Enter the **pathTemplate** for this REST API extension, for example _ldap/users_. 
This will be the access point of the API, and follows this pattern: `{bonita_portal_context}/API/extension/ldap/users`.
8. Define a **Permission** for the extension, for example _read\_ldap\_users_. 
Each REST API extension should declare its own [authorization permission](/rest-api-authorization.md). Users require this permission to use the extension. /li\>
9. Click **Next**
10. Add **URL parameters** that will be passed to the API. By default, _p_ and _c_ parameters are defined to enables paged result, it apllies well in our examples as we want to return a list of users.
11. Click **Create**.

When the project is created, Bonita BPM Studio presents a developer interface. This gives access to the project resources, a console view, a problem overview, a JUnit view, and an outline.
It also opens two files: `Index.groovy` which is the RestAPIController and `page.properties` where the REST API extension is configured.
Another file of interest is the `pom.xml` of your project, where you can add dependencies.

Note: `provided` must be used for dependencies that are already available at runtime, such as Bonita BPM dependencies or common dependencies that are already in the classpath.


A new REST API extension is generated with some initial content:

* `Index.groovy`: The RestAPIController with some generated code as an example of how to retrieve URL parameters and return responses.
* `IndexTest.groovy`: The unit tests covering the generated code using [Spock framework](http://spockframework.github.io/spock/docs/1.0/index.html).
* `page.properties`: The REST API extension configuration properties.
* `configuration.properties`: An example of a configuration property file for the business logic.
* `content.xml`: A maven assembly to package the REST API Extension for deployment.

## Write the code

1. Right click the `IndexTest.groovy` file and click on **REST API Extension** \> **Run JUnit Tests**. The JUnit view displays the test results. All tests should pass.
2. Because the values of the parameters _p_ and _c_ are supposed to be integer values, update the generated content to match that (for example, replace "value1" by "0")
3. Update `IndexTest.groovy` to add a new test to validate that the page parameter is an integer:
`
 def should_return_an_error_response_if_p_parameter_is_not_a_positive_integer() {
		given: "a request with p parmeter not being a positive integer"
		def index = new Index()
		httpRequest.getParameter("p") >> "aStringValue"
		// Other parameters return a valid value
		httpRequest.getParameter("c") >> "50"

		when: "Invoking the REST API"
		def apiResponse = index.doHandle(httpRequest, new RestApiResponseBuilder(), context)

		then: "A JSON response is returned with a HTTP Bad Request Status (400) and an error message in body"
		def jsonResponse = new JsonSlurper().parseText(apiResponse.response)
		// Validate returned response
		apiResponse.httpStatus == 400
		jsonResponse.error == "the parameter p is not a positive integer"
	}
`
4. Re-run the tests. The test above should fail.
5. Edit `Index.groovy` to make the test pass:
`
 @Override
	RestApiResponse doHandle(HttpServletRequest request, RestApiResponseBuilder responseBuilder, RestAPIContext context) {
		// To retrieve query parameters use the request.getParameter(..) method.
		// Be careful, parameter values are always returned as String values

		// Retrieve p parameter
		def p = request.getParameter "p"
		if (p == null) {
			return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter p is missing"}""")
		}
		def pageNumber;
		try{
			pageNumber = p as int
			if(pageNumber 
`
6. Re-run the tests. All tests should pass.
7. Repeat this operation for the _c_ parameter.
8. Now you can add the business logic to query the LDAP directory.
All configuration information (including security and connection parameters) can be stored in a the `configuration.properties` file. 
The result of the query must be returned as a [JSON representation](http://www.json.org/). 
You can use [groovy.json.JsonBuilder](http://docs.groovy-lang.org/latest/html/gapi/groovy/json/JsonBuilder.html) to transform a Java object into JSON.
9. To return a paged result you may use `buildPagedResponse` method instead of `buildResponse`
`
    return buildPagedResponse(responseBuilder, new JsonBuilder(result).toPrettyString(), p as int, c as int, totalUsers)
`
Where _totalUsers_ is the total number of users returned for the current query in the ldap (Should be retrieved with a count query).

## Configure logging.properties

You may want to use the generated SLF4J LOGGER to log informations, warnings or errors relevant for error recovery.To Configure the log output, modify the logging.properties of the tomcat.


1. Open logging.properties file: %TOMCAT\_FOLDER%/conf/logging.properties (if you are in a Studio environment, tomcat folder is located here be default: %STUDIO\_DIR%/workspace/tomcat)
2. Append the following lines at the end of the files:
`
    #log rest api extension output in bonita.log file
    # com.company.rest.api is an example of a package where the RestAPIController is. You must use your own package here.
    com.company.rest.api.handlers = 5bonita.org.apache.juli.FileHandler
    com.company.rest.api.level = INFO
`
3. Restart tomcat to apply changes. (In Studio,menu Server \> Restart Web server)

## Deploy the LDAP REST API extension

1. In the **Development** menu, choose **REST API Extension** then **Edit permissions mapping**.
2. Save and close the file.
3. Append this line:
`
profile|User=[read_ldap_users]
` 
This means that anyone logged in with the user profile is granted this permission.
4. Save and close the file.


5. In the **Development** menu, choose **REST API Extension** \> **Deploy...** and then deploy ldapUserRestAPIExension.
6. In the coolbar, click the Portal icon. This opens the Bonita BPM Portal in your browser.
7. In the Portal, change to the **Administrator** profile.
8. Go to the **Resources** tab, and check that the LDAPUser REST API extension is in the list of REST API extension resources. 
9. Open a new tab in the web browser and enter the following URL: `http://localhost:8080/bonita/API/extension/ldap/users?p=0&c=100`. The JSON response body should be displayed.

The LDAP REST API extension can be used in forms and pages in the **UI Designer** using an `External API` variable.