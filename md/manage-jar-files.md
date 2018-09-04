# Manage JAR files

A JAR file is an archive container for Java code. Process and application dependencies are managed by managing the JAR files that contain the required code.
For example, if your process uses a connector, the relevant JAR file must be referenced when you configure the process.

The configuration dialog shows the JAR files that are known to Bonita Studio. To add a JAR file, choose **_Manage jars..._** from the **Development** menu.
The popup shows the JARs that are known. To add a JAR, click **_Import_** and browse to the file to be imported. After the JAR file is imported, it can be used in a process.
You can also access the **Manage jars...** dialog from the process configuration wizard.

Duplicate libraries <!--{.h2}-->

There is a problem at integration if you have several elements in your platform that use certain libraries that cannot be included in more than one classloader.
Typically, this occurs when a process contains data of type Java or multiple connectors (notably with the Webservice, Alfresco, and CMIS connectors).
For example, the Stax libraries, which are used in the Webservice and Alfresco connectors and for Java data cannot be loaded in more than one classloader.

This problem is indicated by the following exceptions:

* A `ClassCastException` for `com.ctc.wstx.stax.WstxInputFactory` or `com.ctc.wstx.stax.WstxOutputFactory`
* A null pointer exception in `BaseRequestEntity`
* `java.lang.LinkageError` loader constraint violation: when resolving overridden method `org.apache.cxf.jaxb.attachment.JAXBAttachmentMarshaller.addMtomAttachment(Ljavax/activation/DataHandler;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;` the class loader (instance of _org/bonitasoft/engine/classloader/BonitaClassLoader_) of the current class, _org/apache/cxf/jaxb/attachment/JAXBAttachmentMarshaller_, and its superclass loader (instance of _\<bootloader\>_), have different Class objects for the type `shaller.addMtomAttachment(Ljavax/activation/DataHandler;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;` used in the signature.

We are aware of issues with the following JAR files (`-n` is a version number):

* `jsr181-api-n.MR1.jar` (for the Webservice connector, 6.3.3 and earlier) -- this is embedded in Java (since version 6) so should be removed from the dependencies of the connector
* `xercesImpl-n.jar` (for the Alfresco connector, 6.3.3 and earlier) -- this is embedded in Java (since version 6) so should be removed from the dependencies of the connector
* `wstx-asl-n.jar` (for the Alfresco connector) -- this should be placed in a shared library
* `geronimo-stax-api_1.0_spec-n.jar` (for the Alfresco connector) -- this should be placed in a shared library
* `geronimo-javamail_1.4_spec-n.jar` (for the Alfresco and CMIS connectors) -- this should be placed in a shared library
* `geronimo-activation_1.0.2_spec-n.jar` (for the Alfresco connector) -- this should be placed in a shared library
* `stax2-api-n.jar` (for the CMIS connector) -- this should be placed in a shared library

To avoid problems with duplicate libraries, you should always check before you build the bar file for deployment that no modules are duplicated.
Click **_Configuration_** in the Cool bar, and check in the Process dependencies and Application dependencies that there are no duplicate `.jar` files.
If you build a bar file for deployment that contains several processes, you need to check there is no duplication between processes.
