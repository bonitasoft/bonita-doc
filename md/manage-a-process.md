# Manage a process

## List the deployed processes

This example shows you how to get a list of the deployed processes.

The search options specify that the list is sorted by deployment date, the maximum number of results to list is 100,
and the list starts with the first results (that is, the processes that were deployed first).
```java
// First of all, let's log in onto the API:
final APIClient apiClient = new APIClient();
apiClient.login("USERNAME", "PASSWORD");

// Then retrieve the Process API:
final ProcessAPI processAPI = apiClient.getProcessAPI();
final SearchOptions searchOptions = new SearchOptionsBuilder(0, 100).sort(ProcessDeploymentInfoSearchDescriptor.DEPLOYMENT_DATE, Order.DESC).done();
final SearchResult<ProcessDeploymentInfo> deploymentInfoResults = processAPI.searchProcessDeploymentInfos(searchOptions);
```

## Enable a process and start an instance

After a process is deployed it must be enabled.

If a process is not enabled, it is not possible to start a process instance.

To **enable a process**, call the method enableProcess specifying the processDefinition id:
```java
// enable the process
processAPI.enableProcess(processDefinition.getId());
System.out.println("A new process was enabled: " + processDefinition.getId());
```

The next step is to **start an instance** of the deployed process:
```java
// start the process
final ProcessInstance processInstance = processAPI.startProcess(processDefinition.getId());
System.out.println("A new process instance was started with id: " + processInstance.getId());
```

## Set variables in a process instance

This section contains some examples of how to set the values of some variables using a list of operations when starting
an instance of a process and in a running process instance.

#### Set string variables and start a process instance

In this example, `createInstance` takes the process definition name, the process version, a map of text variables and their values.
The `startProcess` method, which creates the process instance, takes a list of operations, not a map of variables,
so the map must be converted into a list of operations that will set the values of the variables in the process instance.
The example calls `buildAssignOperation` for each variable in turn, to build an operation that will assign the value to the
variable when the process instance is created. Each operation is built as an assignment expression.
```java
public void createInstance(String processDefinitionName, String processVersion, Map<String, Object> variables) {
    ProcessAPI processAPI;
    try {
        processAPI = apiClient.getProcessAPI();
        long processDefinitionId = processAPI.getProcessDefinitionId(processDefinitionName, processVersion);
        
        List<Operation> listOperations = new ArrayList<>();
        for (String variableName : variables.keySet()) {
            if (variables.get(variableName) != null) {
               Operation operation = buildAssignOperation(variableName, variables.get(variableName).toString(), 
                    String.class.getName(), ExpressionType.TYPE_CONSTANT);
               listOperations.add(operation);
            }
       }
       processAPI.startProcess(processDefinitionId, listOperations, null);
    } catch (Exception e) {
        e.printStackTrace();
    }
}

private Operation buildAssignOperation(final String dataInstanceName, final String newConstantValue, 
    final String className, final ExpressionType expressionType) throws InvalidExpressionException {
    final LeftOperand leftOperand = new LeftOperandBuilder().createNewInstance().setName(dataInstanceName).done();
    final Expression expression = new ExpressionBuilder().createNewInstance(dataInstanceName).setContent(newConstantValue).setExpressionType(expressionType.name()).setReturnType(className).done();
    final Operation operation = new OperationBuilder().createNewInstance().setOperator("=").setLeftOperand(leftOperand).setType(OperatorType.ASSIGNMENT).setRightOperand(expression).done();
    return operation;
}
```

#### Set variables of any type and start a process instance

