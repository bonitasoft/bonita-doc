# Custom profiles

::: info
**Note:** For Performance and Efficiency editions only.
:::

In Bonita BPM Portal, you can customize profiles. To be able to do any customization of a profile, you must be using the **Administrator** profile or a custom profile with access to the profile management page.

What customization can I do?

## Create a custom profile

1. In the Bonita BPM Portal, in the navigation bar, click the **Organization** menu.
2. Click **Profiles**.
3. Click _**Add**_.
4. In the popup, select **Create a profile**.
5. Enter the Name.
6. Enter the Description (optional).
7. Click **_Create_**.
8. Refresh the portal webpage.
9. The new profile will appear in the Profiles menu.

For deployment, it is also possible to [import a profile](deploying-profiles-with-export-and-import.md) by importing an XML file containing the profile definition and mapping to organization and pages.

## Delete custom profile

**Note:** You will need to check the box to make the delete button available.

Select the profile to delete, and click the **delete button**.

## Edit a custom profile

1. In the Bonita BPM Portal, in the navigation bar, click the **Organization** menu.
2. Click **Profiles**.
3. Click _**More**_.
4. Click _**Edit**_.
5. Change the name or the description of the custom profile
6. Click _**Save**_.

## Map a profile to users or groups, membership or role

1. In the Bonita BPM Portal, in the navigation bar, click the **Organization** menu.
2. Click **Profiles**.
3. Choose a profile. This will display the users mapped to the selected profile.
4. Click _**More**_.
5. Click _**Add a user**_.
6. Select a user by ticking the checkbox next to the user name.
7. Click _**Add**_.

Do the same steps to map a group, role or membership.

## Create a custom navigation bar

A custom navigation bar can be created for each custom profile created.

**Note:** The navigation bar will not be used by applications as they have their own navigation menu.

1. Select profile to add the new menu to
2. Click on _**More**_
3. This will display the **Navigation bar editor**
4. Click _Create menu_.

Here, you will see 3 columns: a check box, a display name and a description.
5. Check the boxes to select the pages to include in the new menu.

You can select from the Default pages that are provided with the standard portal and from [Custom pages](pages.md).
6. Click _**Create**_ to confirm your choice of pages and create the menu.

When you select the custom profile, the navigation bar will be applied to it.

Note: Click _**Reset**_ to erase the navigation bar if required.

**Note:** The navigation bar is designed to be displayed as a single line. If your menu is too long, use menus with several menu entries in them.

When a user logs in with a profile, the page displayed is the first option in the first menu from the left.
