#!/usr/bin/env node

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
  let htmlFile = '', countPDF = 0, countHtml = 0;  

  rx.Observable.from(flattenedTaxo.filter(fileName => !fileName.match(/^https?:\/\//))).bufferWithCount(3).select(
    htmlFiles => htmlFiles.reduce((acc, fileName) => acc + fs.readFileSync('build/html/'+fileName).toString(), '') 
  ).select(html => {
    let htmlTempFile = 'build/'+outfile+(countHtml++)+'.html';
    fs.writeFileSync(htmlTempFile, html);
    return htmlTempFile; 
  }).subscribe(htmlFile => {
    winston.info(htmlFile);
    html5pdf({
      template:'htmlbootstrap', 
      preProcessHtml: preProcessHtml,
      cssPath: __dirname + '/pdf.css'
    }).from(htmlFile).to('build/'+outfile+(countPDF++)+'.pdf', function () {
      console.log("Done");
    });
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
  
  function preProcessHtml() {
    return through(function (data) {
      return this.queue(data.toString().replace(/<a [^>]*>/g,'').replace(/<\/a\s*>/g,'').replace(new RegExp(`src="images/${version}`,'g'), `src="file://${__dirname}/../md/images/`));
    });
  }
  
})();
               
