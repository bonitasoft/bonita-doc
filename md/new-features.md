# New features

Below are the changes introduced in Bonita BPM 7.3.0

## Features & Enhancements

### Bonita home removal

Starting from Bonita BPM 7.3.0, there is no more Bonita Home to store the configuration, all the configuration is in the database.  
Please refer to the [platform configuration page](BonitaBPM_platform_setup.md) to find out how to manage configuration.

It simplifies bundle configuration and cluster deployments by removing file system dependencies (no more shared filesystem) and enables hot backup of runtime data. Here are more details:

* Fewer files to configure
* Configuration can be managed remotely (new admin tool in command line)
* Deployment process is ready to be automated with scripts
* Database schema creation can be reviewed by DBA
* Database can be created before the first start of the engine
* Improved messages in the logs explain the checks done by the Engine at startup.
* Backup is easier (no need to synchronize database backup with filesystem anymore)
* Backup is possible without downtime (depending on DBMS vendor capabilities)

The [migration tool](migration-overview.md) is impacted by the removal of the Bonita Home folder. Please see the associated release notes for further details.

<a id="user-task"/>

### User task list re-design

The users can now:

* Choose between 2 view modes to efficiently pick the right task and do it fast:
  * Master / Details: when selecting a task in the list, a detail panel displays the form to submit so you don't go back and forth between list and forms.
  * Wide table: a large table displays task details with the possibility to use display name for tasks that include business data. In this view, the form is displayed in a popup
* Easily view large forms with the option to expand the form panel to any size
* Select columns to be displayed in the list
* Select the number of elements per page
* Retrieve information on the case thanks to the case overview, displayed just a tab away from the form. 
* Allow users involved in a case to exchange comments on the case directly from the task list, just a tab away from the form.

    ::: info
    _Note_: User display preferences are stored in the Browser Local Storage
    :::

<a id="new-widgets"/>

### New UI Designer widgets

New widgets in UI Designer for Subscription edition:

#### [File viewer](widgets#file-viewer)

It adds the capability to preview or download a file or a process document in a page or a form. 
  * With this new widget, you can display a document in a modal dialog box or directly in the page.  
  * The documents displayable are limited to the document supported by the end user browser (by default pdf and images on usual browsers). Documents that are not displayable are prompted to be downloaded.

#### [Rich Text Area](widgets#rich-text-area)

It adds the capability to edit formatted text from a page or a form.
  * With this new widget, you can add rich text area for end users to create text to be exported in HTML format for integration on emails, etc.  
  * Text area can be prefilled with an HTML template.
  * Toolbar options exposed to end users can be customized and localized with the usual [localization mechanism](multi-language-pages.md) (localization.json file).

<a id="usability-improvements"/>

### UI Designer usability improvements

Many improvements to existing features:
* Generated form from contract (in the Studio) are filled into a Form Container using basic form validation.
* Quick save everywhere on the editor with the usual keyboard shortcut Ctrl-S.  
* Custom Widgets and Fragments have now their own icons with an auto-generated image displayed on the editor palette and whiteboard. For Custom Widget, it is now possible to customize the template for better whiteboard rendering.
* New icons for the different containers.
* In Custom widget editor, it is now possible to add a caption and tooltip when adding or editing a widget property.
* In Fragment Editor, when a data is exposed, it is shown as (exposed) in the variables panel.
* Subscription Edition: On DataTable widget, when there is only one page, the pagination footer is removed.
* Home Page: when clicking on Create, the selected artifact type is the same as the current selected tab.  

### UI Designer [Date Picker](widgets.md#date-picker) improvements

* Capability to edit and set manually the dates with a format validation (works within a Form Container)
* Capability to add a "Today" button to select automatically and quickly the current day.
* Subscription Edition: Calendar can be localized with the usual [localization mechanism](multi-language-pages.md) (localization.json file).  

### Other minor changes

* Tomcat has now better default log messages: clearer, less redundant, shorter log lines

## Limitations and known issues

* MacOS environment: the new version of MacOS El Capitan 10.11.4 (March 2016) has introduced new security rules that block the launch of Bonita BPM Studio. You must temporarily remove security on App launching in System Preferences→Security & Confidentiality.
* 6.x legacy forms: There might be some graphical issues (CSS) when displaying 6.x forms in the right panel of the new user tasklist. Use preferably the expended mode (full page list + popup for the form) or modify the portal look & feel in order to add a min-width to the from container in BonitaForm.html 
* Default applications layout is not compatible with new task list custom page
* Having executed a task in a subprocess, I cannot see the overview of the root process instance
