# 1.7.2.8 Variables

**Variables** are a key concept of the UI designer. They define page behaviour, are used to
fetch external resources, to manipulate and
process information, and for much more.
It is important to understand how to define and use variables in a page, and how the data contained in the variables
works when combined with widget properties.

There are several types of variable:

* String
* JSON
* JavaScript Expression
* External API
* URL parameter

## Evaluation cycle

String and JSON are initialization types. Variables with these types are used at page data
model instantiation and their values do not change subsequently. 

Expression, external variables and URL parameter variables are dynamic. They are evaluated every time something happens
on the page, such as when receiving data or on a user interaction. 
The call of an External API variable is triggered every time the URL of the resource it points at changes.

### External variable

External variables are used to fetch data from outside the page. This is typically
a REST API.
The call to the specified URL is done using an HTTP GET request. The result is stored in the page data model.
You can parameterize the URL construction with other data using `{{variableName}}` syntax.
You can retrieve information using the [Bonita REST APIs](/rest-api.html). Here are some examples:

* Get the id of the current user: API URL:
`../API/system/session/{{userId}}`

This variable is evaluated every time the value of
`userId` changes. Also, if
`userId` is not yet defined then the call is not triggered.
* 
Retrieve the taskId:
API URL: `../API/bpm/humanTask/{{taskId}}`
* 
Retrieve a [business object](/bdm-api.html) associated with a process instance:
API URL: `../API/bdm/businessDataReference/{{caseId}}/{{businessDataName}}`
* 
Retrieve business data using the reference in the [context](/contracts-and-contexts.html#context) when building a form.
API URL: `../{{context.myBusinessData_ref.link}}`

### Expression variables

An expression is a JavaScript function. During the evaluation, the function can use the
**$data** variable, which provides access to the page data model. For example:
`
var result = $data.expenses * 2;
    return result;`

Every time something happens on the
page, expressions are reevaluated and the previous value is overwritten. Therefore you cannot bind the result
of an expression to a user input.

## Using a variable

A variable is used with a [widget](/widgets.html).
There are many ways to use a variable in widget properties.
In a property containing text or HTML to be displayed in a widget, you can use the syntax _{{variableName}}_ in the content o make it dynamic the
content. For example, you could display the users name in a welcome message.
In the case of user input (for example the _Value_ property of a text input) the variable value is used both to set
the initial
value and retrieve the user input.

A binding is dynamic, so every time the value of a variable changes, the whole data model is re-evaluated and the UI is updated.

## Bonita BPM forms

One of the goals of the UI designer is to enable you to build forms for process instantiation and human tasks.
The [context and contract](/contracts-and-contexts.html) decouple the UI from the process. The UI designer
retrieves the context in which a human task form executes. When a form is submitted for process instantiation or for a human task, the UI designer
sends data to fulfil the contract.

When creating a form from Bonita BPM Studio, the UI designer generates the following variables:

* _formInput_ is a JSON object.
Its structure is defined by the contract inputs and the attributes are initialized with default values. It could be
used to set initial values for form fields.
You can set the values in formInput either by editing the default values with constants (useful for test and debug)
or with values from an object in an external source that has the same model (such as with a BDM external API).
You can also set the initial values of a form from some other source without using formInput. However, you will then
have to edit formOutput manually.
* 
_formOutput_ is a JavaScript expression returning an object.
The object structure matches the contract requirements and it is filled with formInput by default. On Submit, values entered
or modified by the user and aggregated in the formOutput object (as defined by the _Data sent on click_
property
of the Submit button) are submitted to the process or task to filfil the contract.
* 
_taskId_ is the id of the current BPM task. You can use it as a BPM API parameter.
* 
_context_ is an External API.
It provides references to all business variables and documents in the process instance. To retrieve a business
variable instance, create an External API variable with value `../{{context.myBusinessData_ref.link}}`.