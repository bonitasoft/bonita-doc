# Create a case overview using UI Designer

If you need to modify our default case overview or build your own case overview page, you will have to manage the display of
both Cases and Archived cases.

Throughout this tutorial you will see how to build a simple page to manage the Case/Archive-case complexity.
Let's get started by creating a new page in the UI Designer.

## Manage a 'caseId' url parameter

Create a new page in UI Designer.
This page will be used to display the case details related to a specific `caseId`.
We will get this `caseId` using the page URL.<br>
So just add a new variable with:
```css
- Name = caseId
- Type = URL parameter
```

## Is there an existing Open Case for our `caseId`

To know if there is an open case for our `caseId`,<br>
we need to get the case using a `Get` request on the API `bpm/case`.<br>
So we will create a new variables:
```css
- Name = openCase
- Type = External API
- API URL = ../API/bpm/case/{{caseId}}
```

If the case is open,<br>
the javascript variable `openCase` will contain a json object representation of our case.<br>
Else it will return a `404 error`, and the object `openCase` will be undefine.<br>

## Is there an existing Archived Case for our `caseId`

To know if there is an archived case for our `caseId`,<br>
we need to get the case using a `Get` request on the API `bpm/archivedCase` filtered on `sourceObjectId={{caseId}}`.<br>
So we will create a new variables:
```css
- Name = archivedCase
- Type = External API
- API URL = ../API/bpm/archivedCase?c=1&d=started_by&d=processDefinitionId&f=sourceObjectId%3D{{caseId}}&p=0
```
If the case is Archived,<br>
the javascript variable `archivedCase` will contain a json list of one object, that is the json representation
of our archived case.<br>
Else it will return an empty list.<br>

## Maybe the case does not exist

So using those two variables `openCase` and `archivedCase`, it will be easy to know the state of the case.<br>
But we need to manage the case when both `openCase` and `archivedCase` are undefine, that mean the case does not exist. <br>
Then we will just need to display a message to say "The case {{caseId}} does not exist.".


## Display case details

Since we are able to define the state of the case, it is easy to display case details using UI Designer.<br>
Maybe we need to display different information for Open cases or for Archive cases.<br>
Then we can create tow different containers that will be conditionally shown.
<br>
Open case details will be shown if `openCase` is define:<br>
```css
Use the hidden property of the container  with
value= !openCase
```
<br>

Archive case details will be shown if `archivedCase` is not empty:<br>
```css
Use the hidden property of the container  with
value= ((!archivedCase) || (archivedCase.length==0))
```
