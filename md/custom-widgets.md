# Custom widgets

If the [standard widgets](widgets.md) do not meet your needs, you can create a custom widget to match exactly what you want to achieve.  
After creation, a custom widget is available in the palette to design pages, application layouts, forms or fragments. 

## Description

Custom widgets are composed of:

* A description that briefly describes the widget
* Properties exposed by the widget
* A template that describe the widget HTML markup
* A controller that describe the widget logic
* Some assets if the widget uses external JavaScript libraries, CSS definitions, or images
* AngularJS modules declaration if the widget uses services or directives that are not built in to the AngularJS framework

Custom widget implementation is based on the AngularJS framework.  
When you open the custom widget editor to create a new custom widget, a simple example is displayed to show the basic uses of these concepts.

For more information, see the AngularJS guide on [templates](https://docs.angularjs.org/guide/templates) and [controllers](https://docs.angularjs.org/guide/controller).

For now, the definition of custom containers is not yet available in the product.

## Custom widget properties

Properties are variables that can be set in the properties panel when adding a custom widget to a page, layout, form, or fragment.  
A property is constant, dynamic, a bidirectional bond, or an interpolation. You can chose between these treatments when you edit the [widget property](widget-properties.md). Use properties when you want the front-end developer using the widget to customize widget appearance or behavior. In a custom widget, a property can be used either in the template or in the controller.

A property has a _name_ which can be referenced in the controller or the template, a _label_ which will be printed in the properties panel in an editor, a _default_ value, and a type. There are several property types:

* **text** user specifies the property value with some text
* **choice** user chooses the property value from a list that you define
* **html** user specifies the property value with some text that can contain basic HTML tags
* **integer** property value is an integer
* **boolean** property value is a Boolean
* **collection** property value is an array

Each of these types will allow the front-end developer to bind the property value to a variable. 

## Using an external AngularJS directive or service in a custom widget

Many Angular libraries are available on the Internet and can be used in a custom widget. To do so, download the library you want to use and add it to your custom widget as a JavaScript asset. The downloaded library will specify a module to add to your application: add this module to the custom widget definition in the **Required Angular modules** field. Now you can use the imported library directives in the custom widget templates and services in the controller by injecting them in function arguments (example: `function($scope, myImportedService)`).

## Translation filter

The [Multi-language pages](multi-language-pages.md) tutorial explains how to manage localization (l10) inside developped pages, layouts, forms or fragments. During page loading, the l10n strings are loaded to the l10n mechanism.

You can use this mechanism in your custom widgets to process content to translate. There are two ways to use the localization: either the _uiTranslate_ angular filter or _ui-translate_ directive:

* Use the _uiTranslate_ filter in custom widgets for dynamic content to be translated
* Use the _ui-translate_ directive in custom widgets for static content to be translated

#### For instance, with a custom link widget :
```
<div>
    <a title="{{ properties.title | uiTranslate }}" ui-translate>Submit</a>
</div>
```

The link text which is static is translated using the _ui-translate_ directive. The link text title held inside the _properties.title_ variable is translated using the _uiTranslate_ filter.

## Advanced example

This section explains how to use the _carousel_ and _slide_ directives from the `ui.bootstrap` library.

Following the [`ui.bootstrap` documentation](https://angular-ui.github.io/bootstrap/#/getting_started), 
[download `ui-bootstrap-tpls.min.js`](https://angular-ui.github.io/bootstrap/) and declare the module `ui.bootstrap` as a dependency of the application. Specifically, to use these directive in a custom widget, you need to:

1. Download `ui-bootstrap-tpls.min.js`.
2. Add it as local JavaScript asset to the custom widget.
3. Declare the _ui.bootstrap_ module in the _Required angular modules_ field.

You can now use the _carousel_ and _slide_ directives in your template. Here is a simple example of the template and controller for a carousel.

Template:
``` html
<div uib-carousel>
      <div uib-slide ng-repeat="slide in slides track by $index" index="$index" >
        <img ng-src="{{slide.url}}" style="margin:auto;" alt="{{slide.alt | uiTranslate}}">
      </div>
</div>
```

**Note:**
If you want use _carousel_ and _slide_ directives in the same page as widgets that import `ui-bootstrap-tpls-0.13.0.min.js` as asset, 
please use this syntax for _carousel_ and _slide_ directives in your template.

``` html
<uib-carousel>
      <uib-slide ng-repeat="slide in slides" >
        <img ng-src="{{slide.url}}" style="margin:auto;" alt="{{slide.alt | uiTranslate}}">
      </uib-slide>
</uib-carousel>
```

Controller:
```javascript
function ($scope) {
      $scope.slides = [
        { url: 'http://placekitten.com/601/300', alt:'kitty looking down' },
        { url: 'http://placekitten.com/602/300', alt:'kitty in hand' },
        { url: 'http://placekitten.com/603/300', alt:'kitty outside' },
        { url: 'http://placekitten.com/604/300', alt:'4 kitten in basket' }
       ];
    }
```
