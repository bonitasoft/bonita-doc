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

## Installation

First, install the dependencies
   
    npm install

Then, to build it, run :

    npm run build

It will create a `dist` directory that contains all the files to be deployed to the production site.  
The `properties.json` file needs to be edited to have the search working via solr parameters.

For each product version, `index.html` is edited by hand and must be customized for each version.

## Scripts

This folder contains utility scripts that convert simple md files to the html files used in the site.

### Taxonomy

The `taxonomy.js` file converts the global SUMMARY.html file to a json file that holds the taxnonmy to be rendered inside the navigation pane of the site.  
It can be run with:

    scripts/taxonomy.js

### Markdown to HTML 

The `convertMd2Html.js` scripts reads all the markdown files from the root `md` folder and convert them to html to the matching version folder inside the `app/html` folder.  
It can be run with:

    scripts/convertMd2Html.js

## Development

The site is development in AngularJS.  
Gulp and Webpack are used to manage the development environment.
SASS is used to process CSS.

Karma and Ava are used to launch the tests

Launch development server via
  
    npm run serve

Launch tests via

    npm test
