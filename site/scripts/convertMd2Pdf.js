#!/usr/bin/env node

(() => {
  'use strict';

  let process = require('child_process');
  let fs = require('fs');
  let argv = require('yargs').argv;
  let winston = require('winston');
  let version = argv.v || argv._[0];
  if(!version) {
    winston.warn('usage pdfConvertCommand [-v] versionFolder');
    return;
  }
  let outfile = `dist/${version}.pdf`;
  let pdfConvertCommand = `pandoc ../md/${version}/*.md -t html5  -f markdown > ${outfile}`;

  process.exec(pdfConvertCommand, (err, stdout, stderr) => {
    if (err) {
      winston.error(err);
    }
    winston.info('documentation successfully generated to ' + outfile);
  });
})();
