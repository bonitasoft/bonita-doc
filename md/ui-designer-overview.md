# UI Designer overview

The UI Designer is a graphical development environment for creating pages and forms for a Bonita application. It is a web-based tool that is launched from Bonita Studio.  
A page is defined in HTML extended by the AngularJS JavaScript framework. Use the UI Designer to create and update pages for business applications, forms to start process instances or execute human tasks, and application layouts that apply to all pages of an application.

* Create pages directly in the Bonita UI designer.
* Start form design in Bonita Studio from the appropriate [contract](contracts-and-contexts.md).
* Create [layouts](layouts.md) by duplicating the default layout available in the Bonita Portal resources and then updating it.

You can import an existing page, form, or layout to edit, or duplicate existing ones.

## Page structure

A page (but also a form or a layout) is constructed as a vertical arrangement of rows.  
A row is a mechanism for aligning widgets, from top left to bottom right. When you create a new, empty, page, it contains a row. A row occupies the whole width of the page, which is considered to be 12 units. The actual width is calculated when the page is displayed. The rows are indicated by a thin pale grey rectangle on the left side of the whiteboard. 

To move or delete a row, position your mouse in the row, and the row toolbar is displayed.

![row toolbar](images/images-6_0/row-over.png)

Use the controls in the toolbar to move the row up or down, or to delete it. 

In a row, you can add containers and [widgets](widgets.md).  
Each widget accounts for an item of information to be entered or displayed in a page. To add a widget to a page, drag it from the palette on the left of the screen and drop it into the whiteboard. It must be adjacent to another widget (or to the top of the page for the first widget).  
You cannot leave empty space between widgets. If you try to drop a widget that is not adjacent to another, the drop will fail.  
When the widget is dropped, you need to specify the widget width, up to a maximum of 12 units (default value). 

There is a set of [standard widgets](widgets.md). If these do not meet your needs, you can define a [custom widget](custom-widgets.md).

There are also some structure widgets called containers, which you can use to structure a page. 

There are different types of containers:
* The plain container is invisible to page users. It is useful during page development as a way to manipulate or configure multiple widgets or iterate over elements to display.
* The tab container is used to create tabs in a region of a page. The tabs are visible to page users, who can switch between tabs by clicking the tab name.

Once a container is added to the page, it contains a row. Therefore, widgets can be dropped in a container row or directly on a whiteboard row. In this example, you can see a container with four rows.

![A 4 row container](images/images-6_0/row-normal.png)

The behavior of a page is determined by the widget properties. Any property you configure for a container is applied to all widgets in the container unless you override it with a widget-specific value.

In the Performance, Efficiency, and Teamwork editions, you can also use [fragments](fragments.md), which are groups of widgets. They allow to reuse the same group of widgets with the same behavior in several pages or forms.

The UI Designer generates standard HTML application code, based on AngularJS. Export pages if you want to further customize them in your favorite web development environment. Note that once customized, you can not reimport them in the UI Designer.

## Integration with Bonita Platform

To use a page in a business application, export it from the Bonita UI designer, import it as a portal resource, and from the relevant application, add it to the list of pages and then insert it in a navigation menu.

To use a form in a process, map it in the Bonita Studio to the relevant process or human task. It will be automatically packaged in the .bar archive ready to deploy in the Bonita Portal.

In the Subscription editions, you can [update a form in production](live-update.md), by exporting a new version of the form from the Bonita UI designer, importing it into the relevant process in the portal, and then mapping it to the relevant task or process start event. 

To use a layout in a business application, export it from the Bonita UI designer, import it as a Bonita Portal resource, and map it as the layout of the relevant application.

## UI Designer target users' needed skills

The UI Designer is intended for web developers creating pages and forms that will be part of a BPM application. It requires a good understanding of JavaScript and CSS.  
If you are a business analyst, you can use the UI Designer to create the page structure and define basic behaviors. However, most properties of a page are defined using JavaScript.

## UI Designer with collaboration

Id of Pages or forms who are created in 7.6 older version is an uuid.

With 7.7 version and the improvement of collaboration, the Id of created artifact is now more human readable and understandable. This Id is now equals of the name.
If this id is already exist, a number is suffixed on id (same behavior like OS environment). For example:
* Create a new page and call it "myPageExample".
* Create another page and call it again "myPageExample".

In second creation, when you're redirect on editor, you can see on URL the id of the page. This id is equals to `myPageExample1`.
It's better and good tip to use and unique name for your page.

:::info
However no migration step are done for existing artifacts.
If you want benefit from readable Id for your existing artifact, you need to rename your artifact on homepage or in editor. Link with process in Bonita Studio will be kept.
:::

:::warning
When you rename some artifact and if you use version control, be careful to not lost history of your renaming file. You can see how to keep history in github in "git-log --follow" section.
:::