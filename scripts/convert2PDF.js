#!/usr/bin/env node --max-old-space-size=8192

(() => {
  'use strict';

  require('es6-promise').polyfill();

  const denodeify = require('denodeify');
  const fs = require('fs');
  const rx = require('rx');
  const winston = require('winston');
  const through = require('through');
  const markdownpdf = require('markdown-pdf');
  const html5pdf = require("html5-to-pdf");
  const PDFMerge = require('pdf-merge');
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
  let outfile = `Bonita-BPM-documentation`;

  const flattenedTaxo = flattenTaxonomy(taxonomy);
  let htmlFile = '', count = 0;  

  rx.Observable.from(flattenedTaxo.filter(fileName => !fileName.match(/^https?:\/\//)))
  .select(html => {
    return 'build/html/' + html; 
  }).bufferWithCount(3).toArray().subscribe(filesArray => {
    convertLastFilesToPDF(filesArray.reverse());
  });
  function convertLastFilesToPDF(filesArray) {
    const files = filesArray.pop();
    winston.info(count, files);
    html5pdf({
      template:'htmlbootstrap', 
      preProcessHtml: preProcessHtml,
      cssPath: __dirname + '/pdf.css'
    }).concat.from(files).to(`build/${outfile}-${count++}.pdf`, function () {
      if(filesArray.length === 0) {
        console.log("Done generating PDF");
        mergePDF();
      } else {
        convertLastFilesToPDF(filesArray);
      }
    });
  }

  function mergePDF() {
    readdirPromise('build')
      .then(files => files.filter(name => name.match(/\.pdf$/)).map(name => 'build/' + name))
      .then(files => new PDFMerge(files).asNewFile(`build/${outfile}.pdf`).promise())
      .then(result => winston.info('done')).catch(error => winston.error(error));
  }

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
  
  function preProcessHtml() {
    return through(function (data) {
      return this.queue(data.toString().replace(/<a [^>]*>/g,'').replace(/<\/a\s*>/g,'').replace(new RegExp(`src="images/${version}`,'g'), `src="file://${__dirname}/../md/images/`));
    });
  }
  
})();
               
