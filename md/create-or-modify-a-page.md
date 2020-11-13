# UI artifacts in UI Designer

How to create and modify UI artifacts to build powerful applications with Bonita UI Designer.


## Artifacts overview

Design Bonita custom pages, layouts, forms, custom widgets and fragments in UI Designer.

[Custom pages](pages.md) are used in Bonita Portal custom profiles or in custom BPM applications.

[Forms](forms.md) are used to instantiate a process or to execute a human task.

[Fragments](fragments.md) aim at being reused in other pages of your application.

[Widgets](widgets.md) are used or customized to design your page or form


## Design a page, layout, form, or fragment

After a page, layout, form, fragment is created, you can update it in the **Page editor**. Update your page, form or fragment by dragging and dropping widgets from the palette to the whiteboard. Edit widget properties in the widget properties panel, create data, and bind it to the widgets.

You can optimize the page or form design for a given device type by configuring [device-specific values for the Width property](widget-properties.md) for widgets. Use the a device types bar in the Page editor to choose the target device type.
![Device type selection](images/images-6_0/pb-resolution.png)

Custom widget is a special artifact that we will explain in a later chapter.

## Preview a page, layout, form, or fragment

You can preview page, form and fragment rendering by clicking the **_Preview_** button. Another browser window opens with the artifact as it will be displayed after deployment. If you update the page, form or fragment, the preview is automatically refreshed when you save.

You can display your page, layout, form or fragment with one of your theme application installed. 

From the preview window, you can also expand the preview outside of current preview mechanism, with the **Expand Preview in new window** button. This allows you to set new URL parameters, play with dynamic browser sizing, and to reuse same url in another browser to see how your form or page behaves in your user default browser.

You can use the a device types bar on the preview screen to choose the target device type.  
The preview displays the artifact as it would be displayed on the selected type of device.

Custom widget is a special artifact that we will explain in a later chapter.

<a id="export"/>

## Export an artifact

You can export a page or a layout to deploy it in Bonita Portal as a custom page.  
You can export any artifact to import it into another UI Designer.

To export an artifact, click the **_Export_** button ![Export button](images/images-6_0/pb-export.png) on the Page editor or the UI Designer home page. A zip file is downloaded to your computer. It contains a Bonita custom page, which also suitable for import into another UI Designer.

After export you can modify your page or layout code by directly editing the code located in _resources_ folder. Be aware that such a modification to the code will work when the page or layout is deployed in Bonita Portal but it may be broken if you import the page into another UI Designer.

<a id="import"/>

## Import an artifact

To import an artifact from another UI Designer, go to the UI Designer home page and click the **_Import_** button ![Import button](images/images-6_0/pb-import.png). When you import a page, layout, form or fragment, its dependencies (such as custom widgets and fragments used) are automatically be imported too.

Warning: an artifact that has not been designed with the UI Designer cannot be imported into the UI Designer.

## Pages and forms in .bos/.bar file

When you generate the `.bar` file of a process, the mapped forms created with the UI Designer are embedded in the file. Application pages are not embedded. When you deploy the process in Bonita using the `.bar` file, forms are imported and deployed. Pages and layout must be imported one by one.

To import artifacts in another Studio, you can export pages and forms in the process `.bos` file. In the list of artifacts to insert in the .bos file, forms are checked by default, but not pages. When you import this `.bos` file into another Bonita Studio, forms and pages that you have checked are available in the UI Designer of that Studio.
