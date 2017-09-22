# Release notes
-----
[ to remove at Beta time ]
Don't forget to link your announcement to documentation pages that tell more about them.
We have forgotten that in 7.5
-----
<a id="living-application-development-and-deployment"/>

## Living Application development and deployment


### Industrialization of Living Application (in Studio)

## Performance improvements

### Engine startup and BPM Services resume

A major improvement has been integrated in Bonita 7.6.0, especially for tenants with a lot of processes, processes with large dependencies or processes with a
lot of dependencies

Tests conducted both internally at Bonitasoft and on customer sites with real production data have shown the following decreases
* execution time by a factor of 5 to 10
* JVM Heap memory consumption by a factor of 2 to 3

### Living Application

To be documented


## Technology updates

* The supported Tomcat version for this new release is Tomcat 8.5.16 (included in the bundle).
* The product now supports SQLServer 2016.
* The SQLServer connector has changed, there is now a single connector, that supports sqlserver 2008, 2012, 2014 & 2016.
* The product now supports being run on Ubuntu 16.04.

### Removed support

#### Internet Explorer 11

### Other dependency updates

### API removals

### Configuration changes

#### Removal of the ```platform_init_engine/bonita-platform-init-community.properties``` file

In previous versions, this file should be updated to activate the archive configurability feature (Performance edition).  
The configuration is now easier: the feature is activated by default when using the Performance edition and the file
has been removed.

__Note__: the migration process automatically removes this file from an existing configuration


## Breaking changes
Change method updateGroup() in identityAPI to forbid group name update while new name already exist.

### Forms, pages, layouts CSS cleaned
* Application layout performance improvement. It now allows to navigate between pages without reloading the entire page.  
  See how to [update your custom layout](customize-living-application-layout.md#improve-navigation) to take advantage of this improvement.


## Limitations and known issues

* Process display name is now used everywhere in Bonita portal (when it has been set in the process design) except in the default provided Jasper reports.

## Bug fixes

### Fixes in Bonita 7.6


#### Fixes in Documentation

#### Fixes in Engine component

#### Fixes in Studio component

#### Fixes in Web component


## Bug fixes 

