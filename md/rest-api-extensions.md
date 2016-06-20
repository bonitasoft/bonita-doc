# REST API extensions

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

REST API extensions provide a solution for integration between forms/pages and third party systems (including Bonita BPM Engine). They can be used to query [business data](define-and-deploy-the-bdm.md), Bonita BPM Engine APIs, or an external information
system (such as a database, web service, LDAP directory...). They also help to keep a clean separation between the front-end (forms, pages, and interfaces visible to users) and the back-end (processes).

<!---<p>This page provide a tutorial to create a REST API extension using Subscription edition tooling. If you are running Community edition checkout the dedicated <a href="">documentation page</a>.</p>--->

<!---<p>If you need more details about REST API extension checkout the <a href="">documentation reference page</a>.</p>--->


## Prerequisites

Prerequisites for developing a REST API extension are:

* Java/Groovy development expertise.
* Basic knowledge of Maven.
* **Access to [Maven central repository](http://central.maven.org/maven2)**. If your provider is restricting Internet access you may configure [proxy settings](https://maven.apache.org/guides/mini/guide-proxies.html) or create a [mirror repository](https://maven.apache.org/guides/mini/guide-mirror-settings.html).

## Example description

The following sections show how to create a REST API extension. As an example, we create a REST API extension that use Bonita BPM Engine to provide user informations (first name, last name, email address).

## Generate a new REST API extension skeleton

1. In the **Development** menu, choose **REST API Extension** then **New...**.
1. Enter a **Name**, for example _User informations REST API Extension_.
1. Enter a **Description**, for example _Query Bonita BPM Engine to retrieve user informations_.
1. Enter a package name, use to set the artifact **Group id**, for example: _com.company.rest.api_
1. Enter a **Project name**, for example _userInformationRestAPIExension_
1. Click **Next**.
1. Enter the **pathTemplate** for this REST API extension, for example _userInformation_. This will be the access point of the API, and follows this pattern: `{bonita_portal_context}/API/extension/userInformation`.
1. As this REST API extension does not access business data you can safely uncheck "Add BDM dependencies" check box.
1. Define a **Permission** name for the extension (replace the default one), for example _read\_user\_information_. This is the name of the permission the users should have to be granted access to the extension (see [REST API extensions usage](api-extensions.md#usage)
1. Click **Next**
1. This screen defines **URL parameters** that will be passed to the API. By default, _p_ and _c_ parameters are defined to enables paged result, it applies well in our examples as we want to return a list of users.
1. Click **Create**.

## Write the code

### Main source code

First step would be to remove files and code related to REST API configuration as we don't need to define configuration parameters for our REST API:

1. Delete `configuration.properties` from `src/main/resources` folder
2. Delete `testConfiguration.properties` from `src/test/resources`
3. Remove the setup of configuration file mock. Edit `IndexTest.groovy`, go to `setup()` method and remove the line starting with `resourceProvider...`.
4. Remove the example of configuration usage in `Index.groovy` file (see comment starting with: "Here is an example of you can...").

Now we can add our business logic. In `Index.groovy`, in `doHandle` method, locate the "Your code goes here" comment and add your code below (removing the existing `result` and `return` statement):
```groovy
// Convert parameters from string to int
p = p as int
c = c as int

// Initialize the list to store users information  
def usersInformation = []

// Get the list of user  
List<User> users = context.apiClient.identityAPI.getUsers(p*c, c, UserCriterion.FIRST_NAME_ASC)

// Iterate over each user
for (user in users) {
	// Get user extra information (including email address)
	ContactData contactData = context.apiClient.identityAPI.getUserContactData(user.id, false)

	// Create a map with current user first name, last name and email address
	def userInformation = [firstName: user.firstName, lastName: user.lastName, email: contactData.email]

	// Add current user information to the global list
	usersInformation << userInformation
}

// Prepare the result
def result = [p: p, c: c, userInformation: usersInformation]

int startIndex = p*c
int endIndex = p*c + users.size() - 1

// Send the result as a JSON representation
return buildPagedResponse(responseBuilder, new JsonBuilder(result).toPrettyString(), startIndex, endIndex, context.apiClient.identityAPI.numberOfUsers)
```

Make sure you are adding all missing imports (default shortcut CTRL+SHIFT+o).

### Test source code

Now we need to update the test to verify the behavior of our REST API extension by editing `IndexTest.groovy`.

First step is to define some mocks for our externals dependencies such as Engine Identity API. Add the following mocks declaration after the existing ones:
```groovy
def apiClient = Mock(APIClient)
def identityAPI = Mock(IdentityAPI)
def april = Mock(User)
def william = Mock(User)
def walter = Mock(User)
def contactData = Mock(ContactData)
```

Now we need to define the generic behavior of our mocks. `setup()` method should have the following content:
```groovy
context.apiClient >> apiClient
apiClient.identityAPI >> identityAPI

identityAPI.getUsers(0, 2, _) >> [april, william]
identityAPI.getUsers(1, 2, _) >> [william, walter]
identityAPI.getUsers(2, 2, _) >> [walter]

april.firstName >> "April"
april.lastName >> "Sanchez"
william.firstName >> "William"
william.lastName >> "Jobs"
walter.firstName >> "Walter"
walter.lastName >> "Bates"

identityAPI.getUserContactData(*_) >> contactData
contactData.email >> "test@email"
```

Now you can define a test method. Replace existing test `should_return_a_json_representation_as_result` method with the following one:
```groovy
def should_return_a_json_representation_as_result() {
  given: "a RestAPIController"
  def index = new Index()
  // Simulate a request with a value for each parameter
  httpRequest.getParameter("p") >> "0"
  httpRequest.getParameter("c") >> "2"

  when: "Invoking the REST API"
  def apiResponse = index.doHandle(httpRequest, new RestApiResponseBuilder(), context)

  then: "A JSON representation is returned in response body"
  def jsonResponse = new JsonSlurper().parseText(apiResponse.response)
  // Validate returned response
  apiResponse.httpStatus == 200
  jsonResponse.p == 0
  jsonResponse.c == 2
  jsonResponse.userInformation.equals([
    [firstName:"April", lastName: "Sanchez", email: "test@email"],
    [firstName:"William", lastName: "Jobs", email: "test@email"]
  ]);
}
```

You should now be able to run your unit test. Right click the `IndexTest.groovy` file and click on **REST API Extension** \> **Run JUnit Test**. The JUnit view displays the test results. All tests should pass.

## Build, deploy and test the REST API extension

Studio let you build and deploy the REST API extension in the embedded test environment.

First step is to configure security mapping for your extension in Studio embedded test environment:

1. In the **Development** menu, choose **REST API Extension** then **Edit permissions mapping**.
1. Append this line at the end of the file:
`profile|User=[read_user_information]` This means that anyone logged in with the user profile is granted this permission.
1. Save and close the file.

Now you can actually build and deploy the extension:

1. In the **Development** menu, choose **REST API Extension** \> **Deploy...**
1. Select the userInformationRestAPIExension REST API extension.
1. Click on **Deploy** button.
1. In the coolbar, click the **Portal** icon. This opens the Bonita BPM Portal in your browser.
1. In the Portal, change to the **Administrator** profile.
1. Go to the **Resources** tab, and check that the User information REST API extension is in the list of REST API extension resources.

Now you finally test your REST API extension:

1. Open a new tab in the web browser
1. Enter the following URL: `http://localhost:8080/bonita/API/extension/userInformation?p=0&c=10`.
1. The JSON response body should be displayed.

The REST API extension can be used in forms and pages in the **UI Designer** using an `External API` variable.

## Example ready to use

You can download the [REST API extension described in the tutorial above](https://github.com/Bonitasoft-Community/rest-api-user-information) or check [data source REST API extension](http://community.bonitasoft.com/project/data-source-rest-api-extension) as a reference.
