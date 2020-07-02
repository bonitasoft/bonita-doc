# Import and export a process
How to import and export processes in Bonita Studio.

## Import a process diagram into Bonita Studio

To import a diagram:

* From a .bos archive (a diagram from another Bonita studio)
1. Choose **_Import_** -> **_BOS archive_** from the **_Diagram_** menu or click **_Import_** in the Cool bar.
2. Specify the archive to be imported.
3. Manage eventual conflicts
4. Click **_Import_**, the .bos archive is imported, a new diagram is created.  

* From an other format
1. Choose **_Import_** -> **_other_** from the **_Diagram_** menu.
2. Select the input format.
3. Specify the file to be imported.
4. Click **_Import_**. A new diagram is created.

You can import diagrams that were exported from the following tools:

* Bonita
* BPMN 2.0

### What is supported or compatible?

A diagram that was exported from the same edition of Bonita, or a lower edition, can be imported successfully. 
You cannot import a diagram from a higher edition. 
For example, you can import a diagram created with the Community edition into an Enterprise edition Bonita Studio, 
but you cannot import a diagram that was created with the Enterprise edition into a Community edition Bonita Studio.

If the format to be imported is BPMN 2.0 compatible, any of the BPMN 2.0 elements displayed in the Bonita Studio **BPMN elements** menu, can be imported successfully. However, if the element to be 
imported is **not displayed **in the **BPMN elements** menu, it is not supported by Bonita, so Bonita Studio will _interpret_ the element and create the _closest BPMN element_
that is supported. The following specific changes are made for all import formats:

* If a task in an imported process is **not recognised**, Bonita Studio will create an abstract task for it by default.
* A task format can be **redimensioned** (Height/width) when it is imported.
* If a multiple event is **not recognised**, Bonita Studio takes the first element in order that it can interpret.
* If a gateway is **not supported**, it will be interpreted by default as an AND gateway.
* If there are **multiple pools **in a \*.bar file, they will all be imported into a single process diagram.

The following sections list restrictions for specific import formats.

#### BPMN 2.0 (\*.bpmn)

Most BPM applications export in the BPMN 2.0 file format. This format is the most compatible with Bonita Studio. See [here](http://www.bpmn.org/#tabs-implementers) for a list of applications 
which export in the .bpmn format.

## Export a process diagram as a BPMN 2.0 archive

If you export a process diagram as a BPMN 2.0 archive you can import it into any BPM application that supports this format, including Bonita Studio.

To export a diagram in BPMN 2.0 format from Bonita Studio:

1. Open the diagram.
2. Choose **_Export as..._** from the **_Diagram_** menu and select **_BPMN2..._** from the drop-down list.
3. Specify the location and filename for the exported diagram, and click **_OK_**.

## Export process elements

You can export files related to elements of the processes in the Bonita Studio project. The files are exported into a .bos archive that can be imported into another Bonita Studio.

You can export the following:

* Application resources
* Business Data Model
* Configurations
* Dependencies
* Diagrams
* Environments
* Organizations
* XSD files

To create a .bos archive:

1. Choose **_Export_** from the **_Diagram_** menu or click **_Export_** in the Cool bar.
2. Select the items to be exported.
3. Specify the filename and location or use the default suggested.
4. Click **_Finish_**.

The resulting .bos file can be imported into Bonita Studio.

## Build a process for deployment

When a process is ready for deployment, you must create an executable business archive (.bar file) for deployment.

To create the business archive:

1. Choose **_Build..._** from the **_Server_** menu.
2. Select the process to be exported.
3. Specify whether you want to export a configuration with the process. Exporting a configuration will export all the information and other items that you 
configured, including connectors and dependencies.
4. Specify the location where the .bar file will be created. The filename is determined by the process name and cannot be changed at this stage.
5. Click **_Finish_**. The business archive is created.

## Export a process diagram as an image

This section explains how to export a diagram as an image.

To export a diagram from Bonita Studio:

1. Open the diagram.
2. Choose **_Export as..._** from the **_Diagram_** menu and select **_Image..._** from the drop-down list.
3. Specify the image format and quality.
4. Specify the location and filename for the exported diagram, and click **_OK_**.
