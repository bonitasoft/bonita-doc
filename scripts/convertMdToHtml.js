#!/usr/bin/env node

(() => {
  'use strict';

  require('es6-promise').polyfill();

  const denodeify = require('denodeify');
  const MarkdownIt = require('markdown-it');
  const fs = require('fs');
  const winston = require('winston');
  const argv = require('yargs').argv;
   const version = argv.v || argv._[0];
   if (!version) {
     winston.warn('usage convertMd2Html [-v] version');
     return;
   }

  const pathToRepo = __dirname + `/..`;

  const readdirPromise = denodeify(fs.readdir);
  const mkdirPromise = denodeify(fs.mkdir);
  const statPromise = denodeify(fs.stat);
  const writeFilePromise = denodeify(fs.writeFile);
  const accessPromise = denodeify(fs.access);
  const pathToMd = pathToRepo + '/md/';
  const pathToApp = `${__dirname}/../build/`;
  const pathToHtml = `${pathToApp}/html/`;

  const currentDir = process.env.PWD;

  console.log(pathToRepo);
  convertDirectory(pathToMd, pathToHtml);

  function convertDirectory(mdPath, htmlPath) {
    console.log('converting ', mdPath, htmlPath);
    accessPromise(htmlPath, fs.F_OK)
      .catch(e => console.log(e) && fs.mkdirSync(htmlPath))
      .then(() => readdirPromise(mdPath)
        .then(fileNames => fileNames.filter(fileName => fileName.match(/\.md$/)).forEach(fileName => convertFile(fileName, htmlPath, mdPath)))
      );
  }

  function convertFile(fileName, htmlPath, mdPath) {
    const md = new MarkdownIt({
      html: true
    });
    writeFilePromise(htmlPath + '/' + fileName.replace(/\.md$/, '.html'),
      md.render(
        fs.readFileSync(mdPath + '/' + fileName).toString()
      ).replace(/src="images\//g, `src="images/${version}/`)).then(() => console.log(fileName + ' has been successfully converted'));
  }
})();
