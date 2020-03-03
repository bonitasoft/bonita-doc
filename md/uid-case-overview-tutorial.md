# Create a case overview page using the UI Designer

Understand what is and how to create a case overview page by following this step by step tutorial.

If you need to modify our default case overview or build your own case overview page, you will have to manage the display of
both Cases and Archived cases.  
Throughout this tutorial you will see how to build a simple page to manage the Case/Archived-case complexity.
Let's get started by creating a new page in the UI Designer.

::: info 
Since Bonita 7.7.0 you can export the default case overview from the portal and import it directly in the UI Designer for edition. The explanantions below may give you a good understanding on how it is built.
:::

## Manage a 'caseId' url parameter

Create a new page in the UI Designer.  
This page will be used to display the case details related to a specific `caseId`.  
We will get this `caseId` using the page URL.  
So just add a new variable with:  
```
- Name = caseId
- Type = URL parameter
- URL parameter name = id
```

## Is there an existing open case for our `caseId`

To know if there is an open case for our `caseId`,  
we need to get the case using a `Get` request on the API `bpm/case`.  
So we will create a new variable:  
```
- Name = openCase
- Type = External API
- API URL = ../API/bpm/case/{{caseId}}?d=started_by&d=processDefinitionId
```

If the case is open,  
the javascript variable `openCase` will contain a json object representation of our case.  
Else the object `openCase` will be undefined due to `404 error`.  

## Is there an existing archived case for our `caseId`

To know if there is an archived case for our `caseId`,  
we need to get the case using a `Get` request on the API `bpm/archivedCase` filtered on `sourceObjectId={{caseId}}`.  
So we will create a new variable:  
```
- Name = archivedCase
- Type = External API
- API URL = ../API/bpm/archivedCase?c=1&d=started_by&d=processDefinitionId&f=sourceObjectId%3D{{caseId}}&p=0
```
If the case is Archived,  
the javascript variable `archivedCase` will contain a json list of one object, that is the json representation  
of our archived case.  
Else it will be an empty list.  

## Maybe the case does not exist

So using those two variables `openCase` and `archivedCase`, it will be easy to know the state of the case.  
But keep in mind that both `openCase` and `archivedCase` could be undefined, that mean the case does not exist.  
Then we will just need to display a message to say "The case {{caseId}} does not exist.".  


## Display case details

Since we are able to define the state of the case, it is easy to display case details using the UI Designer.    
Maybe we need to display different information for open cases or for Archived cases.  
Then we can create tow different containers that will be conditionally shown.  

Open case details will be shown if `openCase` is defined:  
```
Bind the property 'hidden' of the container  with
value= !openCase
```


Archived case details will be shown if `archivedCase` is not empty:    
```
Bind the property 'hidden' of the container  with
value= ((!archivedCase) || (archivedCase.length==0))
```

