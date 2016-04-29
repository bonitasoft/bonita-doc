# 1.7.2.3 Widgets

The UI designer is a tool for creating pages and forms for use in a BPM application. 
A form is mapped to process instantiation or to a human task and must fulfill a [contract](contracts-and-contexts.md). 
A page is not mapped to any part of a process. 
There is real no difference between a page and a form, so the procedure for designing them is the same. 
Typically, a form has input fields and a submit button, though these can also be present in a page. This documentation uses the term _page_ for both pages and forms, unless otherwise stated.

**[Page structure](#page-structure)**

**[Containers](#containers-widgets)**

> [Adding a widget to a row](#adding-components-to-a-row)

> [Adding a row](#adding-rows)

> [Repeat content](#repeat-contents)

> [Save as fragment](#save-as-fragment)

> [Tab container widget](#tab-container-widget)

> [Form container widget](#form-container-widget)

**[Text widgets](#text-widget)**

**[Input widgets](#input-widgets)**

> [Text input widget](#input-widget)

> [Select widget](#select-widget)

> [Autocomplete widget](#autocomplete-widget)

> [Datepicker widget](#datepicker-widget)

> [Radio button widget](#radio-widget)

> [Checklist widget](#checklist-widget)

> [Checkbox widget](#checkbox-widget)

> [Button widget](#button-widget)

> [File upload widget](#upload-widget)

**[Table widget](#table-widget)**

**[Image widget](#image-widget)**

**[Data table widget](#datatable-widget)**

**[Chart widget](#chart-widget)**

## Page structure

A page consists of widgets that are arranged in containers and rows. The UI designer provides a set of default widgets that you can use to design a page.
The default widgets are available from the palette panel, which is on the left side of the Page editor. A widget has properties that control how it appears and how it is used. There are some general properties that all widgets have, and some properties that are specific to the widget type. 
You can also create [custom widgets](custom-widgets.md).

Each widget in the palette has a description. To show a widget description, just roll over the top right corner of the widget in the widget palette.

A container is a widget that contains other widgets. You can have nested containers. A typical use for containers is to control the main layout of your page. For example, if you want to create a two-column layout, you will start your page by adding two containers on the same row, each one spanning six columns of the page. A page does not need to have a container, but it is useful.

A row is a mechanism for aligning widgets across a page or a container. When you create a new, empty, page, it contains a row. If you add a container to the page, it contains a row.
A row occupies the whole width of the page or container it is inside, which is considered to be 12 units. When you add a widget to a row, you specify the widget width, up to a maximum of 12 units. The actual width is calculated when the page is displayed.

## Containers

A container widget is used to hold other widgets. By default, a container has one row, where you can drop component widgets. You can use containers to control the layout of a page. 
For example, you can create a two-column layout by placing two containers side by side in a row. 
You can also make the page layout dynamic by [repeating a container to display a collection of data](repeat-a-container-for-a-collection-of-data.md).

### Adding a widget to a row

If the row has some space at the end, the widget will fill the remaining empty space in the row. If the row has no empty space, the dropped component will be automatically resized to fit a row width, creating a new row.

### Adding a row

According your needs, a container can have any number of rows. 

To add a widget in a new row, a container has two dropzones where you can drop a widget from the palette. These dropzones are situated at the top of the container and at the bottom of the container. When your mouse is over the upper or lower border of a widget in a row, the dropzone becomes visible, as shown in these examples: 

Example 1: add a title widget in a new row above a paragraph widget:
![drop at the top](images/images-6_0/create-row-top.png)

Example 2: add a paragraph widget in a new row below a title widget:
![drop at the bottom](images/images-6_0/create-row-bottom.png)

When you drop a widget in one of these two zones, a new row is automatically created.

The rows of a container are indicated by a thin pale grey rectangle on the left side within the container. A row is always the full width of the page. In this example, you can see a container with four rows.
![A 4 row container](images/images-6_0/row-normal.png)

To move or delete a row, position your mouse in the row, and the row toolbar is displayed.
![row toolbar](images/images-6_0/row-over.png)
Use the controls in the toolbar to move the row up or down, or to delete it. 

### Repeat content

A container can repeat the content dynamically. This is useful if you need to repeat a set of components for each element in a data collection. Bind the **Repeat content** property to an array variable. To specify the current element of the collection, use `$item`. This is useful if you want to display some property of the current element.

### Save as fragment

If you are using the Performance, Efficiency, or Teamwork edition, you can save any container as a fragment. This enables you to reuse the set of widgets in other pages.

### Tab container widget

Use the **tab container** to structure a page using tabs. To edit a tab name, select the corresponding tab to display its properties.
Each tab is a container widget.

### Form container widget

Use the **form container** to enable form validation for input widgets. The form container also exposes a local **$form** which is the AngularJS form object associated to the form container.

For example, you can bind the button's disabled property to _$form.$invalid_ to prevent user from clicking the button, until the form inputs are valid.

## Text widgets

Use a text widget for information that is displayed on a page. This includes titles, paragraphs, and lists. For each, you can specify the text and its alignment. There are several types of text widget:

* Link, for embedding an HTML link for navigation to an external site.
* Title, for headings. You can set the level from 1 to 6\.
* Text, for chunks of text. Text supports basic HTML tags such a paragraph, list or image...

## Input widgets

Use an input widget to enable a user to provide input. In addition to the general widget properties, all input widgets have the following:

* A Required property which prevents button from being clicked when put inside a form container
* A Read-only/disabled property which prevents the user from modifying the value
* A Label (which can be hidden)
* A property to specify whether input is mandatory
* A Value property that is used to capture the value entered by the user.

The sections below describe the available input widgets.

### Text input widget

Use the text input widget an input field on a page. There are four types of input:

* text: a free-form text field
* email: an email address
* number: a decimal or integer number
* password: like text but each character is replaced by an asterisk.

### Select widget

Use a select widget to offer the user a drop-down list of values. The user selects the required value.
The **available values** property is used to populate the list of available values. Alternatively for simple data, you can provide a comma-separated list of values (for example, red, green, blue).
You can also use data binding and specify a variable to populate the list of available values. In this case, specify a label key, which identifies the attribute to be displayed in the widget.

### Autocomplete widget

Use an autocomplete widget to offer the user a list of possible values based on data entered in the field. For example, in a firstName field, if the user types _chri_, the values _chris_, _christine_, _christian_, _christiane_ are proposed. The user selects the correct value. To define the **available values**, bind a data source to initialize the suggestions. For suggestions that are an array of objects, you can specify a **displayed key** to identify the attribute to show as a suggestion in the widget. The value must be bound to a variable that will hold the selected suggestion.

### Datepicker widget

Use a datepicker widget to display a calendar from which the user can select a date. You can configure the displayed **date format** using a pattern, using `yyyy` for year, `MM` for Month, `dd` for day, `mm` for minutes.

You can force the timezone to 0 using the relevant property.

For more information about supported formats, read the Angular documentation for [date filter](https://docs.angularjs.org/api/ng/filter/date).

### Radio button widget

Use a radio button widget to create a set of radio buttons for the available values, from which the user picks one value. 
To define the **available values**, you can provide a comma-separated list for simple values (for example: red, green, blue), or bind to a variable that holds an array of values.
If the values are JavaScript objects, you can also specify a **displayed key** that identifies the attribute to be used to label the radio buttons
and a **returned key** so **selected value** will return only a specific key rather that the whole corresponding object.

The selected value should be bound to a variable that will hold the data for the chosen radio button.

### Checkbox widget

Use a checkbox widget to create a unique checkbox. The value property will be true or false, depending on the checked value of the checkbox.

### Checklist widget

Use a checklist widget to create a set of checkboxes for the available values, from which the users picks any number of values. To define the **available values**, you can provide a comma-separated list for simple values (for example: red, green, blue), or bind to a variable that holds an array of values.
If the values are JavaScript objects, you can also specify a **displayed key** that identifies the attribute to be used to label the checkboxes 
and a **returned key** so **selected value** will return only a specific key rather that the whole corresponding object.

The selected values are captured through the **Selected values** property.

**Warning:** Do not bind the **Selected values** property to a specific item from the available values collection because selected values will be updated each time you modify a checkbox. Do not bind the Selected values to the Available values collection, because this could lead to unexpected behaviors.

### Button widget

Use a button widget to enable to user to trigger an action. The button can perform a `PUT`, `POST`, `GET` (from 7.1.3), or `DELETE` (from 7.1.3) request and send data to a given URL. 
You can use a variable to hold the resulting data after success or failure.

For pages that are displayed in a task or process context, the button widget can be used to submit a form, completing the human task or starting a process instance. For form submission, you need to define only the data to send. The URL is extracted from the context.

Finally, you can use the widget button to add or remove a data from a given collection.

When inside a form container, the button is automatically disabled while the form is invalid.

### File upload widget

Use an upload widget to perform a file upload (POST) on the specified **URL**. Data returned by the server is stored in the **value** property.

## Table widget

Use a table widget to display data in a table. In order to display the data, first define the **headers** property with a comma-separated list of column headings.

Then bind the **content** to an array of JavaScript objects.

Finally, provide a comma-separated list for the **columns keys** indicating the attribute to display in each column.

To get the data from a selected row, bind **selected row** to a variable.

Note: table widget only supports text values. HTML content passed in table data will not be rendered.

## Image widget

Use an image widget to display an image. The image widget is able to display images from local assets or an image from a URL:

* To use an image asset in the image widget, set the **Source type** property to _Asset_, and then enter the image name in the **Asset name** input field.
* 
To use an online image in the image widget, set the **Source type** property to _URL_, and then enter the image URL in the **URL** input field.

_**Note**_: Applies from _7.0.2_

## Data table widget (Subscription editions)

An extended table widget that provides column sorting, filtering, and paging in addition to the standard table widget facilities.

Set the **Data source** to _Bonita API_ to populate the data table with records from a Bonita BPM REST API. 
Then enter a REST API URL in the **URL** property. Use the **API request parameters** property to pass additional parameters to the request. 
Supported parameters are described in the [REST API Overview](rest-api-overview.md#standard_search_params) and in the REST API documentation for the relevant resource. 
You do not need to specify paging parameters (such as `?p=0&c=10`), because the data table handles paging automatically when you use a Bonita API data source. 
The value of the **Page size** property controls how many rows are displayed in a table view, and automatically adds buttons to show subsequent pages of the table.

Alternatively, you can set the **Data source** to _Variable_ and use a variable definition to point ot the table content. 
Note that if you use a Variable datasource and an External API variable, the paging of the table content is not handled automatically.

### Sort

The _Sortable columns_ property enables to list the columns which allow a sorted search.
Each element of this property has to match an element of the _Columns key_ property to figure out which table column
can be sorted upon.

When a data table is displayed (including in the Preview), the user can click on a column heading to reorder the table rows by this column. 
Some fields do not support sorting but still display the sort button which is a known limitation. 
The ordering applies to the visible rows in the table, not to the entire table.

The sort is backend when datasource is **Bonita API**. It is frontend, otherwise.

Note: BDM APIs are not yet sortable. For other APIs, test in the preview or refer to the BonitaBPM documentation 'REST API' pages.

### Filter

You can provide a filter for users to update the displayed table to show only the rows that match the filter. To do this:

1. Add a widget to the page where the user will specify the filter. This can be an Input widget for free-form text, or a Select widget to choose from a preset list.
2. Create a filter variable in the variable panel. If you are using an Input widget, this variable has no value.
3. Bind the filter variable to the widget.
4. Bind the filter variable to the Data table widget **Filter** property.

When the table is displayed, each time the user updates the filter, the table display is updated accordingly. The filter is applied to the table rows that are currently displayed.

Note: it is only possible to filter on attributes that are searchable in the REST resource definition. To search on an attribute of a business object, make sure that the BDM contains the necessary queries.

## Chart widget (Subscription editions)

Use the chart widget to create a graphical display of data to ease understanding. This widget is based on angular-chart-0.8.1, which is based on Chart.js.
For information, see the [Angular chart documentation](http://jtblin.github.io/angular-chart.js/) or [Chart.js documentation](http://www.chartjs.org/docs/).

The widget can display several styles of chart:

* For a single set of data points:
  * Bar
  * Line
  * Radar
* For one or more sets of data points:
  * Pie
  * Doughnut
  * Polar area

Provide each set of data for display in a JSON array, containing numeicral values.
You can enter a single array directly in the Value property, or bind it to any variable that provides an array.
For a multiple set chart, bind it to any variable that provides an array of arrays, all sets having have the same length.
The list of values in the **Labels** property must be have same length as an associated set.

Charts can be customized more deeply using the **Advanced options** property. To specify advanced options, bind this property to a JSON variable that specifies the options.
Options are specific to each chart type and are listed in the [Chart.js documentation](http://www.chartjs.org/docs/) in the _Chart options_ section for each chart style 
(for example, there are spacing [options for bar charts](http://www.chartjs.org/docs/#bar-chart-chart-options)).