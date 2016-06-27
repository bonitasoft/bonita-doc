#!/usr/bin/env node

(() => {
  'use strict';
  
  let himalaya = require('himalaya');
  let xpath = require('xpath');
  let dom = require('xmldom').DOMParser;
  let fs = require('fs');
  let winston = require('winston');

  function parse(node) {
    if (node.attributes.href.match(/^.*\.md$/)) {
      const md = node.attributes.href;
      const taxo_title = node.children[0].content;
      const html = fs.readFileSync(__dirname + '/../build/html/' + node.attributes.href.replace('.md', '.html')).toString();
      const json = himalaya.parse(html);
      const h1 = json.filter(function(obj) {
        return obj.tagName === 'h1';
      });
      const html_title = h1[0].children[0].content;
      if (taxo_title != html_title) {
        const data = { 'md_file': md, 'taxo_title': taxo_title, 'html_title': html_title };
        console.log(data) || console.log('');
      }
    }
  }

  let rootDir = __dirname + '/..';
  // Compare page titles
  var html = fs.readFileSync(rootDir + '/build/html/taxonomy.html').toString().replace(/\n/gi, '');
  var elements = xpath.select('//li/a', new dom().parseFromString(html));
  var json = himalaya.parse(elements.join(''));
  winston.info('Comparing page titles with taxonomy entries');
  json.map(parse);

  // Find missing pages in taxonomy
  winston.info('Comparing md files with taxonomy entries');
  fs.readdir(rootDir + '/md', function(err, files) {
    const mds = files.filter(function(f) {
      const excludes = ['README.md', 'index.md', 'taxonomy.md'];
      return f.match(/^.*\.md$/) && excludes.indexOf(f) == -1;
    });
    for (var i in mds) {
      var name = mds[i];
      if (json.filter(function(a) { return a.attributes.href == name; }).length < 1) {
        console.log('Not found in taxonomy: ' + name);
      }
    }
  });
})();
