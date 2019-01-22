# Multi-language pages

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

In the Bonita Subscription editions, the UI Designer includes a mechanism to add translations for page, layout and forms elements, to support multi-language applications.  
The text displayed in the preview and at runtime adapts to the locale or browser language automatically. The UI Designer itself, that speaks to developers, not end-users, is displayed in the language of your Bonita Studio.  
The Preview window is displayed in the language set for Bonita Portal, since it speaks to the end-users.

You can translate all text strings displayed on a page, layout or form: the labels, the placeholders, the available values of a list, and the date format of the Date Picker widget. You can also translate fragments and custom widgets strings that the page, layout or form embeds.

## How it works

Each page has a [localization asset](assets.md) that contains the keys and the translations for all strings and all languages that the page supports, one section by language.  
The asset is a file, `localization.json`. Each language is identified by the ISO 639 language attribute (for example, fr-FR, es-ES). Open the default `localization.json` asset to see how this file must be formatted, and to update it with the needed strings and translations.  
To use a localization asset, replace the default `localization.json` file with an updated `localization.json` file of the same format containing all the keys as well as the translations into the target languages. The format of file must be:

```json
{
"ISO 639-1 code for language-A": 
  {
    "english key":"translated key for language-A",
    "english key2":"translated key2 for language-A",
     ...
   },
"ISO 639-1 code for language-B ": 
  {
    "english key":"translated key for language-B",
    "english key2":"translated key2 for language-B",

     ...
   }
  ...
```

The code that specifies a language in `localization.json` must be the same as the code in the `.po` files used to [add the language to the Portal](languages.md).

By default, US english strings are used as the keys for translation. But you could use any code or language for the keys, and create an en-US section of translations to consider english as any other translated language. That option allows to freely change english strings with no duplication on every other language section.

In production, a page, layout or form is displayed in the language specified by the BOS\_locale cookie value. This value must match exactly one of the language codes in the `localization.json` asset. The BOS\_locale value is set by selecting a language in Bonita Portal or in a custom widget. If BOS\_locale is not set or its value does not match a language code, the browser language is used. If neither the BOS\_locale nor the browser language matches a language code in `localization.json`, the untranslated keys are displayed in the page.


## Tutorial: creating a multi-language page

This tutorial explains how to create a multi-language version of the Travel Tool application page from the [getting started tutorial](getting-started-tutorial.md), adding french and russian text to the page, initially developped in US-english. It assumes that you have already created the Travel Tool page following the instructions in the [getting started tutorial](getting-started-tutorial.md).
French is supported by default in Bonita, along with US-english and Spanish. Russian is not.

### Translate the text

The first step is to create a list of all the english text strings used in the page. These strings are the keys for translation. For this simple page, you could create the key list by hand from the text that is visible in the Page editor.  
However, to be sure that you identify all the items that need to be translated, export the page zip file, and edit the `page.json` file to retrieve all the text strings. In addition to the text strings, look for any date format strings and URLs that could contain a locale attribute.

For the Travel Tool application page, this is the set of text strings to translate:
```
Travel Tool
This page lists your pending and approved travel requests.
My pending requests
Departure date
Number of nights
Hotel needed
Destination
Reason
Create new travel request
My approved travel requests
yes
no
```

Now translate the text outside of Bonita, in any suitable translation editor, or spreadsheet. 

### Add languages to Bonita Portal

Before you can view a page in a language, that language must be supported for Bonita web applications. French is one of the default languages supported, so you just need to add support for Russian. To do this, [add Russian from the Community translations to your Bonita Portal](languages.md). Make sure that you add both the Community and Subscription files. Then restart your Bonita Studio, start the Portal, and change the language to Russian to check that it is available.

### Add a localization asset to the page

Create a `localization.json` file in the format shown above, containing the french and russian translations of the page text.  
The language identifier must match the language identifier in the `.po` files containing the Portal translations.  
Use an online Json checker to make sure there are no format errors in the file. The file will look something like this:

