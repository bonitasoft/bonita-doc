# How to display a vertical tabs container on all devices

::: warning
**:fa-exclamation-triangle: Warning:** This tutorial is using "Vertical tabs container" available since Bonita 7.9
:::

## Goal: Display stacked tabs on mobile and juxtaposed tabs on desktop
Since Bonita 7.9 tab container evolutions, it can be tab display can be displayed `Vertically` thanks to bootstrap configuration parameters. This will cover specially use cases where tabs needs to be display in mobiles as tabs and contents will be stacked. To do that it is enough to configure vertical property at tab container properties panel. We recommend to switch type from tabs to `pills`, rendering is nicer in pills than default style as tabs.

In counterpart, in the version v0.30.1 of bootstrap there is no provided style to display the content at the right side of vertical tabs, which is a usually desired when using larger devices.

To have a tab container displayed on all devices (mobile / desktop) modifying display based on devices size you could use css as described below, but feel free to extend it to match your specific needs.

![Vertical tabs container on mobile](images/vertical-tabs-container-tutorial/mobile.png) <!--{.img-responsive .img-thumbnail}-->

![Vertical tabs container on desktop](images/vertical-tabs-container-tutorial/desktop.png) <!--{.img-responsive .img-thumbnail}-->

## Step 1: Configure the tabs container
The Tabs container will be configured `Vertically`, add a css class tab-vertical as follows.
Remember that we recommend to switch type from tabs to `pills`, rendering is nicer in pills than default style as tabs.
![Vertical tabs container configuration](images/vertical-tabs-container-tutorial/configuration.png) <!--{.img-responsive .img-thumbnail}-->

## Step 2: Add css rules in a css file
Add following css rules in style.css asset, a new asset, or even on your application theme css
```css
@media (min-width:  768px) {
    .tab-vertical .nav {
        float: left;
        width: 30%;
    }

    .tab-vertical .tab-content {
        float: left;
        width: 70%;
    }
}
```
![Vertical tabs container css](images/vertical-tabs-container-tutorial/css.png) <!--{.img-responsive .img-thumbnail}-->
