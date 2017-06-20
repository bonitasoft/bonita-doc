# Manage an organization

## Import an organization

This example explains how to import an organization definition from an XML file into Bonita BPM Engine. 

The structure of the XML file is defined in an [XSD file](organization-overview.md). 
To see an example of a well-formed XML file for an organization, export the ACME sample organization from Bonita BPM Studio.

In the following example, the organization definition is stored in a file called `ACME.xml`, which is stored in `path`. The file content is converted to a string, and then imported.
```groovy
final pOrganizationResourceName = "path/ACME.xml"
final File orgFile = FileUtils.toFile(getClass().getResource(pOrganizationResourceName));
final String orgContent = FileUtils.readFileToString(orgFile, CharEncoding.UTF_8);
getIdentityAPI().importOrganization(orgContent);
```

## List the groups in an organization

This example shows how to get a list of groups in the current organization.

The search options specify that a maximum of 100 items are listed, starting with the first one.

Only one organization can be loaded in Bonita BPM Engine at a time, so there is no need to specify the organization, and no organization identifier exists.
```groovy
final IdentityAPI identityAPI = TenantAPIAccessor.getIdentityAPI(apiSession);
final SearchOptionsBuilder builder = new SearchOptionsBuilder(0, 100);
final SearchResult<Group> groupResults = identityAPI(apiSession).searchGroups(builder.done());
```

## Add a group

This example shows how to add a group to the current organization.
```groovy
final IdentityAPI identityAPI = new IdentityAccessor().getIdentityAPI(apiSession);
final GroupCreator groupCreator = new GroupCreator(name).setDescription(description);
final Group group = identityAPI.createGroup(groupCreator);
```

## Delete a group from the organization

This example shows how to delete a group from the organization.

Deleting a group does not delete the users who belong to it. However, if the actor assignment for a process uses a group that is deleted, the users who belonged to the will no longer be able to perform tasks.
```groovy
final IdentityAPI identityAPI = TenantAPIAccessor.getIdentityAPI(apiSession);
identityAPI.deleteGroup(groupId);
```

## Add a role

This example shows how to add a role to the current organization.
```groovy
final IdentityAPI identityAPI = new IdentityAccessor().getIdentityAPI(apiSession);
final RoleCreator roleCreator = new RoleCreator(name).setDescription(description);
final Role role = identityAPI.createRole(roleCreator);
```

## Delete a role from the organization

This example shows how to delete a role from the organization.

Deleting a role does not delete the users who have that role. 
However, if the actor assignment for a process uses a role that is deleted, the users who had the role will no longer be able to perform tasks.
```groovy
final IdentityAPI identityAPI = TenantAPIAccessor.getIdentityAPI(apiSession);
identityAPI.deleteRole(roleId);
```
