# Connectors execution

## What are connectors

Connectors are extension points that can be added to a process to extend Bonita Runtime capabilities. They are a piece of code having inputs defined as `Expressions` and outputs defined as `Operations`.

## Execution mechanism


### Diagram of the execution

Connectors execution are triggered by a `Work` and are executed in their own thread pool.

![Connector execution](images/connector_execution.png)


### Connector timeout

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

A timeout can be configured to cancel the connector execution if it takes more than a certain amount of time.

The timeout will try to interrupt the thread executing the connector. 
If the code executing in the thread cannot be interrupted, the thread will not stop.
In practice, it means that in this case, the connector will timeout, releasing the execution of the task that called it, but the connector executor will still try to finish executing the connector's code, and will not be available to execute another connector.
A typical example of this is if the custom code in a groovy connector falls into an infinite loop : the connector will timeout, but the connector executor will be running forever.


![Connector execution with t imeout](images/connector_execution_timeout.png)

## Configuration

The size of the pool to execute connector and the timeout can be configured as described in [Connector service performance tunning page](performance-tunning.ms#connector_service)
