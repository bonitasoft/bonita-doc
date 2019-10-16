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

## Evaluation cycle

String and JSON variables are initialized at page data model instantiation and their values do not change subsequently. 

Expression, external API and URL parameter variables are evaluated every time something happens on the page, such as when receiving data or on a user interaction. The call of an External API variable is triggered every time the URL of the resource it points at changes.

### External API

External API variables are used to fetch data from outside the page. These are typically used for REST API calls using HTTP GET requests. The response is stored in the page data model. You can parameterize the URL construction with other data using `{{variableName}}` syntax. You can retrieve information using the [Bonita REST APIs](rest-api.md). 

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
* _context_. It is an External API that provides references to all business variables and documents in the process instance. To retrieve a business variable instance, create an External API variable with value `../{{context.myBusinessData_ref.link}}`.
