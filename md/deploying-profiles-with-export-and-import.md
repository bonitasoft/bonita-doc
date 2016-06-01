# Deploy profiles with export and import

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

Deploying a profile means exporting it from one portal and importing it into another. This is useful when you have finished testing profiles and custom pages in a limited environment and are ready to go to production.

When you export a profile, it includes the following:

* The profile definition (name and description).
* The mapping of the profile to the organization. This defines the users, groups, roles, and memberships that have the profile.
* The mapping of the profile to pages. This defines the pages that someone who is using this profile can see in the portal. 
A custom profile can include standard pages and custom pages.
You cannot change the mapping of a standard profile to pages.

You can export and import the default profiles that are provided as standard in Bonita BPM, as a way to export and import the mapping of those profiles to elements in the organization.

By default, the profile export and import features are available in the Administrator profile. They can also be available in a custom profile.

## Export profiles

To export profiles:

1. Go to the **Organization** menu and choose **Profiles**.
2. In the list of profiles, check the boxes to select the profiles you want to export. You can only select profiles in your current view of the profile list, not from other pages of the list.
3. Click **_Export_**.
4. A popup confirms the number of profiles that will be exported. Click **_Export_** to continue and export these profiles.

An XML file, `Profile_Data.xml`, is exported.

## Import profiles

When you import a profile, you import the mapping of the profile to the organization and to pages. For the import to be successful, the organization and any custom pages must already be loaded. 
If you are setting up a new production environment by importing all the data, import it in the following order:

* organization
* custom pages
* profiles

To import profiles:

1. Go to the **Organization** menu and choose **Profiles**.
2. Click **_Add_**.
3. In the popup, select **Import profiles**.
4. Specify the `Profile_Data.xml` file to upload.
5. Click **_Import_**.

The file is imported and checked. 
A popup reports the status of the import. It shows the number of profiles successfully imported, partially imported, or with errors. 

Notes:

* A Process manager profile does not include the list of apps assigned to a given process manager. After the Process manager profile is imported, you need to [assign a process manager to an app](process-manager.md).
* The standard profiles defined in Bonita BPM have the flag _isDefault_ set to _True_ in the XML file. Do not change the setting of _isDefault_ for any profile, or you will get an error message on import.
