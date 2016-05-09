# UI Designer overview

The UI Designer is a graphical development environment for creating pages and forms for a Bonita BPM application. It is a web-based tool that is launched from Bonita BPM Studio. A page is defined in HTML extended by the AngularJS JavaScript framework. Use the UI designer to create and update pages for business applications, forms to start process instances or execute human tasks, and application layouts that apply to all pages of an application.

* Create pages directly in the {{var\_uiDesigner}}.
* Start form design in Bonita BPM Studio from the appropriate [contract](contracts-and-contexts.md).
* Create [layouts](layouts.md) by duplicating the default layout available in the Bonita BPM Portal resources and then updating it.

You can import an existing page, form, or layout to edit, or duplicate existing ones.

## Page structure

A page (including a form or a layout) is constructed from [widgets](widgets.md). Each widget corresponds to an item of information to be entered or displayed in a page. In the Performance, Efficiency, and Teamwork editions, you can also use [fragments](fragments.md), which are groups of widgets. There is a set of [standard widgets](widgets.md). If these do not meet your needs, you can define a [custom widget](custom-widgets.md). In the Subscription editions, you can create [fragments](fragments.md) to reuse the same group of widgets with the same behavior in several pages or forms.

There are also some structure widgets called containers, which you can use to structure a page. There are different types of container:

* A regular container is invisible to page users. It is useful during page development as a way to manipulate or configure multiple widgets or iterate over elements to display.
* A tab container is used to create tabs in a region of a page. The tabs are visible to page users, who can switch between tabs by clicking the tab name.

To add a widget to a page, drag it from the palette on the left of the screen and drop it in the whiteboard. You can drop a widget in a container or directly on the whiteboard. It must be adjacent to another widget (or to the top of the page for the first widget). You cannot leave empty space between widgets. If you try to drop a widget that is not adjacent to another, the drop will fail.

The behavior of a page is determined by the widget properties. Any property you configure for a container is applied to all widgets in the container unless you override it with a widget-specific value.

The UI Designer generates standard HTML application code, based on AngularJS. Export pages if you want to further customize them in your favorite web development environment. 

## Integration with Bonita BPM Platform

To use a page in a business application, export it from the {{var\_uiDesigner}}, import it as a portal resource, and from the relevant application, add it to the list of pages and then insert it in a navigation menu.

To use a form in a process, map it in the Bonita BPM Studio to the relevant process or human task. It will be automatically packaged in the .bar archive ready to deploy in the Bonita BPM Portal.

In the Subscription editions, you can [update a form in production](live-update.md), by exporting a new version of the form from the {{var\_uiDesigner}}, importing it into the relevant process in the portal, and then mapping it to the relevant task or process start event. 

To use a layout in a business application, export it from the {{var\_uiDesigner}}, import it as a Bonita BPM Portal resource, and map it as the layout of the relevant application.

## UI Designer user profile

The UI Designer is intended for web developers creating pages and forms that will be part of a BPMN application. It requires a good understanding of JavaScript and CSS. If you are a business analyst, you can use the UI Designer to create the page structure and define basic behaviors. However, most properties of a page are defined using JavaScript.
