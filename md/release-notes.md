## Breaking changes

### UI Designer
- *Removed ui-bootstrap.js from runtime:* Due to a bad design, form, pages and layout designed with the UI Designer
 previously embed [UI Bootstrap js, version 0.13.4](http://angular-ui.github.io/bootstrap/versioned-docs/0.13.4/).
 This allowed to create a custom widget using this library without adding explicitly UI Bootstrap js has an asset of 
 this widget and without declaring required modules.
 
 We encourage you to verify that your custom widgets that uses UI Bootstrap js are corectly declaring the expected 
 javascript asset.
 
 Please note that this will not affect any artifact that has been created with UI Designer and currently deployed by 
 any way in Bonita BPM Portal.

