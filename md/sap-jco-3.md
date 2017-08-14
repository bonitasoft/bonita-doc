# SAP JCo3

::: info
**Note:** For Performance and Efficiency editions only.
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

To connect to an SAP system from Bonita BPM Studio, and have the correct graphic display, you must install the SAP .dll and .jar files onto your (Windows) machine. You must have an SAP User ID and password to enter the SAP Support Portal to download the files.

Go here (you will need to login first) [SAP Service marketplace.](http://service.sap.com/connectors)

JCo 3: `sapjco3-ntamd64-3.0.3`

Contents of `sapjco-ntamd64-3.0.3.zip`

* `Readme.txt`: contains instructions
* `sapjco3.jar`: must be installed in the `/endorsed` directory of your Bonita BPM Studio installation and in webapp libraries directory of the application server.
* `sapjcorfc.dll` (`sapjcorfc.so`): must be installed in the native library search path: `java.library.path` for windows (`LD_LIBRRARY_PATH` for Linux/UNIX).
* `javadoc`: contains the .html help pages for installation
* `examples`: contains some examples

### How to use the contents of the .zip file with an application server

1. Extract the contents of the .zip file into a temporary directory, for example: `C:\temp\sapijco3`.
2. Read the installation page provided with the sapjco distribution and follow the instructions.
3. Put the `sapjco3.jar` file in the webapp libraries directory of the application server, so that the jar is in the classloader used by the Bonita BPM Engine.
4. Put the `sapjco.dll` or `.so` libraries in the native library search path: `C:\windows\system32` for windows, or one of the directory listed in the `LD_LIBRRARY_PATH` for Linux/UNIX.

### Studio: How to import the SAP JCo3 library and make a request using an example function using the graphic display

This is a Windows example and it is assumed that the Studio had been started at least once successfully.

1. Store the `sapjco.dll` in the `C:\windows\system32` directory
2. Reboot
3. Store the `sapjco3.jar` in the bonita webpapp library directory, deployed in the tomcat embedded with the Studio: e.g. `C:\BonitaBPMSubscription-7.2.3\workspace\tomcat\webapps\bonita\WEB-INF\lib`
4. Store the `sapjco3.jar` in the `endorsed` directory of your Bonita BPM Studio installation: e.g. `C:\BonitaBPMSubscription-7.2.3\endorsed`.
5. Start the Studio
6. Open a diagram
7. Select a Service task 
8. Add a SAP JCo 3 connector
9. Fill in all the connection fields with the correct settings. Note that the SAP JCo 3 connector supports a single destination for all connector instances in Bonita BPM Engine.
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

In the Efficiency and Performance editions, the SAP wizard has advanced features: You do not need to know the names of the functions by heart, as the functions are suggested in a dropdown menu. 

* Filter functions by group: a dropdown list listing all the functions by group
* Function description: a dropdown list listing all the functions. Auto complete (just type the first letter e.g. G to give a list of **Get** functions
* Function name: dropdown list
