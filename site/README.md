# Bonita BPM documentation site

This directory contains the file to make the documentation site work.

## How it works

The site is quite simple.  
It is composed of 3 panels :
 * Header with menu
 * Navigation with taxonomy
 * Content with html doc files or search results

The site serves any html file located in the `app/html/<product_version>/` folder.  
Images must all be located inside the `app/images` folder because it is the browser which resolve images path contained inside the html rendered pages. Therefore, we do not have hands on images path...

We should use a specific folder for each version inside the global images folder.

Search is done via calling Solr which must have indexed files before being called.

## Directory structure

### apache2-conf : Apache configuration

It contains the apache2 configuration file that describes the virtual hosts and its properties

### app

It contains web resources (js, html, css,...)

### scripts

It contains the utility scripts to build the application

### solr-conf : Solr

It contains the Solr core instance configuration files for a Bonita BPM documentation index.  
Each Solr core representing a Bonita BPM version must have these files.


## Installation

First, install the dependencies
   
    npm install

Then run :

    npm run serve

to launch the server and go to http://localhost:9001 to see it.

## Scripts

This folder contains utility scripts that convert simple md files to the html files used in the site.

### Taxonomy

The `taxonomy.js` file converts the global all.html file to a json file that holds the taxonomy to be rendered inside the navigation pane of the site.  
It can be run with:

    scripts/taxonomy.js

or
  
    npm run taxonomy

### Markdown to HTML 

The `convertMd2Html.js` scripts reads all the markdown files from the root `md` folder and convert them to html to the matching version folder inside the `app/html` folder.  
It can be run with:

    scripts/convertMd2Html.js

or
  
    npm run html

### Markdown to PDF 

The `convertMd2Pdf.js` scripts reads all the markdown files from the `md` folderi of the given version and convert them to pdf to the matching version pdf file inside the `dist` folder.  
It can be run with:

    scripts/convertMd2Pdf.js -v 7.3

or
  
    npm run pdf -- -v 7.3

## Development

The site is development in AngularJS.  
Gulp and Webpack are used to manage the development environment.
SASS is used to process CSS.

Karma and Ava are used to launch the tests

Launch development server via
  
    npm run serve

Launch tests via

    npm test


## Release

to release a new site version, run 

    npm run build

It will generate the html files from the root md folder for each version. Then, it calls the taxonomy generation for each version and finally create a `dist` directory that contains all the files to be deployed to the production site.  
The `properties.json` file needs to be edited to have the search working via solr parameters.

For each product version, `index.html` must be edited by hand and must be customized for each version.

