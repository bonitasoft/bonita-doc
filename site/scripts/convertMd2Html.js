#!/usr/bin/env node

(() => {
  'use strict';

  require('es6-promise').polyfill();

  let MarkdownIt = require('markdown-it');
  let denodeify = require('denodeify');
  let fs = require('fs');
  
  let readdirPromise = denodeify(fs.readdir);
  let statPromise = denodeify(fs.stat);
  let writeFilePromise = denodeify(fs.writeFile);
  let accessPromise = denodeify(fs.access);
  let pathToMd = '../md/';
  let pathToHtml = 'app/html/';

  readdirPromise(pathToMd).then(dirs => {
    console.log(dirs);
    dirs.forEach(dir => {
      convertDirectory(pathToMd, pathToHtml, dir);
    });
  }).catch(e => console.log(e));
  function convertDirectory(mdPath, htmlPath, dir) {
    console.log('converting ', mdPath, htmlPath, dir);
    statPromise(mdPath + dir)
      .then(stats => stats.isDirectory() && readdirPromise(mdPath + dir)
        .then(fileNames => accessPromise(htmlPath + dir, fs.F_OK)
          .catch(e => fs.mkdirSync(htmlPath + dir))
          .then(() => fileNames.filter(fileName => fileName.match(/\.md$/)).forEach(fileName => convertFile(dir, fileName, htmlPath, mdPath)))
          .then(() => fileNames.forEach(file => statPromise(mdPath + dir + '/' + file)
              .then(stats => stats.isDirectory() && convertDirectory(mdPath + dir + '/', htmlPath + dir + '/', file))
            )
          )
        )
    );
  }
  function convertFile(dir, fileName, htmlPath, mdPath) {
    let md = new MarkdownIt({ html: true }); 
    writeFilePromise(htmlPath + dir + '/' + fileName.replace(/\.md$/, '.html'), 
       md.render(
         fs.readFileSync(mdPath + dir + '/' + fileName).toString()
       )).then(() => console.log(fileName + ' has been successfully converted'));
  }
})();
