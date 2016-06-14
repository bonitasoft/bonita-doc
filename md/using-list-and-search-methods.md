# List and search methods

The Bonita BPM Engine APIs contain several list and search methods. This page explains the difference between list and search, and explains how to configure word-based search.

The following example shows how to use a list method to see the archived activity instances:
```java
List<ArchivedActivityInstance> archivedActivityInstances = 
    TenantAPIAccessor.getProcessAPI(session).getArchivedActivityInstances(instance.getId(), 0, 100, ActivityInstanceCriterion.NAME_ASC);
```

The following example shows how to use a search method to see the archived activity instances.
```java
SearchOptionsBuilder searchBuilder = new SearchOptionsBuilder(0, 100);
searchBuilder.sort(ArchivedActivityInstanceSearchDescriptor.NAME, Order.ASC);
SearchResult<ArchivedActivityInstance> archActivitResult = TenantAPIAccessor.getProcessAPI(session).searchArchivedActivities(searchBuilder.done());
```

These two examples above return identical information. Both list and search can be used to return a specified number of results, sorted according to a specified criterion.

The advantage of using list is that it is a single query, so has better performance. It is also simpler to code. 

The advantage of using search is that you can specify filters to get a more precise set of results, which can be more efficient. Several filters can be added. By default, an implicit AND clause is added when several filters are added. If the need is different,
you can have an OR clause, of more complex clauses. See [SearchOptionsBuilder methods](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/org/bonitasoft/engine/search/SearchOptionsBuilder.html) for filtering that matches your needs.   
The following example is a more precise search for archived activity instances, using a filter:
```java
SearchOptionsBuilder searchBuilder = new SearchOptionsBuilder(0, 100);
// implicit AND clause between the following two filters:
searchBuilder.filter(ArchivedActivityInstanceSearchDescriptor.ROOT_PROCESS_INSTANCE_ID, processInstance.getId());
searchBuilder.filter(ArchivedActivityInstanceSearchDescriptor.ASSIGNEE_ID, myUser.getId());
searchBuilder.sort(ArchivedActivityInstanceSearchDescriptor.NAME, Order.ASC);
SearchResult<ArchivedActivityInstance> archActivitResult = TenantAPIAccessor.getProcessAPI(session).searchArchivedActivities(searchBuilder.done());
```
Below is another example of a more complex search filtering.
```java
SearchOptionsBuilder sob = new SearchOptionsBuilder(0, 10);
sob.filter(HumanTaskInstanceSearchDescriptor.PROCESS_INSTANCE_ID, myProcessInstance.getId());
sob.or();
sob.differentFrom</b>(HumanTaskInstanceSearchDescriptor.ASSIGNEE_ID, myUser.getId());
```

Word-based search <!--{.h2}-->

By default, search uses a "starts by" algorithm for searching, and finds matches where the search string occurs at the start of a phrase. 
If word-based search is enabled, you can search for a string that is preceded by white space or is at the start of the phrase. 
For example:
| Phrase in database | Search string | Matches with "starts with" | Matches with word-based search |
|:-|:-|:-|:-|
| Hello Charles | charles | no | yes |
| Hello Charles | he | yes | yes |
| Hello Charles | carl | no | no |
| Hello\_Charles | ch | no | no |
  
Using word-based search has an impact on performance, so by default it is disabled. You can enable it for the platform or for a tenant. If you enable it, you can exclude any objects for which it is not useful.

To configure word-based search, edit  [`bonita-platform-community-custom.properties`](BonitaBPM_platform_setup.md) and make the following changes: 

1. Change the value of `bonita.platform.persistence.platform.enableWordSearch` (for the platform) or `bonita.platform.persistence.tenant.enableWordSearch` (for a tenant) to `true` in the following line:
   ```xml
   <constructor-arg name="enableWordSearch" value="false" />
   ```
2. For each object you be excluded from word-based search, add a mapping to the `wordSearchExclusionMappings` set. Each mapping has the following form:
   ```xml
   <value>org.bonitasoft.engine.identity.model.SUser</value>
   ```

When you restart the Engine, these settings are applied and word-based search comes into operation.
