# Bonita Rest API Extension archetype
A set of best of breed tools to develop and test Rest API Extension independently of the Bonita Studio. 

## Create a Rest API Extension

Bonita offers the possibility to extend the set of existing REST API with custom extension that let you enrich your forms and applications with specific needs. 
They can be used to query [business data](define-and-deploy-the-bdm.md), Bonita Engine APIs, or an external information system (such as a database, web service, LDAP directory...). They also help to keep a clean separation between the front-end (forms, pages, and interfaces visible to users) and the back-end (processes). 
We provide a Maven archetype to help you to bootstrap a Rest API Extension project. The source code of the archetype is available [here](https://github.com/bonitasoft/bonita-rest-api-extension-archetype).

### Prerequisite

 1. Java 8 must be installed: [https://adoptopenjdk.net/index.html](https://adoptopenjdk.net/index.html)
 2. Maven must be installed: [https://maven.apache.org/install.html](https://maven.apache.org/install.html)
 3. Rest API Extension development requires some software development skills. The archetype offers the possibility to develop the connector in _Java_, _Groovy_ or _Kotlin_. Make sure that you are comfortable with at least one of those three languages. 
 4. An Internet connection with access to Maven central repository

### Generate the project using the Maven archetype

A [maven archetype](https://maven.apache.org/archetype/index.html) is a maven project templating toolkit. This archetype allows you to bootstrap a Bonita Rest API Extension project on your file system. A Bonita Rest API Extension project is a maven project. It can be built, tested and then deployed into a Bonita runtime using Bonita Portal.

To create your Rest API Extension project, prompt a terminal and enter the following command: 

::: warning
**Warning:** Make sure that you are not executing the command from an existing maven project.
:::

```
$ mvn archetype:generate -DarchetypeGroupId=org.bonitasoft.archetypes -DarchetypeArtifactId=bonita-rest-api-extension-archetype
```

You'll then have to specify interactively the properties of your project.

#### Archetype properties

    
| Parameter         | Required | Default value                     | Description                                                                            										   |
| ------------------|-------|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| -DbonitaVersion   | __true__  |                                   | You can choose the version of the dependent bonita artifacts. __Minimum version is 7.0.1.__   								   |
| -Dsp              | false | false                             | If set to true, project will use Bonita subscription dependencies. __This implies you have made bonita subscription artifacts available for maven (in your local repository or enterprise repository)__ |
| -Dlanguage        | __true__  |                                   | You can choose between `groovy`, `java` or `kotlin`.                                        										   |
| -Dwrapper         | false | true                              | If set to true, project will setup a [maven wrapper](https://github.com/takari/maven-wrapper)                                    |
| -DapiName         | __true__  |                                   | Set the name of your api extension. You must enter an url friendly name without blanks. 									       |
| -DapiDisplayName  | __true__  |                                   | A display name for your api extension (displayed in the portal for the administrator) 										   |
| -DapiDesc         | false | My Rest API extension description | A short description of the purpose of your api extension (displayed in the portal for the administrator) 						   |
| -DhttpVerb        | __true__  |                                   | The http verb of your api extension 																							   |
| -DpathTemplate    | __true__  |                                   | URL path template. Resulting url: ../API/extension/myRestExtApi 																   |
| -DpermissionNames | false | myRestAPIPermission               | Define permission list (comma separated value), specify permissions a user need to have in order access this REST API extension  |
| -DurlParameters   | false | !                                 | Define a list (comma separated value) of url parameters.                                                                         |
| -DbdmGroupId      | false | !                                 | Define a BDM groupId name to enable BDM dependencies                                                                             |
| -DbdmVersion      | false | !                                 | Define a BDM version name to enable BDM dependencies                                                                             |    

⚠️ You can avoid the interactive mode by specifying all properties of your project directly in the command line, but by doing that you'll bypass the validation performed on the properties content.

#### Generated prpject

A folder named _[your artifact id]_ is created, with your Bonita Rest API Extension project, ready to use.
Using the terminal you can `cd` into this folder and run:

```
$ ./mvnw
```

It should build and test the generated api sample. The result of this build is a zip archive that can be retrieved in the target folder of the project.
You can deploy this api extension archive using Bonita portal.

### Deployment

To deploy the REST API extension:

1. Connect to Bonita Portal with a user account that have Administrator profile
1. Switch to administration view
1. Go in Resources and click on Add button
1. Select the previously created zip file
1. Click on Next and on Confirm

### Configure the authorization

To configure the REST API authorization checkout the dedicated [documentation page](rest-api-authorization.md). Note that you can reuse existing permissions that are already mapped to provided profiles (User, Administrator).
