# Additional resources
Additional resources can be added to a process.  
Those resources are embedded in the .bar file at build time, and are available at runtime.

## Overview

A process can depend on additional resources at runtime.  
Those additional resources are usually basic files, like a mail template, a property file...  
The main difference between [documents](documents.md) and additional resources is that additional resources are not archived. When a process uses a Bonita document, the value of the document at the end of the case is archived in the database. This is not the case for additional resources.  
Use additional resources when you do not want to archive the content of a file dependency.


## Usage

An additional resource is a configuration artifact: 

 - It is defined on a process
 - It is valued in the configuration for a given [environment](environments.md)
 - It is used through Java API

::: warning
Additional resources are the only configuration artifacts that are **not live-updatable**.   
The definitive value of an additional resource must be present in the .bar file, it is not possible to set it / update it through the Bonita portal / any java API. 
:::

### Add an additional resource on a process

An additional resource is defined at process level.  
To add an additional resource: 

 1. Create a new Diagram
 2. Select the pool
 3. Select the property section **Data**
 4. Select the tab **Additional resources**
 5. Click on the **Add** button, the creation wizard opens. The name of the additional resource is mandatory, the description is optional. 
 
 The name of an additional resource corresponds to the relative path in the .bar file of the additional resource. It means that if you decide to name your additional resource _folder/file.txt_, it will be available in the .bar at _resources/misc/**folder/file.txt**_.

### Configure the value of an additional resource

 1. Ensure that an additional resource has been added on a process
 2. Click on the **Configure** button in the coolbar
 3. Select the tab **Additional resources**
 4. Select your additional resource in the table
 5. Click on the cell in the column _File_, a small button should appear in the cell. Click on it.
 6. Select a file from your documents assets, import a new one if needed. 
 7. Validate

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::
The value of an additional resource is specific to a given [environment](environments.md). Do not forget to value your additional resources for each environment you may use.

### Use an additional resource at runtime

Additional resources are stored in the .bar file, at the following location : 

    /resources/misc/[ADDITIONAL RESOURCE NAME]

Those resources can be retrieved at runtime from any Groovy script, using the Process API:

``` groovy
def Map<String, byte[]> retrieveResources(apiAccessor, processDefinitionId, filenamesPattern) {
	apiAccessor.processAPI.getProcessResources(processDefinitionId, 'resources/misc/filenamesPattern')
}
```
The process API take a _pattern_ in input, and returns a map with all the results. It means that if you want to retrieve all the .txt files, you can use _.txt_ as pattern. If you only want to retrieve one file, use _myFile.txt_ as pattern.  
⚠️ Retrieving to many files can lead to performance issues.  
ℹ️ You can type _bar_ and trigger the autocomplete in any Bonita groovy editor to get the template of the API call to perform.

## Example


TOUT DOUX