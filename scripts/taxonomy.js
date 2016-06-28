#!/usr/bin/env node

/**
 * Create a json object representing doc taxonomy from index.html
 */
(() => {
  'use strict';
  
  let himalaya = require('himalaya');
  let xpath = require('xpath');
  let dom = require('xmldom').DOMParser;
  let fs = require('fs');
  let queryString = require('query-string');

  function format(string) {
    return string.split(' ').join('-').toLowerCase();
  }

  function parse(node) {

    if (node.tagName === 'ul' && node.children) {
      return node.children.map(parse);
    } else if (node.tagName === 'li') {
      let result;
      if (node.children && node.children[0] && node.children[0].tagName === 'a') {
         result = parse(node.children[0]);
      }
      if (node.children && node.children[1] && node.children[1].tagName === 'ul') {
         result.children = parse(node.children[1]);
      }
      return result;
    } else if (node.tagName === 'a') {
      return {
        name: node.children[0].content.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
        href: node.attributes.href.replace(/\.md$/g, '.html'),
        page: queryString.parse(node.attributes.href).page
      };
    } else {
      return node;
    }
  }

  let rootDir = __dirname + '/../build/html/';

  fs.readdir(rootDir, (err, dirs) => {
    if (err) {
      throw err;
    }
    var html = fs.readFileSync(rootDir + '/taxonomy.html').toString().replace(/\n/gi, '');

    // Generate taxonomy.json from taxonomy.html page
    var uls = xpath.select("/ul", new dom().parseFromString(html));  // get first ul of html doc
    var json = himalaya.parse(uls[0].toString());
    var taxonomy = json[0].children.map(parse);
    fs.writeFileSync(rootDir + '/taxonomy.json', JSON.stringify(taxonomy, null, 2));
    console.log('Generated taxonomy.json');

    // Generate sub taxonomy HTML pages from root taxonomy.html page
    var lis = xpath.select('//li[ul]', new dom().parseFromString(html));
    for (var i in lis) {
      var li = new dom().parseFromString(lis[i].toString());
      var filename = xpath.select1('/li/a/@href', li).value.replace(/^\?page=/, '').replace(/$/, '.html');
      var content = '<h1>' + xpath.select('string(/li/a)', li) + '</h1>';
      content += xpath.select('/li/ul', li).toString();
      //console.log(['', filename, content].join('\n'));
      fs.writeFileSync(rootDir + filename, content);
      console.log('Generated ' + filename);
    }
  });
})();
