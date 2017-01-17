## Breaking changes

### UI Designer
- *ui-bootstrap.js library has been removed from runtime*: in our first design iteration, forms, pages and layouts designed with the UI Designer embedded [UI Bootstrap js, version 0.13.4](http://angular-ui.github.io/bootstrap/versioned-docs/0.13.4/) by default and silently, even when not needed. We have removed it so you can use it only when you need it, and with the version you choose. 
 
 This will not affect any artifact that has been created with the UI Designer and is currently deployed in Bonita BPM Platform.
 
 Only in the case you have created custom widgets using this silent library, you need to update them by adding UI Bootstrap js as an asset.

