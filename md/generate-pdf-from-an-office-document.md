# 1.8.10 Generate PDF from an Office document

The Office document converter connector converts a document from `.odt` or `.docx` format to PDF.
It can be used in conjunction with the [Insert data in a .docx/.odt template connector](/document-templating-868).
The generated document can then be sent by email or stored in an external information system using the relevant connector.


For proper conversion, you must specify the character encoding that is used in the source document. On most Windows configurations, encoding **"windows-1252"** is used. 
UTF-8 is assumed if you do not specify the encoding (that is, if the field is left blank in the connector configuration wizard).
**Warning:** As an example when using special characters like '€' with an invalid encoding will generate a PDF without those characters.



## Known limitations
**Warning:** there is known issue when adding an image in a docx using drag'n'drop instead of a copy/paste. The image is not render properly when converted into PDF.

Rendering issues (In the worst case the text will not be visible in the generated PDF, in the best case it can be visible but not exactly as in the office document):

* Bullet points
* Strike-through (text with this formatting will not be visible in the generated PDF)
* Exponents (text with this formatting will not be visible in the generated PDF)
* Indexes (text with this formatting will not be visible in the generated PDF)
* Highlighting (text with this formatting will not be visible in the generated PDF)
* Asian fonts support need a specific iText jar that has a non-compliant license, so it cannot be provided by default
* Image positioning
* Drawing shapes
* Alignment of some text elements
* HTML convertion generates a single html file. For that matter, linked resources (like images, ...) are not supported. If you have images, use PDF conversion instead.


This connector is build upon **XdocReport** third party library, for more information check their Wiki at [https://github.com/opensagres/xdocreport/wiki](https://github.com/opensagres/xdocreport/wiki)