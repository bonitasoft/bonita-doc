# Multi-language applications

Throughout this document, you will see how we can translate the menus in Living Applications.

The menus in a custom application developed by a user can be available and extendable in the languages as per their requirements. But, the menus in Bonita living application are available in five different languages such as; English, French, Spanish, Japanese, and Portuguese (Brazilian) by default. 
Based on the needs, the menus can be translated into other languages also by updating the Bonita layout.
This documentation is only about the menus. For more information regarding translation at the page level, go to the [multi language pages](multi-language-pages.md) page.  

## Updating the menu widget
 In order to get the menu translated, we need to ensure that we have "| uiTranslate" added to the menu display name.    
 
 You can follow the given procedures below. 
 
1. Update your widget inside Bonita UI Designer.
2. In the *Template* section, add "| uiTranslate" after *menu.displayName* and *childMenu.displayName* wherever it is. For example, *menu.displayName | uiTranslate*.
3. Save the widget.

![Menu-widget](images/multi-language-applications/menu-widget.png)


## Updating the layout

A layout is a page used to define the main frame of an application.

1. Update your layout inside Bonita UI Designer. For more information regarding customizing the layout, go to the [customize layouts](customize-layouts.md) page.

2. Inside the Localization section, click on the pencil icon on the right to the localizaton.json to edit it.
![Edit-localization](images/multi-language-applications/edit-localization.png)
3. The localization.json file shows four different sets of strings based on the languages available. 
![Localization](images/multi-language-applications/localization.png)
4. Now We need to add all the new keys in English which are the menu display names of the application you want to translate. For example, we will add the menu keys of Bonita User Application such as; Processes, Cases, and Tasks inside fr-FR, es-ES, jp-JP, and pt-BR objects.
![Add-keys](images/multi-language-applications/add-keys.png)
5. Click on **Save** to save the changes we made in the localization.json.
6. Click on **Close**.
7. Now save the layout.
8. Now, deploy the layout on your target runtime.