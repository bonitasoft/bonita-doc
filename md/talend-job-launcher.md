# Talend Job launcher

The Talend Job launcher connector enables you to launch a Talend job that uses the Talend open source software.

For example, you could initialize a process variable by running a job that retrieves information from a Talend data repository, or you could use process data to update a data repository by passing it as a job parameter.

The job is defined in Talend Open Studio and is referenced by the project name, job name, and job version set when the job is created.

The connector returns a buffer containing the output of the job, in a Java object. You can configure the connector to print the buffer automatically, or you can set the value of a variable with the buffer content.

To prepare the job in Talend Open Studio:

1. Create a project
2. Create the job. Note the name and version.
3. Export the job. This creates a zip file.
4. Extract the following jar files from the zip file.
  * `systemRoutines.jar`
  * `userRoutines.jar`
  * `dom4j-1.6.1.jar`
  * your job jar file, _`jobName_version`_`.jar`
5. In Bonita Studio, go to the **Development** menu, **Manage jars** option, and import the jar files listed above.

When you [configure a process](configuring-a-process.md) that uses this connector, you must add these jar files to the **Process dependencies**.

To configure the Talend Job launcher connector, follow the steps in the wizard.

Specify the job as follows:

| Input  | Description  | Type  | 
| ------ | ------------ | ----- | 
| Project name  | The name of the Talend project  | string  | 
| Job name  | The name of the job  | string  | 
| Job version  | The version of the job  | string  |
| Job parameters  | The parameters to pass to the job. Specify these either as a table of key-value pairs or as a Groovy expression  | string  | 
| Print buffer output  | Whether you want to automatically print the content of the buffer returned by the job. Specify this either by checking the box or as an expression  | Boolean  | 

When the connector runs in a process instance, it triggers the specified job in your Talend system, and retrieves the job output.

Expression example <!--{.h2}-->

If you provide job parameters as an expression, the Groovy script must return a `java.util.List>` object, where the second List contains only two elements, the parameter name and value:

* The element with index 0 is the parameter name (`java.lang.String`).
* The element with index 1 is the parameter value (`java.lang.Object`).

The following example Groovy script creates a list with two parameters, `nbline` and `name`, and their values:

```groovy
import java.util.List;
import java.util.ArrayList;
List<List<Object>> listOfParameters = new ArrayList<List<Object>>();
List<Object> aParameter = null;

aParameter = new ArrayList<Object>();
aParameter.add("nbline");
aParameter.add(10);
listOfParameters.add(aParameter);

aParameter = new ArrayList<Object>();
aParameter.add("name");
aParameter.add("renaudp");
listOfParameters.add(aParameter);

return listOfParameters;
```
