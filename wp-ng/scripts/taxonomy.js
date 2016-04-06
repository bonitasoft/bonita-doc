#!/usr/bin/env node

/**
 * Create a json object representing doc taxonomy from index.html
 */

var himalaya = require('himalaya');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var fs = require('fs');

function format(string) {
    return string.split(' ').join('-').toLowerCase();
}

function parse(node) {

    if (node.tagName === 'ul' && node.children) {
        return node.children.map(parse);
    } else if (node.tagName === 'li') {
        if (node.children && node.children[0].content) {
            return {
                name: node.children[0].content,
                children: parse(node.children[1])
            };
        }

        if (node.children && node.children[0].tagName === 'a') {
            return parse(node.children[0]);
        }
    } else if (node.tagName === 'a') {
        return {
            name: node.children[0].content,
            href: node.attributes.href.replace(/\.md$/g, '.html')
        };
    } else {
      return node;
    }
}

var html = fs.readFileSync(__dirname + '/../app/html/index.html').toString().replace(/\n/gi, '');
var uls = xpath.select("/ul", new dom().parseFromString(html));  // get first ul of html doc
var json = himalaya.parse(uls[0].toString());
var taxonomy = json[0].children.map(parse);
fs.writeFileSync(__dirname + '/../app/taxonomy.json', JSON.stringify(taxonomy, null, 2));
