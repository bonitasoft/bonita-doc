# Bonita BPM documentation resources

This repository contains the new Bonita BPM documentation site & tools.  
It is using markdown to create documentation content.

## Contribute

### Syntax

Current conversion to html is done with `markdown-it` with the [Github-flavored Markdown](https://help.github.com/categories/writing-on-github/). Checkout [the cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#blockquotes) for more information.

#### Fontawesome

The markdown-it-fontawesome plugin has been activated and you can use [fontawesome](http://fontawesome.io/icons/) icon with their name surrounded by colon: `:fa-flag:` that will produce 
```html
<i class="fa fa-flag"></i>
```

#### Bootstrap Alert

In order to reproduce [bootstrap alerts](http://getbootstrap.com/components/#alerts) that were present in former documentation site, we introduced the **markdown-it-alerts**.
It allows to recreate a `div` block with custom classes.

We added 5 types of container :
* danger
* warning
* info
* primary
* success

To use them create a block surrounded with 3 colons:
```
::: danger
Beware of this important thing !
:::
```
#### Decorate

if you want to decorate the md elements with html attributes like classes or title, we added the [**markdown-it-decorator**](https://www.npmjs.com/package/markdown-it-decorate) to do so.  
Using `<!--{}-->` pattern at the end of a block will convert the content of `{}` to html attributes. Use CSS notation to decorate with classes :
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

### Process

#### Update existing file

In this case, a simple edit of the md file in the appropriate branch (one per version) is enough, the building process will do the rest.  
For instance, to edit the **actors.html** page in the 7.3 version, checkout the **versions/7.3** branch and edit the `md/actors.md` file.

#### Adding new pages

Select the version you want this page to be available in and create the md file in the appropriate folder.  
Example: to add a new tutorial about the _form control in the UI Designer_ in 7.3, checkout the **version/7.3** and open the _md_ folder.

You can check its content once committed in the github site (simple view) or using the web server (advanced view).

Currently, this page has no links that point to it, so would be able to find it unless you know the address.  
You need to edit the taxonomy to be able to find it the taxonomy tree.

The taxonomy is created from the `taxonomy.md` file in each site version.  
In our case, we also want to add a _Howto_ section in the taxonomy tree, so we first create a new item inside the `taxonomy.md`. Then we create a entry point for our new tutorial inside the _Howto_ section:

    * [Howtos](howtos.md)
      * [Manage form control/validation](manage-control-in-forms.md)

_Note_: Each link must be relative to the versions it is into (for resources too).

We need to create the _howtos.md_ to have the list of items of this section in a dedicated page:

    * [Manage form control/validation](manage-control-in-forms.md)

Now, starting from the visualization of the _taxonomy.md_ page, we can browse to the _manage-control-in-forms.md_ page.

#### Resources (Images)

All images must be placed in the **md/images** folder, whatever the version is. It is due to the fact that the application site resolve images from the root folder.

#### Variables

During markdown to HTML conversion, some predefined variables located in the [variables.json file](scripts/variables.json) are replaced.

Currently, only the `varVersion` exists and match the current documentation version.

#### Table of content

A table of content is automatically added on each page. It will be place right before the first h2 title.

Automatically generated ToC includes links to h2 and h3 titles.

### Simple view

Using the [Github Markdown Format](https://help.github.com/categories/writing-on-github/) format allows to check the documentation directly in the github repository.  
So a simple way to contribute is to add/edit your content inside the `md` folder, commit and push it and see online via the github web site.

### Advanced view

A more industrialized process is possible.  
The project uses JavaScripts scripts to manage and deploy content.   
Therefore, you must first install your favourite `node` version to be able to build the project (`nvm` is the best place to start).

Then run in the root folder:

    npm install

Then run

    npm run watch

A web server will be launched which convert the requested md file to the html version (currently without any style).  
A livereload is also set up and allows any change to the `md` file to reload its html version in the browser.
