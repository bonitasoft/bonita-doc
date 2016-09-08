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


## Build project

The project contains several tasks to generate the documentation.

### HTML

Use `npm run build` to have the html files generated to `build/html`.  
It reads the version to generate from the command line arguments via the `-v` option or if left blank, reading the _varVersion_ attribute from the `scripts/variables.json` file.

### Taxonomy

Once the html has been generated, the `taxonomy.json` file can be generated from the `build/html/taxonomy.html` file.
Use the `npm run taxonomy` to do so.

### PDF

The PDF file gathering all the markdown content can be generated using the `npm run pdf` command.


## Contribute

To help you contributing to Bonita BPM documentation, we provide a set of [contribution guidelines](CONTRIBUTING.md).
Thanks for taking time to contribute!
