# Bonita Versioning

## Product Versions

Bonita follows the usual semantic versioning X.Y.z:
* X being the major version number. The major version changes when non-backward compatible changes are implemented
* Y being the minor version number. The minor version changes when backward compatible features are added. A minor version is released every 6 month to improve continuously Bonita
* z being hte maintenance version number. Maintenances version contain fixes. Maintenance versions are released every month between two minor version for the current minor version.

## Artifact version

In addition to the product version each artifact has model version. This model version is used to determine if the corresponding artifact is compatible with the development suite (Studio & UI Designer).
If the artifact are not compatible then either the artifact is migrated (when the model version lower than development suite version) or you will have to upgrade your develoment suite.

The following artifacts have model versions:
* Diagrams
* Organization
* Business Data Model
* Applications
* Pages
* Forms
* Layouts
* Customer Widgets

These model version should not change between maintenance versions of a given minor version (e.g. between a 7.12.5 and a 7.12.3). This means that no migration are needed in production or in the studio when changing the maintenance version.

::: info
**Note:** Changing the minor version does not imply that the model version all artifacts will change
:::
