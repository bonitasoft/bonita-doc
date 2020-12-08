# Release notes

::: info
**Note:** The 7.13 is currently work in progress (WIP). The 7.13.0 GA is planned on June 2021.
:::

## New values added


## Improvements


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
