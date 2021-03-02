# Import/export an organization

Logged on with the Administrator profile, you have rights to import or export an organization.

## How to import an organization

**Caution:**
This will import a file containing your whole organization data. This organization data will be merged with existing data.
In case of conflict, the priority is given to the data in the imported file. Take care not to overwrite information that has been updated in Bonita Portal.

**Note:**
In 6.3 there was a change to the structure of the .xml file. This means that you cannot import into Bonita Portal 6.3.0 or later an organization .xml file that was created in 6.2.x or earlier.
You will need to first import the organization file into Bonita Studio and re-export it, so it is compatible.

To import an organization in .xml format, that has already been exported from Bonita Studio, containing your whole organization data.

Be careful, your organization will be merged with existing data.

1. Go to Organization > Import/Export.
2. Click _**Click here to choose your file**_. The xml file will be displayed in the import file field.
3. Click _**Import**_.
4. Click _**Save**_.

## How to export an organization

1. Go to Organization > Import/Export.
2. Click _**Export**_.

This will export an organization from Bonita Portal. Users, groups and roles will be exported in a file in .xml format.

See the [video](images/videos-6_0/import_an_organization_into_bonita_portal.mp4).
