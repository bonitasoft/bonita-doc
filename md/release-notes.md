# Release notes

::: info
**Note:** The 7.12 is currently work in progress (WIP). The 7.12.0 GA is planned on December 2020.
:::

## New values added
### Development suite multi-maintenance version support
For a given minor version of the development suite (Studio and UI designer), you can now seamlessly work on projects that have a different maintenance version (but the same minor version).
For example: if your Studio is in version 7.12.4. You will be able to work on 7.12.2 or 7.12.5 projects without migrating the project or being blocked.

### Simplified Expression editor
Writting a script expression has never been easier with the reviewed expression editor. You can drag and drop variables and quickly access operator.

## Improvements

### Development suite changes
#### Warning before the migration when cloning a project
If you are cloning a repository branch that required migration then you will be informed of the need for migration before it is actually done. This allows you to cancel the operation and change the branch if needed.

#### Project Problem View and project validation
A new view is now available in the Studio to see all the project issues and warnings. It is also possible to validate a project through the contextual menu.

#### Dark mode theme for the Studio
In the "Appearance" section of the Studio settings, you can now change the theme. You have two possibility: light (default) and dark.

#### Multi-selection for REST API and Theme build
You can now select several REST API or theme to build in the Studio

#### Displaying the fragments and custom widgets fullname in the UI Designer
When editing an UI Designer artifact, you can now see the full name of the available fragments and custom widgets in a new tooltip. Previously, fragments and custom widgets with long name were truncated, making their selection cumbersome.

#### Google Calender New authication method
The google connector can now use a Json tokens to authenticate.

#### Java REST API Extension
It is now possible to create REST API Extensions in Java.

### Runtime changes

#### REST API and portal login

The redirect parameter is now optional when logging in to the REST API using `/bonita/loginservice` as well as when logging out using `/bonita/logoutservice`.  
This means it is no longer needed to put redirect=false in the request to log in/out using the API.
However, previous login requests with a redirect URL will continue working as the redirect parameter is optional.  
If you use a customised login page to log in to Bonita portal UI and don't specify any redirect URL (`redirectUrl` parameter), then you need to make sure it passes a parameter `redirect=true` to the login service. same thing if you have a logout link in a custom page that does not passes a `loginUrl` or a `redirectUrl` parameter.  
If you use Bonita layout version 5 or a customize version of it in your applications, make sure you upgrate to version 6 when migrating. Otherwisthe the logout button will not redirect to the login page when clicked.

#### Search keys

Search keys can be defined and used in the community edition. Take a look at the [search keys documentation](define-a-search-index.md) to learn more about it. 


## Bundle changes

## API Removal

## Technical updates
#### Groovy updated to 2.4.20

## Feature deprecations and removals

### Deprecations

### Removals

#### Legacy third party format importers
In Community edition, XPDL and jBPM importers have been removed.  
In Enterprise editon, Visio and Aris importers have been removed.  
Use BPMN 2 importer for model exchange with third party editors.


## Bug fixes

### Fixes in Bonita 7.11.0 (2020-06-25)
#### Fixes in Bonita Development Suite (Studio and UI Designer)
* STUDIO-3630 - More log messages are need to debug the SAP Connector