In this example, `createCase` takes the process definition name, the process version, a map of variable names and objects, and the session identifier.
The `startProcess` method, which creates the process instance, takes a list of operations, not a map of variables, so the map must be converted into a
list of operations that will set the values of the variables in the process instance. For each variable in turn, the example builds
an expression that assigns the value to the variable to the object supplied in the map, specifying the data type by identifying the class of the object.
These expressions are concatenated into a list of operations, which is used to initialize the variables when the process instance is created.
```java
public void createCase(String processDefinitionName, String processVersion, Map<String, Object> variables, ProcessAPI processAPI) {
    try {
        long processDefinitionId = processAPI.getProcessDefinitionId(processDefinitionName, processVersion);
        // ----- create list of operations -----
        List<Operation> listOperations = new ArrayList<>();
        Map<String, Serializable> listVariablesSerializable = new HashMap<>();
        
        for (String variableName : variables.keySet()) {
            Object value = variables.get(variableName);
            if (value != null && value instanceof Serializable) {
                Serializable valueSerializable = (Serializable) value;
                
                variableName = variableName.toLowerCase();
                Expression expr = new ExpressionBuilder().createExpression(variableName, variableName, value.getClass().getName(), ExpressionType.TYPE_INPUT);
                Operation op = new OperationBuilder().createSetDataOperation(variableName, expr);
                listOperations.add(op);
                listVariablesSerializable.put(variableName, valueSerializable);
            }
        }
        
        // ----- start process instance -----
        processAPI.startProcess(processDefinitionId, listOperations, listVariablesSerializable);
        
        // System.out.println("*** End Create Case ****");
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

#### Create a map of variables and values and start a process instance

Create a map specifying the values of the variables required to start a case, then pass it to the `instantiateProcess` method, as shown in the following example:
```java
public void instantiateProcess(String processDefinitionName, String processVersion, Map<String, Serializable> variables)  {
    try {
        ProcessAPI processAPI = apiClient.getProcessAPI();
        long processId = processAPI.getProcessDefinitionId(processDefinitionName, processVersion);
        processAPI.startProcess(processId, variables);
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

#### For a running process instance, set the value of a custom data type variable

To update the value of a variable with a custom data type, you need to call a Groovy script expression that returns the new value of the variable, as shown in the example below:
```groovy
final ProcessAPI processAPI = apiClient.getProcessAPI();
final String dataInstanceName = "acase";
final long activityInstanceId = 2;

final LeftOperand leftOperand = new LeftOperandBuilder().createNewInstance().setName(dataInstanceName)
                .setType(LeftOperand.TYPE_DATA).done();
final Expression expression = new ExpressionBuilder().createGroovyScriptExpression("updateDataCaseTest",
                "new com.bonitasoft.support.Case(\"title\", \"description\")",
                Case.class.getName());
final Operation operation = new OperationBuilder().createNewInstance().setOperator("=").setLeftOperand(leftOperand).setType(OperatorType.ASSIGNMENT)
                .setRightOperand(expression).done();

final List<Operation> operations = new ArrayList<>();
operations.add(operation);
processAPI.updateActivityInstanceVariables(operations, activityInstanceId, null);
```

Another method, `updateActivityDataInstance` also exists. However, this cannot be used with custom data types if you are using a remote connection,
because the data type definition is not present in the Engine.

## Execute a task

This example shows how to execute a task.

The task is specified by an activityInstanceId.
```java
final ProcessAPI processAPI = apiClient.getProcessAPI();
processAPI.executeFlowNode(activityInstanceId);
```

## List the processes I started

This example shows you how to list the open process instances started by the current user.

The search options specify that a maximum of 100 items are listed, starting with the first one.
```java
final ProcessAPI processAPI = apiClient.getProcessAPI();
final SearchOptionsBuilder builder = new SearchOptionsBuilder(0, 100);
builder.filter(ProcessInstanceSearchDescriptor.STARTED_BY, apiClient.getSession().getUserId());
final SearchResult<ProcessInstance> processInstanceResults = processAPI.searchOpenProcessInstances(builder.done());
```

## List the open instances of a process

This example shows you how to list the open instances of a specified process.

The process is specified by the processDefinitionId. The search options specify that a maximum of 100 items are listed, starting with the first one.
```java
final ProcessAPI processAPI = apiClient.getProcessAPI();
final SearchOptionsBuilder builder = new SearchOptionsBuilder(0, 100);
builder.filter(ProcessInstanceSearchDescriptor.PROCESS_DEFINITION_ID, processDefinitionId);
final SearchResult<ProcessInstance> processInstanceResults = processAPI.searchOpenProcessInstances(builder.done());
```

## Get the history for a case

This example shows how to get the history for a case.

A case is a process instance. To get the history, you retrieve the archived process instance, which is specified by processInstanceID.
```java
final ProcessAPI processAPI = apiClient.getProcessAPI();
final ArchivedProcessInstance archivedProcessInstance = processAPI.getArchivedProcessInstance(processInstanceID);
```

## Query archived process instances

This example shows how to get a list of archived process instances that meet a specified filter.

Note that this type of query is only possible with archived process instances.
```java
final ProcessAPI processAPI = apiClient.getProcessAPI();
final SearchOptionsBuilder builder = new SearchOptionsBuilder(0, 100);
builder.filter(ArchivedProcessInstancesSearchDescriptor.STARTED_BY, apiClient.getSession().getUserId());
final SearchResult<ArchivedProcessInstance> archivedProcessInstanceResults = processAPI.searchArchivedProcessInstances(builder.done());
```

## Stop a process instance

This example shows how to stop (or cancel) an active process instance.

No further activities in this process instance are started.
```java
final ProcessAPI processAPI = apiClient.getProcessAPI();
processAPI.cancelProcessInstance(processInstanceID);
```

## Deploy a process

This example will show how to use the Bonita Engine API to deploy and enable a process.

The process can be in a business archive (`.bar`) file or can be built using the `processDefinitionBuilder`.

#### Deploy and enable a process from a bar file

First create a business archive from the bar file. In this example, the bar file is `/deploy/travelRequest.bar`. 
The process is deployed and enabled in a single step.
```java
// create a business archive
final BusinessArchive businessArchive = BusinessArchiveFactory.readBusinessArchive(new File("/deploy/travelRequest.bar"));
```

Now **deploy and enable the process**:
```java
// deploy and enable the process
final ProcessDefinition processDefinition = getProcessAPI().deployAndEnableProcess(businessArchive);
```

#### Deploy and enable a process from the processDefinitionBuilder

In this example, there are three steps: deploy the process, map the actor, and enable the process.

First deploy the process:
```java
// deploy the process
final ProcessDefinition processDefinition = processAPI.deploy(processDefinitionBuilder.done());
System.out.println("A new process was deployed with id: " + processDefinition.getId());
```

Once the process is deployed, it's necessary to **map the actors** defined in the process to existing users in the database before enabling the process.
In this example, the actor defined in the process will be mapped to the current logged in user, whose id is available in the session
(attention, this user cannot be the technical user):
```java
// map the actor "delivery" to the current logged in user
final List<ActorInstance> actors = processAPI.getActors(processDefinition.getId(), 0, 1, ActorCriterion.NAME_ASC);
processAPI.addUserToActor(actors.get(0).getId(), session.getUserId());
```

At this point, the process is deployed but not enabled. This means that no instances of this process can be started.
To **enable the process**, call the method enableProcess:
```java
// enable the process
processAPI.enableProcess(processDefinition.getId());
System.out.println("A new process was enabled: " + processDefinition.getId());
```

## Get the design process definition

This example shows how to retrieve the definition of a deployed process.
```java
// Create a process definition
final ProcessDefinitionBuilder processBuilder = new ProcessDefinitionBuilder().createNewInstance("name", "1.0");
processBuilder.addDescription("description");
processBuilder.addAutomaticTask("AutomaticTask");
        
// Deploy and enable the process
final ProcessDefinition processDefinition = getProcessAPI().deploy(
        new BusinessArchiveBuilder().createNewBusinessArchive().setProcessDefinition(processBuilder.done()).done());
getProcessAPI().enableProcess(processDefinition.getId());

// Get the design process definition
final DesignProcessDefinition resultDesignProcessDefinition = getProcessAPI().getDesignProcessDefinition(processDefinition.getId());
```

## Undeploy a process

This example shows you how to undeploy a process.

### Disable the process

To disable a process, simply call: 
```java
apiClient.getProcessAPI().disableProcess(processDefinitionId)
```

Once the process is disabled, no new instance can be started. However, existing instances continue to execute normally.
This allows to deploy a newer version of the process before deleting the old one. 

### Delete the process

```java
apiClient.getProcessAPI().deleteProcessDefinition(processDefinitionId)
```

::: info
You can directly disable and delete a process by calling the wrapper API method:
```java
apiClient.getProcessAPI().disableAndDeleteProcessDefinition(processDefinitionId)
```
:::

::: warning
Be aware that to be able to delete a process, you must ensure that all running process instances and all
archived (finished) process instances are deleted first:
```java
// Delete all process instances:
while (apiClient.getProcessAPI().deleteProcessInstances(processDefinitionId, 0, 100) > 0) { }
// Delete all archived process instances:
while (apiClient.getProcessAPI().deleteArchivedProcessInstances(processDefinitionId, 0, 100) > 0) { }
```
