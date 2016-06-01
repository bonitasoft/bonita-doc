# Create a new Look & Feel

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

A Look & Feel is defined in a set of files. You can set the Look & Feel for the Bonita BPM Portal Web interface, an application, a custom page, or for the Bonita BPM Portal Mobile interface. 

This page explains how to modify the Look & Feel of Bonita BPM Portal and of forms in processes run from the Portal.

## Introduction

To create a new Look & Feel in Bonita BPM Portal, [export the default Look & Feel](managing-look-feel.md) and modify the relevant components. 
You can either edit the files directly, or you can use a plugin and update the Look & Feel in a browser. 
When the new Look & Feel is ready, [import and apply the new Look & Feel](managing-look-feel.md).

There are two types of page in the Portal: pages developed with GWT, as in earlier versions, and new pages, such as the Case monitoring page, that have been developed using Angular. 
The two types of page have different mechanisms for defining Look & Feel.
This means that in some cases, you might need to specify a Look & Feel element in two places to get a consistent look for your Portal and custom pages.

For GWT pages, the most critical file in the Look & Feel definition is `skin/skin.config.less` file. 
Any change you make to this file is automatically implemented in all the pages of the Portal or forms that do not use the Bootstrap Look & Feel, so this is where we recommend that you make all changes, if possible. 
For example: 

* To change the color of the menu bar, edit `skin/skin.config.less` and update the setting of `@mainAccentColor` to replace the default red (\#b20706;) with the hexadecimal code for your preferred color. 
As an example, this file contains a line that you can uncomment to set the color to blue.
* To change the font, edit `skin/skin.config.less` and update the setting of `@skinFont` to specify the font you want to use.
* To replace the BonitaSoft logo with your own logo, create a transparent .PNG file with your logo and put it in the `skin/images` directory. 
Then edit `skin/skin.config.less`, and replace `logo.png` with your logo file. If your logo is not the same size as the default BonitaSoft logo, edit the `loginPage-logo-width:`
and `loginPage-logo-height:` properties and specify the correct width and height.

For pages developed in Angular, the Look & Feel is defined using [Bootstrap](http://getbootstrap.com/). To modify the Look & Feel, update the skin definition in 
`skin\bootstrap\portal` for Portal pages or in `skin\bootstrap\applications ` for applications.

There are five key files that must be present in the zip archive when you import a Look & Feel:

* `BonitaConsole.html`: HTML entry page for Bonita BPM Portal. If you want to add a custom JavaScript or custom CSS, modify this file and add it to the header.
* `BonitaForm.html`: HTML entry page for forms in Bonita BPM Portal. If you want to add a custom JavaScript or custom CSS, modify this file and add it to the header.
* `main.less`: Used to compile the LESS files into the CSS used for the GWT pages in the Portal. You must not rename this file, and we recommend that you do not change it.
* `skin\bootstrap\applications\main.less`: Used to compile the LESS files into the CSS used for applications. 
* `skin\bootstrap\portal\main.less`: Used to compile the LESS files into the CSS used for Portal pages developed in Angular.

If you change any other file, you must test that the change has the required effect.

If you have applied a custom Look & Feel in an earlier version, when you migrate to this version, the Look & Feel is automatically migrated to the new structure for both GWT and Angular pages. 
If you want to see how your custom Look & Feel is defined in this version, export the Look & Feel before and after migration and compare the zip files.

Note: To provide you the best flexibility and adaptability, we do not run any security tests on the imported Look & Feel theme, so you must make sure that you
do not upload any malicious or vulnerable code. If you wish to learn more about web security and the most common web vulnerabilities, see the [OWASP site](http://www.owasp.org/).

The tables below show the directories and the most important files that are present in the Look & Feel definition.

## Bonita BPM Portal Web default Look & Feel
Component
Description

BonitaConsole.html
HTML entry page for Bonita BPM Portal. If you want to add a custom JavaScript or custom CSS, modify this file and add it to the header.

BonitaForm.html
HTML entry page for forms in Bonita BPM Portal. If you want to add a custom JavaScript or custom CSS, modify this file and add it to the header.

bonita\_ie8.css Specific CSS content for Internet Explorer 8 support.

main.less
Used to compile the LESS files into CSS. You must not rename this file, and we recommend that you do not change it.

css
Directory containing default CSS files used by the process forms.

css/bonita\_forms.css
Default CSS for process forms.

css/footer.css
CSS for footers in process forms.

images Directory of images. These images are the size needed for the standard layout. 
If you change the layout, you might need to adjust the images sizes. 
If you want to use an image that is a different size, you might need to modify the layout.

init/reset.less
For browser compatibility, do not change.

PIE.htc
Functions required for some CSS features to work in Internet Explorer.

scripts
Directory of scripts, including JQuery scripts. 

skin
Contains LESS files and directories for fonts and images used in the skin.

skin/bootstrap/applications
Customizations to Bootstrap for applications.
Change these files to modify the appearance of application pages.

skin/bootstrap/applications/main.less
The entry point that identifies the files to be compiled to create the Bootstrap Look & Feel for applications.

skin/bootstrap/portal
Customizations to Bootstrap for the Portal.
Change these files to modify the appearance of Portal pages.

skin/bootstrap/portal/main.less
The entry point that identifies the files to be compiled to create the Bootstrap Look & Feel for Portal pages developed with Angular.

skin/skin.config.less
The main LESS file that defines the appearance.
Change this file to modify the appearance of Bonita BPM Portal web `<not mobile>`. You only need to modify the other LESS files if you want to change the behaviour of the pages.

tools
Contains special files required for compatibility with Internet Explorer. 

VERSION
Contains the version flag. Do not update or delete this file. 

## Bonita BPM Portal Mobile default Look & Feel
Component
Description

css
Directory containing CSS files.

css/jquery.mobile.structure-1.2.0.min.css
JQuery Mobile default CSS.

css/style.css
JQuery Mobile default theme CSS.

img
Directory of images. These images are the size needed for the standard layout. 
If you change the layout, you might need to adjust the images sizes. 
If you want to use an image that is a different size, you might need to modify the layout.

themes
Directory containing CSS files overriding the JQuery files (theme for Bonita mobile).

themes/images
Directory of images used in the themes.

themes/bonitasoft.css
Theme CSS.

themes/bonitasoft.min.css
Minified theme CSS.

## Recommendation: Form footers

There are sometimes problems with the appearance of form footers after migration. If this is the case, update the `moredetails.less` file of the Look & Feel to include the following definition:
`
#formframe, .forms-view, .forms-view .frame {
  height: 100%;
  width: 100%;
}

.forms-view .toolbar {
  margin: 30px 0 40px 0;
  padding: 0 35px 0 40px;
}

.forms-view .toolbar.empty {
  margin: 0;
  padding: 0;
}

.page_performTask .body, .page_StartProcess .body, .page_DisplayCaseForm .body {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
  display: block !important;
  overflow: hidden;
}
`

With this definition, the form footer is displayed instead of the Portal footer, and the form's iframe is now contained in a table row. This is recommended for easier maintenance and to avoid issues at future migrations.
