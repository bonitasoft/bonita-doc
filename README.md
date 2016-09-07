# Bonita BPM documentation resources

This repository contains the new Bonita BPM documentation site content.
It uses [Markdown](https://help.github.com/categories/writing-on-github/) to create documentation content.


## View content

### Simple view

Using the [Github Markdown Format](https://help.github.com/categories/writing-on-github/) format allows to check the documentation directly on the GitHub repository website.

So a simple way to view documentation content is to browse the `md` folder on GitHub website.

### Advanced view

A more industrialized process is possible.  
The project uses JavaScript scripts to manage and deploy content.
Therefore, you must first install your favorite `node` version to be able to build the project (`nvm` is the best place to start).

Then run in the root folder:

    npm install

Then run

    npm run watch

A web server will be launched locally. It converts md files to html (currently without any style).
A livereload is also set up and allows any change to the `md` files to reload its html version in the browser.


## Contribute

### Update existing pages

In this case, a simple edit of the _.md_ file in the appropriate branch (one per version) is enough, the build process will do the rest.

<u>Example</u>: To edit the **actors.html** page in the 7.3 version, checkout the **7.3** branch and edit the `md/actors.md` file.

### Add new pages

#### Create new pages

Checkout the version you want this page to be available in and create the _.md_ file in the **md** folder.

<u>Example</u>: To add a new _Manage form control/validation_ tutorial in 7.3, checkout the **7.3** branch and create a new _manage-control-in-forms.md_ file in the **md** folder.

You can check its content once committed on the GitHub site (_Simple view_) or using the web server (_Advanced view_).

#### Add new pages to taxonomy (navigation)

Your new page is not yet referenced in documentation site's taxonomy. So you will not be able to find your new page in the navigation tree unless you know the URL.
Therefore you need to add your new page to the taxonomy to be able to find it the navigation tree.

The taxonomy is created from the `taxonomy.md` file.
In our case, we also want to add a _Howto_ section in the taxonomy tree. So we first create a new item inside the `taxonomy.md`. Then we create a entry point for our new tutorial inside the _Howto_ section:

    * [Howtos](_howtos.md)
      * [Manage form control/validation](manage-control-in-forms.md)

<u>Note</u>: Each link must be relative to the versions it is into (for resources too).

<u>Note</u>: We need to reference a *_howtos.md* page with the list of items of this section. However you don't need to create the *_howtos.md* file as it is automatically generated at build time.

Now starting from the visualization of the _taxonomy.md_ page, we can browse to the _manage-control-in-forms.md_ page.

#### Variables

During markdown to HTML conversion, some predefined variables located in the [variables.json file](scripts/variables.json) are replaced.

Currently only the `varVersion` exists. It matches the current documentation version.
To reference this variable, use the `${varVersion}` notation in _.md_ files.

#### Table of content

A table of content (ToC) is automatically added on each page. It will be placed right before the first `h2` title.

Automatically generated ToC includes links to `h2` and `h3` titles.

#### Quick note on "howtos"

When you create **howtos** make sure that:
  - In the taxonomy, their titles start with verbs, so it finishes the sentence "how to...", like "Manage multiple references in Business Objects".
  - In the file itself, the title includes the "how to" phrase, like "How to manage multiple references in Business Objects".
  - You reference the how to page in other descriptive pages of the existing taxonomy, to optimize its discoverability.

### Add images

All images must be placed in the **md/images** folder, whatever the version is. It is due to the fact that the application site resolve images from the root folder.


### Syntax

Current conversion to html is done with `markdown-it` with the [Github-flavored Markdown](https://help.github.com/categories/writing-on-github/). Checkout [the cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#blockquotes) for more information.

#### Images

Use exclusively the Markdown syntax to insert images. Using the HTML `<img>` syntax is **not supported** by the build process.

<u>Example</u>:

    ![optionalImageCaption](images/mandatoryImageFileName.ext)

#### Anchors

In the page to navigate to, add the following:
```html
<a id="section-Name" />
```

In the page to navigate from, use the following:

    [textToDescribeTheLink](pageName.md#section-Name)

#### Font Awesome

The markdown-it-fontawesome plugin has been activated and you can use [Font Awesome](http://fontawesome.io/icons/) icons with their name surrounded by colons.

<u>Example</u>:

    :fa-flag:
will produce
```html
<i class="fa fa-flag"></i>
```

#### Bootstrap alerts

In order to reproduce [Bootstrap alerts](http://getbootstrap.com/components/#alerts) that were present in former documentation site, we introduced **markdown-it-alerts**.
It allows to recreate a `div` block with custom classes.

We added 5 types of container :
* danger
* warning
* info
* success

To use them create a block surrounded with 3 colons.

<u>Example</u>:

```
::: danger
Beware of this important thing !
:::
```

#### Decorate

If you want to decorate the md elements with html attributes like classes or title, we added the [**markdown-it-decorator**](https://www.npmjs.com/package/markdown-it-decorate) to do so.  
Using `<!--{}-->` pattern at the end of a block will convert the content of `{}` to html attributes. Use CSS notation to decorate with classes.

<u>Example</u>:
```
This is some text.
<!--{.center}-->
```
will be converted to
```html
<p class='center'>This is some text.</p>
```

#### Smart arrows

We added the use of the [**markdown-it-smart-arrows**](https://www.npmjs.com/package/markdown-it-smartarrows) plugin to convert arrows to html entities :
```
--> →
<-- ←
<--> ↔
==> ⇒
<== ⇐
<==> ⇔
```


## Build project

The project contains several task to generate the documentation.

### HTML

Use `npm run build` to have the html files generated to `build/html`.  
It reads the version to generate from the command line arguments via the `-v` option or if left blank, reading the _varVersion_ attribute from the `scripts/variables.json` file.

### Taxonomy

Once the html has been generated, the `taxonomy.json` file can be generated from the `build/html/taxonomy.html` file.
Use the `npm run taxonomy` to do so.

### PDF

The PDF file gathering all the markdown content can be generated using the `npm run pdf` command.
