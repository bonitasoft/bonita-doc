# Manage the Bonita Portal Look & Feel

The Look & Feel defines the appearance of Bonita Portal Web interface and the Bonita Portal Mobile interface. Discover how to customize it.

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

A Look & Feel is not used to specify Application layout and theme. To modify Application layout and theme, see [Specifying application layout](applications.md) and [Specifying application theme](applications.md)

## Import and apply a new Look & Feel

The Bonita Portal Web interface and the Bonita Portal Mobile interface each have a Look & Feel, which is defined in a set of files in a zip archive.
You can [create a new Look & Feel](creating-a-new-look-feel.md) for one of these items. When you have created the new Look & Feel, you apply it using Bonita Portal, as follows:

1. Log into Bonita Portal as Administrator.
2. Go to the **Configuration** menu and choose **Look & Feel**.
3. In Filters list on the left, choose the item for which you have a new Look & Feel: **Web Portal** or **Mobile Portal**.
4. In the **Import and apply a new Look & Feel** zone, use the file chooser to specify the zip file containing the new Look & Feel, and then click **_Apply_**.
5. The new Look & Feel is imported and applied instantly.

## Export the current Look & Feel

You can export the current Look & Feel to modify it or to import it into other Bonita Portals.
Exporting the Look & Feel creates a zip archive containing the files that make up the Look & Feel definition.
It has no effect on the Look & Feel currently being used.

To export the current Look & Feel:

1. Log into Bonita Portal as Administrator.
2. Go to the **Configuration** menu and choose **Look & Feel**.
3. In Filters list on the left, choose the item for which you want to export the Look & Feel: **Web Portal** or **Mobile Portal**.
4. In the **Export the current Look & Feel** zone, click **_Export_**.
5. In the pop-up, specify the zip archive name and location and click **_OK_**. The Look & Feel is exported into a zip archive with the name and location you specified.

## Export the default Look & Feel

You can export the default Look & Feel to use it as the starting point for creating your own Look & Feel. Exporting the Look & Feel creates a zip archive containing the files that make up the Look & Feel definition.
You can always export the default Look & Feel, even if a customized Look & feel is currently in use.

To export the default Look & Feel:

1. Log into Bonita Portal as Administrator.
2. Go to the **Configuration** menu and choose **Look & Feel**.
3. In Filters list on the left, choose the item for which you want to export the default Look & Feel: **Web Portal** or **Mobile Portal**.
4. In the **Export the default Look & Feel** zone, click **_Export_**.
5. In the pop-up, specify the zip archive name and location and click **_OK_**. The default Look & Feel is exported into a zip archive with the name and location you specified.

## Restore the default Look & Feel

Restoring the default Look & Feel replaces the Look & Feel that is currently in use with the default Look & Feel provided with Bonita.

Warning: restoring the default Look & Feel overwrites the current Look & Feel. If you want to keep a copy of the current Look & Feel, export it into a .zip archive before you restore the default.

To restore the default Look & Feel:

1. Log into Bonita Portal as Administrator.
2. Go to the **Configuration** menu and choose **Look & Feel**.
3. In Filters list on the left, choose the item for which you want to restore the default Look & Feel: **Web Portal** or **Mobile Portal**.
4. In the **Restore the default Look & Feel** zone, click **_Restore_**.
5. The default Look & Feel is restored.

If you have a REST client in your browser (for example a plugin for Chrome or Firefox), you can restore the default Look & Feel using the Web REST API.
This is useful if you have accidentally loaded a Look & Feel that contains errors and the **Restore** button is not usable. To restore the Look & Feel using a REST client:

1. Use the REST client to [log in](rest-api-overview.md) as a registered user of the Engine.
2. Create a PUT request of the form `http://localhost:8080/bonita/API/portal/theme/default`, specifying the relevant hostname and port number.
3. In the request body, specify `{"type":"portal"}` to restore the web Look & Feel, or
   `{"type":"mobile"}` to restore the mobile Look & Feel.
4. Send the request. This will restore the default Look & Feel.

The next time you load a Portal page, the default Look & Feel is used.

![An example of how to use a REST client in a browser to restore the default Look & Feel](images/images-6_0/restoreThemeAPI.png)

Restoring the default Look & Feel with a REST client

It is also possible to [restore the default Look & Feel using the Bonita Engine API](restore-default-look-feel.md).
