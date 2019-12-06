#!/usr/bin/env node

/**
 * Create a json object representing doc taxonomy from index.html
 */
(() => {
  'use strict';
  
  let himalaya = require('himalaya');
  let xpath = require('xpath');
  let dom = require('xmldom').DOMParser;
  const denodeify = require('denodeify');
  const fs = require('fs');
  const writeFilePromise = denodeify(fs.writeFile);
  let queryString = require('query-string');
  let stripIndents = require('common-tags').stripIndents;

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
      let result = {
        name: node.children[0].content.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      };
      if (node.attributes.href.match(/^http:\/\//)) {
        result.href = node.attributes.href;
      } else {
        result.page = node.attributes.href;
      }
      return result;
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
    fs.writeFileSync(rootDir + '/taxonomy.json', JSON.stringify(taxonomy));
    console.log('Generated taxonomy.json');

    // Generate sub taxonomy HTML pages from root taxonomy.html page
    xpath.select('//li[ul]', new dom().parseFromString(html)).forEach(li => {
      li = new dom().parseFromString(li.toString());
      var all = xpath.select1('/li/a/@href', li).value + '.html';
      var filename = all.split('/').pop();
      var content = 
        stripIndents`<h1>${xpath.select('string(/li/a)', li)}</h1>
        ${xpath.select('/li/ul', li).toString()}
        <!-- Generated on ${new Date()} -->`;
      writeFilePromise(rootDir + filename, content).then(() => console.log('Generated ' + filename));
    });
  });
})();
