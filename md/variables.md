# Variables in the UI Designer

Discover how to use variables in the UI Designer to manage information in artifacts.

**Variables** are a key concept in the UI Designer. They define how pages, layouts, forms and fragments behave. They are used to fetch external resources, to manipulate and process information, and much more. It is important to understand how to define and use variables in artifacts, and how the data contained in the variables works when combined with widget properties. Unless otherwise stated, we will use "page" as the generic term for page, layout, form, and fragment.

There are several types of variables:
* Static
  * String
  * JSON
* Dynamic
  * JavaScript Expression
  * External API
  * URL parameter
* Data Management
  * Business data

## Evaluation cycle

String and JSON variables are initialized at page data model instantiation and their values do not change subsequently. 

Expression, external API and URL parameter variables are evaluated every time something happens on the page, such as when receiving data or on a user interaction. The call of an External API variable is triggered every time the URL of the resource it points at changes.

#### Business Data

Business Data variables are meant to retrieve BDM objects defined in Studio. These objects are accessible through REST API calls, so they can be retrieved using External API variables defining the URL.
For example, you can know by heart this URL:

    ../API/bdm/businessData/{{businessDataType}}?q={{queryName}}&p=0&c=10&f={{filter}}
    
With: 
*   **businessDataType** As example com.company.model.Invoice
*   **queryName** One of object available queries, as example findByNumInvoice
*   **filter** All filters required by the query, as example f=numInvoice=XXXX

Or with Business Data variables, you are able to select one object (from left panel or select box), see its available queries and select one, and configure its filters which are already proposed.
This allows boost and simplify configuration on these data.    

##### How to create a Business Data variable

A Business Data variable can be created in two ways:
- From the Variables bottom panel, creating a new variable with the type Business Data
- From Data Model section in the left panel, drag and droping a Business Object to the whiteboard area. In this case, a user interface will also be generated

A configuration wizard appears: create a Business Data variable by providing information on how to retrieve elements of this Business Object.

Select the query to retrieve Business Object. Queries can be a simple attribute query (ex: findByName) or an additional query such as a custom query.
A filter area is displayed, depending on your selection, you may have to enter one or several attribute values. You can use a variable to fill its value using interpolation syntax.

You can use Pagination section to define the number of elements you want by page (by default 10 elements) and the page number (by default first page - index 0).

:::warning
Business data variables will be always an array that contains the result of query execution. In case of single result queries, such as find by persistence Id, you may access the values like this InvoiceVar[0], knowing that 0 is first and only element of your array.
:::

