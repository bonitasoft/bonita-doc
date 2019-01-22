# Handle a failed activity

::: info
**Note:** For Enterprise and Performance editions only.
:::

An activity (or task) can fail in Bonita Engine for several reasons. Typical reasons include:

* An input expression evaluation fails (for example because of invalid syntax, or incorrect values).
* The condition in an output transition fails to evaluate properly.
* A connector fails to execute because of remote system connection problem.
* A connector fails to execute because of erroneous connector implementation.
* A connector fails to execute because a connector input or output expression fails to evaluate.

In these cases, the activity is considered to have failed, and its state is recorded as FAILED in the Bonita database.

Note that if communication between the server and the database is interrupted, the activity failure cannot be recorded. In this case, 
the state of the activity will be the state previously recorded.

## Possible actions on activity failure

The Process Management API provides the following actions:

* Reset the state of a failed connector, using `setConnectorInstanceState(long connectorInstanceId, ConnectorStateReset state)`.
* Reset the states of a list connectors, using setConnectorInstanceState(final Map<> connectorsToReset).
* Retry a failed activity, using replayActivity(long activityInstanceId).
* Reset the states of a list of failed connectors and, in the same operation, retry the corresponding failed activity, using 
replayActivity(long activityInstanceId, `Map<Long` connectorsToReset>connectorsToReset).

## Code explained

In this example, an activity has failed because a connector failed to execute.

The methods that are used to reset process items are in the ProcessManagementAPI, and the details are in the 
[Javadoc](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/index.html). These methods are accessed through the ProcessAPI, which extends the ProcessManagementAPI.

First you need to log in, create the session, and get the ProcessAPI:
```groovy
        final APIClient apiClient = new APIClient()
        apiClient.login("USERNAME", "PASSWORD")
        final ProcessAPI processAPI = apiClient.getProcessAPI();
```

Then find the connector instance that failed:
```groovy
        final SearchOptions searchOptions = new SearchOptionsBuilder(0, 1).filter(ConnectorInstancesSearchDescriptor.CONTAINER_ID, failedTaskId)
                .filter(ConnectorInstancesSearchDescriptor.STATE, ConnectorState.FAILED.name()).done();
        final SearchResult<ConnectorInstance> searchResult = processAPI.searchConnectorInstances(searchOptions);
        final ConnectorInstance connectorInstance = searchResult.getResult().get(0);
```

Find the reason for the failure by searching the internal logs:

```groovy
        // search why the connector failed:
        final SearchOptionsBuilder builder = new SearchOptionsBuilder(0, 100);
        builder.filter(LogSearchDescriptor.ACTION_SCOPE, failedTaskId);
        builder.searchTerm("Connector execution failure");
        builder.sort(LogSearchDescriptor.ACTION_TYPE, Order.ASC);
        final LogAPI logAPI = apiClient.getLogAPI();
        final SearchResult<Log> searchedLogs = logAPI.searchLogs(builder.done());
        for (Log log : searchedLogs.getResult()) {
            // Print the failed connecor reason message:
            System.out.println(log.getMessage());
        }
```

Then either reset the state of the connector instance and re-execute it, or skip the connector, as shown below:
`processAPI.setConnectorInstanceState(connectorInstance.getId(), ConnectorStateReset.SKIPPED);`

Then try to execute the activity again: `processAPI.retryTask(failedTaskId);`

Finally, log out: `loginAPI.logout(session);`

## Complete code
```groovy
import org.bonitasoft.engine.bpm.connector.ConnectorInstance;
import org.bonitasoft.engine.bpm.connector.ConnectorInstancesSearchDescriptor;
import org.bonitasoft.engine.bpm.connector.ConnectorState;
import org.bonitasoft.engine.bpm.connector.ConnectorStateReset;
import org.bonitasoft.engine.search.Order;
import org.bonitasoft.engine.search.SearchOptions;
import org.bonitasoft.engine.search.SearchOptionsBuilder;
import org.bonitasoft.engine.search.SearchResult;
import org.bonitasoft.engine.session.APISession;

import com.bonitasoft.engine.api.APIClient;
import com.bonitasoft.engine.api.LogAPI;
import com.bonitasoft.engine.api.ProcessAPI;
import com.bonitasoft.engine.api.TenantAPIAccessor;
import com.bonitasoft.engine.log.Log;
import com.bonitasoft.engine.log.LogSearchDescriptor;

public class SkipConnectorAndReplayActivity {

    public static void main(final String[] args) throws Exception {

        // Let's consider we know the id of the failed Activity:
        final long failedTaskId = 123456789l;

        // First action: Login to the api:
        final APIClient apiClient = new APIClient()
        apiClient.login("USERNAME", "PASSWORD")
        final ProcessAPI processAPI = apiClient.getProcessAPI();
        // we suppose here that we have an activity in state failed with the id 'failedTaskId'
        // retrieve the failed connector:
        final SearchOptions searchOptions = new SearchOptionsBuilder(0, 1).filter(ConnectorInstancesSearchDescriptor.CONTAINER_ID, failedTaskId)
                .filter(ConnectorInstancesSearchDescriptor.STATE, ConnectorState.FAILED.name()).done();
        final SearchResult<ConnectorInstance> searchResult = processAPI.searchConnectorInstances(searchOptions);
        final ConnectorInstance connectorInstance = searchResult.getResult().get(0);

        // search why the connector failed:
        final SearchOptionsBuilder builder = new SearchOptionsBuilder(0, 100);
        builder.filter(LogSearchDescriptor.ACTION_SCOPE, failedTaskId);
        builder.searchTerm("Connector execution failure");
        builder.sort(LogSearchDescriptor.ACTION_TYPE, Order.ASC);
        final LogAPI logAPI = apiClient.getLogAPI();
        final SearchResult<Log> searchedLogs = logAPI.searchLogs(builder.done());
        for (Log log : searchedLogs.getResult()) {
            // Print the failed connecor reason message:
            System.out.println(log.getMessage());
        }

        // do something for the failed connector instance, skip it:
        processAPI.setConnectorInstanceState(connectorInstance.getId(), ConnectorStateReset.SKIPPED);

        // Retry to execute the activity:
        processAPI.retryTask(failedTaskId);

        // Finally log properly out of Bonita Engine:
        apiClient.logout();
    }
}
```
