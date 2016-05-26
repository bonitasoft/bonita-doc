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
      if (node.children && node.children[0] && node.children[0].tagName === 'a' && node.children[1] && node.children[1].tagName === 'ul') {
         parse(node.children[1]);
         console.log(node.children[0].attributes.href);
      }
    } else {
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
    json[0].children.map(parse);
  });
})();
