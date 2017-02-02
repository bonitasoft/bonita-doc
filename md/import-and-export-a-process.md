# Import and export a process

## Import a process diagram into Bonita BPM Studio

To import a diagram:

* From a .bos archive (a diagram from another Bonita BPM studio)
1. Choose **_Import_** -> **_BOS archive_** from the **_Diagram_** menu or click **_Import_** in the Cool bar.
2. Specify the archive to be imported.
3. Manage eventual conflicts (details below)
4. Click **_Import_**, the .bos archive is imported, a new diagram is created.  

* From an other format
1. Choose **_Import_** -> **_other_** from the **_Diagram_** menu.
2. Select the input format.
3. Specify the file to be imported.
4. Click **_Import_**. A new diagram is created.

You can import diagrams that were exported from the following tools:

* Bonita BPM
* BPMN 2.0
* Microsoft Visio 2010
* ARIS BPM 7.x
* XPDL 1.0
* jBPM 3.2

You can also [migrate a process diagram from Bonita Open Solution 5.x](migrate-a-process-from-bonita-open-solution-5-x.md).

### How to manage conflicts?

The .bos importer provides a tool to manage conflicts. When you specify an archive to be imported in a given repository, this archive is first parsed and compared with files in the target repository.
The result of this analysis is displayed as a tree. This tree represents the content of the archive you want to import.
Some files in this archive may be conflicting with others in the target repository, i.e a file from your archive and a file from the target repository have the same relative path and the same name. 
There is two kind of conflicting files: 

* Files with the same relative path, the same name and **the same content**
* Files with the same relative path, the same name and **different content**

Only thoses from the second category are considered as conflicting, thoses from the first one are just _already present_ in the target repository.
When a file from the archive you are trying to import is conflicting, you have three possibilities to manage this conflict:

* **Overwrite** the file in the target repository with the file from the archive you are importing. Data in the file from the target repository will be lost.
* **Keep** the file in the target repository, and don't import the file from the BOS archive.
* Import the archive into an other repository (an existing or a new one). _This option is only present in the subscription edition_.

### What is supported or compatible?

A diagram that was exported from the same edition of Bonita BPM, or a lower edition, can be imported successfully. 
You cannot import a diagram from a higher edition. 
For example, you can import a diagram created with the Community edition into a Performance edition Bonita BPM Studio, 
but you cannot import a diagram that was created with the Performance edition into a Community edition Bonita BPM Studio.

If the format to be imported is BPMN 2.0 compatible, any of the BPMN 2.0 elements displayed in the Bonita BPM Studio **BPMN elements** menu, can be imported successfully. However, if the element to be 
imported is **not displayed **in the **BPMN elements** menu, it is not supported by Bonita BPM, so Bonita BPM Studio will _interpret_ the element and create the _closest BPMN element_
that is supported. The following specific changes are made for all import formats:

* If a task in an imported process is **not recognised**, Bonita BPM Studio will create an abstract task for it by default.
* A task format can be **redimensioned** (Height/width) when it is imported.
* If a multiple event is **not recognised**, Bonita BPM Studio takes the first element in order that it can interpret.
* If a gateway is **not supported**, it will be interpreted by default as an AND gateway.
* If there are **multiple pools **in a \*.bar file, they will all be imported into a single process diagram.

The following sections list restrictions for specific import formats.

#### BPMN 2.0 (\*.bpmn)

Most BPM applications export in the BPMN 2.0 file format. This format is the most compatible with Bonita BPM Studio. See [here](http://www.bpmn.org/#tabs-implementers) for a list of applications 
which export in the .bpmn format.

#### Microsoft Visio 2010 (\*.vdx)

This feature is available in the Performance, Efficiency, and Teamwork editions.

* The Visio import format must be .vdx. The .vsd format is not supported in Bonita BPM Studio.
* Only horizontal display is supported.
* The vertical display will be converted and interpreted as a _mirror image_ of the process.
* Visio supports all shapes defined in the BPMN 1.2 standard. See [here for more info about Visio compatibility](https://blogs.msdn.microsoft.com/visio/2009/12/03/bpmn-support-in-visio-2010/).

#### Aris BPM 7.x (\*.xml)

* This feature is available in the Performance, Efficiency, and Teamwork editions.

See the [Aris website](http://www.softwareag.com/corporate/products/az/aris/default.asp) for 
more information about exporting in the BPMN 2.0 format ready for importing into Bonita BPM Studio.

#### XPDL from Bonita 4 (\*.xpdl)

The .xpdl format will only be compatible if it was created in Bonita 4.x. If the .xpdl file was created by an application other than Bonita 4.x, it cannot be imported into Bonita BPM Studio.

#### jBPM 3.2 (processdefinition.xml)

jBPM uses the [BPMN 2.0 standard](http://www.jboss.org/).

## Export a process diagram as a BPMN 2.0 archive

If you export a process diagram as a BPMN 2.0 archive you can import it into any BPM application that supports this format, including Bonita BPM Studio.

To export a diagram in BPMN 2.0 format from Bonita BPM Studio:

1. Open the diagram.
2. Choose **_Export as..._** from the **_Diagram_** menu and select **_BPMN2..._** from the drop-down list.
3. Specify the location and filename for the exported diagram, and click **_OK_**.

## Export process elements

You can export files related to elements of the processes in the Bonita BPM Studio repository. The files are exported into a .bos archive that can be imported into another Bonita BPM Studio.

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

The resulting .bos file can be imported into Bonita BPM Studio.

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

To export a diagram from Bonita BPM Studio:

1. Open the diagram.
2. Choose **_Export as..._** from the **_Diagram_** menu and select **_Image..._** from the drop-down list.
3. Specify the image format and quality.
4. Specify the location and filename for the exported diagram, and click **_OK_**.
