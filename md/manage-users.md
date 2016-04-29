# 4.5.5.4 Manage users

In this page:



[Create a new user](#create)  
[Add a user to a group](#add_to_group)  
[List the users in a group](#List_in_group)  
[List the users with a specified role in a group](#list_with_rile_in_group)  
[Get user contact data](#get_contact)  
[Search for users](#search)  
[Get the pending tasks for a user](#get_pending)  
[Get possible users of a task and execute task for a user](#get_eligible)


## Create a new user


This example shows you how to create a new user and assign the user to a profile. 



**Create a new user** by calling the createUser method:
`
// create new user, with username john and password bpm
final User user = identityAPI.createUser("john", "bpm");
System.out.println("New user created: " + user);
`


Alternatively, you can create a more complex user object as follows:
`
// create complex user 
UserCreator creator = new UserCreator("john", "bpm");
creator.setFirstName("Johnny").setLastName("B. Good");
ContactDataCreator proContactDataCreator = new ContactDataCreator().setAddress("32 rue 
        Gustave Eiffel").setCity("Grenoble").setPhoneNumber("555 14 12 541");
creator.setProfessionalContactData(proContactDataCreator);
final User user2 = identityAPI.createUser(creator);
`


Now add the user to a Bonita BPM Portal profile. A user who does not have a profile cannot log in to Bonita BPM Portal.
`
// reference the user in the profile User
// the user must be now registered in one profile. Let's choose the profile user
org.bonitasoft.engine.api.ProfileAPI orgProfileAPI = apiAccessor.getProfileAPI();
SearchOptionsBuilder searchOptionsBuilder = new SearchOptionsBuilder(0,10);
searchOptionsBuilder.filter(ProfileSearchDescriptor.NAME, "user");
SearchResult searchResultProfile = orgProfileAPI.searchProfiles(searchOptionsBuilder.done());
    
// we should find one result now
if (searchResultProfile.getResult().size()!=1)
        { return; }

// now register the user in the profile
Profile profile = searchResultProfile.getResult().get(0);
ProfileMemberCreator profileMemberCreator = new ProfileMemberCreator( profile.getId());
profileMemberCreator.setUserId( user.getId());
orgProfileAPI.createProfileMember(profileMemberCreator);
`



To create a user with more complete information, use the UserBuilder to create 
an instance of User and then use the createUser method with the User as parameter.


## Add a user to a group


This example shows how to add a user to a group.


The user, group, and role are already defined, and each one is specified by ID.
Note that it is not possible to add a user without a role.

`
final IdentityAPI identityAPI = new IdentityAccessor().getIdentityAPI(apiSession);
UserMembership membership = identityAPI.addUserMembership(userId, groupId, roleId);
`


## List the users in a group


This example shows how to get a list of users in a specified group in the organization.


The group is specified by groupID. The search options specify that a maximum of 100 items are listed, starting with the first one.

`
final IdentityAPI identityAPI = TenantAPIAccessor.getIdentityAPI(apiSession);
final SearchOptionsBuilder builder = new SearchOptionsBuilder(0, 100);
builder.filter(UserSearchDescriptor.GROUP_ID, groupID);
final SearchResult userResults = identityAPI(apiSession).searchUsers(builder.done());
`


## List the users with a specified role in a group


This example shows how to get a list of the users who have the specified role in the specified group in the organization.


The group is specified by groupID. The role is specified by roleID. The search options specify that a maximum of 100 items are listed, starting with the first one.

`
final IdentityAPI identityAPI = TenantAPIAccessor.getIdentityAPI(apiSession);
final SearchOptionsBuilder builder = new SearchOptionsBuilder(0, 100);
builder.filter(UserSearchDescriptor.GROUP_ID, groupID);
builder.filter(UserSearchDescriptor.ROLE_ID, roleID);
final SearchResult userResults = identityAPI(apiSession).searchUsers(builder.done());
`


## Get user contact data


You can use the `getUserWithProfessionalDetails` method to retrieve a user and their professional contact data for a user.


This example shows how to get a user and the email address.

`
// Get the professional email address of a user
UserWithContactData proUser = getIdentityAPI().getUserWithProfessionalDetails(user.getId());
proUser.getContactData().getEmail();
`


## Search for users


The following example is a client application that accesses the Engine in HTTP mode to search for 20 users and display their names and identifiers. 

`
package org.bonitasoft.example;

import org.bonitasoft.engine.api.IdentityAPI;
import org.bonitasoft.engine.api.LoginAPI;
import org.bonitasoft.engine.api.TenantAPIAccessor;
import org.bonitasoft.engine.identity.User;
import org.bonitasoft.engine.search.SearchOptionsBuilder;
import org.bonitasoft.engine.search.SearchResult;
import org.bonitasoft.engine.session.APISession;

public class BonitaClientApplicationExample {

    public static void main(final String[] args) throws Exception {


        // example code:
        final LoginAPI loginAPI = TenantAPIAccessor.getLoginAPI();
        System.out.println("login with install//install");
        final APISession session = loginAPI.login("install", "install");
        final IdentityAPI identityAPI = TenantAPIAccessor.getIdentityAPI(session);
        final SearchResult searchUsers = identityAPI.searchUsers(new SearchOptionsBuilder(0, 20).done());
        System.out.println("20 first users:");
        for (final User user : searchUsers.getResult()) {
            System.out.println(" * " + user.getUserName() + " -- " + user.getId());
        }
        loginAPI.logout(session);
        System.out.println("logged out");
    }
}
`


## Get the pending tasks for a user


This example shows you how use the Bonita BPM Engine API to get the pending tasks for a user.

It shows how to get the list of pending tasks, and then for each task, how to assign it to the user and execute it.



To **get the pending tasks** for a given user, call the getPendingHumanTaskInstances method.
In this example, the first page of the current logged user's tasks are retrieved ordered by priority. 
Each page contains up to 20 tasks.
`
// get the pending tasks for the current logged in user
final List pendingTasks = 
       processAPI.getPendingHumanTaskInstances(session.getUserId(), 
           0, 20, ActivityInstanceCriterion.PRIORITY_ASC);
System.out.println("Pending tasks for user " + session.getUserName() + ": " + pendingTasks);
`


Note that this does not return tasks that are already assigned to the user.


Then loop through the list of tasks. For each task, **assign the task** to the user and **execute the task**:
`
// assign and execute pending tasks
for (final HumanTaskInstance pendingTask : pendingTasks) {
    // assign the task to the user
    processAPI.assignUserTask(pendingTask.getId(), session.getUserId());
    // execute the task
    processAPI.executeFlowNode(pendingTask.getId());
}
`


## Get possible users of a task and execute task for a user


This example shows how to get the list of users who are eligible to perform a task.


First, it creates a simple process containing one human task, called "step1". 
This task will be performed by a user who is mapped to the "expert" actor. An actor filter is applied to "step1", assigning the task specifically to the superExpert user.


Next, it calls `getPossibleUsersOfHumanTask` to get the list of all users who are eligible to perform the step1 according to the process definition. 
This will be a list of all the users who are mapped to the expert actor.


Next, it calls `getPossibleUsersOfPendingHumanTask` to get the list of users who will perform a specific instance of step1, in the process instance. 
The actor filter is applied when the task instance is created. This is known as **dynamic task assignment**. 
The actor filter is applied and a shorter list of users is returned (in this case, just superExpert).


Dynamic task assignment using `getPossibleUsersOfPendingHumanTask` re-evaluates the actor mapping including any actor filters. 
It is useful if your organization changes after a process instance is started and you need to modify the list of users who can perform a task.


Finally, it executes the task for the fist user on the list. This "execute for" feature is not available in the Community and Teamwork editions.

`
// Create a process definition containing a human task, step1
// Step1 is performed by actor expert adjusted by an actor filter


final ProcessDefinitionBuilder designProcessDefinition = new ProcessDefinitionBuilder().createNewInstance("assign", "5.0");
designProcessDefinition.addActor("expert");
final UserTaskDefinitionBuilder taskDefinitionBuilder = designProcessDefinition.addUserTask("step1", "expert");

        taskDefinitionBuilder.addUserFilter("test", "org.bonitasoft.engine.filter.user.testFilter", "1.0").addInput("userId",
                new ExpressionBuilder().createConstantLongExpression(superExpert.getId()));

final ProcessDefinition processDefinition = deployAndEnableWithActor(designProcessDefinition.done(), "expert", role);

final ProcessInstance processInstance = getProcessAPI().startProcess(processDefinition.getId());
Thread.sleep(3000);
final SearchOptionsBuilder searchOptionsBuilder = new SearchOptionsBuilder(0, 1);
searchOptionsBuilder.filter(HumanTaskInstanceSearchDescriptor.NAME, "step1");
final HumanTaskInstance userTask = getProcessAPI().searchHumanTaskInstances(searchOptionsBuilder.done()).getResult().get(0);

// Get all users of the actor of the userTask called 'step1'
List possibleUsers = getProcessAPI().getPossibleUsersOfHumanTask(processDefinition.getId(), "step1", 0, 10);


// Get the filtered list of users for the task instance

possibleUsers = getProcessAPI().getPossibleUsersOfPendingHumanTask(userTask.getId(), 0, 10);

// Execute task for first user in list
processAPI.assignUserTask(activityId, possibleUsers.get(0).getId());
processAPI.executeFlowNode(possibleUsers.get(0).getId(), activityId);

`