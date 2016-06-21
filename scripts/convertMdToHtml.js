#!/usr/bin/env node

(() => {
  'use strict';

  require('es6-promise').polyfill();

  const denodeify = require('denodeify');
  const fs = require('fs');
  const mkdirp = require('mkdirp');
  const winston = require('winston');
  const argv = require('yargs').argv;
  const variables = require('./variables.json');
  let version = argv.v || argv._[0];
   if (!version) {
     version = variables.varVersion;
     if (!version) {
       winston.warn('usage convertMd2Html [-v] version or set a "varVersion" key in scripts/variables.json');
       return;
     }
   }

  const readdirPromise = denodeify(fs.readdir);
  const writeFilePromise = denodeify(fs.writeFile);
  const accessPromise = denodeify(fs.access);
  const mkdirpPromise = denodeify(mkdirp);
  const fa = require('markdown-it-fontawesome');
  const smartArrows = require('markdown-it-smartarrows');
  const decorate = require('markdown-it-decorate');
  const alerts = require('markdown-it-alerts');
  const md  = require('markdown-it')({ html: true })
    .use(fa)
    .use(decorate)
    .use(smartArrows)
    .use(alerts);

  const pathToRepo = __dirname + `/..`;
  const pathToMd = pathToRepo + '/md';
  const pathToApp = `${__dirname}/../build`;
  const pathToHtml = `${pathToApp}/html`;

  const currentDir = process.env.PWD;

  convertDirectory(pathToMd, pathToHtml);

  function convertDirectory(mdPath, htmlPath) {
    winston.info('converting', mdPath, 'to', htmlPath, 'for version', version);
    accessPromise(htmlPath, fs.F_OK)
      .catch(e => winston.error(e) || mkdirpPromise(htmlPath))
      .then(() => readdirPromise(mdPath)
        .then(fileNames => fileNames.filter(fileName => fileName.match(/\.md$/)).forEach(fileName => convertFile(fileName, htmlPath, mdPath)))
      );
  }

  function convertFile(fileName, htmlPath, mdPath) {
    writeFilePromise(htmlPath + '/' + fileName.replace(/\.md$/, '.html'),
      md.render(
        replaceVariables(fs.readFileSync(mdPath + '/' + fileName).toString())
      ).replace(/src="images\//g, `src="images/${version}/`)).then(() => console.log(fileName + ' has been successfully converted'));
  }

  function replaceVariables(content) {
    Object.keys(variables).forEach(key => content = content.replace(new RegExp('\\${' + key + '}','g'), variables[key]));
    return content;
  }
})();
