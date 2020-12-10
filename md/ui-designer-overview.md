# UI Designer overview


The UI Designer is a wysiwyg development environment for creating pages and forms for a Bonita application.


## Usage

It is a web-based tool that is launched from Bonita Studio.  
A page is defined in HTML extended by the AngularJS JavaScript framework. Use the UI Designer to create and update pages for business applications, forms to start process instances or execute human tasks, and application layouts that apply to all pages of an application.

* Create pages directly in the Bonita UI designer.
* Start form design in Bonita Studio from the appropriate [contract](contracts-and-contexts.md).
* Create [layouts](layouts.md) by duplicating the default layout available in the Bonita Portal resources and then updating it.

You can import an existing page, form, or layout to edit, or duplicate existing ones.

## Page structure

A page (but also a form or a layout) is built as a vertical arrangement of rows.  
A row is a mechanism for aligning widgets, from top left to bottom right. When you create a new, empty, page, it contains a row. A row occupies the whole width of the page, which is considered to be 12 units. The actual width is calculated when the page is displayed. The rows are indicated by a thin pale grey rectangle on the left side of the whiteboard. 

To move or delete a row, position your mouse in the row, and the row toolbar is displayed.

![row toolbar](images/images-6_0/row-over.png)

Use the controls in the toolbar to move the row up or down, or to delete it. 

In a row, you can add containers and [widgets](widgets.md).  
Each widget accounts for an item of information to be entered or displayed in a page. To add a widget to a page, drag it from the palette on the left of the screen and drop it into the whiteboard. It must be adjacent to another widget (or to the top of the page for the first widget).  
You cannot leave empty space between widgets. If you try to drop a widget that is not adjacent to another, the drop will fail.  
When the widget is dropped, you need to specify the widget width, up to a maximum of 12 units (default value). 

There is a set of [standard widgets](widgets.md). If these do not meet your needs, you can define a [custom widget](custom-widgets.md).

There are also some structure widgets called containers, which you can use to structure a page. 

There are different types of containers:
* The plain container is invisible to page users. It is useful during page development as a way to manipulate or configure multiple widgets or iterate over elements to display.
* The tab container is used to create tabs in a region of a page. The tabs are visible to page users, who can switch between tabs by clicking the tab name.

Once a container is added to the page, it contains a row. Therefore, widgets can be dropped in a container row or directly on a whiteboard row. In this example, you can see a container with four rows.

![A 4 row container](images/images-6_0/row-normal.png)

The behavior of a page is determined by the widget properties. Any property you configure for a container is applied to all widgets in the container unless you override it with a widget-specific value.

You can also use [fragments](fragments.md), which are groups of widgets. They allow to reuse the same group of widgets with the same behavior in several pages or forms.

The UI Designer generates standard HTML application code, based on AngularJS. Export pages if you want to further customize them in your favorite web development environment. Note that once customized, you can not reimport them in the UI Designer.

## Starting the UI Designer

### From Bonita Studio menu bar

Open the **Development** menu then choose **Open UI Designer**, or click the UI Designer icon in the coolbar. This is useful to create application pages that are not linked to a process, but display business information whose changes are managed by underlying processes.

### From a form mapping tab

Select a human task or a pool, go to the **Details** panel, **Execution** tab. Then go to the relevant form mapping tab:

* **_Instantiation form_** for a form to start a process instance
* **_Form_** for a form on a human task

With the form type set to **UI Designer**, you can select a form from the dropdown list and click the pencil icon to edit it, or you can choose **Create a new form**. This is the way to go to create forms as the Studio will auto-generate a form based on the process instantiation or task execution [contract](contracts-and-contexts.md).

You can also create a customized **overview form**, to display a summary of the case to the users, either in a case details page, or in the tasklist, to give some context to the task to do.  
To do so, go to the pool **Details** panel, **Execution** tab, and click **_Overview page**.  
With the form type set to **UI Designer**, you can select a form from the dropdown list and click the pencil icon to edit it, or you can choose **Create a new form**.

## Integration with Bonita Platform

The UI Designer is part of the development tools integrated in Bonita Studio. It runs in a tomcat instance managed by Bonita Studio. This tomcat instance is separated from the engine/portal tomcat instance.

To use a page in a business application, export it from the Bonita UI designer, import it as a portal resource, and from the relevant application, add it to the list of pages and then insert it in a navigation menu.

