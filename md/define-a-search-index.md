# 1.6.8 Define a search index

A search index is data that is attached to a process and is used to distinguish between cases of the process in Bonita BPM Portal. You can define up to five search indexes for a process.


For example, in a process handling insurance claims, you could define the claim number that is automatically assigned from a database to be a search index, so that you can 
search in Bonita BPM Portal and find the case associated with a given claim. 
The value of this search index would be fixed for the entire lifetime of a case. You could also define a claimState search index that is updated at key points while the claim is being handled, 
and could be used to find all your cases that are in a given state.


You can define a search index using any valid expression in the expression editor (constant, script, parameter, or variable). 
In most cases, a search index is a variable, either visible to users (like the claim number) or not. It can be initialized from a form field (typically on the initialization form), from the business data repository, or from an external database, 
or it can be assigned a default 
value in the definition. The value is initialized when the case is created.


The search index value can be fixed for the lifetime of a case or it can be updated with an [operation](/operations) during the process instance lifetime. 
If you define a search index whose value is a variable (or an expression including a variable), the search index value is not automatically updated when the variable value changes. 
You must use an operation to update the search index value at all points in the process definition where the variable value might change. 
Note that you cannot update a search index in a form field operation, action, Groovy script or Connector.



To configure a search index:


1. In a process diagram, select a pool.
2. Go to the **Details panel**, **General** tab, **Search** pane.
3. In the Label column, optionally enter a label for the search index. You can use the expression editor to specify the label, but as it is a constant, you can just type the label into the field. 
The label is used to identify the search index in Bonita BPM Studio and in Bonita BPM Engine. It is not displayed in Bonita BPM Portal.
4. In the Value column, open the expression editor by clicking the expression editor.
5. Define the search index value using an expression.

In Bonita BPM Portal, search indexes are displayed in the case list and in the case more details view. In this way, you can use search indexes for adding business information to your cases. 
You can search on search indexes typing the value of a search index in the Search field. For example, if you have a process called _Issue E111_ that uses the applicant
social security number as a search index, you can type the number of an applicant into the search field and see the status of the tasks in the case.