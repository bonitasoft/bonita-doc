# Release notes

Bonita BPM 7.5 includes a set of user-based product enhancements, bug fixes and important technology updates.


<a id="technology-updates"/>

## Technology updates

- httpclient is updated to httpclient 4.5.2
- httpcore is updated to httpcore 4.4.4

### UI Designer
- *ui-bootstrap.js library has been removed from runtime*: in our first design iteration, forms, pages and layouts designed with the UI Designer embedded [UI Bootstrap js, version 0.13.4](http://angular-ui.github.io/bootstrap/versioned-docs/0.13.4/) by default and silently, even when not needed. We have removed it so you can use it only when you need it, and with the version you choose. 

 This will not affect any artifact that has been created with the UI Designer and is currently deployed in Bonita BPM Platform.

 Only in the case you have created custom widgets using this silent library, you need to update them by adding UI Bootstrap js as an asset.


### Full Java 8 support
Bonita BPM 7.5.0+ is now fully Java 8 compliant.  
Java 8 syntax and specific APIs can now be fully used in all Bonita BPM [extensions points](software-extensibility.md#stable_extension_points)  
As a consequence, JRE or JDK 8+ is required to run. Bonita BPM 7.5.0+ cannot be operated on Java 1.7 anymore.

### Removed support for Oracle Weblogic application server
Bonita BPM 7.5.0+ does not support Oracle Weblogic application server anymore.  
Refer to [full software requirements](hardware-and-software-requirements.md) for more details on supported environments.

### Other updates
* Hibernate has been updated from version 4.2.13 to 4.3.11, to support JPA 2.1 specification


## API updates

### API removals
Engine APIs have been cleaned up from some deprecated methods:
* ProcessAPI.addComment() - replacement method is [ProcessAPI.addProcessComment()](http://documentation.bonitasoft.com/javadoc/api/${varVersion}/org/bonitasoft/engine/api/ProcessRuntimeAPI.html#addProcessComment-long-java.lang.String-)
