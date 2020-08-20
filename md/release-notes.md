# Release notes

::: info
**Note:** The 7.12 is currently work in progress (WIP). The 7.12.0 GA is planned on December 2020.
:::

## New values added
### Development suite multi-maintenance version support
For a given minor version of the development suite (Studio and UI designer), you can now seamlessly work on projects that have a different maintenance version (but the same minor version).
For example: if your Studio is in version 7.12.4. You will be able to work on 7.12.2 or 7.12.5 projects without migrating the project or being blocked.

## Improvements

### Development suite changes
#### Warning before the migration when cloning a project
If you are cloning a repository branch that required migration then you will be informed of the need for migration before it is actually done. This allows you to cancel the operation and change the branch if needed.
### Runtime changes

## Bundle changes

## API Removal

## Technical updates

## Feature deprecations and removals

### Deprecations

### Removals

#### Legacy third party format importers
In Community edition, XPDL and jBPM importers has been removed.  
In Enterprise editon, Visio and Aris importer has been removed.  
Use BPMN 2 importer for model exchange with third party editors.


## Bug fixes
