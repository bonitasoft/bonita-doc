
# Troubleshooting: My UI Designer is broken and return a 404 error or a blank page

You started your Studio today, and when you try to open a form from your process or open the UI Designer from the Studio, the UI Designer doesn't open and you see a 404 Error or a blank page. This page will help you fix this problem. 

## Problem

You started your Studio today, and when you try to open a form from your process or open the UI Designer from the Studio, the UI Designer doesn't open and you see a **404 Error** or a **blank page**.  

Instead of the form or the home page of the UI Designer, here's what you see in Chrome!  

![UI Designer displays a 404 error page in Chrome](images/error-my-ui-designer-broken-and-returns-404-error-out-bluechrome.png)<!--{.img-responsive}-->

Here's what you see Firefox, it's just a blank page!  

![UI Designer displays a blank page in Firefox](images/error-my-ui-designer-broken-and-returns-404-error-out-blueff.png)<!--{.img-responsive}-->
## How to identify the root cause?
The UI Designer has a log file that you can consult, either from the Studio Menu > Bonita UI-Designer log:  
![Open UI Designer log from the Studio](images/error-my-ui-designer-broken-and-returns-404-error-out-blueuidlogs.png)<!--{.img-responsive}-->  
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

## Why do you have this error?

Oops, some artifacts from the UI Designer got corrupted in my git repository!  

Most of the time, and this is the case in this example, it's because of a missing file in your repository. It may be for different reasons: switch on a wrong git branch, file deleted by error, wrong commit, ...

In the error above, for example, my log file says: "Could not load component, unexpected structure in the file [timelineWidget.json] ... Build error for timelineWidget.json".  

This means that the Widget timeline cannot be built correctly. In my case here, the file timelineWidget.tpl.html is missing from the folder 'web_widgets/timelineWidget' committed in my git repository.

Depending on the type of the file missing, other error messages could be (where "customInputTest" is my widget's name):
"Template not found for [customInputTest.tpl.html]"
"Controller not found for [customInputTest.ctrl.js]"

:::warning
The error message may vary depending on the Studio version
:::

### Expected files for the different artifacts

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


## Solution

In the case of my missing file, there are several ways to fix this error:

### 1- I am NOT using Git
* Option A: I have a backup of my repository and I can add the missing file in my repository again.
* Option B: If it's default widget, I can find the file in my local studio workspace and add it to my repository.

### 2- I am using Git
Here are some examples of common mistakes:
* I didn't pull the correct branch
* I have a merge conflict
* Somebody removed a file by error
    * Retrieve the file from a previous commit