```json
{
  "ru_RU": {
    "Travel Tool": "Путешествия Инструмент",
    "This page lists your pending and approved travel requests.": "Эта страница содержит список ожидающие и одобренные запросы в поездке.",
    "My pending requests": "Мои ожидающие запросы",
    "Departure date": "Дата отбытия",
    "Number of nights": "Количество ночей",
    "Hotel needed": "Отель нужны",
    "Destination": "Hазначения",
    "Reason": "причина",
    "d/M/yyyy": "dd/MM/yyyy",
    "Create new travel request": "Создать новый запрос пути",
    "My approved travel requests": "Мои запросы туристические утвержденные",
    "yes": "Да",
    "no": "Нет"
  },
  "fr-FR": {
    "Travel Tool": "Gestionnaire de déplacements",
    "This page lists your pending and approved travel requests.": "Cette page affiche la liste de vos demandes de déplacements en attente et de celles qui ont été approuvées.",
    "My pending requests": "Mes demandes en attente",
    "Departure date": "Date de départ",
    "Number of nights": "Nombre de nuits",
    "Hotel needed": "Besoin d'une réservation d'hôtel",
    "Destination": "Destination",
    "Reason": "Motif",
    "d/M/yyyy": "dd/MM/yyyy",
    "Create new travel request": "Créer une nouvelle demande de déplacement",
    "My approved travel requests": "Mes demandes approuvées ",
    "yes": "oui",
    "no": "non"
  }
}
```

You can [download a copy of this `localization.json` file](images/special_code/localization.json) for testing.

In the UI Designer, import this file as an asset of the travel tool page. This will replace any existing `localization.json` file. Save the page.

### Translate contents in custom widgets

In the custom widget editor, use the the _uiTranslate_ filter or the _ui-translate_ directive to indicate the content to translate.   Then add the strings to the localization.json file of each page, layout and forms using it. See [Custom widgets section](custom-widgets.md) for more information.

### Translate content in fragments (Subscription editions)

The strings to translate in a fragment must be added to the localization.json file of each page, layout or form using the fragment.

<a id="uiTranslate"/>

### Translate content in variables of type JavaScript Expression

To translate the strings of JavaScript Expressions, use the function **uiTranslate()**.
This is available in the expression editor, in the Autocompletion (_ctrl+space_) service.
This gives the opportunity to get such strings available for translation in the _localization.json_ asset of the UI Designer artifact. You still need to copy the strings in your expressions and paste them in the  _localization.json_ asset.

### Preview the page

Now preview the page in each language. To do this, you need to modify the language used for Bonita web applications, which you do by setting the Portal language from the Portal Settings menu.

![Multi-language page previews](images/images-6_0/l10n-combined-previews.png)

Check the translated versions of the page, and update the translated text if necessary. To update the translations, edit your `localization.json` file and then upload it again. Adjust the page layout if necessary to allow for language differences. Your multi-language page is now complete, ready to be included in an application and deployed.

**Note:** Always update the localization.json file as an asset and then export your page or form from the UI Designer to make it an available resource. If you edit the localization.json file in the file system and zip the page or form from there, the updated translations will not be taken into account. 

### Deploy

To put a multi-language page into production in an application, follow the same steps as for a single-language page: [upload the page to the Portal](resource-management.md) and then [add it to the application](applications.md). You can follow the steps for [building the application](getting-started-tutorial.md) from the getting started tutorial.

After deployment, an application user will see the page in the language configured for their Bonita web applications. A user can set this by selecting the language in the Bonita Portal. If the selected language is not supported by the page localization.json file, the untranslated keys are displayed.

## Sharing translations

Depending on the applications and processes you have, there could be some strings that are common to many pages or forms.   
If this is the case, consider using a single `localization.json` for all pages.   
You still need to attach it as an asset to each page or form, but it could make your translation process more efficient by avoiding duplication.   
Alternatively, your translation management tools might provide a mechanism for sharing the translations required for various pages and forms, which would enable you to extract the keys and translations required for a page or form and construct the .json file.
