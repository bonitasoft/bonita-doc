# Release notes

::: info
**Note:** The 7.13 is currently work in progress (WIP). The 7.13.0 GA is planned on June 2021.
:::

## New values added


## Improvements

### Exception reporting

When something goes wrong while executing processes, we now log only the important informations. In addition the root cause of the issue is the first one shown.

Here is a sample of what will now be logged
```
2021-01-11 17:55:25.551 +0100 WARNING (Bonita-Worker-1-01) org.bonitasoft.engine.work.RetryingWorkExecutorService THREAD_ID=115 | HOSTNAME=Baptistes-MBP | TENANT_ID=1 | Work ExecuteFlowNodeWork: flowNodeInstanceId: 60001 (37, false, false, false) failed. The element will be marked as failed. Exception is: java.lang.ArithmeticException: Division by zero
	wrapped by org.bonitasoft.engine.expression.exception.SExpressionEvaluationException: Groovy script throws an exception of type class java.lang.ArithmeticException with message = Division by zero
Expression : SExpressionImpl [name=aScript, content=1/0, returnType=java.lang.String, dependencies=[], expressionKind=ExpressionKind [interpreter=GROOVY, type=TYPE_READ_ONLY_SCRIPT]]
	wrapped by org.bonitasoft.engine.core.process.instance.api.exceptions.SActivityStateExecutionException: error while updating display name and description
 exception was generated here:	at java.math.BigDecimal.divide(BigDecimal.java:1745)
	at org.codehaus.groovy.runtime.typehandling.BigDecimalMath.divideImpl(BigDecimalMath.java:68)
	at org.codehaus.groovy.runtime.typehandling.IntegerMath.divideImpl(IntegerMath.java:49)
```
A new property `bonita.tenant.work.exceptionsNumberOfFrameToLog` of `bonita-tenant-community-custom.properties` allows the change the number of frame displayed when an exception happens.


### Development suite changes
#### Expression type simplification

### Runtime changes

#### Groovy script results casting

Bonita runtime will automatically try to cast result of groovy script when it differs from the declared return type but when it can be converted.

For example, when a script returns an long and you declared as return type of your expression `java.lang.Integer`,
it was throwing an Invalid return type exception. Now it will cast that result to an integer.

That will make the expression more permissive.
:::info
Groovy is able to cast any object in boolean so scripts that declares a return type `java.lang.Boolean` that failed because of wrong return type will now always 
work and return either `true` or `false`. See [Official Groovy documentation](https://groovy-lang.org/semantics.html#Groovy-Truth) for truthy / falsy values.
:::


#### Logging

default log level for `com.bonitasoft` and `org.bonitasoft` change from `WARNING` to `INFO`

#### Easy upgrade from Community to Subscription

From this release, upgrade from Community to Subscription is made [a lot easier](upgrade-from-community-to-a-subscription-edition.md#bonita-platform-upgrade):
all the tricky configuration part is handled automatically by Bonita Runtime at server startup.

## Technical updates
### Libraries

### Support Matrix


## Feature deprecations and removals

### Deprecations



### Removals


## Bug fixes

### Fixes in Bonita 7.13.0 (2021-06-04)
#### Fixes in Bonita Development Suite (Studio and UI Designer)


#### Fixes in Bonita Runtime (including Portal)
