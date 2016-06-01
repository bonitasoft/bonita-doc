# Search keys

::: info
**Note:** For Performance and Efficiency editions only.
:::

The search field in Bonita BPM Portal can be used to search for particular values in cases, filter them, and display the result.

Note: the search in Bonita BPM Portal is dependent on the search keys configured in Bonita BPM Studio. If nothing has been entered as a value for the task during the design of the process, then no results come up.

## How to get results from the search in Bonita BPM Portal

Only cases which have been given values will be filtered.

Technical note: A search key is translated by a database index in Bonita BPM Engine. Currently, when designing in Bonita BPM Studio, you cannot create more than 5 keys/indexes per process.

In addition, search keys are now displayed in the case list and in the case more details view. In this way, you can use search keys for adding dynamic and business information to your cases.

See also [Define a search key](define-a-search-index.md).
