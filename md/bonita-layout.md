# Bonita Layout

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

This layout has different desktop and mobile versions.  

For the desktop version, the layout contains two rows.  
The first row has the logo, the name of the application on the left, as well as the user name, which, when clicked, 
opens the information about the current session. The last button of the first row opens a window that will let you 
switch between living applications.  
The second row contains the menu of the application pages.  

For the mobile version there is only one row that has the name of the application, as well as a button that opens a 
dropdown. The dropdown will contain the menu of the application pages, the user name which, when clicked, opens the 
information about the current session, as well as the button that opens the navigation between applications.

## Customizing this layout

You can customize this layout by following the [customize-layouts](customize-layouts.md) steps.

## Dependencies

### Adding a logo to the layout

The first option is changing the theme that is used by the application by adding a`logo.png` file in the 
`resources/images/` folder. If the folder does not exist, create it manually.  
The second option is adding an image asset to the layout in UI Designer, and using this asset directly in the URL 
property of the image widget.

## Migration notes

### Migrating from version 7.9.1 - 7.9.X

In these versions, the provided themes were embedding font-awesome. The library was removed in favor of adding the webfonts directly in the layout. If your layout and your pages were using the fonts provided in the theme, either :
* create a custom theme out of the provided theme and add the font-awesome library (as explained in the 7.9 version of this page)
* add the font-awesome webfonts to your pages
