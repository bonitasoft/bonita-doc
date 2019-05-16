# SAP JCo3

::: info
**Note:** For Enterprise, Performance and Efficiency editions only.
:::

The SAP Java Connector is a toolkit that allows a Java application to communicate with any SAP system. It combines an easy to use API with unprecedented flexibility and performance.   
The package supports both Java to SAP System and SAP System to Java calls. 

Prerequisite <!--{.h3}-->

You must have an SAP license and an SAP server to use the connector.

### JCo 3

* The SAP JCo3 connector can be used to call a SAP function (BAPI, RFC or ZBAPI).
* High-performance JNI-based RFC middleware.
* Supports R/3 3.1H and higher. 
* Supports inbound (Java client calls BAPI or RFM) and outbound (ABAP calls Java server) calls. 
* Supports synchronous, transactional (important for IDocs), and queued RFC. 
* Supports client pooling (good for web servers).
* Has monitoring capabilities.

### Download and install the SAP connector .zip files 

To connect to an SAP system from Bonita Studio, and have the correct graphic display, you must install the SAP .dll and .jar files onto your (Windows) machine. You must have an SAP User ID and password to enter the SAP Support Portal to download the files.

Go here (you will need to login first) [SAP Service marketplace.](http://service.sap.com/connectors)

JCo 3: `sapjco3-ntamd64-3.0.3`

Contents of `sapjco-ntamd64-3.0.3.zip`

* `Readme.txt`: contains instructions
* `sapjco3.jar`: must be installed in the `/endorsed` directory of your Bonita Studio installation and in class path of the bonita web server.
* `sapjco3.dll` (`libspajco3.so`): must be installed in the native library search path:
  * Windows: usually the dll file is stored in `C:\windows\system32`
  * Linux: usually the dll file is stored in `/usr/lib`
* `javadoc`: contains the .html help pages for installation
* `examples`: contains some examples

### How to use the contents of the sapjco-ntamd64-3.0.3.zip file with an application server?

#### 1. Install the system library.

##### Windows

1. Store the `sapjco.dll` file in the `C:\windows\system32` directory.
2. Reboot

##### Linux

Store the `libsapjco3.so` in the `/usr/lib` directory.

#### 2. Configure the application server

##### Tomcat example (BonitaSubscription-7.8.3-Tomcat-8.5.34 bundle)

It is assumed that both the Tomcat and the Bonita Engine were already successfully started once.

1. Stop Tomcat
2. Copy the `sapjco3.jar` file into `BonitaSubscription-7.8.3-Tomcat-8.5.34\server\lib` directory
3. Start Tomcat

##### Wildfly example (BonitaSubscription-7.8.3-wildfly-10.1.0.Final bundle)

1. Create the `sapjco3\main` directories under `BonitaSubscription-7.8.3-wildfly-10.1.0.Final\server\modules\system\layers\base\com\` directory
2. Copy the `sapjco3.jar` file into `BonitaSubscription-7.8.3-wildfly-10.1.0.Final\server\modules\system\layers\base\com\sapjco3\main`
3. Create the `module.xml` file in the `BonitaSubscription-7.8.3-wildfly-10.1.0.Final\server\modules\system\layers\base\com\sapjco3\main` directory, with the content below:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<module xmlns="urn:jboss:module:1.0" name="com.sapjco3">
    <resources>
        <resource-root path="sapjco3.jar" />
    </resources>
    <dependencies>
       <module name="sun.jdk"/>
    </dependencies>
</module>
```
4. Edit the `standalone.xml` file

When the `BonitaSubscription-7.8.3-wildfly-10.1.0.Final\start-bonita.bat` script is used to start Wildfly, then edit the `BonitaSubscription-7.8.3-wildfly-10.1.0.Final\setup\wildfly-templates\standalone.xml` file.

Otherwise edit the `BonitaSubscription-7.8.3-wildfly-10.1.0.Final\server\standalone\configuration\standalone.xml` file.

Add these 3 lines under `subsystem xmlns="urn:jboss:domain:ee:4.0"`:
```xml
<global-modules>      
    <module name="com.sapjco3" slot="main"/>
</global-modules> 
```
5. Start Wildfly

### Studio: How to import the SAP JCo3 library and make a request with an example function using the graphic display

There is below a step by step procedure on Windows. It is assumed that the Studio had been started at least once successfully.

1. Store the `sapjco.dll` in the `C:\windows\system32` directory
2. Reboot
3. Store the `sapjco3.jar` in the bonita webpapp library directory, deployed in the tomcat embedded with the Studio: e.g. `C:\BonitaSubscription-7.6.3\workspace\tomcat\webapps\bonita\WEB-INF\lib`
4. Store the `sapjco3.jar` in the `endorsed` directory of your Bonita Studio installation: e.g. `C:\BonitaSubscription-7.6.3\endorsed`.
5. Start the Studio
6. Open a diagram
7. Select a Service task 
8. Add a SAP JCo 3 connector
9. Fill in all the connection fields with the correct settings. Note that the SAP JCo 3 connector supports a single destination for all connector instances in Bonita Engine.
10. Once all the fields are filled, test the connection by clicking on the _**test **_button.
11. In the function definition window, only the function name is required.
12. Click on the arrow at the end of the field to display a dropdown list of functions.
13. Click on `GET_SYSTEM_NAME` for example
14. Click _**Next**_
15. This will display the **Input Parameters** window
16. Click _**Next**_
17. This will display the **Output Parameters** window
18. The `GET_SYSTEM_NAME` is displayed to confirm the input is this function. Note: You can create a blank .html file on your c: drive, which will be filled with the output information from the SAP connector
19. Enter the path to the .html file in the field called "HTML File"
20. Click _**Next**_
21. This will display an **Ouput operations** window
22. Click _**Finish**_

## Advanced features in Subscription Editions

In the Efficiency, Performance and Enterprise editions, the SAP wizard has advanced features: You do not need to know the names of the functions by heart, as the functions are suggested in a dropdown menu. 

* Filter functions by group: a dropdown list listing all the functions by group
* Function description: a dropdown list listing all the functions. Auto complete (just type the first letter e.g. G to give a list of **Get** functions
* Function name: dropdown list
