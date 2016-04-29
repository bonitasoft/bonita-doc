# 3.5.6 Rest API extensions

A REST API extension is a way to add extra REST resources using Bonita BPM. REST API extensions are [exported. imported, modified, and deleted](/resources-management) as resources in Bonita BPM Portal. 


In the Bonita BPM subscription edition, Bonita BPM Studio contains [tooling for creating, testing, and deploying REST API extensions](/creating-rest-api-extension-865). 
This page contains information about creating and deploying a REST API manually, which is possible with all editions.



* [Install a REST API extension](#install)
* [Usage](#usage)
* [REST API extension examples](#example)

## Install a REST API extension


To install a REST API extension, you need to import it into Bonita BPM Portal.

Follow the steps to [import a resource](/resource-management#import).



REST API extensions use the same authorization mechanism as the standard Bonita BPM Web Rest APIs.
When you import the extension, the information in `page.properties` is used to set the appropriate
resource permission mappings in Bonita BPM.


Note: If you are running Bonita BPM in a cluster, after you import a REST API extension, you must restart the
application server on all the cluster nodes. 


## Usage


A REST API extension must be deployed before any page or form resource using it is deployed.


A page that uses REST API extensions must add the required resources in the page resource
`page.properties` file.
For example, if a page uses the demoHeaders, demoXml, and putResource API extensions, the
`page.properties` must include this line:


`
    resources=[GET|extension/demoHeaders, POST|extension/demoXml,PUT|extension/putResource]
`


Additional resources and related permissions are stored in user's session. A logout/login to the portal is required
to get new permissions effective for user.


## REST API extension examples


A REST API extension example resource and API extension viewer page are provided in administrator portal. They are
located in administrator portal.


REST API extension examples show how to:


* Customize response with additional header, cookie and response code
* Get resource return a simple echo of query parameters
* Use a SLF4J logger
* Post resources with Json payload and return a simple echo of parameters
* Return an XML content with specific media type and character set
* Call to external SOAP webservice (requires internet connexion)

A REST API extension example with SQL dataSource is available on [Bonitasoft Community Github
repository](https://github.com/Bonitasoft-Community/rest-api-sql-data-source). This example show how to execute SQL queries on a external database.