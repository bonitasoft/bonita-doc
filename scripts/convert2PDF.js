#!/usr/bin/env node

(() => {
  'use strict';

  require('es6-promise').polyfill();

  const denodeify = require('denodeify');
  const fs = require('fs');
  const winston = require('winston');
  const through = require('through');
  const markdownpdf = require('markdown-pdf');
  const html5pdf = require("html5-to-pdf");
  const argv = require('yargs').argv;
  const variables = require('./variables.json');
  const taxonomy = require('../build/html/taxonomy.json');
  let version = argv.v || argv._[0];
   if (!version) {
     version = variables.varVersion;
     if (!version) {
       winston.warn('usage convert2PDF [-v] version or set a "varVersion" key in scripts/variables.json');
       return;
     }
   }

  const readdirPromise = denodeify(fs.readdir);
  //TODO have image be converted
  let outfile = `Bonita-BPM-documentation.pdf`;
  let mdDocs = ['build/html/multi-language-pages.html'];//'build/html/taxonomy.html'];
  const flattenedTaxo = flattenTaxonomy(taxonomy);
  winston.info(flattenedTaxo);
  let htmlFile = '';  

  flattenedTaxo.forEach(fileName => htmlFile += fs.readFileSync('build/html/'+fileName).toString());

  html5pdf({template:'htmlbootstrap', preProcessHtml: preProcessHtml}).from(htmlFile).to('build/'+outfile, function () {
    console.log("Done");
  });


  function flattenTaxonomy(node) {
    return node.reduce((acc, curr) => {
      if (curr.children) {
        [].push.apply(acc, flattenTaxonomy(curr.children));
      } else {
        acc.push(curr.href);
      }
      return acc;
    }, []);
  }

  readdirPromise('md').then(fileNames => {
//    [].push.apply(mdDocs, fileNames.filter(fileName => fileName !== 'taxonomy.md').filter(fileName => !fileName.match(/^_/)).filter(fileName => fileName.match(/md$/)).map(fileName => 'md/' + fileName));
 //   markdownpdf().concat.from(mdDocs).to(outfile, () => winston.info('documentation successfully generated to ' + outfile));
    
  }).then();
  
  function preProcessHtml() {
    return through(function (data) {
      return this.queue(data.toString().replace(/<a [^>]*>/g,'').replace(/<\/a\s*>/g,'').replace(new RegExp(`src="images/${version}`,'g'), `src="file://${__dirname}/../md/images/`));
    });
  }
  
})();
               
