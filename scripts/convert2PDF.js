#!/usr/bin/env node

(() => {
  'use strict';

  require('es6-promise').polyfill();

  const denodeify = require('denodeify');
  let fs = require('fs');
  let winston = require('winston');
  let markdownpdf = require('markdown-pdf');

  const readdirPromise = denodeify(fs.readdir);
  //TODO have image be converted
  let outfile = `build/Bonita-BPM-documentation.pdf`;
  let mdDocs = ["md/taxonomy.md"];
   
  readdirPromise('md').then(fileNames => {
    [].push.apply(mdDocs, fileNames.filter(fileName => fileName !== 'taxonomy.md').filter(fileName => !fileName.match(/^_/)).filter(fileName => fileName.match(/md$/)).map(fileName => 'md/' + fileName));
    markdownpdf().concat.from(mdDocs).to(outfile, () => winston.info('documentation successfully generated to ' + outfile));
  });
  
})();
                
