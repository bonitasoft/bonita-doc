# Generate a PDF from an Office document

How to use the Generate PDF from an Office document connector.

## Description

The **Generate PDF from and Office document** connector converts a document from `.odt` or `.docx` format to PDF.  
It can be used in conjunction with the [Insert data in a .docx/.odt template connector](insert-data-in-a-docx-odt-template.md).   
The generated document can then be sent by email or stored in an external information system using the relevant connector.  

For proper conversion, you must specify the character encoding that is used in the source document. On most Windows configurations, encoding **"windows-1252"** is used.  
UTF-8 is assumed if you do not specify the encoding (that is, if the field is left blank in the connector configuration wizard).   

**Warning:** As an example when using special characters like '€' with an invalid encoding will generate a PDF without those characters.

## Known limitations

::: warning
**:fa-exclamation-triangle: Warning:** there are known issues when adding an image in a docx using drag'n drop instead of copy/paste. The image is not rendered properly when converted into PDF.
:::

Rendering issues (at worst the element will not be visible in the generated PDF; at best, it will be visible but not exactly as in the Office document):  
* Bullet points
* Strike-through (text with this formatting will not be visible in the generated PDF)
* Exponents (text with this formatting will not be visible in the generated PDF)
* Indexes (text with this formatting will not be visible in the generated PDF)
* Highlighting (text with this formatting will not be visible in the generated PDF)
* Asian characters
  * PDF Conversion of documents using asian fonts does not work
  * Asian fonts support need a specific iText jar that has a non-compliant license, so it cannot be provided by default
* Image positioning
* Drawing shapes
* Alignment of some text elements
* HTML conversion generates a single html file. For that matter, linked resources (like images, ...) are not supported. If you have images, use PDF conversion instead.  
This connector is build upon **XdocReport** third party library, for more information check their Wiki at [https://github.com/opensagres/xdocreport/wiki](https://github.com/opensagres/xdocreport/wiki)

## Troubleshooting

You may encounter memory issues using this connector as it has substantial size of dependencies. To workaround those issues you may increase the maximum memory allocation value of the Tomcat server JVM. Go to Preferences -> Server settings -> Increase the Tomcat Maximum memory allocation (`-Xmx` JVM argument) value to **1024** (512 by default). Do not forget to use the same value when configuring your production Bundle.
