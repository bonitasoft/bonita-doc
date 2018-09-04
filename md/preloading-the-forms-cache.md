# Preload the forms cache

::: info
**Note:** This information applies to legacy forms developed with Bonita 6.x, or with the _6.x Application_ backward-compatibility features of Bonita 7.0\. It is not necessary to preload forms developed with the UI Designer.
:::

The first time a form is displayed, it is cached so that when it is displayed again it loads more quickly. This is the default behavior. However, you can speed up the first display of a form by preloading it into the forms cache.

To preload the forms cache, use the formsCache service, which is accessed over HTTP.

## formsCache service

### URL
`portal/formsCache`

### Supported methods
| Method property  | Description  |
| ---------------- | ------------ |
| Action  | GET  |
| URI  | formsCache  |
| Parameters  | process=_processDefinitionID_  |
| Behavior  | Retrieve the list of the IDs of the forms contained in the forms definition file (forms.xml) of the specified process definition  | 
| Response  | The list of form IDs (for example \["myProcess--1.0$entry","myProcess--1.0--firstActivity$entry"\])  | 
| Error response codes  | 400 if the process parameter is missing, 404 if the process is not found  | 

| Method property  | Description  |
| ---------------- | ------------ |
| Action  | PUT  | 
| URI  | formsCache/_processDefinitionID_/_formID_ (for example: `formsCache/12875/myProcess--1.0$entry`)  | 
| Parameters  | none  | 
| Behavior  | Parse the XML fragment corresponding to the specified form and load the form object into the cache  | 
| Response  | none  |
| Error response codes  | 400 if the process ID or the form ID are missing, 404 if the process or the form are not found (200 if the form was found and cached)  |

## Preload the forms cache

First, send a GET request to retrieve the list of forms in a specified process. Then send a PUT request for each form to load it into the cache. The PUT request can sometimes take several seconds to respond, depending on the complexity of the form.

If you are using the Enterprise, Performance or Efficiency edition, you can create a custom page to preload the forms cache. For the Teamwork or Community edition, you need to create an application.

## Forms cache configuration

The forms cache is implemented using EhCache. The cache configuration is defined in `$BONITA_HOME/client/platform/conf/cache-config.xml`. 
By default, when you restart the server, the cache is emptied, so forms would have to be loaded again. To keep the cached forms after a restart, set the `diskPersistent` property to `true`.
