# Embed engine

![](images/bonita-lab.png)
::: warning
**Warning**: This is a Lab feature and is subject to change without warning in any version. It is not recommanded for production
:::


Starting from version 7.9.0 new artifacts allows to start an engine embedded in your application.

## Using Spring boot

### Quick start

Add a dependency on the maven artifact 

Gradle
```groovy
dependencies {
    implementation("org.bonitasoft.engine:bonita-engine-spring-boot-starter:$engineVersion")
}
```

Maven
```xml
<dependency>
    <groupId>org.bonitasoft.engine</groupId>
    <artifactId>bonita-engine-spring-boot-starter</artifactId>
    <version>${bonita.engine.version}</version>
</dependency>
```

::: info
If you are using subscription group id is `com.bonitasoft.engine` and artifact id is `bonita-engine-spring-boot-starter-sp`
:::

This will provide start the engine when your application start. Also a spring bean `org.bonitasoft.engine.api.APIClient` will be available. (`com.bonitasoft.engine.api.APIClient`) if you are using subscription


### Configuration

Configuration uses the standard Spring boot mechanism. The easiest way is to put them in your `application.properties` file.

All existing configuration can be found by your IDE usiing the completion in the `application.properties` file.
Theses configuration properties have as prefix `org.bonitasoft.engine` and `com.bonitasoft.engine`

Right only the following is configurable: 
 * the database for the engine
 * the databasefor business data
 * the size of the connection pools for the associated datasources

In subscription the url of the license can be configured using `com.bonitasoft.engine.license-file-url`

All other configuration can be customized using the standard bonita configuration tool [Platform setup tool](BonitaBPM_platform_setup.md)

### Example

An example can be found in the [bonita-examples](https://github.com/bonitasoft/bonita-examples/tree/master/bonita-loan-request-application) github repository.

## Programatically

If you do not wish to use Spring boot, the integration can be manually done.

### Quick start

Add a dependency on the maven artifact 

Gradle
```groovy
dependencies {
    implementation("org.bonitasoft.engine:bonita-engine-standalone:$engineVersion")
}
```

Maven
```xml
<dependency>
    <groupId>org.bonitasoft.engine</groupId>
    <artifactId>bonita-engine-standalone</artifactId>
    <version>${bonita.engine.version}</version>
</dependency>
```
::: info
If you are using subscription group id is `com.bonitasoft.engine` and artifact id is `bonita-engine-standalone-sp`
:::

You can create a new instance of the engine like bellow
```java
import org.bonitasoft.engine.BonitaEngine;
import org.bonitasoft.engine.api.APIClient;

//create the engine
BonnitaEngine engine = new BonitaEngine();

//start the engine
engine.start();

//create a client to use it
APIClient client = new APIClient()
```

::: info
If you are using subscription use `com.bonitasoft.engine.BonitaEngineSP` and `com.bonitasoft.engine.api.APIClient`
:::

### Configuration

Configuration can be done programatically on the `BonitaEngine` instance:

```java
engine.setBonitaDatabaseConfiguration(BonitaDatabaseConfiguration.builder()
                .dbVendor("postgres")
                .url("jdbc url of the database")
                .user("user to use")
                .password("password to use")
                .build());
engine.setBusinessDataDatabaseConfiguration(BonitaDatabaseConfiguration.builder()
                .dbVendor("mysql")
                .url("jdbc url of the database")
                .user("user to use")
                .password("password to use")
                .build());
//Subscription only                
engine.setLicenseFileURL(/* url to the license file*/)
```

See Javadoc for more details.


### Example

An example can be found in the [bonita-examples](https://github.com/bonitasoft/bonita-examples/tree/master/embedded-engine-example) github repository.


## Known limitations

::: warning
The portal cannot be used with the embedded engine due to missing web resources when initializing the engine. This will be fix in future versions.
:::