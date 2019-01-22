# UiPath

This page explains how to configure the UiPath connectors in Bonita Studio.

## UiPath - Add queue item

Add an item in a specific UiPath queue

### Connector settings

Set connection and authentication connector parameters.


|Name|Description|Type|Example|
|---|---|---|---|
|URL|UiPath Orchestrator endpoint url|string|https://demo.uipath.com/|
|Tenant name|Target tenant on the orchestrator|string|Default|
|Username or Email| |string| |
|Password| |password| |

### Queue item definition

Specify information for the new queue item


|Name|Description|Type|Example|
|---|---|---|---|
|Queue name|The name of the queue into which the item will be added.|string| |
|Reference|An optional, user-specified value for queue item identification (128 characters max).|string| |
|Priority|Sets the processing importance for a given item.|choice| High,Normal,Low|
|Defer date|The earliest date and time (ISO-8601 format) at which the item is available for processing. If empty the item can be processed as soon as possible.|string| |
|Due date|The latest date and time (ISO-8601 format) at which the item should be processed. If empty the item can be processed at any given time.|string| |

### Specific content

Key/value pairs containing custom data (complex type will be serialized in a JSON string)


|Name|Description|Type|Example|
|---|---|---|---|
|queueContent|Key,Value|array| |

## UiPath - Get job

Get a UiPath Job status

### Connector settings

Set connection and authentication connector parameters.


|Name|Description|Type|Example|
|---|---|---|---|
|URL|UiPath Orchestrator endpoint url|string|https://demo.uipath.com/|
|Tenant name|Target tenant on the orchestrator|string|Default|
|Username or Email| |string| |
|Password| |password| |
|Job ID|The ID of the job to request.|string| |

## UiPath - Start jobs

Start UiPath jobs

### Connection settings

Set connection and authentication connector parameters.


|Name|Description|Type|Example|
|---|---|---|---|
|URL|UiPath Orchestrator endpoint url|string|https://demo.uipath.com/|
|Tenant name|Target tenant on the orchestrator|string|Default|
|Username or Email| |string| |
|Password| |password| |

### Job configuration

Configure job parameters. 


|Name|Description|Type|Example|
|---|---|---|---|
|Process name|The UiPath process name to execute|string| |
|Process version|If empty, current process release will be used.|string| |
|Strategy|States which robots from the environment are being run by the process.|choice| All,Specific,JobsCount|
|Robot names (if Specific strategy)| |list| |
|Jobs count (if JobsCount strategy)|Number of pending jobs to be created in the environment, for the current process. This number must be greater than 0 only if the start strategy is JobsCount. |integer| |

### Input parameters

Input parameters to be passed to job execution.


|Name|Description|Type|Example|
|---|---|---|---|
|inputArguments|Key,Value|array| |
