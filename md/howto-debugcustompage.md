# How to Debug a custom page ? 

<h2></h2>

##  Question

The engine load the custom page, and then you want to debug it : change an item in the Look And Feel, modify the Groovy code or whatever. The engine has a mode that you can do that directly, and just click on the portal to reload the page and take into account the change without zip and deploy your change.
   

## How
::: info
This procedure is the same for a Server, or for the Bonita Engine behind the Bonita Studio
:::

### Turn the debug mode in the engine.
This procedure is valid for a server, or for the server behind the studio.

First, the engine must be turn in the "debug mode". In this mode, the engine reload the page each time you access it (for a custom page, when you click on the menu bar, for a RestAPIExtension, when you access it).

::: info
If you do that on a fresh installation, before you start the server for the first time, it's better to follow the Step "Initial setup". If the server was already started (which is the situation when you use the Bonita Studio) follow the procedure "Change the setup"
:::

#### Initial setup
The change must be done before the first startup.

Go to <TOMCAT_HOME>/setup/platform_conf/initial/tenant_template_portal/console-config.properties
Change the custom.page.debug to "true"

```json
#This value represents MB, e.g 25 means 25MB.
form.attachment.max.size                25

#Set this value to true to reload the Index.groovy class every time a custom page is displayed
custom.page.debug                       true
```

 
#### Change the setup
 

1/ get the setup out using the setup tool.
Go to <TOMCAT_HOME>/setup 

```json
setup pull
```


2/ Change the properties
    In file <TOMCAT_HOME>/setup/platform_conf/current/tenant_template_portal/console-config.properties
Change the custom.page.debug to "true"
 
```json
#This value represents MB, e.g 25 means 25MB.
form.attachment.max.size                25

#Set this value to true to reload the Index.groovy class every time a custom page is displayed
custom.page.debug                       true
```

3/ Load the setup
in directory <TOMCAT_HOME>/setup
```json
setup push
```

### Look for the directory
The engine create a temporary directory for each custom page. It is located under the "java.io.tempdir" property. For example, with Tomcat, it's under $CATALINA_BASE/temp, which is located under the <TOMCAT_HOME>/temp.

Inside, a lot of temporary directories are present. You have to located your directory, by searching one file of your custom page: an HTML or a Groovy name, or the name of the custom page. 
Bonita Engine create a directory named custompage_<your name> for each custom page.

::: warning
At each server restart, Bonita Engine create a new temporary directory, and load the custom page from the database. There are no way to save the content of the directory to the database. : so save it !
:::

### Debug it
Each change you made in this directory is immediately reloaded by the engine when you click on the menu.

### Save your job
At each restart, the Bonita Engine will create a new temporary directory, and save into the content of the page from the database. So, save your job and upload the database : 
1. zip the content of the directory (ATTENTION : zip the CONTENT and not the directory : when you open the ZIP file, you should see directely the properties file).
2. in the Portal, go to Adminitration > Resource and select the Custom page or the Rest API
3. click on Edit and give the ZIP file

Doing that, the file is upload in the database. 


