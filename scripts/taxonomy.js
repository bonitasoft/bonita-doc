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
  let winston = require('winston');

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
        name: node.children[0].content,
        href: node.attributes.href.replace(/\.md$/g, '.html')
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
    var uls = xpath.select("/ul", new dom().parseFromString(html));  // get first ul of html doc
    var json = himalaya.parse(uls[0].toString());
    var taxonomy = json[0].children.map(parse);
    fs.writeFileSync(rootDir + '/taxonomy.json', JSON.stringify(taxonomy, null, 2));
  });
})();
