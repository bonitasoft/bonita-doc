#!/usr/bin/env node

(() => {
  'use strict';

  let MarkdownIt = require('markdown-it');
  let fs = require('fs');

  let pathToMd = '../md/';
  let pathToHtml = 'app/html/';

  fs.readdir(pathToMd, (err, dirs) => {
    if (err) {
      throw err;
    }
    dirs.forEach(dir => {
      convertDirectory(pathToMd, pathToHtml, dir);
    });
  });
  function convertDirectory(mdPath, htmlPath, dir) {
    console.log('converting ', mdPath, htmlPath, dir);
    fs.stat(mdPath + dir, (err, stats) => {
      if (err) {
        throw err;
      }
      if (stats.isDirectory()) {
        fs.readdir(mdPath + dir, (err, fileNames) => {
          if (err) {
            throw err;
          }
          try {
            fs.accessSync(htmlPath + dir, fs.F_OK);
          } catch (e) {
            fs.mkdirSync(htmlPath + dir);
          }
          
          fileNames.filter(fileName => fileName.match(/\.md$/)).forEach(fileName => {
            let md = new MarkdownIt(); 
            fs.writeFile(htmlPath + dir + '/' + fileName.replace(/\.md$/, '.html'), 
               md.render(
                 fs.readFileSync(mdPath + dir + '/' + fileName).toString()
               ),
               err => {
                 if (err) {
                   throw err;
                 }
                console.log(fileName + ' has been successfully converted');
              });
          });
          fileNames.forEach(file => {
            fs.stat(mdPath + dir + '/' + file, (err, stats) => {
              if (err) {
                throw err;
              }
              if (stats.isDirectory()) {
                convertDirectory(mdPath + dir + '/', htmlPath + dir + '/', file);
              }
            });
          });
        });
      }
    });
  }
})();
