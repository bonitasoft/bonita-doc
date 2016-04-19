# 4.5.2 Create your first project with the Engine APIs and Maven

This page contains an example of to set up a Maven project to create a client that uses the Bonita BPM client APIs to communicate with the Bonita BPM Engine and run a process. 
It assumes that you are a Java programmer familiar with using Maven.


**[Bonita BPM Client APIs](#apis)**

**[Maven dependencies](#maven_dependencies)**

**[Bonita home](#bonita_home)**

**[Log in](#login)**

**[Example of a client program](#java_client_example)**

## Bonita BPM Client APIs


In this example, we use the following APIs:

* LoginAPI: Manages the login on tenants. Using this API you can obtain an APISession, which is required for access to the tenant APIs, such as the IdentityAPI and the ProcessAPI.
* ProcessAPI: Manages processes. Using this API you can handle process execution (for example, start a process, retrieve a task, execute a task, or retrieve data) and process management 
(for example, deploy, undeploy, enable or disable a process). 




## Maven dependencies


In order to use the client APIs, you need to add a dependency to the `bonita-client` artifact in your Maven `pom.xml` file: 

`
7.0.0
   ...
org.bonitasoft.enginebonita-client${bonita.bpm.version}`



## Bonita home


In order to execute this client example you need to set the Java system property `bonita.home`, for example `-Dbonita.home=`, 
and [configure a var\_bonita\_home for the client](/configuring-bonita-home-client.md). The bonita home used must have the same version as
the Bonita BPM Engine, which is configured in bonita.bpm.version (here 7.0.0). 



## Log in


The first action of the client must be to log in. This example shows how to log in when accessing the server over HTTP:

`
Map settings = new HashMap();
settings.put("server.url", "http://localhost:8080");
settings.put("application.name", "bonita");
APITypeManager.setAPITypeAndParams(ApiAccessType.HTTP, settings);
// get the LoginAPI using the TenantAPIAccessor
LoginAPI loginAPI = TenantAPIAccessor.getLoginAPI();
// log in to the tenant to create a session
APISession apiSession = loginAPI.login(username, password);
`



## Example of a client program


In this example, a user interacts with a Bonita BPM process by choosing actions from a command-line client program written in Java.


The user can choose one of the following actions:

* start a process
* list open process instances: process instances that have not yet completed
* list archived process instances: process instances that have completed
* list pending tasks
* execute a task

The program displays a menu presented by the `getMenutTextContent` method:
`
private static String getMenutTextContent() {
   StringBuilder stb = new StringBuilder("\nChoose the action to be executed:\n");
   stb.append("0 - exit\n");
   stb.append("1 - start a process\n");
   stb.append("2 - list open process instances\n");
   stb.append("3 - list archived process instances\n");
   stb.append("4 - list pending tasks \n");
   stb.append("5 - execute a task\n");
   stb.append("Choice:");
   String message = stb.toString();
   return message;
   }
`


These choices are interpreted by the following code:
`
private static void executeActions(ProcessDefinition processDefinition) 
    throws IOException, BonitaException {
    String message = getMenutTextContent();
    String choice = null;
    do {
        // show the menu and read the action chosen by the user
        choice = readLine(message);
        if ("1".equals(choice)) {
            // if user chooses 1, start a new process instance
            startProcess(processDefinition);
        } else if ("2".equals(choice)) {
            // if user chooses 2, list open process instances
            listOpenedProcessInstances();
        } else if ("3".equals(choice)) {
            // if user chooses 3, list archived process instances
            listArchivedProcessInstances();
        } else if ("4".equals(choice)) {
            // if user chooses 4, list pending tasks
            listPendingTasks();
        } else if ("5".equals(choice)) {
            // if user chooses 5, execute the task chosen by the user
            executeATask();
        } else if (!"0".equals(choice)) {
            System.out.println("Invalid choice!");
        }
    } while (!"0".equals(choice));
}
`


### Start a process
`
private static void startProcess(ProcessDefinition processDefinition) {
    ProcessAPI processAPI = TenantAPIAccessor.getProcessAPI(apiSession);
    ProcessInstance processInstance = processAPI.startProcess(processDefinition.getId());
}
`


### List open process instances


All Bonita BPM Engine API methods that deal with collections are paged to avoid having too many entries in memory. 
For these methods, if you want to retrieve all results you need handle this page by page. 
This the case with the searchProcessInstances method used here to retrieve open process instances. In the example, each page will contain up to 5 (PAGE\_SIZE) elements:

`
private static void listOpenedProcessInstances() {
    // the result will be retrieved by pages of PAGE_SIZE size
    int startIndex = 0;
    int page = 1;
    SearchResult result = null;
    do {
        // get the current page of open process instances
        result = getOpenProcessInstancePage(session, startIndex);
        // print the current page
        printOpenedProcessIntancesPage(page, result);

        // go to next page
        startIndex += PAGE_SIZE;
        page++;
    } while (result.getResult().size() == PAGE_SIZE);
}
`

`
private static SearchResult getOpenProcessInstancePage(APISession apiSession, int startIndex) throws BonitaException {
    // create a new SeachOptions with given start index and PAGE_SIZE as max number of elements
    SearchOptionsBuilder optionsBuilder = new SearchOptionsBuilder(startIndex, PAGE_SIZE);
    // sort the result by the process instance id in ascending order
    optionsBuilder.sort(ProcessInstanceSearchDescriptor.ID, Order.ASC);
    // perform the request and return the result
    ProcessAPI processAPI = TenantAPIAccessor.getProcessAPI(apiSession);
    return processAPI.searchProcessInstances(optionsBuilder.done());
}
`


### List archived process instances 


In order to retrieve all archived process instances you also need to iterate page by page:
`
private static void listArchivedProcessInstances() {
    // the result will be retrieved by pages of PAGE_SIZE size
    int startIndex = 0;
    int page = 1;
    SearchResult result = null;
    do {
        // get the current page of opened process instances
        result = getArchivedProcessInstancePage(session, startIndex);
        // print the current page
        printArchivedProcessInstancePage(page, result);

        // go to the next page
        startIndex += PAGE_SIZE;
        page++;
    } while (result.getResult().size() == PAGE_SIZE);
}
`

`
private static SearchResult getArchivedProcessInstancePage(APISession apiSession, int startIndex) throws BonitaException {
    // create a new SeachOptions with given start index and PAGE_SIZE as max number of elements
    SearchOptionsBuilder optionsBuilder = new SearchOptionsBuilder(startIndex, PAGE_SIZE);
    // when process instances are archived the original process instance id is supplied by SOURCE_OBJECT_ID,
    // so the result will be sort by the SOURCE_OBJECT_ID
    optionsBuilder.sort(ArchivedProcessInstancesSearchDescriptor.SOURCE_OBJECT_ID, Order.ASC);
    // perform the request and return the result;
    ProcessAPI processAPI = TenantAPIAccessor.getProcessAPI(apiSession);
    return processAPI.searchArchivedProcessInstances(optionsBuilder.done());
}
`


### List pending tasks


To get the pending tasks for the logged user, you use the method getPendingHumanTaskInstances.

`
private static void listPendingTasks() {
    ProcessAPI processAPI = TenantAPIAccessor.getProcessAPI(apiSession);
    // the result will be retrieved by pages of PAGE_SIZE size
    int startIndex = 0;
    int page = 1;
    List pendingTasks = null;
    do {
        // get the current page
        pendingTasks = processAPI.getPendingHumanTaskInstances(session.getUserId(), startIndex, PAGE_SIZE, ActivityInstanceCriterion.LAST_UPDATE_ASC);
        // print the current page
        printTasksPage(page, pendingTasks);

        // got to next page
        startIndex += PAGE_SIZE;
        page++;
    } while (pendingTasks.size() == PAGE_SIZE);
}
`


### Execute a task


Before a user can execute a task, the task needs to be assigned to the user. The assignUserTask method assigns the task to the user. The executeFlowNode method executes the task.
`
private static void executeATask() {
    processAPI.assignUserTask(taskToExecute.getId(), session.getUserId());

    processAPI.executeFlowNode(taskToExecute.getId());
}
`