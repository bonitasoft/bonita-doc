# 4.2 Software extensibility

Bonita BPM provides a rich set of features by default. These features are designed to meet the needs of most of your projects. 
However, if a project has a need that was not anticipated and cannot be met by the default features, Bonita BPM has been designed to be extensible. 
This page lists the extension points that are available.

**[Stable extension points](#stable)**

> [Connectors](#connectors)

> [Actor filters](#actor_filters)

> [Engine API](#apis)

> [REST API](#rest_apis)

> [Custom pages](#custom-pages)

> [Custom widgets](#custom-pages)

> [Import and export exchange files](#exchange-files)

> [Authentication service](#authentication)

> [Event handlers](#event-handlers)

> [BonitaStudioBuilder](#builder)

> [Portal look & feel](#look-feel)

> [Portal language pack](#language-pack)

> [Custom data types](#custom-datatypes)

**[Unstable extension points](#unstable)**

**[Backward compatibility](#backward_compatibility)**

## Stable extension points

The following elements are designed to be extension points of Bonita BPM. 
These extension points are guaranteed to be stable across versions of Bonita BPM 6: Java interfaces and XML schema will be kept backward compatible so that your implementation will work even after a Bonita BPM version upgrade.

### Connectors

In Community, Teamwork, Efficiency, and Performance editions

Bonita BPM comes with more than 80 [standard connectors](connectivity.md) to the major information system components: major databases (Oracle, Microsoft, Postgres, etc.), SOAP Webservice, Salesforce, Email, etc.
A new connector enables you to provide new connectivity capabilities for processes. 
To [implement a new connector](connectors-overview.md), you need to provide some XML description files and a 
Java class respecting the [Connector interface](javadoc.md). 
Connectors can be implemented directly from Bonita BPM Studio.

### Actor filters

In Community, Teamwork, Efficiency, and Performance editions

Bonita BPM comes with a set of [standard actor filters](actor-filtering.md) that can be used to reduce the list of candidates for process tasks.
A new actor filter enables you to provide new filtering capabilities to processes. To [implement a new actor filter](creating-an-actor-filter.md), 
you need to provide some XML description files and a Java class respecting the [UserFilter interface](javadoc.md). 
Actor filters can be implemented directly from Bonita BPM Studio.

### Engine API

In Community, Teamwork, Efficiency, and Performance editions

The [Bonita BPM Engine APIs](javadoc.md) enable you to:

* start and stop the engine
* design, install, configure and interact with processes
* manage users

ProcessBuilder and Business Objects DAO are examples of APIs that can be leveraged in your development. They will remain stable in time.

### REST API

In Community, Teamwork, Efficiency, and Performance editions

The [REST APIs](rest-api-overview.md) enable you to integrate your Bonita BPM processes into your application and execute operations on Bonita BPM objects including business objects. 
Pages and forms created with the UI designer reply on the REST APIs to manage data.

In addition to the standard APIs and resources, you can define [REST API extensions](rest-api-extensions.md). 
In the Bonita BPM subscription edition, Bonita BPM Studio contains [tooling for creating, testing, and deploying REST API extensions](rest-api-extensions.md).

### Custom pages

In Community, Teamwork, Efficiency, and Performance editions

A [custom page](pages.md) is a page that you can add into Bonita BPM Portal to form part of an application, customize information provided in default portal pages, or to add new features to the portal. 
To implement a page, you need to provide HTML, CSS and Javascript resources respecting some packaging constraints. 
You can create a page using the [UI designer](ui-designer-overview.md), which automatically creates a well-formed page. 
You can also use the legacy 6.x custom page construction methods.
Note that although the page framework provided in the product is stable, we cannot guarantee that all custom pages will work with future versions, because this depends on the details of how the page is implemented.

### Custom widgets

In Community, Teamwork, Efficiency, and Performance editions

If the standard UI designer [widgets](widgets.md) do not meet your needs, you can create a [custom widget](custom-widgets.md). 
You can then use your custom widget in pages, forms, and (for Subscription editions) fragments.

### Import and export exchange files

In Community, Teamwork, Efficiency, and Performance editions

Included in the [Engine APIs](javadoc.md) are methods to import and export various items. 
These methods manipulate files with formats that are versioned. Newer versions of the file format are designed to be backward compatible with earlier versions. The following items have import and export API methods:

* organization (users, groups, roles)
* parameters
* custom pages
* connectors

### Authentication service

In Teamwork, Efficiency, and Performance editions

From Bonita BPM 6.3, the Engine authentication service is considered to be an official extension point of the solution. It is now safe to provide your own implementation of this service to better fit the needs of your projects.
[Default authentication implementations](user-authentication-overview.md) are provided allow to check user credentials from the Bonita BPM database, LDAP or a CAS SSO server (using JAAS).
To implement an Authentication Service, provide a Java class respecting the Authentication Service interface.

### Event handlers

In Teamwork, Efficiency, and Performance editions

An event handler is an extension to the engine that is configured to run when a specified event occurs. An event is a change to any object in the database.
To [implement an event handler](event-handlers.md), you need to provide a Java class respecting the Handler interface.

### BonitaStudioBuilder

In Teamwork, Efficiency, and Performance editions

Bonita BPM includes a script, BonitaStudioBuilder (also known as the Workspace API), for building a bar file from a process in a repository. 
This intended to be used for [automating process builds](automating-process-builds.md) in a continuous integration and testing environment.
You can use the BonitaStudioBuilder to build a bar file for processes stored in a repository. This script will be kept stable in time.

### Portal look & feel

In Teamwork, Efficiency, and Performance editions

The Bonita BPM Portal Look & Feel gives the ability to customize the appearance of the portal Web interface. As a Portal Administrator, you can import a new Look & Feel (.zip archive). 
To [create a new Look & Feel](creating-a-new-look-feel.md), provide CSS and resources files.

### Portal language pack

Bonita BPM Portal comes with a number of language packs by default. You can also [add languages](languages.md). 
It is also possible to use this same mechanism to customize the portal terminology to your business environment. For example, an e-commerce business could change _Cases_ to _Orders_.

### Custom data types

A [custom data type](create-a-complex-data-type.md) is a Java object (.jar file) or an XML definition (.xsd file) of a data structure. 
You can create a custom data type and use it to define a process variable if the standard data types are not suitable for your process. 
Note that although the custom data type framework provided in the product is stable, we cannot guarantee that all custom data types will work with future versions, because this depends on the details of how the data type is implemented.

## Unstable extension points

The following elements may be used as extension points but there is no guarantee of stability across versions. No changes are planned, but we reserve the right to change make incompatible changes in any future version.

* **Portal URLs and Forms URLs**. Some customer projects have used hard-coded or forged URLs to access specific pages of Bonita BPM Portal or forms, to fit in with specific technology or navigation constraints. 
While such URLs have so far been quite stable, there is no guarantee that they will not change across Bonita BPM versions. 
Recommendation: if your project relies on such URLs, make URL generation configurable so that you can easily change it if required after a Bonita BPM upgrade.
* **Forms HTML templates**. It is possible to modify the HTML page template, HTML process template, or HTML portal template to customize the appearance and behavior of forms. 
There is no guarantee that these templates will not change across Bonita BPM versions. 
If a form uses some Javascript code based on an element in the HTML Document Object Model, the element may be moved, modified or removed in a future version so the Javascript will no longer work.

Only the elements listed on this page are intended to be used as extension points. For other elements, there is no guarantee of stability, and a high probability of changes across versions. 
For example, the following should not be considered to be extension points:

* **Bonita Home**. The structure, format, content and even the existence of bonita home can be re-considered at any time.
* **Engine Services** (other than those listed in this page). The Engine is structured as an aggregation of several services. 
This provides clear isolation of responsibility and eases maintenance. The interfaces, configuration files, and existence of services are not guaranteed across versions.

## Backward compatibility

In Bonita BPM 6.x and 7.x, we ensure backward compatibility of the following:

* Engine API (except items marked as deprecated)
* Web REST API (except items marked as deprecated)
* Authentication Service (from 6.3.0 onwards)
* XML file format for the following:
  * event handlers
  * BonitaStudioBuilder (also known as the Workspace API)
  * actor filters
  * connectors
  * form validators
  * import and export exchange files

We cannot ensure backward compatibility for the following:

* Portal Look & Feel definition structure
* Custom Pages definition structure
* Custom data types definition structure
* URLs
* Forms definition structure and HTML templates
* bonita home folder structure and content