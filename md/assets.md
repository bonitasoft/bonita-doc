# 1.7.2.10 Assets

Assets enable you to add web resources to pages and forms. Available asset types are JavaScript, CSS, Image, and (in the Subscription editions) Localization. 
Assets can be Local (file stored in the artifact) or External (URL). An external asset name must be a standard URL. A localization asset is always local.



## Assets in the page editor

Manage assets using the **Assets** tab at the foot of the whiteboard.


### CSS assets

Add CSS assets at page level and use them to edit the CSS classes property of any widget. The UI designer integrates the default Bootstrap style. 


For example, you can create a file mycss.css with this content:

`
.myOwnStyle{
  background-color : #404853;
  color: #ffffff;
}
`


1. In the **Assets** panel, click **_Add a new asset_**.
2. Select the type: **CSS**.
3. Set the the source to **Local**.
4. Upload your CSS file. The file appears in the asset list.
5. Drag a widget text onto the whiteboard.
6. Select this widget.
7. In the property panel add your CSS class  
![CSS asset](images/images-6_0/cssasset.png)
8. Click on the preview button. You will see white text on a gray background.

### Image assets


An image asset can be displayed in a custom widget (see the Custom widget editor \> Assets help).
Add an image asset at page level if the image is used as a custom widget property.


### JavaScript assets

With a Javascript asset you can add a script. It will be loaded in the global scope and you can use it in data. 

For example, add a script `myscript.js` to display this welcome message:


    
    function hi(name){
      return 'Welcome ' + name + ' to the UI Designer';
    }
    




To add and use this asset:

1. In the **Assets** panel, click **_Add a new asset_**.
2. Select the type: **JavaScript**.
3. Set the source to **Local**.
4. Upload your JavaScript file. The file appears in the asset list.
5. In the **Variables** panel, add a new String variable called "name".
6. Create a JavaScript expression that calls the "hi" function. 
7. Add an input widget linked to the "name" variable and a text widget linked to the hi variable.  
![CSS asset](images/images-6_0/jsasset.png)
8. Click on the preview button. You will see a page containing the welcome message. The name will change when you change the value of the name variable. 

### Localization asset (Subscription editions only)


The localization asset of a page is a local file called `localization.json` that contains the text presented in the page with translations into the languages that you want to support. 
This enables you to create [multi-language pages](/multi-language-pages).


A page cannot have more than one localization asset. When you upload a new `localization.json` asset file, it overwrites the existing one.



### Asset list

The list contains both page assets and the assets of the custom widgets used in this page.


In the list, you can delete page assets only, view local assets, and edit external assets of a page. You cannot manually change the order of assets in a page. 
You can also indicate whether an asset is active. To avoid dependency clashes with multiple version of assets, make sure only one version of an asset is active in a page.

At runtime, custom widget assets are loaded in alphabetical order of the custom widgets. For each custom widget, the assets are loaded in the order they are listed. Then page assets are loaded. JavaScript and CSS assets are loaded in the page header.


## Assets in the custom widget editor

To use the same asset in several pages, you can add it to a custom widget and use this custom widget in your application pages or forms. 
When you add a custom widget with assets to a page, those assets are automatically linked to the page. 
A custom widget cannot contain a localization asset. Instead, include the text and translations in the page localization asset for each page where the custom widget is used.


### JavaScript assets

In a JavaScript asset, you can specify a dependency on an Angular module. First add the JavaScript asset, and then add the module name in the dedicated section. You can find the the available modules on [http://ngmodules.org/](http://ngmodules.org/).


### Image assets

_Note:_ Applies to 7.0.0 and 7.0.1\. From 7.0.2, use the _image widget_.

In the custom widget editor, create a widget with two properties:

`
{name : "src", type : "text", "Default value" : "assets/img/assetname.png"}
{name : "description", type : "text"}
`


You do not need to define a controller but you must create an HTML template: 

`<img ng-src="{{properties.src}}" alt="{{properties.description}}">`


You can now use this custom widget in any page, by adding an image asset and changing the property src to point to it. For an external asset, specify a URL. To load a local image, specify a relative path as follows:


* `assets/img/[image name]` for a local image added in the page
* `widgets/[custom widget name]/assets/img/[image name]` for a local image added in a widget

### Asset list


In this list, you can use the arrows to reorder assets, view local assets, edit external assets, and delete an asset. 
You can also indicate whether an asset is active. To avoid dependency clashes with multiple version of assets, make sure only one version of an asset is active in a page.

At runtime, assets of a custom widget are loaded in the order defined.