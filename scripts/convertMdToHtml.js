#!/usr/bin/env node

(() => {
  'use strict';

  require('es6-promise').polyfill();

  const denodeify = require('denodeify');
  const fs = require('fs');
  const mkdirp = require('mkdirp');
  const queryString = require('query-string');
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
  const mdInline = require('markdown-it-for-inline');
  const alerts = require('markdown-it-alerts');
  const md  = require('markdown-it')({ html: true })
    .use(fa)
    .use(decorate)
    .use(smartArrows)
    .use(alerts)
    .use(mdInline, 'navigation_in_site', 'link_open', (tokens, idx) => {
      const hrefIndex = tokens[idx].attrIndex('href');
      if (hrefIndex >= 0 && !tokens[idx].attrs[hrefIndex][1].match(/^http/)) {
        if (hrefIndex >= 0 && tokens[idx].attrs[hrefIndex][1].match(/^images\//)) {
          tokens[idx].attrs[hrefIndex][1] = tokens[idx].attrs[hrefIndex][1].replace(/^images\//gi, `images/${version}/`);
          tokens[idx].attrPush([ 'target', '_blank' ]);
        } else {
          const pageAndHash = tokens[idx].attrs[hrefIndex][1].split('#', 2);
          const page = pageAndHash[0].replace(/\.md$/, '');
          tokens[idx].attrPush([ 'ng-click', 'contentCtrl.goTo($event, \'' + page + '\'' + ((pageAndHash[1]) ? ', \'' + pageAndHash[1] + '\'' : '') + ')' ]);
          tokens[idx].attrs[hrefIndex][1] = '?' + queryString.stringify({page, hash: pageAndHash[1]});
        }
      }
      if (hrefIndex >= 0 && tokens[idx].attrs[hrefIndex][1].match(/^http:\/\/documentation.bonitasoft.com\//)) {
        tokens[idx].attrPush([ 'target', '_self' ]);
      }
    })
    .use(mdInline, 'site_compatible_images', 'image', (tokens, idx) => {
      const srcIndex = tokens[idx].attrIndex('src');
      if (srcIndex >= 0) {
        tokens[idx].attrs[srcIndex][1] = tokens[idx].attrs[srcIndex][1].replace(/^images\//gi, `images/${version}/`);
      }
      const altIndex = tokens[idx].attrIndex('alt');
      if (altIndex < 0) {
        tokens[idx].attrPush(['alt', tokens[idx].content]);
      } else {
        tokens[idx].attrs[altIndex][1] = tokens[idx].content;
      }
      const titleIndex = tokens[idx].attrIndex('title');
      if (titleIndex < 0) {
        tokens[idx].attrPush(['title', tokens[idx].content]);
      } else {
        tokens[idx].attrs[titleIndex][1] = tokens[idx].content;
      }
    });

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
      ) + '<!-- Generated on ' + new Date() + ' -->'
    ).then(() => console.log(fileName + ' has been successfully converted'));
  }

  function replaceVariables(content) {
    Object.keys(variables).forEach(key => content = content.replace(new RegExp('\\${' + key + '}','g'), variables[key]));
    return content;
  }
})();
