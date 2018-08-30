# Specify data in a process definition

By data, we mean variables and documents.
This page explains how to handle data in a process, including specifying process and task-level data.

## Variable scope

You can define a variable at process, task, or form level:

* A process variable is available throughout the life of a process. Process variables can be uses to store data for transition conditions, and identifiers for business data stored in an external database. They are typically items of data which affect the path of the process, or are used at several steps of the process, but which become redundant, once the process instance has completed.
* A task variable is available for the task and its outgoing transitions. It can be used to pass data to a connector in the same step. Activity variables are similar to Process variables, but exist only within the life of a process instance activity.
* A form variable is available only in the form, and is used to store data used in the form. You can also use form variables with connectors that are associated with the form.

See also:  
[Data types and defining a variable](data-handling-overview.md)  
[Complex data types](create-a-complex-data-type.md)  
[Data handling in a form](variables.md)  

  ![Scope of variables](images/images-6_0/variables_scope.png)

Best practice:

* Use XREFbusiness data for information that is shared between applications or processes.
* For external data that is stored in a database or other information system, use a connector to read or write the data when required, and use transient form variables to hold the value temporarily while it is displayed or updated in a form. \*\*\*check still true for Page Designer\*\*\*
* Define a variable at the lowest level possible, using a process variable only when required for the process flow.
* Use the minimum number of variables possible; having an unnecessarily large set of variables has an impact on performance. 

There are also a number of variables that are provided by default in a process, such as the id of the current user. They are available through the [expression editor](expressions-and-scripts.md).

## Transient data

A variable can be transient or persistent. A transient variable is stored only in memory, saving database transactions. A persistent variable is stored in the Bonita Engine database.

It is possible to update the value of a transient variable in a task, but this is not recommended. The value of a transient variable in a task is not preserved when the app server restarts. The value is reset to the initial value. When deciding whether to use a transient or persistent variable, consider whether the the variable is used in an operation. In particular, if a operation script does several things, one of which is to update a transient variable and the app server restarts after the script has run but before the end of the task, the transient variable is reset but the other changes made by the script survive the restart.

* Task variables can be transient or persistent.
* Form variables are transient.

Best practice:

* Use transient variables to store information temporarily in a process step or form.
* Do not update the value of a transient variable.

If the value of a transient variable is updated, this triggers a warning message in the log. You can deactivate these warnings by editing `logging.properties` and uncommenting the relvant section of the file.

## Subprocess data

An event subprocess has access to the data in the parent process. This includes parameters and process-level variables. A subprocess called from a call activity is in fact an independent process, defined in a separate pool. It does not have direct access to the data in the calling process. When you define a call activity, you can define mappings that make copies of the data in the calling process available in the subprocess.

## External data

A process or application can use data that is stored in an external database and accessed using a [database connector](list-of-database-connectors.md). For example, in a process for requesting annual leave, there could be a step that uses a connector to retrieve the number of days available for an employee and stores this in a transient variable. This variable is then
compared with the number of days requested to see whether the employee is entitled to take the requested number of days. In a later step, another connector is used to update the number of available days after this request is approved, by subtracting the number of days requested.

You can also use data stored in external information system components, such as a CRM document storage system. These systems are also accessed using a [connector](connectivity-overview.md).

## Define a variable

When you define a variable, you specify a name and the data type. Optionally, you can specify a default value or a list of available values.

