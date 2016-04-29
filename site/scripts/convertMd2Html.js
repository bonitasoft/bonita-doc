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
      fs.stat(pathToMd + dir, (err, stats) => {
        if (err) {
          throw err;
        }
        if (stats.isDirectory()) {
          fs.readdir(pathToMd + dir, (err, fileNames) => {
            if (err) {
              throw err;
            }
            try {
              fs.accessSync(pathToHtml + dir, fs.F_OK);
            } catch (e) {
              fs.mkdirSync(pathToHtml + dir);
            }
            
            fileNames.filter(fileName => fileName.match(/\.md$/)).forEach(fileName => {
              let md = new MarkdownIt(); 
              fs.writeFile(pathToHtml + dir + '/' + fileName.replace(/\.md$/, '.html'), 
                           md.render(
                             fs.readFileSync(pathToMd + dir + '/' + fileName).toString()
                           ),
                           err => {
                if (err) {
                  throw err;
                }
                console.log(fileName + ' has been successfully converted');
              });

            });
          });
        }
      });
    });
  });
})();
