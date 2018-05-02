# SAP JCo 2

::: info
**Note:** For Entreprise, Performance, Efficiency, and Teamwork editions only.
:::

The SAP Java Connector (SAP JCo 2) is a toolkit that allows a Java application to communicate with any SAP system.  
It combines an easy to use API with unprecedented flexibility and performance.  
The package supports both Java to SAP System as well as SAP System to Java calls.

* The SAP Jco2 connector can be used to call a SAP function (BAPI, RFC or ZBAPI)
* High-performance JNI-based RFC middleware
* Supports R/3 3.1H and higher
* Supports inbound (Java client calls BAPI or RFM) and outbound (ABAP calls Java server) calls
* Supports synchronous, transactional (important for IDocs), and queued RFC
* Supports client pooling (good for web servers)
* JCO 2.1.x is no longer supported by SAP since 31.03.2013

## Prerequisite

You must have an SAP license and an SAP server to use the connector.

## Download and install the SAP connector.zip files

To connect to an SAP system from Bonita Studio, and have the correct graphic display, you must install the SAP `.dll` and `.jar` files onto your (Windows) machine.  
You must have a SAP User ID and password to enter the SAP Support Portal to download the files. Go to the [SAP Service marketplace](http://service.sap.com/connectors) (you will need to log in first with an account login and password).

JCo2: `sapjco-ntamd64-2.1.9`

Contents of `sapjco-ntamd64-2.1.9.zip`

* `demo` folder: contains some demos; not needed
* `docs` folder: contains the HTML help pages for installation and `librfc32.dll`: must be installed in the System32 directory
* `Readme.txt`: contains instructions
* `sapjco.jar`: must be installed in the libraries directory `/endorsed` of your var-studio install directory
* `sapjcorfc.dll`: must be installed in the System32 directory

## How to use the contents of the zip file

**Note:** The indications below are found in the `Readme.txt`.

1. Unzip the contents of the .zip file into a temporary directory, for example: `C:\temp\sapjco-ntamd64-2.1.9`.
2. In `\docs\jco\`, click on `installation.html`.

## Installation of system files

#### For Windows:

There are different distribution packages for various JRE versions and hardware processors available:

* `sapjco-ntintel-2.1.9.zip` for a 32-bit JRE running on a 32-bit INTEL x86 or a 64-bit INTEL Itanium processor
* `sapjco-ntia64-2.1.9.zip` for a 64-bit JRE running on a 64-bit INTEL Itanium processor
* `sapjco-ntamd64-2.1.9.tgz` for a 64-bit JRE running on a 64-bit AMD or INTEL x86 processor

To install JCo for Windows:

1. Unzip the appropriate distribution package into an arbitrary directory `{sapjco-install-path}`.   

**Important:** Do not forget to install the .dll files in the System32 directory for the approptiate Jc0 version.
If you already have an older `librfc32.dll` in the `{windows-dir}\system32` directory, replace it with the one that comes with JCo.
2. Add `{sapjco-install-path}` to the PATH environment variable.
3. Add `{sapjco-install-path}\sapjco.jar` to your CLASSPATH environment variable.

#### For Linux:

There are different distribution packages for various JRE versions and hardware processors available:

* `sapjco-linuxintel-2.1.9.tgz` for a 32-bit JRE running on a 32-bit INTEL x86 processor
* `sapjco-linuxia64-2.1.9.tgz` for a 64-bit JRE running on a 64-bit INTEL Itanium processor
* `sapjco-linuxppc64-2.1.9.tgz` for a 64-bit JRE running on a 64-bit PowerPC processor
* `sapjco-linuxx86_64-2.1.9.tgz` for a 64-bit JRE running on a 64-bit AMD or INTEL x86 processor
* `sapjco-linuxs390x-2.1.9.tgz` for a 64-bit JRE running on a 64-bit IBM eServer zSeries processor

To install JCo for Linux:

1. Copy the appropriate distribution package into an arbitrary directory `{sapjco-install-path}`.
2. Change to the installation directory:   
`cd {sapjco-install-path}`
3. Extract the archive:   
`tar zxvf sapjco-linux*2.1.9.tgz `
4. Add `{sapjco-install-path}` to the LD\_LIBRARY\_PATH environment variable.
5. Add `{sapjco-install-path}/sapjco.jar` to your CLASSPATH environment variable.

## How to import the SAP JCo2 library

In the Teamwork, Efficiency, Performance, and Entreprise editions, import of the jar file by clicking on the **_Import sapjco.jar_** button in the connection configuration window. Then restart Bonita Studio.

In the Community edition, there is no import button. The JCo2 library must be imported into the `/endorsed` directory of your Bonita Studio installation by hand. Then restart Bonita Studio.

## How to configure the SAP JCo2 connector

Use the wizard to configure the connector. Note the following:

* In the ****Function definition window, only the function name is required. Enter the name of the function e.g. GET\_SYSTEM\_NAME
* No parameters are needed in the **Input parameters** window.
* In the **Output parameters** window, the function name is displayed to confirm that the input is this function. Note:
You can create a blank .html file on your C: drive, which will be filled with the output information from the SAP connector.
* In the **Output results** window, you can specify an expression, by clicking the pencil to open the Expression editor.
Set the expression type to **Script**, and enter `outputResults.get(0)`. In the **Return type**, enter string.

## The result

The result will be shown in the Bonita Portal as a value in a field and in the .html file as a table containing the value or values.

**Note:** if you have already created a SAP connector and saved the settings, you can simply click on load, to automatically load the connection settings.

## Advanced features in Subscription Editions

In the Bonita Teamwork, Efficiency, Performance, and Entreprise editions, the SAP wizard has advanced features: You do not need to know the names of the functions by heart, as the functions are suggested in a dropdown menu.

* Filter functions by group: a dropdown list listing all the functions by group
* Function description: a dropdown list listing all the functions, with auto-complete (just type the first letter e.g. G to give a list of Get functions
* Function name: dropdown list
* Input parameters: click on a button More information to show a graphic display in the form of a table, of the chosen function