* [Data types](#data_types)
* [Variable naming](#variable_naming)
* [Define a simple data type variable](#define_simple_variable)
* [Define a Java object variable](#define_java_object)
* [Define an XML variable](#define_xml)
* [Define a variable as a list of options](#define_list_of_options)
* [Define the default value](#define_initial_value)
* [Define the available values](#define_available_values)

<a id="data_types"/>

## Data types

Bonita has a number of predefined data types: Boolean, date, integer, long, double, text, Java object, XML schema (XSD) and option list. You can also define a variable as _multiple_, that is, an array or collection of values of the specified type.

Note that since 7.0, Business data is now available. For a detailed explanation, see the [Business Data overview](define-and-deploy-the-bdm.md).

You can also define additional [complex data types](create-a-complex-data-type.md) as Java objects or as XML objects.

<a id="variable_naming"/>

### Variable naming

You are recommended to use meaningful names for variables. This make process debugging and maintenance easier, particularly if more than one person is working on a process. It can be useful to use a system of prefixes to identify the context in which a variable is used, or the task it is associated with. For example, you could label all transient data variables with the prefix trans\_, or you could label variables defined on a task called getData with the prefix task\_getData\_. 
[Java language keywords](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html) cannot be used as variable names.

<a id="define_simple_variable"/>

### Define a simple data type variable

The simple data types are Boolean, date, integer, long, double, and text. To define a variable with one of these types:

1. Open your process diagram in Bonita Studio.
2. Select the process pool or the step where you want the variable.
3. Go to the **Details** panel, **General** view, **Data** pane. A list of the variables already defined is displayed.
4. Choose if you want to add Process data or Business data. Click **_Add..._**.
Note: if you add Business data, only add it at the pool/lane level. See this tutorial as a guide for the next steps[How to add Business data to a process](define-and-deploy-the-bdm.md).
5. Specify a name for the variable. The name must be unique within the scope of the variable. For easier process maintenance, it is a good idea to make all variable names unique within the process, even though this is not strictly necessary for variables defined in a step.
6. Optionally, add a description of the variable.
7. Select the data type from the drop down list.
8. If you are defining a date variable, you can pick an initial date.
9. Optionally, set a default value. You can use the expression editor to set the value, or type directly in the field.
10. To define the variable as multiple, check the box.
11. To define the variable as transient, check the box. This option is not available for process-level variables.
12. To automatically add a widget corresponding to this variable when you generate a form for this step, check the box.
13. Save the definition: if you want to continue on and define another variable, click **_Create & New_**, otherwise click **_Finish_**.

<a id="define_java_object"/>

### Define a Java object variable

You can define a variable whose data type is Java object. Before you define the variable, you must [create the data type definition](create-a-complex-data-type.md).

To add a Java object variable:

1. Open your process diagram in Bonita Studio.
2. Select the process pool or the step where you want the variable.
3. Go to the **Details** panel, **General** view, **Data** pane. A list of the variables already defined is displayed.
4. Click **_Add..._**.
5. Specify a name for the variable. The name must be unique within the scope of the variable. For easier process maintenance, it is a good idea to make all variable names unique within the process, even though this is not strictly necessary for variables defined in a step.
6. Optionally, add a description of the variable.
7. Select Java Object from the drop down list of data types.
8. Specify the class that defines the Java object.
9. Optionally, set a default value. You can use the expression editor to set the value, or type directly in the field.
10. To define the variable as multiple, check the box.
11. To define the variable as transient, check the box. This option is not available for process-level variables.
12. To automatically add a widget corresponding to this variable when you generate a form for this step, check the box.
13. Save the definition: if you want to continue on and define another variable, click **_Create & New_**, otherwise click **_Finish_**.

When you configure the process, add the JAR file that contains the data type definition to the application or process dependencies.

<a id="define_xml"/>

### Define an XML variable

An XML variable has a data type that is defined by an XML schema file.   
Before you define the variable, you must [create the XML schema](create-a-complex-data-type.md) that contains the data type definition.  
The data type definition is stored in an XML schema (XSD) file that belongs to a namespace.

To add an XML variable:

1. Open your process diagram in Bonita Studio.
2. Select the process pool or the step where you want the variable.
3. Go to the **Details** panel, **General** view, **Data** pane. A list of the variables already defined is displayed.
4. Click **_Add..._**.
5. Specify a name for the variable. The name must be unique within the scope of the variable. For easier process maintenance, it is a good idea to make all variable names unique within the process, even though this is not strictly necessary for variables defined in a step.
6. Optionally, add a description of the variable.
7. Select XML from the drop down list of data types.
8. In the XML namespace field, select the XSD file that contains the data type definition.
9. In the Namespace element field, specify the element in the XSD file that defines the data type for the variable you are defining.
10. Optionally, set a default value. You can use the expression editor to set the value, or type directly in the field.
11. To define the variable as multiple, check the box.
12. To define the variable as transient, check the box. This option is not available for process-level variables.
13. To automatically add a widget corresponding to this variable when you generate a form for this step, check the box.
14. Save the definition: if you want to continue on and define another variable, click **_Create & New_**, otherwise click **_Finish_**.

<a id="define_list_of_options"/>

### Define a variable as a list of options

You can use a list of options when the value of a variable is one or more of a fixed set of possible values. If the possible values change frequently, or are related to business data, this method is not recommended. Instead, for business data, you should use a connector to retrieve the possible values from a database.

To add a static list of options variable:

1. Open your process diagram in Bonita Studio.
2. Select the process pool or the step where you want the variable.
3. Go to the **Details** panel, **General** view, **Data** pane. A list of the variables already defined is displayed.
4. Click **_Add..._**.
5. Specify a name for the variable. The name must be unique within the scope of the variable. For easier process maintenance, it is a good idea to make all variable names unique within the process, even though this is not strictly necessary for variables defined in a step.
6. Optionally, add a description of the variable.
7. In the Data type line, click **_List of options..._**. The dialog box that opens shows the option lists that are already defined.
8. Click **_Add_** to add a new list of options, specify a name and, optionally, a description.
9. Specify and sort the options in the list, using the Add, Remove, Up, and Down buttons. 
10. Click **_OK_**. The list of options is saved.
11. Optionally, set a default value. You can use the expression editor to set the value, or type directly in the field.
12. To define the variable as multiple, check the box. This means that more than one option from the list can be selected.
13. To define the variable as transient, check the box. This option is not available for process-level variables.
14. To automatically add a widget corresponding to this variable when you generate a form for this step, check the box.
15. Save the definition: if you want to continue on and define another variable, click **_Create & New_**, otherwise click **_Finish_**.

After a list of options has been defined, you can define another variable that uses the same list of options, by choosing the list name from the Data type menu.

<a id="define_initial_value"/>

### Define the default value

You can specify a default value for a variable either by entering it directly, or by using the expression editor. To launch the expression editor, click the crayon icon beside the Default value field. 

When a form widget related to the variable is displayed, the default value you defined is used as the initial value of the widget in the form.

<a id="define_available_values"/>

### Define available values

The set of available values for a checkbox, checkbox list, dropdown list, radio button set, select list, or suggestion box is set using either a connector or a list of options.

If you do not want to define a set of available values but need to specify constraints on the value, you can use a validator.
