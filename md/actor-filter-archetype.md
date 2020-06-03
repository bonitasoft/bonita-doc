# Bonita actor filter archetype
A set of best of breed tools to develop and test custom actor filters independently of the Bonita Studio. 

## Create a custom actor filter

Bonita offers the possibility to create and plug custom actor filters, to allow you to fine tuned the potential candidates for a task.  
We provide a maven archetype to help you to bootstrap an actor filter project. The source code of the archetype is available [here](https://github.com/bonitasoft/bonita-actorfilter-archetype).

### Prerequisite

 1. Java 8 must be installed: [https://adoptopenjdk.net/index.html](https://adoptopenjdk.net/index.html)
 2. Maven must be installed: [https://maven.apache.org/install.html](https://maven.apache.org/install.html)
 3. Actor filter development requires some software development skills. The archetype offers the possibility to develop the connector in _Java_, _Groovy_ or _Kotlin_. Make sure that you are comfortable with at least one of those three languages. 

### Generate the project using the maven archetype

A [maven archetype](https://maven.apache.org/archetype/index.html) is a maven project templating toolkit. This archetype allows you to bootstrap a Bonita actor filter project on your file system. A Bonita actor filter project is a maven project. It can be built, tested and then imported into a Bonita project using Bonita Studio.

To create your actor filter project, prompt a terminal and enter the following command: 
::: warning
**Warning:** Make sure that you are not executing the command from an existing maven project.
:::
```
mvn archetype:generate -DarchetypeGroupId=org.bonitasoft.archetypes -DarchetypeArtifactId=bonita-actorfilter-archetype -DarchetypeVersion=1.0.0
```
You'll then have to specify interactively the properties of your project: 

- **groupId:** the group id of your connector.
- **artifactId:** the artifact id of your filter
    - Must match the following regex: `^[a-zA-Z0-9\-]+$`
    - Example: _my-custom-filter_
- **version:** the version of your connector _(default value: 1.0-SNAPSHOT)_
Follow the [maven naming convention guide](http://maven.apache.org/guides/mini/guide-naming-conventions.html)
- **package** the package in which the connector source files will be created _(default value: the group id of the connector)_
- **bonitaVersion:** the targeted Bonita version
    - A Bonita connector project depends on _org.bonitasoft.engine:bonita-common_. To avoid potential conflicts / errors at runtime, you should use the Bonita version of your runtime environment.
- **className:** the class name of your connector 
    - Must match the following regex: `^[a-zA-Z_$][a-zA-Z\d_$]+$` (A Java classname valid identifier)
    - Example: _MyCustomFilter_
- **language**: the language used in the connector project. Available values:
    - java
    - groovy
    - kotlin

A folder named _[your artifact id]_ is created, with your Bonita actor filter project, ready to use.

⚠️ You can avoid the interactive mode by specifying all properties of your project directly in the command line, but by doing that you'll bypass the validation performed on the properties content.


### Actor filter developpment

In this section we'll look into the different components of an actor filter project, and how you should use them to develop your filter.

#### Definition
An actor filter is first defined by its **definition**.  It is an XML file located in _src/main/resources-filtered/[artifactId].def_ by default.   
A definition defines the inputs of a filter. It can be seen as a black box. The definition explicits what will be passed to the filter. Then, implementations of this definition can be created, they just need to respect the inputs contract of the definition.  

The connector definition XSD is available in _schemas/connector-definition-descriptor.xsd_, you can import it in a IDE to get completion. 


![Connector definition xsd overview](images/connector-def-xsd-overview.png)

Example: 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<definition:ConnectorDefinition xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:definition="http://www.bonitasoft.org/ns/connector/definition/6.1">
    <id>${definition-id}</id> <!-- Id of the definition -->
    <version>${definition-version}</version> <!-- Version of the definition -->
    <icon>icon.png</icon> <!-- The icon used in the Studio for this definition -->
    <category icon="icon.png" id="Custom"/> <!-- The category of this definition, used in the Studio (e.g: http, script ...) -->
  
    <!-- Connector inputs -->
    <input mandatory="true" name="defaultInput" type="java.lang.String"/>
    
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
`definition-id` and `definition-version` are properties defined in the `pom.xml`.

##### Actor filter Inputs

The inputs of an actor filter are defined in the definition. Those inputs are valued by processes, and are retrieved by the implementation classes of the actor filter to execute the business logic.  
A actor filter input: 

 - Has a name
 - Has a type
 - Has an optional default value
 - Can be mandatory 

##### Pages and widgets

A definition includes _pages_ and _widgets_.  Those elements define the UI that will appear in the Bonita Studio to configure the actor filter.  

 - A widget is bound to an input
 - A page contains a set of widgets

The idea is to create pages for related inputs, so the person who will configure the actor filter will easily understand what he has to do.

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

#### Actor filter implementation

An _actor filter implementation_ implements a definition. A definition defines a set of inputs, implementing a definition means use the provided inputs to create the expected list of users ids.  
Several implementations can be created for a given definition.

An actor filter implementation is made of two elements: 
- An xml file used to explicit the definition implemented, the dependencies required and the name of the implementation class
- A set of Java based classes, constituting the implementation sources

##### Implementation XML file

The implementation XML file is located in _src/main/resources-filtered/[artifactId].impl_ by default.  
The connector definition XSD is available in _schemas/connector-implementation-descriptor.xsd_, you can import it in a IDE to get completion. 

![Connector implementation xsd overview](images/connector-impl-xsd-overview.png)

Example: 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<implementation:connectorImplementation xmlns:implementation="http://www.bonitasoft.org/ns/connector/implementation/6.0">
  <implementationId>${impl-id}</implementationId> <!-- Id of the implementation -->
  <implementationVersion>${impl-version}</implementationVersion> <!-- Version of the implementation -->
  <definitionId>${definition-id}</definitionId> <!-- Id of the definition implemented -->
  <definitionVersion>${definition-version}</definitionVersion> <!-- Version of the definition implemented -->
  <implementationClassname>${impl-main-class}</implementationClassname> <!-- Path to the main implementation class -->
  <description>Default ${definition-id} implementation</description>

<!-- retrieved from the pom.xml at build time -->
${impl-dependencies}

</implementation:connectorImplementation>
```
`impl-id`, `impl-version`, `definition-id`, `definition-version` and `impl-main-class` are properties defined in the `pom.xml`.  
`impl-dependencies` is replaced at build time using `src\script\dependencies-as-var.groovy` script.

##### Implementation sources

The implementation sources contain all the logic of the actor filter:

 - The validation of the inputs
 - The execution of the business logic to filter the users for a given actor.

The archetype offers the possibility to generate the default sources in Java, Groovy or Kotlin. The build result will always be a Java archive (jar), no matters the langage selected.

The entry point of the implementation sources must extend the class _`org.bonitasoft.engine.filter.AbstractUserFilter`_.

#### Build an actor filter project

An actor filter project is built using Maven, and especially the [maven assembly plugin](https://maven.apache.org/plugins/maven-assembly-plugin/).  

By default, a zip archives is built containing all the definitions and implementations found in the project.
By importing this archive in a Bonita Studio you will import all the definitions and implementations created in the project
 
To build the actor filter project, type the following command at the root of the project : 
```
./mvnw clean package
```
The built archive can be found in here `target/[artifact id]-[artifact version].zip` after the build.
