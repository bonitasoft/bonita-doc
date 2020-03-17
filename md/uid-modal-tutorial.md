# How to create a modal window in UI Designer

A nice aspect of Bonita UI Designer is that it allows users to apply or customize styles to the page as per their requirements through CSS.

Throughout this tutorial you will see how to build a modal window using only CSS.
Let's get started by creating some content.
You will need a container which will end up being our modal and some other content on top of which that modal will be displayed.

![Initial content](images/uid-modal-tutorial/initial-content.png) <!--{.img-responsive .img-thumbnail}-->

## Display a container on top of all other elements

Create a CSS file with the following content.
 
 ```css
 .Modal-content {
     position: absolute;
     width: 80%;
     left: 0;
     right: 0;
     margin: 5% auto;
     background-color: #fff;
     border-radius: 2px;
     box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
     padding: 2em;
 }
 ```

::: info
Note that the name of the class used follows [BEM](https://en.bem.info/) methodology.  
BEM or any other structural naming convention enforces good practices such as responsibility segregation, reusability, name collision avoidance and more.
:::

To use that file in the UI Designer you need to upload it as a page asset.   
To do so, open your page. Go to the `Assets` section at the bottom of the screen and click on `Add a new asset`.  
Select `CSS` type, `Local` source then upload your CSS file.  
It will be added to the page and all classes will be available and accessible from the property `CSS classes` of any element.

Now lets add `Modal-content` to the container property `CSS classes`.  
Check out the result by hitting the `Preview` button.

![Modal content container](images/uid-modal-tutorial/modal-content-container.png) <!--{.img-responsive .img-thumbnail}-->

::: info
While working on your CSS file, one could serve its local CSS file using a local [server](https://www.npmjs.com/package/http-server).  
Then instead of uploading the file add an external CSS asset which point at your file. That would greatly speed up development.  
For production, that file would still need to be uploaded as a CSS asset.
:::

## Add an overlay to make underneath elements inaccessible

Add a new container and move the `Modal-content` container into the overlay container in order to to have it on top.  
Add the following code to CSS file.

```css
.Modal-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 100;
}
```

You now need to add the `Modal-overlay` class to our overlay container.

![Modal overlay container](images/uid-modal-tutorial/modal-overlay-container.png) <!--{.img-responsive .img-thumbnail}-->

## Take control over the modal 

There is many other approach to deal with how and when to display a that modal with the UI designer.  
Here is one which could scale nicely with multiple modals.

### The creation

Now that you got a modal you need to take control over when to display it.  
You will start by creating a JSON variable with an array called `modals`.  
So go to the `Variables` section at the bottom of the screen and click on `Create a new variable`.  
Give it the name `modals` and `JSON` type. It will take for value an empty array `[]`.

![Modals variable](images/uid-modal-tutorial/modals-variable.png) <!--{.img-responsive .img-thumbnail}-->

Now bind the `modals` variable to the `Collection` property of the `Modal-overlay` container.  
That would have for effect to mask the modal whenever the array is empty.  
Also anything which add an object to the array `modals` will display a new modal.

For the purpose of this tutorial you will do that with a button.  
Lets add a button and configure the `Action` property with `Add to collection`   
then bind the `modals` variable to the `Collection` property.

![Open modal button](images/uid-modal-tutorial/open-modal-button.png) <!--{.img-responsive .img-thumbnail}-->

You can test the result using the preview.

### Ok now close that modal

A direct follow up to the modal creation is to close it.   
The previous method allowed us to use another action from the button widget.   
First add a button in the modal and configure the `Action` property with `Remove from collection`.  
Then bind the `modals` variable to the `Collection` property.  
You need to define which object will be removed and you can do that by selecting `Item` for the `Remove` property and adding the `$item` variable to `Item to remove`.  
Here `$item` is available because it is in a repeated container context.

![Close modal button](images/uid-modal-tutorial/close-modal-button.png) <!--{.img-responsive .img-thumbnail}-->

Here is the result of that tutorial

![Modal result](images/uid-modal-tutorial/tuto-modal-result.gif) <!--{.img-responsive .img-thumbnail}-->
