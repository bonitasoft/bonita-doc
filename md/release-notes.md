# Release notes

::: info
**Note:** The 7.12 is currently work-in-progress (WIP). The 7.12.0 GA is planned for December 2020.
:::

## Reinforcing our Open Source DNA
Bonita has always a highly open-source project and we strongly that it is the best to create a great and extensible platform. 

In 7.12, we've decided to provide the Community edition with all the tools to create state of the art and successful automation projects.

More information [here](https://www.bonitasoft.com/Offering)

## New values added
### Development suite multi-maintenance version support
For a given minor version of the development suite (Studio and UI designer), you can now seamlessly work on projects that have a different maintenance version (but the same minor version).
For example: if your Studio is in version 7.12.4. You will be able to work on 7.12.2 or 7.12.5 projects without migrating the project or being blocked.

### Simplified Expression editor
Writing a script expression has never been easier with the reviewed expression editor. You can drag and drop variables and quickly access operators.

### New Bonita Administrator Application available
Give a try to our new *Bonita Administrator Application!* (get it from Bonita Studio Welcome page, in the Resources tile).
Starting now, you can use it as is, but you can also customize half of the pages in UI Designer or create your own Administrator Application from a handy starting point. 
It replicates current Administrator Portal profile except for Analytics Enterprise page. In a later version of Bonita, this application will override the current and now deprecated Administrator Portal profile. 

## Improvements

### Development suite changes
#### Warning before the migration when cloning a project
If you are cloning a repository branch that required migration then you will be informed of the need for migration before it is actually done. This allows you to cancel the operation and change the branch if needed.

#### Project Problem View and project validation
A new view is now available in the Studio to see all the project issues and warnings. It is also possible to validate a project through the contextual menu.

#### Dark mode theme for the Studio
In the "Appearance" section of the Studio settings, you can now change the theme. You have two possibilities: light (default) and dark.

#### Multi-selection for REST API and Theme build
You can now select several REST APIs or themes to build in the Studio

#### Displaying the fragments and custom widgets full name in the UI Designer
When editing a UI Designer artifact, you can now see the full name of the available fragments and custom widgets in a new tooltip. Previously, fragments and custom widgets with long names were truncated, making their selection cumbersome.

#### Google Calender New authentication method
The google connector can now use JSON tokens to authenticate.

#### Java REST API Extension
It is now possible to create REST API Extensions in Java.

#### Autocomplete Widget returned value
With the autocomplete widget you have a returned value that different from the displayed value.

### Runtime changes

#### Micrometer updated to 1.6.0
This version of micrometer adds new metrics. Notably two new hibernate metrics: `hibernate.cache.query.plan` respectively `hit` & `miss`, to help troubleshoot performance problems.
How to activate this metrics is documented [here](runtime-monitoring.md).


#### Fault tolerance mechanisms

It was already possible to ensure the high availability using a [clustered architecture](overview-of-bonita-bpm-in-a-cluster.md), 
Bonita Platform is now even more tolerant to incident like database outage thanks to the brand new **Recovery mechanism**.
See [Fault tolerance mechanisms](fault-tolerance.md) documentation page for more details.

#### REST API and portal login

The redirect parameter is now optional when logging in to the REST API using `/bonita/loginservice` as well as when logging out using `/bonita/logoutservice`.  
This means it is no longer needed to put redirect=false in the request to log in/out using the API.
However, previous login requests with a redirect URL will continue working as the redirect parameter is optional.  
If you use a customized login page to log in to Bonita portal UI and don't specify any redirect URL (`redirectUrl` parameter), then you need to make sure it passes a parameter `redirect=true` to the login service. same thing if you have a logout link in a custom page that does not pass a `loginUrl` or a `redirectUrl` parameter.  
If you use Bonita layout version 5 or a customized version of it in your applications, make sure you upgrade to version 6 when migrating. Otherwise, the logout button will not redirect to the login page when clicked.

#### Search keys

Search keys can be defined and used in the community edition. Take a look at the [search keys documentation](define-a-search-index.md) to learn more about it. 


## Bundle changes

## API Removal

## Technical updates
#### Groovy updated to 2.4.20

## Feature deprecations and removals

### Deprecations
#### Bonita Portal transformation
Bonita Portal is being transformed into Bonita Applications. When Bonita Applications are ready, Bonita Portal will be removed. Developers and users will need to learn how to stop using the Portal and start using Bonita Applications instead. This change will allow Bonita and its users to get free from Google Web Toolkit (GWT) technology and offer opportunities for customization.
Indeed, some Portal pages (built with GWT) are being totally recreated with our own UI Designer. They will be customizable. Other pages (those that were already using another technology than GWT) are being wrapped and will not be customizable.
Moreover, as any Living Application, Bonita applications will be extensible to add any page the users need. More details in the upcoming versions of Bonita.
Until then, we strongly advise not to create Custom Portal Profiles anymore but applications instead if possible. When Bonita Portal does not exist anymore, the existing Portal Custom Profiles will need to be migrated into Living applications.


### Removals
#### IE11 support
Internet Explorer 11 is not supported anymore through the Bonita Platform. 

#### Legacy third party format importers
In the Community edition, XPDL and jBPM importers have been removed.  
In Enterprise edition, Visio and Aris importers have been removed.  
Use BPMN 2 importer for model exchange with third-party editors.

## Translations
Please note that Bonita 7.12.0 is not fully translated in Japanese. 
Translations will be added in the next maintenance versions.

## Bug fixes

### Fixes in Bonita 7.12.0 (2020-12-04)
#### Fixes in Bonita Development Suite (Studio and UI Designer)
* STUDIO-3630 - More log messages are needed to debug the SAP Connector
* STUDIO-3694 - User password is not retrieved from the active organization when logging in Portal/App