:::info
Read [Integration with Bonita Platform](ui-designer-overview.md#integration-with-bonita-platform) to know how Business Data are connected with Bonita Platform.
:::

### External API

External API variables are used to fetch data from outside the page. These are typically used for REST API calls using HTTP GET requests. The response is stored in the page data model. You can parameterize the URL construction with other data using `{{variableName}}` syntax. You can retrieve information using the [Bonita REST APIs](rest-api.md). 
You can retrieve response **Status Code** or response **Headers** with `__status` and `__headers` on this variable (ex: variableName.__status)

Here are some examples:

* Get the session information of the current user - API URL:  
`../API/system/session/{{userId}}`

This variable is evaluated every time the value of `userId` changes. Also, if `userId` is not defined then the call is not triggered.

* Retrieve the task with the id `taskId`:  
API URL: `../API/bpm/humanTask/{{taskId}}`

* Retrieve a [business object](bdm-api.md) with name `businessDataName` associated with the case with id `caseId`:  
API URL: `../API/bdm/businessDataReference/{{caseId}}/{{businessDataName}}`

* Retrieve business data using the reference link in the [context](contracts-and-contexts.md) when building a form:  
API URL: `../{{context.myBusinessData_ref.link}}`

* Retrieve lazy references of a business data field using `lazyRef` filter in an External API variable:  
API URL: `{{myBusinessData | lazyRef : 'relationName'}}` where `myBusinessData` is an External API variable retrieving a business data from the context like in the above example and `relationName` the name of the lazy relation field to retrieve.

### JavaScript expression

An JavaScript expression variable is a JavaScript function. During the evaluation, the function can use the **$data** variable, which provides access to the page data model. For example:  
```javascript
var result = $data.expenses * 2;
    return result;
```

An expression often relies on other variables as dependencies. 
::: warning
**Warning:** Every time one of these variables changes, the whole JavaScript expression is re-evaluated and the previous value is overwritten.   
:::
For example, create a `login` expression variable: `return $data.firstname.toLowercase() + '-' + $data.lastname.toLowercase()`. Its dependencies are the two variables `firstname` and `lastname`.   
Create two input widgets "First name" and "Last name" and bind the values to two variables `firstname` and `lastname`. Add a text widget "Login" to display the result of the `login` expression. When the user fills out the two input fields, the expression is updated. If the login value is manually edited before the user fills out the fields, then its value is overwritten.

## Using a variable

A variable is used by another variable or inside a [widget](widgets.md) properties. There are many ways to use a variable in widget properties: 
* In a property containing text or HTML to be displayed in a widget, you can use the syntax _{{variableName}}_ in the content to make it dynamic content. For example, you could display the user's name in a welcome message. 
* In the case of user input (for example the _Value_ property of a text input) the variable value is used both to set the initial value and retrieve the user input.

A binding is dynamic, so every time the value of a variable changes, the whole data model is re-evaluated and the UI is updated.

## In Bonita forms

One of the goals of the UI Designer is to enable you to build forms for process instantiation and human tasks execution. The [contract](contracts-and-contexts.md) eases the decoupling between the user views and the process. When a form is submitted for process instantiation or for human task execution, the UI Designer sends data to fulfill the contract.

To ease the definition of the form data to send back to the process, when you create a form from the Bonita Studio, the UI Designer generates the following variables:

* _formInput_. It is a JSON object. Its structure is defined by the contract inputs and the attributes are initialized with default values. It could be used to set initial values for form fields. You can set the values in formInput either by editing the default values with constants (for testing and debugging purposes) or with values from an object in an external source that has the same model (such as a BDM external API). You can also set the initial values of a form from some other source without using formInput. However, you will then have to edit formOutput manually.
* _formOutput_. It is a JavaScript expression returning an object. The object structure matches the contract requirements and it is filled with formInput by default. On Submit, values entered or modified by the user and aggregated in the formOutput object (as defined by the _Data sent on click_ property of the Submit button) are submitted to the process or task to fulfill the contract.
* _taskId_. It is the id of the current BPM task. You can use it as a BPM API parameter.
* _context_. It is an External API that provides references to all business variables and documents in the process instance.
* _submit_errors_list_. It is a JavaScript expression formatting the response payload to html when a submit fails. 
In some cases, other types of variables are created:
* When the business variable is edited in the form (as specified in the contract creation wizard), a UI Designer variable is created for each variable (External API). 
For example, if the contract input has been created from a business variable `invoice` in the process, a variable `invoice` is created in the form and its URL is set to `../{{context.invoice_ref.link}}`. 
If `invoice` contains lazy relations, additional variables are generated for each lazy relation to resolve (using _lazyRef_ filter). 
For example, if `invoice` has a `customer` relation in lazy, an External API variable `invoice_customer` is added. Its URL is set to `{{invoice|lazyRef:'customer'}}`.
* To display an aggregated object, a Select widget is generated to display the _available values_ of the object. 
  The variable (External API) bound to the widget is created. It queries the BDM. For example, when the object Invoice has an aggregated object Customer, the query is: `../API/bdm/businessData/com.company.model.Customer?q=find&p=0&c=99`. By default it uses the `find` query with a default pagination (only first 100 objects are returned).

