#!/usr/bin/env node

(() => {
  'use strict';
  
  let serve = require('serve-static');
  let fs = require('fs');
  let livereload = require('livereload');
  let connect  = require('connect');
  let server = connect();
  let md = require('markdown-it')({ html: true });
  let serveIndex = require('serve-index');

  server.use((req, res, next) => {
    if(req.url.match(/.*\.md$/)) {
      res.writeHead(200, {'Content-type': 'text/html'}); 
      let html = md.render(fs.readFileSync(__dirname + '/..' + req.url).toString());
      html += `<script>
        document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
                         ':35729/livereload.js?snipver=1"></' + 'script>')</script>`;
      res.end(html);
    } else {
      next();
    }
  });
  server.use(serve(__dirname + '/../'));
  server.use(serveIndex('..'));
   
  server.listen(3000);
   
  livereload = require('livereload');
  server = livereload.createServer({
    exts: ['md', 'png', 'jpg', 'gif']
  });
  server.watch(__dirname + '/../**/*.md');
  console.log('open your favorite browser on http://localhost:3000/ and browse to the page you are editing');
  console.log('press Ctrl+C to exit server');
})();
