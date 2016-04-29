# 1.7.2.2 Create or modify a page

The var\_uiDesigner is a powerful application for designing Bonita BPM custom pages and forms.
It runs in a browser. Launching it from Bonita BPM Studio starts a web server and opens your default browser at the UI designer home page.



## Starting the UI designer

### From Bonita BPM Studio menu bar

Open the **Development** menu then choose **Open UI designer**, or click the UI designer icon in the coolbar.


### From a form mapping tab

Select a human task or a pool, go to the **Details** panel, **Execution** tab. Then go to the relevant form mapping tab:

* **_Instantiation form_** for a form to start a process instance
* **_Overview page_** for a process instance overview page
* **_Form_** for a form on a human task

With the form type set to **UI designer**, you can select a form from the dropdown list and click the pencil icon to edit it, or you can choose **Create a new
form**.


## Design a page

After a page is created, you can update it in the **Page editor**. Update your page by dragging and dropping widgets from the palette to the whiteboard. Edit widget properties in
the widget properties panel and create data and bind it to the widgets.


In the Performance and Efficiency editions, you can optimize the page design for a given device type by configuring [device-specific values for the Width property](/widget-properties#widget-width) for widgets.
Use the a device types bar in the Page editor to choose the target device type.
![Device type selection](images/images-6_0/pb-resolution.png)

## Preview a page

You can preview page rendering by clicking the **_Preview_** button. Another browser window opens with the
page as it will be displayed after deployment. If you update the page, the preview is automatically refreshed when you save your page (not available for Internet Explorer 9).



In the Performance and Efficiency editions, you can use the a device types bar on the preview screen to choose the target device type.


The preview presents the page as it would be displayed on the selected type of device.


## Export a page

You can export a page to deploy it in Bonita BPM Portal as a custom page or to import it into another UI designer.


To export a page, click the **_Export_** button ![Export button](images/images-6_0/pb-export.png) on the Page editor or the UI designer home page. A zip file is downloaded
to your computer. It contains a Bonita BPM custom page, which also suitable for import into another UI designer.


After export you can modify your page's code by directly editing the code located in _resources_ folder. Be aware that any modification you make to the code in this way will
be available when page is deployed in Bonita BPM Portal but not if you import the page into another UI designer.


## Import a page

To import a page from another UI designer, go to the UI designer home page and click the **_Import_** button ![Import button](images/images-6_0/pb-import.png). When you
import a page, its dependencies (such as custom widgets and fragments used by the page) are automatically be imported too.

Warning: a custom page that has not been designed with the UI designer cannot be imported into the UI designer.


## Pages in .bos/.bar file

When you generate the `.bar` file of a process, the mapped pages created with the UI designer are embedded in the file. 
When you deploy in Bonita BPM the process using the `.bar` file, the pages are imported and deployed.


In the same way, you can choose to export your pages in the process `.bos` file. When you import this `.bos` file into another Bonita BPM Studio, the pages become available to you in the UI
designer of that Studio.