To use a form in a process, map it in the Bonita Studio to the relevant process or human task. It will be automatically packaged in the .bar archive ready to deploy in the Bonita Portal.

You can [update a form in production](live-update.md), by exporting a new version of the form from the Bonita UI designer, importing it into the relevant process in the portal, and then mapping it to the relevant task or process start event. 

To use a layout in a business application, export it from the Bonita UI designer, import it as a Bonita Portal resource, and map it as the layout of the relevant application.

### Business Data model Synchronization

Business Data Model is synchronized from Bonita Studio to Bonita UI-Designer when you deployed your BDM. 
This synchronization is done by a new independent process and managed by Bonita Studio.

See [Data management](variables.md#business-data) section to know how to use this Business Data Model.

## UI Designer target users' needed skills

The UI Designer is intended for web developers creating pages and forms that will be part of a BPM application. It requires a good understanding of JavaScript and CSS.  
If you are a business analyst, you can use the UI Designer to create the page structure and define basic behaviors. However, most properties of a page are defined using JavaScript.

<a id="readable-page-name"/>

## UI Designer with collaboration

Pages which have been created with a version of bonita older than 7.7.0 have a UUID-like identifer.

With version 7.7 and the improvements made for the collaboration features, the Id of created artifacts is now more human readable and understandable. This Id is now equal of the name. 
For pages only, if the id is already taken by another page, it is suffixed with a number (same behavior as in operating system file browsers).
 
For example:
* Create a new page named "myPageExample".
* Create another page with the name "myPageExample".

Following the second creation, when you are redirected to the editor, you can see in the URL that the id is in fact `myPageExample1`.
However, it is a good practice to use a unique name for your page.

:::info
No migration is performed for existing artifacts (pages and fragments).
If you want to benefit from readable Ids for your existing artifacts, you need to rename your artifacts from the homepage or the editor. The link with the process in Bonita Studio will be kept.
:::

:::warning
If your project is under version control and you rename an artifact, you could loose the history of the artifact's resources depending on your version control system. If you use git, "git-log --follow" allows you to keep track of moved files.
:::

---

## ![troubleshooting-icon](images/troubleshooting.png) Troubleshooting


### My UI Designer is broken and return a 404 error or a blank page

You started your Studio today, and when you try to open a form from your process or open the UI Designer from the Studio, the UI Designer doesn't open and you see a 404 Error or a blank page. This page will help you fix this problem. 

#### Problem

You started your Studio today, and when you try to open a form from your process or open the UI Designer from the Studio, the UI Designer doesn't open and you see a **404 Error** or a **blank page**.  

Instead of the form or the home page of the UI Designer, here's what you see in Chrome!  

![UI Designer displays a 404 error page in Chrome](images/ui-designer-troubleshooting/404-error-chrome.png)<!--{.img-responsive}-->

Here's what you see Firefox, it's just a blank page!  

![UI Designer displays a blank page in Firefox](images/ui-designer-troubleshooting/ff-blank-page.png)<!--{.img-responsive}-->

#### How to identify the root cause?

The UI Designer has a log file that you can consult, either from the Studio Menu > Bonita UI-Designer log:  
![Open UI Designer log from the Studio](images/ui-designer-troubleshooting/uid-logs.png)<!--{.img-responsive}-->  
Or from your file system here: `STUDIO_HOME/workspace/.metadata/.plugins/org.bonitasoft.studio.designer/.extract/logs/ui-designer.log`.  
When reading the log file, you see this kind of error:  
```Could not load component, unexpected structure in the file [timelineWidget.json]```

Here is the full stack trace:  
```16:32:41 [localhost-startStop-1] ERROR o.s.w.c.ContextLoader - Context initialization failed  
org.bonitasoft.web.designer.repository.exception.NotFoundException: Could not load component, unexpected structure in the file [timelineWidget.json]  
[...] 
Wrapped by: org.bonitasoft.web.designer.rendering.GenerationException: Build error for timelineWidget.json  
[...]
Wrapped by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'workspaceInitializer': Invocation of init method failed; nested exception is org.bonitasoft.web.designer.rendering.GenerationException: Build error for timelineWidget.json  
[...]
Wrapped by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'migrationResource' defined in file [/home/marielle/BonitaStudioSubscription-7.11.1/workspace/.metadata/.plugins/org.bonitasoft.studio.designer/.extract/webapps/bonita/WEB-INF/classes/org/bonitasoft/web/designer/controller/MigrationResource.class]: Unsatisfied dependency expressed through constructor parameter 0; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'workspaceInitializer': Invocation of init method failed; nested exception is org.bonitasoft.web.designer.rendering.GenerationException: Build error for timelineWidget.json  
[...]
```

#### Why do you have this error?

Oops, some artifacts from the UI Designer got corrupted in your git repository!  

Most of the time, and this is the case in this example, it's because of a missing file in your repository. It may be for different reasons: switch on a wrong git branch, file deleted by error, wrong commit, ...

In the error above, for example, the log file says: "Could not load component, unexpected structure in the file [timelineWidget.json] ... Build error for timelineWidget.json".  

This means that the Widget timeline cannot be built correctly. In this case here, the file timelineWidget.tpl.html is missing from the folder 'web_widgets/timelineWidget' committed in the git repository.

Depending on the type of the file missing, other error messages could be (where "customInputTest" is the widget's name):
"Template not found for [customInputTest.tpl.html]"
"Controller not found for [customInputTest.ctrl.js]"

:::warning
The error message may vary depending on the Bonita version
:::

##### Expected files for the different artifacts

If you extended the Input standard widget, and called it SmartInput.
You should have the following files in your <ProjectDir>/web_widgets directory:
```
customSmartInput (the custom widget directory)
	customSmartInput.ctrl.js
	customSmartInput.js
	customSmartInput.json
	customSmartInput.tpl.html
```

If you created a page called SmartPage:
You should have the following files in your <ProjectDir>/web_pages directory (the content may vary if you added some assets):
```
SmartPage (the page directory)
    SmartPage.json	assets/
    ./assets:
        css/	json/
    ./assets/css:
        style.css
    ./assets/json:
        localization.json
```

If you created a fragment called SmartFragment:
You should have the following files in your <ProjectDir>/web_fragments directory:
```
SmartFragment (the fragment directory)
	SmartFragment.js
	SmartFragment.json
```

##### Error messages
###### Custom widget
- Custom widget missing 
    -  7.10 7.11 7.12
        ```
        NotFoundException: Could not load component, unexpected structure in the file [customSmartInput.json]
        ```
* Custom widget template file missing
    * 7.10
        ```
        NotFoundException: Could not load component, unexpected structure in the file [customSmartInput.json]
        ```
    * 7.11 7.12
        ```
        NotFoundException: Template not found for [customSmartInput.tpl.html]
        ```
* Custom widget json file missing
    * 7.10 7.11 7.12
        ```
        NotFoundException: Could not load component, unexpected structure in the file [customSmartInput.json]
        ```
* Custom widget json file syntax error
    * 7.10
        ```
        Unexpected exception while processing file /Applications/BonitaStudioSubscription-7.10.5.app/Contents/Eclipse/workspace/MyProject/web_widgets/customSmartInput/customSmartInput.json
        com.fasterxml.jackson.core.JsonParseException: Unexpected character
        ```
    * 7.11 7.12
        ```
        com.fasterxml.jackson.core.JsonParseException: Unexpected character
        ```    
* Custom widget controller file missing
    * 7.10
        ```
        NotFoundException: Could not load component, unexpected structure in the file [customSmartInput.json]
        ```    
    * 7.11 7.12
        ```
        NotFoundException: Controller not found for [customSmartInput.ctrl.js]
        ```    
* Custom widget js file missing
    * No error, file is re-generated

###### Fragment
* Entire fragment folder is missing
    * Same error for all versions  
        ```
        NotFoundException: File not found: [SmartFragment.json]
        ```    
* Fragment json file missing
    * Same error for all versions
        ```
        NotFoundException: File not found: [SmartFragment.json]
        ```    
* Fragment js file missing
    * No error, file is automatically re-generated
 

#### Solution

In the case of a missing file, there are several ways to fix this error:

##### 1. You are NOT using Git
* Option A: You have a backup of your repository and you can add the missing file in your repository again.
* Option B: If it's default widget, you can find the file in your local studio workspace and add it to your repository.

##### 2. You ARE using Git
Here are some examples of common mistakes:
* You didn't pull the correct branch, you need to do the right pull. 
* You have a merge conflict, you need to fix that conflict. 
* Somebody removed a file by error
    * You can retrieve the file from a previous commit.
