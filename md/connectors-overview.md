# Connectors overview

A connector is an element in a process that accesses an external system to read or write information. If the [default connectors in Bonita](_connectivity.md) are not suitable, you can implement your own connector. 
In the Bonita Enterprise, Performance, Efficiency, and Teamwork editions, you are recommended to use the [connector development toolkit](connector-development-toolkit.md) to create new connectors.
Otherwise, you can define a new connector definition or implementation in Bonita Studio,
using the wizards started from the **Development** menu, **Connectors** submenu.

This page describes the structure of a connector, and summarizes the connector development features avaialble in Bonita Studio.

## Connector structure

A connector is implemented in Bonita in two
parts, the definition and the implementation. This enables you to
change the implementation without changing the definition. Several
implementations can be created for a single definition.

### Connector definition

A connector definition controls the external interfaces of the
connector, both those visible to users (the connector
configuration wizard and the icon used to identify the connector in Bonita Studio) and those visible to the Bonita Engine (the
inputs and outputs). 

### Connector implementation

A connector implementation consists of the implementation logic, contained in a
Java class. You can create any number of implementations that correspond to a given definition. However, in a process there is a one-to-one relationship between
the connector definition and the connector implementation.

The Java class must implement the `org.bonitasoft.engine.connector.Connector` class. This defines the
following methods:

* `setInputParameters` to retrieve configuration parameters
* `validateInputParameters` to check that the configuration of the
connector is well defined
* `execute` to execute the connector and returns a map containing
all outputs 
* `connect` to create the connector
* `disconnect` to end the connection

**Note:** All the connector outputs must be set in the implementation; otherwise, the connector execution will fail. The connector outputs must be serializable.

For details of the APIs, the methods and related objects, see the 
[Javadoc](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/index.html).

<a id="Importing_a_connector"/>

## Importing and exporting a connector into Bonita Studio

You can import a connector that was created using the connecctor development toolkit or that was exported from another Bonita Studio. The connector is imported as a zip file.

1. In Bonita Studio, go to the **Development** menu, **Connectors**, **Import connector...**.
2. Upload the zip file.

The imported connector is now available in the dialog for adding a connector.

It is also possible to export a connector using the option in the **Development** menu. The connector is exported as a zip file, which you can import into another
instance of Bonita Studio. You must specify both the definition and the implementation to export.

## Testing a connector

To test the connector independently of a process, go to the **Development** menu, choose **Connectors...**, then choose **Test connector...**. 
Select the connector you want to test, use the wizard to configure the information required for the test, and click **_Test_**. The connector runs, and the results are
reported.

You need to [import a connector](#Importing_a_connector) into Bonita Studio before you can test it. 

## Configuring
and deploying a process with a connector

There are two stages to configuring a connector:

1. When you add a connector to a pool or task, you configure the connector behavior.
2. When you configure a process for deployment, you specify the definition and implementation of each connector it contains. You must
also specify any connector dependencies as process dependencies.

After the
connector has been specified in the configuration, when you build
the process for deployment referencing the configuration, the
connector code is included in the business archive.

After deployment, if you are running the Enterprise or Performance edition, you can [update the connector implementation on a live system](live-update.md).
