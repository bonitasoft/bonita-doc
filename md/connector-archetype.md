# Bonita connector archetype
A set of best of breed tools to develop and test custom connectors independently of the Bonita Studio. 

## Create a custom connector

Bonita offers the possibility to create and plug custom connectors, to allow you to connect with any external system you may need.  
We provide a maven archetype to help you to bootstrap a connector project. The source code of the archetype is available [here](https://github.com/bonitasoft/bonita-connector-archetype).

### Prerequisite

 1. Java 8 must be installed: [https://adoptopenjdk.net/index.html](https://adoptopenjdk.net/index.html)
 2. Maven must be installed: [https://maven.apache.org/install.html](https://maven.apache.org/install.html)
 3. Connector development requires some software development skills. The archetype offers the possibility to develop the connector in _Java_, _Groovy_ or _Kotlin_. Make sure that you are comfortable with at least one of those three languages. 

### Generate the project using the maven archetype

A [maven archetype](https://maven.apache.org/archetype/index.html) is a maven project templating toolkit. This archetype allows you to bootstrap a Bonita connector project on your file system. A Bonita connector project is a maven project. It can be built, tested and then imported into a Bonita project using Bonita Studio.

To create your connector project, prompt a terminal and enter the following command: 
::: warning
**Warning:** Make sure that you are not executing the command from an existing maven project.
:::
```
mvn archetype:generate -DarchetypeGroupId=org.bonitasoft.archetypes -DarchetypeArtifactId=bonita-connector-archetype
```
You'll then have to specify interactively the properties of your project: 

- **groupId:** the group id of your connector.
- **artifactId:** the artifact id of your connector
	- Must match the following regex: `^[a-zA-Z0-9\-]+$`
    - Example: _myConnector-1_
- **version:** the version of your connector _(default value: 1.0-SNAPSHOT)_
Follow the [maven naming convention guide](http://maven.apache.org/guides/mini/guide-naming-conventions.html)
- **package** the package in which the connector source files will be created _(default value: the group id of the connector)_
- **bonitaVersion:** the targeted Bonita version
    - A Bonita connector project depends on _org.bonitasoft.engine:bonita-common_. To avoid potential conflicts / errors at runtime, you should use the Bonita version of your runtime environment.
- **className:** the class name of your connector 
    - Must match the following regex: `^[a-zA-Z_$][a-zA-Z\d_$]+$` (A Java classname valid identifier)
    - Example: _MyConnector1_
- **language**: the language used in the connector project. Available values:
    - java
    - groovy
    - kotlin

A folder named _[your artifact id]_ is created, with your Bonita connector project, ready to use.

⚠️ You can avoid the interactive mode by specifying all properties of your project directly in the command line, but by doing that you'll bypass the validation performed on the properties content.


### Connector developpment

In this section we'll look into the different components of a connector project, and how you should use them to develop your connector.

#### Definition
A connector is first defined by its **definition**.  It is an XML file located in _src/main/resources/[artifactId].def_ by default.   
A connector definition defines the inputs and the outputs of a connector. It can be seen as a black box. The definition explicits what will be passed to the connector, and what is expected as output. Then, implementations of this definition can be created, they just need to respect the inputs / outputs contract of the definition.  

The connector definition XSD is available in _schemas/connector-definition-descriptor.xsd_, you can import it in a IDE to get completion. 


![Connector definition xsd overview](images/connector-def-xsd-overview.png)


Example: 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<definition:ConnectorDefinition xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:definition="http://www.bonitasoft.org/ns/connector/definition/6.1">
    <id>myConnector</id> <!-- Id of the definition -->
    <version>1.0.0</version> <!-- Version of the definition -->
    <icon>connector.png</icon> <!-- The icon used in the Studio for this definition -->
    <category icon="connector.png" id="Custom"/> <!-- The category of this definition, used in the Studio (e.g: http, script ...) -->
  
    <!-- Connector inputs -->
    <input mandatory="true" name="defaultInput" type="java.lang.String"/>
    
    <!-- Connector outputs -->
    <output name="defaultOutput" type="java.lang.String"/>
    
    <!--
       Pages and widgets to use the connector in the Bonita Studio.
       - Each widget must be bound to an input
       - Page titles must be defined in the properties files
       - Widget labels must be defined in the properties files
       - Page and widget descriptions can be defined in the properties files (optional)
    -->
    <page id="defaultPage">
        <widget xsi:type="definition:Text" id="defaultInputWidget" inputName="defaultInput"/>
    </page>
  
</definition:ConnectorDefinition>
```

##### Connector Inputs

The inputs of a connector are defined in the definition. Those inputs are valued by processes, and are retrieved by the implementation classes of the connector to execute the business logic.  
A connector input: 

 - Has a name
 - Has a type
 - Has an optional default value
 - Can be mandatory 

##### Connector Outputs

The outputs of a connector are defined in the definition. Those outputs are valued by the implementation classes of the connector, and are used by processes.  
A connector output:

 - Has a name
 - Has a type

##### Pages and widgets

A connector definition includes _pages_ and _widgets_.  Those elements define the UI that will appear in the Bonita Studio to configure the connector.  

 - A widget is bound to an input
 - A page contains a set of widgets

The idea is to create pages for related inputs, so the person who will configure the connector will easily understand what he has to do. 

 All the available widgets are defined in the XSD. You must reference the widget type in the tag to create a specific widget: 

``` xml 
<widget  xsi:type="definition:[WIDGET TYPE]"  id="[WIDGET ID]"  inputName="[CORRESPONDING INPUT]"/>
```

The widget id is used in the _.properties_ files to define and translate the widget name and the widget description.  
The input name is used to bind this widget to one of the connector inputs.  

Some widgets can require additional informations. For example, if you want to create a select widget with a set of item to select, you will have to do something like that: 

``` xml
<widget xsi:type="definition:Select" id="choiceWidget" inputName="choice">
    <items>Choice 1</items>
    <items>Choice 2</items>
    <items>Choice 3</items>
</widget>
```

:::warning
**Warning:** As widgets are displayed in a dialog window in the Studio, be careful to not use too many widgets in the same page. 
Use Group widget if you need to stack a lot of widgets in the same page.
:::

#### Connector implementation

A _connector implementation_ implements a connector definition. A definition defines a set on inputs / outputs, implementing a definition means use the provided inputs to create the expected outputs.  
Several implementations can be created for a given definition. A connector implementation can be updated at runtime in a Bonita bundle, as long as it implements the same definition.  

A connector implementation is made of two elements: 
- An xml file used to explicit the definition implemented, the dependencies required and the location of the implementation sources
- A set of Java based classes, constituting the implementation sources

##### Implementation XML file

The implementation XML file is located in _src/main/resources/[connector name].impl_ by default.  
The connector definition XSD is available in _schemas/connector-implementation-descriptor.xsd_, you can import it in a IDE to get completion. 

![Connector implementation xsd overview](images/connector-impl-xsd-overview.png)

Example: 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<implementation:connectorImplementation xmlns:implementation="http://www.bonitasoft.org/ns/connector/implementation/6.0">
  <implementationId>myConnector-impl</implementationId> <!-- Id of the implementation -->
  <implementationVersion>$implementation.version$</implementationVersion> <!-- Version of the implementation, retrieved from the pom.xml at build time -> ${project.version} -->
  <definitionId>myConnector</definitionId> <!-- Id of the definition implemented -->
  <definitionVersion>1.0.0</definitionVersion> <!-- Version of the definition implemented -->
  <implementationClassname>myGroupId.Connector</implementationClassname> <!-- Path to the main implementation class -->
  <description>Default connector implementation</description>

<!-- Implementation dependencies, retrieved from the pom.xml at build time -->
$Dependencies$

</implementation:connectorImplementation>
```

##### Implementation sources

The implementation sources contain all the logic of the connector:

 - The validation of the inputs
 - The connection / disconnection to any external system _(if required)_
 - The execution of the business logic and the  creation of the outputs

The archetype offers the possibility to generate the default sources in Java, Groovy or Kotlin. The build result will always be a Java archive (jar), no matters the langage selected.

The entry point of the implementation sources must extend the class _`org.bonitasoft.engine.connector.AbstractConnector`_.

Example (_Groovy_): 
```groovy
package myGroupId

import org.bonitasoft.engine.connector.AbstractConnector;
import org.bonitasoft.engine.connector.ConnectorException;
import org.bonitasoft.engine.connector.ConnectorValidationException;

class Connector extends AbstractConnector {
    
    def defaultInput = "defaultInput"
    def defaultOutput = "defaultOutput"
    
    /**
     * Perform validation on the inputs defined on the connector definition (src/main/resources/myConnector.def)
     * You should:
     * - validate that mandatory inputs are presents
     * - validate that the content of the inputs is coherent with your use case (e.g: validate that a date is / isn't in the past ...)
     */
    @Override
    def void validateInputParameters() throws ConnectorValidationException {
        checkMandatoryStringInput(defaultInput)
    }
    
    def checkMandatoryStringInput(inputName) throws ConnectorValidationException {
        def value = getInputParameter(inputName)
        if (value in String) {
            if (!value) {
                throw new ConnectorValidationException(this, "Mandatory parameter '$inputName' is missing.")
            }
        } else {
            throw new ConnectorValidationException(this, "'$inputName' parameter must be a String")
        }
    }
    
    /**
     * Core method:
     * - Execute all the business logic of your connector using the inputs (connect to an external service, compute some values ...).
     * - Set the output of the connector execution. If outputs are not set, connector fails.
     */
    @Override
    def void executeBusinessLogic() throws ConnectorException {
        def defaultInput = getInputParameter(defaultInput)
        setOutputParameter(defaultOutput, "$defaultInput - output".toString())
    }
    
    /**
     * [Optional] Open a connection to remote server
     */
    @Override
    def void connect() throws ConnectorException{}

    /**
     * [Optional] Close connection to remote server
     */
    @Override
    def void disconnect() throws ConnectorException{}
}
```

The methods _validateInputParameters_ and _executeBusinessLogic_ must be implemented, and are called by the Bonita engine when the connector is executed.  
The methods _connect_ and _disconnect_ can be used to open and close a connection to a remote server.  The life cycle of the connection will then be managed by the Bonita engine.

#### Build a connector project

A connector project is built using Maven, and especially the [maven assembly plugin](https://maven.apache.org/plugins/maven-assembly-plugin/).   
The root _pom.xml_ file has the following parent: 
```xml
<parent>
    <groupId>org.bonitasoft.connectors</groupId>
    <artifactId>bonita-connectors</artifactId>
    <version>1.0.0</version>
</parent>
```
This parent contains the logic that make the replacements in the implementation xml file at build time.

By default, a zip archives is built containing all the definitions and implementations found in the project.
By importing this archive in a Bonita Studio you will import all the definitions and implementations created in the project

To build the connector project, type the following command at the root of the project : 
```
./mvnw clean install
```
The built archive can be found in here `target/[artifact id]-[artifact version].zip` after the build.


## Example

In this example, we are going to create a connector to communicate with the [Star Wars API](https://swapi.dev/). It will take in input a Star Wars character name, and will return details on this character.  

This connector will be implemented using: 

 - [Groovy](https://groovy-lang.org/): _A programming language based on the JVM_
 - [Spock](http://spockframework.org/): _A test framework for Groovy applications_
 - [Retrofit](https://square.github.io/retrofit/): _A library which allows to create typed http clients_

### 1 - Generate project and retrieve dependencies
The first step is to generate  the maven project using the archetype:

```
mvn archetype:generate -DarchetypeGroupId=org.bonitasoft.archetypes -DarchetypeArtifactId=bonita-connector-archetype
```

* **groupId**: com.company.connector
* **artifactId**: connector-starwars
* **version**: 1.0.0-SNAPSHOT
* **package**: com.company.connector
* **bonitaVersion**: _[Your Bonita version]_ (ex: 7.10.4)
* **className**: ConnectorStarWars
* **language**: groovy
* **wrapper**: true

The generated project has the following skeleton:  

![Connector project overview](images/connector-archetype-example/connector-project-overview.png)  

Add the following properties and dependencies to the existing ones in the pom.xml: 

```xml
<properties>
    <retrofit.version>2.9.0</retrofit.version>
    <logging-interceptor.version>3.11.0</logging-interceptor.version>
    <converter-jackson.version>2.4.0</converter-jackson.version>
    <mockwebserver.version>3.14.8</mockwebserver.version>
</properties>

<dependencies>
    <dependency>
        <groupId>com.squareup.retrofit2</groupId>
        <artifactId>retrofit</artifactId>
        <version>${retrofit.version}</version>
    </dependency>
    <dependency>
        <groupId>com.squareup.okhttp3</groupId>
        <artifactId>logging-interceptor</artifactId>
        <version>${logging-interceptor.version}</version>
    </dependency>
    <dependency>
        <groupId>com.squareup.retrofit2</groupId>
        <artifactId>converter-jackson</artifactId>
        <version>${converter-jackson.version}</version>
        <exclusions>
            <exclusion>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-databind</artifactId>
            </exclusion>
        </exclusions>
    </dependency>

    <dependency>
        <groupId>com.squareup.okhttp3</groupId>
        <artifactId>mockwebserver</artifactId>
        <version>${mockwebserver.version}</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

If you are interested by test coverage, you can add the following jacoco configuration: 
```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.5</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <!-- attached to Maven test phase -->
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### 2 - Define connector inputs 

The connector inputs are defined in the connector definition.  
Open the file _src/main/resources/connector-starwars.def_  
We are first going to create two inputs for the connector: 

 - An input **_name_**, which will contain the name of a star wars character
 - An input **_url_**, which will contain the API server url (so if the API server URL changes in the future, the service will still be usable).

Remove the default input from the definition, and add the two following inputs: 
```xml
<input mandatory="true" name="name" type="java.lang.String"/>
<input mandatory="true" name="url" type="java.lang.String" defaultValue="http://swapi.dev/"/>
```

Then we are going to create a _page_ and two _widgets_ for those inputs. _Pages_ and _widgets_ are used by the Bonita Studio to create a User Interface from the connector definition. 

Replace the default page by the following one: 
```xml
<page id="starWarsPage"> 
    <!-- 
    A widget has a type (Text, combo box ...), an id and an input name. 
    - The name must reference an existing input
    - The id is used in the property file to reference the widget 
    -->
    <widget xsi:type="definition:Text" id="nameWidget" inputName="name"/>
    <widget xsi:type="definition:Text" id="urlWidget" inputName="url"/>
</page>
```

For each page and widget , a name and a description must be added  in the property file, else the Studio is unable to display the element.  
Open the file _src/main/resources/connector-starwars.properties_ and replace the content for the default page and widgets by the following: 

```
starWarsPage.pageTitle=Star Wars connector - configuration page
starWarsPage.pageDescription=Indicate a Star Wars character name, and the service base URl if required.
nameWidget.label=Character name
nameWidget.description=The name of the character to retrieve
urlWidget.label=URL
urlWidget.description=The service base url
```

### 3 - Create the retrofit service and the model

Retrofit is a library allowing to create typed HTTP clients.  
We will first create a data model, and then a retrofit service typed with this model. 

#### The model

The model should match the API response structure, else some custom convertors are required.  
Here is an example of an API call and the response: 
```
GET /api/people/?search=yoda
```

``` json
{
    "count": 1, 
    "next": null, 
    "previous": null, 
    "results": [
        {
            "name": "Yoda", 
            "height": "66", 
            "mass": "17", 
            "hair_color": "white", 
            "skin_color": "green", 
            "eye_color": "brown", 
            "birth_year": "896BBY", 
            "gender": "male"
            ...
        }
    ]
}
```

Our model will contain two Classes : 

 - **_PersonResponse_**, which will represent the raw response, and only contain the result list.
 - **_Person_**, which will represent an element of the result list.


Create a new package _model_ in the package _com.company.connector_, and add those two classes in this package: 

```groovy
package com.company.connector.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
class Person implements Serializable {

    String name

    String gender

    String height

    String homeworld
}
```

```groovy
package com.company.connector.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty

@JsonIgnoreProperties(ignoreUnknown = true)
class PersonResponse implements Serializable {

    @JsonProperty("results")
    List<Person> persons = []
}
```

_note:_ The API returns many informations about a single star wars character. In order to keep it simple, we decided to just include a few of them in our Person model, but fill free to add other fields if you want to.

#### The service

A retrofit service is a Java interface. Specific annotations on methods are used to define the service.  
In the package _com.company.connector_, create the Interface _StarWarsService_:

```groovy
package com.company.connector

import com.company.connector.model.PersonResponse
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.Query

interface StarWarsService {

    @Headers("Accept: application/json")
    @GET("api/people")
    def Call<PersonResponse> person(@Query("search") String name)
}
```
This service declares a single GET endpoint on _api/people_, with a query parameter _search_. 

### 4 - Define connector output

Now that the model is created, we can define the connector outputs.  
Connector outputs are defined in the definition.  
Open the file _src/main/resources/connector-starwars.def_, and replace the default output by the following one: 

```xml
<output name="person" type="com.company.connector.model.Person"/>
``` 

_note:_ The type of a connector output must be ***serializable***.

### 5 - Implement and test connector logic

The main class of the connector has already been created during the project generation. This class is in charge of: 

 - Performing validation on connector inputs
 - Connecting / disconnecting to any external service
 - Executing the connector logic (call the API in our case)
 - Setting connector outputs

The main class of a connector is referenced in the implementation. In our case, it's the class _ConnectorStarWars_.  
Open the file _src/main/groovy/com.company.connector.ConnectorStarWars.groovy_, and the associated test file _src/test/groovy/com.company.connector.ConnectorStarWarsTest.groovy_

We will complete and test this class in three steps: 

 1. Input validation
 2. Retrofit service creation 
 3. API call 

#### Input validation

We will only validate that the two mandatory String inputs are provided by the user.  
Complete the method _validateInputParameters_ with the following content:


```groovy
    def static final NAME_INPUT = "name"
    def static final URL_INPUT = "url"

    @Override
    def void validateInputParameters() throws ConnectorValidationException {
        checkMandatoryStringInput(NAME_INPUT)
        checkMandatoryStringInput(URL_INPUT)
    }

    def checkMandatoryStringInput(inputName) throws ConnectorValidationException {
        def value = getInputParameter(inputName)
        if (value in String) {
            if (!value) {
                throw new ConnectorValidationException(this, "Mandatory parameter '$inputName' is missing.")
            }
        } else {
            throw new ConnectorValidationException(this, "'$inputName' parameter must be a String")
        }
    }
```

Add the following tests in the test class, to validate the behavior when an input is incorrect: 

``` groovy
    def should_throw_exception_if_mandatory_input_is_missing() {
        given: 'Connector with missing input'
        def connector = new ConnectorStarWars()

        when: 'Validating inputs'
        connector.validateInputParameters()

        then: 'ConnectorValidationException is thrown'
        thrown ConnectorValidationException
    }

    def should_throw_exception_if_mandatory_input_is_empty() {
        given: 'A connector without an empty input'
        def connector = new ConnectorStarWars()
        connector.setInputParameters([(ConnectorStarWars.NAME_INPUT):''])

        when: 'Validating inputs'
        connector.validateInputParameters()

        then: 'ConnectorValidationException is thrown'
        thrown ConnectorValidationException
    }

    def should_throw_exception_if_mandatory_input_is_not_a_string() {
        given: 'A connector without an integer input'
        def connector = new ConnectorStarWars()
        connector.setInputParameters([(ConnectorStarWars.NAME_INPUT):38])

        when: 'Validating inputs'
        connector.validateInputParameters()

        then: 'ConnectorValidationException is thrown'
        thrown ConnectorValidationException
    }
```

#### Retrofit service creation 

In the class _ConnectorStarWars_, replace the method _connect_ by the following one. We do not need to implement the disconnect method, as there is no authentication.
Creating the service in the _connect_ method  ensure that the service will be created once (and only once) before the logic execution.

```groovy
def StarWarsService service

@Override
def void connect() throws ConnectorException {
    def httpClient = createHttpClient(new HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BASIC))
    service = createService(httpClient, getInputParameter(URL_INPUT))
}

def static OkHttpClient createHttpClient(Interceptor... interceptors) {
    def clientBuilder = new OkHttpClient.Builder()
    if (interceptors) {
        interceptors.each { clientBuilder.interceptors().add(it) }
    }
    clientBuilder.build()
}

def static StarWarsService createService(OkHttpClient client, String baseUrl) {
    new Retrofit.Builder()
            .client(client)
            .addConverterFactory(JacksonConverterFactory.create())
            .baseUrl(baseUrl)
            .build()
            .create(StarWarsService.class)
}
```

The service is created using a http client with a simple logging interceptor, and the retrofit builder.  
Our model matchs the HTTP response so we do not need to provide custom convertor to the retrofit builder.  

We are going to create an integration test for this service:  
in _src/test/groovy_, create the class _com.company.connector.StarWarsServiceTest.groovy_ with the following content: 

```groovy
package com.company.connector

import com.company.connector.model.PersonResponse
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Response
import spock.lang.Specification

class StarWarsServiceTest extends Specification {

    /**
     * Service integration test - internet required
     */
    def should_retrieve_luke_data_using_retrofit() {
        given: 'A service'
        def httpClient = ConnectorStarWars.createHttpClient(new HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
        def service = ConnectorStarWars.createService(httpClient, "http://swapi.dev/")

        when: 'Searching for luke'
        def call = service.person("Luke")
        def Response<PersonResponse> response = call.execute()

        then: 'Should contain Luke data'
        assert response.isSuccessful() == true
        assert response.body.persons.size() == 1
        assert response.body.persons[0].name == "Luke Skywalker"
    }
}
```

#### API call 

We are finally going to perform the API call to retrieve details on a Star Wars character, and then put those details in the related connector output.  
In the class _ConnectorStarWars_,  replace the method _executeBusinessLogic_ by the following one.

```groovy
def static final PERSON_OUTPUT = "person"

@Override
def void executeBusinessLogic() throws ConnectorException {
    def name = getInputParameter(NAME_INPUT)
    log.info "$NAME_INPUT : $name"
    // Retrieve the retrofit service created during the connect phase, call the 'person' endpoint with the name parameter
    def response = getService().person(name).execute()
    if (response.isSuccessful()) {
        def persons = response.body.getPersons()
        if (!persons.isEmpty()) {
            def person = persons[0]
            setOutputParameter(PERSON_OUTPUT, person)
        } else {
            throw new ConnectorException("$name not found")
        }
    } else {
        throw new ConnectorException(response.message())
    }
}
```

In order to test the logic of our connector, we are going to mock the Star Wars web server using _MockWebServer_.  Thus we will be able to unitary test that the http response is correctly parsed, the output correctly set, and that server errors are managed.  

Add the following tests in the test class _ConnectorStarWarsTest_:

```groovy
def server
def connector

def setup() {
    server = new MockWebServer()
    def url = server.url("/")
    def baseUrl = "http://${url.host}:${url.port}"

    def httpClient = ConnectorStarWars.createHttpClient(new HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
    def service = ConnectorStarWars.createService(httpClient, baseUrl)

    connector = new ConnectorStarWars()
    connector.service = service
}

def cleanup() {
    server.shutdown();
}

/**
 * Connector unit test - no internet required
 */
def should_fetch_person() {
    given: 'A person name'
    def name = 'Luke'
    and: 'A related person JSON response'
    def body = """
        {"results": [
            {
                "name":"$name Skywalker",
                "height":"172",
                "mass":"77",
                "hair_color":"blond",
                "skin_color":"fair",
                "eye_color":"blue",
                "birth_year":"19BBY",
                "gender":"male",
                "homeworld":"http://swapi.dev/api/planets/1/"
            }
        ]}
    """
    server.enqueue(new MockResponse().setBody(body))

    when: 'Executing connector'
    connector.setInputParameters(['name': name])
    connector.executeBusinessLogic()

    then: 'Connector output should contain the person data'
    def outputParameters = connector.outputParameters
    outputParameters.size() == 1

    def person = outputParameters.get(ConnectorStarWars.PERSON_OUTPUT)
    person instanceof Person
    person.name == "Luke Skywalker"
}

/**
 * Connector unit test - no internet required
 */
def should_get_unknown_person() {
    given: 'An API server'
    String body = "{\"results\":[]}"
    server.enqueue(new MockResponse().setBody(body))

    when: 'Executing business logic'
    def name = 'Luke'
    connector.setInputParameters(['name': name])
    connector.executeBusinessLogic()

    then: 'Connector should throw exception'
    def e = thrown(ConnectorException)
    e.getMessage() == "$name not found"
}

/**
 * Connector unit test - no internet required
 */
def should_handle_server_error() {
    given: 'An API server'
    server.enqueue(new MockResponse().setResponseCode(500))

    when: 'Executing business logic'
    def name = 'Luke'
    connector.setInputParameters(['name': name])
    connector.executeBusinessLogic()

    then: 'Connector should throw exception'
    def e = thrown(ConnectorException)
    e.getMessage() == "Server Error"
}
```

### 6 - Build and import the connector in Bonita

The implementation of the connector is finished.  
You can build the connector using the following command line at the root of the project: 

```
./mvnw clean package
```

The result of the build is a zip archive present in the target folder : _connector-starwars-1.0.0-SNAPSHOT.zip_. 
This archive can be imported in a Bonita Studio (from the menu development -> connector -> import), and is ready to be used in processes.
