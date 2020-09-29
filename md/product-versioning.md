# Bonita Versioning
Discover how Bonita manages its product and artifacts versions and how it can impact your projects

## Product Versions

Bonita follows the usual semantic versioning X.Y.z:
* X is the major version number. The major version changes when non-backward compatible changes are implemented
* Y is the minor version number. The minor version changes when backward compatible features are added. A minor version is released every 6 months to improve continuously Bonita
* z being the maintenance version number. The maintenance versions contain fixes. Maintenance versions are released every month between two minor versions for the current minor version. These versions are cross-compatible by default for the same minor version

## Artifact version

In addition to the product version, most artifacts have a model version. This model version is used to determine if the corresponding artifact is compatible with the development suite (Studio & UI Designer).
If the artifacts are not compatible then either the artifact is migrated (when the model version is lower than the development suite version) or you will have to upgrade your development suite to a compatible version.

The following artifacts have model versions:
* Diagrams
* Organization
* Business Data Model
* BDM Access control
* Applications 
* Pages
* Forms
* Fragments
* Layouts
* Customer Widgets

These model versions should not change between maintenance versions of a given minor version (e.g. between a 7.12.5 and a 7.12.3). This means that no migration is needed in production or the studio when changing the maintenance version.

::: info
**Note:** Changing the minor version does not imply that the model version of all artifacts will change
:::

## Version checks in the development suite

### Studio
The Studio will check the model version of every artifact of a given project when cloning or importing it. The artifact model version will also be checked when importing artifacts unitarily. 

The model versions of all artifacts are also checked when deploying a project. Finally, the model version is checked when an artifact is opened.

To check the compatibility of your artifacts manually, you can use the "Validate" action in the project's contextual menu or via the File menu

You will not able to work on incompatible artifacts or deploy them. You will be able if you desire to migrate older artifacts.

### UID

The UID will check the model version of all artifacts when it is launched and when a given artifact is opened. You will not able to work on incompatible artifacts or deploy them. You will be able if you desire to migrate older artifacts.
